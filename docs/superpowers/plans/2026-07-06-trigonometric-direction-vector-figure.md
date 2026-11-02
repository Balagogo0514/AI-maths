# Trigonometric Direction Vector Figure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add one `tikz` application figure plus a short caption in section `6.6` so the graphics-and-robotics subsection visually explains how a heading angle `\theta` becomes the direction vector `(\cos\theta,\sin\theta)`.

**Architecture:** Modify `docs/Trigonometric-Functions.md` in place. Insert a new eleventh `tikz` fenced block immediately after the opening sentence of `6.6` and before the bullet list, then place one short caption below it. Keep the existing four bullets untouched so the new figure serves as a concrete visual anchor for the first two items without expanding the subsection into a full control or navigation treatment.

**Tech Stack:** Markdown, TikZ fenced code block, PowerShell, `rg`, `tectonic`

---

### Task 1: Confirm the approved insertion anchors and baseline state

**Files:**
- Reference: `docs/superpowers/specs/2026-07-06-trigonometric-direction-vector-figure-design.md`
- Modify: `docs/Trigonometric-Functions.md`

- [ ] **Step 1: Re-read the approved direction-vector figure spec**

Run: `Get-Content -Raw -Encoding UTF8 'docs\superpowers\specs\2026-07-06-trigonometric-direction-vector-figure-design.md'`
Expected: The spec requires one single-pose robot/vehicle figure in `6.6`, with position `p=(x,y)`, heading angle `\theta`, direction vector `(\cos\theta,\sin\theta)`, and a short caption about converting angle to vector before engineering use.

- [ ] **Step 2: Read the current `6.6` excerpt to anchor the edit**

Run: `rg -n -C 8 "^### 6\.6|^## 7\.|方向通常不是孤立存在|把朝向角轉成方向向量" 'docs\Trigonometric-Functions.md'`
Expected: The output shows the opening sentence of `6.6`, followed immediately by the four bullet points, and then the transition to `## 7. 小結與常用公式速查表`.

- [ ] **Step 3: Verify the document currently contains exactly ten `tikz` blocks**

Run: `(Select-String -Path 'docs\Trigonometric-Functions.md' -Pattern '```tikz {showConsole=false}' -SimpleMatch | Measure-Object).Count`
Expected: `10`

### Task 2: Insert the direction-vector application figure into section 6.6

**Files:**
- Reference: `docs/superpowers/specs/2026-07-06-trigonometric-direction-vector-figure-design.md`
- Modify: `docs/Trigonometric-Functions.md`

- [ ] **Step 1: Insert the new figure block directly below the opening sentence of `6.6` and above the bullet list**

```markdown
```tikz {showConsole=false}
\begin{tikzpicture}[scale=2.1]
  \draw[->, thick] (-0.15,0) -- (1.55,0) node[right] {$x$};
  \draw[->, thick] (0,-0.15) -- (0,1.28) node[above] {$y$};

  \coordinate (P) at (0.52,0.38);
  \coordinate (H) at ({0.52+0.66*cos(35)},{0.38+0.66*sin(35)});

  \begin{scope}[shift={(0.52,0.38)}, rotate=35]
    \fill[gray!35] (0.11,0) -- (-0.08,0.06) -- (-0.04,0) -- (-0.08,-0.06) -- cycle;
    \draw[gray!70] (0.11,0) -- (-0.08,0.06) -- (-0.04,0) -- (-0.08,-0.06) -- cycle;
  \end{scope}

  \fill (P) circle (0.02) node[below left] {$p=(x,y)$};
  \draw[->, very thick, blue] (P) -- (H);
  \node[blue, above right] at (1.02,0.86) {$(\cos\theta,\sin\theta)$};

  \draw[dashed, gray] (P) -- (0.76,0.38);
  \draw[->, purple, thick] (0.70,0.38) arc[start angle=0,end angle=35,radius=0.18];
  \node[purple] at ({0.52+0.29*cos(17)},{0.38+0.29*sin(17)}) {$\theta$};
\end{tikzpicture}
```
```

- [ ] **Step 2: Verify the new figure block and its key labels were added**

Run: `Select-String -Path 'docs\Trigonometric-Functions.md' -Pattern 'p=(x,y)','(\cos\theta,\sin\theta)','\theta','```tikz {showConsole=false}' -SimpleMatch`
Expected: The output shows the new `6.6` figure and the required position, direction-vector, and angle labels.

- [ ] **Step 3: Read the surrounding excerpt to confirm the figure sits in the intended spot**

Run: `$lines = Get-Content -Encoding UTF8 'docs\Trigonometric-Functions.md'; $lines[1268..1282]`
Expected: The opening sentence of `6.6` appears first, then the new `tikz` block, then the caption area, and only afterward do the four original bullet points appear.

### Task 3: Add the caption and verify the section flow

**Files:**
- Modify: `docs/Trigonometric-Functions.md`

- [ ] **Step 1: Add the short caption immediately below the new figure**

