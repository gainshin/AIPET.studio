# AIPET.studio

**UX documents → UI。** 不是 prompt-to-UI，不是 screenshot-to-UI——
是把設計判斷先寫成可版本控管的文件，讓 agent 在人類監督下把文件變成介面。
**畫面是文件的投影；沒有文件出處的畫面，在這裡叫 slop。**

三欄架構的工具實現：左欄 immutable 原始素材 → 中欄 LLM Wiki（第二大腦）→
右欄四個專責 UX agent + Orchestrator（= 人類 Curator）。目標是幫 Agentic
產品設計/開發者跑通「Wiki → Builder → Auditor → Synthesis → 寫回 Wiki」的
POC 閉環——**至少讓你的團隊渡過 POC 階段，而且每一步可稽核。**

> 典範決策全文：[ADR-0003 · UX documents → UI](docs/adr/0003-ux-documents-to-ui.md)

---

## 這個 repo 為誰而寫

寫給 **UX 實踐者**與 **AI PM**——特別是正被組織要求「產出快」的那群人。
快不是問題；**沒有驗收機制的快才是**。每個機制都對準一個你天天遇到的痛：

| 你的現場 | 這裡的回答 | 在哪 |
|---|---|---|
| AI 生成物又快又多，但進不了 use flow | 三節拍閉環：Red Team 必經、無 rationale 不進 log、採不採由人收斂 | [poc/editor.html](poc/editor.html) |
| Figma 的 group/frame/component 命名沒人管 | 命名憲法：`data-layer/name/module` 三標註，缺一個 Auditor 直接 fail——**命名先於畫面** | [poc/inspector.html](poc/inspector.html) |
| Design tokens 沒人整理，一致性靠人肉盯 | StylePack DESIGN.md 單一真相源 + 語意橋接 + 機器驗證 | [stylepacks/](stylepacks/)、`npm run lint:schema` |

**不做的事**，同樣講清楚：不做 prompt-to-UI 生成器；不做「365 行 skill
拼湊、誰也管不了誰」的一人公司；不鑄頭銜。這裡交付的是**可驗收的工作流**
——每一條變更有出處、有判準、有人負責。

---

## 十分鐘上手（教學動線）

三站走完，你會親手摸到整個閉環。每站都有「你應該看到什麼」——
看不到就是環境有問題，不是你的問題。

```bash
npm install
npm run dev        # → http://localhost:3000
```

**第 1 站 · Inspector（3 分鐘）——先學會「觀測」**
打開 [poc/inspector.html](poc/inspector.html)（瀏覽器直開檔案也行）。
點畫布上任何元素。
✅ 你應該看到：它的 `data-layer/name/module` 身份、動過它的每一筆
PatchOp、每筆的 rationale 與規格引用。
❗ 注意面板底部那句話：Inspector 沒有任何寫入路徑——「儲存 HTML」不存在。

**第 2 站 · Editor（5 分鐘）——跑一次人機閉環**
打開 [poc/editor.html](poc/editor.html)，點快捷意圖「改 CTA 文案」→ 送出。
✅ 你應該看到：ThoughtChain 逐步展開（意圖分類 → 查 wiki → charter 檢查 →
產出候選 → Red Team 審計）→ 兩個候選附審計證據 → **三選一由你按**。
採用 A 之後看右下角 op log：一筆 content op + 一筆 decision，都有出處。
再試一次「試替代強調色」，故意採 B——看 Red Team 怎麼引用規格原文反對。

