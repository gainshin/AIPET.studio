# AIPET.studio — 規劃書 PLAN.md (v3)

> v3 · 2026-07-10 · 取代 v2
> v2 → v3 的關鍵修正：**Orchestrator = YOU（人類 Curator），不是 AI 主 agent。第二大腦 = LLM Wiki（外置記憶），不是自主決策者。** 全面對齊課程 V5 的三欄架構與三節拍辯證。

---

## 0. 一句話定位

**AIPET.studio 是三欄架構的工具實現：左欄不可變原始素材、中欄 LLM Wiki（第二大腦）、右欄專責 agents——幫助 Agentic 產品設計/開發者以 UX Writer / Curator 的疊加身份，在 POC 階段跑通「Wiki → Builder → Auditor → Synthesis → 寫回 Wiki」的完整閉環。**

### 反目標（不變 + 強化）

- ❌ 不做一人公司（365 行 skill 拼湊、無人治理）
- ❌ **不做自主決策的 AI Orchestrator**——編排權在人。工具負責把「策展成本」壓到最低（LINT 自動化、cross-ref 建議、漂移報告），但判斷與收斂永遠是 Curator 的責任
- ❌ 不做 Obsidian 式知識圖譜（V5 已論證：graph 不是可執行規格；wiki 的價值在 schema 可被 agent 讀取執行）
- ❌ 不依賴凍結外部資料集作批評基準（前三版死因）

---

## 1. 三欄架構 — 系統的憲法

```
RAW SOURCES ──MarkItDown──▶ LLM WIKI（第二大腦）◀──query──▶ UX AGENTS
immutable                    index.md   分類目錄            Design Agent
PRD / featurelist            log.md     時序記錄·每條 immutable Research Agent
journeymap                   persona/ · decisions/ 主題頁    Copy Agent
modulelist / pagelist        cross-ref · backlinks · tags    Red Team Agent
userflow                     ── Schema / CoT ──              ─────────────
                             檔名規範·lint 規則·voice&tone    Orchestrator
                             agent charters（v3 移入此層）     = YOU · Curator
                             ↑ LINT · periodic audit ↑
```

三條不可違反的規則：

1. **左欄 immutable**：原始素材 ingest 後永不改寫。任何修正以新版本進 log，舊版留檔。
2. **中欄是唯一介面**：agents 不直接讀 raw sources、不互相直接對話；一切經 wiki query。cross-ref/backlinks/tags 是「不維護就退化」的關鍵資產，工具必須把維護成本自動化到接近零。
3. **右欄只有五席**：四個專責 worker + Orchestrator（人類）。Orchestrator 無需任何 AI 席位——**編排是寫作行為**：改 schema、改 charter、改 lint 規則，比逐頁改內容有效。

---

## 2. 第二大腦 = LLM Wiki 的四層規格

| 層 | 內容 | 對應機制 |
|---|---|---|
| `index.md` | 分類目錄 CATALOG | 由工具自動再生（categorize 半自動化） |
| `log.md` | 時序記錄，**每條 immutable** | ＝ event-sourced op log 的人類可讀投影。同一資料源，兩種視圖，不做兩套 |
| `persona/ · decisions/ …` | 策展主題頁（28 種 UX 文件儲存規範） | Curator 手寫 + agent 草擬、人審 |
| **Schema / CoT 層** | 檔名規範 · cross-ref 慣例 · lint 規則 · voice & tone · **agent charters** | 系統的槓桿點：「改 schema 比改每個頁面有效」。schema 變更本身寫入 log |

### Agent Charter（自 v2 保留，位置修正）

charter 不再是獨立的 `charters/` 子系統，而是 **wiki schema 層的頁面**（`schema/agents/design-agent.md`）。格式沿 v2（mission / inputs / outputs / forbidden / escalation / KPI），但：

