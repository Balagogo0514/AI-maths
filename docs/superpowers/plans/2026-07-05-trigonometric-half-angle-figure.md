# Trigonometric Half-Angle Figure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add one inline `tikz` geometry figure and a short caption to illustrate both half-angle square formulas with a unit-circle isosceles triangle and the midpoint of its chord inside `docs/Trigonometric-Functions.md`.

**Architecture:** Modify the existing trigonometric-functions note in place. Insert a seventh `tikz` fenced block inside section `### 4.5 半角公式`, specifically after the two square-form half-angle formulas and before the paragraph beginning `若要進一步寫成平方根形式`, then add a short caption tying the midpoint geometry to `\sin^2\frac{x}{2}` and `\cos^2\frac{x}{2}`.

**Tech Stack:** Markdown, TikZ fenced code block, PowerShell, `rg`, `tectonic`

---

### Task 1: Confirm the approved insertion point and baseline state

**Files:**
- Reference: `docs/superpowers/specs/2026-07-05-trigonometric-half-angle-figure-design.md`
- Modify: `docs/Trigonometric-Functions.md`

- [ ] **Step 1: Re-read the approved half-angle-figure spec**

Run: `Get-Content -Raw -Encoding UTF8 'docs\superpowers\specs\2026-07-05-trigonometric-half-angle-figure-design.md'`
Expected: The spec requires one unit-circle figure with points `O`, `A=(1,0)`, `B=(\cos x,\sin x)`, chord midpoint `M`, two `x/2` angle labels, `OM=\cos(x/2)`, `AM=\sin(x/2)`, and side notes for the two half-angle square formulas.

- [ ] **Step 2: Read the current `4.5` excerpt to anchor the insertion**

Run: `rg -n -C 10 "### 4\.5 半角公式|### 4\.6" 'docs\Trigonometric-Functions.md'`
Expected: The excerpt shows the two displayed formulas `\sin^2\frac{x}{2}=\frac{1-\cos x}{2}` and `\cos^2\frac{x}{2}=\frac{1+\cos x}{2}`, followed immediately by the paragraph `若要進一步寫成平方根形式，需注意象限與符號：`.

- [ ] **Step 3: Verify the document currently contains exactly six `tikz` blocks**

Run: `(Select-String -Path 'docs\Trigonometric-Functions.md' -Pattern '```tikz {showConsole=false}' -SimpleMatch | Measure-Object).Count`
Expected: `6`

### Task 2: Insert the half-angle geometry figure into section 4.5

**Files:**
- Reference: `docs/superpowers/specs/2026-07-05-trigonometric-half-angle-figure-design.md`
- Modify: `docs/Trigonometric-Functions.md`

- [ ] **Step 1: Insert the new `tikz` block below the displayed formula `\cos^2\frac{x}{2}=\frac{1+\cos x}{2}.` and before the paragraph `若要進一步寫成平方根形式，需注意象限與符號：`**

```markdown
```tikz {showConsole=false}
\begin{tikzpicture}[scale=2]
  \draw[->, thick] (-0.15,0) -- (1.28,0) node[right] {$x$};
  \draw[->, thick] (0,-0.15) -- (0,1.15) node[above] {$y$};

  \draw[thick] (0,0) circle (1);

  \coordinate (O) at (0,0);
  \coordinate (A) at (1,0);
  \coordinate (B) at (60:1);
  \coordinate (M) at ({(1+cos(60))/2},{sin(60)/2});

  \draw[very thick, blue] (O) -- (A);
  \draw[very thick, blue] (O) -- (B);
  \draw[very thick] (A) -- (B);
  \draw[very thick, red] (O) -- (M);

  \fill (O) circle (0.02) node[below left] {$O$};
  \fill (A) circle (0.02) node[below right] {$A(1,0)$};
  \fill (B) circle (0.025) node[above right] {$B(\cos x,\sin x)$};
  \fill (M) circle (0.02) node[right] {$M$};

  \draw[->, blue, thick] (0.24,0) arc[start angle=0,end angle=30,radius=0.24];
  \draw[->, blue, thick] (30:0.31) arc[start angle=30,end angle=60,radius=0.31];
  \node[blue] at (15:0.36) {$\frac{x}{2}$};
  \node[blue] at (45:0.43) {$\frac{x}{2}$};

  \node[below] at (0.5,0) {$1$};
  \node[left] at (0.42,0.73) {$1$};
  \node[above left] at (0.38,0.19) {$OM=\cos\frac{x}{2}$};
  \node[below] at (0.86,0.20) {$AM=\sin\frac{x}{2}$};

  \node[align=left, scale=0.8] at (1.52,0.74) {$OM^2=\frac{1+\cos x}{2}$\\ $AM^2=\frac{1-\cos x}{2}$};
\end{tikzpicture}
```
```

- [ ] **Step 2: Verify the new figure block and its key labels were added**

Run: `Select-String -Path 'docs\Trigonometric-Functions.md' -Pattern 'A(1,0)','B(\cos x,\sin x)','OM=\cos\frac{x}{2}','AM=\sin\frac{x}{2}','OM^2=\frac{1+\cos x}{2}','AM^2=\frac{1-\cos x}{2}','```tikz {showConsole=false}' -SimpleMatch`
Expected: The output shows the new half-angle figure and its point, angle, and length labels.

- [ ] **Step 3: Read the surrounding excerpt to confirm the figure sits in the intended spot**

Run: `$lines = Get-Content -Encoding UTF8 'docs\Trigonometric-Functions.md'; $lines[584..625]`
Expected: The two half-angle square formulas appear first, then the new figure block, then the paragraph beginning `若要進一步寫成平方根形式`.

### Task 3: Add the caption and verify renderer-safe structure

