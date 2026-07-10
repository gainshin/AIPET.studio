---
name: aipet-warm-earth
title: AIPET Warm Earth
version: 0.1.0
status: needs-curation
source: "待反向抽取：CTBC deck（尚未 ingest；本稿為佔位初稿，色票與規則需以 deck 實際樣式校正）"
description: 大地暖色系——陶土、砂岩、鼠尾草綠，給教學與策展場景的沉穩底色
tokens:
  color:
    sand-50: "#FAF6F0"
    sand-100: "#F3EBDD"
    earth-900: "#3E2F23"
    earth-600: "#7A6A58"
    clay-500: "#C77B4F"
    clay-600: "#A9603A"
    sage-500: "#8A9A7B"
    border-warm: "#E5DBC9"
  typography:
    fontFamily:
      heading: "'Noto Serif TC', 'Songti TC', serif"
      body: "'Noto Sans TC', 'PingFang TC', sans-serif"
      mono: "'JetBrains Mono', 'SF Mono', monospace"
    scale:
      xs: "0.75rem/1.6"
      sm: "0.875rem/1.7"
      base: "1rem/1.8"
      lg: "1.125rem/1.7"
      xl: "1.75rem/1.35"
      xxl: "2.5rem/1.2"
    weight:
      regular: 400
      medium: 500
      bold: 700
  spacing:
    xs: "0.25rem"
    sm: "0.5rem"
    md: "1rem"
    lg: "2rem"
    xl: "3.5rem"
  radius:
    sm: "0.5rem"
    md: "1rem"
    lg: "1.5rem"
  shadow:
    card: "0 2px 8px rgba(62, 47, 35, 0.08)"
    overlay: "0 12px 40px rgba(62, 47, 35, 0.16)"
voice:
  keywords: [grounded, patient, instructive, bilingual-friendly]
  avoid: [startup hustle tone, dense jargon without gloss]
---

# AIPET Warm Earth StylePack（佔位初稿）

> **needs-curation**：本 pack 依規劃應由 CTBC deck 反向抽取。deck 尚未 ingest 進
> `sources/`，以下為佔位初稿；deck 到位後需逐項校正色票、字級與規則，
> 並將 `status` 升為 `draft`、`source` 改寫為實際出處。

## 定位

教學與策展場景的底色系統：中文長文可讀性優先，暖色降低螢幕疲勞，
沉穩但不昏暗。標題襯線、正文無襯線，與 claude pack 相反。

## 用色規則

- 背景 `sand-50`，卡片 `sand-100` 或白；正文 `earth-900`，輔助 `earth-600`。
- `clay-500` 為主要強調（按鈕、焦點）；`sage-500` 為次要強調（成功、完成態），
  兩者不得同時出現在同一元件。
- 邊框 `border-warm`；禁止冷灰色出現在任何可見元素。

## 字型規則

- 標題用襯線字族（Noto Serif TC），正文用無襯線（Noto Sans TC）。
- 中文正文行高不得低於 1.8；中英混排時以中文字號為基準。

## 禁區

- 高飽和藍紫色系（與暖色系衝突）。
- 純黑 `#000` 文字。
- 半透明白疊加（會發灰，破壞紙感）。
