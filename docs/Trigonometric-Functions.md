# 三角函數介紹與作用

三角函數起源於三角形邊長與角度的關係，但它真正的重要性來自更一般的結構：週期、旋轉、波動、方向與座標變換。只要問題中出現「重複循環」或「沿圓周改變」，三角函數通常就會出現。

本文面向大學程度讀者，依序介紹三角函數的定義、基本性質、常用公式與證明、反三角函數與微積分關係，最後說明它們在 AI 與工程中的實際應用。

## 1. 為什麼需要三角函數？

最早的三角函數來自測量。若已知一個角與一條邊，就能利用邊比求出其他邊長；這對天文、航海、測地都很重要。不過，三角函數的用途遠不只解三角形。

從更高的角度看，三角函數有三個核心作用：

1. 把角度轉成數值關係，例如邊比、座標與斜率。
2. 描述週期現象，例如聲波、震動、季節性與時間訊號。
3. 描述旋轉與方向，例如平面旋轉、機器人朝向與圖學中的座標變換。

因此，三角函數同時是幾何工具、分析工具，也是工程與 AI 中常見的表示工具。

## 2. 三角函數的基本定義

### 2.1 直角三角形中的定義

在直角三角形中，對一個銳角 $\theta$，定義

$$
\sin\theta=\frac{\text{對邊}}{\text{斜邊}},\qquad
\cos\theta=\frac{\text{鄰邊}}{\text{斜邊}},\qquad
\tan\theta=\frac{\text{對邊}}{\text{鄰邊}}.
$$

這些比值只依賴角度，不依賴三角形的整體大小，原因是具有相同角度的直角三角形彼此相似，因此對應邊長比相同。

其餘三個常見函數定義為

$$
\cot\theta=\frac{1}{\tan\theta}=\frac{\text{鄰邊}}{\text{對邊}},\qquad
\sec\theta=\frac{1}{\cos\theta}=\frac{\text{斜邊}}{\text{鄰邊}},\qquad
\csc\theta=\frac{1}{\sin\theta}=\frac{\text{斜邊}}{\text{對邊}}.
$$

這套定義直觀，但只適用於 $0<\theta<\pi/2$ 的銳角。若要處理鈍角、負角、超過 $360^\circ$ 的角，就需要更一般的定義。

### 2.2 單位圓中的定義

在平面上考慮單位圓

$$
x^2+y^2=1.
$$

從原點出發，逆時針轉過角度 $\theta$，其終點落在單位圓上的點 $P=(x,y)$。定義

$$
\cos\theta=x,\qquad \sin\theta=y.
$$

若 $\cos\theta\neq 0$，則定義

$$
\tan\theta=\frac{\sin\theta}{\cos\theta}=\frac{y}{x}.
$$

同理，

$$
\cot\theta=\frac{\cos\theta}{\sin\theta},\qquad
\sec\theta=\frac{1}{\cos\theta},\qquad
\csc\theta=\frac{1}{\sin\theta}.
$$

