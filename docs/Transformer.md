# Transformer 架構詳解

Transformer（Vaswani et al. 2017，*Attention Is All You Need*）是現代大型語言模型的基礎架構。
它完全放棄 RNN 的順序遞推，改以 **Attention** 在序列任意兩個位置之間直接建立依賴關係，
搭配殘差連接與層正規化，使得深層堆疊成為可能。

---

## 1. 全局結構

原始 Transformer 為 **Encoder-Decoder** 設計，現代 LLM 多採 **Decoder-only**：

![Transformer 架構與三種變體比較](figures/transformer-arch.svg)

| 架構 | Attention 方向 | 訓練任務 | 適合用途 |
|---|---|---|---|
| **Encoder-only** | 雙向（全局）| MLM 遮蔽預測 | 分類、NER、語意相似 |
| **Decoder-only** | 因果（左→右）| CLM 下一詞預測 | 生成、對話、推理 |
| **Encoder-Decoder** | 雙向+因果+Cross | Seq2Seq 配對 | 翻譯、摘要、問答生成 |

**Decoder-only 成為主流的原因**：
- 預訓練數據量遠大於任務標注數據，Causal LM 可用所有文本訓練
- Few-shot/Zero-shot 直接 prompt 即可
- 架構更簡單（無 Encoder + Cross-Attention）

---

## 2. 殘差連接與正規化

每個子層（Attention 或 FFN）都包裹在殘差連接中：

$$
\text{output} = x + \text{Sublayer}(\text{Norm}(x)) \quad \text{（Pre-LN，現代主流）}
$$

$$
\text{output} = \text{Norm}(x + \text{Sublayer}(x)) \quad \text{（Post-LN，原始）}
$$

**殘差連接的作用**：梯度可「跳過」子層直接流回，子層只需學「修正量」$\Delta x$，
而非從零映射 $x \to y$，大幅降低優化難度。

### 2.1 LayerNorm vs RMSNorm

**LayerNorm**：對一個 token 的全部 $d$ 個維度計算均值與方差並標準化：

$$
\text{LN}(x) = \frac{x - \mu}{\sigma + \varepsilon} \cdot \gamma + \beta, \quad \mu = \frac{1}{d}\sum x_i,\; \sigma^2 = \frac{1}{d}\sum (x_i - \mu)^2
$$

**RMSNorm**（LLaMA、Qwen 採用）：去掉均值計算，只除以均方根：

$$
\text{RMS}(x) = \sqrt{\frac{1}{d}\sum_{i=1}^d x_i^2}, \qquad \text{RMSNorm}(x) = \frac{x}{\text{RMS}(x)} \cdot \gamma
$$

省略均值計算，速度快約 15%，實驗效果相當。

| | Pre-LN | Post-LN |
|---|---|---|
| 訓練穩定性 | 更穩定，可用較大 lr | 需 warmup，早期不穩 |
| 最終性能 | 普遍採用 | 部分研究略優 |
| 代表模型 | LLaMA、GPT-3、Qwen | 原始 Transformer、BERT |

---

## 3. Feed-Forward Network（FFN）

每個 Attention 層後面都跟一個 FFN，負責**逐 token 的非線性變換**（Attention 負責跨 token 聚合）：

$$
\text{Standard FFN}(x) = \text{ReLU}(xW_1 + b_1)\,W_2 + b_2, \quad d_\text{ff} = 4 \times d_\text{model}
$$

**SwiGLU**（LLaMA、PaLM、Qwen，現代主流）：

$$
\text{SwiGLU}(x) = \big(\text{Swish}(xW_1) \odot xW_2\big)\,W_3
$$

$$
\text{Swish}(z) = z \cdot \sigma(z) \quad \text{（平滑版 ReLU，無死區）}
$$

閘控機制（$\odot$ 逐元素乘）讓模型動態選擇哪些維度通過，性能明顯優於 ReLU/GELU。

![FFN 變體、殘差正規化、參數分布](figures/transformer-components.svg)

| FFN 變體 | 激活函數 | 閘控 | 代表模型 |
|---|---|---|---|
| Standard | ReLU | ✗ | 原始 Transformer |
| GELU FFN | GELU | ✗ | BERT、GPT-2 |
| **SwiGLU** | Swish + GLU | ✓ | LLaMA-3、PaLM、Qwen |
| GeGLU | GELU + GLU | ✓ | T5 v1.1 |

**參數比例**：FFN 通常占每層參數的 **60–65%**，Attention 占 35–40%（Attention : FFN ≈ 1 : 2）。

---

## 4. 完整參數量計算

以 GPT-2 small（$L=12$，$d=768$，$H=12$，$d_\text{ff}=3072$，$V=50257$）為例：

$$
\underbrace{V \times d}_{\text{Token Emb}} + \underbrace{n_\text{ctx} \times d}_{\text{Pos Emb}} + L \times \underbrace{\left(3d^2 + d^2 + 2d \cdot d_\text{ff}\right)}_{\text{每層 Attn+FFN}}
$$

