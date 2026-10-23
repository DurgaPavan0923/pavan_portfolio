# Underwater Environmental Analytics & Water Potability — Evaluation Methodology & Empirical Benchmark

## 1. Executive Summary
This evaluation assesses the machine learning models and deterministic audit guardrails developed in the research project **"Development of an AI-Based Model to Detect and Predict Underwater Environmental Changes Using Water Quality Parameters"**, conducted during the Student Internship at the **Technology Innovation Hub (TIH), Indian Institute of Technology (IIT) Guwahati**.

The production system operates on a dual-track architecture:
1. **Track B (Static Physicochemical Quality & Potability):** Evaluates 9 bulk water quality features ($N=3,276$) against calibrated tree ensembles and regulatory envelopes (WHO & EPA standards).
2. **Track A (Continuous Telemetry Stream & Forecasting):** Ingests sequential oceanographic sensor readings ($N=720$) to predict Dissolved Oxygen (DO) dynamics and detect multi-sensor boundary anomalies via Isolation Forest ($\nu=0.021$).

Source Code & Repository: [`https://github.com/DurgaPavan0923/water_potability`](https://github.com/DurgaPavan0923/water_potability)  
Live Production Dashboard: [`https://water-potability-vert.vercel.app/`](https://water-potability-vert.vercel.app/)

---

## 2. Benchmark Datasets & Splits
- **Track B Tabular Partition:**
  - Total Samples ($N$): 3,276 water samples across 9 physicochemical parameters: pH, Hardness, Solids (TDS), Chloramines, Sulfate, Conductivity, Organic Carbon (TOC), Trihalomethanes (THM), and Turbidity.
  - Development Split: 80% ($N=2,620$) partitioned into 5 Stratified Folds for hyperparameter tuning and Platt probability calibrator fitting.
  - Quarantined Lockbox Test Split: 20% holdout ($N=656$, positive potability prevalence: 39.02%).
  - Local Standalone Validation Sample (`dataset.json`): $n=30$ representative annotated samples for lightweight deterministic offline reproduction.
- **Track A Temporal Partition:**
  - Time-series CTD buoy stream telemetry ($N=720$ sequential observations, 0 timestamp jitter) tracking dissolved oxygen (mg/L), temperature (°C), pH, turbidity (NTU), conductivity (µS/cm), and pressure (dbar).
  - Chronological walk-forward split (no temporal leakage / future peeking).

---

## 3. Evaluated Model Architectures & Baselines
1. **WHO Permissible Baseline (Deterministic Rule System):**
   - Strictly enforces WHO 4th Edition drinking water limits across all 9 parameters. If any parameter falls outside permissible envelopes (e.g., pH $\notin [6.5, 8.5]$, TDS $> 1000$ ppm, Chloramines $> 4$ ppm, Sulfate $> 250$ ppm), the sample is flagged non-potable ($y=0$). Because $>99.7\%$ of real-world water bodies violate at least one threshold, this baseline functions as an all-negative rule predictor.
2. **ElasticNet Logistic Regression (Linear Baseline):**
   - Linear classifier with $L_1/L_2$ regularization over standardized feature z-scores.
3. **Random Forest (Calibrated Bagged Ensemble, 200 Trees):**
   - 200 estimators with fold-isolated median imputation and robust scaling.
4. **XGBoost + Platt Scaling (Production Champion):**
   - Gradient boosted trees calibrated via Platt scaling (sigmoid mapping of log-odds) with an empirically tuned decision threshold $T^* = 0.38$ to maximize minority-class F1 score.
5. **Persistence Forecaster (Temporal Baseline):**
   - Predicts next sensor reading as the current observation ($\hat{y}_{t+1} = y_t$).
6. **Causal Lag Stream Forecaster (Ridge / XGBoost Autoregressive):**
   - Predicts next-step Dissolved Oxygen using causal multi-lag and cross-sensor rolling statistics.

---

## 4. Empirical Evaluation Results

### A. Repository Lockbox Test Set ($N=656$, Single-Pass Unblinded)
*Source: `outputs/results/benchmark_report.json` & `RUN_REPORT.md` in `DurgaPavan0923/water_potability`*

| Model Candidate | Architecture Family | 5-Fold CV PR-AUC (Dev N=2,620) | Lockbox PR-AUC (N=656) | Lockbox ROC-AUC | Brier Score | F1 @ T=0.50 | F1 @ T*=0.38 | Server Latency (P50) |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **WHO Baseline** | Rule Envelope | 0.3901 ± 0.000 | 0.3920 | 0.5000 | 0.3890 | 0.0000 | 0.0000 | 0.02 ms |
| **ElasticNet LR** | Linear Model | 0.4320 ± 0.018 | 0.4345 | 0.5180 | 0.2410 | 0.4285 | 0.4410 | 0.14 ms |
| **Random Forest** | Calibrated Ensemble | 0.5943 ± 0.021 | 0.5943 | 0.6659 | 0.2159 | 0.3458 | **0.5512** | 4.82 ms |
| **XGBoost + Platt** 🏆 | Gradient Boosted | **0.5892 ± 0.024** | **0.5951** [95% CI: 0.534, 0.656] | **0.6689** [95% CI: 0.627, 0.711] | **0.2154** | **0.4127** | **0.5480** | **2.89 ms** |

**Lockbox Confusion Matrix (XGBoost, $N=656$):**
- True Negative (TN): 356 | False Positive (FP): 44
- False Negative (FN): 178 | True Positive (TP): 78
- Accuracy: **66.16%** | Precision: **63.93%** | Recall: **30.47%**

### B. Temporal Stream Forecasting (Dissolved Oxygen, $N=720$)
- **Persistence Baseline MAE:** 0.2980 mg/L
- **Causal Stream Forecaster MAE:** 0.1748 mg/L
- **Relative Error Reduction:** **41.34%** over persistence baseline.

### C. Standalone Local Reproduction Run (`dataset.json`, $n=30$)
*Executed via `evaluate.py`:*

| Model / Pipeline | Task | Accuracy / MAE | Precision | Recall | F1 | Brier Score | p50 Latency (ms) |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **WHO Permissible Baseline** | Potability Classification | 50.0% | 0.0000 | 0.0000 | 0.0000 | N/A | 0.0013 ms |
| **Logistic Regression** | Potability Classification | 100.0% | 1.0000 | 1.0000 | 1.0000 | 0.1392 | 0.0136 ms |
| **Calibrated Ensemble (XGBoost + Platt)** | Potability Classification | 100.0% | 1.0000 | 1.0000 | 1.0000 | **0.0886** | 0.0132 ms |
| **Persistence Forecaster** | DO Prediction (MAE) | 0.1213 mg/L | N/A | N/A | N/A | N/A | 0.0100 ms |
| **Causal Stream Forecaster** | DO Prediction (MAE) | 0.2645 mg/L | N/A | N/A | N/A | N/A | 0.0450 ms |

---

## 5. Metric Definitions
- **PR-AUC (Precision-Recall Area Under Curve):** Primary metric for imbalanced classification (positive prevalence 39.02%); evaluates ranking precision across all recall thresholds.
- **ROC-AUC:** Area under receiver operating characteristic curve (diagnostic discrimination).
- **Brier Score:** Mean squared calibration error: $\frac{1}{N}\sum_{i=1}^N (p_i - y_i)^2$. Lower indicates sharper, well-calibrated probabilities.
- **F1 Score:** Harmonic mean of precision and recall evaluated at default $T=0.50$ and validation-optimized threshold $T^*=0.38$.
- **MAE (Mean Absolute Error):** $\frac{1}{N}\sum_{i=1}^N |y_i - \hat{y}_i|$ measuring forecasting error in physical units (mg/L dissolved oxygen).
- **Inference Latency:** Per-sample execution latency in milliseconds (P50 and P95 percentiles).

---

## 6. Execution Environment & Limitations
- **Hardware Profile:** AMD Ryzen / Intel x64, 16 GB RAM, Windows 11.
- **Execution Date:** October 2026.
- **Benchmarking Tools:** Python standard library `time.perf_counter()` and repository `scripts/benchmark.py`.
- **Known Limitations:**
  - Water potability dataset exhibits label noise inherent to bulk physicochemical measurements without biological microbial testing (e.g., E. coli or viral pathogen assays).
  - Predictions represent statistical risk estimates, not certified municipal safety clearances.
