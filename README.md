---
library_name: transformers
license: apache-2.0
base_model: distilbert-base-uncased
tags:
- generated_from_trainer
metrics:
- accuracy
model-index:
- name: results
  results: []
---


📰 Fake News Detection with Fine-Tuned DistilBERT

This repository contains a fine-tuned version of DistilBERT for fake news detection, 
trained on the LIAR dataset. The model predicts credibility scores on a scale of 0 to 5, rather than just a binary classification.

This model is a fine-tuned version of [distilbert-base-uncased](https://huggingface.co/distilbert-base-uncased) on 
the fake.csv & true.csv (Binary classification) dataset.
It achieves the following results on the evaluation set:
- Loss: 0.0001
- Accuracy: 1.0


## Model Overview

Model: Fine-tuned DistilBERT (distilbert-base-uncased)

Dataset: fake.csv & true.csv (Binary classification)

Labels:

0 → Real News 📰

1 → Fake News 🚨

Use Case: Detect misinformation and classify news as real or fake
Deployment: Hosted on Hugging Face and accessible via FastAPI

🔗 https://huggingface.co/anup069/results

## Intended uses & limitations
✅ Intended Uses

Fake News Detection: Classifies news articles as FAKE (1) or REAL (0).

Misinformation Analysis: Helps identify misleading or fabricated news.

News Verification Tools: Can be integrated into fact-checking websites, browser extensions, or news aggregator platforms.

Educational Purposes: Useful for research and academic projects on NLP and misinformation detection.

More information needed

⚠️ Limitations

Limited Dataset: Trained only on fake.csv and true.csv, which may not represent all news sources.

Context Understanding: The model classifies based on text patterns, not fact-checking against external sources.

Adversarial Attacks: It may be fooled by well-crafted fake news.

Bias & Generalization: Might struggle with different writing styles, languages, or new topics outside its training data.

Continuous Updates Needed: Fake news trends evolve, requiring periodic retraining with fresh data.

## Training and evaluation data

The model was trained on a binary classification dataset consisting of:

fake.csv → Contains fake news articles

true.csv → Contains real news articles

🔹 Data Preprocessing

Text Cleaning: Removed special characters, extra spaces, and stopwords.

Tokenization: Used DistilBERT tokenizer to convert text into input tokens.

Label Encoding: Assigned 1 for fake news and 0 for real news.

Train-Test Split: 80% for training, 20% for evaluation.

📈 Evaluation Metrics

The model was evaluated using:

Accuracy

Precision, Recall, F1-score

Loss (Cross-Entropy Loss)

## Training procedure
🔹 Training Process

Loaded fake.csv and true.csv → Preprocessed the text

Used Hugging Face’s Trainer API to fine-tune DistilBERT

Monitored validation loss & accuracy after each epoch

Saved the best-performing model to Hugging Face

### Training hyperparameters

The following hyperparameters were used during training:
- learning_rate: 3e-05
- train_batch_size: 32
- eval_batch_size: 64
- seed: 42
- gradient_accumulation_steps: 2
- total_train_batch_size: 64
- optimizer: Use OptimizerNames.ADAMW_TORCH with betas=(0.9,0.999) and epsilon=1e-08 and optimizer_args=No additional optimizer arguments
- lr_scheduler_type: linear
- lr_scheduler_warmup_steps: 500
- num_epochs: 5
- mixed_precision_training: Native AMP

### Training results

| Training Loss | Epoch | Step | Validation Loss | Accuracy |
|:-------------:|:-----:|:----:|:---------------:|:--------:|
| 0.0021        | 1.0   | 395  | 0.0089          | 0.9983   |
| 0.0034        | 2.0   | 790  | 0.0008          | 0.9997   |
| 0.0001        | 3.0   | 1185 | 0.0000          | 1.0      |
| 0.0           | 4.0   | 1580 | 0.0006          | 0.9997   |
| 0.0           | 5.0   | 1975 | 0.0001          | 1.0      |


### 🚀 API Deployment with FastAPI

The model is already deployed using FastAPI for real-time predictions.

🔗 API Endpoint

📌 Base URL: https://anup069-fake-news-detection-api.hf.space/verify/

🛠 How to Use the API

You can send a POST request to the API to classify news as FAKE (1) or REAL (0).

Example Request:

curl -X POST "https://anup069-fake-news-detection-api.hf.space/verify/" \
     -H "Content-Type: application/json" \
     -d '{"text": "Breaking news: Scientists discover a new planet!"}'

Example Response:

{
  "label": "FAKE",
  "score": 0.98
}

✅ Features

✔️ Real-time inference with low latency

✔️ Scalable & FastAPI-based backend

✔️ Can be integrated into web apps, Chrome extensions, or other platforms
### Framework versions

- Transformers 4.48.2
- Pytorch 2.5.1+cu124
- Datasets 3.2.0
- Tokenizers 0.21.0
