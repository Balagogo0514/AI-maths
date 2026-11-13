# AI 數學筆記庫

AI 所需數學的中文筆記集，涵蓋深度學習核心、機率統計、微積分與分析、線性代數與幾何，以及數論與計算理論。全部以繁體中文撰寫，並含 LaTeX 公式（在 GitHub 上會自動渲染）。

> 共 34 篇筆記。點標題即可開啟對應筆記。

## 深度學習核心

| 筆記 | 內容 |
|---|---|
| [激活函數](docs/Activation-Function.md) | Sigmoid、ReLU、GELU 等：非線性如何讓網路學到複雜函數 |
| [反向傳播](docs/Backpropagation.md) | 以鏈式法則沿計算圖回傳梯度的機制 |
| [梯度下降](docs/Gradient-Descent.md) | LLM 的優化核心，與反向傳播、殘差連接的交互作用 |
| [損失函數](docs/Loss-Function.md) | MSE、交叉熵等：衡量預測與目標的差距並提供梯度 |
| [KV Cache 與 Attention](docs/KV-Cache.md) | 推理加速的關鍵快取，及其對注意力計算的影響 |
| [擴散模型](docs/Diffusion-Model.md) | DDPM 前向/逆向數學、Score SDE、DDIM、CFG、LDM、DiT、Flow Matching；圖像/音訊/蛋白質生成應用 |
| [深度學習演化史](docs/Deep-Learning-History.md) | 八個演化波次（1943–今）：感知機 → 反向傳播 → CNN → ResNet → Seq2Seq → Transformer → 大模型 → 多模態/推理模型；涵蓋 RNN/LSTM/BERT/GPT、Encoder vs Decoder、Transformer 訓練細節（AdamW、Warmup+Cosine LR、BF16 混合精度、ZeRO 分散式並行）；含七張圖示 |
| [Chain-of-Thought 推理](docs/Chain-of-Thought.md) | Few-shot CoT、Zero-shot CoT（17.7%→78.7%）、Self-Consistency（+17.9% GSM8K）、ToT、ReAct、Reflexion（語言 RL、HumanEval 67%→91%）、PoT；計算深度定理（L×T 層等效計算）；DeepSeek-R1 GRPO 四階段訓練；各模型思維鏈可見度比較；API 程式碼範例與 Prompt 誘導模板 |
| [滲流理論與湧現](docs/Percolation.md) | 相變（p_c≈0.593、P∞∼(p−p_c)^β）、臨界指數、重整化群、SIR 模型、網路滲流（ER 圖）、自組織臨界性；LLM 湧現能力類比（BIG-Bench、複合技能閾值、Schaeffer 2023 度量幻覺）；量子滲流（Anderson 局域化、表面碼容錯閾值、MIPT、糾纏滲流）|

## 機率與統計

| 筆記 | 內容 |
|---|---|
| [貝氏定理](docs/Bayes.md) | 條件機率與後驗更新，及其在 AI 的應用 |
| [高斯分布](docs/Gaussian-distribution.md) | 常態分布的定義、性質與證明 |
| [熵](docs/Entropy.md) | 資訊量、交叉熵與 KL 散度的基礎 |
| [資訊論](docs/Information-Theory.md) | Shannon 熵、互資訊、KL 散度、無損壓縮定理、Shannon-Hartley 通道容量；深度學習影響（交叉熵損失、困惑度、IB 假說、SimCLR） |
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
| [調和分析](docs/Harmonic-Analysis.md) | 傅立葉變換、FFT $O(N\log N)$、卷積定理、STFT/小波、圖傅立葉/GCN、RoPE 位置編碼；掛谷猜想與 Fourier 限制猜想（Hong Wang & Zahl 2024 ℝ³ 突破） |
| [偏微分方程](docs/PDE.md) | 熱方程、波方程、拉普拉斯、Navier-Stokes；三類分類；Fokker-Planck；擴散模型逆向 SDE、PINN、GNN 圖熱擴散 |

## 線性代數與幾何

| 筆記 | 內容 |
|---|---|
| [矩陣、內積與外積](docs/Matrix.md) | 向量運算的幾何意義與相對關係 |
| [群、環、域、模](docs/Group-Theory.md) | 代數結構與對稱性，含群論在 AI 的應用 |
| [黎曼幾何](docs/Riemannian-Geometry.md) | 流形、度量、測地線與曲率 |
| [碎形幾何](docs/Fractal.md) | 自相似性、碎形維度、IFS、Mandelbrot 集合、分岔圖與費根鮑姆常數、混沌密碼學 |
| [奇異值分解](docs/SVD.md) | $A=U\Sigma V^\top$ 幾何直覺；Eckart-Young 定理；PCA、推薦系統、LSA、LoRA 微調、譜正規化 |

## 數論與計算理論

| 筆記 | 內容 |
|---|---|
| [質數理論](docs/Prime-Theory.md) | 唯一分解、質數定理、判定與分解、密碼學，含孿生質數與螺旋視覺化 |
| [黎曼猜想](docs/Riemann-Hypothesis.md) | zeta 函數、零點與素數分布 |
| [NP 問題](docs/NP.md) | P/NP、NP-complete 與 AI 的關係，含逐步範例 |
| [區塊鏈理論](docs/Blockchain.md) | SHA-256、ECDSA、Merkle Tree；PoW/PoS/BFT；zk-SNARK/STARK、AMM 恆積公式；量子威脅與 NIST 後量子標準 |
| [賽局理論](docs/Game-Theory.md) | Nash 均衡、囚徒困境、逆向歸納、Folk Theorem、Shapley Value、VCG 機制；GAN、MARL、聯邦學習 |

---

## 閱讀方式

- **GitHub**：直接點上方連結，GitHub 會渲染 Markdown 與 LaTeX 公式。
- **本機**：`git clone` 或 `git pull` 後，用 VS Code（`Ctrl/Cmd+Shift+V` 預覽）、Typora 或 Obsidian 開 `docs/` 下的檔案。
- **互動版**（含公式渲染與圖示）：每篇筆記皆有對應的 HTML 版本，可透過目錄頁一鍵開啟。