```tikz {showConsole=false}
\begin{tikzpicture}[scale=2]
  \draw[->, thick] (-0.2,0) -- (1.35,0) node[right] {$x$};
  \draw[->, thick] (0,-0.2) -- (0,1.25) node[above] {$y$};

  \draw[thick] (0,0) circle (1);
  \draw[dashed] (0,0) -- (1,0);

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

在這張圖中，點 $P$ 的水平座標是 $\cos\theta$，垂直座標是 $\sin\theta$。因此，三角函數不只是邊長比，也可以理解為單位圓上的座標函數。

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

在這張圖中，從原點出發的射線斜率是 $\tan\theta$，所以它可寫成 $y=(\tan\theta)x$。當這條射線與切線 $x=1$ 相交時，高度就等於 $\tan\theta$，這就是正切的幾何意義。

這一定義比直角三角形更根本，因為：

- 它適用於所有實數角度。
- 它自然表現正負號、週期性與對稱性。
- 它直接把三角函數和座標幾何連在一起。

### 2.3 角度與弧度

一個完整圓周等於 $360^\circ$，也等於 $2\pi$ 弧度，因此

$$
180^\circ=\pi,\qquad 90^\circ=\frac{\pi}{2},\qquad 1^\circ=\frac{\pi}{180}.
$$

弧度的幾何意義很自然：在半徑為 $1$ 的圓上，角度 $\theta$ 對應的弧長就是 $\theta$ 本身。這個性質使弧度制在微積分中特別重要，因為

$$
\lim_{h\to 0}\frac{\sin h}{h}=1
$$

只有在 $h$ 用弧度表示時才成立。

## 3. 基本性質與圖形直觀

### 3.1 定義域與值域

由單位圓定義可知：

- $\sin x$ 與 $\cos x$ 對所有 $x\in\mathbb{R}$ 都有定義。
- $\tan x$ 在 $\cos x=0$ 時無定義，即
  $$
  x\neq \frac{\pi}{2}+k\pi,\qquad k\in\mathbb{Z}.
  $$
- $\cot x$ 在 $\sin x=0$ 時無定義，即
  $$
  x\neq k\pi,\qquad k\in\mathbb{Z}.
  $$

又因為單位圓上座標滿足 $-1\le x,y\le 1$，所以

$$
-1\le \sin x\le 1,\qquad -1\le \cos x\le 1.
$$

而 $\tan x,\cot x$ 的值域是整個實數集合。

### 3.2 奇偶性與對稱性

由單位圓的對稱性可得：

$$
\sin(-x)=-\sin x,\qquad \cos(-x)=\cos x.
$$

因此，$\sin x$ 是奇函數，$\cos x$ 是偶函數。再由 $\tan x=\sin x/\cos x$ 可得

$$
\tan(-x)=-\tan x,
$$

所以 $\tan x$ 也是奇函數。

這些性質反映的是幾何上的鏡射對稱：角度取負值，相當於把點對 $x$ 軸反射。

### 3.3 週期性

轉過一整圈後，單位圓上的點回到原位，因此

$$
\sin(x+2\pi)=\sin x,\qquad \cos(x+2\pi)=\cos x.
$$

這表示 $\sin x$ 與 $\cos x$ 的週期都是 $2\pi$。進一步地，

$$
\tan(x+\pi)=\tan x,\qquad \cot(x+\pi)=\cot x,
$$

所以 $\tan x$ 與 $\cot x$ 的週期是 $\pi$。

### 3.4 零點、極值與符號

常見的零點與極值如下：

- $\sin x=0$ 當且僅當 $x=k\pi$。
- $\cos x=0$ 當且僅當 $x=\frac{\pi}{2}+k\pi$。
- $\tan x=0$ 當且僅當 $x=k\pi$。
- $\sin x$ 在 $x=\frac{\pi}{2}+2k\pi$ 取最大值 $1$，在 $x=\frac{3\pi}{2}+2k\pi$ 取最小值 $-1$。
- $\cos x$ 在 $x=2k\pi$ 取最大值 $1$，在 $x=\pi+2k\pi$ 取最小值 $-1$。

符號則由象限決定：

- 第一象限：$\sin,\cos,\tan$ 都為正。
- 第二象限：$\sin$ 正、$\cos$ 負、$\tan$ 負。
- 第三象限：$\sin,\cos$ 負、$\tan$ 正。
- 第四象限：$\sin$ 負、$\cos$ 正、$\tan$ 負。

### 3.5 圖形直觀

若把 $\sin x$ 和 $\cos x$ 畫成圖形，會得到平滑的週期波。幾何上：

- $\sin x$ 是單位圓上點的 $y$ 座標。
- $\cos x$ 是單位圓上點的 $x$ 座標。
- $\tan x$ 可視為斜率，因而在 $\cos x=0$ 附近會發散。

這三種觀點分別對應到波動、位置與方向變化。

## 4. 常用公式與證明

本節的主幹是和差角公式。很多看似不同的公式，實際上都由它推出。

### 4.1 倒數關係與商數關係

由定義直接得到

$$
\tan x=\frac{\sin x}{\cos x},\qquad
\cot x=\frac{\cos x}{\sin x},\qquad
\sec x=\frac{1}{\cos x},\qquad
\csc x=\frac{1}{\sin x}.
$$

這些公式本質上不是新定理，而是符號整理。它們的意義在於讓很多恆等式可以只用 $\sin$ 和 $\cos$ 來推導。

### 4.2 畢氏恆等式

由單位圓上點 $(\cos x,\sin x)$ 滿足

$$
x^2+y^2=1
$$

可知

$$
\cos^2 x+\sin^2 x=1.
$$

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

  \node[below] at (0.354,0) {$\cos x$};
  \node[right] at (0.643,0.383) {$\sin x$};
  \node[above left] at (0.354,0.421) {$1$};

  \draw (0.643,0.06) -- ++(0.06,0) -- ++(0,-0.06);
\end{tikzpicture}
```

