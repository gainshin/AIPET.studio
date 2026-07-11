import React from 'react';
import { HARNESS_ROWS } from '../../data/course-v5/harness';

/**
 * Figure 03 · Level table — Harness 五層壓縮映射到設計工作流
 * 規格：DESIGN.md「Level table（層級表）規格」+「響應式鐵律」——
 * L1–L5 用 sequential ramp、MV/PV 中性；≥sm 三欄 grid、<sm 直列疊排，無橫捲。
 */

const rampVar = (level: number) => `var(--c-ramp-${level})`;
/* ramp 1–2 亮 cell 配深字，3–5 深 cell 配奶油字（DESIGN.md 規則） */
const rampText = (level: number) => (level <= 2 ? 'var(--c-bg)' : 'var(--c-text)');

const HarnessTable: React.FC = () => (
  <div data-layer="card" data-name="figure-harness-c4" data-module="style">
    <div className="hidden sm:grid grid-cols-[56px_180px_minmax(0,1fr)] gap-4 py-2 font-mono text-[10px] uppercase tracking-kicker text-faint">
      <span>Level</span>
      <span>Harness Op（LLM 語境）</span>
      <span>設計工作流的對應</span>
    </div>

    {HARNESS_ROWS.map((row) => (
      <div key={row.code}
        className="grid grid-cols-1 sm:grid-cols-[56px_180px_minmax(0,1fr)] gap-2 sm:gap-4 items-start py-4 border-t border-dotted border-line"
        data-layer="card" data-name={`harness-row-${row.code.toLowerCase()}`} data-module="style">
        {/* <sm：level 徽章 + op 同列；≥sm：各自成欄 */}
        <span className="flex items-center gap-3 sm:block">
          <span
            className="inline-flex items-center justify-center w-11 h-8 rounded-md font-display italic text-base shrink-0"
            style={
              row.level === 0
                ? { background: 'var(--c-raised)', color: 'var(--c-faint)', border: '1px solid var(--c-border)' }
                : { background: rampVar(row.level), color: rampText(row.level) }
            }
          >
            {row.code}
          </span>
          <span className="sm:hidden">
            <span className="block font-display text-lg leading-tight">{row.op}</span>
            <span className="block font-mono text-[10px] tracking-wider text-faint">{row.zh}</span>
          </span>
        </span>
        <span className="hidden sm:block pt-1">
          <span className="block font-display text-lg leading-tight">{row.op}</span>
          <span className="block font-mono text-[10px] tracking-wider text-faint mt-1">{row.zh}</span>
        </span>
        <span className="sm:pt-1 text-sm text-muted leading-relaxed">
          <span className="text-ink">{row.mapping}。</span>{' '}
          {row.detail}
          {row.refs.length > 0 && (
            <span className="block mt-1.5">
              {row.refs.map((r) => (
                <code key={r}
                  className="inline-block font-mono text-[11px] text-accent bg-raised border border-line rounded px-1.5 py-0.5 mr-2 break-all">
                  {r}
                </code>
              ))}
            </span>
          )}
        </span>
      </div>
    ))}

    <p className="border-t border-dotted border-line mt-0 pt-4 text-sm text-muted leading-relaxed">
      <span className="font-mono text-[10px] uppercase tracking-kicker text-accent mr-3">Harness thesis</span>
      Harness 就是設計團隊在 team-scale 必須學的 context 治理紀律——wiki 累積到上千頁、
      數百條 decision 時，沒有壓縮策略 agent 跑不動、新人 onboarding 會被淹沒。
      L1–L5 對應到 sprint cadence，是讓 wiki 不腐爛的工程紀律。
    </p>
  </div>
);

export default HarnessTable;
