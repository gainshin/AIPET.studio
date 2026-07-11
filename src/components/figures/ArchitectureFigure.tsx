import React from 'react';

/**
 * Figure 02 · Diagram — Wiki-as-Interface 三欄架構
 * 內容 = PLAN.md §1 / ADR-0002 的系統憲法圖。
 * 規格：DESIGN.md「Diagram（架構圖）規格」——dotted = ingest、solid = query；
 * 線色 olive-500、線寬 ≥1.4、箭頭 ≥7px（連線是語意主角，必須肉眼可辨）。
 * ≥md 用 SVG 等比縮放；<md 換直列版式——任何斷點都不出現水平捲軸。
 */

const SOURCES = [
  { zh: '產品規格 / 功能清單', en: 'PRD / FEATURELIST' },
  { zh: '使用者旅程', en: 'JOURNEYMAP' },
  { zh: '模組清單', en: 'MODULELIST' },
  { zh: '頁面清單', en: 'PAGELIST' },
  { zh: '使用者流程', en: 'USERFLOW' },
];

const AGENTS = [
  { zh: 'Design Agent', en: '畫 UI · 產 PROTOTYPE', human: false },
  { zh: 'Research Agent', en: '訪談 · 產 INSIGHT', human: false },
  { zh: 'Copy Agent', en: 'UX 微文案 · VOICE', human: false },
  { zh: 'Red Team Agent', en: '矛盾 · 對抗檢查', human: false },
  { zh: 'Orchestrator', en: '= YOU · THE CURATOR', human: true },
];

const WIKI_TOP = [
  { title: 'index.md', zh: '分類目錄', en: 'CATALOG' },
  { title: 'log.md', zh: '時序記錄', en: 'CHRONOLOGICAL' },
  { title: 'persona/ · decisions/', zh: '主題頁', en: 'CURATED PAGES' },
];

/* 線條：olive-500，肉眼可辨 */
const LINE = 'var(--c-faint)';
const BOX_H = 62;
const ROW_GAP = 18;
const colY = (i: number) => 72 + i * (BOX_H + ROW_GAP);
const WIKI_X = 306;
const WIKI_W = 424;
const AGENT_X = 802;