在這張圖中，從原點到點 $P$ 的半徑長度是 $1$，水平邊與垂直邊分別是 $\cos x$ 與 $\sin x$。因此由畢氏定理立刻得到 $\cos^2 x+\sin^2 x=1$。

這就是最重要的三角恆等式之一。

#### 證明

單位圓的每一點都滿足方程

$$
x^2+y^2=1.
$$

又由定義 $x=\cos x$、$y=\sin x$，直接代入可得

$$
\cos^2 x+\sin^2 x=1.
$$

證畢。

若兩邊同除以 $\cos^2 x$，可得

$$
1+\tan^2 x=\sec^2 x.
$$

若兩邊同除以 $\sin^2 x$，可得

$$
1+\cot^2 x=\csc^2 x.
$$

### 4.3 和差角公式

三角函數最核心的公式是

$$
\sin(\alpha+\beta)=\sin\alpha\cos\beta+\cos\alpha\sin\beta,
$$

$$
\cos(\alpha+\beta)=\cos\alpha\cos\beta-\sin\alpha\sin\beta.
$$

相應的差角公式為

$$
\sin(\alpha-\beta)=\sin\alpha\cos\beta-\cos\alpha\sin\beta,
$$

$$
\cos(\alpha-\beta)=\cos\alpha\cos\beta+\sin\alpha\sin\beta.
$$

#### 證明思路：利用旋轉矩陣

平面上逆時針旋轉 $\beta$ 的線性變換可以寫成

$$
R(\beta)=
\begin{pmatrix}
\cos\beta & -\sin\beta\\
\sin\beta & \cos\beta
\end{pmatrix}.
$$

這一點可由基底向量的旋轉看出：

- $(1,0)$ 旋轉後變成 $(\cos\beta,\sin\beta)$；
- $(0,1)$ 旋轉後變成 $(-\sin\beta,\cos\beta)$。

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

在這張圖中，點 $P$ 是單位圓上角度為 $\alpha$ 的點；將它逆時針旋轉 $\beta$ 後，得到點 $Q$。因此 $Q$ 一方面可寫成 $R(\beta)P$，另一方面又是角度為 $\alpha+\beta$ 的單位圓點，所以兩種表示法的座標必須一致。

因此，若一個點原本是

$$
\begin{pmatrix}
\cos\alpha\\
\sin\alpha
\end{pmatrix},
$$

旋轉 $\beta$ 後應是角度變成 $\alpha+\beta$ 的點，也就是

$$
\begin{pmatrix}
\cos(\alpha+\beta)\\
\sin(\alpha+\beta)
\end{pmatrix}.
$$

另一方面，由矩陣乘法，

$$
R(\beta)
\begin{pmatrix}
\cos\alpha\\
\sin\alpha
\end{pmatrix}
=
\begin{pmatrix}
\cos\beta\cos\alpha-\sin\beta\sin\alpha\\
\sin\beta\cos\alpha+\cos\beta\sin\alpha
\end{pmatrix}.
$$

比較兩邊座標，得到

$$
\cos(\alpha+\beta)=\cos\alpha\cos\beta-\sin\alpha\sin\beta,
$$

$$
\sin(\alpha+\beta)=\sin\alpha\cos\beta+\cos\alpha\sin\beta.
$$

證畢。

#### 差角公式的推導

令 $\beta$ 換成 $-\beta$，再利用

$$
\cos(-\beta)=\cos\beta,\qquad \sin(-\beta)=-\sin\beta,
$$

便得到差角公式。

#### 正切和差角公式

若分母不為零，則

$$
\tan(\alpha+\beta)
=\frac{\sin(\alpha+\beta)}{\cos(\alpha+\beta)}
=\frac{\tan\alpha+\tan\beta}{1-\tan\alpha\tan\beta},
$$

$$
\tan(\alpha-\beta)
=\frac{\tan\alpha-\tan\beta}{1+\tan\alpha\tan\beta}.
$$

#### 例 1：計算 $\sin 75^\circ$

因為 $75^\circ=45^\circ+30^\circ$，所以

