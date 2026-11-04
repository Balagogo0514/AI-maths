# 擴散模型（Diffusion Models）

擴散模型（Diffusion Model）的靈感來自**熱力學第二定律**：有序系統在噪聲擾動下逐漸趨於無序。若能學會**逆轉**這個擴散過程，就能從純雜訊生成真實資料。擴散模型目前是圖像、音訊、蛋白質、分子生成的最強生成範式。

## 1. 核心直覺

```
有序（低熵）→ 加噪聲 → 無序（高熵）   ← 前向，確定性
無序（高熵）← 學習去噪 ← 有序（低熵）  ← 逆向，學習的
```

前向過程（加噪）是已知的物理過程；逆向過程（去噪）由神經網路學習。訓練完成後，從純高斯雜訊出發，反覆執行去噪步驟即可生成資料。

---

## 2. 數學框架

### 2.1 前向過程（加噪）

給定真實資料 $x_0$，逐步加高斯噪聲：

$$q(x_t | x_{t-1}) = \mathcal{N}\!\left(\sqrt{1-\beta_t}\, x_{t-1},\; \beta_t I\right)$$

利用重參數化技巧，可以**一步**從 $x_0$ 採樣任意時間步 $x_t$：

$$x_t = \sqrt{\bar{\alpha}_t}\, x_0 + \sqrt{1 - \bar{\alpha}_t}\, \epsilon, \quad \epsilon \sim \mathcal{N}(0, I)$$

其中 $\bar{\alpha}_t = \prod_{s=1}^t (1 - \beta_s)$，$\beta_t$ 是**噪聲排程（noise schedule）**。

- $t = 0$：原始資料 $x_0$
- $t = T$：幾乎純高斯 $x_T \approx \mathcal{N}(0, I)$

### 2.2 逆向過程（去噪）

逆向條件分布由 Bayes 定理推導，仍是高斯分布：

$$q(x_{t-1}|x_t, x_0) = \mathcal{N}\!\left(\tilde{\mu}_t(x_t, x_0),\; \tilde{\beta}_t I\right)$$

$$\tilde{\mu}_t = \frac{\sqrt{\bar{\alpha}_{t-1}}\,\beta_t}{1-\bar{\alpha}_t} x_0 + \frac{\sqrt{\alpha_t}(1-\bar{\alpha}_{t-1})}{1-\bar{\alpha}_t} x_t$$

神經網路 $\epsilon_\theta(x_t, t)$ 預測加入的噪聲 $\epsilon$，再還原出均值。

### 2.3 損失函數

DDPM 的訓練目標（ELBO 的簡化形式）：

$$\mathcal{L} = \mathbb{E}_{t,\, x_0,\, \epsilon}\!\left[\|\epsilon - \epsilon_\theta(x_t, t)\|^2\right]$$

**直覺**：讓網路在每個時間步 $t$ 學會「猜出加了什麼噪聲」。訓練穩定，無 GAN 的對抗訓練困難。

### 2.4 採樣（DDPM）

給定 $x_T \sim \mathcal{N}(0,I)$，逐步去噪：

$$x_{t-1} = \frac{1}{\sqrt{\alpha_t}}\!\left(x_t - \frac{1-\alpha_t}{\sqrt{1-\bar{\alpha}_t}}\,\epsilon_\theta(x_t, t)\right) + \sigma_t z, \quad z \sim \mathcal{N}(0,I)$$

共需 $T$（通常 1000）步，每步一次神經網路前向計算。

---

## 3. Score-based SDE：統一框架

Song et al.（2021）將離散步驟推廣為**連續隨機微分方程**：

$$dx = f(x,t)\,dt + g(t)\,dW_t \quad \text{（前向 SDE）}$$

**逆向 SDE**（Anderson, 1982）：

$$dx = \left[f(x,t) - g(t)^2\, \underbrace{\nabla_x \log p_t(x)}_{\text{score function}}\right]dt + g(t)\,d\bar{W}_t$$

神經網路學習 **score function** $s_\theta(x,t) \approx \nabla_x \log p_t(x)$，訓練目標稱為 **score matching**：

$$\mathcal{L}_{\text{SM}} = \mathbb{E}_{t, x_t}\!\left[\|s_\theta(x_t,t) - \nabla_{x_t}\log q(x_t|x_0)\|^2\right]$$

DDPM 是此框架的特例（$f(x,t) = -\frac{1}{2}\beta(t)x$，$g(t) = \sqrt{\beta(t)}$）。

---

## 4. 加速採樣

DDPM 的 1000 步採樣是主要缺點，多種方法大幅加速：

### 4.1 DDIM（確定性採樣）

DDIM（Song et al., 2020）利用對應的**確定性 ODE**：

$$dx = \left[f(x,t) - \frac{1}{2}g(t)^2\,s_\theta(x,t)\right]dt$$

與 SDE 具有相同的邊際分布，但去除了隨機項，可用 10–50 步完成生成，且結果可複現。

### 4.2 DPM-Solver

將逆向 ODE 改寫為指數積分形式，高階數值解法在 20 步內達到 DDPM 1000 步的品質。

### 4.3 Consistency Models

由 Song et al.（2023）提出，訓練一個函數 $f_\theta(x_t, t) \approx x_0$，對任意 $t$ 直接映射到原始資料，實現**1–2 步採樣**。

---

## 5. 條件生成與引導

### 5.1 Classifier Guidance

訓練一個外部分類器 $p_\phi(c|x_t)$，採樣時加入梯度引導：

$$\hat{\epsilon} = \epsilon_\theta(x_t, t) - \sqrt{1-\bar{\alpha}_t}\,\nabla_{x_t}\log p_\phi(c|x_t)$$

