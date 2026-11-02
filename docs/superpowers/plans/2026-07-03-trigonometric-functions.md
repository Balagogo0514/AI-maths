# Trigonometric Functions Document Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Write `docs/Trigonometric-Functions.md` as a university-level trigonometric-functions note with rigorous proofs, concise examples, and AI-focused applications.

**Architecture:** Build one self-contained Markdown document with a stable section hierarchy: foundations, properties, formulas with proofs, inverse-trig/calculus links, AI and engineering applications, then a formula cheat sheet. Use the approved spec as the single source of truth and verify completion with structural and keyword-based checks because this task has no executable test suite.

**Tech Stack:** Markdown, LaTeX math blocks, PowerShell, `rg`

---

### Task 1: Create the document skeleton

**Files:**
- Reference: `docs/superpowers/specs/2026-07-03-trigonometric-functions-design.md`
- Create: `docs/Trigonometric-Functions.md`

- [ ] **Step 1: Re-read the approved spec**

Run: `Get-Content -Raw 'docs\superpowers\specs\2026-07-03-trigonometric-functions-design.md'`
Expected: The spec describes university-level audience, rigorous proofs, AI applications with ML emphasis, and a final cheat sheet.

- [ ] **Step 2: Create the top-level Markdown structure**

```markdown
# 三角函數介紹與作用

## 1. 為什麼需要三角函數？
## 2. 三角函數的基本定義
## 3. 基本性質與圖形直觀
## 4. 常用公式與證明
## 5. 反三角函數與微積分關係
## 6. AI 與工程中的應用
## 7. 小結與常用公式速查表
```

- [ ] **Step 3: Verify the section skeleton**

Run: `rg "^## " docs\Trigonometric-Functions.md`
Expected: Exactly seven `##` headings matching the planned structure.

### Task 2: Write the foundational sections

**Files:**
- Modify: `docs/Trigonometric-Functions.md`

- [ ] **Step 1: Write the motivation section**

```markdown
## 1. 為什麼需要三角函數？

三角函數最早來自三角形邊長與角度的關係，但它的用途遠不只測量。只要問題與週期、旋轉、波動、方向或座標變換有關，三角函數幾乎都會出現。

在數學上，三角函數提供一種把角度轉成座標與比值的方法；在工程上，它描述聲波、光波、震動與旋轉；在 AI 中，它常用來表示週期特徵、時間訊號與位置資訊。
```

- [ ] **Step 2: Write the definition section with right-triangle and unit-circle viewpoints**

```markdown
## 2. 三角函數的基本定義

### 2.1 直角三角形中的定義

對銳角 $\theta$，定義

$$
\sin\theta=\frac{\text{對邊}}{\text{斜邊}},\quad
\cos\theta=\frac{\text{鄰邊}}{\text{斜邊}},\quad
\tan\theta=\frac{\text{對邊}}{\text{鄰邊}}.
$$

### 2.2 單位圓中的定義

在平面上考慮單位圓

$$
x^2+y^2=1.
$$

若角 $\theta$ 對應到圓上的點 $P=(x,y)$，則定義

$$
\cos\theta=x,\quad \sin\theta=y,\quad \tan\theta=\frac{y}{x}\;(x\neq 0).
$$

其餘三個函數定義為

$$
\cot\theta=\frac{\cos\theta}{\sin\theta},\quad
\sec\theta=\frac{1}{\cos\theta},\quad
\csc\theta=\frac{1}{\sin\theta}.
$$
```

- [ ] **Step 3: Add angle units and explain why radians matter**

```markdown
### 2.3 角度與弧度

一個完整圓周對應 $360^\circ$，也對應 $2\pi$ 弧度，因此

$$
180^\circ=\pi,\qquad 1^\circ=\frac{\pi}{180}.
$$

弧度制在微積分中特別重要，因為 $\sin x$ 與 $\cos x$ 的導數公式只有在 $x$ 用弧度表示時才會呈現最簡潔的形式。
```

- [ ] **Step 4: Verify the foundational coverage**

Run: `rg "單位圓|弧度|對邊|週期特徵|x\^2\+y\^2=1" docs\Trigonometric-Functions.md`
Expected: Hits for the right-triangle definition, unit-circle definition, radians, and the motivation for applications.

### Task 3: Write the property and identity sections with proofs

**Files:**
- Modify: `docs/Trigonometric-Functions.md`

- [ ] **Step 1: Write the basic properties section**

```markdown
## 3. 基本性質與圖形直觀

至少涵蓋：

- $\sin x,\cos x$ 的定義域為所有實數。
- $\tan x$ 在 $\cos x=0$ 時無定義。
- $\sin x,\cos x$ 的值域是 $[-1,1]$。
- $\sin(-x)=-\sin x$，$\cos(-x)=\cos x$。
- $\sin(x+2\pi)=\sin x$，$\cos(x+2\pi)=\cos x$。
```

- [ ] **Step 2: Write the core identities and proofs**