$$
\sin 75^\circ
=\sin 45^\circ\cos 30^\circ+\cos 45^\circ\sin 30^\circ
=\frac{\sqrt2}{2}\cdot\frac{\sqrt3}{2}+\frac{\sqrt2}{2}\cdot\frac12
=\frac{\sqrt6+\sqrt2}{4}.
$$

### 4.4 倍角公式

令 $\alpha=\beta=x$，即可從和角公式得到

$$
\sin 2x=2\sin x\cos x,
$$

$$
\cos 2x=\cos^2 x-\sin^2 x.
$$

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

在這張圖中，點 $Q$ 是單位圓上角度為 $2x$ 的點，因此它的座標直接給出 $\cos 2x$ 與 $\sin 2x$。又因為 $2x=x+x$，把上一節和角公式中的 $\alpha=\beta=x$ 代入，就得到 $\sin 2x=2\sin x\cos x$ 與 $\cos 2x=\cos^2 x-\sin^2 x$。

再配合 $\sin^2 x+\cos^2 x=1$，可以改寫成兩個等價形式：

$$
\cos 2x=2\cos^2 x-1,
$$

$$
\cos 2x=1-2\sin^2 x.
$$

#### 證明

直接把和角公式中的 $\alpha,\beta$ 都換成 $x$：

$$
\sin(x+x)=\sin x\cos x+\cos x\sin x=2\sin x\cos x,
$$

$$
\cos(x+x)=\cos x\cos x-\sin x\sin x=\cos^2 x-\sin^2 x.
$$

再由

$$
\sin^2 x+\cos^2 x=1
$$

得到

$$
\sin^2 x=1-\cos^2 x,\qquad \cos^2 x=1-\sin^2 x,
$$

代回即可得到另外兩個形式。

### 4.5 半角公式

由倍角公式反向整理，令 $x=2u$，得

$$
\cos 2u=1-2\sin^2 u,
$$

因此

$$
\sin^2 u=\frac{1-\cos 2u}{2}.
$$

將 $u$ 改寫為 $x/2$，便得到

$$
\sin^2\frac{x}{2}=\frac{1-\cos x}{2}.
$$

同理，由

$$
\cos 2u=2\cos^2 u-1
$$

可得

$$
\cos^2\frac{x}{2}=\frac{1+\cos x}{2}.
$$

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

在等腰三角形 $OAB$ 中，弦 $AB$ 的中點 $M$ 會把頂角 $x$ 平分成兩個 $x/2$，因此 $OMA$ 是關鍵直角三角形。由 $OA=1$、$OM=\cos(x/2)$、$AM=\sin(x/2)$，再配合中點的長度關係，可得到 $\cos^2\frac{x}{2}=\frac{1+\cos x}{2}$ 與 $\sin^2\frac{x}{2}=\frac{1-\cos x}{2}$。

若要進一步寫成平方根形式，需注意象限與符號：

$$
\sin\frac{x}{2}=\pm\sqrt{\frac{1-\cos x}{2}},\qquad
\cos\frac{x}{2}=\pm\sqrt{\frac{1+\cos x}{2}}.
$$

符號由 $x/2$ 所在象限決定。

### 4.6 積化和差與和差化積

這一組公式在訊號處理與積分化簡中特別常見。

常用的積化和差公式有

$$
\sin A\sin B=\frac{1}{2}\bigl[\cos(A-B)-\cos(A+B)\bigr],
$$

$$
\cos A\cos B=\frac{1}{2}\bigl[\cos(A-B)+\cos(A+B)\bigr],
$$

$$
\sin A\cos B=\frac{1}{2}\bigl[\sin(A+B)+\sin(A-B)\bigr].
$$

而和差化積公式有

$$
\sin A+\sin B=2\sin\frac{A+B}{2}\cos\frac{A-B}{2},
$$

$$
\sin A-\sin B=2\cos\frac{A+B}{2}\sin\frac{A-B}{2},
$$

$$
\cos A+\cos B=2\cos\frac{A+B}{2}\cos\frac{A-B}{2}.
$$

#### 證明示例

由差角與和角公式，

$$
\cos(A-B)=\cos A\cos B+\sin A\sin B,
$$

$$
\cos(A+B)=\cos A\cos B-\sin A\sin B.
$$

兩式相減得

$$
\cos(A-B)-\cos(A+B)=2\sin A\sin B,
$$

因此

$$
\sin A\sin B=\frac{1}{2}\bigl[\cos(A-B)-\cos(A+B)\bigr].
$$