- charter 修訂 = 一筆 log 條目（governance 類），可回溯
- **漂移偵測是機器產報告、人做裁決**：runtime 攔截越權 op（硬性）、週期 LINT 產出「定位偏移報告」放進 Curator Console 待辦（軟性）——v2 讓 AI orchestrator 自主修正的設計刪除
- 第六席閘門不變：證明現有 charter 涵蓋不了 + Curator 簽核

### Ingest 防失真（V5 新增要求）

MarkItDown 是入場券不是答案。ingest 管線內建四項失真檢查（對應 V5 的四種掏空情境），產出 ingest QA 報告：轉檔後資訊密度比對、表格/圖說存活率、層級結構保留度、設計語意標註缺口——不通過就標記 `needs-curation`，逼 Curator 補寫，不讓空殼 markdown 混進 wiki。

---

## 3. 三節拍辯證 — 正典工作流（取代 v2 的正典回合）

**一個 feature = 一個完整回合；Red Team 必經；寫回 wiki 才算閉環。**

```
① Builder 節拍   Curator 從 wiki 發 feature spec → Design/Copy Agent 產 candidates（PatchOp 批次）
② Auditor 節拍   Red Team 必經：三組基線 research 判準 + 第四層 AIPET（agentive）
                 → 每個 candidate 回填 audit（附規格原文引用 + 可計算證據）
③ Synthesis 節拍 Curator 讀 contradiction，三選一收斂（採 A / 採 B / 都不採改 schema）
                 → 決策 + rationale 寫回 wiki（decisions/ + log.md）→ 閉環
```

- **兩組 IDE 配對、共享同一 Repo**：Builder 端與 Auditor 端各自開工，wiki + op log 以 git 為同步媒介。因此所有狀態必須 **git-native**（markdown + JSON，無私有 DB）——v2 的 IndexedDB 降級為本地快取，真相在 repo。
- Auditor 判準疊四層：三組基線研究框架（含 NN/g 五原則的座標轉換）+ AIPET 第四層。判斷必附引用；`preferences.jsonl` 繼續累積 Curator 的三選一紀錄作回歸集。

---

## 4. 工作台 — layer-inspector 演進（v2 保留，視圖調整）

| 視圖 | v3 狀態 |
|---|---|
| 既有 8 視圖（Preview/Rationale/Tokens/CSS/Tailwind/Markdown/Sitemap/Flow） | 保留；Markdown/Rationale 直接讀寫 wiki 頁 |
| History（第 9） | op log 時間軸 + 分 lane rollback；與 `log.md` 同源雙視圖 |
| **Curator Console（第 10，取代 v2 的 Agents 視圖）** | 策展三件事儀表：schema 編輯器（charters/lint/檔名規範）、cross-ref 缺口建議、categorize 待辦；＋ 漂移報告、ingest QA 報告、三選一待裁決區 |
| Candidate 並排 | Builder 產出 2–3 欄並排，各附 Auditor 四層報告 |

StylePack / 語意 token 橋接 / PatchOp 七 lane / SVG chart spec / 粒子 preset 全部沿 v1–v2，不重述。`data-layer` 標註規範照舊：無標註者 Auditor 直接 fail。

---

## 5. 路線圖 — 以課程 V5 五堂課為驗收腳本

**P0 · 地基（1–2 週）**
- [ ] AIPET 定義拍板（ADR-0001）；repo 重整 main、CRA→Vite、layer-inspector 模組化
- [ ] Schema 六件：StylePack / PatchOp / OpLog / AgentCharter / WorkflowGraph / **WikiSchema**（四層結構 + 28 種 UX 文件儲存規範）
- [ ] git-native 儲存層：wiki(markdown) + oplog(json) 進 repo，IndexedDB 僅快取

**P1 · 對齊 C1「PRD features → 多技術棧 variants」（2 週）**
- [ ] MarkItDown ingest 管線 + 四項防失真 QA
- [ ] StylePack 切換 + Candidate 並排（CTBC deck 8 pack 換膚驗收）
- 驗收：學員把 PRD ingest 進 wiki，產出並排 variants

