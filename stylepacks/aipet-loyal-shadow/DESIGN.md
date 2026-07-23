---
name: aipet-loyal-shadow
title: AIPET Loyal Shadow
version: 0.1.0
status: draft
source: "reverse-extracted from an internal reference deck（2026-07；來源文件為內部素材，不隨本 repo 公開）"
description: 深林綠黑 + 奶油字 + 琥珀襯線強調——AIPET.studio 的品牌識別系統
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
    ramp-amber-1: "#D9A05F"
    ramp-amber-2: "#CC8B3E"
    ramp-amber-3: "#BC762A"
    ramp-amber-4: "#A5621D"
    ramp-amber-5: "#8C4F14"
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
反向抽取自一份內部參考 deck，讓品牌跨專案可辨。

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

### Sequential ramp（有序強度）

- `ramp-amber-1 → 5`：單色相 amber 淺→深五步，亮度單調遞減（已數值驗證），
  用於 L1–L5 這類有序強度，**絕不用於類別識別**。
- ramp cell 上的文字：1–2 步用 `forest-950` 深字，3–5 步用 `cream-100`。

### Timeline（甘特）規格

- 結構：phase 分組列（display 襯線 + mono 註）→ activity 列（中文名 + mono 英文標）；
  sprint 欄 dotted 縱格線；phase 之間 1px 實線分隔。
- bar：高 14px、圓角 3px、跨 sprint 起訖；貫穿全程的 ongoing 項改 8px 高 + 55% 透明。
- 分類維度（如 AI tier）配色講語意且守暖色調性：A = `series-amber`（wiki 原生、
  agent 可寫——本命資產用品牌色）、B = `series-gold`（混合形式）、
  C = `moss-500` 中性（系統邊界外的資產）。**sage 不做 timeline 主色**——
  大面積綠色與 forest 底同色系，讀起來糊。每列右側必帶 tier 徽章直標（CVD 次要編碼）。

### Diagram（架構圖）規格

- 節點框：`forest-900` 底 + `moss-700` 1px 邊 + 6px 圓角；框內 = 中文標題
  （cream）+ mono 小標（olive）。群組容器同語彙、只加大留白。
- 箭頭語彙固定：**dotted = ingest（單向、不可逆）**、**solid = query（雙向介面）**；
  線色 `olive-500`（moss 在深底上不可見）、線寬 ≥1.4、箭頭三角 ≥7px。
  連線是圖的語意主角，不是背景裝飾——畫完必須肉眼可辨。
- 人類席位（Orchestrator）用 `amber-400` 邊框強調——全圖唯一的 amber 框。
- 退化帶（cross-ref strip）用 dashed 邊框表達「不維護就散」。

### Level table（層級表）規格

- 層級 cell 用 sequential ramp 依序上色；視圖列（MV/PV 類）用中性 `forest-800`。
- 欄序固定：層級 → 概念名（en + zh）→ 工作流對應（含 `code` 路徑引用）。
- 表格用 HTML（文字可選取），窄版改直列疊排。

### 響應式鐵律（所有圖表與表格）

- **任何斷點都不允許水平捲軸**——頁面本體與圖表容器皆然。
- 寬圖的處理只有兩招：桌面（≥md）SVG 等比縮放置入欄寬；窄版（<md）
  **換版式**（直列 HTML 疊排），不是縮小到不可讀、更不是橫捲。
- SVG 文字以「縮放後的有效字級」驗收：正文有效字級 ≥12px、
  mono 註記 ≥9px；達不到就是版式要換，不是字再縮。

## 禁區

- 藍色系、紫色系（與 forest/amber 衝突，且是 generic AI 產品的預設色）。
- 漸層彩帶、glassmorphism、多重陰影。
- mono 以外的全大寫；display 襯線用在小字級（< xl）。
