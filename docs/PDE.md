# 偏微分方程（Partial Differential Equations）

偏微分方程（PDE）是含有多個自變數的未知函數及其**偏導數**的方程式。從熱傳導、流體力學到現代 AI 的擴散模型，PDE 是描述連續變化過程最有力的語言。

## 1. 偏導數與 PDE 的定義

### 1.1 偏導數

設 $u = u(x, y)$，對 $x$ 求偏導時將 $y$ 視為常數：

$$\frac{\partial u}{\partial x} = \lim_{\Delta x \to 0} \frac{u(x+\Delta x, y) - u(x, y)}{\Delta x}$$

高階偏導：

$$\frac{\partial^2 u}{\partial x^2}, \quad \frac{\partial^2 u}{\partial x \partial y} = \frac{\partial^2 u}{\partial y \partial x} \quad \text{（Clairaut 定理：混合偏導在連續時可交換順序）}$$

### 1.2 偏微分方程的階與線性性

- **階（order）**：方程中最高偏導的階數
- **線性**：$u$ 及其偏導只以一次冪出現，係數可以是自變數的函數

$$a(x,t)\frac{\partial u}{\partial t} + b(x,t)\frac{\partial u}{\partial x} = c(x,t)u + d(x,t) \quad \text{（一階線性 PDE）}$$

### 1.3 Laplacian 算子

$$\nabla^2 u = \Delta u = \sum_{i=1}^n \frac{\partial^2 u}{\partial x_i^2} = \frac{\partial^2 u}{\partial x^2} + \frac{\partial^2 u}{\partial y^2} + \frac{\partial^2 u}{\partial z^2}$$

Laplacian 衡量函數在某點的值與其周圍平均值之差，是 PDE 理論的核心算子。

---

## 2. 四大經典 PDE

### 2.1 熱方程（Heat Equation）

$$\frac{\partial u}{\partial t} = \alpha \nabla^2 u$$

$u(x,t)$：溫度；$\alpha > 0$：熱擴散率。描述熱能從高溫向低溫**擴散**的過程。

**解的性質**：
- 初始溫度分布 $u(x,0) = f(x)$ 隨時間「磨平」
- 解可用格林函數（高斯核）表示：

$$u(x,t) = \frac{1}{\sqrt{4\pi\alpha t}} \int_{-\infty}^{\infty} f(\xi)\, e^{-\frac{(x-\xi)^2}{4\alpha t}} d\xi$$

此積分本質上是 $f$ 與高斯函數的**卷積**（convolution）。

### 2.2 波方程（Wave Equation）

$$\frac{\partial^2 u}{\partial t^2} = c^2 \nabla^2 u$$

$c$：波速。描述弦振動、聲波、電磁波的傳播。

**d'Alembert 解**（一維）：

$$u(x,t) = \frac{1}{2}\left[f(x+ct) + f(x-ct)\right] + \frac{1}{2c}\int_{x-ct}^{x+ct} g(\xi)\,d\xi$$

初始位移 $f(x)$ 分裂為向左、向右各走一半的波包。

### 2.3 拉普拉斯方程（Laplace Equation）

$$\nabla^2 u = 0$$

描述**穩態**（時間無關）問題：靜電場、引力場、不可壓縮流體位勢。

解稱為**調和函數（harmonic function）**，滿足均值性質：某點的值等於其任意球面上的平均值。

**泊松方程（Poisson Equation）**為有源版本：

$$\nabla^2 u = f(x)$$

其中 $f$ 是源項（電荷密度、熱源等）。

### 2.4 Navier-Stokes 方程

$$\rho\left(\frac{\partial \mathbf{v}}{\partial t} + \mathbf{v}\cdot\nabla\mathbf{v}\right) = -\nabla p + \mu\nabla^2\mathbf{v} + \mathbf{f}$$

$\mathbf{v}$：流速；$p$：壓力；$\mu$：黏滯係數；$\rho$：密度；$\mathbf{f}$：外力。

搭配**連續方程** $\nabla \cdot \mathbf{v} = 0$（不可壓縮），完整描述黏性流體。其光滑解是否全局存在是**千禧年七大難題**之一。

---

## 3. 分類：橢圓、拋物、雙曲

對二階線性 PDE $au_{xx} + 2bu_{xy} + cu_{yy} + \cdots = 0$，判別式 $\Delta = b^2 - ac$ 決定類型：

| 類型 | 條件 | 典型方程 | 物理意義 |
|---|---|---|---|
| **橢圓型** | $\Delta < 0$ | 拉普拉斯方程 | 穩態、平衡 |
| **拋物型** | $\Delta = 0$ | 熱方程 | 擴散、平滑 |
| **雙曲型** | $\Delta > 0$ | 波方程 | 振盪、傳播 |

三種類型對應完全不同的初邊值條件設置與解的正則性。

---

## 4. 求解方法

### 4.1 分離變數法

假設解可分離：$u(x,t) = X(x) \cdot T(t)$

