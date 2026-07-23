/**
 * 示例資料 · Harness 五層壓縮對映到設計工作流
 * L1–L5 為 LLM 工程通用的 context 壓縮操作；MV/PV 為視圖分離。
 * 對映範例為通用示意，展示 Level table spec 用。
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
    mapping: '同一議題的多份重複筆記合併成單一頁',
    detail: '同一顆按鈕的文案，三份會議筆記各記了一次、說法略有出入——合併成一頁 decision，其餘標記取代。',
    refs: ['wiki/decisions/'],
  },
  {
    code: 'L2', level: 2, op: 'Summarize', zh: '摘要工具輸出',
    mapping: '長篇原始紀錄先摘要，再進下游',
    detail: '訪談逐字稿動輒數萬字，不能整份塞給下游 agent——先摘進 persona 頁，摘要時保留原句引述當證據。',
    refs: ['wiki/personas/*.md'],
  },
  {
    code: 'L3', level: 3, op: 'Merge Turns', zh: '合併對話輪次',
    mapping: '多輪討論收斂成一份含 trade-off 的決策',
    detail: '同一題開過幾次會、每次結論微調——不保留漸進筆記，merge 成一份 decision，把取捨寫清楚。',
    refs: ['wiki/decisions/'],
  },
  {
    code: 'L4', level: 4, op: 'Global Summary', zh: '生成全局摘要',
    mapping: '週期性結構化摘要，跨週期引用的入口',
    detail: '每個迭代週期產一份摘要：完成了哪些 decision、留下哪些 open question、帶什麼進下一輪——寫進 log.md。',
    refs: ['wiki/log.md'],
  },
  {
    code: 'L5', level: 5, op: 'Truncate', zh: '截斷最舊記錄',
    mapping: '舊決策搬進 archive/（不刪除）',
    detail: '久遠的 decision 還留在 active 範圍，每次 query 都被吃進 context——主動歸檔，index 仍可達、但不擠當前工作區。',
    refs: ['wiki/archive/'],
  },
  {
    code: 'MV', level: 0, op: 'Model View', zh: '模型這輪看到的',
    mapping: '當前週期的工作 context',
    detail: 'active personas、當前 feature 的 decisions、本輪驗收標準——agent 跑任務只給這份精選 context，不灌全庫。',
    refs: [],
  },
  {
    code: 'PV', level: 0, op: 'Persistent View', zh: '完整任務歷史',
    mapping: '整個 wiki + archive',
    detail: 'agent 需要時透過 query / index 取回片段，不預先塞進 context。MV/PV 分離是 context 治理的核心。',
    refs: [],
  },
];
