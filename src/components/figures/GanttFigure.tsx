import React from 'react';
import { GANTT_PHASES, SPRINTS, AiTier } from '../../data/demo/gantt';

/**
 * Figure 01 · Timeline — UX activities · 6 sprints × 28 documents
 * 規格：DESIGN.md「Timeline（甘特）規格」+「響應式鐵律」。
 * tier 配色：A = series-amber（wiki 原生）、B = series-gold（混合）、
 * C = moss-500 中性（系統邊界外）。徽章直標 = CVD 次要編碼。
 * ≥md 用 SVG 等比縮放；<md 換直列版式——任何斷點都不出現水平捲軸。
 */

const TIER_COLOR: Record<AiTier, string> = {
  A: 'var(--c-series-amber)',
  B: 'var(--c-series-gold)',
  C: 'var(--c-border-strong)',
};
const TIER_TEXT: Record<AiTier, string> = {
  A: 'var(--c-bg)',
  B: 'var(--c-bg)',
  C: 'var(--c-text)',
};

const EN_X = 112;
const GRID_X = 250;
const SPRINT_W = 100;
const GRID_W = SPRINT_W * 6;
const TIER_X = GRID_X + GRID_W + 26;
const W = 960;
const HEADER_H = 56;
const PHASE_H = 34;
const ROW_H = 27;

const sprintRange = (sprints: number[] | 'all') =>
  sprints === 'all'
    ? 'S0 – S5 · ongoing'
    : sprints.length === 1
      ? SPRINTS[sprints[0]].code
      : `${SPRINTS[sprints[0]].code} – ${SPRINTS[sprints[sprints.length - 1]].code}`;

const TierBadge: React.FC<{ tier: AiTier }> = ({ tier }) => (
  <span
    className="inline-flex items-center justify-center w-7 h-5 rounded font-mono text-[11px] font-semibold shrink-0"
    style={{ background: TIER_COLOR[tier], color: TIER_TEXT[tier] }}
  >
    {tier}
  </span>
);

const GanttFigure: React.FC = () => {
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
    <div data-layer="card" data-name="figure-gantt-c1" data-module="style">
      {/* ≥md：SVG 等比縮放置入欄寬（viewBox 960，欄寬 ≥720 → 有效字級達標） */}
      <div className="hidden md:block">
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img"
          aria-label="UX activities across six sprints, 28 documents with AI tier"
          data-layer="svg" data-name="gantt-svg" data-module="style">

          <text x={0} y={18} fontFamily="var(--font-mono)" fontSize="11" letterSpacing="0.18em"
            fill="var(--c-faint)">UX ACTIVITY</text>
          <text x={0} y={36} fontFamily="var(--font-display)" fontSize="12" fontStyle="italic"
            fill="var(--c-faint)">— output documents</text>
          <text x={TIER_X + 14} y={18} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11"
            letterSpacing="0.18em" fill="var(--c-faint)">AI TIER</text>
          {SPRINTS.map((s, i) => (
            <g key={s.code}>
              <text x={GRID_X + i * SPRINT_W + SPRINT_W / 2} y={20} textAnchor="middle"
                fontFamily="var(--font-display)" fontSize="16" fontStyle="italic"
                fill="var(--c-muted)">{s.code}</text>
              <text x={GRID_X + i * SPRINT_W + SPRINT_W / 2} y={38} textAnchor="middle"
                fontFamily="var(--font-body)" fontSize="11.5" fill="var(--c-faint)">{s.zh}</text>
            </g>
          ))}

          {Array.from({ length: 7 }, (_, i) => (
            <line key={i} x1={GRID_X + i * SPRINT_W} y1={HEADER_H - 8} x2={GRID_X + i * SPRINT_W} y2={H - 8}
              stroke="var(--c-border)" strokeWidth="1" strokeDasharray="2 4" />
          ))}

          {rows.map((row) => {
            if (row.kind === 'phase') {
              return (
                <g key={`p-${row.en}`}>
                  <line x1={0} y1={row.y + 5} x2={W} y2={row.y + 5}
                    stroke="var(--c-border)" strokeWidth="1" />
                  <text x={0} y={row.y + 25} fontFamily="var(--font-display)" fontSize="15.5"
                    fill="var(--c-text)">{row.zh}</text>
                  <text x={row.zh.length * 16.5 + 10} y={row.y + 25} fontFamily="var(--font-display)"
                    fontSize="12" fontStyle="italic" fill="var(--c-faint)">— {row.en}</text>
                </g>
              );
            }
            const { a } = row;
            const ongoing = a.sprints === 'all';
            const s0 = ongoing ? 0 : (a.sprints as number[])[0];
            const s1 = ongoing ? 5 : (a.sprints as number[])[(a.sprints as number[]).length - 1];
            const bx = GRID_X + s0 * SPRINT_W + 2;
            const bw = (s1 - s0 + 1) * SPRINT_W - 4;
            const by = row.y + (ongoing ? 9 : 6);
            const bh = ongoing ? 8 : 14;
            return (
              <g key={a.en}>
                <title>{`${a.zh} · ${a.storage}`}</title>
                <text x={0} y={row.y + 18} fontFamily="var(--font-body)" fontSize="13.5"
                  fill="var(--c-muted)">{a.zh}</text>
                <text x={EN_X} y={row.y + 17.5} fontFamily="var(--font-mono)" fontSize="10"
                  letterSpacing="0.06em" fill="var(--c-faint)">{a.en}</text>
                <rect x={bx} y={by} width={bw} height={bh} rx="3"
                  fill={TIER_COLOR[a.tier]} opacity={ongoing ? 0.55 : 1} />
                <rect x={TIER_X} y={row.y + 4} width={28} height={17} rx="3" fill={TIER_COLOR[a.tier]} />
                <text x={TIER_X + 14} y={row.y + 16.5} textAnchor="middle"
                  fontFamily="var(--font-mono)" fontSize="10.5" fontWeight="600"
                  fill={TIER_TEXT[a.tier]}>{a.tier}</text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* <md：直列版式——不縮小、不橫捲 */}
      <div className="md:hidden">
        {GANTT_PHASES.map((phase) => (
          <div key={phase.en} className="mb-6 last:mb-0">
            <p className="font-display text-lg border-b border-line pb-2">
              {phase.zh}
              <span className="font-display italic text-xs text-faint ml-2">— {phase.en}</span>
            </p>
            {phase.activities.map((a) => (
              <div key={a.en}
                className="flex items-center justify-between gap-3 py-2.5 border-b border-dotted border-line last:border-b-0">
                <span className="min-w-0">
                  <span className="block text-sm text-muted">{a.zh}</span>
                  <span className="block font-mono text-[10px] tracking-wider text-faint mt-0.5 truncate">{a.en}</span>
                </span>
                <span className="flex items-center gap-2 shrink-0">
                  <span className="font-mono text-[11px] text-faint whitespace-nowrap">{sprintRange(a.sprints)}</span>
                  <TierBadge tier={a.tier} />
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GanttFigure;
