# AIPET.studio

**UX documents → UI 的可稽核工作流。** Agent 只能發 PatchOp、Red Team 必經、
人類三選一收斂、決策寫回 wiki——每一條都由 JSON Schema 與 lint 腳本
機器把關，不是靠自律。

不做 prompt-to-UI，不做 screenshot-to-UI：畫面是文件的投影，
**沒有文件出處的畫面在本系統的正式名稱是 slop**
（[ADR-0003](docs/adr/0003-ux-documents-to-ui.md)）。

## 兩個入口，一套規格

**人類**：跑起來，十分鐘走完閉環——

```bash
npm install
npm run dev            # http://localhost:3000（Theory / Style / Projects）
open poc/inspector.html   # 觀測：點元素看出處（op·rationale·規格引用）
open poc/editor.html      # 閉環：意圖 → ThoughtChain → 候選+審計 → 你三選一
```

**Agent / 機器**：規格從這四處載入——
[schemas/](schemas/)（六個 JSON Schema draft-07）、
[wiki/schema/agents/](wiki/schema/agents/)（五席 charter）、
[stylepacks/_bridge.map.json](stylepacks/_bridge.map.json)（語意 token 橋接）、
[scripts/lint-schema.mjs](scripts/lint-schema.mjs)（交叉驗證器）。
畫布定位一律走 `data-layer / data-name / data-module`，無標註即無效目標。

## 主張與驗證

每一條主張都能在 repo 內驗證；驗不出來就是 bug，歡迎開 issue。

| 主張 | 驗證位置 |
|---|---|
| Agent 對畫布的唯一合法輸出是 PatchOp；七個工作 lane + governance，`rationale` 為必填欄位 | [schemas/patchop.schema.json](schemas/patchop.schema.json) |
| Orchestrator 席位被 schema 強制為人類：`seat: orchestrator` 必須 `kind: human`，違者驗證失敗 | [schemas/agentcharter.schema.json](schemas/agentcharter.schema.json)（`allOf` 條款）|
| 五席各有 charter，六段結構（mission/inputs/outputs/forbidden/escalation/kpi）缺一不可 | [wiki/schema/agents/](wiki/schema/agents/) × `npm run lint:schema` |
| lane 越權的 op 被攔截並引用 charter 條文（例：red-team 發 color op 被拒——審計者不動手） | [poc/editor.html](poc/editor.html) 實際操作可重現 |
| rationale 為空的變更進不了 op log | [poc/editor.html](poc/editor.html) |
| 橋接表對每個 pack 覆蓋全部 15 個語意 token，且引用的 token 路徑必須真實存在——機器交叉驗證，非人工對照 | [scripts/lint-schema.mjs](scripts/lint-schema.mjs) 第 3 節 |
| 換膚 = 換 pack：PatchOp 與元件 class 一字不動 | [stylepacks/_bridge.map.json](stylepacks/_bridge.map.json) |
| /style 頁的每個色票與字級由 DESIGN.md frontmatter 即時解析——改文件、頁面跟著變，無手抄副本 | [src/core/frontmatter.ts](src/core/frontmatter.ts) → [src/pages/StyleGuide.tsx](src/pages/StyleGuide.tsx) |
| 圖表 series 色盤經六項自動檢查（亮度帶、彩度地板、CVD 分離、對比）；CVD 落在 8–12 地帶時，直標與 2px 縫為**強制**次要編碼並寫入規格 | [stylepacks/aipet-loyal-shadow/DESIGN.md](stylepacks/aipet-loyal-shadow/DESIGN.md)〈SVG 圖表規則〉|
| 28 種 UX 文件的歸位規則以 enum 鎖定（不多不少 28 種），wiki 結構偏離即驗證失敗 | [schemas/wikischema.schema.json](schemas/wikischema.schema.json) |
| 閉環有機器定義：workflow 必須宣告 `closure.writeBack`（decision 寫回哪些 wiki 路徑） | [schemas/workflowgraph.schema.json](schemas/workflowgraph.schema.json) |
| op log 為 append-only，修正以 `supersedes` 指向舊條目、不改寫歷史 | [schemas/oplog.schema.json](schemas/oplog.schema.json) |
| 全站任何斷點不允許水平捲軸；寬圖 = 桌面 SVG 等比縮放 + 窄版換版式 | DESIGN.md〈響應式鐵律〉+ 任一頁面 375px 實測 |

## 本 repo 還擋不住什麼

誠實的邊界，因為評估它的人一定會去試：

- **lint 驗形狀與引用一致性，不驗內容真偽。** 一筆欄位齊全但理由瞎掰的
  rationale 會通過 schema——抓它是 Red Team 的工作，不是 validator 的。
- **POC 的 op log 是 session 級示範**，尚未落地 git-native 的
  `oplog.json`（P2 範圍）；重新整理頁面即歸零。
- **lane 攔截目前實作在 Editor POC 的腳本內**，真正的 agent runtime
  攔截（P2）尚未存在。
- **Auditor 對 image / Figma 輸入的辨識還不存在**；目前僅 HTML +
  data-* 標註路線可走。
- **AIPET 五字定義未拍板**（[ADR-0001](docs/adr/0001-aipet-definition.md)
  仍為 Proposed），Theory 頁的五柱展開是佔位記錄。

