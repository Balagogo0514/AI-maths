# Trigonometric Angle-Sum Figure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add one inline `tikz` geometry figure and a short caption to illustrate how rotating the unit-circle point at angle `\alpha` by `\beta` produces the point at angle `\alpha+\beta` inside `docs/Trigonometric-Functions.md`.

**Architecture:** Modify the existing trigonometric-functions note in place. Insert a fourth `tikz` fenced block inside section `### 4.3 和差角公式`, specifically in `#### 證明思路：利用旋轉矩陣`, then add a short caption connecting the geometry `Q = R(\beta)P` to the coordinate comparison that yields the angle-sum formulas.

**Tech Stack:** Markdown, TikZ fenced code block, PowerShell, `rg`

---

### Task 1: Confirm the approved insertion point and baseline state

**Files:**
- Reference: `docs/superpowers/specs/2026-07-05-trigonometric-angle-sum-figure-design.md`
- Modify: `docs/Trigonometric-Functions.md`

- [ ] **Step 1: Re-read the approved angle-sum-figure spec**

Run: `Get-Content -Raw -Encoding UTF8 'docs\superpowers\specs\2026-07-05-trigonometric-angle-sum-figure-design.md'`
Expected: The spec requires one unit-circle figure with `P=(\cos\alpha,\sin\alpha)`, `Q=(\cos(\alpha+\beta),\sin(\alpha+\beta))`, angle markers `\alpha` and `\beta`, one short caption, and no extra matrix-expansion diagram.

- [ ] **Step 2: Read the current `4.3` excerpt to anchor the insertion**

Run: `$lines = Get-Content -Encoding UTF8 'docs\Trigonometric-Functions.md'; $lines[344..405]`
Expected: The excerpt shows `#### 證明思路：利用旋轉矩陣`, the displayed matrix `R(\beta)`, the two basis-vector bullets, the paragraph `因此，若一個點原本是`, and the later coordinate-comparison formulas.

- [ ] **Step 3: Verify the document currently contains exactly three `tikz` blocks**

Run: `(Select-String -Path 'docs\Trigonometric-Functions.md' -Pattern '```tikz {showConsole=false}' -SimpleMatch | Measure-Object).Count`
Expected: `3`

### Task 2: Insert the angle-sum geometry figure into section 4.3

**Files:**
- Reference: `docs/superpowers/specs/2026-07-05-trigonometric-angle-sum-figure-design.md`
- Modify: `docs/Trigonometric-Functions.md`

- [ ] **Step 1: Insert the new `tikz` block below the two basis-vector bullets and before the paragraph `因此，若一個點原本是`**

```markdown
```tikz {showConsole=false}
\begin{tikzpicture}[scale=2]
  \draw[->, thick] (-0.2,0) -- (1.3,0) node[right] {$x$};
  \draw[->, thick] (0,-0.2) -- (0,1.25) node[above] {$y$};

  \draw[thick] (0,0) circle (1);

  \coordinate (P) at (35:1);
  \coordinate (Q) at (75:1);

  \draw[very thick, blue] (0,0) -- (P);
  \draw[very thick, red] (0,0) -- (Q);

  \fill (0,0) circle (0.02) node[below left] {$O$};
  \fill (P) circle (0.025) node[right] {$P(\cos\alpha,\sin\alpha)$};
  \fill (Q) circle (0.025) node[above right] {$Q(\cos(\alpha+\beta),\sin(\alpha+\beta))$};

  \draw[->, blue, thick] (0.28,0) arc[start angle=0,end angle=35,radius=0.28];
  \node[blue] at (0.34,0.12) {$\alpha$};

  \draw[->, red, thick] (35:0.42) arc[start angle=35,end angle=75,radius=0.42];
  \node[red] at (54:0.52) {$\beta$};

  \node at (0.73,0.88) {$x^2+y^2=1$};
\end{tikzpicture}
```
```

