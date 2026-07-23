# AIPET.studio

**UX documents → UI。** 不是 prompt-to-UI，不是 screenshot-to-UI——
是把設計判斷先寫成可版本控管的文件，讓 agent 在人類監督下把文件變成介面。
**畫面是文件的投影；沒有文件出處的畫面，在這裡叫 slop。**

三欄架構的工具實現：左欄 immutable 原始素材 → 中欄 LLM Wiki（第二大腦）→
右欄四個專責 UX agent + Orchestrator（= 人類 Curator）。幫助 Agentic 產品
設計/開發者在 POC 階段跑通「Wiki → Builder → Auditor → Synthesis → 寫回
Wiki」的完整閉環。

- 典範決策：[ADR-0003 · UX documents → UI](docs/adr/0003-ux-documents-to-ui.md)
- 規劃書：[PLAN.md](PLAN.md) · 開發憲法：[CLAUDE.md](CLAUDE.md) · 全部決策：[docs/adr/](docs/adr/)

## 這個 repo 為誰而寫

寫給 **UX 實踐者**與 **AI PM**——特別是正被組織要求「產出快」的那群人。
快不是問題；**沒有驗收機制的快才是**。這裡的每個機制都對準一個你天天遇到的痛：

| 你的現場 | 這裡的回答 | 在哪 |
|---|---|---|
| AI 生成物又快又多，但進不了 use flow | 三節拍閉環：Red Team 必經、無 rationale 不進 log、採不採由人收斂 | [Editor POC](poc/editor.html) |
| Figma 的 group/frame/component 命名沒人管，agent 和同事都找不到東西 | 命名憲法：`data-layer/name/module` 三標註，缺一個 Auditor 直接 fail——**命名先於畫面** | [Inspector POC](poc/inspector.html) |
| Design tokens 沒人整理，一致性靠人肉盯 | StylePack DESIGN.md 單一真相源 + 語意橋接 + `lint:schema` 機器驗證 | [stylepacks/](stylepacks/) · [/style 頁](src/pages/StyleGuide.tsx) |

**不做的事**，同樣講清楚：不做 prompt-to-UI 生成器；不做「365 行 skill
拼湊、誰也管不了誰」的一人公司；不鑄頭銜——這個 repo 交付的是
**可驗收的工作流**，每一條變更有出處、有判準、有人負責。

## 快速開始

```bash
npm install
npm run dev          # 開發伺服器 http://localhost:3000
npm run build        # 全打包：SPA + poc/*.html → dist/（單一產物）
npm run lint:schema  # 驗證 stylepacks 與 charters 通過各自 JSON Schema
```

一個 repo 就是完整交付物：`npm run build` 之後，`dist/` 可直接丟任何靜態主機
（SPA、兩個 POC 頁、字型外全部自包含）。POC 頁也支援 `file://` 直開。

## Repo 地圖

```
AIPET_studio/
├── PLAN.md · CLAUDE.md          # 規劃書 + 憲法（人讀規格的最上游）
├── docs/adr/                    # 架構決策（0001 AIPET 定義 · 0002 三欄架構 · 0003 documents→UI）
├── schemas/                     # 六個 JSON Schema draft-07：機器層的憲法
│   └── stylepack / patchop / oplog / agentcharter / workflowgraph / wikischema
├── wiki/schema/agents/          # 五席 charter（第五席 = 人類，也有 charter）
├── stylepacks/                  # 設計系統：<pack>/DESIGN.md + _bridge.map.json
│   └── aipet-loyal-shadow      # 品牌主題（含 chart series / sequential ramp）
├── poc/                         # 自包含 HTML POC（file:// 可直接開）
│   ├── inspector.html          # Do 為主：唯讀觀測與稽核
│   └── editor.html             # Do+Chat 均衡：喚醒→表達→確認→反饋 四階段
├── src/
│   ├── pages/                  # Theory / Style / Projects
│   ├── components/figures/     # 甘特、三欄架構圖、Harness 表（spec 級 figure）
│   ├── core/                   # stylepack parser · frontmatter（單一真相源解析）
│   └── data/course-v5/         # 課程實例資料（P2 起平移為 wiki 頁）
├── scripts/lint-schema.mjs      # ajv 交叉驗證（schema × pack × charter × bridge）
└── dist/                        # build 產物（gitignored；deploy 即丟這包）
```

三層真相源，方向永遠單向：**UX documents（markdown/wiki）→ 解析（core/）→
介面（src/pages、poc/）**。改文件，介面跟著變；反向不存在——這就是
ADR-0003 的日常形態。

## Agent 互動模式

Editor / Inspector 的互動骨架對映業界 AI 混合介面實務（參考 Ant Design X 的
RICH 範式與四階段模型），並綁定本 repo 憲法：

| 階段 | Editor 中的實現 | 憲法對應 |
|---|---|---|
| 喚醒 | Welcome + 快捷意圖 chips（能做什麼、意圖範圍） | agent charter 的 mission |
| 表達 | 自然語言 Sender + 畫布選取雙區聯動（target context） | 中欄是唯一介面 |
| 確認 | ThoughtChain 過程可見：意圖分類 → 查 wiki → charter 檢查 → 產候選 | Builder 節拍；機器只產報告 |
| 反饋 | 候選 + Red Team 審計證據 + 來源引用 + **人類三選一** | Auditor 必經；Synthesis 由人收斂 |

Inspector 則是 Do 為主的核查面——反饋階段的稽核介面，無任何寫入路徑。

## 目前狀態

P0 六項全數完成（repo 重整、Vite 遷移、六 schema、StylePack 體系、五席
charter、兩份 ADR）；另已交付品牌設計系統（aipet-loyal-shadow）、/style 樣式
說明頁、三個課程級 figure、Inspector/Editor POC、ADR-0003 典範決策。
待人類拍板：AIPET 五字定義（ADR-0001）、layer-inspector.html 素材、
CTBC deck ingest、Auditor 示範素材優先序。