其餘公式可用同樣方式，由和差角公式相加或相減得到。

#### 例 2：化簡 $\sin x\cos x$

由倍角公式

$$
\sin 2x=2\sin x\cos x
$$

可得

$$
\sin x\cos x=\frac{1}{2}\sin 2x.
$$

這種變形在積分中非常常見。

## 5. 反三角函數與微積分關係

### 5.1 反三角函數的主值

由於 $\sin x,\cos x,\tan x$ 都不是整體單射，所以要定義反函數，必須先限制區間。

常用主值區間為：

- $\arcsin x:[-1,1]\to\left[-\frac{\pi}{2},\frac{\pi}{2}\right]$
- $\arccos x:[-1,1]\to[0,\pi]$
- $\arctan x:\mathbb{R}\to\left(-\frac{\pi}{2},\frac{\pi}{2}\right)$

也就是說，

$$
y=\arcsin x \iff \sin y=x,\quad y\in\left[-\frac{\pi}{2},\frac{\pi}{2}\right],
$$

$$
y=\arctan x \iff \tan y=x,\quad y\in\left(-\frac{\pi}{2},\frac{\pi}{2}\right).
$$

### 5.2 兩個基本極限與弧度制

微積分中的關鍵是下面兩個極限：

$$
\lim_{h\to 0}\frac{\sin h}{h}=1,
$$

$$
\lim_{h\to 0}\frac{\cos h-1}{h}=0.
$$

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

在這張圖中，上半板表示在單位圓裡若角度用弧度表示，角 $h$ 對應的弧長就是 $h$ 本身；下半板則呈現 $\sin h<h<\tan h$ 的幾何夾擠，因此可進一步推出 $1<\frac{h}{\sin h}<\frac{1}{\cos h}$，在 $h\to 0$ 時夾出 $\frac{\sin h}{h}\to 1$。

第一個極限若用幾何夾擠可以證明，第二個則可由

$$
\cos h-1=-2\sin^2\frac{h}{2}
$$

得到：

$$
\left|\frac{\cos h-1}{h}\right|
=2\left|\frac{\sin^2(h/2)}{h}\right|
=\left|\frac{\sin(h/2)}{h/2}\right|\cdot|\sin(h/2)|
\to 1\cdot 0=0.
$$

這裡的極限值依賴弧度制。若用角度制，上式不會等於 $1$。

### 5.3 $\sin x,\cos x,\tan x$ 的導數

#### 定理

$$
\frac{d}{dx}\sin x=\cos x,\qquad
\frac{d}{dx}\cos x=-\sin x,\qquad
\frac{d}{dx}\tan x=\sec^2 x.
$$

#### 證明 $\frac{d}{dx}\sin x=\cos x$

由導數定義，

$$
\frac{d}{dx}\sin x
=\lim_{h\to 0}\frac{\sin(x+h)-\sin x}{h}.
$$

用和角公式展開：

$$
\sin(x+h)=\sin x\cos h+\cos x\sin h.
$$

因此

$$
\frac{\sin(x+h)-\sin x}{h}
=\sin x\cdot\frac{\cos h-1}{h}+\cos x\cdot\frac{\sin h}{h}.
$$

令 $h\to 0$，由上一節兩個極限得到

$$
\frac{d}{dx}\sin x=\sin x\cdot 0+\cos x\cdot 1=\cos x.
$$

#### 證明 $\frac{d}{dx}\cos x=-\sin x$

同理，

$$
\frac{d}{dx}\cos x
=\lim_{h\to 0}\frac{\cos(x+h)-\cos x}{h}.
$$

由和角公式，

$$
\cos(x+h)=\cos x\cos h-\sin x\sin h.
$$

所以

$$
\frac{\cos(x+h)-\cos x}{h}
=\cos x\cdot\frac{\cos h-1}{h}-\sin x\cdot\frac{\sin h}{h}.
$$

令 $h\to 0$，得

$$
\frac{d}{dx}\cos x=-\sin x.
$$

#### 證明 $\frac{d}{dx}\tan x=\sec^2 x$

由

$$
\tan x=\frac{\sin x}{\cos x}
$$

與商法則，

$$
\frac{d}{dx}\tan x
=\frac{\cos x\cdot\cos x-\sin x\cdot(-\sin x)}{\cos^2 x}
=\frac{\cos^2 x+\sin^2 x}{\cos^2 x}
=\frac{1}{\cos^2 x}
=\sec^2 x.
$$

