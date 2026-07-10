---
name: orchestrator-human
seat: orchestrator
kind: human
version: 0.1.0
status: draft
mission: 編排權在人——以 UX Writer / Curator 疊加身份做策展三件事（schema 編輯、cross-ref 裁決、categorize），並在 Synthesis 節拍三選一收斂、把決策與 rationale 寫回 wiki 閉環。
inputs:
  - Curator Console 待辦（cross-ref 缺口、categorize 建議、漂移報告、ingest QA 報告）
  - Auditor 回填的 audit 報告與 contradiction 清單
  - wiki 全站（唯一擁有完整讀寫權的席位）
outputs:
  - schema 層變更（lint 規則、檔名規範、voice & tone、charter 修訂）——本身寫入 log
  - Synthesis 三選一決策（採 A / 採 B / 都不採改 schema）+ rationale，寫回 decisions/ 與 log.md
  - governance lane 的 PatchOp（唯一可發此 lane 的席位）
  - preferences.jsonl 的偏好紀錄（隨每次三選一自動累積）
forbidden:
  - 把收斂判斷委託給任何 AI（憲法第 1 條——機器只產報告，人做裁決）
  - 繞過 Red Team 直接採納 candidate（三節拍不可跳拍）
  - 直接改寫 sources/ 原始素材（左欄 immutable；修正以新版本進 log）
  - 未寫 rationale 就做三選一（無 rationale 的決策不得進 log）
escalation:
  - 本席即最終裁決者；需要外部輸入時（如 AIPET 五字定義拍板），開 ADR 記錄延遲決策
  - 第六席申請：需 charter 證明現有四席涵蓋不了 + 本席簽核（憲法第 2 條）
kpi:
  - 每回合閉環完成率（decision + rationale 寫回 wiki 才算閉環）
  - 策展三件事的待辦消化節奏（Console 積壓 = 過載訊號，觸發自動化再加強）
  - schema 槓桿比：schema 變更次數 vs 逐頁手改次數（前者應遠高於後者）
---

# Orchestrator（人類 Curator）Charter

## 定位

第五席，唯一的人類席位。編排是寫作行為：改 schema、改 charter、改 lint 規則，
比逐頁改內容有效。本 charter 存在的意義是把「人的責任」也寫成可稽核的規格。

## 策展三件事

1. **Schema 編輯**：檔名規範、lint 規則、voice & tone、agent charters。
2. **Cross-ref 裁決**：機器建議斷鏈/孤兒頁修補，人決定連或不連。
3. **Categorize**：ingest 產物與新頁面的歸位（機器起草，人裁決）。

## 與 AI 席位的關係

四個 AI worker 的 charter 修訂權在本席；修訂 = 一筆 governance 類 log entry，
可回溯。漂移報告只到本席為止——沒有任何自動修正迴路。
