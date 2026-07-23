# ADR-0003: UX documents → UI（不做 prompt-to-UI / screenshot-to-UI）

- 狀態：**Accepted**
- 日期：2026-07-23
- 決策者：Orchestrator（人類 Curator）

## 背景

Prompt-to-UI 與 screenshot-to-UI 的生成速度驚人，但在組織現場產生三個
系統性問題：

1. **Slop 進不了 use flow**——「產出快」的組織文化獎勵生成數量，
   但生成物沒有出處、沒有判準、沒有驗收，無法安全接進真實的使用流程。
2. **Figma 命名失守**——group / frame / component 的人類命名本來就是
   普遍痛點；生成式工具進場後，無語意命名以十倍速堆積，agent 與人
   都無法定位、無法審。
3. **Design tokens 無人整理**——畫面先行、規格缺席，tokens 變成
   事後考古，一致性靠人肉維持。

共同根因：**畫面被當成起點，而不是文件的投影。**

## 決策

本工具鏈的典範是 **UX documents → UI**：

- 輸入是結構化的 UX 文件（wiki 的 Tier A/B 層——persona、feature spec、
  decision、voice & tone、StylePack DESIGN.md…），不是一句 prompt、
  不是一張截圖。
- 人類干預與監督貫穿全程：Builder 從文件產出候選、Auditor 以
  **當前載入的文件**為判準驗收（憲法第 7 條）、Synthesis 由人收斂、
  決策寫回文件。
- **畫面是文件的投影**。沒有文件出處的畫面，在本系統中的正式名稱是
  slop——Auditor 的職責之一就是把它標出來。

Screenshot / image 仍可作為 **Auditor 的辨識輸入**（分析既有介面、
反向抽取規格），但辨識產出必須落回文件層才能進入 Editor 工作流——
辨識是 ingest 的一種，不是生成的捷徑。

## 對應機制（本 repo 已落地的部分）

| 現場的痛 | 制度性回答 | 落地位置 |
|---|---|---|
| 產出快文化 → slop 進不了 use flow | 三節拍閉環：Red Team 必經、無 rationale 不進 log、Synthesis 由人收斂 | workflowgraph schema · Editor POC 四階段 |
| Figma 命名混亂 → 無法定位無法審 | 命名憲法：`data-layer / data-name / data-module` 無標註者 Auditor 直接 fail（憲法第 8 條） | patchop schema · Inspector POC |
| tokens 沒人整理 → 一致性靠人肉 | StylePack DESIGN.md 單一真相源 + 語意橋接層 + lint 驗證 | stylepacks/ · lint:schema |

## 後果

- Auditor 辨識的核心目標是「**畫面 ↔ 文件**的對應與缺口」：哪個區塊
  沒有對應文件、哪個文件沒有落到畫面——缺口清單就是 slop 清單。
- Editor 的意圖入口永遠指向文件（refs 必填），不接受「憑感覺改」。
- 拒絕 prompt-to-UI 的理由是治理而非能力：生成不是瓶頸，
  可驗收才是。
- 與課程 C1 的 86/14 拆分一致：86% 的 UX 文件是 markdown 可結構化的
  ——它們才是 UI 的上游；14% 的視覺原生工作留在 Figma，但 metadata
  必須在 wiki 有 reference page。
