# Trigonometric Fourier Features Figure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add one `tikz` waveform figure plus a short caption in section `6.2` so the Fourier-features subsection visually explains low frequency, high frequency, and their combined signal.

**Architecture:** Modify `docs/Trigonometric-Functions.md` in place. Insert a new ninth `tikz` fenced block immediately after the `\gamma(x)` formula in `6.2`, place one short caption below it, and leave the existing bullet list untouched so the new figure acts as a direct geometric complement to the current explanation.

**Tech Stack:** Markdown, TikZ fenced code block, PowerShell, `rg`, `tectonic`

---

### Task 1: Confirm the approved insertion anchors and baseline state

**Files:**
- Reference: `docs/superpowers/specs/2026-07-05-trigonometric-fourier-features-figure-design.md`
- Modify: `docs/Trigonometric-Functions.md`

- [ ] **Step 1: Re-read the approved Fourier-features figure spec**

Run: `Get-Content -Raw -Encoding UTF8 'docs\superpowers\specs\2026-07-05-trigonometric-fourier-features-figure-design.md'`
Expected: The spec requires one waveform-style `tikz` figure in `6.2`, with stacked low-frequency, high-frequency, and combined panels, plus a short caption after the figure.

- [ ] **Step 2: Read the current `6.2` excerpt to anchor the edit**

Run: `rg -n -C 10 "^### 6\.2|^### 6\.3|gamma\(x\)=|這種表示稱為 Fourier features。其核心想法是：" 'docs\Trigonometric-Functions.md'`
Expected: The output shows the `\gamma(x)` formula in `6.2`, followed immediately by `這種表示稱為 Fourier features。其核心想法是：`, and then the section continues to `### 6.3 位置與時間訊號表示`.

- [ ] **Step 3: Verify the document currently contains exactly eight `tikz` blocks**

Run: `(Select-String -Path 'docs\Trigonometric-Functions.md' -Pattern '```tikz {showConsole=false}' -SimpleMatch | Measure-Object).Count`
Expected: `8`

### Task 2: Insert the Fourier-features waveform figure into section 6.2

**Files:**
- Reference: `docs/superpowers/specs/2026-07-05-trigonometric-fourier-features-figure-design.md`
- Modify: `docs/Trigonometric-Functions.md`

- [ ] **Step 1: Insert the new figure block directly below the `\gamma(x)` formula and above the sentence `這種表示稱為 Fourier features。其核心想法是：`**

```markdown
```tikz {showConsole=false}
\begin{tikzpicture}[x=8cm,y=1.15cm]
  \draw[->, thick] (-0.03,2.15) -- (1.08,2.15) node[right] {$x$};
  \draw[->, thick] (-0.03,0.85) -- (1.08,0.85) node[right] {$x$};
  \draw[->, thick] (-0.03,-0.45) -- (1.08,-0.45) node[right] {$x$};

  \draw[blue, very thick, samples=120, domain=0:1]
    plot (\x,{2.15 + 0.34*sin(360*\x)});
  \draw[red, very thick, samples=180, domain=0:1]
    plot (\x,{0.85 + 0.22*sin(1440*\x)});
  \draw[orange!85!black, very thick, samples=180, domain=0:1]
    plot (\x,{-0.45 + 0.34*sin(360*\x) + 0.22*sin(1440*\x)});

  \node[blue, anchor=west] at (0.02,2.62) {$\sin(2\pi x)$};
  \node[blue!70!black, anchor=west, scale=0.8] at (0.40,2.62) {low frequency: overall trend};

  \node[red, anchor=west] at (0.02,1.32) {$0.35\sin(8\pi x)$};
  \node[red!70!black, anchor=west, scale=0.8] at (0.44,1.32) {high frequency: fine detail};

  \node[orange!85!black, anchor=west] at (0.02,0.22) {combined signal};
  \node[black, anchor=west, scale=0.8] at (0.40,0.22) {$\sin(2\pi x)+0.35\sin(8\pi x)$};

  \node[below] at (0,-0.45) {$0$};
  \node[below] at (1,-0.45) {$1$};

  \node[align=left, scale=0.78] at (0.80,-1.02)
    {adding the high-frequency term\\ reveals finer local variation};
\end{tikzpicture}
```
```

- [ ] **Step 2: Verify the new figure block and its key labels were added**

Run: `Select-String -Path 'docs\Trigonometric-Functions.md' -Pattern '\sin(2\pi x)','0.35\sin(8\pi x)','combined signal','low frequency: overall trend','high frequency: fine detail','adding the high-frequency term','```tikz {showConsole=false}' -SimpleMatch`
Expected: The output shows the new Fourier-features figure and all key labels for the three stacked panels.

- [ ] **Step 3: Read the surrounding excerpt to confirm the figure sits in the intended spot**

Run: `$lines = Get-Content -Encoding UTF8 'docs\Trigonometric-Functions.md'; $lines[1108..1132]`
Expected: The `\gamma(x)` formula appears first, then the new `tikz` block, then the caption area, and only afterward does the sentence `這種表示稱為 Fourier features。其核心想法是：` appear.

### Task 3: Add the caption and verify the section flow

**Files:**
- Modify: `docs/Trigonometric-Functions.md`

- [ ] **Step 1: Add the short caption immediately below the new figure**

```markdown
低頻成分先描述整體輪廓，高頻成分再補上局部細節；把輸入映射到多個不同頻率的正弦餘弦特徵後，模型會更容易表示快速變化的訊號。
```

