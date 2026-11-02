# Trigonometric Radian-Limit Figure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add one inline `tikz` geometry figure and a short caption to illustrate both radian-as-arc-length intuition and the squeeze inequality behind `\lim_{h\to 0}\frac{\sin h}{h}=1` inside `docs/Trigonometric-Functions.md`.

**Architecture:** Modify the existing trigonometric-functions note in place. Insert a sixth `tikz` fenced block inside section `### 5.2 兩個基本極限與弧度制`, specifically after the two displayed limits and before the paragraph beginning `第一個極限若用幾何夾擠可以證明`, then add a short caption tying the upper panel to radian measure and the lower panel to `\sin h < h < \tan h`.

**Tech Stack:** Markdown, TikZ fenced code block, PowerShell, `rg`, `tectonic`

---

### Task 1: Confirm the approved insertion point and baseline state

**Files:**
- Reference: `docs/superpowers/specs/2026-07-05-trigonometric-radian-limit-figure-design.md`
- Modify: `docs/Trigonometric-Functions.md`

- [ ] **Step 1: Re-read the approved radian-limit-figure spec**

Run: `Get-Content -Raw -Encoding UTF8 'docs\superpowers\specs\2026-07-05-trigonometric-radian-limit-figure-design.md'`
Expected: The spec requires one two-panel unit-circle figure, with an upper radian/arc-length panel, a lower squeeze-inequality panel, one short caption, and no extra figure for `\lim_{h\to 0}\frac{\cos h-1}{h}=0`.

- [ ] **Step 2: Read the current `5.2` excerpt to anchor the insertion**

Run: `rg -n -C 10 "### 5\.2 兩個基本極限與弧度制|### 5\.3" 'docs\Trigonometric-Functions.md'`
Expected: The excerpt shows the two displayed limits `\lim_{h\to 0}\frac{\sin h}{h}=1` and `\lim_{h\to 0}\frac{\cos h-1}{h}=0`, followed immediately by the paragraph `第一個極限若用幾何夾擠可以證明`.

- [ ] **Step 3: Verify the document currently contains exactly five `tikz` blocks**

Run: `(Select-String -Path 'docs\Trigonometric-Functions.md' -Pattern '```tikz {showConsole=false}' -SimpleMatch | Measure-Object).Count`
Expected: `5`

### Task 2: Insert the two-panel radian-and-limit figure into section 5.2

**Files:**
- Reference: `docs/superpowers/specs/2026-07-05-trigonometric-radian-limit-figure-design.md`
- Modify: `docs/Trigonometric-Functions.md`

- [ ] **Step 1: Insert the new `tikz` block below the displayed limit `\lim_{h\to 0}\frac{\cos h-1}{h}=0.` and before the paragraph `第一個極限若用幾何夾擠可以證明`**

```markdown
```tikz {showConsole=false}
\begin{tikzpicture}[scale=1.8]
  \begin{scope}[shift={(0,2.0)}]
    \draw[->, thick] (-1.15,0) -- (1.35,0);
    \draw[->, thick] (0,-1.05) -- (0,1.2);
    \draw[thick] (0,0) circle (1);

    \coordinate (A) at (0:1);
    \coordinate (B) at (35:1);

    \draw[very thick, blue] (0,0) -- (A);
    \draw[very thick, blue] (0,0) -- (B);
    \draw[very thick, orange] (A) arc[start angle=0,end angle=35,radius=1];

    \fill (0,0) circle (0.02) node[below left] {$O$};
    \fill (A) circle (0.02);
    \fill (B) circle (0.02);

    \draw[->, blue, thick] (0.24,0) arc[start angle=0,end angle=35,radius=0.24];
    \node[blue] at (0.30,0.10) {$h$};
    \node[orange] at (17:1.16) {$h$};
    \node at (0.55,0.83) {$1$};
    \node[align=left, scale=0.75] at (1.43,0.35) {$r=1$\\ $s=h$};
  \end{scope}

  \begin{scope}[shift={(0,-0.2)}]
    \draw[->, thick] (-1.15,0) -- (1.55,0) node[right] {$x$};
    \draw[->, thick] (0,-0.15) -- (0,1.15) node[above] {$y$};
    \draw[thick] (0,0) circle (1);
    \draw[thick, orange] (1,-0.08) -- (1,0.82);

    \coordinate (P) at (35:1);
    \coordinate (Px) at ({cos(35)},0);
    \coordinate (T) at (1,{tan(35)});

    \draw[very thick, blue] (0,0) -- (P);
    \draw[very thick, red] (0,0) -- (T);
    \draw[dashed] (P) -- (Px);

    \fill (0,0) circle (0.02) node[below left] {$O$};
    \fill (P) circle (0.02);
    \fill (T) circle (0.02);

    \draw[->, blue, thick] (0.24,0) arc[start angle=0,end angle=35,radius=0.24];
    \node[blue] at (0.30,0.10) {$h$};
    \node at (17:1.12) {$h$};

    \draw[<->, teal, thick] (Px) -- (P);
    \node[teal, right] at (0.82,0.30) {$\sin h$};

    \draw[<->, red, thick] (1,0) -- (T);
    \node[red, right] at (1,0.34) {$\tan h$};

    \node[align=left, scale=0.75] at (1.52,0.72) {$\sin h < h < \tan h$\\ $1<\frac{h}{\sin h}<\frac{1}{\cos h}$};
  \end{scope}
