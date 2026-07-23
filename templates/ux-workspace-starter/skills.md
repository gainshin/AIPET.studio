# Skills 使用原則：官方內建優先

不自建 skill，除非能寫出 Fit Gap 證明（內建的哪裡不夠、差距是什麼）。
常用任務 → Claude 內建 skill 對照：

| 任務 | 用哪個內建 skill |
|---|---|
| 新頁面/改版的視覺方向 | frontend-design |
| 元件與版面實作（Tailwind/shadcn） | ui-styling |
| 任何圖表（先讀再畫） | dataviz |
| 簡報交付 | pptx |
| 文件交付（Word / PDF） | docx / pdf |
| 表格資料整理 | xlsx |

原則：skill 是無狀態的單次能力；需要授權範圍、留痕、可審計的工作，
交給 agent 工作流（見 AIPET.studio 主 repo 的 charter 機制）。
