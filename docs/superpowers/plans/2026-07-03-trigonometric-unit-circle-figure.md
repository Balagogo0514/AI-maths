# Trigonometric Unit Circle Figure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add one inline `tikz` unit-circle geometry figure and a short caption to `docs/Trigonometric-Functions.md`.

**Architecture:** Modify the existing Markdown note in place. Insert a single `tikz` fenced block inside section `### 2.2 單位圓中的定義`, then add a short explanatory paragraph immediately below it so the diagram directly reinforces `\cos\theta=x` and `\sin\theta=y`.

**Tech Stack:** Markdown, TikZ fenced code block, PowerShell, `rg`

---

### Task 1: Insert the unit-circle figure block

**Files:**
- Reference: `docs/superpowers/specs/2026-07-03-trigonometric-unit-circle-figure-design.md`
- Modify: `docs/Trigonometric-Functions.md`

- [ ] **Step 1: Re-read the approved figure spec**

Run: `Get-Content -Raw -Encoding UTF8 'docs\superpowers\specs\2026-07-03-trigonometric-unit-circle-figure-design.md'`
Expected: The spec requires one `tikz` figure in section `### 2.2 單位圓中的定義` with axis labels, the unit circle, point `P(\cos\theta,\sin\theta)`, dashed projections, and a short caption.

- [ ] **Step 2: Insert the `tikz` block after the six-function definitions and before the bullet list starting with `這一定義比直角三角形更根本`**

```markdown
```tikz {showConsole=false}
\begin{tikzpicture}[scale=2]
  \draw[->, thick] (-0.2,0) -- (1.35,0) node[right] {$x$};
  \draw[->, thick] (0,-0.2) -- (0,1.25) node[above] {$y$};

  \draw[thick] (0,0) circle (1);
  \draw[dashed] (0,0) -- (0:1);

  \coordinate (P) at (50:1);
  \draw[very thick, blue] (0,0) -- (P);
  \draw[dashed] (P) -- ({cos(50)},0);
  \draw[dashed] (P) -- (0,{sin(50)});

  \fill (0,0) circle (0.02) node[below left] {$O$};
  \fill (P) circle (0.025) node[above right] {$P(\cos\theta,\sin\theta)$};
  \fill (1,0) circle (0.02) node[below right] {$1$};

  \draw[->, blue, thick] (0.28,0) arc[start angle=0,end angle=50,radius=0.28];
  \node[blue] at (0.36,0.18) {$\theta$};

  \node[below] at ({cos(50)},0) {$\cos\theta$};
  \node[left] at (0,{sin(50)}) {$\sin\theta$};
  \node at (0.82,0.92) {$x^2+y^2=1$};
\end{tikzpicture}
```
```

- [ ] **Step 3: Verify that the `tikz` block was added**

Run: `rg -n "```tikz|P\\(\\cos\\\\theta,\\\\sin\\\\theta\\)|x\\^2\\+y\\^2=1" 'docs\Trigonometric-Functions.md'`
Expected: The search output shows the new `tikz` block and the point label with `P(\cos\theta,\sin\theta)`.

### Task 2: Add the caption and confirm placement

**Files:**
- Modify: `docs/Trigonometric-Functions.md`

- [ ] **Step 1: Add the short caption immediately below the `tikz` block**

```markdown
在這張圖中，點 $P$ 的水平座標是 $\cos\theta$，垂直座標是 $\sin\theta$。因此，三角函數不只是邊長比，也可以理解為單位圓上的座標函數。
```

- [ ] **Step 2: Verify the figure sits inside section `### 2.2 單位圓中的定義`**

Run: `rg -n "### 2\\.2|```tikz|這一定義比直角三角形更根本" 'docs\Trigonometric-Functions.md'`
Expected: The `tikz` block appears after `### 2.2 單位圓中的定義` and before the sentence `這一定義比直角三角形更根本，因為：`.

- [ ] **Step 3: Read the surrounding excerpt for flow**

Run: `$lines = Get-Content -Encoding UTF8 'docs\Trigonometric-Functions.md'; $lines[40..95]`
Expected: The excerpt shows the six-function definitions, then the figure, then the caption, then the existing explanatory bullet list without broken section flow.

### Task 3: Final verification and environment note

**Files:**
- Modify: `docs/Trigonometric-Functions.md`

- [ ] **Step 1: Verify document structure remains intact**

Run: `rg -n "^## |^### " 'docs\Trigonometric-Functions.md'`
Expected: All existing major sections and subsections remain present, with no heading damage from the insertion.

- [ ] **Step 2: Verify the file still contains the key trig-document sections**

Run: `Select-String -Path 'docs\Trigonometric-Functions.md' -Pattern '單位圓中的定義','和差角公式','AI 與工程中的應用','常用公式速查表' -SimpleMatch`
Expected: The output confirms the unit-circle definition section still coexists with the later proof and application sections.

- [ ] **Step 3: Check line count increased after the figure insertion**

Run: `(Get-Content 'docs\Trigonometric-Functions.md' | Measure-Object -Line).Lines`
Expected: The line count is larger than the previous document size before this figure was added.

- [ ] **Step 4: Record the Git limitation instead of inventing a commit**

Run: `git rev-parse --show-toplevel`
Expected: If it fails with `not a git repository`, report that the document change was verified locally but not committed.
