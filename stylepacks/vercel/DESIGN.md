---
name: vercel
title: Vercel
version: 0.1.0
status: draft
source: hand-authored, distilled from vercel.com / Geist design language
description: 高對比黑白 + 幾何精準，工程感的極簡風格
tokens:
  color:
    black: "#000000"
    gray-900: "#111111"
    gray-600: "#666666"
    gray-200: "#EAEAEA"
    white: "#FFFFFF"
    blue-600: "#0070F3"
    blue-700: "#0761D1"
    error-500: "#EE0000"
  typography:
    fontFamily:
      heading: "'Geist', 'Inter', system-ui, sans-serif"
      body: "'Geist', 'Inter', system-ui, sans-serif"
      mono: "'Geist Mono', 'SF Mono', monospace"
    scale:
      xs: "0.75rem/1.5"
      sm: "0.875rem/1.5"
      base: "1rem/1.6"
      lg: "1.25rem/1.5"
      xl: "2rem/1.25"
      xxl: "3rem/1.1"
    weight:
      regular: 400
      medium: 500
      semibold: 600
  spacing:
    xs: "0.25rem"
    sm: "0.5rem"
    md: "1rem"
    lg: "1.5rem"
    xl: "3rem"
  radius:
    sm: "0.25rem"
    md: "0.5rem"
    lg: "0.75rem"
  shadow:
    card: "0 0 0 1px #EAEAEA"
    overlay: "0 8px 30px rgba(0, 0, 0, 0.12)"
voice:
  keywords: [precise, technical, confident, terse]
  avoid: [decorative metaphors, softened hedging]
---

# Vercel StylePack

## 定位

黑白為骨、藍色為脈。所有層次靠字重、間距與 1px 邊線建立，
不靠色塊與陰影。工程師是第一讀者。

## 用色規則

- 前景 `black` / 背景 `white` 為預設；反轉區塊（footer、code）整塊互換，不做半透明。
- `blue-600` 僅限連結與主要 CTA；hover 用 `blue-700`。
- 灰階只有三級：`gray-900`（次標題）、`gray-600`（說明）、`gray-200`（邊線）。
- 錯誤一律 `error-500`，不用橙黃色系警示。

## 字型規則

- 全站單一字族（Geist），層次全靠字級與字重；標題 semibold、正文 regular。
- 字距在 xl 以上字級收緊（-0.02em ~ -0.04em）。
- mono 用於代碼、路徑、指令、數據值。

## 禁區

- 圓角大於 12px。
- 有彩度的灰（灰必須是純灰）。
- 陰影模擬立體感（陰影只允許 overlay 一種用途）。
