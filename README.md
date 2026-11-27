# AI 數學筆記庫

AI 所需數學的中文筆記集，涵蓋深度學習核心、機率統計、微積分與分析、線性代數與幾何，以及數論與計算理論。全部以繁體中文撰寫，並含 LaTeX 公式（在 GitHub 上會自動渲染）。

> 共 40 篇筆記。點標題即可開啟對應筆記。

## 深度學習核心

| 筆記 | 內容 |
|---|---|
| [激活函數](docs/Activation-Function.md) | Sigmoid、ReLU、GELU 等：非線性如何讓網路學到複雜函數 |
| [反向傳播](docs/Backpropagation.md) | 以鏈式法則沿計算圖回傳梯度的機制 |
| [梯度下降](docs/Gradient-Descent.md) | LLM 的優化核心，與反向傳播、殘差連接的交互作用 |
| [損失函數](docs/Loss-Function.md) | MSE、交叉熵等：衡量預測與目標的差距並提供梯度 |
| [KV Cache 與 Attention 機制](docs/KV-Cache.md) | Scaled Dot-Product Attention（Q/K/V、√dₖ 縮放）、Multi-Head、三種 Attention 形式、位置編碼（Sinusoidal/RoPE/ALiBi）、Flash Attention（Tiling + Online Softmax）；KV Cache 原理（Prefill/Decode）、MHA/MQA/GQA、Paged Attention、量化 KV Cache、跨請求的 prefix caching、多請求同時服務時的 cache 管理、KV cache 的記憶體帳、Paged Attention、超長上下文與多 GPU 協同、KV Cache 與 Flash Attention 的分工（含示意圖）|
| [LLM 的記憶體配置與使用](docs/LLM-Memory.md) | 權重、KV cache、啟動值、訓練狀態四類資料；容量／頻寬／延遲；記憶體階層（暫存器、SRAM、HBM、NVLink、DRAM、SSD）；HBM 的容量與頻寬對 KV cache 的影響（含百萬 token 與離開 HBM 的代價）；推論與訓練的記憶體組成（70B：140 GB 權重、每參數 16 B 的訓練狀態）；ZeRO 切分；MoE 與記憶體（總參數 vs 啟用參數、批次與被碰到的專家數）；MoE 與專家並行（all-to-all 通訊、負載不均）；MoE 與 Router（top-k 選擇、梯度、崩潰）；MoE 與 Load Balancing（輔助損失、容量上限、平衡的代價）；MoE 與 Expert Choice（專家選 token、專家數不固定、因果性與批次依賴）；MoE 與 Shared Expert（通用知識只存一份、讀取／通訊／容量的取捨）；MoE 與 Fine-grained Expert（切細專家、組合數、通訊與單卡負載）；MoE 與 Auxiliary Loss（f×P 結構、強度取捨、z-loss）；MoE 與 Capacity Factor（容量與緩衝區、丟棄與浪費、丟誰與小批次）；MoE 與 Token Dropping（位置偏誤、輸出誤差、批次依賴、dropless 的取捨）；省記憶體手段（量化、GQA、Flash Attention、checkpointing）；單卡預算規劃（含示意圖）|
| [擴散模型](docs/Diffusion-Model.md) | DDPM 前向/逆向數學、Score SDE、DDIM、CFG、LDM；**DiT**（Patch 化、adaLN-Zero、Scaling Law FID ∝ GFLOPs⁻ᵅ）、**Cross-Attention 文字條件注入**（Q=圖像/K,V=文字）、**Sora 時空 Patch**、**MMDiT/SD3/FLUX**；骨幹演進時間線；Flow Matching；圖像/音訊/蛋白質/分子生成應用 |
| [深度學習演化史](docs/Deep-Learning-History.md) | 八個演化波次（1943–今）：感知機 → 反向傳播 → CNN → ResNet → Seq2Seq → Transformer → 大模型 → 多模態/推理模型；涵蓋 RNN/LSTM/BERT/GPT、Encoder vs Decoder、Transformer 訓練細節（AdamW、Warmup+Cosine LR、BF16 混合精度、ZeRO 分散式並行）；含七張圖示 |
| [Transformer 架構](docs/Transformer.md) | Encoder-Decoder 全局結構、殘差連接（Pre/Post-LN）、RMSNorm、FFN/SwiGLU、Scaling Law（Chinchilla D*=20N）、MoE；**BERT**（雙向 Attention、MLM/NSP、RoBERTa/ELECTRA 等後繼）；**GPT 系列**（Causal LM、ICL、InstructGPT RLHF 三階段、GPT-4 多模態）；**Mamba/SSM**（選擇性狀態空間、並行 Scan、Mamba-2）；**Transformer vs CNN/RNN**；**DiT/Diffusion**（骨幹框架分離、Cross-Attention 條件注入、adaLN-Zero、Scaling Law、Sora 時空 Patch、MMDiT）|
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
| [雅可比矩陣](docs/Matrix-Jacobian.md) | 多變數函數的導數：局部線性近似（誤差為二階小量）、極座標例子、梯度／一維／線性函數的特例、鏈式法則與前向／反向模式（反向傳播）、行列式與換元積分、機率密度的變數變換與流模型、動力系統的穩定性（Hénon 映射、Collatz 循環的乘數）、反函數定理；含六張圖（排列與形狀、局部線性、反向傳播、行列式與面積、密度變換、動力系統）與數值驗證 |

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
| [黎曼猜想](docs/Riemann-Hypothesis.md) | zeta 函數、零點與素數分布；§14 應用與條件結果（RH 的等價陳述、GRH 條件結果、與物理的類比） |
| [NP 問題](docs/NP.md) | P/NP、NP-complete 與 AI 的關係，含逐步範例 |
| [區塊鏈理論](docs/Blockchain.md) | SHA-256、ECDSA、Merkle Tree；PoW/PoS/BFT；zk-SNARK/STARK、AMM 恆積公式；量子威脅與 NIST 後量子標準 |
| [冰雹猜想](docs/Collatz.md) | 3n+1 問題（考拉茲／角谷／敘拉古猜想）：定義與別名、軌道與紀錄保持者、反向樹、隨機漂移模型（步數≈10.43 ln n）、為什麼這麼難、已知結果（Conway 不可判定性、Tao 2019「幾乎所有軌道」、驗證至 2⁶⁸）、推廣與變形（qn+r 家族、F₂[x] 類比、複平面延拓、Juggler）、與本庫的連結；含軌道與停止時間散布、反向樹與進展時間線、變形對照、複平面碎形共四組圖示；第 3 章另列於下兩篇 |
| [冰雹猜想（續）](docs/Collatz-Connections.md) | Collatz 第 3 章前半（§3.0–§3.12）：Syracuse 映射與等價陳述、2-進位／3-進位觀點、§3.0 特殊數列對照總表；與 Mersenne、Fibonacci、Lucas、Catalan、Bernoulli、Euler 數與 e、Stirling、Pell、Motzkin、Fermat 的關係（真實連結／類比／無關係，標明已驗證與記憶）；共十三組圖示 |
| [冰雹猜想（續二）](docs/Collatz-Functions.md) | Collatz 第 3 章後半（§3.13–§3.26）：與 Riemann zeta 及動力 zeta（含 ζ 零點檢查）、Dirichlet 級數、Möbius 函數、Lambert W、Gamma 函數、Euler 乘積、Selberg 跡公式、Hecke 算子、Ramanujan 求和、Mellin／Fourier／Laplace 變換、Gauss 求和、Bernoulli 多項式的關係檢查（多數「無已知關係」，並標明已驗證與記憶）；拆檔是因為單頁公式過多時 GitHub 會有大量公式無法渲染；共十五組圖示 |
| [賽局理論](docs/Game-Theory.md) | Nash 均衡、囚徒困境、逆向歸納、Folk Theorem、Shapley Value、VCG 機制；GAN、MARL、聯邦學習 |

---

## 閱讀方式

- **GitHub**：直接點上方連結，GitHub 會渲染 Markdown 與 LaTeX 公式。
- **本機**：`git clone` 或 `git pull` 後，用 VS Code（`Ctrl/Cmd+Shift+V` 預覽）、Typora 或 Obsidian 開 `docs/` 下的檔案。
- **互動版**（含公式渲染與圖示）：每篇筆記皆有對應的 HTML 版本，可透過目錄頁一鍵開啟。
