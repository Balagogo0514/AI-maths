# Trigonometric Pythagorean Figure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add one inline `tikz` geometry figure and a short caption to illustrate `\sin^2 x+\cos^2 x=1` inside `docs/Trigonometric-Functions.md`.

**Architecture:** Modify the existing trigonometric-functions note in place. Insert a third `tikz` fenced block inside section `### 4.2 畢氏恆等式`, positioned between the displayed identity and the geometric explanation, then add a short caption tying the unit-circle triangle directly to the Pythagorean theorem.

**Tech Stack:** Markdown, TikZ fenced code block, PowerShell, `rg`

---

### Task 1: Insert the Pythagorean-identity figure

**Files:**
- Reference: `docs/superpowers/specs/2026-07-03-trigonometric-pythagorean-figure-design.md`
- Modify: `docs/Trigonometric-Functions.md`

- [ ] **Step 1: Re-read the approved Pythagorean-figure spec**

Run: `Get-Content -Raw -Encoding UTF8 'docs\superpowers\specs\2026-07-03-trigonometric-pythagorean-figure-design.md'`
Expected: The spec requires one `tikz` figure inside `### 4.2 畢氏恆等式`, with a unit-circle point `P(\cos x,\sin x)`, hypotenuse `1`, projected legs `\cos x` and `\sin x`, and a short geometric caption.

- [ ] **Step 2: Insert the new `tikz` block after the displayed identity `\cos^2 x+\sin^2 x=1.` and before the paragraph `這就是最重要的三角恆等式之一。`**

```markdown
```tikz {showConsole=false}
\begin{tikzpicture}[scale=2]
  \draw[->, thick] (-0.2,0) -- (1.35,0) node[right] {$x$};
  \draw[->, thick] (0,-0.2) -- (0,1.25) node[above] {$y$};

  \draw[thick] (0,0) circle (1);
  \draw[dashed] (0,0) -- (1,0);

  \coordinate (P) at (50:1);
  \coordinate (Q) at ({cos(50)},0);
  \draw[very thick, blue] (0,0) -- (P);
  \draw[very thick] (0,0) -- (Q);
  \draw[very thick] (Q) -- (P);
  \draw[dashed] (P) -- (Q);

  \fill (0,0) circle (0.02) node[below left] {$O$};
  \fill (P) circle (0.025) node[above right] {$P(\cos x,\sin x)$};
  \fill (Q) circle (0.02);
  \fill (1,0) circle (0.02) node[below right] {$1$};

  \draw[->, blue, thick] (0.28,0) arc[start angle=0,end angle=50,radius=0.28];
  \node[blue] at (0.36,0.18) {$x$};

  \node[below] at ($(0,0)!0.55!(Q)$) {$\cos x$};
  \node[right] at ($(Q)!0.5!(P)$) {$\sin x$};
  \node[above left] at ($(0,0)!0.55!(P)$) {$1$};

  \draw ($(Q)+(0,0.06)$) -- ++(0.06,0) -- ++(0,-0.06);
\end{tikzpicture}
```
```

- [ ] **Step 3: Verify the new figure block was added**

Run: `Select-String -Path 'docs\Trigonometric-Functions.md' -Pattern 'P(\\cos x,\\sin x)','node[above left] at ($(0,0)!0.55!(P)$) {$1$};','```tikz {showConsole=false}' -SimpleMatch`
Expected: The output shows the new unit-circle triangle figure and its key labels.

### Task 2: Add the geometric caption and confirm placement

**Files:**
- Modify: `docs/Trigonometric-Functions.md`

- [ ] **Step 1: Add the short caption immediately below the new figure**

```markdown
在這張圖中，從原點到點 $P$ 的半徑長度是 $1$，水平邊與垂直邊分別是 $\cos x$ 與 $\sin x$。因此由畢氏定理立刻得到 $\cos^2 x+\sin^2 x=1$。
```

- [ ] **Step 2: Verify the new figure sits inside section `### 4.2 畢氏恆等式`**

Run: `Select-String -Path 'docs\Trigonometric-Functions.md' -Pattern '### 4.2 畢氏恆等式','在這張圖中，從原點到點 $P$ 的半徑長度是 $1$','這就是最重要的三角恆等式之一。' -SimpleMatch`
Expected: The heading appears first, then the new figure caption, and the sentence `這就是最重要的三角恆等式之一。` appears after the figure and caption.

- [ ] **Step 3: Read the surrounding excerpt for flow**

Run: `$lines = Get-Content -Encoding UTF8 'docs\Trigonometric-Functions.md'; $lines[240..290]`
Expected: The excerpt shows the identity, then the new figure, then the new caption, then the existing proof text without breaking section flow.

### Task 3: Final verification and environment note

**Files:**
- Modify: `docs/Trigonometric-Functions.md`

- [ ] **Step 1: Verify there are now exactly three `tikz` blocks in the document**

Run: `(Select-String -Path 'docs\Trigonometric-Functions.md' -Pattern '```tikz {showConsole=false}' -SimpleMatch | Measure-Object).Count`
Expected: `3`

- [ ] **Step 2: Verify document structure remains intact**

Run: `rg -n "^## |^### " 'docs\Trigonometric-Functions.md'`
Expected: All existing major sections and subsections remain present, with no heading damage from the insertion.

- [ ] **Step 3: Verify key sections still exist**

Run: `Select-String -Path 'docs\Trigonometric-Functions.md' -Pattern '單位圓中的定義','畢氏恆等式','AI 與工程中的應用','常用公式速查表' -SimpleMatch`
Expected: The document still contains the unit-circle definition section, the Pythagorean-identity section, the application section, and the final cheat sheet.

- [ ] **Step 4: Check line count increased after the figure insertion**

Run: `(Get-Content 'docs\Trigonometric-Functions.md' | Measure-Object -Line).Lines`
Expected: The line count is larger than the current document size before this third figure was added.

- [ ] **Step 5: Record the Git limitation instead of inventing a commit**

Run: `git rev-parse --show-toplevel`
Expected: If it fails with `not a git repository`, report that the document change was verified locally but not committed.
