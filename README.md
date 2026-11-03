# AI 數學筆記庫

AI 所需數學的中文筆記集，涵蓋深度學習核心、機率統計、微積分與分析、線性代數與幾何，以及數論與計算理論。全部以繁體中文撰寫，並含 LaTeX 公式（在 GitHub 上會自動渲染）。

> 共 23 篇筆記。點標題即可開啟對應筆記。

## 深度學習核心

| 筆記 | 內容 |
|---|---|
| [激活函數](docs/Activation-Function.md) | Sigmoid、ReLU、GELU 等：非線性如何讓網路學到複雜函數 |
| [反向傳播](docs/Backpropagation.md) | 以鏈式法則沿計算圖回傳梯度的機制 |
| [梯度下降](docs/Gradient-Descent.md) | LLM 的優化核心，與反向傳播、殘差連接的交互作用 |
| [損失函數](docs/Loss-Function.md) | MSE、交叉熵等：衡量預測與目標的差距並提供梯度 |
| [KV Cache 與 Attention](docs/KV-Cache.md) | 推理加速的關鍵快取，及其對注意力計算的影響 |

## 機率與統計

| 筆記 | 內容 |
|---|---|
| [貝氏定理](docs/Bayes.md) | 條件機率與後驗更新，及其在 AI 的應用 |
| [高斯分布](docs/Gaussian-distribution.md) | 常態分布的定義、性質與證明 |
| [熵](docs/Entropy.md) | 資訊量、交叉熵與 KL 散度的基礎 |
| [馬可夫鏈與 HMM](docs/Markov-Chain.md) | 狀態轉移與隱馬可夫模型 |
| [波茲曼方程](docs/Boltzmann-Equation.md) | 統計力學分布，連結能量與機率 |

## 微積分與分析

| 筆記 | 內容 |
|---|---|
| [鏈式法則](docs/Chain-Rule.md) | 複合函數求導，反向傳播的數學根基 |
| [泰勒展開](docs/Taylor.md) | 以多項式逼近函數的推導與證明 |
| [對數](docs/Logarithm.md) | 定義、基本公式與證明 |
| [傅立葉級數](docs/Fourier-Series.md) | 週期函數的頻率分解 |
| [柯西方程](docs/Cauchy-Equation.md) | 函數方程與其解的結構 |
| [歐拉恆等式](docs/Euler-Identity.md) | $e^{i\pi}+1=0$ 的多種證明 |
| [三角函數](docs/Trigonometric-Functions.md) | 定義、單位圓與在 AI 的作用 |

## 線性代數與幾何

| 筆記 | 內容 |
|---|---|
| [矩陣、內積與外積](docs/Matrix.md) | 向量運算的幾何意義與相對關係 |
| [群、環、域、模](docs/Group-Theory.md) | 代數結構與對稱性，含群論在 AI 的應用 |
| [黎曼幾何](docs/Riemannian-Geometry.md) | 流形、度量、測地線與曲率 |

## 數論與計算理論

| 筆記 | 內容 |
|---|---|
| [質數理論](docs/Prime-Theory.md) | 唯一分解、質數定理、判定與分解、密碼學 |
| [黎曼猜想](docs/Riemann-Hypothesis.md) | zeta 函數、零點與素數分布 |
| [NP 問題](docs/NP.md) | P/NP、NP-complete 與 AI 的關係，含逐步範例 |

---

## 閱讀方式

- **GitHub**：直接點上方連結，GitHub 會渲染 Markdown 與 LaTeX 公式。
- **本機**：`git clone` 或 `git pull` 後，用 VS Code（`Ctrl/Cmd+Shift+V` 預覽）、Typora 或 Obsidian 開 `docs/` 下的檔案。
