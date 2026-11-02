# Trigonometric Rotation Matrix Figure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add one `tikz` geometry figure plus a short caption in section `6.5` so the 2D rotation-matrix subsection visually explains how a point `(x,y)` rotates into `(x',y')`.

**Architecture:** Modify `docs/Trigonometric-Functions.md` in place. Insert a new tenth `tikz` fenced block immediately after the main `6.5` rotation-matrix formula and before the sentence `也就是`, then place one short caption below the figure. Keep the existing component formulas, application bullets, and `例 4：旋轉 (1,0)` untouched so the new figure acts as a geometric bridge between the matrix formula and the later unit-circle reminder.

**Tech Stack:** Markdown, TikZ fenced code block, PowerShell, `rg`, `tectonic`

---

### Task 1: Confirm the approved insertion anchors and baseline state

**Files:**
- Reference: `docs/superpowers/specs/2026-07-06-trigonometric-rotation-matrix-figure-design.md`
- Modify: `docs/Trigonometric-Functions.md`

- [ ] **Step 1: Re-read the approved rotation-matrix figure spec**

Run: `Get-Content -Raw -Encoding UTF8 'docs\superpowers\specs\2026-07-06-trigonometric-rotation-matrix-figure-design.md'`
Expected: The spec requires one general-point rotation figure in `6.5`, with `P(x,y)`, `P'(x',y')`, angle `\theta`, projected coordinates `x,y,x',y'`, and a short caption about unchanged length and changed projections.

- [ ] **Step 2: Read the current `6.5` excerpt to anchor the edit**

Run: `rg -n -C 10 "^### 6\.5|^### 6\.6|也就是|例 4：旋轉" 'docs\Trigonometric-Functions.md'`
Expected: The output shows the main rotation-matrix formula in `6.5`, followed immediately by the sentence `也就是`, and later the existing `例 4：旋轉 (1,0)` subsection before the transition to `### 6.6 圖學與機器人中的方向表示`.

- [ ] **Step 3: Verify the document currently contains exactly nine `tikz` blocks**

Run: `(Select-String -Path 'docs\Trigonometric-Functions.md' -Pattern '```tikz {showConsole=false}' -SimpleMatch | Measure-Object).Count`
Expected: `9`

### Task 2: Insert the rotation-matrix geometry figure into section 6.5

**Files:**
- Reference: `docs/superpowers/specs/2026-07-06-trigonometric-rotation-matrix-figure-design.md`
- Modify: `docs/Trigonometric-Functions.md`

- [ ] **Step 1: Insert the new figure block directly below the main rotation-matrix formula and above the sentence `也就是`**