**第 3 站 · /style 頁（2 分鐘）——看見「文件 → 介面」**
開 [http://localhost:3000/style](src/pages/StyleGuide.tsx)。這一頁的每個色票、
字級、圖表 series，都是從 `stylepacks/aipet-loyal-shadow/DESIGN.md` 的
frontmatter **即時解析**出來的。
✅ 驗證方法：改 DESIGN.md 裡任何一個色值存檔，頁面跟著變——
這就是「畫面是文件的投影」的最小演示。

---

## 核心概念速覽

一行一個，細節點進去讀：

- **三欄架構**（[ADR-0002](docs/adr/0002-three-column-architecture.md)）：
  raw sources immutable → LLM Wiki 是唯一介面 → 五席 agent。
- **三節拍**：Builder 產候選 → Auditor 給證據（Red Team 必經）→
  Synthesis 由人三選一 → 寫回 wiki 才算閉環。
- **PatchOp 七 lane**（[schemas/patchop](schemas/patchop.schema.json)）：
  agent 只能發 op、不得重寫 HTML；lane 權限寫在各自 charter。
- **命名憲法**：`data-layer / data-name / data-module`，無標註 = Auditor fail。
- **StylePack**（[stylepacks/](stylepacks/)）：DESIGN.md frontmatter 是機器層、
  正文是人讀規格；換膚 = 換 pack，PatchOp 一字不動。
- **五席 charter**（[wiki/schema/agents/](wiki/schema/agents/)）：
  mission / inputs / outputs / forbidden / escalation / KPI——
  第五席是人類，也有 charter。
- **Harness 五層**（見 /style 頁 Figure 03）：Dedupe → Summarize →
  Merge → Global Summary → Truncate，wiki 不腐爛的 context 治理紀律。

---

## 分階段閱讀路徑

不同階段的 AI/UX 實踐者，入口不一樣。找到你的那一列，照順序讀；
每階段附「讀完你應該能回答」——答不出來就再讀一遍，答得出來就往下一階。

### 階段一 · 探索者——「我會用 AI 生成，但常覺得產出不能用」

你可能：每天用 ChatGPT/Claude/Figma AI 產東西，但成果進不了正式流程，
也說不清為什麼。

| 順序 | 讀什麼 | 為什麼 |
|---|---|---|
| 1 | 本 README 的〈十分鐘上手〉 | 先摸到閉環，再談概念 |
| 2 | [ADR-0003](docs/adr/0003-ux-documents-to-ui.md) | 理解「你的痛」的根因命名：slop = 沒有文件出處的畫面 |
| 3 | [Inspector POC](poc/inspector.html) 玩到熟 | 建立「每個畫面元素都該有出處」的直覺 |
| 4 | `/theory` 頁（跑 `npm run dev`） | AIPET 五柱 + 三欄架構圖的視覺版 |

**讀完你應該能回答**：① 為什麼「生成很快」反而是治理問題？
② 畫布上一個元素的「出處」包含哪三樣東西？（op、rationale、規格引用）

### 階段二 · 建構者——「我有個人 AI 工作流，想讓它可靠、可重複」

你可能：已在用 Claude Code / Cursor，有自己的 prompt 庫和 CLAUDE.md，
但每次產出品質不穩，知識散在對話紀錄裡。

| 順序 | 讀什麼 | 為什麼 |
|---|---|---|
| 1 | [CLAUDE.md](CLAUDE.md) 憲法八條 | 這是「把規則寫成文件」的範本——你的工作流也該有一份 |
| 2 | [Editor POC](poc/editor.html) + 原始碼 | 四階段（喚醒→表達→確認→反饋）如何落成介面；lane 攔截怎麼做 |
| 3 | [stylepacks/aipet-loyal-shadow/DESIGN.md](stylepacks/aipet-loyal-shadow/DESIGN.md) | 單一真相源的完整範例：frontmatter 機器層 + 正文人讀層 |
| 4 | [schemas/](schemas/) 六個 JSON Schema + [scripts/lint-schema.mjs](scripts/lint-schema.mjs) | 「改 schema 比改每個頁面有效」的落地——機器怎麼替你把關 |
| 5 | [wiki/schema/agents/](wiki/schema/agents/) 五份 charter | agents ≠ skills + claude.md：差在 charter、lane、可稽核 |

**讀完你應該能回答**：① skills 和 agents 的邊界在哪？（無狀態能力 vs
有 charter/lane/op 管線的角色）② 你自己的工作流裡，哪些判斷還活在
「對話紀錄」而不是「可引用的文件」？③ `lint:schema` 攔得住哪四類錯誤？

### 階段三 · 治理者——「我是 AI PM / 設計主管，要帶團隊接住這套」

你可能：團隊人人在用 AI，但「個人會用 ≠ 團隊具備」；你要管的是
知識治理、角色分工、工作流成熟度。

| 順序 | 讀什麼 | 為什麼 |
|---|---|---|
| 1 | [PLAN.md](PLAN.md) 全文 | 完整的系統論證：反目標、四層 wiki、風險對策 |
| 2 | 三份 ADR（[0001](docs/adr/0001-aipet-definition.md)·[0002](docs/adr/0002-three-column-architecture.md)·[0003](docs/adr/0003-ux-documents-to-ui.md)） | 決策怎麼留痕——你的團隊也需要 ADR 紀律 |
| 3 | /style 頁 Figure 03 · Harness 五層表 | team-scale 的 context 治理：wiki 上千頁後怎麼不腐爛 |
| 4 | [orchestrator-human.charter.md](wiki/schema/agents/orchestrator-human.charter.md) | 人類席位的 KPI：閉環完成率、待辦消化節奏、schema 槓桿比 |
| 5 | [red-team-agent.charter.md](wiki/schema/agents/red-team-agent.charter.md) + Editor POC 的審計 WARN 案例 | 「有據可查的反對」如何制度化——這是驗收文化的核心 |

**讀完你應該能回答**：① 你的團隊裡「編排權」現在在誰手上——人、
還是某個沒人審的自動化？② 如果明天 wiki 有 500 條 decision，
你的 L4（全局摘要）和 L5（歸檔）節奏是什麼？③ 新人 onboarding
第一天，該讀的「憲法」存在嗎？

---

## 快速開始（指令備忘）

```bash
npm install
npm run dev          # 開發伺服器 http://localhost:3000
npm run build        # 全打包：SPA + poc/*.html → dist/（單一產物）
npm run lint:schema  # 驗證 stylepacks 與 charters 通過各自 JSON Schema
```

一個 repo 就是完整交付物：build 後 `dist/` 可直接丟任何靜態主機；
POC 頁支援 `file://` 直開，workshop 現場沒網路也能跑。

## Repo 地圖

```
AIPET_studio/
├── PLAN.md · CLAUDE.md          # 規劃書 + 憲法（人讀規格的最上游）
├── docs/adr/                    # 架構決策（0001 定義 · 0002 三欄 · 0003 documents→UI）
├── schemas/                     # 六個 JSON Schema draft-07：機器層的憲法
├── wiki/schema/agents/          # 五席 charter（第五席 = 人類，也有 charter）
├── stylepacks/                  # 設計系統：<pack>/DESIGN.md + _bridge.map.json
├── poc/                         # 自包含 HTML POC（file:// 可直開）
│   ├── inspector.html          # Do 為主：唯讀觀測與稽核
│   └── editor.html             # Do+Chat 均衡：四階段 + 三選一
├── src/
│   ├── pages/                  # Theory / Style / Projects
│   ├── components/figures/     # 甘特、三欄架構圖、Harness 表
│   ├── core/                   # stylepack parser · frontmatter 解析
│   └── data/course-v5/         # 課程實例資料（P2 起平移為 wiki 頁）
├── scripts/lint-schema.mjs      # ajv 交叉驗證（schema × pack × charter × bridge）
└── dist/                        # build 產物（gitignored；deploy 即丟這包）
```

資料流永遠單向：**UX documents（markdown/wiki）→ 解析（core/）→
介面（pages、poc/）**。改文件，介面跟著變；反向不存在。

## Agent 互動模式

Editor / Inspector 的互動骨架對映業界 AI 混合介面實務（參考 Ant Design X 的
RICH 範式與四階段模型），並綁定本 repo 憲法：

| 階段 | Editor 中的實現 | 憲法對應 |
|---|---|---|
| 喚醒 | Welcome + 快捷意圖 chips | agent charter 的 mission |
| 表達 | 自然語言 Sender + 畫布選取雙區聯動 | 中欄是唯一介面 |
| 確認 | ThoughtChain 過程可見 | Builder 節拍；機器只產報告 |
| 反饋 | 候選 + 審計證據 + 來源引用 + **人類三選一** | Auditor 必經；Synthesis 由人收斂 |

Inspector 則是 Do 為主的核查面——反饋階段的稽核介面，無任何寫入路徑。

## 目前狀態與路線

**已完成**：P0 六項（repo 重整、Vite 遷移、六 schema、StylePack 體系、
五席 charter、ADR×3）+ 品牌設計系統 + /style 樣式說明頁 + 三個課程級
figure + Inspector/Editor POC。

**進行中／待拍板**：AIPET 五字定義（ADR-0001）、layer-inspector.html 素材、
CTBC deck ingest、Auditor 示範素材優先序、pattern taxonomy + behavior
rubric 條文化（下一階段主線）。

**這個 repo 同時是教材**：目標是在 AI/UX 社群授課與交流時，讓每個學員
clone 下來就能跑通一個「有 Audit 機制的 UX agent 工作流」——
你現在讀的這份 README，就是課程的第零章。