$$
= 50257 \times 768 + 1024 \times 768 + 12 \times (3 \times 768^2 + 768^2 + 2 \times 768 \times 3072)
$$

$$
= 38.6\text{M} + 0.8\text{M} + 12 \times 7.08\text{M} \approx 124\text{M 參數}
$$

![代表模型參數對比、Scaling Law、GPT-2 計算](figures/transformer-scaling.svg)

---

## 5. Scaling Law 與最優配置

Kaplan et al. 2020 的冪律：

$$
L(N, D) \propto \left(\frac{N_c}{N}\right)^{\alpha_N} + \left(\frac{D_c}{D}\right)^{\alpha_D}
$$

其中 $\alpha_N \approx 0.073$，$\alpha_D \approx 0.050$（OpenAI 原始估計）。

**Chinchilla（Hoffmann et al. 2022）**：最優訓練配比為

$$
D^* = 20N \quad \text{（token 數應為參數量的 20 倍）}
$$

LLaMA-3 8B 以 15 兆 tokens 訓練（大幅超出 Chinchilla 最優），
犧牲訓練效率換取推理時的高性能（over-training 策略）。

**深度 vs 寬度**：相同參數量下，增加層數（深度）通常比增加 $d_\text{model}$（寬度）更有效率，
這也是為什麼大模型傾向於深而窄（例如 GPT-3：96 層，$d=12288$）。

| 模型 | 層數 | d_model | 頭數 | d_ff | 參數 |
|---|---|---|---|---|---|
| GPT-2 small | 12 | 768 | 12 | 3072 | 117M |
| GPT-2 XL | 48 | 1600 | 25 | 6400 | 1.5B |
| GPT-3 | 96 | 12288 | 96 | 49152 | 175B |
| LLaMA-3 8B | 32 | 4096 | 32 | 14336 | 8B |
| LLaMA-3 70B | 80 | 8192 | 64 | 28672 | 70B |
| DeepSeek-V3 | 61 | 7168 | 128 | 18432 | 671B（MoE）|

---

## 6. MoE（Mixture of Experts）稀疏化

現代超大模型以 **稀疏 MoE** 取代標準 FFN，解耦參數量與計算量：

$$
\text{MoE}(x) = \sum_{i=1}^{K} g_i(x) \cdot \text{Expert}_i(x), \quad g_i(x) = \text{softmax}\!\left(\text{top-K}(xW_g)\right)_i
$$

每個 token 只激活 $K$ 個（通常 $K=2$ 或 $K=8$）Expert FFN，其餘 $N-K$ 個不計算。

**工程挑戰**：
- **Expert 崩塌**：所有 token 傾向選同幾個 Expert → 加入**負載均衡輔助損失**
- **通訊開銷**：分散式訓練時不同 Expert 在不同 GPU → all-to-all 通訊
- **推理記憶體**：所有 Expert 參數必須常駐 GPU，即便大多數不激活

**代表模型**：
- Mixtral 8×7B：8 個 Expert，每次激活 2 個；等效計算量約 12.9B 密集模型
- DeepSeek-V3：671B 總參數，37B 激活；訓練成本僅 2.78M H800 GPU 小時

---

## 7. 與 KV Cache 的關係

Transformer 的 Attention 形式決定 KV Cache 的使用方式：

- **Decoder-only（Causal）**：每次生成新 token 只需計算新 Q，
  歷史 K/V 已快取 → $O(nd)$ 而非 $O(n^2 d)$
- **MHA → GQA/MQA**：KV 頭數從 $H$ 減到 $G$（$G \ll H$），
  KV Cache 縮小 $H/G$ 倍（LLaMA-3 70B：64 Q 頭 / 8 KV 頭 → Cache 縮 8×）
- **Flash Attention**：Tiling + Online Softmax，
  訓練時 $O(n^2)$ HBM 讀寫降到 $O(n)$，速度快 2–4×

詳見 [KV Cache 與 Attention 機制](KV-Cache.md)。

---

## 8. BERT：雙向預訓練的 Encoder

> BERT（Devlin et al. 2018，Google）是 Transformer Encoder 的最重要應用，
> 開啟了「預訓練 → Fine-tune」的 NLP 新範式。

### 8.1 核心差異：單向 vs 雙向

```
GPT（Decoder-only）：「他把 _」只看左側 → 只能用前文
BERT（Encoder-only）：「他把 [MASK] 放進了背包」← 左右都看
```

雙向 Attention 讓每個 token 能同時利用完整上下文，
理解任務（分類、問答、NER）因此顯著受益；
但雙向模型**不能自回歸生成**——生成第 $t$ 個詞時不能看 $t+1$。

### 8.2 架構

純 Encoder Stack，無 Decoder，無 Causal Mask：

```
[CLS] token₁ token₂ … [SEP] （+ 句B tokens + [SEP]）
       ↓
Token Embedding
  + Segment Embedding（句 A → Eₐ，句 B → E_B）
  + Position Embedding（Learned，非 Sinusoidal）
       ↓
Bidirectional Self-Attention × L 層
       ↓
h_[CLS], h₁, h₂, …, hₙ
```

