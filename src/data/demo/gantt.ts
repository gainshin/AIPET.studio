/**
 * 示例資料 · 一個通用產品專案的 UX 文件時間軸
 * 28 種文件型 = schemas/wikischema.schema.json 的 docTypes enum（單一真相源）；
 * sprint 配置與階段分組為示意，供 Timeline spec 展示用。
 * tier：A = markdown 原生（agent 可寫）、B = markdown+圖（混合）、
 *       C = 視覺原生（Figma 等，wiki 只留 metadata reference）。
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
  { code: 'S0', zh: '探索' },
  { code: 'S1', zh: '研究' },
  { code: 'S2', zh: '架構' },
  { code: 'S3', zh: '設計' },
  { code: 'S4', zh: '規格' },
  { code: 'S5', zh: '驗收' },
];

export const GANTT_PHASES: GanttPhase[] = [
  {
    zh: '探索', en: 'Discovery',
    activities: [
      { zh: '產品需求文件', en: 'PRD', sprints: [0], tier: 'A', storage: 'wiki/prd.md' },
      { zh: '功能清單', en: 'FEATURE LIST', sprints: [0], tier: 'A', storage: 'wiki/features.md' },
      { zh: '競品分析', en: 'COMPETITIVE ANALYSIS', sprints: [0, 1], tier: 'A', storage: 'wiki/research/competitors/*.md' },
    ],
  },
  {
    zh: '研究', en: 'Research',
    activities: [
      { zh: '研究計畫', en: 'RESEARCH PLAN', sprints: [0], tier: 'A', storage: 'wiki/research/plan.md' },
      { zh: '訪談指南', en: 'INTERVIEW GUIDE', sprints: [0], tier: 'A', storage: 'wiki/research/guide.md' },
      { zh: '訪談逐字稿', en: 'INTERVIEW TRANSCRIPT', sprints: [0, 1], tier: 'A', storage: 'wiki/research/interviews/*.md' },
      { zh: '問卷報告', en: 'SURVEY REPORT', sprints: [1], tier: 'A', storage: 'wiki/research/survey.md' },
      { zh: '使用者輪廓', en: 'PERSONA', sprints: [1], tier: 'A', storage: 'wiki/personas/*.md' },
      { zh: '同理心地圖', en: 'EMPATHY MAP', sprints: [1], tier: 'B', storage: 'wiki/research/empathy/*.md' },
      { zh: '任務目標', en: 'JTBD', sprints: [1], tier: 'A', storage: 'wiki/research/jtbd.md' },
      { zh: '旅程地圖', en: 'JOURNEY MAP', sprints: [1, 2], tier: 'B', storage: 'wiki/journeys/*.md' },
    ],
  },
  {
    zh: '架構', en: 'Architecture',
    activities: [
      { zh: '資訊架構', en: 'INFO ARCHITECTURE', sprints: [2], tier: 'B', storage: 'wiki/ia.md' },
      { zh: '網站地圖', en: 'SITEMAP', sprints: [2], tier: 'B', storage: 'wiki/sitemap.md' },
      { zh: '模組清單', en: 'MODULE LIST', sprints: [2], tier: 'A', storage: 'wiki/modules.md' },
      { zh: '頁面清單', en: 'PAGE LIST', sprints: [2], tier: 'A', storage: 'wiki/pages.md' },
      { zh: '使用者流程', en: 'USER FLOW', sprints: [2, 3], tier: 'B', storage: 'wiki/flows/*.md' },
    ],
  },
  {
    zh: '設計', en: 'Design',
    activities: [
      { zh: '線框稿註記', en: 'WIREFRAME NOTE', sprints: [3], tier: 'C', storage: 'Figma + wiki reference' },
      { zh: '原型註記', en: 'PROTOTYPE NOTE', sprints: [3, 4], tier: 'C', storage: 'Figma + wiki reference' },
      { zh: '介面文案表', en: 'COPY DECK', sprints: [3, 4], tier: 'A', storage: 'wiki/copy/deck.md' },
    ],
  },
  {
    zh: '規格', en: 'Specification',
    activities: [
      { zh: '元件規格', en: 'COMPONENT SPEC', sprints: [4], tier: 'C', storage: 'Figma + wiki/components/*.md' },
      { zh: '驗收標準', en: 'ACCEPTANCE CRITERIA', sprints: [4], tier: 'A', storage: 'wiki/specs/ac/*.md' },
    ],
  },
  {
    zh: '驗收', en: 'Validation',
    activities: [
      { zh: '可用性測試計畫', en: 'USABILITY TEST PLAN', sprints: [4], tier: 'A', storage: 'wiki/testing/plan.md' },
      { zh: '可用性測試報告', en: 'USABILITY TEST REPORT', sprints: [5], tier: 'A', storage: 'wiki/testing/report.md' },
      { zh: '啟發式評估', en: 'HEURISTIC EVALUATION', sprints: [5], tier: 'A', storage: 'wiki/testing/heuristic.md' },
      { zh: '無障礙稽核', en: 'A11Y AUDIT', sprints: [5], tier: 'A', storage: 'wiki/a11y.md' },
    ],
  },
  {
    zh: '系統 · 持續維護', en: 'System / Ongoing',
    activities: [
      { zh: '設計令牌規格', en: 'DESIGN TOKEN SPEC', sprints: 'all', tier: 'A', storage: 'stylepacks/*/DESIGN.md' },
      { zh: '風格指南', en: 'STYLE GUIDE', sprints: 'all', tier: 'A', storage: 'wiki/schema/style-guide.md' },
      { zh: '語氣與聲音', en: 'VOICE AND TONE', sprints: 'all', tier: 'A', storage: 'wiki/schema/voice-and-tone.md' },
      { zh: '決策紀錄', en: 'DECISION RECORD', sprints: 'all', tier: 'A', storage: 'wiki/decisions/*.md' },
    ],
  },
];
