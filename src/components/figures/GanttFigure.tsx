import React from 'react';
import { GANTT_PHASES, SPRINTS, AiTier } from '../../data/course-v5/gantt';

/**
 * Figure 01 · Timeline — UX activities · 6 sprints × 28 documents
 * 規格：DESIGN.md「Timeline（甘特）規格」。
 * tier 配色講語意：A = series-sage（wiki 原生）、B = series-gold（混合）、
 * C = moss-500 中性（系統邊界外）。徽章直標 = CVD 次要編碼。
 */

const TIER_COLOR: Record<AiTier, string> = {
  A: 'var(--c-series-sage)',
  B: 'var(--c-series-gold)',
  C: 'var(--c-border-strong)',
};
const TIER_TEXT: Record<AiTier, string> = {
  A: 'var(--c-bg)',
  B: 'var(--c-bg)',
  C: 'var(--c-text)',
};

const LEFT = 0;
const EN_X = 116;
const GRID_X = 300;
const SPRINT_W = 100;
const GRID_W = SPRINT_W * 6;
const TIER_X = GRID_X + GRID_W + 24;
const W = 1000;
const HEADER_H = 48;
const PHASE_H = 30;
const ROW_H = 24;

const GanttFigure: React.FC = () => {
  // 預先展開列位置
  const rows: (
    | { kind: 'phase'; zh: string; en: string; y: number }
    | { kind: 'activity'; a: (typeof GANTT_PHASES)[number]['activities'][number]; y: number }
  )[] = [];
  let y = HEADER_H;
  for (const phase of GANTT_PHASES) {
    rows.push({ kind: 'phase', zh: phase.zh, en: phase.en, y });
    y += PHASE_H;
    for (const a of phase.activities) {
      rows.push({ kind: 'activity', a, y });
      y += ROW_H;
    }
  }
  const H = y + 8;

  return (
    <div className="overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ minWidth: 840 }} role="img"
        aria-label="UX activities across six sprints, 28 documents with AI tier"
        data-layer="svg" data-name="figure-gantt-c1" data-module="style">

        {/* 欄首 */}
        <text x={LEFT} y={16} fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.18em"
          fill="var(--c-faint)">UX ACTIVITY</text>
        <text x={LEFT} y={30} fontFamily="var(--font-display)" fontSize="11" fontStyle="italic"
          fill="var(--c-faint)">— output documents</text>
        <text x={TIER_X + 12} y={16} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10"
          letterSpacing="0.18em" fill="var(--c-faint)">AI TIER</text>
        {SPRINTS.map((s, i) => (
          <g key={s.code}>
            <text x={GRID_X + i * SPRINT_W + SPRINT_W / 2} y={16} textAnchor="middle"
              fontFamily="var(--font-display)" fontSize="13" fontStyle="italic"
              fill="var(--c-muted)">{s.code}</text>
            <text x={GRID_X + i * SPRINT_W + SPRINT_W / 2} y={32} textAnchor="middle"
              fontFamily="var(--font-body)" fontSize="10" fill="var(--c-faint)">{s.zh}</text>
          </g>
        ))}

        {/* sprint dotted 縱格線 */}
        {Array.from({ length: 7 }, (_, i) => (
          <line key={i} x1={GRID_X + i * SPRINT_W} y1={HEADER_H - 6} x2={GRID_X + i * SPRINT_W} y2={H - 8}
            stroke="var(--c-border)" strokeWidth="1" strokeDasharray="1 3" />
        ))}

        {rows.map((row) => {
          if (row.kind === 'phase') {
            return (
              <g key={`p-${row.en}`} data-layer="svg" data-name={`gantt-phase-${row.en.toLowerCase().replace(/[^a-z]+/g, '-')}`} data-module="style">
                <line x1={LEFT} y1={row.y + 4} x2={W} y2={row.y + 4}
                  stroke="var(--c-border)" strokeWidth="1" />
                <text x={LEFT} y={row.y + 22} fontFamily="var(--font-display)" fontSize="14"
                  fill="var(--c-text)">{row.zh}</text>
                <text x={LEFT + row.zh.length * 15 + 8} y={row.y + 22} fontFamily="var(--font-display)"
                  fontSize="11" fontStyle="italic" fill="var(--c-faint)">— {row.en}</text>
              </g>
            );
          }
          const { a } = row;
          const ongoing = a.sprints === 'all';
          const s0 = ongoing ? 0 : (a.sprints as number[])[0];
          const s1 = ongoing ? 5 : (a.sprints as number[])[(a.sprints as number[]).length - 1];
          const bx = GRID_X + s0 * SPRINT_W + 2;
          const bw = (s1 - s0 + 1) * SPRINT_W - 4;
          const by = row.y + (ongoing ? 8 : 6);
          const bh = ongoing ? 8 : 12;
          return (
            <g key={a.en} data-layer="svg" data-name={`gantt-row-${a.en.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} data-module="style">
              <title>{`${a.zh} · ${a.storage}`}</title>
              <text x={LEFT} y={row.y + 16} fontFamily="var(--font-body)" fontSize="12"
                fill="var(--c-muted)">{a.zh}</text>
              <text x={EN_X} y={row.y + 15.5} fontFamily="var(--font-mono)" fontSize="8.5"
                letterSpacing="0.08em" fill="var(--c-faint)">{a.en}</text>
              <rect x={bx} y={by} width={bw} height={bh} rx="3"
                fill={TIER_COLOR[a.tier]} opacity={ongoing ? 0.55 : 1} />
              <rect x={TIER_X} y={row.y + 5} width={24} height={14} rx="3" fill={TIER_COLOR[a.tier]} />
              <text x={TIER_X + 12} y={row.y + 15.5} textAnchor="middle"
                fontFamily="var(--font-mono)" fontSize="9" fontWeight="600"
                fill={TIER_TEXT[a.tier]}>{a.tier}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default GanttFigure;