- [ ] **Step 2: Verify the new figure block and its key labels were added**

Run: `Select-String -Path 'docs\Trigonometric-Functions.md' -Pattern 'P(\cos\alpha,\sin\alpha)','Q(\cos(\alpha+\beta),\sin(\alpha+\beta))','node[red] at (54:0.52) {$\beta$};','```tikz {showConsole=false}' -SimpleMatch`
Expected: The output shows the new unit-circle rotation figure and its point and angle labels.

- [ ] **Step 3: Read the surrounding excerpt to confirm the figure sits in the intended spot**

Run: `$lines = Get-Content -Encoding UTF8 'docs\Trigonometric-Functions.md'; $lines[352..392]`
Expected: The matrix and basis-vector bullets appear first, then the new figure block, then the paragraph `因此，若一個點原本是`.

### Task 3: Add the caption and verify renderer-safe structure

**Files:**
- Modify: `docs/Trigonometric-Functions.md`

- [ ] **Step 1: Add the short caption immediately below the new figure**

```markdown
在這張圖中，點 $P$ 是單位圓上角度為 $\alpha$ 的點；將它逆時針旋轉 $\beta$ 後，得到點 $Q$。因此 $Q$ 一方面可寫成 $R(\beta)P$，另一方面又是角度為 $\alpha+\beta$ 的單位圓點，所以兩種表示法的座標必須一致。
```

- [ ] **Step 2: Verify the figure and caption both appear inside the rotation-matrix proof**

Run: `Select-String -Path 'docs\Trigonometric-Functions.md' -Pattern '#### 證明思路：利用旋轉矩陣','在這張圖中，點 $P$ 是單位圓上角度為 $\alpha$ 的點','因此，若一個點原本是' -SimpleMatch`
Expected: The heading appears first, the new caption appears within the subsection, and the paragraph `因此，若一個點原本是` still follows afterward.

- [ ] **Step 3: Verify the document now contains exactly four `tikz` blocks**

Run: `(Select-String -Path 'docs\Trigonometric-Functions.md' -Pattern '```tikz {showConsole=false}' -SimpleMatch | Measure-Object).Count`
Expected: `4`

- [ ] **Step 4: Check that no `calc`-library coordinate syntax was introduced**

Run: `Select-String -Path 'docs\Trigonometric-Functions.md' -Pattern '$(' -SimpleMatch`
Expected: No matches, so the new figure does not depend on TikZ `calc` syntax that previously caused TeX-engine render failures.

- [ ] **Step 5: Preview the section in the Markdown renderer and confirm it actually renders**

Open the Markdown preview for `docs/Trigonometric-Functions.md` and inspect section `4.3`.
Expected: The fourth figure renders without TeX-engine errors, both arcs `\alpha` and `\beta` are visible, and the labels for `P` and `Q` are legible.

### Task 4: Final structure checks and environment note

**Files:**
- Modify: `docs/Trigonometric-Functions.md`

- [ ] **Step 1: Verify major section headings remain intact**

Run: `rg -n "^## |^### " 'docs\Trigonometric-Functions.md'`
Expected: All existing major sections and subsections remain present, including `### 4.2 畢氏恆等式`, `### 4.3 和差角公式`, and `## 6. AI 與工程中的應用`.

- [ ] **Step 2: Verify the angle-sum formulas still appear after the figure**

Run: `Select-String -Path 'docs\Trigonometric-Functions.md' -Pattern '\cos(\alpha+\beta)=\cos\alpha\cos\beta-\sin\alpha\sin\beta,','\sin(\alpha+\beta)=\sin\alpha\cos\beta+\cos\alpha\sin\beta.' -SimpleMatch`
Expected: Both final formulas remain present after the proof flow, unchanged by the figure insertion.

- [ ] **Step 3: Record the Git limitation instead of inventing a commit**

Run: `git rev-parse --show-toplevel`
Expected: If it fails with `not a git repository`, report that the document change was verified locally but not committed.
