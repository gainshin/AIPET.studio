/**
 * C1 · 完整甘特圖 — UX activities · 6 sprints × 28 documents
 * 來源：課程 V5 教材（人類 Curator 提供）；P2 wiki 落地後此資料平移為 wiki 頁。
 * tier：A = wiki 原生（agent 可寫）、B = 混合形式、C = Figma 原生（系統邊界外）。
 */

export type AiTier = 'A' | 'B' | 'C';

export interface GanttActivity {
  zh: string;
  en: string;
  /** 佔用的 sprint index（0–5）；'all' = 貫穿全程的 ongoing 項 */
  sprints: number[] | 'all';
  tier: AiTier;
  storage: string;
}

export interface GanttPhase {
  zh: string;
  en: string;
  activities: GanttActivity[];
}

export const SPRINTS = [
  { code: 'S0', zh: '探索期' },
  { code: 'S1', zh: '研究期' },
  { code: 'S2', zh: '架構期' },
  { code: 'S3', zh: '原型期' },
  { code: 'S4', zh: '規格期' },
  { code: 'S5', zh: '驗收期' },
];

export const GANTT_PHASES: GanttPhase[] = [
  {
    zh: '探索', en: 'Discovery',
    activities: [
      { zh: '利害關係人地圖', en: 'STAKEHOLDER MAP', sprints: [0], tier: 'A', storage: 'wiki/stakeholders.md' },
      { zh: '問題陳述', en: 'PROBLEM STATEMENT', sprints: [0], tier: 'A', storage: 'wiki/problem.md' },
      { zh: '競品分析', en: 'COMPETITIVE ANALYSIS', sprints: [0, 1], tier: 'A', storage: 'wiki/competitive.md' },
    ],
  },
  {
    zh: '研究', en: 'Research',
    activities: [
      { zh: '使用者訪談', en: 'USER INTERVIEWS', sprints: [0, 1], tier: 'A', storage: 'wiki/research/*.md' },
      { zh: '使用者輪廓', en: 'PERSONA', sprints: [1], tier: 'A', storage: 'wiki/personas/*.md' },
      { zh: '旅程地圖', en: 'JOURNEY MAP', sprints: [1, 2], tier: 'B', storage: 'wiki/journeys/*.md' },
    ],
  },
  {
    zh: '定義', en: 'Definition',
    activities: [
      { zh: '使用案例', en: 'USE CASES', sprints: [1], tier: 'A', storage: 'wiki/usecases/*.md' },
      { zh: '設計情境', en: 'DESIGN SCENARIOS', sprints: [1, 2], tier: 'A', storage: 'wiki/scenarios/*.md' },
      { zh: '成功指標', en: 'SUCCESS METRICS', sprints: [1], tier: 'A', storage: 'wiki/metrics.md' },
    ],
  },
  {
    zh: '架構', en: 'Architecture',
    activities: [
      { zh: '資訊架構 IA', en: 'INFO ARCHITECTURE', sprints: [2], tier: 'B', storage: 'wiki/ia.md' },
      { zh: '模組清單', en: 'MODULE LIST', sprints: [2], tier: 'A', storage: 'wiki/modules.md' },
      { zh: '頁面清單', en: 'PAGE LIST', sprints: [2], tier: 'A', storage: 'wiki/pages.md' },
      { zh: '使用者流程', en: 'USER FLOW', sprints: [2, 3], tier: 'B', storage: 'wiki/flows/*.md' },
      { zh: '導覽模型', en: 'NAVIGATION MODEL', sprints: [2], tier: 'A', storage: 'wiki/navigation.md' },
    ],
  },
  {
    zh: '設計', en: 'Design',
    activities: [
      { zh: '線框稿', en: 'WIREFRAMES', sprints: [3], tier: 'C', storage: 'Figma' },
      { zh: '視覺設計', en: 'VISUAL DESIGN', sprints: [3, 4], tier: 'C', storage: 'Figma' },
      { zh: '原型', en: 'PROTOTYPE', sprints: [4], tier: 'C', storage: 'Figma / HTML proto' },
      { zh: '介面文案', en: 'MICROCOPY', sprints: [3, 4], tier: 'A', storage: 'wiki/copy/*.md' },
    ],
  },
  {
    zh: '規格', en: 'Specification',
    activities: [
      { zh: '互動規格', en: 'INTERACTION SPEC', sprints: [4], tier: 'B', storage: 'wiki/interactions/*.md' },
      { zh: '邊界案例矩陣', en: 'EDGE CASE MATRIX', sprints: [4], tier: 'A', storage: 'wiki/edgecases.md' },
      { zh: '驗收標準', en: 'ACCEPTANCE CRITERIA', sprints: [4], tier: 'A', storage: 'wiki/ac/*.md' },
      { zh: '狀態圖', en: 'STATE DIAGRAMS', sprints: [4], tier: 'B', storage: 'wiki/states/*.md' },
    ],
  },
  {
    zh: '驗收', en: 'Validation',
    activities: [
      { zh: '測試計畫', en: 'TEST PLAN', sprints: [5], tier: 'A', storage: 'wiki/testing/plan.md' },
      { zh: '測試發現', en: 'TEST FINDINGS', sprints: [5], tier: 'A', storage: 'wiki/testing/findings/*.md' },
      { zh: '無障礙稽核', en: 'A11Y AUDIT', sprints: [5], tier: 'A', storage: 'wiki/a11y.md' },
    ],
  },
  {
    zh: '系統 · 持續維護', en: 'System / Ongoing',
    activities: [
      { zh: '設計令牌', en: 'DESIGN TOKENS', sprints: 'all', tier: 'A', storage: 'wiki/tokens.md + tokens.json' },
      { zh: '元件文件', en: 'COMPONENT DOCS', sprints: 'all', tier: 'C', storage: 'Figma + wiki/components/*.md' },
      { zh: '決策日誌', en: 'DECISION LOG', sprints: 'all', tier: 'A', storage: 'wiki/log.md' },
    ],
  },
];