```markdown
## 4. 常用公式與證明

### 4.1 倒數關係與商數關係

$$
\tan x=\frac{\sin x}{\cos x},\quad
\cot x=\frac{\cos x}{\sin x},\quad
\sec x=\frac{1}{\cos x},\quad
\csc x=\frac{1}{\sin x}.
$$

### 4.2 畢氏恆等式

由單位圓上點 $(\cos x,\sin x)$ 滿足

$$
\cos^2 x+\sin^2 x=1
$$

可得

$$
1+\tan^2 x=\sec^2 x,\quad 1+\cot^2 x=\csc^2 x.
$$
```

- [ ] **Step 3: Add the angle-sum formulas as the proof hub**

```markdown
### 4.3 和差角公式

$$
\sin(\alpha+\beta)=\sin\alpha\cos\beta+\cos\alpha\sin\beta
$$

$$
\cos(\alpha+\beta)=\cos\alpha\cos\beta-\sin\alpha\sin\beta
$$

同時補上 $\alpha-\beta$ 版本，並在正文中說明後續倍角、半角、積化和差都由此推出。
```

- [ ] **Step 4: Derive the dependent formulas**

```markdown
### 4.4 倍角公式

$$
\sin 2x=2\sin x\cos x
$$

$$
\cos 2x=\cos^2 x-\sin^2 x=2\cos^2 x-1=1-2\sin^2 x
$$

### 4.5 半角公式

$$
\sin^2\frac{x}{2}=\frac{1-\cos x}{2},\quad
\cos^2\frac{x}{2}=\frac{1+\cos x}{2}
$$

### 4.6 積化和差與和差化積

至少列出兩組代表公式，並交代它們如何由和差角公式線性組合得到。
```

- [ ] **Step 5: Verify identity coverage**

Run: `rg "畢氏|和差角|倍角|半角|積化和差|和差化積" docs\Trigonometric-Functions.md`
Expected: Every planned identity family appears as a heading or explanatory phrase.

### Task 4: Write calculus links and AI applications

**Files:**
- Modify: `docs/Trigonometric-Functions.md`

- [ ] **Step 1: Write inverse-trig and calculus relations**

```markdown
## 5. 反三角函數與微積分關係

至少包含：

- 反三角函數主值區間的說明。
- $\frac{d}{dx}\sin x=\cos x$。
- $\frac{d}{dx}\cos x=-\sin x$。
- $\frac{d}{dx}\tan x=\sec^2 x$。
- $\int \sin x\,dx=-\cos x+C$。
- $\int \cos x\,dx=\sin x+C$。

正文需解釋：上述導數公式依賴弧度制，而非任意角度單位。
```

- [ ] **Step 2: Write AI-first application coverage**

```markdown
## 6. AI 與工程中的應用

### 6.1 週期特徵編碼

對於一天中的時間 $t$，可用

$$
\left(\sin\frac{2\pi t}{T},\ \cos\frac{2\pi t}{T}\right)
$$

取代直接使用 $t$，避免在週期邊界產生人為不連續。

### 6.2 Fourier features 與頻率表示

說明將輸入映射到多個不同頻率的 $\sin$ / $\cos$ 特徵，有助於模型表示高頻變化。

### 6.3 位置與時間訊號表示

說明三角函數可把順序、位置或季節性週期嵌入到連續向量中。
```

- [ ] **Step 3: Add engineering applications without letting them dominate**

```markdown
### 6.4 2D 旋轉矩陣

$$
R(\theta)=
\begin{pmatrix}
\cos\theta & -\sin\theta\\
\sin\theta & \cos\theta
\end{pmatrix}
$$

並說明它如何把平面上的點逆時針旋轉 $\theta$。

### 6.5 圖學與機器人中的方向表示

說明三角函數如何出現在姿態、方向與座標轉換中，但不要展開到四元數或李群的完整理論。
```

- [ ] **Step 4: Verify application coverage**

Run: `rg "週期特徵|Fourier|位置|旋轉矩陣|機器人|圖學" docs\Trigonometric-Functions.md`
Expected: ML-oriented and engineering-oriented application terms both appear, with ML receiving more space.

### Task 5: Add the summary, polish the prose, and verify completeness

**Files:**
- Modify: `docs/Trigonometric-Functions.md`

- [ ] **Step 1: Add the final summary and cheat sheet**

```markdown
## 7. 小結與常用公式速查表

至少整理：

- 六個三角函數的基本定義
- $\sin^2 x+\cos^2 x=1$
- 和差角公式
- 倍角公式
- 半角公式
- 常用導數與積分
```

- [ ] **Step 2: Read the full document once for flow and repetition**

Run: `Get-Content -Raw 'docs\Trigonometric-Functions.md'`
Expected: The document reads as one continuous lecture note rather than disconnected bullet lists.

- [ ] **Step 3: Run structural and keyword checks**

Run: `rg "^## |^### |Fourier|旋轉矩陣|弧度|和差角|速查表" docs\Trigonometric-Functions.md`
Expected: The output shows all top-level sections, subsection structure, and the required math/application keywords.

- [ ] **Step 4: Check document size is substantial enough for the requested depth**

Run: `(Get-Content 'docs\Trigonometric-Functions.md' | Measure-Object -Line).Lines`
Expected: The line count is clearly above a short note and large enough to cover proofs plus applications.

- [ ] **Step 5: Skip commit if Git remains unavailable**

Run: `git rev-parse --show-toplevel`
Expected: If this fails with "not a git repository", document the limitation in the completion note and do not fabricate a commit step.
