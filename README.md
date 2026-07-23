# AIPET.studio

**把 UX 文件變成 UI 的可稽核工作流。** 不是 prompt-to-UI、不是
screenshot-to-UI——是把設計判斷先寫成文件，讓 AI 在人類監督下把文件變成
介面。畫面是文件的投影；沒有文件出處的畫面，在這裡叫 **slop**。

這個 repo（＝專案資料夾，附完整修改歷史）同時是**工具**和**教材**。
你不需要是工程師才能用它——先從下面選你的入口。

---

## 先選你的入口

| 你比較像誰 | 你平常的工具 | 從哪開始 | 需要安裝嗎 |
|---|---|---|---|
| **A · 設計工具使用者** | Figma、ChatGPT、Canva | [路徑 A](#路徑-a設計工具使用者雙擊就能開始) | **完全不用**，雙擊兩個檔案 |
| **B · UX 設計主管** | PRD、ticket、QA 驗收、組件庫 | [路徑 B](#路徑-bux-設計主管你已經在做的事這裡都有對應物) | 三行指令（可請工程師代跑） |
| **C · AI PM** | 產品迭代、自建 AI 工作流 | [路徑 C](#路徑-cai-pm把三節拍當你的產品迭代循環) | 同 B |

---

## 路徑 A：設計工具使用者——雙擊就能開始

**你不需要打開終端機**（就是工程師那個黑底白字的指令視窗——這條路徑
全程用不到它）。

**Step 1 · 取得資料夾**
如果你是從 GitHub 網頁看到這裡：點綠色 **Code** 按鈕 → **Download ZIP**
→ 解壓縮。你會得到一個叫 `AIPET_studio` 的資料夾——把它當成一個
Figma 檔案的資料夾版：裡面每份文件都有歷史紀錄。

**Step 2 · 打開觀測器**
進入 `poc` 資料夾，**雙擊 `inspector.html`**——它會用你的瀏覽器打開，
是一個獨立網頁，不會安裝或改動任何東西。

**Step 3 · 點畫面上的任何元素**
✅ 你應該看到：右欄顯示這個元素「是誰」（三個身份標籤）、
「被哪些變更動過」、每筆變更的**理由**和**引用了哪條設計規則**。
🔍 對照你熟的世界：這就像在 Figma 選一個 layer 看右側 Inspect 面板——
差別是這裡多了「每一筆修改的理由與依據」，而且**改不動**（觀測器是唯讀的）。

**Step 4 · 打開編輯器，跑一次「人機協作」**
回到 `poc` 資料夾，**雙擊 `editor.html`**。點快捷意圖「**改 CTA 文案**」
→ 按「送出意圖」。
✅ 你應該看到：AI 一步一步展示它的思考（讀規則 → 查權限 → 產出兩個候選案）
→ 每個候選附「審核意見」→ **最後由你按「採 A」或「採 B」**。
🔍 對照你熟的世界：這就像你給 ChatGPT 下指令，但多了三件 ChatGPT 沒有的事——
AI 的思考過程攤開可見、有另一個 AI 當審核提出反對意見、**最終決定權在你**。

**Step 5 · 看一個「有據可查的反對」**
再點「**試替代強調色**」→ 送出 → 這次看候選 B 的審核意見：
它會**引用設計規則的原文**告訴你為什麼綠色不能當強調色。
這就是整套系統的核心：AI 的反對不是感覺，是引用條文。

走完五步，你已經體驗了這個 repo 的全部主張。想繼續，
往下看〈術語對照表〉再進路徑 B。

### 術語對照表（給路徑 A 的你）

| 這裡的詞 | 它其實是 | 你世界裡最像的東西 |
|---|---|---|
| repo | 附完整修改歷史的專案資料夾 | Figma 檔案 + Version history |
| Markdown（.md） | 純文字文件格式，用 `#` 做標題 | 沒有排版工具列的 Google Doc；AI 最容易讀 |
| commit | 一次「版本存檔」，附說明文字 | Figma 手動存的版本點 |
| branch | 同一專案的平行版本 | Figma branching |
| wiki | 放所有設計判斷文件的資料夾 | 團隊的 Notion，但每頁都有版本管理 |
| design token | 把顏色/字級/間距命名成變數 | Figma Variables／Styles |
| JSON Schema | 機器讀的欄位規格書 | Component 的 property 定義——型別填錯會報錯 |
| lint | 自動檢查器，逐條對規格 | 跑一個「找出所有沒掛 Style 的顏色」的外掛 |
| PatchOp | 一筆變更申請單：改哪、改成什麼、為什麼、依據哪條 | 有理由欄位的設計 ticket |
| agent | 被指派特定職責的 AI 角色，有授權範圍 | 一個只被允許做份內事的外包協作者 |
| terminal／npm | 指令視窗／工程打包工具 | 路徑 A 用不到；路徑 B 會碰三行 |

---

## 路徑 B：UX 設計主管——你已經在做的事，這裡都有對應物

你已經懂 PRD、會發 ticket、跟 QA 交涉過驗收、開始管 tokens 和組件庫規範。
這個 repo 做的事就是**把你在做的治理，換成機器幫你把關**：

| 你團隊現在的做法 | 這裡的對應物 | 差在哪 |
|---|---|---|
| PRD / feature spec | wiki 的 feature 文件（[28 種 UX 文件歸位規則](schemas/wikischema.schema.json)） | 文件變成 AI 可引用的判準，不只給人看 |
| 需求 ticket | [PatchOp](schemas/patchop.schema.json) | 理由（rationale）是**必填欄位**，空白直接被擋 |
| QA 驗收 | Red Team 審計（[charter](wiki/schema/agents/red-team-agent.charter.md)） | 驗收意見必須附**規格原文引用**，不收「感覺不對」 |
| SA 分析 / use flow | [workflowgraph](schemas/workflowgraph.schema.json) | 流程含機器定義的「閉環」：決策沒寫回文件不算完成 |
| 組件庫規範 | 五席 agent charter + lane 權限 | 越權修改被 runtime 攔截，不靠 code review 抓 |
| design tokens 表 | [StylePack DESIGN.md](stylepacks/aipet-loyal-shadow/DESIGN.md) + [橋接表](stylepacks/_bridge.map.json) | 單一真相源：改文件、介面自動跟上；橋接完整性機器驗證 |
| UX 文件版本管理 | git + append-only log（[oplog](schemas/oplog.schema.json)） | 歷史不可改寫，修正用新版本疊加 |

**上手（三行指令，或請工程師代跑）**：

```bash
npm install
npm run lint:schema   # 全部規格交叉驗證，全綠 = 文件與規則一致
npm run dev           # http://localhost:3000 → 看 /style 頁
```

打開 `/style` 頁後做一個實驗：改 `stylepacks/aipet-loyal-shadow/DESIGN.md`
裡任何一個色值、存檔——頁面即時跟著變。**這就是「畫面是文件的投影」**，
也是你要求 tokens 規範性的終極形態：規格不再需要人肉同步。

**再往下讀**：[CLAUDE.md](CLAUDE.md)（團隊憲法怎麼寫）→
〈主張與驗證〉（下方，每條治理主張都可查證）→
/style 頁的 Harness 五層表（wiki 幾百條決策之後怎麼不腐爛）。

---

## 路徑 C：AI PM——把三節拍當你的產品迭代循環

你可能正在做第一個產品、自己摸索半自動化的 AI 工作流，
但沒受過用戶訪談或 UX writing 訓練。兩個直接可用的東西：

**1 · 三節拍 = 你的迭代循環**（一個 feature 一回合）：

| 節拍 | 動作 | 對你的意義 |
|---|---|---|
| Builder | AI 從文件產出 2–3 個候選 | 不再要求 AI「一次給我對的」，而是要它給**可比較的選項** |
| Auditor | 另一個 AI 引規格提出反對與證據 | 你缺的「專業把關」由制度補：反對必須引條文 |
| Synthesis | **你**三選一，理由寫回文件 | 決策留痕。三個月後你還知道當初為什麼這樣選 |

先開 [poc/editor.html](poc/editor.html)（雙擊即開）跑一遍，
再看 [五席 charter](wiki/schema/agents/) 理解「一個 agent 一份授權書」
怎麼寫——**agents ≠ skills + 一份 claude.md**：差在有授權範圍、
有越權攔截、產出可被審計。

**2 · 28 種 UX 文件清單 = 你的補課地圖**。
[wikischema](schemas/wikischema.schema.json) 裡鎖定了 28 種 UX 文件
（persona、訪談紀錄、可用性測試計畫、文案表……）。把它當 checklist：
你的產品現在有幾種？沒有的那些，就是你「只靠自己用產品看評測」
補不到的盲區——每種文件的存在本身就是一種研究方法的提醒。

**誠實提醒**：這個 repo 給你工作流的骨架與把關機制，
但它驗的是形狀不是真偽——訪談做不做、文案好不好，仍是人的工作。

---

## 主張與驗證（給想查證的人）

每條主張都能在 repo 內驗證；驗不出來就是 bug，歡迎開 issue。

| 主張 | 驗證位置 |
|---|---|
| Agent 對畫布的唯一合法輸出是 PatchOp；rationale 必填 | [schemas/patchop.schema.json](schemas/patchop.schema.json) |
| Orchestrator 席位被 schema 強制為人類，違者驗證失敗 | [schemas/agentcharter.schema.json](schemas/agentcharter.schema.json)（`allOf`） |
| 五席 charter 六段結構缺一不可，機器驗證 | [wiki/schema/agents/](wiki/schema/agents/) × `npm run lint:schema` |
| lane 越權 op 被攔截並引用 charter 條文 | [poc/editor.html](poc/editor.html) 可重現（red-team 發 color op 被拒） |
| 橋接表 15 語意 token × 每 pack 全覆蓋、引用路徑存在——機器交叉驗證 | [scripts/lint-schema.mjs](scripts/lint-schema.mjs) |
| /style 頁由 DESIGN.md 即時解析，無手抄副本 | [src/core/frontmatter.ts](src/core/frontmatter.ts) |
| 圖表色盤經六項自動檢查；CVD 邊界時直標+2px 縫為強制編碼 | [DESIGN.md](stylepacks/aipet-loyal-shadow/DESIGN.md)〈SVG 圖表規則〉 |
| 28 種 UX 文件歸位以 enum 鎖定 | [schemas/wikischema.schema.json](schemas/wikischema.schema.json) |
| 閉環有機器定義：decision 必須寫回 wiki | [schemas/workflowgraph.schema.json](schemas/workflowgraph.schema.json) |
| op log append-only，修正以 supersedes 疊加 | [schemas/oplog.schema.json](schemas/oplog.schema.json) |
| 任何斷點不允許水平捲軸；寬圖桌面縮放、窄版換版式 | DESIGN.md〈響應式鐵律〉+ 375px 實測 |

## 本 repo 還擋不住什麼

誠實的邊界，因為評估它的人一定會去試：

- **lint 驗形狀與引用一致性，不驗內容真偽**——欄位齊全但理由瞎掰的
  rationale 會通過 schema；抓它是 Red Team 的工作。
- **POC 的 op log 是 session 級示範**，git-native 的 `oplog.json` 在
  P2 落地；重新整理頁面即歸零。
- **lane 攔截目前在 Editor POC 腳本內**，真正的 agent runtime 攔截尚未存在。
- **Auditor 對 image / Figma 輸入的辨識還不存在**；目前僅 HTML + data-*
  標註路線。
- **AIPET 五字定義未拍板**（[ADR-0001](docs/adr/0001-aipet-definition.md)），
  Theory 頁五柱展開是佔位記錄。

## Canonical Contracts（關鍵檔案索引）

| 路徑 | 用途 |
|---|---|
| [PLAN.md](PLAN.md) | 規劃書 v3：反目標、四層 wiki、風險對策 |
| [CLAUDE.md](CLAUDE.md) | 開工憲法八條 + 當前任務（違反即 reject） |
| [docs/adr/](docs/adr/) | 決策留痕：0001 定義 · 0002 三欄架構 · 0003 documents→UI |
| [schemas/](schemas/) | 六個 JSON Schema：patchop · agentcharter · wikischema · oplog · workflowgraph · stylepack |
| [wiki/schema/agents/](wiki/schema/agents/) | 五席 charter（第五席 = 人類，也有 charter） |
| [stylepacks/](stylepacks/) | 設計系統真相源 + `_bridge.map.json` 語意橋接 |
| [scripts/lint-schema.mjs](scripts/lint-schema.mjs) | 交叉驗證器：schema × pack × charter × bridge |
| [poc/inspector.html](poc/inspector.html) | 觀測面：唯讀、雙擊可開 |
| [poc/editor.html](poc/editor.html) | 變更面：四階段 + 攔截 + 人類三選一、雙擊可開 |

---

本 repo 不承諾好設計。它強制的是：**每個畫面有文件出處、每筆變更有
理由與規格引用、每次審計有可查證的反對、每個決策有負責的人。**
目標是讓 AI/UX 社群的每個學員拿到它，就能跑通一個有 Audit 機制的
UX agent 工作流——從雙擊兩個 HTML 檔案開始。