### 5.4 反三角函數的導數

#### $\arcsin x$ 的導數

令

$$
y=\arcsin x,
$$

則

$$
\sin y=x.
$$

兩邊對 $x$ 微分：

$$
\cos y\cdot \frac{dy}{dx}=1.
$$

因此

$$
\frac{dy}{dx}=\frac{1}{\cos y}.
$$

又由 $\sin y=x$ 和畢氏恆等式，

$$
\cos y=\sqrt{1-\sin^2 y}=\sqrt{1-x^2}.
$$

這裡取正號，是因為 $y\in[-\pi/2,\pi/2]$ 時 $\cos y\ge 0$。故

$$
\frac{d}{dx}\arcsin x=\frac{1}{\sqrt{1-x^2}},\qquad |x|<1.
$$

同理可得

$$
\frac{d}{dx}\arccos x=-\frac{1}{\sqrt{1-x^2}},\qquad |x|<1.
$$

#### $\arctan x$ 的導數

令

$$
y=\arctan x,
$$

則

$$
\tan y=x.
$$

兩邊微分得

$$
\sec^2 y\cdot\frac{dy}{dx}=1.
$$

所以

$$
\frac{dy}{dx}=\frac{1}{\sec^2 y}.
$$

由 $1+\tan^2 y=\sec^2 y$ 與 $\tan y=x$ 得

$$
\sec^2 y=1+x^2.
$$

因此

$$
\frac{d}{dx}\arctan x=\frac{1}{1+x^2}.
$$

### 5.5 常用積分

由導數公式可立刻得到

$$
\int \sin x\,dx=-\cos x+C,
$$

$$
\int \cos x\,dx=\sin x+C,
$$

$$
\int \sec^2 x\,dx=\tan x+C.
$$

由反三角函數導數又可得到

$$
\int \frac{1}{\sqrt{1-x^2}}\,dx=\arcsin x+C,
$$

$$
\int \frac{1}{\sqrt{1-x^2}}\,dx=-\arccos x+C,
$$

$$
\int \frac{1}{1+x^2}\,dx=\arctan x+C.
$$

## 6. AI 與工程中的應用

三角函數在 AI 中最常見的角色，不是「拿來解三角形」，而是「拿來表示週期、相位、位置與方向」。

### 6.1 週期特徵編碼

許多資料有明顯週期性，例如：

- 一天中的時間
- 一週中的日期
- 一年中的季節
- 感測器的週期振動

若直接把時間 $t$ 當成一個實數輸入模型，會出現邊界不連續問題。例如 23:59 和 00:01 實際上非常接近，但數值上卻分別接近一天的尾端與開頭。

一個標準做法是使用

$$
\left(\sin\frac{2\pi t}{T},\ \cos\frac{2\pi t}{T}\right)
$$

來表示週期長度為 $T$ 的時間變數。這樣有三個好處：

1. 週期起點與終點會自然接在一起。
2. 特徵被放到單位圓上，尺度穩定。
3. 相位差會以幾何方式反映在向量角度上。

#### 例 3：一天中的小時編碼

若 $t$ 表示一天中的小時數，$T=24$，則

$$
\phi(t)=\left(\sin\frac{2\pi t}{24},\ \cos\frac{2\pi t}{24}\right).
$$

此時 $t=23$ 和 $t=0$ 在平面上會落在彼此接近的位置，而不會像直接使用數值時相差 23。

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

把週期時間或方向角改寫成正弦餘弦對，會把原本有邊界斷裂的一維數值，轉成單位圓上的二維連續表示，因此週期起點與終點、接近的方向角，都會在幾何上保持接近。

### 6.2 Fourier features 與頻率表示

神經網路對低頻函數通常較容易擬合，對高頻細節則可能較慢。為了讓模型更容易表示快速變化，可以先把輸入映射成多個不同頻率的正弦餘弦特徵，例如

$$
\gamma(x)=
\bigl[
\sin(2\pi b_1 x),\cos(2\pi b_1 x),
\sin(2\pi b_2 x),\cos(2\pi b_2 x),
\ldots
\bigr].
$$

