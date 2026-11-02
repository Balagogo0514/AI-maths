# 鏈式法則

鏈式法則的英文名稱是 **Chain Rule**。它是**微分學**中的基本法則，用來計算複合函數的導數，不屬於微分方程本身，但在解微分方程時常會用到。

## 1. 定義

設

$$
y = f(u), \qquad u = g(x)
$$

且 $g$ 在 $x$ 可微、$f$ 在 $u = g(x)$ 可微，則複合函數

$$
y = f(g(x))
$$

在 $x$ 可微，且

$$
\frac{dy}{dx} = f'(g(x)) \, g'(x)
$$

也可以寫成

$$
(f \circ g)'(x) = f'(g(x)) g'(x)
$$

## 2. 直觀意義

$x$ 先影響 $u = g(x)$，再由 $u$ 影響 $y = f(u)$，因此總變化率等於：

$$
\text{總變化率} = \text{外層變化率} \times \text{內層變化率}
$$

## 3. 證明

由 $g$ 在 $x$ 可微，可寫成

$$
g(x + \Delta x) = g(x) + g'(x)\Delta x + \varepsilon_1 \Delta x
$$

其中當 $\Delta x \to 0$ 時，$\varepsilon_1 \to 0$。

令

$$
\Delta u = g(x + \Delta x) - g(x)
$$

則

$$
\Delta u = g'(x)\Delta x + \varepsilon_1 \Delta x
$$

又因 $f$ 在 $u = g(x)$ 可微，所以

$$
f(g(x) + \Delta u) - f(g(x))
= f'(g(x))\Delta u + \varepsilon_2 \Delta u
$$

其中當 $\Delta u \to 0$ 時，$\varepsilon_2 \to 0$。

設

$$
\Delta y = f(g(x + \Delta x)) - f(g(x))
$$

則

$$
\Delta y = f'(g(x))\Delta u + \varepsilon_2 \Delta u
$$

兩邊除以 $\Delta x$：

$$
\frac{\Delta y}{\Delta x}
= f'(g(x)) \frac{\Delta u}{\Delta x}
+ \varepsilon_2 \frac{\Delta u}{\Delta x}
$$

當 $\Delta x \to 0$ 時，

$$
\frac{\Delta u}{\Delta x} \to g'(x), \qquad \varepsilon_2 \to 0
$$

因此

$$
\lim_{\Delta x \to 0} \frac{\Delta y}{\Delta x}
= f'(g(x)) g'(x)
$$

故

$$
\frac{dy}{dx} = f'(g(x)) g'(x)
$$

## 4. 極限定義版嚴格證明

設

$$
h(x) = f(g(x))
$$

假設：

1. $g$ 在 $x$ 可微
2. $f$ 在 $g(x)$ 可微

要證明

$$
h'(x) = (f \circ g)'(x) = f'(g(x)) g'(x)
$$

由導數定義，

$$
(f \circ g)'(x)
= \lim_{t \to 0} \frac{f(g(x+t)) - f(g(x))}{t}
$$

令

$$
\Delta g = g(x+t) - g(x)
$$

則上式可寫成

$$
\frac{f(g(x+t)) - f(g(x))}{t}
= \frac{f(g(x) + \Delta g) - f(g(x))}{t}
$$

因為 $f$ 在 $g(x)$ 可微，所以依可微的定義，可寫成

$$
f(g(x)+u) - f(g(x)) = f'(g(x))u + r(u)
$$

其中

$$
\lim_{u \to 0} \frac{r(u)}{u} = 0
$$

把 $u = \Delta g$ 代入，得到

$$
f(g(x+t)) - f(g(x))
= f'(g(x))\Delta g + r(\Delta g)
$$

因此

$$
\frac{f(g(x+t)) - f(g(x))}{t}
= f'(g(x)) \frac{\Delta g}{t}
+ \frac{r(\Delta g)}{t}
$$

再把最後一項拆開：

