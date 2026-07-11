import React, { useMemo, useState } from 'react';
import designRaw from '../../stylepacks/aipet-loyal-shadow/DESIGN.md?raw';
import bridge from '../../stylepacks/_bridge.map.json';
import { parseStylePackMeta } from '../core/frontmatter';
import { getToken } from '../core/stylepack';

/**
 * Style 頁：把「當下套用的 StylePack」翻成人看得懂、agent 引得到的文件。
 * 版型：兩欄式——左欄是區塊導言（桌面 sticky），右欄是內容；<lg 疊成單欄。
 * 資料來源：stylepacks/aipet-loyal-shadow/DESIGN.md frontmatter（單一真相源）
 *          + stylepacks/_bridge.map.json（語意 token 橋接）。
 */

const PACK = 'aipet-loyal-shadow';
const PACK_PATH = `stylepacks/${PACK}/DESIGN.md`;

interface ColorEntry {
  token: string;
  role: string;
  usage: string;
}

const COLOR_GROUPS: { group: string; entries: ColorEntry[] }[] = [
  {
    group: 'Surfaces',
    entries: [
      { token: 'forest-950', role: 'Page canvas', usage: '整頁底色——帶綠的深林黑，不是純黑；所有內容浮在這層之上' },
      { token: 'forest-900', role: 'Card surface', usage: '卡片與面板底色，與 canvas 只差半階，靠 1px 邊線收形' },
      { token: 'forest-800', role: 'Raised surface', usage: '卡片內的浮起層（portrait、子面板）；radial-gradient 的內圈' },
    ],
  },
  {
    group: 'Lines',
    entries: [
      { token: 'moss-700', role: 'Border', usage: '唯一的邊線色，1px 實線或 dotted 資料列分隔' },
      { token: 'moss-500', role: 'Border strong', usage: 'hover 提亮的邊線、停用態的字色' },
    ],
  },
  {
    group: 'Text',
    entries: [
      { token: 'cream-100', role: 'Primary text', usage: '標題與正文——帶暖的奶油白，不是純白' },
      { token: 'cream-300', role: 'Muted text', usage: '敘述、輔助段落' },
      { token: 'olive-500', role: 'Faint / labels', usage: 'mono kicker 標籤、頁尾註記——最安靜的可讀灰' },
    ],
  },
  {
    group: 'Accents',
    entries: [
      { token: 'amber-400', role: 'Primary accent', usage: '唯一強調色：標題 em、主要 CTA、active 態；黑暗中的一盞燈，禁止大面積鋪色' },
      { token: 'amber-300', role: 'Accent hover', usage: 'amber 的 hover 提亮，僅此用途' },
      { token: 'sage-400', role: 'Secondary accent', usage: '次要識別：資料條、成功態、principles 圓點；與 amber 不同時出現在同一元件' },
      { token: 'rust-400', role: 'Alert', usage: '僅作警示，不作裝飾' },
      { token: 'fern-600', role: 'Link underline', usage: '僅作內文連結底線' },
    ],
  },
];

const SCALE_PX: Record<string, string> = {
  xs: '12px', sm: '14px', base: '16px', lg: '20px', xl: '32px', xxl: '52px', hero: '68px',
};

const DO_RULES = [
  '標題一律 display 襯線（EB Garamond / Noto Serif TC）weight 400——層次靠字級與負字距，不靠加粗',
  '標題強調字包 <em>：英/法文斜體 + amber-400；中文不斜體、只上色（html[lang] 驅動）',
  'mono 只做三件事：全大寫 kicker（字距 0.22em）、數據（tabular-nums）、按鈕文字',
  '卡片 24px 圓角 + moss-700 1px 邊線；資料列用 dotted 分隔，不用實線表格',
  '正文 weight 300、行高 ≥1.65；敘述一律 cream-300',
  '環形 monogram（1px amber @45% 圓 + display 大字）是簽名元素，一頁最多一組',
  'amber 與 sage 各司其職：amber = 行動與強調，sage = 資料與完成態',
];

