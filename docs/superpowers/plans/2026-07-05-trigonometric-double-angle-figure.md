# Trigonometric Double-Angle Figure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add one inline `tikz` geometry figure and a short caption to illustrate the double-angle formulas with the unit-circle points at angles `x` and `2x` inside `docs/Trigonometric-Functions.md`.

**Architecture:** Modify the existing trigonometric-functions note in place. Insert a fifth `tikz` fenced block inside section `### 4.4 倍角公式`, specifically after the two displayed main formulas and before the paragraph introducing equivalent forms, then add a short caption connecting the point `Q=(\cos 2x,\sin 2x)` to the previous section’s angle-sum formulas with `x+x`.

**Tech Stack:** Markdown, TikZ fenced code block, PowerShell, `rg`, `tectonic`

---

### Task 1: Confirm the approved insertion point and baseline state

**Files:**
- Reference: `docs/superpowers/specs/2026-07-05-trigonometric-double-angle-figure-design.md`
- Modify: `docs/Trigonometric-Functions.md`

- [ ] **Step 1: Re-read the approved double-angle-figure spec**

Run: `Get-Content -Raw -Encoding UTF8 'docs\superpowers\specs\2026-07-05-trigonometric-double-angle-figure-design.md'`
Expected: The spec requires one unit-circle figure with `P=(\cos x,\sin x)`, `Q=(\cos 2x,\sin 2x)`, full projection labels for both points, angle markers `x` and `2x`, one short caption, and no extra area or difference-of-squares construction.

- [ ] **Step 2: Read the current `4.4` excerpt to anchor the insertion**

Run: `$lines = Get-Content -Encoding UTF8 'docs\Trigonometric-Functions.md'; $lines[474..506]`
Expected: The excerpt shows the two displayed formulas `\sin 2x=2\sin x\cos x` and `\cos 2x=\cos^2 x-\sin^2 x`, followed immediately by the paragraph `再配合 \sin^2 x+\cos^2 x=1，可以改寫成兩個等價形式：`.

- [ ] **Step 3: Verify the document currently contains exactly four `tikz` blocks**

Run: `(Select-String -Path 'docs\Trigonometric-Functions.md' -Pattern '```tikz {showConsole=false}' -SimpleMatch | Measure-Object).Count`
Expected: `4`

### Task 2: Insert the double-angle geometry figure into section 4.4

**Files:**
- Reference: `docs/superpowers/specs/2026-07-05-trigonometric-double-angle-figure-design.md`
- Modify: `docs/Trigonometric-Functions.md`

- [ ] **Step 1: Insert the new `tikz` block below the displayed formula `\cos 2x=\cos^2 x-\sin^2 x.` and before the paragraph `再配合 \sin^2 x+\cos^2 x=1，可以改寫成兩個等價形式：`**

```markdown
```tikz {showConsole=false}
\begin{tikzpicture}[scale=2]
  \draw[->, thick] (-0.2,0) -- (1.35,0) node[right] {$x$};
  \draw[->, thick] (0,-0.2) -- (0,1.25) node[above] {$y$};

  \draw[thick] (0,0) circle (1);

  \coordinate (P) at (30:1);
  \coordinate (Q) at (60:1);
  \coordinate (Px) at ({cos(30)},0);
  \coordinate (Py) at (0,{sin(30)});
  \coordinate (Qx) at ({cos(60)},0);
  \coordinate (Qy) at (0,{sin(60)});

  \draw[very thick, blue] (0,0) -- (P);
  \draw[very thick, red] (0,0) -- (Q);

  \draw[dashed] (P) -- (Px);
  \draw[dashed] (P) -- (Py);
  \draw[dashed] (Q) -- (Qx);
  \draw[dashed] (Q) -- (Qy);

  \fill (0,0) circle (0.02) node[below left] {$O$};
  \fill (P) circle (0.025) node[below right] {$P(\cos x,\sin x)$};
  \fill (Q) circle (0.025) node[above right] {$Q(\cos 2x,\sin 2x)$};

  \draw[->, blue, thick] (0.24,0) arc[start angle=0,end angle=30,radius=0.24];
  \node[blue] at (0.29,0.09) {$x$};

  \draw[->, red, thick] (0.42,0) arc[start angle=0,end angle=60,radius=0.42];
  \node[red] at (0.32,0.31) {$2x$};

  \node[below] at (Px) {$\cos x$};
  \node[left] at (Py) {$\sin x$};
  \node[below left] at (Qx) {$\cos 2x$};
  \node[left] at (Qy) {$\sin 2x$};
  \node[above left] at (0.27,0.47) {$1$};
\end{tikzpicture}
```
```

- [ ] **Step 2: Verify the new figure block and its key labels were added**

Run: `Select-String -Path 'docs\Trigonometric-Functions.md' -Pattern 'P(\cos x,\sin x)','Q(\cos 2x,\sin 2x)','\cos 2x','\sin 2x','```tikz {showConsole=false}' -SimpleMatch`
Expected: The output shows the new double-angle unit-circle figure and its point, angle, and projection labels.

- [ ] **Step 3: Read the surrounding excerpt to confirm the figure sits in the intended spot**

Run: `$lines = Get-Content -Encoding UTF8 'docs\Trigonometric-Functions.md'; $lines[480..526]`
Expected: The two main formulas appear first, then the new figure block, then the paragraph beginning `再配合 \sin^2 x+\cos^2 x=1`.

