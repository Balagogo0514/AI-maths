# Trigonometric AI Unit Circle Encoding Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add one shared unit-circle `tikz` figure in section `6.1` plus a short `6.4` back-reference so the AI-applications chapter explains periodic time encoding and angle encoding with the same geometry.

**Architecture:** Modify `docs/Trigonometric-Functions.md` in place. Insert a new eighth `tikz` fenced block immediately after the sentence about `t=23` and `t=0`, add a short caption below it, then append one short sentence to the end of section `6.4` so that the single figure serves both subsections without duplicating visuals.

**Tech Stack:** Markdown, TikZ fenced code block, PowerShell, `rg`, `tectonic`

---

### Task 1: Confirm the approved insertion anchors and baseline state

**Files:**
- Reference: `docs/superpowers/specs/2026-07-05-trigonometric-ai-unit-circle-encoding-design.md`
- Modify: `docs/Trigonometric-Functions.md`

- [ ] **Step 1: Re-read the approved AI unit-circle encoding spec**

Run: `Get-Content -Raw -Encoding UTF8 'docs\superpowers\specs\2026-07-05-trigonometric-ai-unit-circle-encoding-design.md'`
Expected: The spec requires one shared unit-circle figure for `6.1` and `6.4`, with blue `t=0`/`t=23` labels, red `1^\circ`/`359^\circ` labels, short arc annotations, a caption, and a single back-reference sentence in `6.4`.

- [ ] **Step 2: Read the current `6.1` and `6.4` excerpt to anchor the edit**

Run: `rg -n -C 8 "t=23.*t=0|### 6\.1|### 6\.4|實作時用 \$\(\sin\\theta,\cos\\theta\)\$ 或 \$\(\cos\\theta,\sin\\theta\)\$ 都可以" 'docs\Trigonometric-Functions.md'`
Expected: The output shows the `6.1` sentence `此時 $t=23$ 和 $t=0$ 在平面上會落在彼此接近的位置，而不會像直接使用數值時相差 23。` and the `6.4` paragraph ending with `這對方向估計、姿態預測、循環時間表示都非常實用。`

- [ ] **Step 3: Verify the document currently contains exactly seven `tikz` blocks**

Run: `(Select-String -Path 'docs\Trigonometric-Functions.md' -Pattern '```tikz {showConsole=false}' -SimpleMatch | Measure-Object).Count`
Expected: `7`

### Task 2: Insert the shared AI-encoding unit-circle figure into section 6.1

**Files:**
- Reference: `docs/superpowers/specs/2026-07-05-trigonometric-ai-unit-circle-encoding-design.md`
- Modify: `docs/Trigonometric-Functions.md`

- [ ] **Step 1: Insert the new figure block directly below the sentence about `t=23` and `t=0`**

```markdown
```tikz {showConsole=false}
\begin{tikzpicture}[scale=2.1]
  \draw[->, thick] (-1.25,0) -- (1.35,0) node[right] {$x$};
  \draw[->, thick] (0,-1.25) -- (0,1.25) node[above] {$y$};
  \draw[thick] (0,0) circle (1);

  \coordinate (O) at (0,0);
  \coordinate (Tzero) at (90:1);
  \coordinate (Ttwentythree) at (105:1);
  \coordinate (Aone) at (1:1);
  \coordinate (Athreefivenine) at (-1:1);

  \draw[very thick, blue] (O) -- (Tzero);
  \draw[very thick, blue] (O) -- (Ttwentythree);
  \draw[very thick, red] (O) -- (Aone);
  \draw[very thick, red] (O) -- (Athreefivenine);

  \fill (O) circle (0.02) node[below left] {$O$};
  \fill[blue] (Tzero) circle (0.02) node[above] {$t=0$};
  \fill[blue] (Ttwentythree) circle (0.02) node[above left] {$t=23$};
  \fill[red] (Aone) circle (0.02) node[above right] {$1^\circ$};
  \fill[red] (Athreefivenine) circle (0.02) node[below right] {$359^\circ$};

  \draw[->, blue, thick] (104:0.74) arc[start angle=104,end angle=91,radius=0.74];
  \draw[->, red, thick] (-1:0.82) arc[start angle=-1,end angle=1,radius=0.82];

  \node[blue, scale=0.72] at (0.00,0.58) {$1$ hour apart};
  \node[blue, scale=0.68] at (-1.34,0.84) {$\phi(t)=\left(\sin\frac{2\pi t}{24},\cos\frac{2\pi t}{24}\right)$};
  \node[blue, align=left, scale=0.68] at (-1.42,0.48) {numeric gap: $23$ vs $0$\\ cyclic neighbors};

  \node[red, scale=0.72] at (0.68,0.12) {$2^\circ$ apart};
  \node[red, scale=0.70] at (1.30,-0.56) {$(\cos\theta,\sin\theta)$};
  \node[red, align=left, scale=0.68] at (1.33,-0.92) {numeric gap: $359^\circ$ vs $1^\circ$\\ directional neighbors};

  \node[align=left, scale=0.66] at (-1.34,-0.58) {$(\sin,\cos)$ order\\ puts $t=0$ at the top};
  \node[align=left, scale=0.66] at (1.30,0.78) {$(\cos,\sin)$ order\\ puts $0^\circ$ at the right};