```tikz {showConsole=false}
\begin{tikzpicture}[x=8cm,y=1.15cm]
  \draw[->, thick] (-0.03,2.15) -- (1.08,2.15) node[right] {$x$};
  \draw[->, thick] (-0.03,0.85) -- (1.08,0.85) node[right] {$x$};
  \draw[->, thick] (-0.03,-0.45) -- (1.08,-0.45) node[right] {$x$};

  \draw[blue, very thick, samples=120, domain=0:1]
    plot (\x,{2.15 + 0.34*sin(360*\x)});
  \draw[red, very thick, samples=180, domain=0:1]
    plot (\x,{0.85 + 0.22*sin(1440*\x)});
  \draw[orange!85!black, very thick, samples=180, domain=0:1]
    plot (\x,{-0.45 + 0.34*sin(360*\x) + 0.22*sin(1440*\x)});

  \node[blue, anchor=west] at (0.02,2.62) {$\sin(2\pi x)$};
  \node[blue!70!black, anchor=west, scale=0.8] at (0.40,2.62) {low frequency: overall trend};

  \node[red, anchor=west] at (0.02,1.32) {$0.35\sin(8\pi x)$};
  \node[red!70!black, anchor=west, scale=0.8] at (0.44,1.32) {high frequency: fine detail};

  \node[orange!85!black, anchor=west] at (0.02,0.22) {combined signal};
  \node[black, anchor=west, scale=0.8] at (0.40,0.22) {$\sin(2\pi x)+0.35\sin(8\pi x)$};

  \node[below] at (0,-0.45) {$0$};
  \node[below] at (1,-0.45) {$1$};

  \node[align=left, scale=0.78] at (0.80,-1.02)
    {adding the high-frequency term\\ reveals finer local variation};
\end{tikzpicture}
```

低頻成分先描述整體輪廓，高頻成分再補上局部細節；把輸入映射到多個不同頻率的正弦餘弦特徵後，模型會更容易表示快速變化的訊號。

這種表示稱為 Fourier features。其核心想法是：

- 低頻項描述整體趨勢；
- 高頻項描述細節變化；
- 把輸入先投影到多個頻率空間，有助於模型表示複雜訊號。

這類做法常出現在隱式神經表示、座標型網路與某些時間序列模型中。

### 6.3 位置與時間訊號表示

三角函數也常被用來表示位置或順序資訊。典型例子是正弦位置編碼：

$$
\mathrm{PE}(\text{pos},2i)=\sin\left(\frac{\text{pos}}{10000^{2i/d}}\right),
$$

$$
\mathrm{PE}(\text{pos},2i+1)=\cos\left(\frac{\text{pos}}{10000^{2i/d}}\right).
$$

這種表示同時使用不同頻率，使模型可以在不同尺度上感知位置差異。從數學角度看，它利用了三角函數天然適合表示相位與頻率的特性。

### 6.4 為什麼常用 $(\cos\theta,\sin\theta)$ 或 $(\sin\theta,\cos\theta)$ 取代直接用角度？

在機器學習與機器人中，若要預測方向角 $\theta$，直接回歸一個角度值常會遇到環狀不連續問題。例如：

- $1^\circ$ 和 $359^\circ$ 的幾何方向非常接近；
- 但若直接用數值比較，它們差了 $358^\circ$。

改用一對週期特徵，例如

$$
(\cos\theta,\sin\theta)
$$

後，方向資訊會被嵌入到單位圓上，鄰近方向會在向量空間中保持鄰近。實作時用 $(\sin\theta,\cos\theta)$ 或 $(\cos\theta,\sin\theta)$ 都可以，重點是保持一致。這對方向估計、姿態預測、循環時間表示都非常實用。這和 `6.1` 的時間週期編碼是同一個想法：都是把環狀變數嵌入單位圓，只是實作時可能採用不同的座標排列慣例。

### 6.5 2D 旋轉矩陣與座標變換

若平面上一點為 $(x,y)$，逆時針旋轉角度 $\theta$ 後，得到的新座標為

$$
\begin{pmatrix}
x'\\
y'
\end{pmatrix}
=
\begin{pmatrix}
\cos\theta & -\sin\theta\\
\sin\theta & \cos\theta
\end{pmatrix}
\begin{pmatrix}
x\\
y
\end{pmatrix}.
$$

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

旋轉矩陣可以看成把向量整體逆時針轉過 $\theta$；同一個點在旋轉前後長度不變，但它在座標軸上的投影會改變，因此得到新的座標 $(x',y')$。