### Task 3: Add the caption and verify renderer-safe structure

**Files:**
- Modify: `docs/Trigonometric-Functions.md`

- [ ] **Step 1: Add the short caption immediately below the new figure**

```markdown
在這張圖中，點 $Q$ 是單位圓上角度為 $2x$ 的點，因此它的座標直接給出 $\cos 2x$ 與 $\sin 2x$。又因為 $2x=x+x$，把上一節和角公式中的 $\alpha=\beta=x$ 代入，就得到 $\sin 2x=2\sin x\cos x$ 與 $\cos 2x=\cos^2 x-\sin^2 x$。
```

- [ ] **Step 2: Verify the figure and caption both appear inside the double-angle section**

Run: `Select-String -Path 'docs\Trigonometric-Functions.md' -Pattern '### 4.4 倍角公式','在這張圖中，點 $Q$ 是單位圓上角度為 $2x$ 的點','再配合 $\sin^2 x+\cos^2 x=1$，可以改寫成兩個等價形式：' -SimpleMatch`
Expected: The heading appears first, the new caption appears inside section `4.4`, and the paragraph about equivalent forms still follows afterward.

- [ ] **Step 3: Verify the document now contains exactly five `tikz` blocks**

Run: `(Select-String -Path 'docs\Trigonometric-Functions.md' -Pattern '```tikz {showConsole=false}' -SimpleMatch | Measure-Object).Count`
Expected: `5`

- [ ] **Step 4: Check that no `calc`-library coordinate syntax was introduced**

Run: `Select-String -Path 'docs\Trigonometric-Functions.md' -Pattern '$(0,0)!','!0.',')+(0,' -SimpleMatch`
Expected: No matches, so the new figure does not depend on the TikZ `calc` syntax that previously triggered TeX-engine render failures.

### Task 4: Run TeX-engine and structure verification

**Files:**
- Modify: `docs/Trigonometric-Functions.md`

- [ ] **Step 1: Compile the new figure as a minimal standalone TeX file with `tectonic`**

Run:

```powershell
$dir = Join-Path $env:TEMP 'trig-double-angle-figure-check'
New-Item -ItemType Directory -Force -Path $dir | Out-Null
$tex = @'
\documentclass{article}
\usepackage{tikz}
\pagestyle{empty}
\begin{document}
\begin{tikzpicture}[scale=2]
  \draw[->, thick] (-0.2,0) -- (1.35,0) node[right] {$x$};
  \draw[->, thick] (0,-0.2) -- (0,1.25) node[above] {$y$};

  \draw[thick] (0,0) circle (1);

  \coordinate (P) at (30:1);
  \coordinate (Q) at (60:1);
  \coordinate (Px) at ({cos(30)},0);
  \coordinate (Py) at (0,{sin(30)});
  \coordinate (Qx) at ({cos(60)},0);
  \coordinate (Qy) at (0,{sin(60)});

  \draw[very thick, blue] (0,0) -- (P);
  \draw[very thick, red] (0,0) -- (Q);

  \draw[dashed] (P) -- (Px);
  \draw[dashed] (P) -- (Py);
  \draw[dashed] (Q) -- (Qx);
  \draw[dashed] (Q) -- (Qy);

  \fill (0,0) circle (0.02) node[below left] {$O$};
  \fill (P) circle (0.025) node[below right] {$P(\cos x,\sin x)$};
  \fill (Q) circle (0.025) node[above right] {$Q(\cos 2x,\sin 2x)$};

  \draw[->, blue, thick] (0.24,0) arc[start angle=0,end angle=30,radius=0.24];
  \node[blue] at (0.29,0.09) {$x$};

  \draw[->, red, thick] (0.42,0) arc[start angle=0,end angle=60,radius=0.42];
  \node[red] at (0.32,0.31) {$2x$};

  \node[below] at (Px) {$\cos x$};
  \node[left] at (Py) {$\sin x$};
  \node[below left] at (Qx) {$\cos 2x$};
  \node[left] at (Qy) {$\sin 2x$};
  \node[above left] at (0.27,0.47) {$1$};
\end{tikzpicture}
\end{document}
'@
$path = Join-Path $dir 'double-angle-check.tex'
Set-Content -Encoding UTF8 -Path $path -Value $tex
tectonic --outdir $dir $path
```

Expected: `tectonic` exits successfully and writes `double-angle-check.pdf`, proving the figure passes an actual TeX-engine compile.

- [ ] **Step 2: Verify major section headings remain intact**

Run: `rg -n "^## |^### " 'docs\Trigonometric-Functions.md'`
Expected: All existing major sections and subsections remain present, including `### 4.4 倍角公式`, `### 4.5 半角公式`, and `## 6. AI 與工程中的應用`.

- [ ] **Step 3: Verify the double-angle formulas and equivalent forms still appear after insertion**

Run: `Select-String -Path 'docs\Trigonometric-Functions.md' -Pattern '\sin 2x=2\sin x\cos x,','\cos 2x=\cos^2 x-\sin^2 x.','\cos 2x=2\cos^2 x-1,','\cos 2x=1-2\sin^2 x.' -SimpleMatch`
Expected: Both main formulas and both equivalent forms remain present after the figure insertion.

- [ ] **Step 4: Record the Git limitation instead of inventing a commit**

Run: `git rev-parse --show-toplevel`
Expected: If it fails with `not a git repository`, report that the document change was verified locally but not committed.