const DONT_RULES = [
  '不用純黑 #000 與純白 #FFF——canvas 是 forest-950，字是 cream-100',
  '不用藍色系、紫色系——那是 generic AI 產品的預設色，與 forest/amber 衝突',
  '不用漸層彩帶、glassmorphism、多重陰影——層次靠邊線與底色半階差',
  '不把 display 襯線用在 xl 以下字級——小字級一律 body 無襯線',
  '不在同一元件同時出現 amber 與 sage',
  '不用 mono 以外的全大寫',
  '不硬編碼色值——一律經語意 token（CSS 變數 / Tailwind class），換膚只動變數層',
];

const TAILWIND_MAP: Record<string, string> = {
  'color.bg': 'bg-bg',
  'color.surface': 'bg-surface',
  'color.text': 'text-ink',
  'color.text-muted': 'text-muted',
  'color.accent': 'text-accent / bg-accent',
  'color.accent-hover': 'hover:text-accent-hover',
  'color.on-accent': 'text-on-accent',
  'color.border': 'border-line',
  'font.heading': 'font-display',
  'font.body': 'font-sans',
  'font.mono': 'font-mono',
  'radius.card': 'rounded-card',
  'shadow.card': '—（用 border-line 代替）',
  'shadow.overlay': '—（overlay 專用）',
  'space.section': 'mb-24 / py-20',
};

const CSSVAR_MAP: Record<string, string> = {
  'color.bg': '--c-bg',
  'color.surface': '--c-surface',
  'color.text': '--c-text',
  'color.text-muted': '--c-muted',
  'color.accent': '--c-accent',
  'color.accent-hover': '--c-accent-hover',
  'color.on-accent': '--c-on-accent',
  'color.border': '--c-border',
  'font.heading': '--font-display',
  'font.body': '--font-body',
  'font.mono': '--font-mono',
  'radius.card': '—',
  'shadow.card': '—',
  'shadow.overlay': '—',
  'space.section': '—',
};

/** 兩欄區塊：左欄導言（lg 起 sticky），右欄內容；窄版疊單欄 */
const SectionRow: React.FC<{
  name: string;
  kicker: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  children: React.ReactNode;
}> = ({ name, kicker, title, lede, children }) => (
  <section
    className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] gap-8 lg:gap-14 py-14 lg:py-20 border-t border-dotted border-line first:border-t-0"
    data-layer="section"
    data-name={name}
    data-module="style"
  >
    <div className="lg:sticky lg:top-24 self-start">
      <p className="font-mono text-xs uppercase tracking-kicker text-faint mb-4">{kicker}</p>
      <h2 className="font-display text-3xl sm:text-4xl font-normal leading-tight">{title}</h2>
      {lede && <p className="text-sm text-muted leading-relaxed mt-4">{lede}</p>}
    </div>
    <div className="min-w-0">{children}</div>
  </section>
);