**P2 · 對齊 C2「策展與編排」（2 週）**
- [ ] LLM Wiki 四層落地：index.md 自動再生、log.md 雙視圖、curated pages 編輯
- [ ] Curator Console：schema 編輯器 + cross-ref 建議 + categorize 待辦 + LINT periodic audit
- [ ] Agent charters 入駐 schema 層；越權 op runtime 攔截
- 驗收：學員完成策展三件事，改一條 schema 觀察對 agent 產出的槓桿效果

**P3 · 對齊 C3「三節拍辯證完整鏈」（2–3 週）**
- [ ] Builder/Auditor 雙端工作流；Red Team 四層判準（三基線 + AIPET）
- [ ] Synthesis 三選一 UI + 寫回 wiki 閉環 + preferences.jsonl
- [ ] 兩 IDE 共享 repo 的同步驗證（git pull/push 迴圈）
- 驗收：學員以自己的 feature 跑 3 個完整閉環回合，每條 diff 有 audit trail

**P4 · 對齊 C4「團隊尺度」（後 POC，範圍另議）**
- [ ] 一人 PD（NA-style）與分工團隊（亞洲 style）兩種 preset 的 harness 配置
- [ ] SVG chart spec 渲染器 + 粒子 preset（自 v2 順延）
- C5（職涯五級成熟度）為課程內容，不進工具範圍。

---

## 6. 目錄結構（目標態）

```
AIPET.studio/
├── PLAN.md
├── docs/adr/
├── wiki/                        # 第二大腦（git-native）
│   ├── index.md                 # 自動再生
│   ├── log.md                   # append-only，op log 投影
│   ├── decisions/ · persona/ …  # 28 種 UX 文件依 WikiSchema 歸位
│   └── schema/                  # 槓桿層：lint 規則 · 檔名規範 · voice&tone
│       └── agents/*.charter.md  # 五席定位卡（第五席 = 人類，也有 charter）
├── sources/                     # 左欄 immutable（ingest 產物 + QA 報告）
├── stylepacks/ · schemas/ · workflows/ · templates/
├── src/
│   ├── inspector/               # 視圖 1–10（含 Curator Console）
│   ├── core/                    # parser / compiler / replay / lint / ingest-qa
│   └── agents/                  # 四個 worker 的 prompt + op tool schema（無 AI orchestrator）
└── workspace-exports/
```

---

## 7. 風險與對策（v3 更新）

| 風險 | 對策 |
|---|---|
| **cross-ref/backlinks 退化**（圖中明言「不維護就退化」） | 工具自動偵測斷鏈與孤兒頁，進 Curator Console 待辦；LINT 週期稽核納入退化指標 |
| **Curator 過載**（編排權全在人） | 策展三件事全部半自動化：機器起草、人只裁決；三選一 UI 把 synthesis 成本壓到單次點擊 + 一句 rationale |
| MarkItDown 掏空設計知識 | 四項防失真 QA + `needs-curation` 強制標記 |
| Agent 擴編失控 | 五席上限 + charter 閘門（沿 v2）；charter 在 schema 層，修訂可回溯 |
| 兩 IDE 併發衝突 | git-native + log.md append-only 天然可合併；op 衝突以 lane 隔離降低機率，殘餘衝突進待裁決區 |
| 又做成一次性 demo | 驗收綁 C1–C3 學員真實交付物；工具、課程 V5、CTBC deck 三者共用資產 |

---

## 8. 版本沿革

- **v1**：StylePack / PatchOp / event-sourced history / 規格驅動 Auditor
- **v2**：+Agent Charter、AI Orchestrator 第二大腦、五席編制、layer-inspector 為地基、綁課程 V4
- **v3**：**AI Orchestrator 刪除 → Orchestrator = 人類 Curator**；第二大腦 = LLM Wiki 四層（charters 移入 schema 層）；三節拍辯證取代正典回合；git-native 儲存；MarkItDown 防失真；驗收改綁課程 V5 C1–C3
