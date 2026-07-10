# AIPET.studio

三欄架構的工具實現：左欄 immutable 原始素材 → 中欄 LLM Wiki（第二大腦）→ 右欄四個專責 UX agent + Orchestrator（= 人類 Curator）。幫助 Agentic 產品設計/開發者在 POC 階段跑通「Wiki → Builder → Auditor → Synthesis → 寫回 Wiki」的完整閉環。

- 規劃書：[PLAN.md](PLAN.md)
- 開發規則與當前任務：[CLAUDE.md](CLAUDE.md)

## 開發

```bash
npm install
npm start        # 開發伺服器 http://localhost:3000
npm run build    # production build
```

> 現階段（P0）仍為 Create React App 腳手架，CRA → Vite 遷移排在 P0-2。

## 目前狀態

**P0-1 已完成**：repo 重整至 `main` branch，保留 i18n（zh-TW / en / fr）與 Theory 頁，移除 base44SDK 與其餘無關頁面。後續里程碑見 [CLAUDE.md](CLAUDE.md) 的 P0 清單。