代入熱方程 $u_t = \alpha u_{xx}$：

$$X(x)T'(t) = \alpha X''(x)T(t) \implies \frac{T'}{αT} = \frac{X''}{X} = -\lambda \quad \text{（常數）}$$

各部分化成 ODE，再由邊界條件確定特徵值 $\lambda_n$ 與特徵函數，解為：

$$u(x,t) = \sum_{n=1}^{\infty} c_n X_n(x) e^{-\alpha\lambda_n t}$$

### 4.2 傅立葉變換

對空間做傅立葉變換 $\hat{u}(k,t) = \mathcal{F}[u](k,t)$，熱方程變為：

$$\frac{\partial \hat{u}}{\partial t} = -\alpha k^2 \hat{u} \implies \hat{u}(k,t) = \hat{u}(k,0)\,e^{-\alpha k^2 t}$$

逆變換還原 $u(x,t)$。高頻分量 $k^2$ 大，衰減更快 → 熱方程平滑初始條件的機制。

### 4.3 格林函數（Green's Function）

格林函數 $G(x, x'; t)$ 是點源 $\delta(x-x')$ 在 $t=0$ 的解，一般解為：

$$u(x,t) = \int G(x,x';t)\,f(x')\,dx'$$

熱方程的格林函數是高斯核 $G = \frac{1}{\sqrt{4\pi\alpha t}} e^{-|x-x'|^2/(4\alpha t)}$。

### 4.4 數值方法

**有限差分法（FDM）**：
$$\frac{\partial^2 u}{\partial x^2} \approx \frac{u_{i+1} - 2u_i + u_{i-1}}{(\Delta x)^2}$$

**有限元素法（FEM）**：將解空間投影至有限維子空間，弱形式：

$$\int \nabla u \cdot \nabla v\, dx = \int fv\, dx \quad \forall v \in V_h$$

**譜方法**：以 Fourier 或 Chebyshev 多項式展開，高精度、高計算量。

---

## 5. 隨機微分方程與 Fokker-Planck 方程

**隨機微分方程（SDE）**（Itô 形式）：

$$dx = f(x,t)\,dt + g(t)\,dW_t$$

其中 $dW_t$ 是維納過程（Brownian motion）的增量，$g(t)$ 控制噪聲強度。

SDE 的機率密度 $p(x,t)$ 演化由 **Fokker-Planck 方程**（也稱 Kolmogorov 前向方程）描述：

$$\frac{\partial p}{\partial t} = -\frac{\partial}{\partial x}[f(x,t)p] + \frac{1}{2}\frac{\partial^2}{\partial x^2}[g(t)^2 p]$$

- 第一項（漂移項）：確定性的「推流」
- 第二項（擴散項）：噪聲導致的概率擴散

---

## 6. PDE 與深度學習

### 6.1 擴散模型（Diffusion Models）⭐

Stable Diffusion、DDPM 的理論基礎是**隨機熱方程**。

**前向過程**（加噪）：

$$dx = -\frac{\beta(t)}{2}x\,dt + \sqrt{\beta(t)}\,dW_t$$

隨 $t \to T$，$x$ 收斂至標準高斯 $\mathcal{N}(0, I)$。機率密度滿足 Fokker-Planck 方程（拋物型 PDE）。

**逆向過程**（去噪）：Anderson（1982）證明逆向過程同樣是 SDE：

$$dx = \left[-\frac{\beta(t)}{2}x - \beta(t)\nabla_x \log p_t(x)\right]dt + \sqrt{\beta(t)}\,d\bar{W}_t$$

其中 $\nabla_x \log p_t(x)$ 是 **score function**，由神經網路學習近似。生成圖片 = 求解逆向 SDE。

| 階段 | PDE 對應 |
|---|---|
| 加噪（前向） | Fokker-Planck，拋物型 |
| 去噪（逆向） | 逆向 SDE，score matching |
| 採樣器 | 數值求解 SDE（Euler-Maruyama / DPM-Solver） |

### 6.2 Physics-Informed Neural Networks（PINN）

用神經網路 $u_\theta(x,t)$ 近似 PDE 的解，損失函數同時包含：

$$\mathcal{L} = \underbrace{\lambda_1 \mathcal{L}_{\text{PDE}}}_{\text{內部殘差}} + \underbrace{\lambda_2 \mathcal{L}_{\text{BC}}}_{\text{邊界條件}} + \underbrace{\lambda_3 \mathcal{L}_{\text{data}}}_{\text{量測數據}}$$

$$\mathcal{L}_{\text{PDE}} = \frac{1}{N}\sum_{i=1}^N \left|\mathcal{N}[u_\theta](x_i,t_i)\right|^2$$

$\mathcal{N}[\cdot]$ 是 PDE 算子（例如 $\partial_t u - \alpha \nabla^2 u$），利用自動微分計算偏導數。

**優勢**：無網格、無監督、可融入物理先驗  
**挑戰**：高剛性 PDE 訓練困難、頻譜偏差（spectral bias）

### 6.3 Neural ODE 與 Neural PDE

**Neural ODE**（Chen et al., 2018）：ResNet 殘差連接在深度 → ∞ 的連續極限：

$$\frac{dh}{dt} = f_\theta(h, t), \quad h(0) = h_{\text{input}}$$

推廣至空間維度，特徵圖在空間-深度域演化：

$$\frac{\partial H}{\partial t} = \mathcal{F}_\theta(H, \nabla H, \nabla^2 H, t)$$

此為神經網路定義的 PDE，結合卷積（$\nabla^2$）與深度（$t$）兩個維度。

### 6.4 圖神經網路與圖熱擴散

GNN 的訊息傳遞等價於圖上的**熱方程**：

$$\frac{dH}{dt} = -\mathbf{L} H$$

$\mathbf{L} = D - A$ 是**圖拉普拉斯矩陣**（$D$：度數矩陣，$A$：鄰接矩陣）。

解為 $H(t) = e^{-\mathbf{L}t} H(0)$，$K$ 層 GNN 對應時間步長為 $1/K$ 的離散熱擴散。

- 層數多 → 熱擴散更充分 → **過平滑（over-smoothing）**問題
- 圖 Transformer 在頻域調控擴散，改善此問題

### 6.5 訓練動態：連續時間分析

SGD 在小步長 $\eta$ 極限下可建模為 SDE：

$$d\theta = -\nabla\mathcal{L}(\theta)\,dt + \sqrt{\eta \cdot \text{Cov}[\nabla\mathcal{L}]}\,dW_t$$

參數分布 $\rho(\theta, t)$ 的演化由 Fokker-Planck 方程描述，分析：

- 損失地形中的平衡點與鞍點
- 逃出 sharp minima → 廣闊極小值（泛化更好）
- 學習率調度的 PDE 解讀

### 6.6 注意力機制的 Mean-Field PDE

Transformer 的 Self-Attention 在序列長度 $N \to \infty$ 時，token 演化收斂至**非線性輸運方程**：

$$\frac{\partial \mu}{\partial t} + \nabla \cdot (\mu V[\mu]) = 0$$

$\mu(x,t)$ 是 token 的概率測度，$V[\mu]$ 是 Attention 誘導的速度場（依賴整體分布 → mean-field 耦合）。此為連續深度 Transformer 的理論基礎（研究前沿，2023–2024）。

---

## 7. 求解 PDE 的 AI 加速

| 方法 | 核心思想 | 代表工作 |
|---|---|---|
| **FNO**（Fourier Neural Operator） | 在頻域學習算子 $\mathcal{G}: u_0 \mapsto u$ | Kovachki et al., 2021 |
| **DeepONet** | 分支網路 + 主幹網路逼近算子 | Lu et al., 2021 |
| **PINN** | PDE 殘差進損失 | Raissi et al., 2019 |
| **AlphaFold** | 蛋白折疊 ≈ 能量極小化（橢圓型 PDE） | DeepMind, 2020 |
| **GraphCast** | GNN 求解大氣 PDE | Google DeepMind, 2023 |

---

## 8. 程式碼範例：PINN 求解熱方程

```python
import torch
import torch.nn as nn

class PINN(nn.Module):
    def __init__(self):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(2, 64), nn.Tanh(),
            nn.Linear(64, 64), nn.Tanh(),
            nn.Linear(64, 1)
        )

    def forward(self, x, t):
        return self.net(torch.cat([x, t], dim=1))

def pde_residual(model, x, t, alpha=0.01):
    x.requires_grad_(True); t.requires_grad_(True)
    u = model(x, t)
    u_t = torch.autograd.grad(u.sum(), t, create_graph=True)[0]
    u_x = torch.autograd.grad(u.sum(), x, create_graph=True)[0]
    u_xx = torch.autograd.grad(u_x.sum(), x, create_graph=True)[0]
    return u_t - alpha * u_xx   # 熱方程殘差，應為 0

# 損失 = PDE 殘差² + 初始條件² + 邊界條件²
```

自動微分直接計算 $\partial u/\partial t$、$\partial^2 u/\partial x^2$，無需手動差分格點。

---

## 9. 小結

| 概念 | 核心要點 |
|---|---|
| PDE 定義 | 多自變數函數的偏導方程；三類：橢圓/拋物/雙曲 |
| 四大方程 | 熱方程、波方程、拉普拉斯、Navier-Stokes |
| Fokker-Planck | SDE 的機率密度演化 PDE，擴散模型的理論核心 |
| 擴散模型 | 加噪 = 前向 SDE；去噪 = 逆向 SDE；score function ≈ $\nabla \log p$ |
| PINN | 神經網路 + PDE 殘差損失，無網格求解 |
| GNN | 訊息傳遞 ≡ 圖上熱擴散（圖拉普拉斯） |
| 訓練動態 | SGD → SDE → Fokker-Planck，分析泛化與逃逸 |
