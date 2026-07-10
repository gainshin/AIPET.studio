---
name: claude
title: Claude
version: 0.1.0
status: draft
source: hand-authored, distilled from claude.ai product surfaces
description: 溫暖紙感底色 + 單一陶土強調色，長文閱讀優先的對話式介面風格
tokens:
  color:
    ivory-50: "#FAF9F5"
    ivory-100: "#F0EEE5"
    slate-900: "#191919"
    slate-600: "#5E5D59"
    terracotta-500: "#D97757"
    terracotta-600: "#C15F3C"
    white: "#FFFFFF"
    border-neutral: "#E3E1D9"
  typography:
    fontFamily:
      heading: "'Styrene A', 'Inter', system-ui, sans-serif"
      body: "'Tiempos Text', 'Georgia', serif"
      mono: "'Berkeley Mono', 'SF Mono', monospace"
    scale:
      xs: "0.75rem/1.5"
      sm: "0.875rem/1.6"
      base: "1rem/1.7"
      lg: "1.125rem/1.7"
      xl: "1.5rem/1.4"
      xxl: "2.25rem/1.2"
    weight:
      regular: 400
      medium: 500
      bold: 700
  spacing:
    xs: "0.25rem"
    sm: "0.5rem"
    md: "1rem"
    lg: "2rem"
    xl: "4rem"
  radius:
    sm: "0.375rem"
    md: "0.75rem"
    lg: "1rem"
  shadow:
    card: "0 1px 3px rgba(25, 25, 25, 0.06)"
    overlay: "0 8px 30px rgba(25, 25, 25, 0.12)"
voice:
  keywords: [warm, direct, thoughtful, plainspoken]
  avoid: [hype, exclamation stacking, jargon-flexing]
---

# Claude StylePack

## 定位

溫暖、可信、以長文閱讀為中心。介面退後、內容向前；唯一的強調色是陶土橘，
只用在主要行動與焦點狀態，絕不作大面積鋪色。

## 用色規則

- 背景一律 `ivory-50`；卡片與輸入區用 `white` 或 `ivory-100` 疊出層次，不用陰影堆疊。
- 正文字色 `slate-900`，輔助說明 `slate-600`；兩級以外不再增加灰階。
- `terracotta-500` 僅限：主要按鈕、進行中狀態、關鍵連結。hover 用 `terracotta-600`。
- 邊框一律 `border-neutral` 1px，禁止純黑邊框。

## 字型規則

- 標題用 heading 字族（無襯線），正文用 body 字族（襯線）——這是本 pack 的識別核心。
- 正文行高不得低於 1.6；單欄行寬 60–75 字元。
- mono 僅用於代碼與 token 值展示。

## 禁區

- 漸層、霓虹色、粒子背景。
- 超過一種強調色。
- 全大寫標題（縮寫除外）。
