# Trigonometric Tangent Figure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add one inline `tikz` tangent-geometry figure and a short caption to explain `\tan\theta` inside `docs/Trigonometric-Functions.md`.

**Architecture:** Modify the existing trigonometric-functions note in place. Insert a second `tikz` fenced block inside section `### 2.2 單位圓中的定義`, immediately after the existing `\sin/\cos` unit-circle figure and caption, then add a short explanation connecting the tangent line geometry to `y=(\tan\theta)x` and `x=1`.

**Tech Stack:** Markdown, TikZ fenced code block, PowerShell, `rg`

---

### Task 1: Insert the tangent-line geometry figure

**Files:**
- Reference: `docs/superpowers/specs/2026-07-03-trigonometric-tangent-figure-design.md`
- Modify: `docs/Trigonometric-Functions.md`

- [ ] **Step 1: Re-read the approved tangent-figure spec**

Run: `Get-Content -Raw -Encoding UTF8 'docs\superpowers\specs\2026-07-03-trigonometric-tangent-figure-design.md'`
Expected: The spec requires one `tikz` tangent-line figure inside `### 2.2 單位圓中的定義`, after the existing unit-circle figure and before the section concludes why the unit-circle definition is more general.

- [ ] **Step 2: Insert the new `tikz` block after the existing unit-circle caption**

```markdown
```tikz {showConsole=false}
\begin{tikzpicture}[scale=2]
  \draw[->, thick] (-0.2,0) -- (1.55,0) node[right] {$x$};
  \draw[->, thick] (0,-0.2) -- (0,1.55) node[above] {$y$};

  \draw[thick] (0,0) circle (1);
  \draw[thick, orange] (1,-0.15) -- (1,1.45);

  \coordinate (T) at (1,{tan(50)});
  \draw[very thick, blue] (0,0) -- (T);

  \fill (0,0) circle (0.02) node[below left] {$O$};
  \fill (1,0) circle (0.02) node[below right] {$(1,0)$};
  \fill (T) circle (0.025) node[above right] {$T$};

  \draw[->, blue, thick] (0.28,0) arc[start angle=0,end angle=50,radius=0.28];
  \node[blue] at (0.36,0.18) {$\theta$};

  \draw[<->, red, thick] (1,0) -- (T);
  \node[red, right] at (1,{tan(50)/2}) {$\tan\theta$};
  \node[orange, right] at (1,1.32) {$x=1$};
\end{tikzpicture}
```
```

- [ ] **Step 3: Verify the figure block was added**

Run: `Select-String -Path 'docs\Trigonometric-Functions.md' -Pattern 'node[orange, right] at (1,1.32) {$x=1$};','node[red, right] at (1,{tan(50)/2}) {$\tan\theta$};','```tikz {showConsole=false}' -SimpleMatch`
Expected: The output shows the second `tikz` block and its tangent-specific labels.

### Task 2: Add the tangent caption and confirm placement

**Files:**
- Modify: `docs/Trigonometric-Functions.md`

- [ ] **Step 1: Add the short caption immediately below the tangent figure**

```markdown
在這張圖中，從原點出發的射線斜率是 $\tan\theta$，所以它可寫成 $y=(\tan\theta)x$。當這條射線與切線 $x=1$ 相交時，高度就等於 $\tan\theta$，這就是正切的幾何意義。
```

- [ ] **Step 2: Verify the tangent figure sits between the first figure caption and the sentence `這一定義比直角三角形更根本，因為：`**

Run: `Select-String -Path 'docs\Trigonometric-Functions.md' -Pattern '在這張圖中，點 $P$ 的水平座標是 $\cos\theta$','在這張圖中，從原點出發的射線斜率是 $\tan\theta$','這一定義比直角三角形更根本，因為：' -SimpleMatch`
Expected: The first figure caption appears first, the tangent caption appears second, and the paragraph introducing the definition's generality appears after both.

- [ ] **Step 3: Read the surrounding excerpt to confirm flow**

Run: `$lines = Get-Content -Encoding UTF8 'docs\Trigonometric-Functions.md'; $lines[65..120]`
Expected: The excerpt shows the existing `\sin/\cos` figure, its caption, the new tangent figure, its caption, and then the existing explanatory bullet list.

### Task 3: Final verification and environment note

**Files:**
- Modify: `docs/Trigonometric-Functions.md`

- [ ] **Step 1: Verify there are now exactly two `tikz` blocks in the document**

Run: `(Select-String -Path 'docs\Trigonometric-Functions.md' -Pattern '```tikz {showConsole=false}' -SimpleMatch | Measure-Object).Count`
Expected: `2`

- [ ] **Step 2: Verify document structure remains intact**

Run: `rg -n "^## |^### " 'docs\Trigonometric-Functions.md'`
Expected: All existing major sections and subsections remain present, with no heading damage from the insertion.

- [ ] **Step 3: Verify key sections still exist**

Run: `Select-String -Path 'docs\Trigonometric-Functions.md' -Pattern '單位圓中的定義','和差角公式','AI 與工程中的應用','常用公式速查表' -SimpleMatch`
Expected: The unit-circle definition section still coexists with the later proof and application sections.

- [ ] **Step 4: Check line count increased after the figure insertion**

Run: `(Get-Content 'docs\Trigonometric-Functions.md' | Measure-Object -Line).Lines`
Expected: The line count is larger than the current document size before this second figure was added.

- [ ] **Step 5: Record the Git limitation instead of inventing a commit**

Run: `git rev-parse --show-toplevel`
Expected: If it fails with `not a git repository`, report that the document change was verified locally but not committed.
