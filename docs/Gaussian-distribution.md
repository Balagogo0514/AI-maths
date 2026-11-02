# 高斯分布的介紹與證明

高斯分布（Gaussian distribution），也叫正態分布（normal distribution），是機率論與統計學中最重要的分布之一。它的圖形呈現左右對稱的鐘形，因此也常被稱為鐘形曲線。

高斯分布之所以重要，不只是因為它的數學形式漂亮，更因為它在自然界、測量誤差、社會科學與機器學習中都非常常見。許多大量微小隨機因素疊加後的結果，往往會接近高斯分布。

## 1. 什麼是高斯分布

若隨機變數 `X` 的機率密度函數為

$$
f_X(x)=\frac{1}{\sqrt{2\pi}\sigma}\exp\left(-\frac{(x-\mu)^2}{2\sigma^2}\right), \quad -\infty < x < \infty
$$

其中：

- $\mu$ 是平均數（mean），決定分布中心位置
- $\sigma^2$ 是變異數（variance）
- $\sigma$ 是標準差（standard deviation），決定曲線展開的寬窄

那麼就說

$$
X \sim N(\mu,\sigma^2)
$$

這裡 `N` 表示 normal distribution。

從圖形上看：

- 當 $\mu$ 增加時，整條曲線向右平移
- 當 $\sigma$ 增加時，曲線會變矮、變寬
- 曲線以 $x=\mu$ 為對稱軸

## 2. 機率密度函數

高斯分布的密度函數有兩個最常見的版本。

### 2.1 一般形式

$$
f_X(x)=\frac{1}{\sqrt{2\pi}\sigma}\exp\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)
$$

這是平均數為 $\mu$、變異數為 $\sigma^2$ 的高斯分布。

### 2.2 標準正態分布

當 $\mu=0$ 且 $\sigma=1$ 時，可得標準正態分布：

$$
Z \sim N(0,1)
$$

其密度函數為

$$
\phi(z)=\frac{1}{\sqrt{2\pi}}e^{-z^2/2}
$$

標準正態分布是研究所有高斯分布的基礎，因為任意高斯分布都可以透過標準化轉成它。

## 3. 為什麼這個函數是合法分布

要成為機率密度函數，至少要滿足兩件事：

- 對所有 $x$ 都有 $f(x) \ge 0$
- 全部積分等於 $1$

第一點顯然成立，因為指數函數與常數因子都非負。真正要證明的是第二點。

### 3.1 先證明標準型的積分

考慮積分

$$
I=\int_{-\infty}^{\infty} e^{-x^2/2}\,dx
$$

這個積分不能直接用初等反導函數算出，但可以改算 `I^2`：

$$
I^2=\left(\int_{-\infty}^{\infty} e^{-x^2/2}\,dx\right)
\left(\int_{-\infty}^{\infty} e^{-y^2/2}\,dy\right)
$$

把它看成二重積分：

$$
I^2=\iint_{\mathbb{R}^2} e^{-(x^2+y^2)/2}\,dx\,dy
$$

接著改用極座標

$$
x=r\cos\theta,\qquad y=r\sin\theta,\qquad dx\,dy=r\,dr\,d\theta
$$

因此

$$
I^2=\int_0^{2\pi}\int_0^{\infty} e^{-r^2/2}r\,dr\,d\theta
$$

先算內積分。令

$$
u=\frac{r^2}{2}\quad\Rightarrow\quad du=r\,dr
$$

則

$$
\int_0^{\infty} e^{-r^2/2}r\,dr
=\int_0^{\infty} e^{-u}\,du
=1
$$

所以

$$
I^2=\int_0^{2\pi} 1\,d\theta=2\pi
$$

由於 `I>0`，得到

$$
I=\sqrt{2\pi}
$$

也就是

$$
\int_{-\infty}^{\infty} e^{-x^2/2}\,dx=\sqrt{2\pi}
$$

因此

$$
\int_{-\infty}^{\infty}\frac{1}{\sqrt{2\pi}}e^{-x^2/2}\,dx=1
$$

這就證明了標準正態分布的密度函數是合法的。

### 3.2 推廣到一般高斯分布

對一般形式

$$
f_X(x)=\frac{1}{\sqrt{2\pi}\sigma}\exp\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)
$$

令

$$
z=\frac{x-\mu}{\sigma}\quad\Rightarrow\quad x=\mu+\sigma z,\quad dx=\sigma\,dz
$$

則

$$
\int_{-\infty}^{\infty} f_X(x)\,dx
=\int_{-\infty}^{\infty}
\frac{1}{\sqrt{2\pi}\sigma}
\exp\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)\,dx
$$

代換後變成

$$
\int_{-\infty}^{\infty}
\frac{1}{\sqrt{2\pi}\sigma}e^{-z^2/2}\sigma\,dz
=\int_{-\infty}^{\infty}\frac{1}{\sqrt{2\pi}}e^{-z^2/2}\,dz
=1
$$

因此一般高斯分布也確實是合法的機率密度函數。

## 4. 標準化

若

$$
X \sim N(\mu,\sigma^2)
$$

定義

$$
Z=\frac{X-\mu}{\sigma}
$$

則

$$
Z \sim N(0,1)
$$

這個步驟叫做標準化（standardization）。

它的意義是：

- 先減去平均數，把分布中心移到 `0`
- 再除以標準差，把尺度調整成標準單位