| | BERT-base | BERT-large |
|---|---|---|
| 層數 | 12 | 24 |
| d_model | 768 | 1024 |
| 頭數 | 12 | 16 |
| 參數量 | **110M** | **340M** |

### 8.3 預訓練任務

#### MLM（Masked Language Modeling）

隨機遮蔽 **15%** token，要求模型還原：

$$
\mathcal{L}_\text{MLM} = -\sum_{i \in \text{masked}} \log P(x_i \mid \tilde{x})
$$

遮蔽策略（15% 中）：
- **80%** → `[MASK]`
- **10%** → 隨機替換為其他詞
- **10%** → 保持原詞不變

加入後兩種是為了縮小預訓練（有 `[MASK]`）與 fine-tuning（無 `[MASK]`）的分佈差距。

#### NSP（Next Sentence Prediction）

給兩個句子，預測 B 是否是 A 的下一句（二元分類，從 `[CLS]` 隱狀態輸出）：

```
50% IsNext：  A = "天氣很好。"  B = "我決定去散步。"  → IsNext
50% NotNext： A = "天氣很好。"  B = "股市今日大漲。"  → NotNext
```

> **RoBERTa（2019）後來發現 NSP 效果存疑**：NotNext 範例來自不同段落，
> 模型可能只是學主題差異而非真正的句間邏輯，移除 NSP 後性能反而提升。

### 8.4 Fine-tuning 下游任務

預訓練後加一個小型分類頭，fine-tune 全部參數：

| 任務 | 輸入格式 | 分類頭 |
|---|---|---|
| 句子分類（情感、主題）| `[CLS] 句子 [SEP]` | `h_[CLS]` → Linear |
| 句對分類（NLI）| `[CLS] 句A [SEP] 句B [SEP]` | `h_[CLS]` → Linear |
| 問答（SQuAD）| `[CLS] 問題 [SEP] 段落 [SEP]` | 每個 token → 預測 start/end |
| NER | `[CLS] 句子 [SEP]` | 每個 token → 類別標籤 |

BERT 一次性在 11 個 NLP 任務刷新 SOTA，確立了「預訓練語言模型」的中心地位。

### 8.5 重要後繼模型

| 模型 | 核心改進 |
|---|---|
| **RoBERTa**（Meta 2019）| 去除 NSP、動態遮蔽、更大 batch（8K）、160GB 語料 |
| **ALBERT**（Google 2019）| 跨層參數共享 + Factorized Embedding → 大幅減少參數 |
| **DistilBERT**（HuggingFace 2019）| 知識蒸餾：60% 參數、40% 加速，保留 97% 性能 |
| **ELECTRA**（Google 2020）| 替換 token 偵測，全部 token 都算損失（比 MLM 效率高 4×）|
| **DeBERTa**（Microsoft 2020）| Disentangled Attention：內容向量與位置向量分開做 Attention |

**ELECTRA 的巧思**：

```
Generator（小 BERT）：MLM 還原遮蔽詞（可能還原為錯詞）
Discriminator（ELECTRA）：對每個 token 判斷「是原詞還是被替換」

損失覆蓋全部 token（而非只 15%）
→ 相同計算量下，有效學習訊號是 BERT 的 ~4× 以上
```

---

## 9. 一句話記憶

$$
\text{Transformer Block} = \underbrace{x + \text{Attn}(\text{Norm}(x))}_{\text{跨 token 聚合資訊}} + \underbrace{x + \text{FFN}(\text{Norm}(x))}_{\text{逐 token 非線性變換}}
$$

**深度**帶來表達能力，**寬度**帶來記憶容量，**MoE** 解耦兩者，
**Attention** 負責全局路由，**FFN** 負責局部精煉。

---

## 參考文獻

- Vaswani, A. et al. (2017). *Attention Is All You Need*. NeurIPS.
- Brown, T. et al. (2020). *Language Models are Few-Shot Learners*. NeurIPS. (GPT-3)
- Kaplan, J. et al. (2020). *Scaling Laws for Neural Language Models*. arXiv:2001.08361.
- Hoffmann, J. et al. (2022). *Training Compute-Optimal Large Language Models*. arXiv:2203.15556. (Chinchilla)
- Touvron, H. et al. (2023). *LLaMA: Open and Efficient Foundation Language Models*. arXiv:2302.13971.
- Shazeer, N. (2020). *GLU Variants Improve Transformer*. arXiv:2002.05202. (SwiGLU)
- Zhang, B. & Sennrich, R. (2019). *Root Mean Square Layer Normalization*. NeurIPS.
- Fedus, W. et al. (2022). *Switch Transformers: Scaling to Trillion Parameter Models*. JMLR. (MoE)
- DeepSeek-AI. (2024). *DeepSeek-V3 Technical Report*. arXiv:2412.19437.