\end{tikzpicture}
```
```

- [ ] **Step 2: Verify the new figure block and its key labels were added**

Run: `Select-String -Path 'docs\Trigonometric-Functions.md' -Pattern 't=23','t=0','1^\circ','359^\circ','1$ hour apart','2^\circ$ apart','puts $t=0$ at the top','puts $0^\circ$ at the right','```tikz {showConsole=false}' -SimpleMatch`
Expected: The output shows the new AI-encoding figure and all key labels for both the blue and red cases.

- [ ] **Step 3: Read the surrounding excerpt to confirm the figure sits in the intended spot**

Run: `$lines = Get-Content -Encoding UTF8 'docs\Trigonometric-Functions.md'; $lines[1054..1100]`
Expected: The `\phi(t)` formula appears first, then the sentence about `t=23` and `t=0`, then the new `tikz` block inside `6.1`, and only afterward does the document continue to `### 6.2 Fourier features 與頻率表示`.

### Task 3: Add the caption and the single 6.4 back-reference sentence

**Files:**
- Modify: `docs/Trigonometric-Functions.md`

- [ ] **Step 1: Add the short caption immediately below the new figure**

```markdown
把週期時間或方向角改寫成正弦餘弦對，會把原本有邊界斷裂的一維數值，轉成單位圓上的二維連續表示，因此週期起點與終點、接近的方向角，都會在幾何上保持接近。
```

- [ ] **Step 2: Append the `6.4` back-reference sentence to the end of the existing paragraph**

```markdown
這和 `6.1` 的時間週期編碼是同一個想法：都是把環狀變數嵌入單位圓，只是實作時可能採用不同的座標排列慣例。
```

- [ ] **Step 3: Verify both text additions appear in the correct sections**

Run: `Select-String -Path 'docs\Trigonometric-Functions.md' -Pattern '把週期時間或方向角改寫成正弦餘弦對','這和 `6.1` 的時間週期編碼是同一個想法：都是把環狀變數嵌入單位圓，只是實作時可能採用不同的座標排列慣例。' -SimpleMatch`
Expected: The caption appears below the new `6.1` figure and the back-reference sentence appears at the end of section `6.4`.

- [ ] **Step 4: Verify section `6.4` still contains only one figure-free paragraph after the displayed vector**

Run: `$lines = Get-Content -Encoding UTF8 'docs\Trigonometric-Functions.md'; $lines[1099..1118]`
Expected: Section `6.4` still has no inserted `tikz` block, and the new back-reference sentence is appended to the existing explanatory paragraph.

### Task 4: Run static verification and TeX-engine verification

**Files:**
- Modify: `docs/Trigonometric-Functions.md`

- [ ] **Step 1: Verify the document now contains exactly eight `tikz` blocks**

Run: `(Select-String -Path 'docs\Trigonometric-Functions.md' -Pattern '```tikz {showConsole=false}' -SimpleMatch | Measure-Object).Count`
Expected: `8`

- [ ] **Step 2: Check that no TikZ `calc`-library coordinate syntax was introduced**

Run: `Select-String -Path 'docs\Trigonometric-Functions.md' -Pattern '$(0,0)!','!0.',')+(0,' -SimpleMatch`
Expected: No matches, so the new figure does not depend on `calc` syntax that previously triggered TeX-engine render failures.

- [ ] **Step 3: Compile the new figure as a minimal standalone TeX file with `tectonic`**

Run:

```powershell
$dir = Join-Path $env:TEMP 'trig-ai-unit-circle-encoding-check'
New-Item -ItemType Directory -Force -Path $dir | Out-Null
$tex = @'
\documentclass{article}
\usepackage{tikz}
\pagestyle{empty}
\begin{document}
\begin{tikzpicture}[scale=2.1]
  \draw[->, thick] (-1.25,0) -- (1.35,0) node[right] {$x$};
  \draw[->, thick] (0,-1.25) -- (0,1.25) node[above] {$y$};
  \draw[thick] (0,0) circle (1);

  \coordinate (O) at (0,0);
  \coordinate (Tzero) at (90:1);
  \coordinate (Ttwentythree) at (105:1);
  \coordinate (Aone) at (1:1);
  \coordinate (Athreefivenine) at (-1:1);

  \draw[very thick, blue] (O) -- (Tzero);
  \draw[very thick, blue] (O) -- (Ttwentythree);
  \draw[very thick, red] (O) -- (Aone);
  \draw[very thick, red] (O) -- (Athreefivenine);

  \fill (O) circle (0.02) node[below left] {$O$};
  \fill[blue] (Tzero) circle (0.02) node[above] {$t=0$};
  \fill[blue] (Ttwentythree) circle (0.02) node[above left] {$t=23$};
  \fill[red] (Aone) circle (0.02) node[above right] {$1^\circ$};
  \fill[red] (Athreefivenine) circle (0.02) node[below right] {$359^\circ$};

  \draw[->, blue, thick] (104:0.74) arc[start angle=104,end angle=91,radius=0.74];
  \draw[->, red, thick] (-1:0.82) arc[start angle=-1,end angle=1,radius=0.82];

  \node[blue, scale=0.72] at (0.00,0.58) {$1$ hour apart};
  \node[blue, scale=0.68] at (-1.34,0.84) {$\phi(t)=\left(\sin\frac{2\pi t}{24},\cos\frac{2\pi t}{24}\right)$};
  \node[blue, align=left, scale=0.68] at (-1.42,0.48) {numeric gap: $23$ vs $0$\\ cyclic neighbors};

  \node[red, scale=0.72] at (0.68,0.12) {$2^\circ$ apart};
  \node[red, scale=0.70] at (1.30,-0.56) {$(\cos\theta,\sin\theta)$};
  \node[red, align=left, scale=0.68] at (1.33,-0.92) {numeric gap: $359^\circ$ vs $1^\circ$\\ directional neighbors};

  \node[align=left, scale=0.66] at (-1.34,-0.58) {$(\sin,\cos)$ order\\ puts $t=0$ at the top};
  \node[align=left, scale=0.66] at (1.30,0.78) {$(\cos,\sin)$ order\\ puts $0^\circ$ at the right};
\end{tikzpicture}
\end{document}
'@
$path = Join-Path $dir 'ai-unit-circle-encoding-check.tex'
Set-Content -Encoding UTF8 -Path $path -Value $tex
tectonic --outdir $dir $path
```

Expected: `tectonic` exits successfully and writes `ai-unit-circle-encoding-check.pdf`. If the first sandboxed run fails with network/font fetch errors, rerun the same compile unsandboxed; success is still the required end state.

- [ ] **Step 4: Verify major section headings remain intact**

Run: `rg -n "^## |^### " 'docs\Trigonometric-Functions.md'`
Expected: All existing major sections and subsections remain present, including `### 6.1 週期特徵編碼`, `### 6.4 為什麼常用 $(\cos\theta,\sin\theta)$ 或 $(\sin\theta,\cos\theta)$ 取代直接用角度？`, and `### 6.5 2D 旋轉矩陣與座標變換`.

- [ ] **Step 5: Verify the key figure and back-reference strings survived insertion**

Run: `Select-String -Path 'docs\Trigonometric-Functions.md' -Pattern 't=23','1 hour apart','359^\circ','2^\circ$ apart','把週期時間或方向角改寫成正弦餘弦對','這和 `6.1` 的時間週期編碼是同一個想法' -SimpleMatch`
Expected: The figure labels, caption, and the `6.4` back-reference sentence are all present in the saved document.

- [ ] **Step 6: Record the Git limitation instead of inventing a commit**

Run: `git rev-parse --show-toplevel`
Expected: If it fails with `not a git repository`, report that the document change was verified locally but not committed.