**Files:**
- Modify: `docs/Trigonometric-Functions.md`

- [ ] **Step 1: Add the short caption immediately below the new figure**

```markdown
在等腰三角形 $OAB$ 中，弦 $AB$ 的中點 $M$ 會把頂角 $x$ 平分成兩個 $x/2$，因此 $OMA$ 是關鍵直角三角形。由 $OA=1$、$OM=\cos(x/2)$、$AM=\sin(x/2)$，再配合中點的長度關係，可得到 $\cos^2\frac{x}{2}=\frac{1+\cos x}{2}$ 與 $\sin^2\frac{x}{2}=\frac{1-\cos x}{2}$。
```

- [ ] **Step 2: Verify the figure and caption both appear inside section `4.5`**

Run: `Select-String -Path 'docs\Trigonometric-Functions.md' -Pattern '### 4.5 半角公式','在等腰三角形 $OAB$ 中，弦 $AB$ 的中點 $M$ 會把頂角 $x$ 平分成兩個 $x/2$','若要進一步寫成平方根形式，需注意象限與符號：' -SimpleMatch`
Expected: The heading appears first, the new caption appears inside section `4.5`, and the paragraph `若要進一步寫成平方根形式，需注意象限與符號：` still follows afterward.

- [ ] **Step 3: Verify the document now contains exactly seven `tikz` blocks**

Run: `(Select-String -Path 'docs\Trigonometric-Functions.md' -Pattern '```tikz {showConsole=false}' -SimpleMatch | Measure-Object).Count`
Expected: `7`

- [ ] **Step 4: Check that no `calc`-library coordinate syntax was introduced**

Run: `Select-String -Path 'docs\Trigonometric-Functions.md' -Pattern '$(0,0)!','!0.',')+(0,' -SimpleMatch`
Expected: No matches, so the new figure does not depend on the TikZ `calc` syntax that previously triggered TeX-engine render failures.

### Task 4: Run TeX-engine and structure verification

**Files:**
- Modify: `docs/Trigonometric-Functions.md`

- [ ] **Step 1: Compile the new figure as a minimal standalone TeX file with `tectonic`**

Run:

```powershell
$dir = Join-Path $env:TEMP 'trig-half-angle-figure-check'
New-Item -ItemType Directory -Force -Path $dir | Out-Null
$tex = @'
\documentclass{article}
\usepackage{tikz}
\pagestyle{empty}
\begin{document}
\begin{tikzpicture}[scale=2]
  \draw[->, thick] (-0.15,0) -- (1.28,0) node[right] {$x$};
  \draw[->, thick] (0,-0.15) -- (0,1.15) node[above] {$y$};

  \draw[thick] (0,0) circle (1);

  \coordinate (O) at (0,0);
  \coordinate (A) at (1,0);
  \coordinate (B) at (60:1);
  \coordinate (M) at ({(1+cos(60))/2},{sin(60)/2});

  \draw[very thick, blue] (O) -- (A);
  \draw[very thick, blue] (O) -- (B);
  \draw[very thick] (A) -- (B);
  \draw[very thick, red] (O) -- (M);

  \fill (O) circle (0.02) node[below left] {$O$};
  \fill (A) circle (0.02) node[below right] {$A(1,0)$};
  \fill (B) circle (0.025) node[above right] {$B(\cos x,\sin x)$};
  \fill (M) circle (0.02) node[right] {$M$};

  \draw[->, blue, thick] (0.24,0) arc[start angle=0,end angle=30,radius=0.24];
  \draw[->, blue, thick] (30:0.31) arc[start angle=30,end angle=60,radius=0.31];
  \node[blue] at (15:0.36) {$\frac{x}{2}$};
  \node[blue] at (45:0.43) {$\frac{x}{2}$};

  \node[below] at (0.5,0) {$1$};
  \node[left] at (0.42,0.73) {$1$};
  \node[above left] at (0.38,0.19) {$OM=\cos\frac{x}{2}$};
  \node[below] at (0.86,0.20) {$AM=\sin\frac{x}{2}$};

  \node[align=left, scale=0.8] at (1.52,0.74) {$OM^2=\frac{1+\cos x}{2}$\\ $AM^2=\frac{1-\cos x}{2}$};
\end{tikzpicture}
\end{document}
'@
$path = Join-Path $dir 'half-angle-check.tex'
Set-Content -Encoding UTF8 -Path $path -Value $tex
tectonic --outdir $dir $path
```

Expected: `tectonic` exits successfully and writes `half-angle-check.pdf`. If the first sandboxed run fails with network/font fetch errors, rerun the same compile unsandboxed; success is still the required end state.

- [ ] **Step 2: Verify major section headings remain intact**

Run: `rg -n "^## |^### " 'docs\Trigonometric-Functions.md'`
Expected: All existing major sections and subsections remain present, including `### 4.5 半角公式`, `### 4.6 積化和差與和差化積`, and `## 6. AI 與工程中的應用`.

- [ ] **Step 3: Verify the half-angle formulas still appear after insertion**

Run: `Select-String -Path 'docs\Trigonometric-Functions.md' -Pattern '\sin^2\frac{x}{2}=\frac{1-\cos x}{2}.','\cos^2\frac{x}{2}=\frac{1+\cos x}{2}.','OM^2=\frac{1+\cos x}{2}','AM^2=\frac{1-\cos x}{2}' -SimpleMatch`
Expected: Both half-angle square formulas remain present, and the new figure block contains the matching length-square labels.

- [ ] **Step 4: Record the Git limitation instead of inventing a commit**

Run: `git rev-parse --show-toplevel`
Expected: If it fails with `not a git repository`, report that the document change was verified locally but not committed.