- [ ] **Step 2: Verify the caption appears inside section `6.2` and the existing bullet list still follows**

Run: `Select-String -Path 'docs\Trigonometric-Functions.md' -Pattern '低頻成分先描述整體輪廓，高頻成分再補上局部細節；把輸入映射到多個不同頻率的正弦餘弦特徵後，模型會更容易表示快速變化的訊號。','這種表示稱為 Fourier features。其核心想法是：','低頻項描述整體趨勢；','高頻項描述細節變化；' -SimpleMatch`
Expected: The caption appears above the sentence `這種表示稱為 Fourier features。其核心想法是：`, and the original `6.2` bullet points remain present afterward.

- [ ] **Step 3: Verify the section `6.2` excerpt still flows cleanly into `6.3`**

Run: `$lines = Get-Content -Encoding UTF8 'docs\Trigonometric-Functions.md'; $lines[1105..1138]`
Expected: Section `6.2` contains the formula, then the new figure, then the caption, then the original explanatory bullets, and finally transitions normally to `### 6.3 位置與時間訊號表示`.

### Task 4: Run static verification and TeX-engine verification

**Files:**
- Modify: `docs/Trigonometric-Functions.md`

- [ ] **Step 1: Verify the document now contains exactly nine `tikz` blocks**

Run: `(Select-String -Path 'docs\Trigonometric-Functions.md' -Pattern '```tikz {showConsole=false}' -SimpleMatch | Measure-Object).Count`
Expected: `9`

- [ ] **Step 2: Check that no TikZ `calc`-library coordinate syntax was introduced**

Run: `Select-String -Path 'docs\Trigonometric-Functions.md' -Pattern '$(0,0)!','!0.',')+(0,' -SimpleMatch`
Expected: No matches, so the new figure does not depend on `calc` syntax that previously triggered TeX-engine render failures.

- [ ] **Step 3: Compile the new figure as a minimal standalone TeX file with `tectonic`**

Run:

```powershell
$dir = Join-Path $env:TEMP 'trig-fourier-features-figure-check'
New-Item -ItemType Directory -Force -Path $dir | Out-Null
$tex = @'
\documentclass{article}
\usepackage{tikz}
\pagestyle{empty}
\begin{document}
\begin{tikzpicture}[x=8cm,y=1.15cm]
  \draw[->, thick] (-0.03,2.15) -- (1.08,2.15) node[right] {$x$};
  \draw[->, thick] (-0.03,0.85) -- (1.08,0.85) node[right] {$x$};
  \draw[->, thick] (-0.03,-0.45) -- (1.08,-0.45) node[right] {$x$};

  \draw[blue, very thick, samples=120, domain=0:1]
    plot (\x,{2.15 + 0.34*sin(360*\x)});
  \draw[red, very thick, samples=180, domain=0:1]
    plot (\x,{0.85 + 0.22*sin(1440*\x)});
  \draw[orange!85!black, very thick, samples=180, domain=0:1]
    plot (\x,{-0.45 + 0.34*sin(360*\x) + 0.22*sin(1440*\x)});

  \node[blue, anchor=west] at (0.02,2.62) {$\sin(2\pi x)$};
  \node[blue!70!black, anchor=west, scale=0.8] at (0.40,2.62) {low frequency: overall trend};

  \node[red, anchor=west] at (0.02,1.32) {$0.35\sin(8\pi x)$};
  \node[red!70!black, anchor=west, scale=0.8] at (0.44,1.32) {high frequency: fine detail};

  \node[orange!85!black, anchor=west] at (0.02,0.22) {combined signal};
  \node[black, anchor=west, scale=0.8] at (0.40,0.22) {$\sin(2\pi x)+0.35\sin(8\pi x)$};

  \node[below] at (0,-0.45) {$0$};
  \node[below] at (1,-0.45) {$1$};

  \node[align=left, scale=0.78] at (0.80,-1.02)
    {adding the high-frequency term\\ reveals finer local variation};
\end{tikzpicture}
\end{document}
'@
$path = Join-Path $dir 'fourier-features-figure-check.tex'
Set-Content -Encoding UTF8 -Path $path -Value $tex
tectonic --outdir $dir $path
```

Expected: `tectonic` exits successfully and writes `fourier-features-figure-check.pdf`. If the first sandboxed run fails with network/font fetch errors, rerun the same compile unsandboxed; success is still the required end state.

- [ ] **Step 4: Verify major section headings remain intact**

Run: `rg -n "^## |^### " 'docs\Trigonometric-Functions.md'`
Expected: All existing major sections and subsections remain present, including `### 6.2 Fourier features 與頻率表示`, `### 6.3 位置與時間訊號表示`, and `### 6.4 為什麼常用 $(\cos\theta,\sin\theta)$ 或 $(\sin\theta,\cos\theta)$ 取代直接用角度？`.

- [ ] **Step 5: Verify the key figure and caption strings survived insertion**

Run: `Select-String -Path 'docs\Trigonometric-Functions.md' -Pattern 'low frequency: overall trend','high frequency: fine detail','combined signal','低頻成分先描述整體輪廓，高頻成分再補上局部細節；把輸入映射到多個不同頻率的正弦餘弦特徵後，模型會更容易表示快速變化的訊號。' -SimpleMatch`
Expected: The figure labels and the `6.2` caption are all present in the saved document.

- [ ] **Step 6: Record the Git limitation instead of inventing a commit**

Run: `git rev-parse --show-toplevel`
Expected: If it fails with `not a git repository`, report that the document change was verified locally but not committed.
