---
name: aipet-loyal-shadow
title: AIPET Loyal Shadow
version: 0.1.0
status: draft
source: "reverse-extracted from SCALE_AI_consortium_twin3_V2.html（PrivacyUX × Twin3 deck，2026-07）"
description: 深林綠黑 + 奶油字 + 琥珀襯線強調——AIPET.studio 的品牌識別系統，與 PrivacyUX × Twin3 deck 同一血脈
tokens:
  color:
    forest-950: "#0A120C"
    forest-900: "#0F1810"
    forest-800: "#141D16"
    moss-700: "#243027"
    moss-500: "#3A4A3E"
    cream-100: "#E8E0C8"
    cream-300: "#C5C4B0"
    olive-500: "#9A9A80"
    amber-400: "#FF9A3C"
    amber-300: "#FFD66E"
    sage-400: "#7DDC8C"
    rust-400: "#D8744F"
    fern-600: "#4A7C59"
    series-amber: "#C96F1E"
    series-sage: "#3AA254"
    series-gold: "#9E962A"
    series-rust: "#CF6A45"
  typography:
    fontFamily:
      heading: "'EB Garamond', 'Noto Serif TC', Georgia, serif"
      body: "'Inter', 'Noto Sans TC', system-ui, -apple-system, sans-serif"
      mono: "'JetBrains Mono', ui-monospace, 'SF Mono', monospace"
    scale:
      xs: "0.75rem/1.6"
      sm: "0.875rem/1.6"
      base: "1rem/1.65"
      lg: "1.25rem/1.65"
      xl: "2rem/1.2"
      xxl: "3.25rem/1.08"
      hero: "4.25rem/1.05"
    weight:
      light: 300
      regular: 400
      medium: 500
      semibold: 600
  spacing:
    xs: "0.25rem"
    sm: "0.5rem"
    md: "1rem"
    lg: "2rem"
    xl: "4rem"
  radius:
    sm: "6px"
    md: "18px"
    lg: "24px"
    pill: "999px"
  shadow:
    card: "0 0 0 1px #243027"
    overlay: "0 20px 60px rgba(0, 0, 0, 0.5)"
voice:
  keywords: [fiduciary, calm, precise, theatrical-serif]
  avoid: [hype, gradient-splash, startup-blue, pure-black-and-white]
---

# AIPET Loyal Shadow StylePack

## 定位

「忠實影子」——受託、沉靜、有劇場感。深林綠黑不是純黑（#0A120C 帶綠），
奶油字不是純白（#E8E0C8 帶暖）；琥珀橘只在強調處出現，像黑暗中的一盞燈。
與 PrivacyUX × Twin3 consortium deck 共用同一設計語言，讓品牌跨專案可辨。

## 用色規則

- 背景一律 `forest-950`，卡片 `forest-900`，卡內浮起層 `forest-800`（可用
  radial-gradient 從 forest-800 → forest-950 做 portrait 底）。
- 文字三級：`cream-100`（標題/正文）、`cream-300`（敘述）、`olive-500`（mono 標籤）。
  三級以外不再加灰階；禁止純白 `#FFF` 與純黑 `#000`。
- `amber-400` 僅限：標題內的 em 強調、mono kicker 的重點字、主要 CTA 底色、
  active 態、hover 邊框。hover 提亮用 `amber-300`。
- `sage-400` 是次要識別（資料條、成功態、次要角色標籤），與 amber 不同時
  出現在同一元件。
- `rust-400` 僅作警示；`fern-600` 僅作內文連結底線。
- 邊框一律 `moss-700` 1px；禁用陰影堆疊做層次（shadow 只有 overlay 一種用途）。

## 字型規則

- 標題用 display 襯線（EB Garamond / Noto Serif TC），weight 400、負字距
  （-0.015em），大字級（xl 以上）才有資格用襯線。
- 標題內的強調字包 `<em>`：英文/法文斜體 + `amber-400`；**中文不斜體**
  （`html[lang="zh-Hant"] em { font-style: normal }`），只上色。
- 正文用 body 無襯線 weight 300，行高 ≥1.65；敘述字色 `cream-300`。
- mono 用於 kicker 標籤（全大寫、letter-spacing 0.22em）、數據
  （font-variant-numeric: tabular-nums）、按鈕文字。

## 形狀規則

- 卡片 `radius.lg`（24px）+ `moss-700` 1px 邊；CTA 與語言切換用 pill（999px）。
- 資料列用 1px dotted `moss-700` 分隔，不用實線表格。
- 環形 monogram：細 1px `amber-400` @ 45% 透明度的正圓，內置 display 大字——
  這是品牌簽名元素，一頁最多出現一組（如 AIPET 五柱各一字）。

## SVG 圖表規則

- **series 色階是圖表專用**（UI accent 太亮、彩度分佈不符資料標記要求）：
  固定順序 `series-amber → series-sage → series-gold → series-rust`，
  依實體指派、永不循環；超過 4 個系列摺進「Other」或拆小倍數圖。
- 色盤已通過六項檢查（validate_palette，dark mode，2026-07-11）：
  亮度帶 L 0.48–0.67、彩度地板、對底色對比 ≥3:1；CVD 最差鄰對 ΔE 11.1
  （8–12 地帶）→ **直接標值與 2px 底色縫是強制的次要編碼，不是裝飾**。
  改任何 series 色都必須重跑驗證。
- 單一量值的長條圖用單色（`series-sage`）；`series-amber` 只做選擇性強調。
- 一張圖一個軸，禁止雙軸；兩個不同尺度的量 = 兩張圖。
- 網格 1px dotted `moss-700`、軸標 mono `olive-500`、數值 mono tabular-nums。
- 標記規格：bar 資料端 4px 圓角（基線端直角）、折線 2px、資料點直徑 ≥8px、
  堆疊段與相鄰 bar 之間 2px 底色縫。
- 圖表文字永遠用文字色（cream/olive），不用 series 色；系列識別靠色塊 + 直標。
- 禁漸層、禁陰影；SVG 節點必帶 `data-layer` 標註（svg lane，憲法第 8 條）。

## 禁區

- 藍色系、紫色系（與 forest/amber 衝突，且是 generic AI 產品的預設色）。
- 漸層彩帶、glassmorphism、多重陰影。
- mono 以外的全大寫；display 襯線用在小字級（< xl）。
