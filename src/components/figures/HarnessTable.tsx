import React from 'react';
import { HARNESS_ROWS } from '../../data/course-v5/harness';

/**
 * Figure 03 · Level table — Harness 五層壓縮映射到設計工作流
 * 規格：DESIGN.md「Level table（層級表）規格」——
 * L1–L5 用 sequential ramp（amber 淺→深）、MV/PV 視圖列用中性；HTML 表格可選取。
 */

const rampVar = (level: number) => `var(--c-ramp-${level})`;
/* ramp 1–2 亮 cell 配深字，3–5 深 cell 配奶油字（DESIGN.md 規則） */
const rampText = (level: number) => (level <= 2 ? 'var(--c-bg)' : 'var(--c-text)');

const HarnessTable: React.FC = () => (
  <div className="overflow-x-auto" data-layer="card" data-name="figure-harness-c4" data-module="style">
    <div className="min-w-[680px]">
      <div className="grid grid-cols-[56px_180px_minmax(0,1fr)] gap-4 py-2 font-mono text-[10px] uppercase tracking-kicker text-faint">
        <span>Level</span>
        <span>Harness Op（LLM 語境）</span>
        <span>設計工作流的對應</span>
      </div>

      {HARNESS_ROWS.map((row) => (
        <div key={row.code}
          className="grid grid-cols-[56px_180px_minmax(0,1fr)] gap-4 items-start py-4 border-t border-dotted border-line"
          data-layer="card" data-name={`harness-row-${row.code.toLowerCase()}`} data-module="style">
          <span
            className="inline-flex items-center justify-center w-11 h-8 rounded-md font-display italic text-base"
            style={
              row.level === 0
                ? { background: 'var(--c-raised)', color: 'var(--c-faint)', border: '1px solid var(--c-border)' }
                : { background: rampVar(row.level), color: rampText(row.level) }
            }
          >
            {row.code}
          </span>
          <span className="pt-1">
            <span className="block font-display text-lg leading-tight">{row.op}</span>
            <span className="block font-mono text-[10px] tracking-wider text-faint mt-1">{row.zh}</span>
          </span>
          <span className="pt-1 text-sm text-muted leading-relaxed">
            <span className="text-ink">{row.mapping}。</span>{' '}
            {row.detail}
            {row.refs.length > 0 && (
              <span className="block mt-1.5">
                {row.refs.map((r) => (
                  <code key={r}
                    className="inline-block font-mono text-[11px] text-accent bg-raised border border-line rounded px-1.5 py-0.5 mr-2">
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
  </div>
);

export default HarnessTable;
