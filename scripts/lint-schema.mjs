#!/usr/bin/env node
/**
 * npm run lint:schema
 *
 * P0 驗收項之一：
 * 1. schemas/*.schema.json 皆為合法 JSON Schema draft-07（ajv 可編譯）
 * 2. stylepacks/<pack>/DESIGN.md frontmatter 通過 stylepack schema
 * 3. wiki/schema/agents/*.charter.md frontmatter 通過 agentcharter schema
 * 4. _bridge.map.json：每個 pack 覆蓋全部語意 token，且引用的 pack token 路徑存在
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import matter from 'gray-matter';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

let failures = 0;
const fail = (msg) => {
  failures += 1;
  console.error(`  ✗ ${msg}`);
};
const ok = (msg) => console.log(`  ✓ ${msg}`);

// ── 1. 編譯全部 schema ────────────────────────────────────────────
console.log('schemas/');
const schemaDir = join(root, 'schemas');
const validators = {};
for (const file of readdirSync(schemaDir).filter((f) => f.endsWith('.schema.json'))) {
  try {
    const schema = JSON.parse(readFileSync(join(schemaDir, file), 'utf8'));
    validators[file.replace('.schema.json', '')] = ajv.compile(schema);
    ok(`${file} 可編譯（draft-07）`);
  } catch (e) {
    fail(`${file}: ${e.message}`);
  }
}

// ── 2. stylepacks ────────────────────────────────────────────────
console.log('stylepacks/');
const packDir = join(root, 'stylepacks');
const packs = {};
const packNames = readdirSync(packDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

for (const name of packNames) {
  const designPath = join(packDir, name, 'DESIGN.md');
  if (!existsSync(designPath)) {
    fail(`${name}/ 缺少 DESIGN.md`);
    continue;
  }
  const { data } = matter(readFileSync(designPath, 'utf8'));
  packs[name] = data;
  if (validators.stylepack(data)) {
    ok(`${name}/DESIGN.md frontmatter 通過 stylepack schema（status: ${data.status}）`);
  } else {
    for (const err of validators.stylepack.errors) {
      fail(`${name}/DESIGN.md ${err.instancePath || '/'} ${err.message}`);
    }
  }
  if (data.name !== name) {
    fail(`${name}/DESIGN.md frontmatter name「${data.name}」與資料夾名不一致`);
  }
}

// ── 3. bridge map ────────────────────────────────────────────────
console.log('stylepacks/_bridge.map.json');
const getByPath = (tokens, path) =>
  path.split('.').reduce((n, k) => (n && typeof n === 'object' ? n[k] : undefined), tokens);

const bridgePath = join(packDir, '_bridge.map.json');
if (!existsSync(bridgePath)) {
  fail('_bridge.map.json 不存在');
} else {
  const bridge = JSON.parse(readFileSync(bridgePath, 'utf8'));
  for (const [packName, mapping] of Object.entries(bridge.packs)) {
    if (!packs[packName]) {
      fail(`橋接表引用不存在的 pack「${packName}」`);
      continue;
    }
    const missing = bridge.semanticTokens.filter((t) => !(t in mapping));
    for (const t of missing) fail(`${packName} 未覆蓋語意 token「${t}」`);
    for (const [semantic, packTokenPath] of Object.entries(mapping)) {
      if (!bridge.semanticTokens.includes(semantic)) {
        fail(`${packName} 對映了未宣告的語意 token「${semantic}」`);
      }
      if (getByPath(packs[packName].tokens, packTokenPath) === undefined) {
        fail(`${packName}: ${semantic} → tokens.${packTokenPath} 不存在`);
      }
    }
    if (missing.length === 0) ok(`${packName} 覆蓋全部 ${bridge.semanticTokens.length} 個語意 token，引用路徑皆存在`);
  }
  const unmapped = packNames.filter((n) => !bridge.packs[n]);
  for (const n of unmapped) fail(`pack「${n}」未列入橋接表`);
}

// ── 4. agent charters ────────────────────────────────────────────
console.log('wiki/schema/agents/');
const charterDir = join(root, 'wiki', 'schema', 'agents');
if (!existsSync(charterDir)) {
  console.log('  -（目錄尚未建立，跳過——P0-5 落地後此處必須有五份 charter）');
} else {
  const charterFiles = readdirSync(charterDir).filter((f) => f.endsWith('.charter.md'));
  if (charterFiles.length === 0) fail('wiki/schema/agents/ 內沒有任何 charter');
  for (const file of charterFiles) {
    const { data } = matter(readFileSync(join(charterDir, file), 'utf8'));
    if (validators.agentcharter(data)) {
      ok(`${file} 通過 agentcharter schema（seat: ${data.seat}, kind: ${data.kind}）`);
    } else {
      for (const err of validators.agentcharter.errors) {
        fail(`${file} ${err.instancePath || '/'} ${err.message}`);
      }
    }
    if (data.name && `${data.name}.charter.md` !== file) {
      fail(`${file} frontmatter name「${data.name}」與檔名不一致`);
    }
  }
}

// ── 結果 ─────────────────────────────────────────────────────────
console.log('');
if (failures > 0) {
  console.error(`lint:schema 失敗：${failures} 個問題`);
  process.exit(1);
}
console.log('lint:schema 全數通過');
