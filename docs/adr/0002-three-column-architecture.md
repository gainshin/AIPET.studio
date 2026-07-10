# ADR-0002: 三欄架構為系統憲法

- 狀態：**Accepted**
- 日期：2026-07-10
- 決策者：Orchestrator（人類 Curator），記錄於 PLAN.md v3

## 背景

前三版工具的死因之一是依賴凍結外部資料集作批評基準，且 v2 曾把第二大腦
設計成自主決策的 AI Orchestrator。課程 V5 論證後全面修正：編排權在人，
第二大腦是外置記憶（LLM Wiki），不是決策者。

## 決策

採 PLAN.md §1 的三欄架構作為不可違反的系統憲法：

```
RAW SOURCES ──MarkItDown──▶ LLM WIKI（第二大腦）◀──query──▶ UX AGENTS
immutable                    index.md   分類目錄            Design Agent
PRD / featurelist            log.md     時序記錄·每條 immutable Research Agent
journeymap                   persona/ · decisions/ 主題頁    Copy Agent
modulelist / pagelist        cross-ref · backlinks · tags    Red Team Agent
userflow                     ── Schema / CoT ──              ─────────────
                             檔名規範·lint 規則·voice&tone    Orchestrator
                             agent charters（schema 層）      = YOU · Curator
                             ↑ LINT · periodic audit ↑
```

三條不可違反的規則（引自 PLAN.md §1，此處為正式決策記錄）：

1. **左欄 immutable**：原始素材 ingest 後永不改寫；任何修正以新版本進 log，舊版留檔。
2. **中欄是唯一介面**：agents 不直接讀 raw sources、不互相直接對話，一切經 wiki query；
   cross-ref / backlinks / tags 的維護成本必須由工具自動化到接近零。
3. **右欄只有五席**：四個專責 AI worker + Orchestrator（人類）。編排是寫作行為——
   改 schema 比逐頁改內容有效；Orchestrator 無 AI 席位。

## 落地對應（P0 已交付）

- 四層 wiki 結構與 28 種 UX 文件歸位 → `schemas/wikischema.schema.json`
- 五席 charter（含人類席）→ `wiki/schema/agents/*.charter.md` + `schemas/agentcharter.schema.json`
- PatchOp 七 lane + governance → `schemas/patchop.schema.json`
- event-sourced 真相源與 log.md 投影 → `schemas/oplog.schema.json`
- 三節拍閉環 → `schemas/workflowgraph.schema.json`

## 後果

- 任何「讓 AI 自主收斂」的功能提案直接 reject（CLAUDE.md 憲法第 1 條）
- 新增 agent 席位需 charter 證明 + 人類簽核（第六席閘門）
- 儲存層必須 git-native：markdown + JSON 進 repo，IndexedDB 僅為快取