```markdown
在機器人與圖學中，朝向角 $\theta$ 常先轉成方向向量 $(\cos\theta,\sin\theta)$，再用來描述前進方向、控制更新或局部座標軸的朝向。
```

- [ ] **Step 2: Verify the caption appears inside section `6.6` and the existing bullet list still follows**

Run: `Select-String -Path 'docs\Trigonometric-Functions.md' -Pattern '在機器人與圖學中，朝向角 $\theta$ 常先轉成方向向量 $(\cos\theta,\sin\theta)$','把朝向角轉成方向向量；','把局部座標系轉換到全域座標系；' -SimpleMatch`
Expected: The caption appears above the bullet list, and the original first two bullets remain present afterward.

- [ ] **Step 3: Verify the section `6.6` excerpt still flows cleanly into section `7`**

Run: `$lines = Get-Content -Encoding UTF8 'docs\Trigonometric-Functions.md'; $lines[1267..1288]`
Expected: Section `6.6` contains the opening sentence, then the new figure, then the caption, then the original bullet list, and finally transitions normally to `## 7. 小結與常用公式速查表`.

### Task 4: Run static verification and TeX-engine verification

**Files:**
- Modify: `docs/Trigonometric-Functions.md`

- [ ] **Step 1: Verify the document now contains exactly eleven `tikz` blocks**

Run: `(Select-String -Path 'docs\Trigonometric-Functions.md' -Pattern '```tikz {showConsole=false}' -SimpleMatch | Measure-Object).Count`
Expected: `11`

- [ ] **Step 2: Check that no TikZ `calc`-library coordinate syntax was introduced**

Run: `Select-String -Path 'docs\Trigonometric-Functions.md' -Pattern '$(0,0)!','!0.',')+(0,' -SimpleMatch`
Expected: No matches, so the new figure does not depend on `calc` syntax that previously triggered TeX-engine render failures.

- [ ] **Step 3: Compile the new figure as a minimal standalone TeX file with `tectonic`**

Run:

```powershell
$dir = Join-Path $env:TEMP 'trig-direction-vector-figure-check'
New-Item -ItemType Directory -Force -Path $dir | Out-Null
$tex = @'
\documentclass{article}
\usepackage{tikz}
\pagestyle{empty}
\begin{document}
\begin{tikzpicture}[scale=2.1]
  \draw[->, thick] (-0.15,0) -- (1.55,0) node[right] {$x$};
  \draw[->, thick] (0,-0.15) -- (0,1.28) node[above] {$y$};

  \coordinate (P) at (0.52,0.38);
  \coordinate (H) at ({0.52+0.66*cos(35)},{0.38+0.66*sin(35)});

  \begin{scope}[shift={(0.52,0.38)}, rotate=35]
    \fill[gray!35] (0.11,0) -- (-0.08,0.06) -- (-0.04,0) -- (-0.08,-0.06) -- cycle;
    \draw[gray!70] (0.11,0) -- (-0.08,0.06) -- (-0.04,0) -- (-0.08,-0.06) -- cycle;
  \end{scope}

  \fill (P) circle (0.02) node[below left] {$p=(x,y)$};
  \draw[->, very thick, blue] (P) -- (H);
  \node[blue, above right] at (1.02,0.86) {$(\cos\theta,\sin\theta)$};

  \draw[dashed, gray] (P) -- (0.76,0.38);
  \draw[->, purple, thick] (0.70,0.38) arc[start angle=0,end angle=35,radius=0.18];
  \node[purple] at ({0.52+0.29*cos(17)},{0.38+0.29*sin(17)}) {$\theta$};
\end{tikzpicture}
\end{document}
'@
$path = Join-Path $dir 'direction-vector-figure-check.tex'
Set-Content -Encoding UTF8 -Path $path -Value $tex
tectonic --outdir $dir $path
```

Expected: `tectonic` exits successfully and writes `direction-vector-figure-check.pdf`. If the first sandboxed run fails with network/font fetch errors, rerun the same compile unsandboxed; success is still the required end state.

- [ ] **Step 4: Verify major section headings remain intact**

Run: `rg -n "^## |^### " 'docs\Trigonometric-Functions.md'`
Expected: All existing major sections and subsections remain present, including `### 6.6 圖學與機器人中的方向表示` and `## 7. 小結與常用公式速查表`.

- [ ] **Step 5: Verify the key figure and caption strings survived insertion**

Run: `Select-String -Path 'docs\Trigonometric-Functions.md' -Pattern 'p=(x,y)','(\cos\theta,\sin\theta)','在機器人與圖學中，朝向角 $\theta$ 常先轉成方向向量 $(\cos\theta,\sin\theta)$' -SimpleMatch`
Expected: The figure labels and the `6.6` caption are all present in the saved document.

- [ ] **Step 6: Record the Git limitation instead of inventing a commit**

Run: `git rev-parse --show-toplevel`
Expected: If it fails with `not a git repository`, report that the document change was verified locally but not committed.