$$
\frac{r(\Delta g)}{t}
= \frac{r(\Delta g)}{\Delta g} \cdot \frac{\Delta g}{t}
\qquad (\Delta g \neq 0)
$$

所以

$$
\frac{f(g(x+t)) - f(g(x))}{t}
= f'(g(x)) \frac{\Delta g}{t}
+ \frac{r(\Delta g)}{\Delta g} \cdot \frac{\Delta g}{t}
$$

現在令 $t \to 0$。

因為 $g$ 在 $x$ 可微，所以 $g$ 在 $x$ 連續，故

$$
\Delta g = g(x+t) - g(x) \to 0
$$

又因

$$
\lim_{t \to 0} \frac{\Delta g}{t} = g'(x)
$$

且

$$
\lim_{\Delta g \to 0} \frac{r(\Delta g)}{\Delta g} = 0
$$

所以

$$
\lim_{t \to 0} \frac{f(g(x+t)) - f(g(x))}{t}
= f'(g(x))g'(x) + 0 \cdot g'(x)
= f'(g(x))g'(x)
$$

故

$$
(f \circ g)'(x) = f'(g(x))g'(x)
$$

## 5. 例子

設

$$
y = (3x^2 + 1)^5
$$

令

$$
u = 3x^2 + 1
$$

則

$$
y = u^5
$$

所以

$$
\frac{dy}{dx}
= \frac{dy}{du} \cdot \frac{du}{dx}
= 5u^4 \cdot 6x
= 30x(3x^2 + 1)^4
$$

## 6. 在 AI 中的對應應用

鏈式法則在 AI，特別是深度學習中，具有非常直接的作用。神經網路可以看成許多可微函數層層組合而成，例如

$$
x \to z^{(1)} \to a^{(1)} \to z^{(2)} \to a^{(2)} \to \cdots \to \hat{y} \to L
$$

其中 $L$ 是損失函數（loss function）。當我們想知道某個參數（例如某層權重 $W$）如何影響最終損失時，不能只看單一局部變化，而必須沿著整條依賴鏈把影響一路傳回去。這正是鏈式法則的核心作用。

以簡化形式來看，若

$$
L = f(a), \qquad a = g(z), \qquad z = hx + b
$$

則損失對參數的導數會寫成

$$
\frac{\partial L}{\partial h}
= \frac{\partial L}{\partial a}
\cdot \frac{\partial a}{\partial z}
\cdot \frac{\partial z}{\partial h}
$$

這表示最終誤差可以拆成多個局部導數的連乘。這種由輸出端把梯度逐層往回傳遞的程序，就是**反向傳播**（backpropagation）的數學基礎。

在技術實作上，現代 AI 框架如 PyTorch、TensorFlow、JAX，通常會把模型表示成**計算圖**（computational graph）。前向傳播時計算每個節點的值，反向傳播時則依照計算圖自動套用鏈式法則，把損失對各參數的梯度算出來。這種機制稱為**自動微分**（automatic differentiation），其中神經網路訓練最常用的是 reverse-mode automatic differentiation。

鏈式法則不只是理論工具，也直接影響模型是否容易訓練。因為反向傳播本質上是很多局部導數的連乘，若某些導數長期偏小，梯度會一路縮小，形成**梯度消失**（vanishing gradients）；若某些導數偏大，則可能出現**梯度爆炸**（exploding gradients）。因此激活函數的選擇、權重初始化、正規化方法、殘差連接（residual connection）等設計，都可以視為在改善鏈式法則沿途傳遞的梯度品質。

從這個角度看，鏈式法則不只是微積分中的公式，而是 AI 訓練能夠成立的核心數學機制之一。

## 7. 與微分方程的關係

鏈式法則屬於**微分學**，不是微分方程本身。

- 鏈式法則：研究如何對函數求導
- 微分方程：研究含有未知函數及其導數的方程

例如下式是微分方程：

$$
y' + 2y = 0
$$

或

$$
\frac{dy}{dx} = x + y
$$

雖然鏈式法則不屬於微分方程，但在求解微分方程、變數代換、座標變換時都很常使用。