```markdown
```tikz {showConsole=false}
\begin{tikzpicture}[scale=2.1]
  \draw[->, thick] (-0.18,0) -- (1.42,0) node[right] {$x$-axis};
  \draw[->, thick] (0,-0.18) -- (0,1.28) node[above] {$y$-axis};

  \coordinate (O) at (0,0);
  \coordinate (P) at (1.00,0.55);
  \coordinate (Q) at (0.50,1.02);

  \draw[very thick] (O) -- (P);
  \draw[very thick, blue] (O) -- (Q);

  \draw[dashed] (P) -- (1.00,0);
  \draw[dashed] (P) -- (0,0.55);
  \draw[dashed, blue] (Q) -- (0.50,0);
  \draw[dashed, blue] (Q) -- (0,1.02);

  \fill (O) circle (0.02) node[below left] {$O$};
  \fill (P) circle (0.02) node[right] {$P(x,y)$};
  \fill[blue] (Q) circle (0.02) node[above right] {$P'(x',y')$};

  \node[below] at (1.00,0) {$x$};
  \node[left] at (0,0.55) {$y$};
  \node[below, blue] at (0.50,0) {$x'$};
  \node[left, blue] at (0,1.02) {$y'$};

  \draw[->, purple, thick] (29:0.34) arc[start angle=29,end angle=64,radius=0.34];
  \node[purple] at (47:0.48) {$\theta$};
\end{tikzpicture}
```
```

- [ ] **Step 2: Verify the new figure block and its key labels were added**

Run: `Select-String -Path 'docs\Trigonometric-Functions.md' -Pattern "P(x,y)","P'(x',y')","x'","y'","\theta","```tikz {showConsole=false}" -SimpleMatch`
Expected: The output shows the new `6.5` figure and the required point, coordinate, and angle labels.

- [ ] **Step 3: Read the surrounding excerpt to confirm the figure sits in the intended spot**

Run: `$lines = Get-Content -Encoding UTF8 'docs\Trigonometric-Functions.md'; $lines[1190..1230]`
Expected: The rotation-matrix formula appears first, then the new `tikz` block, then the caption area, and only afterward does the sentence `也就是` appear before the component formulas.

### Task 3: Add the caption and verify the section flow

**Files:**
- Modify: `docs/Trigonometric-Functions.md`

- [ ] **Step 1: Add the short caption immediately below the new figure**

```markdown
旋轉矩陣可以看成把向量整體逆時針轉過 $\theta$；同一個點在旋轉前後長度不變，但它在座標軸上的投影會改變，因此得到新的座標 $(x',y')$。
```

- [ ] **Step 2: Verify the caption appears inside section `6.5` and the existing formulas still follow**

Run: `Select-String -Path 'docs\Trigonometric-Functions.md' -Pattern '旋轉矩陣可以看成把向量整體逆時針轉過','也就是','x''=x\cos\theta-y\sin\theta','y''=x\sin\theta+y\cos\theta' -SimpleMatch`
Expected: The caption appears above `也就是`, and the existing component formulas remain present afterward.

- [ ] **Step 3: Verify the section `6.5` excerpt still flows cleanly into `例 4` and `6.6`**

Run: `$lines = Get-Content -Encoding UTF8 'docs\Trigonometric-Functions.md'; $lines[1188..1236]`
Expected: Section `6.5` contains the formula, then the new figure, then the caption, then the original explanation and `例 4：旋轉 (1,0)`, and finally transitions normally to `### 6.6 圖學與機器人中的方向表示`.

### Task 4: Run static verification and TeX-engine verification

**Files:**
- Modify: `docs/Trigonometric-Functions.md`

- [ ] **Step 1: Verify the document now contains exactly ten `tikz` blocks**

Run: `(Select-String -Path 'docs\Trigonometric-Functions.md' -Pattern '```tikz {showConsole=false}' -SimpleMatch | Measure-Object).Count`
Expected: `10`

- [ ] **Step 2: Check that no TikZ `calc`-library coordinate syntax was introduced**

Run: `Select-String -Path 'docs\Trigonometric-Functions.md' -Pattern '$(0,0)!','!0.',')+(0,' -SimpleMatch`
Expected: No matches, so the new figure does not depend on `calc` syntax that previously triggered TeX-engine render failures.

- [ ] **Step 3: Compile the new figure as a minimal standalone TeX file with `tectonic`**

Run:

```powershell
$dir = Join-Path $env:TEMP 'trig-rotation-matrix-figure-check'
New-Item -ItemType Directory -Force -Path $dir | Out-Null
$tex = @'
\documentclass{article}
\usepackage{tikz}
\pagestyle{empty}
\begin{document}
\begin{tikzpicture}[scale=2.1]
  \draw[->, thick] (-0.18,0) -- (1.42,0) node[right] {$x$-axis};
  \draw[->, thick] (0,-0.18) -- (0,1.28) node[above] {$y$-axis};

  \coordinate (O) at (0,0);
  \coordinate (P) at (1.00,0.55);
  \coordinate (Q) at (0.50,1.02);

  \draw[very thick] (O) -- (P);
  \draw[very thick, blue] (O) -- (Q);

  \draw[dashed] (P) -- (1.00,0);
  \draw[dashed] (P) -- (0,0.55);
  \draw[dashed, blue] (Q) -- (0.50,0);
  \draw[dashed, blue] (Q) -- (0,1.02);

  \fill (O) circle (0.02) node[below left] {$O$};
  \fill (P) circle (0.02) node[right] {$P(x,y)$};
  \fill[blue] (Q) circle (0.02) node[above right] {$P'(x',y')$};

  \node[below] at (1.00,0) {$x$};
  \node[left] at (0,0.55) {$y$};
  \node[below, blue] at (0.50,0) {$x'$};
  \node[left, blue] at (0,1.02) {$y'$};

  \draw[->, purple, thick] (29:0.34) arc[start angle=29,end angle=64,radius=0.34];
  \node[purple] at (47:0.48) {$\theta$};
\end{tikzpicture}
\end{document}
'@
$path = Join-Path $dir 'rotation-matrix-figure-check.tex'
Set-Content -Encoding UTF8 -Path $path -Value $tex
tectonic --outdir $dir $path
```

Expected: `tectonic` exits successfully and writes `rotation-matrix-figure-check.pdf`. If the first sandboxed run fails with network/font fetch errors, rerun the same compile unsandboxed; success is still the required end state.

- [ ] **Step 4: Verify major section headings remain intact**

Run: `rg -n "^## |^### |^#### " 'docs\Trigonometric-Functions.md'`
Expected: All existing major sections and subsections remain present, including `### 6.5 2D 旋轉矩陣與座標變換`, `#### 例 4：旋轉 $(1,0)$`, and `### 6.6 圖學與機器人中的方向表示`.

- [ ] **Step 5: Verify the key figure and caption strings survived insertion**

Run: `Select-String -Path 'docs\Trigonometric-Functions.md' -Pattern "P(x,y)","P'(x',y')","x'","y'","旋轉矩陣可以看成把向量整體逆時針轉過" -SimpleMatch`
Expected: The figure labels and the `6.5` caption are all present in the saved document.

- [ ] **Step 6: Record the Git limitation instead of inventing a commit**

Run: `git rev-parse --show-toplevel`
Expected: If it fails with `not a git repository`, report that the document change was verified locally but not committed.
