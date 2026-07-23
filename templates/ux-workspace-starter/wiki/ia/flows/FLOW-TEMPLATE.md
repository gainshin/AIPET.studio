---
type: user-flow
flow: （流程名，例：註冊）
persona: （引用 personas/ 哪一位）
---

# Flow：（流程名）

## 步驟（文字版，先寫這個）
1. 使用者……
2. 系統……

## 圖（Mermaid，可省）
```mermaid
flowchart LR
  A[進入] --> B{條件?}
  B -->|是| C[下一步]
  B -->|否| D[出口]
```

## 例外與失敗路徑（至少一條）
