# CLAUDE.md — AIPET.studio

> Claude Code 開工必讀。詳細規劃見 `PLAN.md`（即 PLAN_v3）。本檔只放不可違反的規則與當前任務。

## 專案一句話

三欄架構的工具實現：左欄 immutable 原始素材 → 中欄 LLM Wiki（第二大腦）→ 右欄四個專責 agent + Orchestrator（= 人類 Curator）。幫 Agentic 產品設計者跑通「Wiki → Builder → Auditor → Synthesis → 寫回 Wiki」的 POC 閉環。

## 憲法（違反即 reject）

1. **Orchestrator 是人，不是 AI。** 不得新增任何自主決策的主 agent。機器只產報告，人做裁決。
2. **右欄固定四席 worker**：Design / Research / Copy / Red Team。每席必須有 charter（`wiki/schema/agents/*.charter.md`）。新增席位需 charter 證明 + 人類簽核。
3. **左欄 immutable**：`sources/` 內容 ingest 後永不改寫，修正以新版本進 log。
4. **中欄是唯一介面**：agent 不直接讀 raw sources、不互相直接對話，一切經 wiki。
5. **Agent 只能發 PatchOp**，不得整段重寫 HTML。七 lane：typography / color / component / layout / content / svg / particle（+ governance）。
6. **Git-native**：真相在 repo 的 markdown + JSON。`wiki/log.md` append-only。IndexedDB 僅為快取。
7. **批評基準 = 當前載入的規格**（StylePack DESIGN.md + wiki schema 層），禁止引入任何凍結外部資料集作為 Auditor 依據。
8. 所有 agent 產出的 HTML 必須帶 `data-layer` / `data-name` / `data-module` 標註，否則 Auditor 直接 fail。

## 當前階段：P0 地基

依序執行，每項完成後 commit（message 註明 P0-x）：

- [ ] **P0-1** repo 重整：開 `main` branch；從 `genspark_ai_developer` cherry-pick i18n（zh-TW/en/fr）與 Theory 頁；其餘淘汰（base44SDK 全刪）
- [ ] **P0-2** CRA → Vite 遷移；`layer-inspector.html` 拆入 `src/inspector/`（保留現有 8 視圖行為，先不加新視圖）
- [ ] **P0-3** 六個 schema 到 `schemas/`：StylePack / PatchOp / OpLog / AgentCharter / WorkflowGraph / WikiSchema（JSON Schema draft-07；WikiSchema 含 index/log/curated/schema 四層 + 28 種 UX 文件歸位規則）
- [ ] **P0-4** DESIGN.md parser（gray-matter）+ 語意 token 橋接層 `stylepacks/_bridge.map.json`；先落地 3 個 pack：claude / vercel / aipet-warm-earth（第三個由 CTBC deck 反向抽出）
- [ ] **P0-5** 五份 charter 初稿到 `wiki/schema/agents/`（含 orchestrator-human.charter.md）
- [ ] **P0-6** `docs/adr/0001-aipet-definition.md`（待人類拍板五字定義後填入）、`docs/adr/0002-three-column-architecture.md`（引用架構圖）

## 驗收（P0 完成的定義）

- `npm run dev` 起得來，layer-inspector 八視圖可用
- `npm run lint:schema` 能驗證 stylepacks 與 charters 全數通過各自 schema
- CTBC deck 載入 preview 不破版（換膚功能屬 P1，不在此驗收）

## 不要做的事

- 不要提前實作 P1+ 功能（StylePack 切換 UI、Curator Console、agent runtime）
- 不要引入後端 / DB；不要引入狀態管理以外的重型依賴
- 不要改寫 `PLAN.md` 或本檔的憲法段落；發現規劃矛盾時停下來問人