const ArchitectureFigure: React.FC = () => (
  <div data-layer="card" data-name="figure-architecture-c2" data-module="style">
    {/* ≥md：SVG 等比縮放 */}
    <div className="hidden md:block">
      <svg viewBox="0 0 1000 500" width="100%" role="img"
        aria-label="Three-column architecture: immutable raw sources, LLM wiki, UX agents"
        data-layer="svg" data-name="architecture-svg" data-module="style">

        {/* 欄首 kickers */}
        <text x={8} y={22} fontFamily="var(--font-mono)" fontSize="11" letterSpacing="0.16em"
          fill="var(--c-faint)">RAW SOURCES</text>
        <text x={8} y={38} fontFamily="var(--font-display)" fontSize="12" fontStyle="italic"
          fill="var(--c-faint)">— immutable material</text>
        <text x={218} y={22} fontFamily="var(--font-mono)" fontSize="11" letterSpacing="0.16em"
          fill="var(--c-accent)">INGEST →</text>
        <text x={218} y={38} fontFamily="var(--font-display)" fontSize="12" fontStyle="italic"
          fill="var(--c-faint)">MarkItDown</text>
        <text x={WIKI_X + 2} y={22} fontFamily="var(--font-mono)" fontSize="11" letterSpacing="0.16em"
          fill="var(--c-faint)">LLM WIKI</text>
        <text x={742} y={22} fontFamily="var(--font-mono)" fontSize="11" letterSpacing="0.16em"
          fill="var(--c-accent)">↔ QUERY</text>
        <text x={AGENT_X + 2} y={22} fontFamily="var(--font-mono)" fontSize="11" letterSpacing="0.16em"
          fill="var(--c-faint)">UX AGENTS</text>
        <text x={AGENT_X + 2} y={38} fontFamily="var(--font-display)" fontSize="12" fontStyle="italic"
          fill="var(--c-faint)">— focused workers</text>

        {/* 左欄 raw sources + dotted ingest 線（匯向 wiki 左緣中點） */}
        {SOURCES.map((s, i) => (
          <g key={s.en}>
            <rect x={8} y={colY(i)} width={192} height={BOX_H} rx="6"
              fill="var(--c-surface)" stroke="var(--c-border)" />
            <text x={22} y={colY(i) + 26} fontFamily="var(--font-body)" fontSize="13"
              fill="var(--c-text)">{s.zh}</text>
            <text x={22} y={colY(i) + 46} fontFamily="var(--font-mono)" fontSize="9.5"
              letterSpacing="0.08em" fill="var(--c-faint)">{s.en}</text>
            <line x1={200} y1={colY(i) + BOX_H / 2} x2={WIKI_X - 10} y2={250}
              stroke={LINE} strokeWidth="1.4" strokeDasharray="4 4" />
          </g>
        ))}
        <polygon points={`${WIKI_X - 2},250 ${WIKI_X - 12},243 ${WIKI_X - 12},257`} fill={LINE} />

        {/* 中欄 LLM Wiki 容器 */}
        <rect x={WIKI_X} y={48} width={WIKI_W} height={412} rx="10"
          fill="none" stroke="var(--c-text)" strokeWidth="1.4" />
        <text x={WIKI_X + 18} y={80} fontFamily="var(--font-display)" fontSize="17"
          fill="var(--c-text)">LLM Wiki</text>
        <text x={WIKI_X + 102} y={80} fontFamily="var(--font-display)" fontSize="12" fontStyle="italic"
          fill="var(--c-faint)">— LLM-maintained markdown</text>

        {WIKI_TOP.map((w, i) => (
          <g key={w.title}>
            <rect x={WIKI_X + 18 + i * 132} y={96} width={124} height={68} rx="6"
              fill="var(--c-raised)" stroke="var(--c-border)" />
            <text x={WIKI_X + 28 + i * 132} y={116} fontFamily="var(--font-mono)" fontSize="10.5"
              fill="var(--c-accent)">{w.title}</text>
            <text x={WIKI_X + 28 + i * 132} y={134} fontFamily="var(--font-body)" fontSize="11.5"
              fill="var(--c-muted)">{w.zh}</text>
            <text x={WIKI_X + 28 + i * 132} y={152} fontFamily="var(--font-mono)" fontSize="8.5"
              letterSpacing="0.1em" fill="var(--c-faint)">{w.en}</text>
          </g>
        ))}

        {/* 退化帶 cross-ref strip */}
        <rect x={WIKI_X + 18} y={180} width={388} height={48} rx="6"
          fill="none" stroke={LINE} strokeDasharray="5 4" strokeWidth="1.2" />
        <text x={WIKI_X + 212} y={200} textAnchor="middle" fontFamily="var(--font-display)"
          fontSize="12.5" fontStyle="italic" fill="var(--c-muted)">cross-ref · backlinks · tags</text>
        <text x={WIKI_X + 212} y={217} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5"
          letterSpacing="0.12em" fill="var(--c-faint)">THE THING THAT DEGRADES IF UN-MAINTAINED</text>

        {/* Schema / CoT 槓桿層 */}
        <text x={WIKI_X + 18} y={262} fontFamily="var(--font-display)" fontSize="14.5"
          fill="var(--c-text)">Schema / CoT</text>
        <text x={WIKI_X + 124} y={262} fontFamily="var(--font-display)" fontSize="11" fontStyle="italic"
          fill="var(--c-faint)">writing rules · configuration</text>
        <rect x={WIKI_X + 18} y={274} width={388} height={132} rx="6"
          fill="var(--c-raised)" stroke="var(--c-border)" />
        <text x={WIKI_X + 212} y={312} textAnchor="middle" fontFamily="var(--font-body)" fontSize="13"
          fill="var(--c-text)">cross-ref 慣例 · 檔名規範 · lint 規則 · voice &amp; tone</text>
        <text x={WIKI_X + 212} y={336} textAnchor="middle" fontFamily="var(--font-body)" fontSize="12"
          fill="var(--c-muted)">改 schema 比改每個頁面有效</text>
        <text x={WIKI_X + 212} y={378} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10.5"
          letterSpacing="0.16em" fill="var(--c-accent)">↑ LINT · PERIODIC AUDIT ↑</text>

        {/* schema 層 → 上方三格與退化帶的向上 dotted 箭頭 */}
        {[WIKI_X + 80, WIKI_X + 212, WIKI_X + 344].map((x) => (
          <g key={x}>
            <line x1={x} y1={274} x2={x} y2={236}
              stroke={LINE} strokeWidth="1.4" strokeDasharray="4 4" />
            <polygon points={`${x},232 ${x - 5},240 ${x + 5},240`} fill={LINE} />
          </g>
        ))}

        {/* 右欄 agents + solid query 線 */}
        {AGENTS.map((a, i) => {
          const cy = colY(i) + BOX_H / 2;
          const stroke = a.human ? 'var(--c-accent)' : LINE;
          return (
            <g key={a.zh}>
              <line x1={WIKI_X + WIKI_W} y1={cy} x2={AGENT_X - 10} y2={cy}
                stroke={stroke} strokeWidth="1.6" />
              <circle cx={WIKI_X + WIKI_W} cy={cy} r="3" fill={stroke} />
              <polygon points={`${AGENT_X - 2},${cy} ${AGENT_X - 12},${cy - 6} ${AGENT_X - 12},${cy + 6}`}
                fill={stroke} />
              <rect x={AGENT_X} y={colY(i)} width={190} height={BOX_H} rx="6"
                fill="var(--c-surface)"
                stroke={a.human ? 'var(--c-accent)' : 'var(--c-border)'}
                strokeWidth={a.human ? 1.6 : 1} />
              <text x={AGENT_X + 14} y={colY(i) + 26}
                fontFamily={a.human ? 'var(--font-display)' : 'var(--font-body)'}
                fontSize={a.human ? 15 : 13.5}
                fill="var(--c-text)">{a.zh}</text>
              <text x={AGENT_X + 14} y={colY(i) + 46} fontFamily="var(--font-mono)" fontSize="9"
                letterSpacing="0.08em"
                fill={a.human ? 'var(--c-accent)' : 'var(--c-faint)'}>{a.en}</text>
            </g>
          );
        })}

        <text x={992} y={490} textAnchor="end" fontFamily="var(--font-display)" fontSize="11"
          fontStyle="italic" fill="var(--c-faint)">after Bush (1945) · Karpathy (2026)</text>
      </svg>
    </div>

    {/* <md：直列版式——三欄變三段，箭頭語彙用文字標示 */}
    <div className="md:hidden space-y-0">
      <div className="bg-surface border border-line rounded-portrait p-4">
        <p className="font-mono text-[10px] uppercase tracking-kicker text-faint mb-3">
          Raw sources <span className="normal-case tracking-normal font-display italic">— immutable</span>
        </p>
        {SOURCES.map((s) => (
          <p key={s.en} className="flex items-baseline justify-between gap-3 py-2 border-b border-dotted border-line last:border-b-0">
            <span className="text-sm text-muted">{s.zh}</span>
            <span className="font-mono text-[9px] tracking-wider text-faint text-right">{s.en}</span>
          </p>
        ))}
      </div>

      <div className="flex items-center gap-3 py-3 pl-4">
        <span className="h-8 border-l border-dashed border-faint" />
        <span className="font-mono text-[10px] uppercase tracking-kicker text-accent">Ingest ↓ · MarkItDown</span>
      </div>

      <div className="border border-ink/60 rounded-portrait p-4" style={{ borderColor: 'var(--c-text)' }}>
        <p className="font-display text-lg mb-1">LLM Wiki
          <span className="font-display italic text-xs text-faint ml-2">— LLM-maintained markdown</span>
        </p>
        <div className="space-y-2 mt-3">
          {WIKI_TOP.map((w) => (
            <div key={w.title} className="bg-raised border border-line rounded-md px-3 py-2">
              <span className="font-mono text-[11px] text-accent">{w.title}</span>
              <span className="text-xs text-muted ml-2">{w.zh}</span>
              <span className="font-mono text-[9px] tracking-wider text-faint ml-2">{w.en}</span>
            </div>
          ))}
          <div className="border border-dashed border-faint rounded-md px-3 py-2">
            <p className="font-display italic text-xs text-muted">cross-ref · backlinks · tags</p>
            <p className="font-mono text-[8.5px] tracking-wider text-faint mt-0.5">
              THE THING THAT DEGRADES IF UN-MAINTAINED
            </p>
          </div>
          <div className="bg-raised border border-line rounded-md px-3 py-3">
            <p className="font-display text-sm">Schema / CoT
              <span className="font-display italic text-[11px] text-faint ml-2">writing rules · configuration</span>
            </p>
            <p className="text-xs text-muted mt-1.5">cross-ref 慣例 · 檔名規範 · lint 規則 · voice &amp; tone</p>
            <p className="text-xs text-muted mt-1">改 schema 比改每個頁面有效</p>
            <p className="font-mono text-[9.5px] tracking-kicker text-accent mt-2">↑ LINT · PERIODIC AUDIT ↑</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 py-3 pl-4">
        <span className="h-8 border-l border-faint" />
        <span className="font-mono text-[10px] uppercase tracking-kicker text-accent">Query ↕ · the only interface</span>
      </div>

      <div className="space-y-2">
        {AGENTS.map((a) => (
          <div key={a.zh}
            className="bg-surface border rounded-portrait px-4 py-3 flex items-baseline justify-between gap-3"
            style={{ borderColor: a.human ? 'var(--c-accent)' : 'var(--c-border)' }}>
            <span className={a.human ? 'font-display text-base' : 'text-sm text-ink'}>{a.zh}</span>
            <span className={`font-mono text-[9px] tracking-wider text-right ${a.human ? 'text-accent' : 'text-faint'}`}>
              {a.en}
            </span>
          </div>
        ))}
      </div>

      <p className="font-display italic text-[11px] text-faint text-right pt-3">
        after Bush (1945) · Karpathy (2026)
      </p>
    </div>
  </div>
);

export default ArchitectureFigure;