\end{tikzpicture}
```
```

- [ ] **Step 2: Verify the new figure block and its key labels were added**

Run: `Select-String -Path 'docs\Trigonometric-Functions.md' -Pattern 'r=1','s=h','\sin h < h < \tan h','\tan h','```tikz {showConsole=false}' -SimpleMatch`
Expected: The output shows the new two-panel figure, the upper `r=1` / `s=h` panel text, and the lower squeeze-inequality labels.

- [ ] **Step 3: Read the surrounding excerpt to confirm the figure sits in the intended spot**

Run: `$lines = Get-Content -Encoding UTF8 'docs\Trigonometric-Functions.md'; $lines[704..754]`
Expected: The two displayed limits appear first, then the new `tikz` block, then the paragraph beginning `第一個極限若用幾何夾擠可以證明`.

### Task 3: Add the caption and verify renderer-safe structure

**Files:**
- Modify: `docs/Trigonometric-Functions.md`

- [ ] **Step 1: Add the short caption immediately below the new figure**

```markdown
在這張圖中，上半板表示在單位圓裡若角度用弧度表示，角 $h$ 對應的弧長就是 $h$ 本身；下半板則呈現 $\sin h<h<\tan h$ 的幾何夾擠，因此可進一步推出 $1<\frac{h}{\sin h}<\frac{1}{\cos h}$，在 $h\to 0$ 時夾出 $\frac{\sin h}{h}\to 1$。
```

- [ ] **Step 2: Verify the figure and caption both appear inside section `5.2`**

Run: `Select-String -Path 'docs\Trigonometric-Functions.md' -Pattern '### 5.2 兩個基本極限與弧度制','在這張圖中，上半板表示在單位圓裡若角度用弧度表示','第一個極限若用幾何夾擠可以證明' -SimpleMatch`
Expected: The heading appears first, the new caption appears inside section `5.2`, and the paragraph `第一個極限若用幾何夾擠可以證明` still follows afterward.

- [ ] **Step 3: Verify the document now contains exactly six `tikz` blocks**

Run: `(Select-String -Path 'docs\Trigonometric-Functions.md' -Pattern '```tikz {showConsole=false}' -SimpleMatch | Measure-Object).Count`
Expected: `6`

- [ ] **Step 4: Check that no `calc`-library coordinate syntax was introduced**

Run: `Select-String -Path 'docs\Trigonometric-Functions.md' -Pattern '$(0,0)!','!0.',')+(0,' -SimpleMatch`
Expected: No matches, so the new figure does not depend on the TikZ `calc` syntax that previously triggered TeX-engine render failures.

### Task 4: Run TeX-engine and structure verification

**Files:**
- Modify: `docs/Trigonometric-Functions.md`

- [ ] **Step 1: Compile the new figure as a minimal standalone TeX file with `tectonic`**

Run:

