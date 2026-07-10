import matter from 'gray-matter';

/** StylePack DESIGN.md 的 frontmatter 結構（對應 schemas/stylepack.schema.json） */
export interface StylePackTokens {
  color: Record<string, string>;
  typography: {
    fontFamily: Record<string, string>;
    scale?: Record<string, string>;
    weight?: Record<string, string | number>;
  };
  spacing?: Record<string, string>;
  radius?: Record<string, string>;
  shadow?: Record<string, string>;
}

export interface StylePackMeta {
  name: string;
  title?: string;
  version: string;
  status: 'draft' | 'needs-curation' | 'stable' | 'deprecated';
  source?: string;
  description?: string;
  tokens: StylePackTokens;
  voice?: {
    keywords?: string[];
    avoid?: string[];
  };
}

export interface StylePack {
  meta: StylePackMeta;
  /** DESIGN.md 本體（人類可讀規格），Auditor 引用判準的來源 */
  body: string;
}

/** 解析 stylepacks/<pack>/DESIGN.md 原文 */
export function parseDesignMd(raw: string): StylePack {
  const { data, content } = matter(raw);
  return { meta: data as StylePackMeta, body: content.trim() ? content : '' };
}

/** 以點路徑讀取 pack token，如 getToken(meta, 'color.ivory-50') */
export function getToken(meta: StylePackMeta, path: string): string | undefined {
  const segments = path.split('.');
  let node: unknown = meta.tokens;
  for (const seg of segments) {
    if (node == null || typeof node !== 'object') return undefined;
    node = (node as Record<string, unknown>)[seg];
  }
  return typeof node === 'string' || typeof node === 'number' ? String(node) : undefined;
}

/** 語意 token 橋接表（stylepacks/_bridge.map.json） */
export interface BridgeMap {
  version: string;
  semanticTokens: string[];
  packs: Record<string, Record<string, string>>;
}

/**
 * 語意 token → 實際值。semantic 如 'color.accent'；
 * 橋接表把它翻成該 pack 的原生 token 路徑，再從 frontmatter 取值。
 */
export function resolveSemanticToken(
  meta: StylePackMeta,
  bridge: BridgeMap,
  semantic: string
): string | undefined {
  const mapping = bridge.packs[meta.name];
  if (!mapping) return undefined;
  const packPath = mapping[semantic];
  if (!packPath) return undefined;
  return getToken(meta, packPath);
}