const StyleGuide: React.FC = () => {
  const meta = useMemo(() => parseStylePackMeta(designRaw), []);
  const packBridge = (bridge as { semanticTokens: string[]; packs: Record<string, Record<string, string>> })
    .packs[PACK];
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (value: string) => {
    navigator.clipboard?.writeText(value).then(() => {
      setCopied(value);
      window.setTimeout(() => setCopied(null), 1200);
    });
  };

  const scaleEntries = Object.entries(meta.tokens.typography.scale ?? {});

  return (
    <div className="min-h-screen" data-layer="page" data-name="style-guide" data-module="style">
      {/* Intro（滿版開場，之後全部兩欄） */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-10"
        data-layer="section" data-name="style-intro" data-module="style"
      >
        <p className="font-mono text-[10px] sm:text-xs uppercase tracking-kicker text-faint mb-6 break-words">
          Active StylePack · {meta.name} · v{meta.version} · {meta.status}
        </p>
        <h1 className="font-display text-4xl sm:text-6xl font-normal leading-[1.05] tracking-tight max-w-4xl">
          A <em>loyal shadow</em>, documented.
        </h1>
        <p className="text-muted max-w-2xl leading-relaxed mt-6">
          深林裡的一盞琥珀燈——這一頁把當下套用的設計系統翻成看得見的規格：
          色彩的角色、字型的分工、形狀的紀律。人類 Curator 用它核對畫面，
          agent 用最下方的語意 token 表引用規格條文。
        </p>
        <p className="font-mono text-[11px] text-faint mt-6 tracking-wider break-words">
          source of truth → {PACK_PATH}
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Colors */}
        <SectionRow
          name="style-colors"
          kicker="Color palette"
          title={<>Thirteen names, <em>one lamp</em></>}
          lede="四組角色：底色疊層次、苔綠收邊線、奶油字三級、琥珀只做強調。每個色塊點擊即複製 hex。"
        >
          {COLOR_GROUPS.map((group) => (
            <div key={group.group} className="mb-8 last:mb-0">
              <h3 className="font-mono text-[11px] uppercase tracking-kicker text-faint mb-4">
                {group.group}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {group.entries.map(({ token, role, usage }) => {
                  const value = getToken(meta, `color.${token}`) ?? '';
                  return (
                    <div
                      key={token}
                      className="bg-surface border border-line rounded-portrait p-4 flex gap-4 items-start"
                      data-layer="card" data-name={`swatch-${token}`} data-module="style"
                    >
                      <button
                        onClick={() => copy(value)}
                        title={`copy ${value}`}
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-md border border-line shrink-0 cursor-pointer"
                        style={{ backgroundColor: value }}
                        aria-label={`copy ${token} ${value}`}
                      />
                      <div className="min-w-0">
                        <p className="font-mono text-xs text-ink break-words">
                          {token}
                          <button
                            onClick={() => copy(value)}
                            className={`ml-2 ${copied === value ? 'text-sage' : 'text-faint hover:text-accent'}`}
                          >
                            {copied === value ? 'copied' : value}
                          </button>
                        </p>
                        <p className="font-mono text-[10px] uppercase tracking-kicker text-accent mt-1">{role}</p>
                        <p className="text-xs text-muted leading-relaxed mt-1.5">{usage}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </SectionRow>

        {/* Typography */}
        <SectionRow
          name="style-typography"
          kicker="Typography"
          title={<>Serif speaks, sans <em>listens</em>, mono keeps records</>}
          lede="三字族各司其職：襯線只在 xl 以上大聲說話（weight 400、負字距），無襯線以 300 光體承載閱讀，mono 管標籤與數據。層次來自字級與字距，從不來自加粗。"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
            {(['heading', 'body', 'mono'] as const).map((slot) => {
              const stack = meta.tokens.typography.fontFamily[slot] ?? '';
              const primary = stack.split(',')[0].replace(/'/g, '').trim();
              const weights =
                slot === 'heading' ? '400 · 500 · 600（400 為預設）'
                : slot === 'body' ? '300（正文）· 400（強調）'
                : '500 · 600';
              return (
                <div key={slot} className="bg-surface border border-line rounded-portrait p-5 min-w-0"
                  data-layer="card" data-name={`font-${slot}`} data-module="style">
                  <p className="font-mono text-[10px] uppercase tracking-kicker text-faint mb-3">{slot}</p>
                  <p
                    className="text-2xl sm:text-3xl text-ink mb-3 break-words"
                    style={{ fontFamily: stack, fontWeight: slot === 'body' ? 300 : 400 }}
                  >
                    {primary}
                  </p>
                  <p className="font-mono text-[11px] text-faint leading-relaxed">weights · {weights}</p>
                  <p className="font-mono text-[11px] text-faint leading-relaxed break-words">stack · {stack}</p>
                </div>
              );
            })}
          </div>

          <div className="bg-surface border border-line rounded-card p-5 sm:p-8"
            data-layer="card" data-name="type-scale" data-module="style">
            <h3 className="font-mono text-[11px] uppercase tracking-kicker text-faint mb-6">Type scale</h3>
            {scaleEntries.map(([step, spec]) => {
              const [size, lh] = String(spec).split('/');
              const px = SCALE_PX[step] ?? '';
              const isDisplay = ['xl', 'xxl', 'hero'].includes(step);
              return (
                <div key={step}
                  className="py-3 border-b border-dotted border-line last:border-b-0 sm:grid sm:grid-cols-[64px_110px_minmax(0,1fr)] sm:gap-4 sm:items-baseline">
                  <div className="flex items-baseline gap-3 sm:contents">
                    <span className="font-mono text-[11px] text-accent">{step}</span>
                    <span className="font-mono text-[11px] text-faint">{px} · lh {lh}</span>
                  </div>
                  <span
                    className="block text-ink truncate mt-1 sm:mt-0"
                    style={{
                      fontSize: `min(${size.trim()}, 11vw)`,
                      lineHeight: Number(lh),
                      fontFamily: isDisplay ? 'var(--font-display)' : 'var(--font-body)',
                      fontWeight: isDisplay ? 400 : 300,
                      letterSpacing: isDisplay ? '-0.015em' : undefined,
                    }}
                  >
                    忠實影子 The loyal shadow follows.
                  </span>
                </div>
              );
            })}
          </div>
        </SectionRow>

        {/* Spacing & shape */}
        <SectionRow
          name="style-shape"
          kicker="Spacing &amp; shape"
          title={<>Lines instead of <em>shadows</em></>}
          lede="層次靠 1px 邊線與底色半階差，不靠陰影堆疊；圓角三級 + pill，資料列一律 dotted。"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            <div className="bg-surface border border-line rounded-portrait p-5"
              data-layer="card" data-name="spacing-table" data-module="style">
              <h3 className="font-mono text-[11px] uppercase tracking-kicker text-faint mb-4">Spacing</h3>
              {Object.entries(meta.tokens.spacing ?? {}).map(([k, v]) => (
                <div key={k} className="grid grid-cols-[40px_56px_1fr] items-center gap-2 py-2.5 border-b border-dotted border-line last:border-b-0">
                  <span className="font-mono text-xs text-ink">{k}</span>
                  <span className="font-mono text-[11px] text-faint">{v}</span>
                  <span className="bg-sage/40 h-1 rounded-sm max-w-full" style={{ width: v }} />
                </div>
              ))}
            </div>

            <div className="bg-surface border border-line rounded-portrait p-5"
              data-layer="card" data-name="radius-table" data-module="style">
              <h3 className="font-mono text-[11px] uppercase tracking-kicker text-faint mb-4">Border radius</h3>
              {Object.entries(meta.tokens.radius ?? {}).map(([k, v]) => (
                <div key={k} className="flex items-center justify-between gap-2 py-2.5 border-b border-dotted border-line last:border-b-0">
                  <span className="font-mono text-xs text-ink">{k}</span>
                  <span className="font-mono text-[11px] text-faint">{v}</span>
                  <span
                    className="w-10 h-6 border border-line-strong bg-raised shrink-0"
                    style={{ borderRadius: k === 'pill' ? '999px' : v }}
                  />
                </div>
              ))}
              <p className="text-xs text-muted leading-relaxed mt-4">
                卡片 lg(24px)、浮起層 md(18px)、CTA 與語言切換 pill。
              </p>
            </div>

            <div className="bg-surface border border-line rounded-portrait p-5 sm:col-span-2 xl:col-span-1"
              data-layer="card" data-name="shadow-table" data-module="style">
              <h3 className="font-mono text-[11px] uppercase tracking-kicker text-faint mb-4">Shadow</h3>
              {Object.entries(meta.tokens.shadow ?? {}).map(([k, v]) => (
                <div key={k} className="py-2.5 border-b border-dotted border-line last:border-b-0">
                  <span className="font-mono text-xs text-ink">{k}</span>
                  <p className="font-mono text-[11px] text-faint break-words mt-1">{v}</p>
                </div>
              ))}
              <p className="text-xs text-muted leading-relaxed mt-4">
                shadow 只有 overlay 一種正當用途。
              </p>
            </div>
          </div>
        </SectionRow>

        {/* Guidelines */}
        <SectionRow
          name="style-guidelines"
          kicker="Guidelines"
          title={<>The discipline that <em>keeps it recognizable</em></>}
          lede="七條該做、七條不該做——識別度來自紀律，不來自裝飾。"
        >
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="bg-surface border border-line rounded-card p-6 sm:p-7"
              data-layer="card" data-name="guidelines-do" data-module="style">
              <h3 className="font-mono text-[11px] uppercase tracking-kicker text-sage mb-5">Do</h3>
              <ul>
                {DO_RULES.map((rule, i) => (
                  <li key={i} className="flex gap-3 text-sm text-muted leading-relaxed py-2.5 border-b border-dotted border-line last:border-b-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-sage shrink-0 mt-1.5" />
                    {rule}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-surface border border-line rounded-card p-6 sm:p-7"
              data-layer="card" data-name="guidelines-dont" data-module="style">
              <h3 className="font-mono text-[11px] uppercase tracking-kicker text-rust mb-5">Don&apos;t</h3>
              <ul>
                {DONT_RULES.map((rule, i) => (
                  <li key={i} className="flex gap-3 text-sm text-muted leading-relaxed py-2.5 border-b border-dotted border-line last:border-b-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-rust shrink-0 mt-1.5" />
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </SectionRow>

        {/* Agent reference */}
        <SectionRow
          name="style-agent-reference"
          kicker="Agent reference"
          title={<>How agents <em>cite this style</em></>}
          lede={
            <>
              Agent 發 PatchOp 時只講語意 token，橋接表翻成本 pack 的原生 token；
              <code className="font-mono text-xs text-accent">refs</code> 欄位引用
              <code className="font-mono text-xs text-accent"> {PACK_PATH}</code> 的條文。
              換膚 = 換 pack，PatchOp 與元件 class 一字不動。窄螢幕下表格可左右捲動。
            </>
          }
        >
          <div className="bg-surface border border-line rounded-card p-4 sm:p-6 overflow-x-auto"
            data-layer="card" data-name="semantic-token-table" data-module="style">
            <div className="min-w-[720px]">
              <div className="grid grid-cols-[140px_180px_1fr_130px_160px] gap-3 py-2 font-mono text-[10px] uppercase tracking-kicker text-faint">
                <span>Semantic token</span>
                <span>Pack token</span>
                <span>Value</span>
                <span>CSS variable</span>
                <span>Tailwind</span>
              </div>
              {Object.entries(packBridge).map(([semantic, packPath]) => {
                const value = getToken(meta, packPath) ?? '—';
                const isColor = semantic.startsWith('color.');
                return (
                  <div key={semantic}
                    className="grid grid-cols-[140px_180px_1fr_130px_160px] gap-3 items-center py-2.5 border-t border-dotted border-line">
                    <span className="font-mono text-xs text-accent">{semantic}</span>
                    <span className="font-mono text-xs text-ink">{packPath}</span>
                    <span className="flex items-center gap-2 min-w-0">
                      {isColor && (
                        <span className="w-4 h-4 rounded-sm border border-line shrink-0" style={{ backgroundColor: value }} />
                      )}
                      <button
                        onClick={() => copy(value)}
                        title="copy value"
                        className={`font-mono text-[11px] truncate ${copied === value ? 'text-sage' : 'text-muted hover:text-accent'}`}
                      >
                        {value}
                      </button>
                    </span>
                    <span className="font-mono text-[11px] text-faint">{CSSVAR_MAP[semantic] ?? '—'}</span>
                    <span className="font-mono text-[11px] text-faint">{TAILWIND_MAP[semantic] ?? '—'}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <p className="font-mono text-[11px] text-faint mt-6 tracking-wider leading-relaxed break-words">
            PatchOp 範例 → {'{'} op: "set-token", payload: {'{'} token: "color.accent" {'}'},
            refs: ["{PACK_PATH}#用色規則"] {'}'}
          </p>
        </SectionRow>
      </div>
    </div>
  );
};

export default StyleGuide;
