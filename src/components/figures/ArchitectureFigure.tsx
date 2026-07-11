import React from 'react';

/**
 * Figure 02 · Diagram — Wiki-as-Interface 三欄架構
 * 內容 = PLAN.md §1 / ADR-0002 的系統憲法圖。
 * 規格：DESIGN.md「Diagram（架構圖）規格」——dotted = ingest、solid = query、
 * Orchestrator 是全圖唯一的 amber 框。
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

const BOX_H = 56;
const ROW_GAP = 16;
const colY = (i: number) => 64 + i * (BOX_H + ROW_GAP);

const ArchitectureFigure: React.FC = () => (
  <div className="overflow-x-auto">
    <svg viewBox="0 0 1060 480" width="100%" style={{ minWidth: 880 }} role="img"
      aria-label="Three-column architecture: immutable raw sources, LLM wiki, UX agents"
      data-layer="svg" data-name="figure-architecture-c2" data-module="style">

      {/* 欄首 kickers */}
      <text x={10} y={20} fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.18em"
        fill="var(--c-faint)">RAW SOURCES</text>
      <text x={10} y={34} fontFamily="var(--font-display)" fontSize="11" fontStyle="italic"
        fill="var(--c-faint)">— immutable material</text>
      <text x={236} y={20} fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.18em"
        fill="var(--c-accent)">INGEST →</text>
      <text x={236} y={34} fontFamily="var(--font-display)" fontSize="11" fontStyle="italic"
        fill="var(--c-faint)">MarkItDown</text>
      <text x={340} y={20} fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.18em"
        fill="var(--c-faint)">LLM WIKI</text>
      <text x={782} y={20} fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.18em"
        fill="var(--c-accent)">↔ QUERY</text>
      <text x={862} y={20} fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.18em"
        fill="var(--c-faint)">UX AGENTS</text>
      <text x={862} y={34} fontFamily="var(--font-display)" fontSize="11" fontStyle="italic"
        fill="var(--c-faint)">— focused workers</text>

      {/* 左欄：raw sources */}
      {SOURCES.map((s, i) => (
        <g key={s.en} data-layer="svg" data-name={`arch-source-${s.en.toLowerCase().replace(/[^a-z]+/g, '-')}`} data-module="style">
          <rect x={10} y={colY(i)} width={200} height={BOX_H} rx="6"
            fill="var(--c-surface)" stroke="var(--c-border)" />
          <text x={24} y={colY(i) + 24} fontFamily="var(--font-body)" fontSize="12"
            fill="var(--c-text)">{s.zh}</text>
          <text x={24} y={colY(i) + 42} fontFamily="var(--font-mono)" fontSize="9"
            letterSpacing="0.1em" fill="var(--c-faint)">{s.en}</text>
          {/* dotted ingest arrow → wiki 左緣 */}
          <line x1={210} y1={colY(i) + BOX_H / 2} x2={330} y2={222}
            stroke="var(--c-border-strong)" strokeWidth="1" strokeDasharray="3 3" />
        </g>
      ))}
      <polygon points="330,222 322,217 322,227" fill="var(--c-border-strong)" />

      {/* 中欄：LLM Wiki 容器 */}
      <g data-layer="svg" data-name="arch-wiki" data-module="style">
        <rect x={338} y={44} width={430} height={396} rx="8"
          fill="none" stroke="var(--c-text)" strokeWidth="1.2" />
        <text x={356} y={72} fontFamily="var(--font-display)" fontSize="15"
          fill="var(--c-text)">LLM Wiki</text>
        <text x={432} y={72} fontFamily="var(--font-display)" fontSize="11" fontStyle="italic"
          fill="var(--c-faint)">— LLM-maintained markdown</text>

        {WIKI_TOP.map((w, i) => (
          <g key={w.title}>
            <rect x={356 + i * 134} y={88} width={122} height={62} rx="6"
              fill="var(--c-raised)" stroke="var(--c-border)" />
            <text x={366 + i * 134} y={106} fontFamily="var(--font-mono)" fontSize="10"
              fill="var(--c-accent)">{w.title}</text>
            <text x={366 + i * 134} y={122} fontFamily="var(--font-body)" fontSize="10.5"
              fill="var(--c-muted)">{w.zh}</text>
            <text x={366 + i * 134} y={138} fontFamily="var(--font-mono)" fontSize="8"
              letterSpacing="0.12em" fill="var(--c-faint)">{w.en}</text>
          </g>
        ))}

        {/* 退化帶：cross-ref strip */}
        <rect x={356} y={166} width={390} height={44} rx="6"
          fill="none" stroke="var(--c-border-strong)" strokeDasharray="4 3" />
        <text x={551} y={184} textAnchor="middle" fontFamily="var(--font-display)" fontSize="11.5"
          fontStyle="italic" fill="var(--c-muted)">cross-ref · backlinks · tags</text>
        <text x={551} y={200} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8"
          letterSpacing="0.14em" fill="var(--c-faint)">THE THING THAT DEGRADES IF UN-MAINTAINED</text>

        {/* Schema / CoT 槓桿層 */}
        <text x={356} y={240} fontFamily="var(--font-display)" fontSize="13"
          fill="var(--c-text)">Schema / CoT</text>
        <text x={452} y={240} fontFamily="var(--font-display)" fontSize="10.5" fontStyle="italic"
          fill="var(--c-faint)">writing rules · configuration</text>
        <rect x={356} y={252} width={390} height={120} rx="6"
          fill="var(--c-raised)" stroke="var(--c-border)" />
        <text x={551} y={286} textAnchor="middle" fontFamily="var(--font-body)" fontSize="12"
          fill="var(--c-text)">cross-ref 慣例 · 檔名規範 · lint 規則 · voice &amp; tone</text>
        <text x={551} y={308} textAnchor="middle" fontFamily="var(--font-body)" fontSize="11"
          fill="var(--c-muted)">改 schema 比改每個頁面有效</text>
        <text x={551} y={344} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9.5"
          letterSpacing="0.18em" fill="var(--c-accent)">↑ LINT · PERIODIC AUDIT ↑</text>

        {/* schema 層 → 上方三格的向上箭頭 */}
        {[430, 551, 672].map((x) => (
          <g key={x}>
            <line x1={x} y1={252} x2={x} y2={216}
              stroke="var(--c-border-strong)" strokeWidth="1" strokeDasharray="3 3" />
            <polygon points={`${x},214 ${x - 4},221 ${x + 4},221`} fill="var(--c-border-strong)" />
          </g>
        ))}
      </g>

      {/* 右欄：五席 agents + query 線 */}
      {AGENTS.map((a, i) => (
        <g key={a.zh} data-layer="svg" data-name={`arch-agent-${a.zh.toLowerCase().replace(/[^a-z]+/g, '-')}`} data-module="style">
          <line x1={768} y1={colY(i) + BOX_H / 2} x2={850} y2={colY(i) + BOX_H / 2}
            stroke={a.human ? 'var(--c-accent)' : 'var(--c-border-strong)'} strokeWidth="1.2" />
          <polygon
            points={`850,${colY(i) + BOX_H / 2} 842,${colY(i) + BOX_H / 2 - 5} 842,${colY(i) + BOX_H / 2 + 5}`}
            fill={a.human ? 'var(--c-accent)' : 'var(--c-border-strong)'} />
          <circle cx={768} cy={colY(i) + BOX_H / 2} r="2.5"
            fill={a.human ? 'var(--c-accent)' : 'var(--c-border-strong)'} />
          <rect x={850} y={colY(i)} width={200} height={BOX_H} rx="6"
            fill="var(--c-surface)"
            stroke={a.human ? 'var(--c-accent)' : 'var(--c-border)'}
            strokeWidth={a.human ? 1.5 : 1} />
          <text x={864} y={colY(i) + 24}
            fontFamily={a.human ? 'var(--font-display)' : 'var(--font-body)'}
            fontSize={a.human ? 14 : 12}
            fill="var(--c-text)">{a.zh}</text>
          <text x={864} y={colY(i) + 42} fontFamily="var(--font-mono)" fontSize="8.5"
            letterSpacing="0.1em"
            fill={a.human ? 'var(--c-accent)' : 'var(--c-faint)'}>{a.en}</text>
        </g>
      ))}

      {/* 出處註記 */}
      <text x={1050} y={470} textAnchor="end" fontFamily="var(--font-display)" fontSize="10.5"
        fontStyle="italic" fill="var(--c-faint)">after Bush (1945) · Karpathy (2026)</text>
    </svg>
  </div>
);

export default ArchitectureFigure;