以上每一項的補齊都排在路線圖上；擋得住的部分全部列於前表並可驗證。

## 模型

**三欄架構**（[ADR-0002](docs/adr/0002-three-column-architecture.md)）：

| 欄 | 內容 | 規則 |
|---|---|---|
| 左 · Raw Sources | PRD、journeymap、deck 等原始素材 | immutable：ingest 後永不改寫，修正以新版進 log |
| 中 · LLM Wiki | index / log / curated / schema 四層 | **唯一介面**：agent 不直讀 raw sources、不互相直接對話 |
| 右 · UX Agents | Design / Research / Copy / Red Team + **Orchestrator（人）** | 固定五席；新增席位需 charter 證明 + 人類簽核 |

**三節拍**（一個 feature = 一個回合）：

| 節拍 | 動作 | 產物 |
|---|---|---|
| Builder | 從 wiki 文件產出 2–3 個候選（PatchOp 批次） | candidates + rationale + refs |
| Auditor | Red Team 必經：判斷必附規格原文引用與可計算證據 | audit 回填（PASS / WARN + 證據） |
| Synthesis | **人類**三選一：採 A / 採 B / 都不採改 schema | decision + rationale 寫回 wiki，閉環成立 |

## 安裝、驗證與交付

```bash
npm install
npm run lint:schema    # 六 schema 可編譯 + packs/charters/橋接表交叉驗證，全綠才算過
npm run build          # 單一產物：SPA + poc/*.html → dist/，丟任何靜態主機即可
```

驗證你的第一次操作：開 [poc/editor.html](poc/editor.html)，送出快捷意圖
「試替代強調色」，採用候選 B——你應該看到 Red Team 引用 DESIGN.md
用色規則原文反對它。**看到有據可查的反對，這套系統就是活的。**

POC 頁自包含（`file://` 直開），workshop 現場斷網也能跑。

## 分階段閱讀

| 你是誰 | 依序讀 | 讀完應能回答 |
|---|---|---|
| **探索者**——會用 AI 生成，產出常不能用 | 本頁〈主張與驗證〉→ [ADR-0003](docs/adr/0003-ux-documents-to-ui.md) → 兩個 POC | 畫布元素的「出處」是哪三樣？為什麼生成快是治理問題？ |
| **建構者**——有個人工作流，要可靠可重複 | [CLAUDE.md](CLAUDE.md) 憲法 → [DESIGN.md](stylepacks/aipet-loyal-shadow/DESIGN.md) → [schemas/](schemas/) + lint 原始碼 → 五席 charter | skills 與 agents 的邊界在哪？你的哪些判斷還活在對話紀錄裡？ |
| **治理者**——AI PM / 設計主管帶團隊 | [PLAN.md](PLAN.md) → 三份 ADR → /style 頁 Harness 五層表 → [orchestrator charter](wiki/schema/agents/orchestrator-human.charter.md) | 編排權在誰手上？wiki 500 條 decision 後你的摘要與歸檔節奏是什麼？ |

## Canonical Contracts

| 路徑 | 用途 |
|---|---|
| [PLAN.md](PLAN.md) | 規劃書 v3：反目標、四層 wiki、風險對策 |
| [CLAUDE.md](CLAUDE.md) | 開工憲法八條 + 當前階段任務（違反即 reject） |
| [docs/adr/](docs/adr/) | 決策留痕：0001 定義（Proposed）· 0002 三欄 · 0003 documents→UI |
| [schemas/patchop.schema.json](schemas/patchop.schema.json) | 變更的唯一合法形狀：lane、target(data-*)、rationale、refs |
| [schemas/agentcharter.schema.json](schemas/agentcharter.schema.json) | 席位合約：六段結構 + orchestrator 強制人類 |
| [schemas/wikischema.schema.json](schemas/wikischema.schema.json) | 四層 wiki + 28 種 UX 文件歸位規則 |
| [schemas/oplog.schema.json](schemas/oplog.schema.json) | append-only 真相源；log.md 是它的人讀投影 |
| [schemas/workflowgraph.schema.json](schemas/workflowgraph.schema.json) | 三節拍 + 閉環（writeBack）的機器定義 |
| [schemas/stylepack.schema.json](schemas/stylepack.schema.json) | DESIGN.md frontmatter 的機器層合約 |
| [wiki/schema/agents/](wiki/schema/agents/) | 五席 charter（第五席 = 人類，也有 charter） |
| [stylepacks/_bridge.map.json](stylepacks/_bridge.map.json) | 15 個語意 token × 全部 pack 的橋接表 |
| [scripts/lint-schema.mjs](scripts/lint-schema.mjs) | 交叉驗證器：schema × pack × charter × bridge |
| [poc/inspector.html](poc/inspector.html) | 觀測面：唯讀、無寫入路徑 |
| [poc/editor.html](poc/editor.html) | 變更面：四階段 + lane 攔截 + 人類三選一 |

---

本 repo 不承諾好設計。它強制的是：**每個畫面有文件出處、每筆變更有
rationale 與規格引用、每次審計有可查證的反對、每個決策有負責的人。**
這個 repo 同時是教材——目標是讓 AI/UX 社群的每個學員 clone 下來，
就能跑通一個有 Audit 機制的 UX agent 工作流。