因此不同平均數、不同尺度的高斯分布，都能轉換到同一個標準正態分布來研究。

## 5. 均值與方差推導

下面用標準正態分布來推導，再推廣到一般情況。

### 5.1 標準正態分布的均值

設 $Z \sim N(0,1)$，則

$$
E[Z]=\int_{-\infty}^{\infty} z\frac{1}{\sqrt{2\pi}}e^{-z^2/2}\,dz
$$

被積函數

$$
z e^{-z^2/2}
$$

是奇函數，且積分區間關於 `0` 對稱，因此

$$
E[Z]=0
$$

### 5.2 標準正態分布的變異數

因為 `E[Z]=0`，所以

$$
\mathrm{Var}(Z)=E[Z^2]
$$

也就是

$$
E[Z^2]=\int_{-\infty}^{\infty} z^2\frac{1}{\sqrt{2\pi}}e^{-z^2/2}\,dz
$$

用分部積分可得這個值為 `1`。做法如下：

令

$$
u=z,\qquad dv=z e^{-z^2/2}\,dz
$$

則

$$
du=dz,\qquad v=-e^{-z^2/2}
$$

因此

$$
\int z^2 e^{-z^2/2}\,dz
=\int z\cdot \left(z e^{-z^2/2}\right)\,dz
$$

在無窮區間上做分部積分：

$$
\int_{-\infty}^{\infty} z^2 e^{-z^2/2}\,dz
=\left[-z e^{-z^2/2}\right]_{-\infty}^{\infty}
+\int_{-\infty}^{\infty} e^{-z^2/2}\,dz
$$

由於

$$
\lim_{|z|\to\infty} z e^{-z^2/2}=0
$$

所以邊界項為 `0`，故

$$
\int_{-\infty}^{\infty} z^2 e^{-z^2/2}\,dz
=\int_{-\infty}^{\infty} e^{-z^2/2}\,dz
=\sqrt{2\pi}
$$

因此

$$
E[Z^2]=\frac{1}{\sqrt{2\pi}}\sqrt{2\pi}=1
$$

所以

$$
\mathrm{Var}(Z)=1
$$

### 5.3 推廣到一般高斯分布

若

$$
X=\mu+\sigma Z,\qquad Z\sim N(0,1)
$$

則

$$
E[X]=E[\mu+\sigma Z]=\mu+\sigma E[Z]=\mu
$$

且

$$
\mathrm{Var}(X)=\mathrm{Var}(\mu+\sigma Z)=\sigma^2\mathrm{Var}(Z)=\sigma^2
$$

所以一般高斯分布的均值與方差確實分別為

$$
E[X]=\mu,\qquad \mathrm{Var}(X)=\sigma^2
$$

## 6. 重要性質

### 6.1 對稱性

高斯分布關於 $x=\mu$ 對稱，因此：

- 平均數、中位數、眾數相同
- 左右兩側的尾部形狀一致

### 6.2 68-95-99.7 規則

對高斯分布來說，有一個非常常用的近似規則：

- 約 68% 的資料落在 $[\mu-\sigma,\mu+\sigma]$
- 約 95% 的資料落在 $[\mu-2\sigma,\mu+2\sigma]$
- 約 99.7% 的資料落在 $[\mu-3\sigma,\mu+3\sigma]$

這個規則常用來判斷某個觀測值是否偏離常態太多。

### 6.3 線性變換封閉性

若 $X \sim N(\mu,\sigma^2)$，則對常數 $a,b$，隨機變數

$$
Y=aX+b
$$

仍然服從高斯分布，且

$$
Y \sim N(a\mu+b,a^2\sigma^2)
$$

這個性質使高斯分布在統計推導與機器學習模型中非常方便。

## 7. 為什麼它常出現

高斯分布常出現，主要有三個原因。

### 7.1 測量誤差的疊加

實際測量通常不是只受一個誤差影響，而是很多小誤差一起作用，例如：

- 儀器解析度
- 環境波動
- 人為讀值偏差
- 感測器噪聲

當這些小誤差彼此近似獨立且沒有單一因素主導時，總誤差常會接近高斯分布。

### 7.2 中心極限定理

中心極限定理（Central Limit Theorem）說明：當許多獨立、同分布且具有有限均值與變異數的隨機變數相加後，經過適當標準化，其總和分布會趨近正態分布。

這就是高斯分布在自然與工程問題中反覆出現的根本原因之一。它不是只屬於某一種現象，而是大量隨機效應聚合後的普遍極限形態。

### 7.3 在機器學習中的角色

高斯分布在機器學習中也很常見，例如：

- 把噪聲建模成高斯噪聲
- 在高斯朴素貝葉斯中描述連續特徵
- 在參數估計中使用極大概似法
- 在擴散模型中使用高斯噪聲逐步加噪與去噪

很多模型之所以先假設高斯分布，不是因為世界一定完全服從它，而是因為它在理論上合理、在計算上方便，而且通常能提供不錯的一階近似。

## 8. 總結

高斯分布是最核心的連續機率分布之一，其密度函數由平均數 $\mu$ 與變異數 $\sigma^2$ 決定。它之所以成立為機率分布，關鍵在於高斯積分可證明總面積恰好為 $1$。透過標準化，任意高斯分布都能轉換成標準正態分布來分析。再加上對稱性、線性變換穩定性與中心極限定理的支持，使它成為統計學、資料科學與機器學習中最常見也最重要的基礎工具之一。