```powershell
$dir = Join-Path $env:TEMP 'trig-radian-limit-figure-check'
New-Item -ItemType Directory -Force -Path $dir | Out-Null
$tex = @'
\documentclass{article}
\usepackage{tikz}
\pagestyle{empty}
\begin{document}
\begin{tikzpicture}[scale=1.8]
  \begin{scope}[shift={(0,2.0)}]
    \draw[->, thick] (-1.15,0) -- (1.35,0);
    \draw[->, thick] (0,-1.05) -- (0,1.2);
    \draw[thick] (0,0) circle (1);

    \coordinate (A) at (0:1);
    \coordinate (B) at (35:1);

    \draw[very thick, blue] (0,0) -- (A);
    \draw[very thick, blue] (0,0) -- (B);
    \draw[very thick, orange] (A) arc[start angle=0,end angle=35,radius=1];

    \fill (0,0) circle (0.02) node[below left] {$O$};
    \fill (A) circle (0.02);
    \fill (B) circle (0.02);

    \draw[->, blue, thick] (0.24,0) arc[start angle=0,end angle=35,radius=0.24];
    \node[blue] at (0.30,0.10) {$h$};
    \node[orange] at (17:1.16) {$h$};
    \node at (0.55,0.83) {$1$};
    \node[align=left, scale=0.75] at (1.43,0.35) {$r=1$\\ $s=h$};
  \end{scope}

  \begin{scope}[shift={(0,-0.2)}]
    \draw[->, thick] (-1.15,0) -- (1.55,0) node[right] {$x$};
    \draw[->, thick] (0,-0.15) -- (0,1.15) node[above] {$y$};
    \draw[thick] (0,0) circle (1);
    \draw[thick, orange] (1,-0.08) -- (1,0.82);

    \coordinate (P) at (35:1);
    \coordinate (Px) at ({cos(35)},0);
    \coordinate (T) at (1,{tan(35)});

    \draw[very thick, blue] (0,0) -- (P);
    \draw[very thick, red] (0,0) -- (T);
    \draw[dashed] (P) -- (Px);

    \fill (0,0) circle (0.02) node[below left] {$O$};
    \fill (P) circle (0.02);
    \fill (T) circle (0.02);

    \draw[->, blue, thick] (0.24,0) arc[start angle=0,end angle=35,radius=0.24];
    \node[blue] at (0.30,0.10) {$h$};
    \node at (17:1.12) {$h$};

    \draw[<->, teal, thick] (Px) -- (P);
    \node[teal, right] at (0.82,0.30) {$\sin h$};

    \draw[<->, red, thick] (1,0) -- (T);
    \node[red, right] at (1,0.34) {$\tan h$};

    \node[align=left, scale=0.75] at (1.52,0.72) {$\sin h < h < \tan h$\\ $1<\frac{h}{\sin h}<\frac{1}{\cos h}$};
  \end{scope}
\end{tikzpicture}
\end{document}
'@
$path = Join-Path $dir 'radian-limit-check.tex'
Set-Content -Encoding UTF8 -Path $path -Value $tex
tectonic --outdir $dir $path
```

Expected: `tectonic` exits successfully and writes `radian-limit-check.pdf`. If the first sandboxed run fails with network/font fetch errors, rerun the same compile unsandboxed; success is still the required end state.

- [ ] **Step 2: Verify major section headings remain intact**

Run: `rg -n "^## |^### " 'docs\Trigonometric-Functions.md'`
Expected: All existing major sections and subsections remain present, including `### 5.2 兩個基本極限與弧度制`, `### 5.3 $\sin x,\cos x,\tan x$ 的導數`, and `## 6. AI 與工程中的應用`.

- [ ] **Step 3: Verify the limit formulas still appear after insertion**

Run: `Select-String -Path 'docs\Trigonometric-Functions.md' -Pattern '\lim_{h\to 0}\frac{\sin h}{h}=1,','\lim_{h\to 0}\frac{\cos h-1}{h}=0.','\sin h < h < \tan h' -SimpleMatch`
Expected: Both limit formulas remain present, and the new inequality label appears in the inserted figure block.

- [ ] **Step 4: Record the Git limitation instead of inventing a commit**

Run: `git rev-parse --show-toplevel`
Expected: If it fails with `not a git repository`, report that the document change was verified locally but not committed.
