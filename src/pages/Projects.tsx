import React, { useMemo } from 'react';
import claudeRaw from '../../stylepacks/claude/DESIGN.md?raw';
import vercelRaw from '../../stylepacks/vercel/DESIGN.md?raw';
import warmEarthRaw from '../../stylepacks/aipet-warm-earth/DESIGN.md?raw';
import loyalShadowRaw from '../../stylepacks/aipet-loyal-shadow/DESIGN.md?raw';
import { parseStylePackMeta } from '../core/frontmatter';
import type { StylePackMeta } from '../core/stylepack';

/**
 * Projects 頁：目前已交付的 StylePacks 與可互動 POC demo 一覽。
 * 唯讀索引頁——不做 StylePack 切換（P1+ 範圍），只做「看得到、連得到」。
 */

const PACKS: { raw: string }[] = [
  { raw: loyalShadowRaw },
  { raw: claudeRaw },
  { raw: vercelRaw },
  { raw: warmEarthRaw },
];

const STATUS_LABEL: Record<StylePackMeta['status'], string> = {
  draft: 'Draft',
  'needs-curation': 'Needs curation',
  stable: 'Stable',
  deprecated: 'Deprecated',
};
const STATUS_COLOR: Record<StylePackMeta['status'], string> = {
  draft: 'var(--c-series-gold, var(--c-faint))',
  'needs-curation': 'var(--c-rust)',
  stable: 'var(--c-sage)',
  deprecated: 'var(--c-faint)',
};

const DEMOS = [
  {
    href: '/poc/inspector.html',
    name: 'Inspector',
    tagline: 'Read-only observation',
    desc: '點選畫布上任何帶 data-layer 的節點，觀測它的身份、動過它的 PatchOp、rationale 與規格引用。沒有任何寫入路徑。',
  },
  {
    href: '/poc/editor.html',
    name: 'Editor',
    tagline: 'PatchOp composer',
    desc: '變更的唯一入口。選取節點、組出一筆 PatchOp——lane 自動判定、rationale 必填，runtime 依 agent charter 攔截越權操作。',
  },
];

const Projects: React.FC = () => {
  const packs = useMemo(() => PACKS.map((p) => parseStylePackMeta(p.raw)), []);

  return (
    <div className="min-h-screen" data-layer="page" data-name="projects" data-module="projects">
      {/* Hero */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16"
        data-layer="section" data-name="projects-hero" data-module="projects"
      >
        <p className="font-mono text-xs uppercase tracking-kicker text-faint mb-6">
          What&apos;s shipped
        </p>
        <h1 className="font-display text-5xl sm:text-6xl font-normal leading-[1.05] tracking-tight max-w-4xl">
          Projects <em>in the open</em>.
        </h1>
        <p className="text-muted max-w-2xl leading-relaxed mt-6">
          目前已交付的 StylePacks 與可互動 POC demo——每一項都能直接點開、
          直接查來源。沒有隱藏狀態，看到的就是 repo 裡的東西。
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* StylePacks */}
        <section className="mb-24" data-layer="section" data-name="projects-stylepacks" data-module="projects">
          <p className="font-mono text-xs uppercase tracking-kicker text-faint mb-4">StylePacks</p>
          <h2 className="font-display text-4xl font-normal mb-4">
            Four packs, <em>one bridge</em>
          </h2>
          <p className="text-muted max-w-2xl leading-relaxed mb-12">
            每個 pack 是一份 DESIGN.md——frontmatter 是機器可執行的 token，正文是人讀規格。
            換膚只換 pack，PatchOp 與元件 class 一字不動。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {packs.map((meta) => (
              <article
                key={meta.name}
                className="bg-surface border border-line rounded-card p-7 hover:border-line-strong transition-colors"
                data-layer="card" data-name={`pack-${meta.name}`} data-module="projects"
              >
                <div className="flex items-center justify-between gap-3 mb-3">
                  <p className="font-mono text-[11px] uppercase tracking-kicker text-accent">
                    {meta.name} · v{meta.version}
                  </p>
                  <span
                    className="font-mono text-[10px] uppercase tracking-wider rounded-full px-2.5 py-1 border"
                    style={{ color: STATUS_COLOR[meta.status], borderColor: STATUS_COLOR[meta.status] }}
                  >
                    {STATUS_LABEL[meta.status]}
                  </span>
                </div>
                <h3 className="font-display text-3xl font-normal leading-tight">
                  {meta.title ?? meta.name}
                </h3>
                <p className="text-muted leading-relaxed mt-4">{meta.description}</p>

                <div className="flex items-center gap-2 mt-6">
                  {['color', 'accent'].map((k) => {
                    const swatch =
                      k === 'color'
                        ? Object.values(meta.tokens.color)[0]
                        : (meta.tokens.color['amber-400'] ??
                          meta.tokens.color['terracotta-500'] ??
                          meta.tokens.color['blue-600'] ??
                          meta.tokens.color['clay-500']);
                    return swatch ? (
                      <span key={k} className="w-6 h-6 rounded-full border border-line" style={{ background: swatch }} />
                    ) : null;
                  })}
                  <span className="font-mono text-[11px] text-faint ml-2">
                    stylepacks/{meta.name}/DESIGN.md
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Live demos */}
        <section data-layer="section" data-name="projects-demos" data-module="projects">
          <p className="font-mono text-xs uppercase tracking-kicker text-faint mb-4">Live demos</p>
          <h2 className="font-display text-4xl font-normal mb-4">
            Inspector <em>vs.</em> Editor
          </h2>
          <p className="text-muted max-w-2xl leading-relaxed mb-12">
            兩個自包含的 POC 頁面，示範「觀測」與「變更」的權責劃分——
            畫布 HTML 永遠是 op log 的投影，不是可以直接改寫的檔案。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DEMOS.map((d) => (
              <a
                key={d.name}
                href={d.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-surface border border-line rounded-card p-7 hover:border-accent transition-colors"
                data-layer="card" data-name={`demo-${d.name.toLowerCase()}`} data-module="projects"
              >
                <p className="font-mono text-[11px] uppercase tracking-kicker text-faint mb-3">
                  {d.tagline}
                </p>
                <h3 className="font-display text-3xl font-normal leading-tight flex items-center gap-3">
                  {d.name}
                  <span className="font-mono text-base text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                    ↗
                  </span>
                </h3>
                <p className="text-muted leading-relaxed mt-4">{d.desc}</p>
                <p className="font-mono text-[11px] text-faint mt-6">{d.href}</p>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Projects;
