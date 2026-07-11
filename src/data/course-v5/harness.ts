/**
 * C4 · Harness 五層壓縮映射到設計工作流
 * 來源：課程 V5 教材（人類 Curator 提供）。
 * L1–L5 = 有序壓縮強度（sequential ramp）；MV/PV = 視圖分離（中性色）。
 */

export interface HarnessRow {
  code: string;
  /** ramp 步數 1–5；0 = 視圖列（中性） */
  level: 0 | 1 | 2 | 3 | 4 | 5;
  op: string;
  zh: string;
  mapping: string;
  detail: string;
  refs: string[];
}

export const HARNESS_ROWS: HarnessRow[] = [
  {
    code: 'L1', level: 1, op: 'Dedupe', zh: '移除重複訊息',
    mapping: '同 feature 多份重複 spec / design review notes 合併',
    detail: '週會三個人拍了同一張 Figma 截圖、各自寫了類似 comment——抓出來合併成單一 decision 頁。',
    refs: ['decisions/d-2026-04-xxx.md'],
  },
  {
    code: 'L2', level: 2, op: 'Summarize', zh: '摘要工具輸出',
    mapping: 'user research notes → persona / scenario page',
    detail: 'UR agent 跑完 8 場訪談、產出 200KB 逐字稿；不能整份塞給 Design agent——先摘進 persona 頁，摘的時候保留 verbatim quote 當證據。',
    refs: ['personas/*.md'],
  },
  {
    code: 'L3', level: 3, op: 'Merge Turns', zh: '合併對話輪次',
    mapping: 'sprint 內多次 design crit 合併成單一 decision',
    detail: '同一題開了 3 次討論、每次都有微調；不保留 3 份漸進筆記——merge 成一份 decision，把 trade-off 寫清楚。',
    refs: ['decisions/'],
  },
  {
    code: 'L4', level: 4, op: 'Global Summary', zh: '生成全局摘要',
    mapping: 'sprint retrospective + 下 sprint kickoff brief',
    detail: '每 2 週一份結構化摘要——這 sprint 完成什麼 decision、留下什麼 open question、帶什麼進下個 backlog；agent 跨 sprint 引用的入口。',
    refs: ['wiki/log.md'],
  },
  {
    code: 'L5', level: 5, op: 'Truncate', zh: '截斷最舊記錄',
    mapping: '舊 decisions 搬進 archive/（不刪除）',
    detail: '一年前的 decision 還在 active 範圍，agent 每次 query 都吃進來——主動搬進 archive，index 仍可達，但不擠當前 context。',
    refs: ['wiki/archive/2025-Q1/'],
  },
  {
    code: 'MV', level: 0, op: 'Model View', zh: '模型這輪看到的',
    mapping: '當 sprint 的工作 context',
    detail: 'active personas、當前 feature 的 decisions、本 sprint AC——agent 跑任務只給這份精選 context，不灌全 wiki。',
    refs: [],
  },
  {
    code: 'PV', level: 0, op: 'Persistent View', zh: '完整任務歷史',
    mapping: '整個 wiki + archive',
    detail: 'agent 需要時透過 query / index 取回片段，不預先塞進 context。MV/PV 分離是 harness 治理的核心，同理也是設計團隊治理的核心。',
    refs: [],
  },
];