也就是

$$
x'=x\cos\theta-y\sin\theta,\qquad
y'=x\sin\theta+y\cos\theta.
$$

這個公式在下列場景都很常見：

- 電腦圖學中的物件旋轉
- 機器人中的平面位姿更新
- SLAM 與座標系轉換
- 影像與點雲的剛體變換

#### 例 4：旋轉 $(1,0)$

把向量 $(1,0)$ 逆時針旋轉 $\theta$，得到

$$
\begin{pmatrix}
\cos\theta\\
\sin\theta
\end{pmatrix},
$$

這再次說明單位圓定義與旋轉幾何本質上是同一件事。

### 6.6 圖學與機器人中的方向表示

在圖學與機器人中，方向通常不是孤立存在，而是與位置、速度、角速度、感測器量測一起出現。

```tikz
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

在機器人與圖學中，朝向角 $\theta$ 常先轉成方向向量 $(\cos\theta,\sin\theta)$，再用來描述前進方向、控制更新或局部座標軸的朝向。

三角函數扮演的角色包括：

- 把朝向角轉成方向向量；
- 把局部座標系轉換到全域座標系；
- 描述週期運動，例如擺動、步態與振動；
- 在學習模型中把角度變數轉成較平滑、較適合優化的特徵。

更高維的旋轉理論會延伸到旋轉矩陣、四元數與李群，但 2D 情況下的核心仍然是 $\sin$ 與 $\cos$。

## 7. 小結與常用公式速查表

### 7.1 小結

三角函數可以從兩個角度理解：

- 幾何上，它描述角度、邊比、座標與旋轉。
- 分析上，它描述週期、波動、相位與頻率。

在理論上，和差角公式是許多公式的樞紐；在應用上，$(\sin\theta,\cos\theta)$、週期編碼與旋轉矩陣則是最常見的實務形式。

### 7.2 常用公式速查表

| 類別 | 公式 |
|---|---|
| 基本定義 | $\tan x=\dfrac{\sin x}{\cos x}$，$\cot x=\dfrac{\cos x}{\sin x}$ |
| 倒數關係 | $\sec x=\dfrac{1}{\cos x}$，$\csc x=\dfrac{1}{\sin x}$ |
| 畢氏恆等式 | $\sin^2 x+\cos^2 x=1$ |
| 正切版本 | $1+\tan^2 x=\sec^2 x$，$1+\cot^2 x=\csc^2 x$ |
| 和角公式 | $\sin(\alpha+\beta)=\sin\alpha\cos\beta+\cos\alpha\sin\beta$ |
| 和角公式 | $\cos(\alpha+\beta)=\cos\alpha\cos\beta-\sin\alpha\sin\beta$ |
| 差角公式 | $\sin(\alpha-\beta)=\sin\alpha\cos\beta-\cos\alpha\sin\beta$ |
| 差角公式 | $\cos(\alpha-\beta)=\cos\alpha\cos\beta+\sin\alpha\sin\beta$ |
| 倍角公式 | $\sin 2x=2\sin x\cos x$ |
| 倍角公式 | $\cos 2x=\cos^2 x-\sin^2 x=2\cos^2 x-1=1-2\sin^2 x$ |
| 半角公式 | $\sin^2\dfrac{x}{2}=\dfrac{1-\cos x}{2}$，$\cos^2\dfrac{x}{2}=\dfrac{1+\cos x}{2}$ |
| 導數 | $(\sin x)'=\cos x$，$(\cos x)'=-\sin x$，$(\tan x)'=\sec^2 x$ |
| 反函數導數 | $(\arcsin x)'=\dfrac{1}{\sqrt{1-x^2}}$，$(\arccos x)'=-\dfrac{1}{\sqrt{1-x^2}}$，$(\arctan x)'=\dfrac{1}{1+x^2}$ |
| 積分 | $\int \sin x\,dx=-\cos x+C$，$\int \cos x\,dx=\sin x+C$ |
| 反三角積分 | $\int \dfrac{1}{\sqrt{1-x^2}}\,dx=\arcsin x+C=-\arccos x+C$，$\int \dfrac{1}{1+x^2}\,dx=\arctan x+C$ |

若把本篇濃縮成一句話，可以說：三角函數是把「角度」轉成「可運算的座標與訊號」的語言，而這正是它在數學、AI 與工程中持續重要的原因。