需要在每個噪聲層級訓練分類器，繁瑣。

### 5.2 Classifier-Free Guidance（CFG）

Ho & Salimans（2021）的主流方法，訓練時隨機以機率 $p$ 丟棄條件 $c$：

$$\epsilon_{\text{guided}} = \epsilon_\theta(x_t, \emptyset) + w \cdot \bigl[\epsilon_\theta(x_t, c) - \epsilon_\theta(x_t, \emptyset)\bigr]$$

- $w$：引導強度（guidance scale），通常 7–15
- $w$ 越大：越符合條件，多樣性降低
- 一個模型同時學有條件/無條件，無需外部分類器

---

## 6. Latent Diffusion Model（LDM）

像素空間的擴散計算量巨大（$512\times512 \times 3 = 786432$ 維）。**LDM（Rombach et al., 2022）** 在低維潛在空間做擴散：

```
圖像 ──Encoder──▶ z₀（64×64×4）──加噪──▶ z_T
                                              │
                              擴散模型在 z 空間去噪
                                              │
圖像 ◀──Decoder── z₀ ◀──────────────────────
```

- Encoder/Decoder：預訓練的 VQ-VAE 或 KL-VAE，訓練後**凍結**
- 文字條件：CLIP 編碼後透過 Cross-Attention 注入 U-Net
- **Stable Diffusion** 即基於此架構，計算量降低約 20×

---

## 7. 網路架構

### 7.1 U-Net（主流架構）

以 U-Net 為骨幹，加入：
- **時間嵌入**：$t$ 透過 sinusoidal embedding → MLP，以 AdaGN 注入每個 ResBlock
- **Self-Attention**：在中間層（$16\times16$、$8\times8$）加入
- **Cross-Attention**：文字/類別條件注入

### 7.2 Diffusion Transformer（DiT）

Peebles & Xie（2023）以 **Transformer 取代 U-Net**：

- 將 latent 分割為 patch → 序列輸入 Transformer
- 條件（$t$、類別）透過 adaLN-Zero 注入
- 更好的 scaling law：DiT-XL/2 超越當時所有 U-Net 模型
- **Sora** 推測基於此架構

---

## 8. 主要應用

### 8.1 圖像生成

| 模型 | 機構 | 核心技術 |
|---|---|---|
| **DALL-E 3** | OpenAI | CLIP 引導 + CFG |
| **Stable Diffusion 3** | Stability AI | Flow Matching + DiT |
| **Imagen 3** | Google | 超解析度串聯擴散 |
| **Flux** | Black Forest Labs | Rectified Flow + DiT |

### 8.2 音訊生成

- **WaveGrad / DiffWave**：波形層級語音合成
- **AudioLDM 2**：在音訊 latent space 擴散
- **MusicLM + MusicLDM**：音樂生成

### 8.3 影片生成

- **Sora**（OpenAI）：推測為 Spacetime Patches + DiT
- **CogVideo / VideoLDM**：在時間維度加入 3D Attention
- **挑戰**：時間一致性 + 計算量 $O(\text{frames} \times T)$

### 8.4 蛋白質結構設計

- **RFdiffusion**（Baker Lab）：在蛋白質 backbone 的 SE(3) 空間做擴散，從頭設計功能性蛋白質
- **FrameDiff**：等變擴散，原子座標嚴格保持旋轉/平移不變性

### 8.5 分子生成（藥物設計）

- **DiffSBDD / TargetDiff**：生成與蛋白質口袋結合的 3D 分子
- 連續空間（原子座標）+ 離散空間（原子類型）混合擴散

---

## 9. 與其他生成模型比較

| 模型 | 優點 | 缺點 |
|---|---|---|
| **GAN** | 採樣快（單步）、解析度高 | 訓練不穩、模式崩塌 |
| **VAE** | 結構清晰、速度快 | 生成品質較低、影像模糊 |
| **Normalizing Flow** | 精確似然、可逆 | 架構限制多、計算重 |
| **Diffusion** | 品質最高、訓練穩定 | 原始採樣慢（多步） |
| **Consistency Model** | 1–2 步採樣、高品質 | 訓練較複雜 |

---

## 10. 最新進展（2023–2025）

| 方向 | 重點 |
|---|---|
| **Flow Matching** | 直線化 ODE 路徑，SD3 / Flux 採用，採樣更快更穩定 |
| **Rectified Flow** | InstaFlow，反覆蒸餾使軌跡越來越直 |
| **Discrete Diffusion** | 文字 token 的擴散（MDM / D3PM / MDLM） |
| **DiT Scaling** | 與 LLM 同樣的 scaling law，更大模型品質持續提升 |
| **Video DiT** | Sora / Movie Gen，時空 patch 擴散 |
| **Distillation** | 將 1000 步 Diffusion 蒸餾至 1–4 步（ADD、LCM、Turbo） |

---

## 11. 小結

| 概念 | 核心要點 |
|---|---|
| 前向過程 | 逐步加高斯噪聲，$t$ 步可一次採樣 |
| 逆向過程 | 學習 $\epsilon_\theta$ 或 score function，逐步去噪 |
| 損失函數 | 預測噪聲的 MSE，訓練穩定無對抗 |
| Score SDE | 連續化統一框架；DDPM 為特例 |
| CFG | 無需外部分類器的條件引導，$w$ 控制強度 |
| LDM | 在潛在空間擴散，計算量降低 20× |
| DiT | Transformer 骨幹，更好的 scaling |
| 加速採樣 | DDIM → DPM-Solver → Consistency Model → Flow Matching |
