# AI Engineer — Complete 0 to Hero Roadmap (Indian Instructors)

> **Goal:** Go from absolute beginner to AI job-ready
> **Budget:** ₹0–₹9,000 (mix of free + Udemy sale prices)
> **Time:** ~42 weeks (2–4 hrs/day)
> **Pro Tip:** NEVER buy Udemy at full price. Wait for sales (every 2 weeks) — courses drop to ₹399–₹549

---

## TABLE OF CONTENTS

1. [Day 0 — Setup & Prerequisites](#1--day-0--setup--prerequisites)
2. [The Learning Path Overview](#2--the-learning-path-overview)
3. [Udemy Courses (Phase 1–8)](#3--udemy-courses-phase-18)
4. [Budget Strategy & Free Alternatives](#4--budget-strategy--free-alternatives)
5. [42-Week Execution Plan](#5--42-week-execution-plan)
6. [Supplementary Tracks (SQL + DSA)](#6--supplementary-tracks-sql--dsa)
7. [Career, Networking & Certifications](#7--career-networking--certifications)
8. [Books & Staying Current](#8--books--staying-current)
9. [Common Mistakes to Avoid](#9--common-mistakes-to-avoid)
10. [Master Progress Tracker](#10--master-progress-tracker)
11. [Job-Ready Checklist](#11--job-ready-checklist)

---

## 1. DAY 0 — SETUP & PREREQUISITES

> Do this on a Sunday BEFORE you start Week 1. Takes ~3 hours.

### Software to Install

| Tool | Why | Install |
|------|-----|---------|
| **Python 3.11+** | Core language | [python.org](https://www.python.org/downloads/) or `brew install python` (Mac) |
| **VS Code** | Code editor | [code.visualstudio.com](https://code.visualstudio.com/) |
| **VS Code Extensions** | Productivity | Python, Jupyter, Pylance, GitLens, GitHub Copilot (free for students) |
| **Anaconda / Miniconda** | Environment management | [anaconda.com](https://www.anaconda.com/download) — use Miniconda if low disk space |
| **Jupyter Notebook** | Interactive coding | `pip install notebook` or comes with Anaconda |
| **Git** | Version control | `brew install git` (Mac) / [git-scm.com](https://git-scm.com/) |
| **GitHub Account** | Portfolio hosting | [github.com](https://github.com/) — use your real name |
| **Kaggle Account** | Datasets + competitions | [kaggle.com](https://www.kaggle.com/) |
| **Google Colab** | Free GPU for DL/GenAI | [colab.research.google.com](https://colab.research.google.com/) — just need Gmail |
| **Notion / Obsidian** | Notes & tracking | [notion.so](https://www.notion.so/) or [obsidian.md](https://obsidian.md/) — FREE |
| **Docker Desktop** | Containerization (install in Week 33) | [docker.com](https://www.docker.com/products/docker-desktop/) |
| **Postman** | API testing (install in Week 33) | [postman.com](https://www.postman.com/downloads/) |

### Hardware Requirements

| Component | Minimum | Recommended | Notes |
|-----------|---------|-------------|-------|
| **RAM** | 8 GB | 16 GB | 8 GB will struggle with large datasets |
| **Storage** | 256 GB SSD | 512 GB SSD | Datasets + Docker images eat space |
| **GPU** | Not needed | NVIDIA GPU (optional) | Use **Google Colab FREE GPU** for DL training |
| **Processor** | Any modern i5/Ryzen 5 | i7/Ryzen 7 or M1/M2 Mac | Apple Silicon Macs are great for ML |
| **Internet** | Stable connection | — | You'll download large datasets & models |

> **No GPU? No problem.** Google Colab gives you free T4 GPU (enough for 90% of the course projects). Kaggle Notebooks also have free GPU. You do NOT need a gaming laptop.

### Google Colab — Your Free GPU

| Platform | Free GPU | Time Limit | Best For |
|----------|----------|------------|----------|
| **Google Colab** | T4 GPU | ~12 hrs/session | DL training, fine-tuning, GenAI |
| **Kaggle Notebooks** | T4 GPU (30 hrs/week) | 30 hrs/week | Kaggle competitions, DL projects |
| **Lightning AI** | Free GPU | Limited | Quick experiments |
| **Hugging Face Spaces** | Free CPU (GPU paid) | — | Deploying demos |
| **Paperspace Gradient** | Free GPU (M4000) | 6 hrs/session | If Colab is slow |

**How to use Colab:** Go to colab.research.google.com → New Notebook → Runtime → Change Runtime Type → T4 GPU → Train your models for free. Save notebooks to Google Drive for persistent storage.

### Git Crash Course (Do This on Day 0)

**Watch one of these (2 hours):**

| Resource | Creator | Link |
|----------|---------|------|
| Git & GitHub Full Course (Hindi) | CodeWithHarry | [YouTube](https://www.youtube.com/watch?v=gwWKnnCMQ5c) |
| Git for Beginners | Hitesh Choudhary | [YouTube](https://www.youtube.com/watch?v=apGV9Kg7ics) |
| Git Tutorial | Kunal Kushwaha (Hindi-English) | [YouTube](https://www.youtube.com/watch?v=apGV9Kg7ics) |

**Commands You MUST Know:**

```bash
# Setup (one time)
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

# Daily workflow
git init                    # Initialize repo
git add .                   # Stage all changes
git commit -m "message"     # Commit with message
git remote add origin URL   # Connect to GitHub
git push -u origin main     # Push to GitHub

# Branching (learn by Week 4)
git branch feature-name     # Create branch
git checkout feature-name   # Switch to branch
git merge feature-name      # Merge branch
git pull origin main        # Pull latest changes

# Useful
git status                  # Check what's changed
git log --oneline           # See commit history
git diff                    # See uncommitted changes
```

**GitHub Profile Tips:**
- Create a repo named `your-username` with a README.md — this shows on your profile
- Pin 6 best projects to your profile
- Commit daily — recruiters check contribution graphs
- Good commit messages: `"Add random forest model with 92% accuracy"` NOT `"update"`
- Every repo needs: README.md, requirements.txt, .gitignore, screenshots/

---

## 2. THE LEARNING PATH OVERVIEW

```
PHASE 1 → Python Programming (Weeks 1–3)
   │
PHASE 2 → Data Science & EDA (Weeks 4–7)
   │        + Start SQL side-track (30 min/day)
   │
PHASE 3 → Machine Learning (Weeks 8–14)
   │        + Start DSA side-track (30 min/day)
   │
PHASE 4 → Deep Learning (Weeks 15–20)
   │
PHASE 5 → NLP & Text Processing (Weeks 21–25)
   │
PHASE 6 → Generative AI & LLMs (Weeks 26–32) ⭐ MOST IMPORTANT
   │
PHASE 7 → MLOps & Deployment (Weeks 33–37)
   │
PHASE 8 → Interview Prep & Portfolio (Weeks 38–42)
```

---

## 3. UDEMY COURSES (PHASE 1–8)

### PHASE 1: Python Programming (Weeks 1–3)

> Python is the #1 language for AI. No shortcuts here.

**Course 1: Python Fundamentals**
| Detail | Info |
|--------|------|
| **Course** | Complete Python Bootcamp From Zero to Hero in Python |
| **Instructor** | Krish Naik (iNeuron) |
| **Search on Udemy** | "Krish Naik Python" |
| **Alternative** | "Python for Data Science and Machine Learning" by Dhaval Patel (codebasics) |
| **Duration** | ~20–25 hrs |
| **What You'll Learn** | Variables, data types, loops, functions, OOP, file handling, modules, error handling, decorators, generators |

**Course 2: Python for Data Science (Libraries)**
| Detail | Info |
|--------|------|
| **Course** | Python for Data Science — NumPy, Pandas, Matplotlib |
| **Instructor** | Krish Naik / Dhaval Patel (codebasics) |
| **Search on Udemy** | "NumPy Pandas Matplotlib" + filter by Indian instructor |
| **Duration** | ~15–20 hrs |
| **What You'll Learn** | NumPy arrays, Pandas DataFrames, data manipulation, Matplotlib & Seaborn visualization |

---

### PHASE 2: Statistics, Math & EDA (Weeks 4–7)

> ML algorithms are built on math. You MUST understand the intuition.

**Course 3: Statistics for Data Science**
| Detail | Info |
|--------|------|
| **Course** | Statistics for Data Science and Business Analysis |
| **Instructor** | Krish Naik |
| **Search on Udemy** | "Krish Naik Statistics" |
| **Duration** | ~10–15 hrs |
| **What You'll Learn** | Descriptive stats, probability, distributions, hypothesis testing, Bayes theorem, A/B testing |

**Course 4: Feature Engineering & EDA**
| Detail | Info |
|--------|------|
| **Course** | Feature Engineering & EDA for Machine Learning |
| **Instructor** | Krish Naik |
| **Search on Udemy** | "Krish Naik EDA Feature Engineering" |
| **Duration** | ~10–12 hrs |
| **What You'll Learn** | Handling missing data, outliers, encoding, feature scaling, feature selection, EDA techniques |

---

### PHASE 3: Machine Learning (Weeks 8–14)

> The bread and butter of AI. Master this thoroughly.

**Course 5: Complete Machine Learning**
| Detail | Info |
|--------|------|
| **Course** | Complete Machine Learning & Data Science Bootcamp |
| **Instructor** | Krish Naik |
| **Search on Udemy** | "Krish Naik Machine Learning" |
| **Duration** | ~40–50 hrs |
| **What You'll Learn** | Linear/Logistic Regression, Decision Trees, Random Forest, SVM, KNN, Naive Bayes, K-Means, PCA, Ensemble Methods, XGBoost, Model Evaluation, Cross-Validation, Hyperparameter Tuning |
| **Why This One** | Krish explains the math intuition + Python implementation side by side |

**Alternative: Course 5B**
| Detail | Info |
|--------|------|
| **Course** | Machine Learning A-Z (with Python) |
| **Instructor** | Siddhardhan |
| **Search on Udemy** | "Siddhardhan Machine Learning" |
| **Duration** | ~30–40 hrs |
| **Why** | Very project-focused, great for hands-on practice alongside Krish's theory |

---

### PHASE 4: Deep Learning (Weeks 15–20)

> Neural networks power all modern AI — computer vision, NLP, GenAI.

**Course 6: Complete Deep Learning**
| Detail | Info |
|--------|------|
| **Course** | Complete Deep Learning Course — Neural Networks with Python |
| **Instructor** | Krish Naik |
| **Search on Udemy** | "Krish Naik Deep Learning" |
| **Duration** | ~30–40 hrs |
| **What You'll Learn** | ANN, CNN, RNN, LSTM, GRU, Autoencoders, GANs, Transfer Learning, PyTorch/TensorFlow, Backpropagation math, Optimizers, Regularization |

**Course 7: Computer Vision**
| Detail | Info |
|--------|------|
| **Course** | Deep Learning & Computer Vision A-Z — OpenCV, CNN, YOLO |
| **Instructor** | Siddhardhan / Krish Naik |
| **Search on Udemy** | "Computer Vision Python OpenCV YOLO" + Indian instructor |
| **Duration** | ~20–25 hrs |
| **What You'll Learn** | Image classification, object detection, YOLO, OpenCV, image segmentation, face recognition |

---

### PHASE 5: NLP — Natural Language Processing (Weeks 21–25)

> Text data is everywhere. NLP is the gateway to LLMs and GenAI.

**Course 8: Complete NLP**
| Detail | Info |
|--------|------|
| **Course** | Complete Natural Language Processing (NLP) Course |
| **Instructor** | Krish Naik |
| **Search on Udemy** | "Krish Naik NLP" |
| **Duration** | ~25–30 hrs |
| **What You'll Learn** | Text preprocessing, tokenization, stemming, lemmatization, Bag of Words, TF-IDF, Word2Vec, RNN for text, Attention mechanism, Transformers intro, Sentiment analysis, Text classification, NER |

**Course 9: Hugging Face Transformers**
| Detail | Info |
|--------|------|
| **Course** | Transformers & Hugging Face for NLP |
| **Instructor** | Krish Naik / Dhaval Patel |
| **Search on Udemy** | "Hugging Face Transformers NLP" + Indian instructor |
| **Duration** | ~10–15 hrs |
| **What You'll Learn** | BERT, GPT architecture, fine-tuning pretrained models, Hugging Face Hub, tokenizers, pipelines |

---

### PHASE 6: Generative AI & LLMs (Weeks 26–32) ⭐

> This is where the MONEY and JOBS are. Every company wants GenAI engineers.

**Course 10: Complete Generative AI with LangChain**
| Detail | Info |
|--------|------|
| **Course** | Complete Generative AI Course with LangChain and Hugging Face |
| **Instructor** | Krish Naik |
| **Search on Udemy** | "Krish Naik Generative AI LangChain" |
| **Duration** | ~30–40 hrs |
| **What You'll Learn** | LLM fundamentals, Prompt Engineering, LangChain framework, Chains/Agents/Memory, RAG, Vector databases (ChromaDB, Pinecone, FAISS), OpenAI API, Google Gemini API, Hugging Face open-source models |
| **Why This One** | THE most job-relevant course in this entire list |

**Course 11: LLM Fine-Tuning**
| Detail | Info |
|--------|------|
| **Course** | Fine-Tuning LLMs — LoRA, QLoRA, PEFT, RLHF |
| **Instructor** | Krish Naik / Dhaval Patel |
| **Search on Udemy** | "Fine Tuning LLM LoRA" + Indian instructor |
| **Duration** | ~10–15 hrs |
| **What You'll Learn** | LoRA, QLoRA, PEFT, RLHF, DPO, fine-tuning Llama/Mistral, deploying custom LLMs |

**Course 12: AI Agents**
| Detail | Info |
|--------|------|
| **Course** | Building AI Agents with LangGraph, CrewAI |
| **Instructor** | Krish Naik |
| **Search on Udemy** | "AI Agents LangGraph CrewAI" + Indian instructor |
| **Duration** | ~10–15 hrs |
| **What You'll Learn** | Multi-agent systems, LangGraph, CrewAI, AutoGen, tool-calling agents, agentic RAG |

---

### PHASE 7: MLOps & Deployment (Weeks 33–37)

> Building models is 30% of the job. Deploying them is the other 70%.

**Course 13: MLOps Bootcamp**
| Detail | Info |
|--------|------|
| **Course** | Complete MLOps Bootcamp |
| **Instructor** | Krish Naik |
| **Search on Udemy** | "Krish Naik MLOps" |
| **Duration** | ~25–30 hrs |
| **What You'll Learn** | MLflow, DVC, Docker, CI/CD for ML, Model versioning, Experiment tracking, FastAPI for model serving, AWS/GCP deployment, GitHub Actions |

**Course 14: Docker & Cloud for ML**
| Detail | Info |
|--------|------|
| **Course** | Docker for Data Science and Machine Learning |
| **Instructor** | Search for Indian instructor on Udemy |
| **Search on Udemy** | "Docker Machine Learning deployment" |
| **Duration** | ~10–15 hrs |
| **What You'll Learn** | Docker containers, Docker Compose, deploying ML APIs, AWS EC2/Lambda, Streamlit/Gradio deployment |

---

### PHASE 8: Interview Prep & Portfolio (Weeks 38–42)

**Course 15: Interview Preparation**
| Detail | Info |
|--------|------|
| **Course** | Data Science & Machine Learning Interview Preparation |
| **Instructor** | Krish Naik |
| **Search on Udemy** | "Krish Naik Interview Preparation ML" |
| **Duration** | ~15–20 hrs |
| **What You'll Learn** | ML theory questions, coding rounds, case studies, system design for ML, resume building |

---

### Top Indian Instructors (Bookmark Their Profiles)

| Instructor | Specialty | Udemy Search | Why Follow |
|------------|-----------|--------------|------------|
| **Krish Naik** | ML, DL, NLP, GenAI, MLOps | "Krish Naik" | #1 AI educator from India. iNeuron founder. Math + code. Hindi-English mix. |
| **Dhaval Patel (codebasics)** | Python, Data Science, ML | "codebasics" or "Dhaval Patel" | Beginner-friendly. Project-based. Clear Indian English. |
| **Siddhardhan** | ML, DL, Data Science Projects | "Siddhardhan" | Extremely hands-on. Every concept has a project. Tamil-English. |
| **Sudhanshu Kumar** | ML, DL (iNeuron co-founder) | "Sudhanshu Kumar" | Deep mathematical explanations. |
| **Abdul Bari** | Algorithms, DSA | "Abdul Bari" | Legend for algorithms. |
| **Hitesh Choudhary** | Python, Web Dev | "Hitesh Choudhary" | Great for Python basics from scratch. |

---

## 4. BUDGET STRATEGY & FREE ALTERNATIVES

### Udemy Cost Breakdown (Sale Prices)

| Phase | Courses | Cost (Sale Price) |
|-------|---------|-------------------|
| Phase 1 | 2 courses | ₹800–₹1,100 |
| Phase 2 | 2 courses | ₹800–₹1,100 |
| Phase 3 | 1–2 courses | ₹400–₹1,100 |
| Phase 4 | 2 courses | ₹800–₹1,100 |
| Phase 5 | 2 courses | ₹800–₹1,100 |
| Phase 6 | 3 courses | ₹1,200–₹1,650 |
| Phase 7 | 2 courses | ₹800–₹1,100 |
| Phase 8 | 1 course | ₹400–₹550 |
| **TOTAL** | **~15 courses** | **₹6,000–₹9,000** |

### Minimum Viable Bundle (If Budget is Tight)

Buy ONLY these 5 courses:

| Priority | Course | Instructor | Why |
|----------|--------|------------|-----|
| 1 | Complete Python Bootcamp | Krish Naik | Foundation for everything |
| 2 | Complete ML & Data Science | Krish Naik | Core skill for any AI job |
| 3 | Complete Deep Learning | Krish Naik | Required for modern AI |
| 4 | **Complete GenAI with LangChain** | **Krish Naik** | **#1 most hired skill in 2025-26** |
| 5 | MLOps Bootcamp | Krish Naik | Makes you production-ready |

> **Total for 5 courses during sale: ~₹2,000–₹2,750**

---

### FREE YouTube Playlists (Course-Level Quality)

> These are complete course-level playlists, not random videos. Each is equivalent to a paid Udemy course.

#### Python & Data Science

| Playlist | Creator | Videos | Link | Replaces |
|----------|---------|--------|------|----------|
| Complete Python Tutorial | Hitesh Choudhary | 100+ | [YouTube](https://www.youtube.com/playlist?list=PLu0W_9lII9agwh1XjRt242xIpHhPT2llg) | Udemy Course 1 |
| Python for Beginners (Hindi) | CodeWithHarry | 100+ | [YouTube](https://www.youtube.com/playlist?list=PLu0W_9lII9agICnT8t4iYVSZ3eykIAOME) | Udemy Course 1 |
| Python + Data Science | Dhaval Patel (codebasics) | 50+ | [YouTube](https://www.youtube.com/playlist?list=PLeo1K3hjS3us_ELKYSj_Fth2tIEkdKXvV) | Udemy Course 1 + 2 |
| NumPy + Pandas | CampusX (Nitish Singh) | 30+ | [YouTube](https://www.youtube.com/playlist?list=PLKnIA16OIAhGJRwGbdL6YuF7RNqTFqydT) | Udemy Course 2 |

#### Machine Learning

| Playlist | Creator | Videos | Link | Replaces |
|----------|---------|--------|------|----------|
| **Complete ML (Hindi)** | **CampusX (Nitish Singh)** | **100+** | [YouTube](https://www.youtube.com/playlist?list=PLKnIA16OIAhGKDpCB_ENOANZIG5b60Wfr) | **THE BEST FREE ML COURSE IN HINDI** |
| ML Full Course | Krish Naik | 80+ | [YouTube](https://www.youtube.com/playlist?list=PLZoTAELRMXVPBTrWtJkn3wWQxZkmTXGwe) | Udemy Course 5 |
| ML with Python — Projects | Siddhardhan | 40+ | [YouTube](https://www.youtube.com/playlist?list=PLfFghEzKVmjsNtIRwErklMAN8nJmebB0I) | Udemy ML (project-focused) |
| Statistics for ML (Hindi) | CampusX (Nitish Singh) | 40+ | [YouTube](https://www.youtube.com/playlist?list=PLKnIA16OIAhGVMBROajmMAH33Lgf_CPUO) | Udemy Course 3 |

#### Deep Learning

| Playlist | Creator | Videos | Link | Replaces |
|----------|---------|--------|------|----------|
| Complete Deep Learning (Hindi) | CampusX (Nitish Singh) | 50+ | [YouTube](https://www.youtube.com/playlist?list=PLKnIA16OIAhGpQz10JTzAPdrCFgdZsKjL) | Udemy Course 6 |
| Deep Learning Full Course | Krish Naik | 60+ | [YouTube](https://www.youtube.com/playlist?list=PLZoTAELRMXVPGU70ZGsckrMdr0FteeRUi) | Udemy Course 6 |
| PyTorch Full Course | CampusX | 20+ | [YouTube](https://www.youtube.com/playlist?list=PLKnIA16OIAhGMlCzhKMg6bCDMfZoeVLMa) | Framework mastery |

#### NLP & Transformers

| Playlist | Creator | Videos | Link | Replaces |
|----------|---------|--------|------|----------|
| NLP Full Course (Hindi) | CampusX (Nitish Singh) | 40+ | [YouTube](https://www.youtube.com/playlist?list=PLKnIA16OIAhGL39OLID0EuWBbPAE92JLZ) | Udemy Course 8 |
| NLP Playlist | Krish Naik | 40+ | [YouTube](https://www.youtube.com/playlist?list=PLZoTAELRMXVMdJ5sqbCK2LiM0HhQVWNzm) | Udemy Course 8 |
| Hugging Face Complete Course | Krish Naik | 15+ | [YouTube](https://www.youtube.com/playlist?list=PLZoTAELRMXVOTsz2jZl2Oq3ntWPoKRKwv) | Udemy Course 9 |

#### Generative AI & LLMs ⭐

| Playlist | Creator | Videos | Link | Replaces |
|----------|---------|--------|------|----------|
| **Complete Generative AI Course** | **Krish Naik** | **70+** | [YouTube](https://www.youtube.com/playlist?list=PLZoTAELRMXVORE4VF7WQ_fAl0L1Gljtar) | **Udemy Course 10 — FREE VERSION!** |
| LangChain Full Course (Hindi) | CampusX (Nitish Singh) | 20+ | [YouTube](https://www.youtube.com/playlist?list=PLKnIA16OIAhGlOSYUdg8z_A-gOBGnkM4o) | Udemy Course 10 |
| RAG Tutorial Series | Krish Naik | 15+ | [YouTube](https://www.youtube.com/playlist?list=PLZoTAELRMXVOjQdyqlCmOEhGESTGtiVBo) | Udemy Course 10 (RAG part) |
| AI Agents — Complete Course | Krish Naik | 10+ | [YouTube](https://www.youtube.com/playlist?list=PLZoTAELRMXVNGQYTbGPiNHau6J4fJOKKJ) | Udemy Course 12 |
| LLM Fine-Tuning Series | Krish Naik | 10+ | [YouTube](https://www.youtube.com/playlist?list=PLZoTAELRMXVN9VbAx5I2VvloTtYmlApe3) | Udemy Course 11 |

#### MLOps & Deployment

| Playlist | Creator | Videos | Link | Replaces |
|----------|---------|--------|------|----------|
| MLOps Full Course | Krish Naik | 30+ | [YouTube](https://www.youtube.com/playlist?list=PLZoTAELRMXVOk1pRcOCaG5xtXxgMalpIe) | Udemy Course 13 |
| Docker for Data Science | CampusX | 10+ | [YouTube](https://www.youtube.com/playlist?list=PLKnIA16OIAhGe9CQWDNLymmSjHvI6PVCk) | Udemy Course 14 |
| End-to-End ML Projects (Full Deploy) | Krish Naik | 15+ | [YouTube](https://www.youtube.com/playlist?list=PLZoTAELRMXVPS-dOaVbAux22btpSy0Gty) | Udemy Course 13 + 14 combined |

---

### NPTEL / SWAYAM — IIT & IISc Professors (FREE + ₹1,000 for Certificate)

> Gold-standard courses from India's top professors. Free to learn. Certificate exam costs ~₹1,000. NPTEL certificates are respected by Indian companies.

| Course | Professor / Institute | Duration | Phase |
|--------|-----------------------|----------|-------|
| Programming in Python | Prof. Prathap (IIT Madras) | 8 weeks | Phase 1 |
| Probability & Statistics | Prof. Somesh Kumar (IIT Kharagpur) | 12 weeks | Phase 2 |
| Machine Learning | Prof. Sudeshna Sarkar (IIT Kharagpur) | 8 weeks | Phase 3 |
| Deep Learning | Prof. Mitesh Khapra (IIT Madras) | 12 weeks | Phase 4 |
| Introduction to NLP | Prof. Pushpak Bhattacharyya (IIT Bombay) | 8 weeks | Phase 5 |
| Cloud Computing | Prof. Soumya Kanti Ghosh (IIT Kharagpur) | 8 weeks | Phase 7 |

> Courses run on a schedule (Jan–April, July–Oct). Enroll early. Certificate exams happen at local centers.

---

### Kaggle Learn — FREE Micro-Courses (4–6 hours each)

| Course | Duration | Link | Pairs With |
|--------|----------|------|------------|
| Intro to Python | 4 hrs | [kaggle.com/learn/python](https://www.kaggle.com/learn/python) | Phase 1 |
| Pandas | 4 hrs | [kaggle.com/learn/pandas](https://www.kaggle.com/learn/pandas) | Phase 1 |
| Data Visualization | 4 hrs | [kaggle.com/learn/data-visualization](https://www.kaggle.com/learn/data-visualization) | Phase 2 |
| Intro to ML | 4 hrs | [kaggle.com/learn/intro-to-machine-learning](https://www.kaggle.com/learn/intro-to-machine-learning) | Phase 3 |
| Intermediate ML | 4 hrs | [kaggle.com/learn/intermediate-machine-learning](https://www.kaggle.com/learn/intermediate-machine-learning) | Phase 3 |
| Feature Engineering | 5 hrs | [kaggle.com/learn/feature-engineering](https://www.kaggle.com/learn/feature-engineering) | Phase 3 |
| Intro to Deep Learning | 4 hrs | [kaggle.com/learn/intro-to-deep-learning](https://www.kaggle.com/learn/intro-to-deep-learning) | Phase 4 |
| Computer Vision | 4 hrs | [kaggle.com/learn/computer-vision](https://www.kaggle.com/learn/computer-vision) | Phase 4 |
| NLP | 4 hrs | [kaggle.com/learn/natural-language-processing](https://www.kaggle.com/learn/natural-language-processing) | Phase 5 |
| Intro to SQL | 4 hrs | [kaggle.com/learn/intro-to-sql](https://www.kaggle.com/learn/intro-to-sql) | SQL Track |
| Advanced SQL | 4 hrs | [kaggle.com/learn/advanced-sql](https://www.kaggle.com/learn/advanced-sql) | SQL Track |
| AI Ethics | 2 hrs | [kaggle.com/learn/intro-to-ai-ethics](https://www.kaggle.com/learn/intro-to-ai-ethics) | Phase 8 |

---

### Other Platforms

**iNeuron (by Krish Naik)** — ₹2,000–₹5,000

| Course | Price | Duration |
|--------|-------|----------|
| Full Stack Data Science Pro | ₹4,999–₹8,999 | 9 months (covers Phase 1–7 ALL-IN-ONE) |
| Generative AI Course | ₹2,499–₹4,999 | 3 months |
| ML + DL Marathon | ₹1,999–₹3,999 | 4 months |

> If you want ONE paid platform instead of 15 Udemy courses, iNeuron's Full Stack DS Pro is the most cost-effective.

**Analytics Vidhya (Free Courses):** Python for DS, Intro to ML, GenAI for Beginners, NLP for Beginners — [courses.analyticsvidhya.com](https://courses.analyticsvidhya.com/)

**Coursera (Free to Audit):** ML Specialization by Andrew Ng, Deep Learning Specialization, Google AI Essentials (free certificate) — [coursera.org](https://www.coursera.org/)

**freeCodeCamp (YouTube — Free):** ML with Python (10 hrs), TensorFlow 2.0 (7 hrs), Data Analysis with Python (4 hrs)

---

### The Smart Combo — Maximum Learning, Minimum Spend

```
FREE FOUNDATION (₹0)
├── YouTube  → CampusX ML playlist + Krish Naik GenAI playlist
├── Kaggle   → All 12 micro-courses for hands-on practice
├── NPTEL    → 1–2 IIT courses for depth + certificate
└── AV       → Analytics Vidhya free courses for quick wins

PAID UPGRADES (Pick ONE):
├── Option A: Udemy Bundle (5 courses) ────── ₹2,000–₹2,750
├── Option B: iNeuron Full Stack DS Pro ───── ₹4,999–₹8,999
└── Option C: Coursera Specializations (audit free, cert ₹6K–₹10K)

TOTAL SPEND: ₹0 to ₹9,000 MAX
```

**Recommended Combo (Best Value):**

| What | Platform | Cost |
|------|----------|------|
| Core Theory (ML, DL, Stats) | CampusX YouTube (FREE) | ₹0 |
| GenAI + LangChain + Agents | Krish Naik YouTube + 1 Udemy Course | ₹0–₹549 |
| Hands-on Practice | Kaggle Learn (FREE) | ₹0 |
| Certificate for Resume | NPTEL (1–2 IIT courses) | ₹1,000–₹2,000 |
| Deep Dive + Deployment | Udemy (2–3 Krish Naik courses) | ₹800–₹1,650 |
| Projects | YouTube tutorials (linked in weekly plan) | ₹0 |
| **TOTAL** | | **₹1,800–₹4,200** |

---

## 5. 42-WEEK EXECUTION PLAN

> Follow EXACTLY week by week. Each week tells you what to watch, what to practice, what to build. No guessing. Just execute.

### Daily Structure

```
Weekdays (Mon–Fri): 2 hrs/day
  → First hour:  Watch course / YouTube lectures
  → Second hour: Code along / practice what you watched

Weekend (Sat–Sun): 3–4 hrs/day
  → Saturday: Build project (follow tutorial)
  → Sunday:   Finish project + push to GitHub + revise week's notes
```

---

### ═══════════════════════════════════════════════════
### PHASE 1: PYTHON PROGRAMMING (WEEKS 1–3)
### ═══════════════════════════════════════════════════

#### WEEK 1 — Python Basics

| Day | What To Do | Time | Resource |
|-----|-----------|------|----------|
| **Mon** | Install Python, VS Code, Jupyter. Learn variables, data types, strings, f-strings | 2 hrs | Udemy: Krish Naik Python (Sections 1–3) |
| **Tue** | Practice: Solve 10 basic Python problems on HackerRank | 2 hrs | [HackerRank Python](https://www.hackerrank.com/domains/python) |
| **Wed** | Conditionals (if/elif/else), loops (for/while), range, enumerate | 2 hrs | Udemy: Krish Naik Python (Sections 4–5) |
| **Thu** | Practice: Solve 10 loop/condition problems | 2 hrs | HackerRank Python |
| **Fri** | Functions, *args, **kwargs, lambda, map, filter | 2 hrs | Udemy: Krish Naik Python (Sections 6–7) |
| **Sat** | **BUILD:** Expense Tracker CLI | 3 hrs | [Video: Krish Naik Python Projects](https://www.youtube.com/watch?v=8ext9G7xspg) |
| **Sun** | Finish project, push to GitHub. Revise all week's concepts | 3 hrs | Write notes in Notion/Obsidian |
| **Free supplement** | Watch CodeWithHarry Python playlist (Episodes 1–20) alongside | — | YouTube (FREE) |

#### WEEK 2 — Python Intermediate

| Day | What To Do | Time | Resource |
|-----|-----------|------|----------|
| **Mon** | Lists, tuples, sets, dictionaries — deep dive | 2 hrs | Udemy: Krish Naik Python (Sections 8–10) |
| **Tue** | List comprehensions, dict comprehensions, generators | 2 hrs | Udemy + practice on Replit |
| **Wed** | OOP — Classes, objects, inheritance, polymorphism, dunder methods | 2 hrs | Udemy: Krish Naik Python (Sections 11–13) |
| **Thu** | File handling (read/write CSV, JSON), error handling (try/except) | 2 hrs | Udemy: Krish Naik Python (Sections 14–15) |
| **Fri** | Modules, packages, virtual environments (venv), pip | 2 hrs | Udemy: Krish Naik Python (Sections 16–17) |
| **Sat** | **BUILD:** Web Scraper (Flipkart/Amazon prices) | 3 hrs | [Video: Krish Naik Web Scraping](https://www.youtube.com/watch?v=XVv6mJpFOb0) |
| **Sun** | Finish scraper, push to GitHub. Complete Kaggle "Intro to Python" micro-course | 3 hrs | [Kaggle Learn Python](https://www.kaggle.com/learn/python) |

#### WEEK 3 — Python for Data (NumPy, Pandas, Matplotlib)

| Day | What To Do | Time | Resource |
|-----|-----------|------|----------|
| **Mon** | NumPy — arrays, indexing, slicing, broadcasting, operations | 2 hrs | Udemy: Course 2 (NumPy section) OR CampusX NumPy playlist |
| **Tue** | Pandas — Series, DataFrames, reading CSV/Excel, indexing | 2 hrs | Udemy: Course 2 (Pandas section) |
| **Wed** | Pandas — groupby, merge, join, pivot tables, apply | 2 hrs | Continue Pandas + Kaggle "Pandas" micro-course |
| **Thu** | Matplotlib + Seaborn — line, bar, scatter, hist, heatmap, subplots | 2 hrs | Udemy: Course 2 (Visualization section) |
| **Fri** | Practice: Load a Kaggle dataset, clean it, make 5 different charts | 2 hrs | Pick any dataset from Kaggle |
| **Sat** | **BUILD:** Weather App using API | 3 hrs | [Video: Dhaval Patel API Project](https://www.youtube.com/watch?v=baPA-ssbGjI) |
| **Sun** | Push to GitHub. Complete Kaggle "Pandas" micro-course. Revise Phase 1 | 3 hrs | [Kaggle Learn Pandas](https://www.kaggle.com/learn/pandas) |

> **PHASE 1 CHECKPOINT:** You can write Python scripts, use NumPy/Pandas, create charts, and have 3 projects on GitHub.

---

### ═══════════════════════════════════════════════════
### PHASE 2: STATISTICS, MATH & EDA (WEEKS 4–7)
### ═══════════════════════════════════════════════════

> **Side-track starts now:** Begin SQL (30 min/day extra). See [Section 6](#6--supplementary-tracks-sql--dsa).

#### WEEK 4 — Descriptive Statistics & Probability

| Day | What To Do | Time | Resource |
|-----|-----------|------|----------|
| **Mon** | Mean, median, mode, variance, standard deviation, percentiles | 2 hrs | Udemy: Krish Naik Statistics (Sections 1–3) |
| **Tue** | Probability basics, conditional probability, Bayes theorem | 2 hrs | Udemy: Statistics (Sections 4–5) |
| **Wed** | Distributions — Normal, Binomial, Poisson, Uniform | 2 hrs | Udemy: Statistics (Sections 6–7) |
| **Thu** | Practice: Implement all distributions in Python with visualizations | 2 hrs | Jupyter Notebook practice |
| **Fri** | Central Limit Theorem, sampling, z-scores | 2 hrs | Udemy: Statistics (Section 8) |
| **Sat** | **BUILD:** Zomato/Swiggy Data EDA (start) | 3 hrs | [Video: CampusX Zomato EDA](https://www.youtube.com/watch?v=suRiGRwL6EE) |
| **Sun** | Continue EDA. Watch CampusX Statistics playlist (supplement) | 3 hrs | YouTube: CampusX Stats (FREE) |

#### WEEK 5 — Inferential Statistics & Hypothesis Testing

| Day | What To Do | Time | Resource |
|-----|-----------|------|----------|
| **Mon** | Hypothesis testing — null/alternative hypothesis, p-value, significance | 2 hrs | Udemy: Statistics (Sections 9–10) |
| **Tue** | t-test, z-test, chi-square test — when to use which | 2 hrs | Udemy: Statistics (Sections 11–12) |
| **Wed** | ANOVA, correlation, covariance | 2 hrs | Udemy: Statistics (Section 13) |
| **Thu** | A/B Testing concepts + practice with real datasets | 2 hrs | Jupyter practice + Kaggle |
| **Fri** | Complete Kaggle "Data Visualization" micro-course | 2 hrs | [Kaggle Learn Viz](https://www.kaggle.com/learn/data-visualization) |
| **Sat** | **BUILD:** IPL Data Analysis project | 3 hrs | [Video: Dhaval Patel IPL Analysis](https://www.youtube.com/watch?v=R67XuYc9NQ4) |
| **Sun** | Finish project, push to GitHub. Revise stats formulas | 3 hrs | Write a cheat sheet |

#### WEEK 6 — Feature Engineering & EDA Techniques

| Day | What To Do | Time | Resource |
|-----|-----------|------|----------|
| **Mon** | Missing value handling — mean/median/mode imputation, KNN imputer | 2 hrs | Udemy: Krish Naik EDA (Sections 1–3) |
| **Tue** | Outlier detection — IQR, Z-score, boxplots | 2 hrs | Udemy: EDA (Sections 4–5) |
| **Wed** | Encoding — Label, One-Hot, Ordinal, Target encoding | 2 hrs | Udemy: EDA (Sections 6–7) |
| **Thu** | Feature scaling — StandardScaler, MinMaxScaler, Normalizer | 2 hrs | Udemy: EDA (Section 8) |
| **Fri** | Feature selection — correlation, mutual info, VIF, chi-square | 2 hrs | Udemy: EDA (Sections 9–10) |
| **Sat** | **BUILD:** Netflix Movies & TV Shows EDA | 3 hrs | [Video: Krish Naik Netflix EDA](https://www.youtube.com/watch?v=5vOvmFfrHME) |
| **Sun** | Finish project, push to GitHub. Review all EDA techniques | 3 hrs | Create EDA cheat sheet |

#### WEEK 7 — EDA Capstone & Revision

| Day | What To Do | Time | Resource |
|-----|-----------|------|----------|
| **Mon** | Plotly & interactive visualizations | 2 hrs | YouTube: Krish Naik Plotly tutorial |
| **Tue** | EDA workflow: real end-to-end on a messy dataset | 2 hrs | Pick Kaggle dataset with missing values |
| **Wed** | Practice: Full EDA on Kaggle "Spaceship Titanic" dataset | 2 hrs | [Kaggle Competition](https://www.kaggle.com/competitions/spaceship-titanic) |
| **Thu** | NPTEL: Start NPTEL Probability & Statistics (optional, for depth) | 2 hrs | [NPTEL](https://nptel.ac.in/) |
| **Fri** | Revise: Stats flashcards, EDA pipeline, all encoding methods | 2 hrs | Self-review |
| **Sat** | **BUILD:** COVID-19 India Dashboard | 3 hrs | [Video: Siddhardhan COVID EDA](https://www.youtube.com/watch?v=MJGmOMoWB6g) |
| **Sun** | Push to GitHub. Write LinkedIn post about Phase 2 learnings | 3 hrs | LinkedIn + GitHub |

> **PHASE 2 CHECKPOINT:** You understand stats, probability, EDA, feature engineering. GitHub has 7+ projects now.

---

### ═══════════════════════════════════════════════════
### PHASE 3: MACHINE LEARNING (WEEKS 8–14)
### ═══════════════════════════════════════════════════

> **Side-track starts now:** Begin DSA (30 min/day extra). See [Section 6](#6--supplementary-tracks-sql--dsa).

#### WEEK 8 — ML Fundamentals + Linear Regression

| Day | What To Do | Time | Resource |
|-----|-----------|------|----------|
| **Mon** | What is ML? Types (supervised/unsupervised/reinforcement). Bias-Variance tradeoff | 2 hrs | Udemy: Krish Naik ML (Sections 1–2) |
| **Tue** | Linear Regression — math (cost function, gradient descent) | 2 hrs | Udemy: ML (Section 3) + CampusX supplement |
| **Wed** | Linear Regression — sklearn implementation, multiple features | 2 hrs | Udemy: ML (Section 4) |
| **Thu** | Evaluation: MSE, RMSE, MAE, R², Adjusted R² | 2 hrs | Udemy: ML (Section 5) |
| **Fri** | Regularization: Ridge (L2), Lasso (L1), ElasticNet | 2 hrs | Udemy: ML (Section 6) |
| **Sat** | **BUILD:** Bangalore House Price Prediction (start) | 3 hrs | [Video: codebasics House Price](https://www.youtube.com/watch?v=rdfbcdP75KI) |
| **Sun** | Continue project. Complete Kaggle "Intro to ML" micro-course | 3 hrs | [Kaggle Learn ML](https://www.kaggle.com/learn/intro-to-machine-learning) |

#### WEEK 9 — Classification Algorithms

| Day | What To Do | Time | Resource |
|-----|-----------|------|----------|
| **Mon** | Logistic Regression — sigmoid, decision boundary, math | 2 hrs | Udemy: ML (Section 7) |
| **Tue** | Decision Trees — entropy, information gain, Gini index | 2 hrs | Udemy: ML (Section 8) |
| **Wed** | Random Forest — bagging, feature importance, OOB score | 2 hrs | Udemy: ML (Section 9) |
| **Thu** | SVM — hyperplanes, kernels (linear, RBF, polynomial) | 2 hrs | Udemy: ML (Section 10) |
| **Fri** | KNN — distance metrics, choosing K, pros/cons | 2 hrs | Udemy: ML (Section 11) |
| **Sat** | **BUILD:** Loan Approval Prediction | 3 hrs | [Video: Siddhardhan Loan Prediction](https://www.youtube.com/watch?v=XckM1pFgZmg) |
| **Sun** | Push to GitHub. Revise all classification algorithms. Draw comparison table | 3 hrs | Notes + revision |

#### WEEK 10 — Model Evaluation & Unsupervised Learning

| Day | What To Do | Time | Resource |
|-----|-----------|------|----------|
| **Mon** | Confusion matrix, precision, recall, F1-score, ROC-AUC | 2 hrs | Udemy: ML (Section 12) |
| **Tue** | Cross-validation, stratified K-fold, GridSearchCV, RandomSearchCV | 2 hrs | Udemy: ML (Section 13) |
| **Wed** | Naive Bayes — Gaussian, Multinomial, Bernoulli | 2 hrs | Udemy: ML (Section 14) |
| **Thu** | K-Means clustering — elbow method, silhouette score | 2 hrs | Udemy: ML (Section 15) |
| **Fri** | PCA — dimensionality reduction, explained variance | 2 hrs | Udemy: ML (Section 16) |
| **Sat** | **BUILD:** Spam Email/SMS Classifier | 3 hrs | [Video: CampusX Spam Classifier](https://www.youtube.com/watch?v=YncZ0WwxyzU) |
| **Sun** | Push to GitHub. Complete Kaggle "Intermediate ML" micro-course | 3 hrs | [Kaggle Intermediate ML](https://www.kaggle.com/learn/intermediate-machine-learning) |

#### WEEK 11 — Ensemble Methods & Boosting

| Day | What To Do | Time | Resource |
|-----|-----------|------|----------|
| **Mon** | Ensemble methods overview — Bagging vs Boosting | 2 hrs | Udemy: ML (Section 17) |
| **Tue** | AdaBoost, Gradient Boosting — math + implementation | 2 hrs | Udemy: ML (Section 18) |
| **Wed** | XGBoost — parameters, tuning, feature importance | 2 hrs | Udemy: ML (Section 19) + CampusX XGBoost video |
| **Thu** | LightGBM, CatBoost — when to use which | 2 hrs | YouTube: CampusX |
| **Fri** | Kaggle: Enter "Spaceship Titanic" or "House Prices" competition | 2 hrs | [Kaggle Competitions](https://www.kaggle.com/competitions) |
| **Sat** | **BUILD:** Customer Churn Prediction | 3 hrs | [Video: Krish Naik Churn](https://www.youtube.com/watch?v=OgMOIw6OLE8) |
| **Sun** | Push to GitHub. Kaggle "Feature Engineering" micro-course | 3 hrs | [Kaggle Feature Eng](https://www.kaggle.com/learn/feature-engineering) |

#### WEEK 12 — ML Pipeline & Deployment Basics

| Day | What To Do | Time | Resource |
|-----|-----------|------|----------|
| **Mon** | sklearn Pipelines — preprocessing + model in one pipeline | 2 hrs | Udemy: ML (Section 20) |
| **Tue** | Pickle / Joblib — saving and loading models | 2 hrs | Practice with your previous projects |
| **Wed** | Streamlit basics — build a simple web UI for ML model | 2 hrs | [Video: Krish Naik Streamlit](https://www.youtube.com/watch?v=GKuU8M4W0yo) |
| **Thu** | Flask basics — create API endpoint for model prediction | 2 hrs | YouTube: Krish Naik Flask ML |
| **Fri** | Deploy house price model on Streamlit Cloud (free) | 2 hrs | Streamlit Cloud + GitHub |
| **Sat** | **BUILD:** Fake News Detection | 3 hrs | [Video: Siddhardhan Fake News](https://www.youtube.com/watch?v=nacLBdyG6jE) |
| **Sun** | Push to GitHub. Deploy on Streamlit Cloud. LinkedIn post | 3 hrs | LinkedIn + GitHub |

#### WEEK 13 — Advanced ML Project

| Day | What To Do | Time | Resource |
|-----|-----------|------|----------|
| **Mon** | Revisit all algorithms — create a master comparison chart | 2 hrs | Self-study / notes |
| **Tue** | When to use which algorithm — decision flowchart | 2 hrs | [Scikit-learn algorithm cheat sheet](https://scikit-learn.org/stable/tutorial/machine_learning_map/index.html) |
| **Wed** | Handling imbalanced data — SMOTE, undersampling, class weights | 2 hrs | CampusX YouTube + practice |
| **Thu** | Time series basics — trend, seasonality, ARIMA intro | 2 hrs | YouTube: Krish Naik time series |
| **Fri** | Practice: Take any Kaggle competition, build full pipeline in 2 hrs | 2 hrs | Kaggle |
| **Sat** | **BUILD:** Movie Recommendation System | 4 hrs | [Video: CampusX Movie Recommender](https://www.youtube.com/watch?v=1xtrIEwY_zY) |
| **Sun** | Finish project, deploy on Streamlit, push to GitHub | 3 hrs | GitHub + Streamlit Cloud |

#### WEEK 14 — ML Phase Revision & Kaggle Sprint

| Day | What To Do | Time | Resource |
|-----|-----------|------|----------|
| **Mon** | Revise: Linear/Logistic Regression, Decision Trees, Random Forest | 2 hrs | Re-read notes |
| **Tue** | Revise: SVM, KNN, Naive Bayes, K-Means, PCA | 2 hrs | Re-read notes |
| **Wed** | Revise: XGBoost, ensembles, evaluation metrics | 2 hrs | Re-read notes |
| **Thu** | Mock interview: Answer 20 ML theory questions aloud | 2 hrs | Google "ML interview questions" |
| **Fri** | Kaggle: Submit best score to any active competition | 2 hrs | Kaggle |
| **Sat** | Polish all ML projects — better READMEs, screenshots, live demo links | 3 hrs | GitHub |
| **Sun** | Write LinkedIn post: "My ML journey — 6 projects in 7 weeks" | 2 hrs | LinkedIn |

> **PHASE 3 CHECKPOINT:** 6+ ML projects on GitHub. Can build end-to-end ML pipelines. First Kaggle competition done.

---

### ═══════════════════════════════════════════════════
### PHASE 4: DEEP LEARNING (WEEKS 15–20)
### ═══════════════════════════════════════════════════

#### WEEK 15 — Neural Network Foundations

| Day | What To Do | Time | Resource |
|-----|-----------|------|----------|
| **Mon** | Perceptron, activation functions (sigmoid, ReLU, tanh, softmax) | 2 hrs | Udemy: Krish Naik DL (Sections 1–3) |
| **Tue** | Forward propagation — matrix math, weighted sum | 2 hrs | Udemy: DL (Section 4) |
| **Wed** | Backpropagation — chain rule, gradient descent, learning rate | 2 hrs | Udemy: DL (Section 5) |
| **Thu** | Loss functions — MSE, cross-entropy, hinge. Optimizers — SGD, Adam, RMSProp | 2 hrs | Udemy: DL (Sections 6–7) |
| **Fri** | Build a neural network from SCRATCH in NumPy (no library) | 2 hrs | CampusX DL playlist (Episode on NN from scratch) |
| **Sat** | TensorFlow/Keras basics — Sequential model, compile, fit, evaluate | 3 hrs | Udemy: DL (Section 8) |
| **Sun** | PyTorch basics — tensors, autograd, nn.Module | 3 hrs | CampusX PyTorch playlist (first 3 videos) |

#### WEEK 16 — CNNs (Convolutional Neural Networks)

| Day | What To Do | Time | Resource |
|-----|-----------|------|----------|
| **Mon** | Convolution operation, filters, padding, stride | 2 hrs | Udemy: DL (Section 9) |
| **Tue** | Pooling, flattening, fully connected layers | 2 hrs | Udemy: DL (Section 10) |
| **Wed** | Build CNN for MNIST digit classification | 2 hrs | Udemy: DL (Section 11) + code along |
| **Thu** | Architectures: LeNet, AlexNet, VGG16 — overview | 2 hrs | CampusX DL playlist |
| **Fri** | Dropout, BatchNorm, data augmentation — fighting overfitting | 2 hrs | Udemy: DL (Section 12) |
| **Sat** | **BUILD:** CIFAR-10 Image Classifier | 3 hrs | [Video: Krish Naik CNN](https://www.youtube.com/watch?v=7HPwo4wnJeA) |
| **Sun** | Push to GitHub. Kaggle "Computer Vision" micro-course | 3 hrs | [Kaggle CV](https://www.kaggle.com/learn/computer-vision) |

#### WEEK 17 — Transfer Learning & Object Detection

| Day | What To Do | Time | Resource |
|-----|-----------|------|----------|
| **Mon** | Transfer learning — concept, freeze/unfreeze layers | 2 hrs | Udemy: DL (Section 13) |
| **Tue** | ResNet, InceptionNet, MobileNet — when to use which | 2 hrs | Udemy: DL (Section 14) |
| **Wed** | Fine-tune VGG16/ResNet on custom dataset | 2 hrs | Code along in Jupyter |
| **Thu** | Object detection overview — RCNN, SSD, YOLO timeline | 2 hrs | YouTube: Krish Naik |
| **Fri** | YOLOv8 — install ultralytics, run inference on images | 2 hrs | [Ultralytics docs](https://docs.ultralytics.com/) |
| **Sat** | **BUILD:** Real-Time Object Detection with YOLOv8 | 3 hrs | [Video: YOLO Tutorial](https://www.youtube.com/watch?v=WgPbbWmnXJ8) |
| **Sun** | Push to GitHub. Record a demo GIF/video for README | 3 hrs | GitHub |

#### WEEK 18 — RNNs, LSTMs & Time Series

| Day | What To Do | Time | Resource |
|-----|-----------|------|----------|
| **Mon** | RNN — sequential data, hidden state, vanishing gradient problem | 2 hrs | Udemy: DL (Section 15) |
| **Tue** | LSTM — gates (forget, input, output), cell state | 2 hrs | Udemy: DL (Section 16) |
| **Wed** | GRU — simplified LSTM, when to use LSTM vs GRU | 2 hrs | Udemy: DL (Section 17) |
| **Thu** | Sequence-to-sequence models, bidirectional RNNs | 2 hrs | CampusX DL playlist |
| **Fri** | Practice: Build LSTM for text generation | 2 hrs | Code along |
| **Sat** | **BUILD:** Stock Price Prediction with LSTM | 3 hrs | [Video: Siddhardhan Stock LSTM](https://www.youtube.com/watch?v=H6du_pfuznE) |
| **Sun** | Push to GitHub. Write comparison: ANN vs CNN vs RNN | 3 hrs | Notes + GitHub |

#### WEEK 19 — Advanced DL Projects

| Day | What To Do | Time | Resource |
|-----|-----------|------|----------|
| **Mon** | Autoencoders — architecture, denoising, variational (VAE) intro | 2 hrs | Udemy: DL (Section 18) |
| **Tue** | GANs — Generator vs Discriminator, training loop | 2 hrs | Udemy: DL (Section 19) |
| **Wed** | OpenCV basics — image reading, resizing, drawing, face detection | 2 hrs | YouTube: Murtaza's Workshop |
| **Thu** | Face recognition with dlib/face_recognition library | 2 hrs | YouTube: Murtaza's Workshop |
| **Fri** | Kaggle: Enter any image classification competition | 2 hrs | Kaggle |
| **Sat** | **BUILD:** Potato Disease Detection (FastAPI + React deploy) | 4 hrs | [Video: codebasics Potato Disease](https://www.youtube.com/watch?v=dGtDTjYs3xc) |
| **Sun** | Finish project, push to GitHub | 3 hrs | GitHub |

#### WEEK 20 — DL Phase Revision

| Day | What To Do | Time | Resource |
|-----|-----------|------|----------|
| **Mon** | Revise: ANN, backprop, optimizers, loss functions | 2 hrs | Notes |
| **Tue** | Revise: CNN architectures, transfer learning | 2 hrs | Notes |
| **Wed** | Revise: RNN, LSTM, GRU, sequence models | 2 hrs | Notes |
| **Thu** | Kaggle "Intro to Deep Learning" micro-course | 2 hrs | [Kaggle DL](https://www.kaggle.com/learn/intro-to-deep-learning) |
| **Fri** | Mock: Answer 15 DL interview questions aloud | 2 hrs | Google "Deep Learning interview questions" |
| **Sat** | **BUILD:** Dog vs Cat Classifier with Transfer Learning | 3 hrs | [Video: Siddhardhan Dog Cat](https://www.youtube.com/watch?v=LIbKumHplWE) |
| **Sun** | Polish ALL DL projects. LinkedIn post about DL journey | 3 hrs | LinkedIn + GitHub |

> **PHASE 4 CHECKPOINT:** Understand ANN/CNN/RNN/LSTM. 5+ DL projects on GitHub. Can train and deploy DL models.

---

### ═══════════════════════════════════════════════════
### PHASE 5: NLP (WEEKS 21–25)
### ═══════════════════════════════════════════════════

#### WEEK 21 — NLP Basics & Text Preprocessing

| Day | What To Do | Time | Resource |
|-----|-----------|------|----------|
| **Mon** | Tokenization, stopwords, stemming, lemmatization | 2 hrs | Udemy: Krish Naik NLP (Sections 1–3) |
| **Tue** | Bag of Words, TF-IDF — math + sklearn implementation | 2 hrs | Udemy: NLP (Sections 4–5) |
| **Wed** | Word2Vec, GloVe — word embeddings concept | 2 hrs | Udemy: NLP (Sections 6–7) |
| **Thu** | spaCy & NLTK — hands-on with both libraries | 2 hrs | Udemy: NLP (Section 8) |
| **Fri** | Practice: Preprocess 3 different text datasets (tweets, reviews, news) | 2 hrs | Kaggle datasets |
| **Sat** | **BUILD:** Sentiment Analysis on Product Reviews | 3 hrs | [Video: Krish Naik Sentiment](https://www.youtube.com/watch?v=M9Itm95JzL0) |
| **Sun** | Push to GitHub. Kaggle "NLP" micro-course | 3 hrs | [Kaggle NLP](https://www.kaggle.com/learn/natural-language-processing) |

#### WEEK 22 — Advanced NLP & Text Classification

| Day | What To Do | Time | Resource |
|-----|-----------|------|----------|
| **Mon** | Text classification pipeline — preprocessing → vectorization → model | 2 hrs | Udemy: NLP (Section 9) |
| **Tue** | RNN/LSTM for text — sequence classification | 2 hrs | Udemy: NLP (Section 10) |
| **Wed** | Attention mechanism — intuition, self-attention | 2 hrs | Udemy: NLP (Section 11) |
| **Thu** | Transformer architecture — encoder-decoder, multi-head attention | 2 hrs | Udemy: NLP (Section 12) + CampusX NLP playlist |
| **Fri** | Practice: Build text classifier with LSTM in PyTorch | 2 hrs | Code along |
| **Sat** | **BUILD:** Resume Parser/Screener | 3 hrs | [Video: CampusX Resume Screening](https://www.youtube.com/watch?v=rIV9smFwKCk) |
| **Sun** | Push to GitHub. Watch "Attention is All You Need" paper walkthrough | 3 hrs | YouTube: CampusX |

#### WEEK 23 — Transformers & Hugging Face

| Day | What To Do | Time | Resource |
|-----|-----------|------|----------|
| **Mon** | BERT — architecture, pre-training, fine-tuning concept | 2 hrs | Udemy: Course 9 (Sections 1–3) |
| **Tue** | GPT — autoregressive vs autoencoding, GPT-2/3/4 overview | 2 hrs | Udemy: Course 9 (Section 4) |
| **Wed** | Hugging Face — pipelines, tokenizers, model hub | 2 hrs | Udemy: Course 9 (Section 5) |
| **Thu** | Fine-tune BERT for classification using Hugging Face Trainer | 2 hrs | Udemy: Course 9 (Section 6) |
| **Fri** | Practice: Fine-tune a model on custom dataset | 2 hrs | Hugging Face + Colab |
| **Sat** | **BUILD:** Multilingual Sentiment with BERT | 3 hrs | [Video: CampusX BERT Fine-Tuning](https://www.youtube.com/watch?v=H14SNk0_0OE) |
| **Sun** | Push to GitHub. Deploy on Hugging Face Spaces (free) | 3 hrs | Hugging Face Spaces |

#### WEEK 24 — NER, Summarization & QA

| Day | What To Do | Time | Resource |
|-----|-----------|------|----------|
| **Mon** | Named Entity Recognition (NER) — concepts, BIO tagging | 2 hrs | Udemy: NLP (Section 13) |
| **Tue** | NER with spaCy + Hugging Face | 2 hrs | Code along |
| **Wed** | Text summarization — extractive (TextRank) vs abstractive (T5, BART) | 2 hrs | Udemy: NLP (Section 14) |
| **Thu** | Question Answering — BERT for QA, SQuAD dataset | 2 hrs | CampusX NLP playlist |
| **Fri** | Semantic search — sentence transformers, cosine similarity | 2 hrs | Hugging Face docs |
| **Sat** | **BUILD:** Text Summarizer | 3 hrs | [Video: Krish Naik Summarizer](https://www.youtube.com/watch?v=JU6eSLsp6vI) |
| **Sun** | Push to GitHub. Deploy on Streamlit | 3 hrs | Streamlit Cloud |

#### WEEK 25 — NLP Revision & Chatbot

| Day | What To Do | Time | Resource |
|-----|-----------|------|----------|
| **Mon** | Revise: Bag of Words → TF-IDF → Word2Vec → Transformers evolution | 2 hrs | Notes |
| **Tue** | Revise: BERT vs GPT, encoder vs decoder models | 2 hrs | Notes |
| **Wed** | Practice: Fine-tune a model for a completely new task | 2 hrs | Hugging Face + Colab |
| **Thu** | Read 2 NLP research paper summaries (Papers With Code) | 2 hrs | [paperswithcode.com](https://paperswithcode.com/) |
| **Fri** | Mock: Answer 15 NLP interview questions | 2 hrs | Google "NLP interview questions" |
| **Sat** | **BUILD:** Chatbot with Transformers | 3 hrs | [Video: Krish Naik Chatbot](https://www.youtube.com/watch?v=RpWeNzfSUHw) |
| **Sun** | Polish NLP projects. LinkedIn post. Prepare for GenAI phase! | 3 hrs | LinkedIn + GitHub |

> **PHASE 5 CHECKPOINT:** Understand NLP end-to-end, Transformers, BERT/GPT, Hugging Face. 5 NLP projects on GitHub.

---

### ═══════════════════════════════════════════════════
### PHASE 6: GENERATIVE AI & LLMs (WEEKS 26–32) ⭐
### ═══════════════════════════════════════════════════

#### WEEK 26 — LLM Fundamentals & Prompt Engineering

| Day | What To Do | Time | Resource |
|-----|-----------|------|----------|
| **Mon** | What are LLMs? GPT architecture deep dive, tokens, temperature, top_p | 2 hrs | Udemy: Krish Naik GenAI (Sections 1–3) |
| **Tue** | OpenAI API — setup, chat completions, system/user/assistant roles | 2 hrs | Udemy: GenAI (Section 4) |
| **Wed** | Prompt Engineering — zero-shot, few-shot, chain-of-thought, ReAct | 2 hrs | Udemy: GenAI (Section 5) |
| **Thu** | Google Gemini API — setup, multimodal capabilities | 2 hrs | Udemy: GenAI (Section 6) |
| **Fri** | Practice: Build 3 different prompts (code reviewer, translator, tutor) | 2 hrs | OpenAI Playground / Gemini |
| **Sat** | **BUILD:** AI Blog Generator with Streamlit | 3 hrs | [Video: Krish Naik Blog Gen](https://www.youtube.com/watch?v=x0AnCE9SE4A) |
| **Sun** | Push to GitHub. Watch Krish Naik GenAI YouTube playlist (first 10 vids) | 3 hrs | YouTube (FREE supplement) |

#### WEEK 27 — LangChain Core

| Day | What To Do | Time | Resource |
|-----|-----------|------|----------|
| **Mon** | LangChain setup, LLMs vs ChatModels, prompt templates | 2 hrs | Udemy: GenAI (Sections 7–8) |
| **Tue** | Chains — LLMChain, SequentialChain, RouterChain | 2 hrs | Udemy: GenAI (Sections 9–10) |
| **Wed** | Memory — ConversationBufferMemory, Summary, WindowMemory | 2 hrs | Udemy: GenAI (Section 11) |
| **Thu** | Output parsers — structured output, Pydantic parsers | 2 hrs | Udemy: GenAI (Section 12) |
| **Fri** | Practice: Build a multi-chain app with memory | 2 hrs | Code along |
| **Sat** | **BUILD:** AI Customer Support Bot | 3 hrs | [Video: Krish Naik Chatbot](https://www.youtube.com/watch?v=nAmC7SoVLd8) |
| **Sun** | Push to GitHub. Supplement with CampusX LangChain playlist | 3 hrs | YouTube (FREE) |

#### WEEK 28 — RAG (Retrieval Augmented Generation) ⭐⭐

| Day | What To Do | Time | Resource |
|-----|-----------|------|----------|
| **Mon** | What is RAG? Why LLMs need retrieval. Architecture overview | 2 hrs | Udemy: GenAI (Section 13) |
| **Tue** | Document loaders — PDF, CSV, web, YouTube transcript | 2 hrs | Udemy: GenAI (Section 14) |
| **Wed** | Text splitting — RecursiveCharacterTextSplitter, chunk size/overlap | 2 hrs | Udemy: GenAI (Section 15) |
| **Thu** | Embeddings — OpenAI, Hugging Face, sentence-transformers | 2 hrs | Udemy: GenAI (Section 16) |
| **Fri** | Vector databases — ChromaDB, FAISS, Pinecone. Similarity search | 2 hrs | Udemy: GenAI (Section 17) |
| **Sat** | **BUILD:** RAG Chatbot — Chat with PDF ⭐ | 4 hrs | [Video: Krish Naik RAG](https://www.youtube.com/watch?v=2TJxpyO3ei4) |
| **Sun** | Finish, deploy on Streamlit Cloud, push to GitHub | 3 hrs | THIS IS YOUR #1 PORTFOLIO PROJECT |

#### WEEK 29 — Advanced RAG & Multi-Document

| Day | What To Do | Time | Resource |
|-----|-----------|------|----------|
| **Mon** | RetrievalQA chain, stuff/map_reduce/refine strategies | 2 hrs | Udemy: GenAI (Section 18) |
| **Tue** | Conversational RAG — chat history + retrieval | 2 hrs | Udemy: GenAI (Section 19) |
| **Wed** | Multi-document RAG — handling multiple file types | 2 hrs | Krish Naik RAG YouTube series |
| **Thu** | Hybrid search — dense + sparse retrieval, re-ranking | 2 hrs | YouTube: Krish Naik Advanced RAG |
| **Fri** | Evaluation: RAGAS framework, faithfulness, relevancy scores | 2 hrs | Practice + docs |
| **Sat** | **BUILD:** Multi-Document RAG with ChromaDB | 3 hrs | [Video: Krish Naik Advanced RAG](https://www.youtube.com/watch?v=dXxQ0LR-3Hg) |
| **Sun** | Push to GitHub. Deploy. LinkedIn post about RAG | 3 hrs | LinkedIn + GitHub |

#### WEEK 30 — LLM Fine-Tuning

| Day | What To Do | Time | Resource |
|-----|-----------|------|----------|
| **Mon** | Why fine-tune? Full fine-tuning vs parameter-efficient (PEFT) | 2 hrs | Udemy: Course 11 (Sections 1–2) |
| **Tue** | LoRA — Low-Rank Adaptation, math intuition | 2 hrs | Udemy: Course 11 (Section 3) |
| **Wed** | QLoRA — 4-bit quantization + LoRA | 2 hrs | Udemy: Course 11 (Section 4) |
| **Thu** | Fine-tune Llama/Mistral on custom dataset using HF + LoRA | 2 hrs | Udemy: Course 11 (Section 5) + Colab |
| **Fri** | RLHF, DPO concepts — alignment of LLMs | 2 hrs | Udemy: Course 11 (Section 6) |
| **Sat** | **BUILD:** Invoice Extractor with Gemini | 3 hrs | [Video: Krish Naik Invoice](https://www.youtube.com/watch?v=szQSzOg8os8) |
| **Sun** | Push to GitHub. Watch Krish Naik fine-tuning YouTube series | 3 hrs | YouTube (FREE) |

#### WEEK 31 — AI Agents

| Day | What To Do | Time | Resource |
|-----|-----------|------|----------|
| **Mon** | What are AI Agents? ReAct pattern, tool-calling | 2 hrs | Udemy: Course 12 (Sections 1–2) |
| **Tue** | LangChain Agents — create_tool_calling_agent, AgentExecutor | 2 hrs | Udemy: Course 12 (Section 3) |
| **Wed** | LangGraph — stateful graphs, nodes, edges, conditional routing | 2 hrs | Udemy: Course 12 (Section 4) |
| **Thu** | CrewAI — agents, tasks, crews, multi-agent collaboration | 2 hrs | Udemy: Course 12 (Section 5) |
| **Fri** | Practice: Build a simple research agent with web search tool | 2 hrs | Code along |
| **Sat** | **BUILD:** Multi-Agent AI System with CrewAI | 4 hrs | [Video: Krish Naik CrewAI](https://www.youtube.com/watch?v=tnejrr-0a94) |
| **Sun** | Push to GitHub. Deploy. This is your 2nd best portfolio project | 3 hrs | GitHub + Streamlit |

#### WEEK 32 — GenAI Capstone & Revision

| Day | What To Do | Time | Resource |
|-----|-----------|------|----------|
| **Mon** | Revise: LangChain chains, memory, RAG pipeline | 2 hrs | Notes |
| **Tue** | Revise: Vector DBs, embeddings, retrieval strategies | 2 hrs | Notes |
| **Wed** | Revise: Fine-tuning (LoRA/QLoRA), agents, LangGraph | 2 hrs | Notes |
| **Thu** | Build: Combine RAG + Agent in one application | 2 hrs | Code along — agentic RAG |
| **Fri** | Practice: Answer 20 GenAI interview questions | 2 hrs | Google "GenAI interview questions" |
| **Sat** | **BUILD:** AI Resume Analyzer & ATS Scorer | 3 hrs | [Video: Krish Naik ATS](https://www.youtube.com/watch?v=AUMkVd_wvGw) |
| **Sun** | Polish ALL GenAI projects. LinkedIn post. Update resume | 3 hrs | LinkedIn + GitHub + Resume |

> **PHASE 6 CHECKPOINT:** Can build RAG, agents, fine-tune LLMs. 8+ GenAI projects. THIS ALONE can get you a job in 2025-26.

---

### ═══════════════════════════════════════════════════
### PHASE 7: MLOps & DEPLOYMENT (WEEKS 33–37)
### ═══════════════════════════════════════════════════

#### WEEK 33 — FastAPI & Model Serving

| Day | What To Do | Time | Resource |
|-----|-----------|------|----------|
| **Mon** | FastAPI basics — routes, path/query params, request/response models | 2 hrs | Udemy: Krish Naik MLOps (Sections 1–3) |
| **Tue** | Build ML prediction API with FastAPI | 2 hrs | Udemy: MLOps (Section 4) |
| **Wed** | Pydantic models, validation, error handling | 2 hrs | Udemy: MLOps (Section 5) |
| **Thu** | Async endpoints, middleware, CORS | 2 hrs | FastAPI docs + practice |
| **Fri** | Serve a model: load pickle → predict → return JSON | 2 hrs | Code along |
| **Sat** | **BUILD:** Deploy ML Model with FastAPI | 3 hrs | [Video: Krish Naik FastAPI](https://www.youtube.com/watch?v=h5wLuVDr0oc) |
| **Sun** | Push to GitHub. Test API with Postman/Thunder Client | 3 hrs | GitHub |

#### WEEK 34 — Docker & Containerization

| Day | What To Do | Time | Resource |
|-----|-----------|------|----------|
| **Mon** | Docker basics — images, containers, Dockerfile, docker build/run | 2 hrs | Udemy: MLOps (Sections 6–7) |
| **Tue** | Write Dockerfile for ML API (FastAPI + model) | 2 hrs | Udemy: MLOps (Section 8) |
| **Wed** | Docker Compose — multi-container (API + DB + Redis) | 2 hrs | Udemy: MLOps (Section 9) |
| **Thu** | Docker Hub — push/pull images, tagging | 2 hrs | Practice |
| **Fri** | Containerize your best ML project | 2 hrs | Previous project + Docker |
| **Sat** | Dockerize the FastAPI model from Week 33 fully | 3 hrs | Code along |
| **Sun** | Push to GitHub. CampusX Docker playlist (supplement) | 3 hrs | YouTube (FREE) |

#### WEEK 35 — MLflow & Experiment Tracking

| Day | What To Do | Time | Resource |
|-----|-----------|------|----------|
| **Mon** | MLflow setup, tracking experiments, logging params/metrics | 2 hrs | Udemy: MLOps (Sections 10–11) |
| **Tue** | MLflow model registry — register, version, stage transitions | 2 hrs | Udemy: MLOps (Section 12) |
| **Wed** | DVC — data version control setup, dvc init, dvc add, dvc push | 2 hrs | Udemy: MLOps (Section 13) |
| **Thu** | DVC pipelines — dvc.yaml, dvc repro, reproducible experiments | 2 hrs | Udemy: MLOps (Section 14) |
| **Fri** | Practice: Full experiment with MLflow + DVC on a project | 2 hrs | Code along |
| **Sat** | **BUILD:** ML Pipeline with MLflow | 3 hrs | [Video: Krish Naik MLflow](https://www.youtube.com/watch?v=qdcHHrsXA48) |
| **Sun** | Push to GitHub. Include MLflow screenshots in README | 3 hrs | GitHub |

#### WEEK 36 — CI/CD & GitHub Actions

| Day | What To Do | Time | Resource |
|-----|-----------|------|----------|
| **Mon** | CI/CD concepts — continuous integration, delivery, deployment | 2 hrs | Udemy: MLOps (Sections 15–16) |
| **Tue** | GitHub Actions — workflow YAML, triggers, jobs, steps | 2 hrs | Udemy: MLOps (Section 17) |
| **Wed** | Build CI pipeline — lint, test, build Docker on push | 2 hrs | Code along |
| **Thu** | CD pipeline — auto-deploy to cloud on merge to main | 2 hrs | Udemy: MLOps (Section 18) |
| **Fri** | Practice: Add GitHub Actions to one of your existing projects | 2 hrs | GitHub |
| **Sat** | **BUILD:** CI/CD for ML with GitHub Actions | 3 hrs | [Video: Krish Naik CI/CD](https://www.youtube.com/watch?v=jEBVumYUwVc) |
| **Sun** | Push to GitHub. Include .github/workflows/ in repo | 3 hrs | GitHub |

#### WEEK 37 — Cloud Deployment (AWS)

| Day | What To Do | Time | Resource |
|-----|-----------|------|----------|
| **Mon** | AWS basics — EC2, S3, ECR, IAM (free tier) | 2 hrs | Udemy: MLOps (Sections 19–20) |
| **Tue** | Deploy Docker container to AWS EC2 | 2 hrs | Udemy: MLOps (Section 21) |
| **Wed** | AWS ECR — push Docker image to Elastic Container Registry | 2 hrs | Udemy: MLOps (Section 22) |
| **Thu** | Streamlit Cloud + Hugging Face Spaces — free deployment alternatives | 2 hrs | Practice |
| **Fri** | Gradio — build quick ML demos, deploy to HF Spaces | 2 hrs | Gradio docs + practice |
| **Sat** | **BUILD:** Deploy on AWS (EC2 + ECR) — End to End | 3 hrs | [Video: Krish Naik AWS Deploy](https://www.youtube.com/watch?v=Lnxqx0W5gaw) |
| **Sun** | Push to GitHub. Polish ALL MLOps projects. LinkedIn post | 3 hrs | LinkedIn + GitHub |

> **PHASE 7 CHECKPOINT:** Can containerize, track experiments, set up CI/CD, deploy to cloud. You're production-ready.

---

### ═══════════════════════════════════════════════════
### PHASE 8: INTERVIEW PREP & CAPSTONE (WEEKS 38–42)
### ═══════════════════════════════════════════════════

#### WEEK 38 — ML/DL Theory Interview Prep

| Day | What To Do | Time | Resource |
|-----|-----------|------|----------|
| **Mon** | Top 30 ML interview questions — practice answering aloud | 2 hrs | Udemy: Krish Naik Interview Prep (Section 1) |
| **Tue** | Top 20 DL interview questions | 2 hrs | Udemy: Interview Prep (Section 2) |
| **Wed** | Top 15 NLP interview questions | 2 hrs | Udemy: Interview Prep (Section 3) |
| **Thu** | Top 20 GenAI/LLM interview questions | 2 hrs | Google + YouTube: Krish Naik |
| **Fri** | Statistics & probability interview questions | 2 hrs | Udemy: Interview Prep (Section 4) |
| **Sat** | Mock interview with a friend / ChatGPT | 3 hrs | Practice |
| **Sun** | Review weak areas, make flashcards | 3 hrs | Anki / Notion flashcards |

#### WEEK 39 — Coding & System Design Interview Prep

| Day | What To Do | Time | Resource |
|-----|-----------|------|----------|
| **Mon** | Python coding interview questions (20 problems) | 2 hrs | Udemy: Interview Prep (Section 5) |
| **Tue** | SQL interview questions — joins, window functions, CTEs | 2 hrs | YouTube: CampusX SQL playlist |
| **Wed** | ML system design — recommendation system, fraud detection | 2 hrs | YouTube: Search "ML system design interview" |
| **Thu** | Case studies — how would you build X? (spam filter, search engine) | 2 hrs | Udemy: Interview Prep (Section 6) |
| **Fri** | Resume building — tailor for AI/ML roles, ATS-friendly format | 2 hrs | Udemy: Interview Prep (Section 7) |
| **Sat** | Update resume. List all projects with impact/metrics | 3 hrs | Resume + LinkedIn |
| **Sun** | Update LinkedIn: headline, about, experience, projects, skills | 3 hrs | LinkedIn profile optimization |

#### WEEK 40 — Capstone Project 1

| Day | What To Do | Time | Resource |
|-----|-----------|------|----------|
| **Mon** | Plan capstone: Full-Stack AI SaaS App architecture | 2 hrs | Whiteboard / Excalidraw |
| **Tue** | Backend: FastAPI + PostgreSQL + LangChain setup | 2 hrs | Code |
| **Wed** | RAG pipeline: document upload → embedding → vector store | 2 hrs | Code |
| **Thu** | Frontend: Next.js / Streamlit — chat UI with streaming | 2 hrs | Code |
| **Fri** | Integration: Connect frontend ↔ backend ↔ LLM | 2 hrs | Code |
| **Sat** | **BUILD:** Full-Stack AI SaaS App (continued) | 4 hrs | [Video: codebasics E2E AI App](https://www.youtube.com/watch?v=qKM6GfqGF0o) |
| **Sun** | Deploy. Push to GitHub. Record demo video | 3 hrs | GitHub + Loom/screen recording |

#### WEEK 41 — Capstone Project 2 + Portfolio Polish

| Day | What To Do | Time | Resource |
|-----|-----------|------|----------|
| **Mon** | **BUILD:** AI-Powered Data Analyst (start) | 2 hrs | [Video: Krish Naik AI Analyst](https://www.youtube.com/watch?v=_yGXyJMd8S0) |
| **Tue** | Continue: CSV upload → auto EDA → AI insights | 2 hrs | Code |
| **Wed** | Continue: Chart generation + natural language SQL | 2 hrs | Code |
| **Thu** | Finish, deploy, push to GitHub | 2 hrs | GitHub + deploy |
| **Fri** | GitHub: Polish ALL project READMEs — screenshots, GIFs, live links | 2 hrs | GitHub |
| **Sat** | Create a Portfolio Website (use GitHub Pages / Vercel — free) | 3 hrs | [GitHub Pages](https://pages.github.com/) |
| **Sun** | Add all projects to portfolio site. Write an "About Me" page | 3 hrs | Portfolio site |

#### WEEK 42 — Job Application Sprint

| Day | What To Do | Time | Resource |
|-----|-----------|------|----------|
| **Mon** | Finalize resume (2 versions: AI Engineer + Data Scientist) | 2 hrs | — |
| **Tue** | Apply to 10 jobs on LinkedIn, Naukri, Instahyre | 2 hrs | Job portals |
| **Wed** | Apply to 10 more jobs. Cold message 5 recruiters on LinkedIn | 2 hrs | LinkedIn |
| **Thu** | Apply to 10 more. Contribute to 1 open-source AI project | 2 hrs | GitHub |
| **Fri** | Mock interview: Full round (theory + coding + case study) | 2 hrs | Friend / AI mock |
| **Sat** | Write a LinkedIn article: "My 10-month journey from 0 to AI Engineer" | 3 hrs | LinkedIn |
| **Sun** | Rest. Reflect. You've done something incredible. Continue applying daily | 2 hrs | — |

> **FINAL CHECKPOINT:**
> - 35+ projects on GitHub
> - Portfolio website live
> - Resume optimized
> - LinkedIn profile polished
> - Applied to 30+ jobs
> - Ready for interviews

---

## 6. SUPPLEMENTARY TRACKS (SQL + DSA)

> These run PARALLEL to your main course. Don't skip them — they're asked in every interview.

### SQL — Start from Week 4 (30 min/day extra)

> 95% of AI/DS job postings list SQL as required. Your Udemy courses focus on Python + ML but barely touch SQL.

**Free Resources:**

| Resource | Creator | Link |
|----------|---------|------|
| SQL Full Course (Hindi) | CampusX (Nitish Singh) | [YouTube](https://www.youtube.com/playlist?list=PLKnIA16OIAhEkQHnVmj5GJwZNFk0tqRLH) |
| SQL for Data Science | Dhaval Patel (codebasics) | [YouTube](https://www.youtube.com/playlist?list=PLeo1K3hjS3uuqXOPjDac8hRF4M7qvTvPG) |
| MySQL Complete Course | CodeWithHarry (Hindi) | [YouTube Playlist](https://www.youtube.com/playlist?list=PLu0W_9lII9ajLcqRcj4PoEihkukF_OTzA) |
| Kaggle SQL Micro-Course | — | [kaggle.com/learn/intro-to-sql](https://www.kaggle.com/learn/intro-to-sql) |
| Kaggle Advanced SQL | — | [kaggle.com/learn/advanced-sql](https://www.kaggle.com/learn/advanced-sql) |

**SQL Practice:** [LeetCode Top SQL 50](https://leetcode.com/studyplan/top-sql-50/) + [HackerRank SQL](https://www.hackerrank.com/domains/sql)

**Schedule:**

```
Week 4–5:   SELECT, WHERE, ORDER BY, GROUP BY, HAVING, LIKE, IN
Week 6–7:   JOINs (INNER, LEFT, RIGHT, FULL), subqueries, UNION
Week 8–10:  Window functions (ROW_NUMBER, RANK, LAG, LEAD, OVER/PARTITION BY)
Week 11–14: CTEs, CASE WHEN, DATE functions, string functions
Ongoing:    Solve 50 SQL problems on LeetCode (Top SQL 50 study plan)
```

---

### DSA — Start from Week 8 (30 min/day extra)

> Many AI/ML jobs (especially at FAANG, startups, product companies) still have a DSA coding round. You need BASIC DSA — not competitive programming level.

**What to Cover:**

```
MUST KNOW (asked in 80% of AI interviews):
├── Arrays & Strings — two pointers, sliding window, sorting
├── HashMaps & Sets — frequency counting, lookups
├── Binary Search — on sorted arrays, search space
├── Stacks & Queues — basic operations, monotonic stack
├── Recursion & Backtracking — permutations, subsets
└── Basic Graphs — BFS, DFS (for knowledge graphs in AI)

OPTIONAL (only for FAANG-level):
├── Trees & BST
├── Dynamic Programming (basic)
└── Heaps
```

**Resources:**

| Resource | Creator | Link |
|----------|---------|------|
| DSA Full Course (Hindi) | CodeWithHarry | [YouTube](https://www.youtube.com/playlist?list=PLu0W_9lII9ahIappRPN0MCAgtOu3lQjQi) |
| DSA in Python | Abdul Bari | YouTube — search "Abdul Bari algorithms" |
| LeetCode Blind 75 | — | [neetcode.io/practice](https://neetcode.io/practice) — solve in Python |

**Target:**

```
By Week 14: Solve 30 Easy problems on LeetCode (Python)
By Week 25: Solve 20 Medium problems
By Week 38: Total 75 problems solved (Blind 75 list)
```

> Don't spend more than 30 min/day on DSA. It's a supplement, not the focus. AI fundamentals > DSA for AI roles.

---

## 7. CAREER, NETWORKING & CERTIFICATIONS

### Job Roles You Can Target

| Role | Salary (India) | Salary (Remote/Global) | Key Skills |
|------|---------------|------------------------|------------|
| **AI Engineer** | ₹8–25 LPA | $80K–$150K | GenAI, LangChain, RAG, LLMs |
| **ML Engineer** | ₹10–30 LPA | $100K–$180K | ML, DL, MLOps, deployment |
| **Data Scientist** | ₹8–22 LPA | $90K–$160K | ML, Statistics, Python, SQL |
| **GenAI Developer** | ₹12–35 LPA | $100K–$200K | LLMs, Agents, RAG, LangChain |
| **NLP Engineer** | ₹10–28 LPA | $90K–$170K | NLP, Transformers, BERT, fine-tuning |
| **MLOps Engineer** | ₹10–25 LPA | $100K–$170K | Docker, CI/CD, MLflow, cloud |

### Golden GitHub Portfolio (Top 6 Projects to Pin)

| Priority | Project | Why It Impresses |
|----------|---------|------------------|
| 1 | **RAG Chatbot (Chat with PDF)** | Shows you can build what companies want in 2025-26 |
| 2 | **Multi-Agent AI System** | Cutting-edge AI Agents — very few candidates have this |
| 3 | **Movie Recommendation System** | Classic ML + deployment — solid fundamentals |
| 4 | **Object Detection (YOLO)** | Visual, impressive, shows DL depth |
| 5 | **End-to-End ML with MLOps** | Docker + CI/CD + AWS — production-ready proof |
| 6 | **Full-Stack AI SaaS App** | Frontend + Backend + AI — full-stack proof |

### LinkedIn Strategy

```
Week 1–7:   Post 1x/week — "Today I learned..." (share EDA charts, code snippets)
Week 8–14:  Post 2x/week — Share ML project demos with screenshots
Week 15–25: Post 2x/week — DL/NLP projects with GitHub links + live demos
Week 26–32: Post 3x/week — GenAI projects (these go VIRAL on LinkedIn)
Week 33–42: Post 3x/week — MLOps, capstone projects, "hiring" posts

EVERY POST FORMULA:
  → Hook (1 line that makes people stop scrolling)
  → What you built (2-3 lines)
  → Screenshot / GIF / demo link
  → What you learned (2-3 lines)
  → Call to action ("What should I build next?")
  → 3-5 hashtags: #AI #MachineLearning #GenAI #LangChain #BuildInPublic
```

### Communities to Join

**Discord Servers:** MLSpace (Indian ML community), Krish Naik's Community (iNeuron Discord), Hugging Face, LangChain, Kaggle Discord

**Twitter/X Accounts to Follow:**
- @krishnaik06 (Krish Naik) — Daily AI updates
- @campusx (CampusX) — ML/DL tutorials
- @codebasics (Dhaval Patel) — Data science tips
- @karpathy (Andrej Karpathy) — Deep AI insights
- @hwchung27 (Harrison Chase) — LangChain creator, GenAI trends

**Subreddits:** r/MachineLearning, r/learnmachinelearning, r/LocalLLaMA, r/datascience, r/developersIndia

### Certifications That Actually Matter

**Worth Getting (High ROI):**

| Certification | Cost | Time | Why |
|---------------|------|------|-----|
| NPTEL (1–2 IIT courses) | ₹1,000/cert | 8–12 weeks | "IIT" on your resume. Respected by Indian companies. |
| Google AI Essentials (Coursera) | FREE | 10 hrs | Google brand on resume. Easy to get. |
| AWS Cloud Practitioner | $100 (~₹8,500) | 2–4 weeks | Shows cloud knowledge. Amazon badge. |
| Kaggle Micro-Course Certificates | FREE | 40 hrs total | Shows hands-on skills. 10+ certificates. |
| Hugging Face NLP Course Certificate | FREE | 20 hrs | Shows transformer/LLM knowledge. |
| LangChain Academy Certificates | FREE | 10 hrs | Direct proof of GenAI skills. [academy.langchain.com](https://academy.langchain.com/) |

**Skip These (Low ROI):** IBM Data Science (Coursera) — outdated, everyone has it. Generic ₹50K+ "AI Certificate" bootcamps. Microsoft AI-900 — too basic.

> **Projects > Certifications. ALWAYS.** But 2–3 strategic certs (NPTEL + Google + AWS) add credibility without costing much.

---

## 8. BOOKS & STAYING CURRENT

### Recommended Books

| Book | Author | Phase | Why Read |
|------|--------|-------|----------|
| Python Crash Course | Eric Matthes | Phase 1 | Best Python book for beginners |
| **Hands-On ML with Scikit-Learn, Keras & TensorFlow** | **Aurélien Géron** | **Phase 3–4** | **THE Bible of practical ML/DL** |
| The Hundred-Page Machine Learning Book | Andriy Burkov | Phase 3 | Concise ML theory. Perfect for interview revision |
| Deep Learning | Ian Goodfellow | Phase 4 | The deep learning textbook. Read chapters selectively |
| Speech and Language Processing | Jurafsky & Martin | Phase 5 | NLP theory (free: [web.stanford.edu/~jurafsky/slp3/](https://web.stanford.edu/~jurafsky/slp3/)) |
| Designing Machine Learning Systems | Chip Huyen | Phase 7 | MLOps & system design. Amazing for interviews |
| Build a Large Language Model (From Scratch) | Sebastian Raschka | Phase 6 | Understand LLMs at the deepest level |

**Free Online Books:** [Python DS Handbook](https://jakevdp.github.io/PythonDataScienceHandbook/), [Dive into DL](https://d2l.ai/), [Probabilistic ML](https://probml.github.io/pml-book/), [HF NLP Course](https://huggingface.co/learn/nlp-course), [LangChain Docs](https://python.langchain.com/docs/)

> Don't read books cover-to-cover. Use them as REFERENCE alongside courses. Stuck on backpropagation? Read that chapter in Goodfellow. Books are for depth, not first-time learning.

### After Week 42 — The Ongoing Loop

```
MONTHLY LOOP:
├── Week 1: Build 1 new project (keep GitHub active)
├── Week 2: Read 2 AI research papers/blogs (stay current)
├── Week 3: Apply to 10+ jobs, attend 1 networking event
├── Week 4: Contribute to 1 open-source repo + write 1 LinkedIn post
└── REPEAT until hired. Then CONTINUE to grow on the job.
```

**Stay Current With:**

| What | Where | Frequency |
|------|-------|-----------|
| AI News | [daily.dev](https://daily.dev/), Twitter/X | Daily (10 min) |
| Research Papers | [papers.labml.ai](https://papers.labml.ai/), arxiv-sanity | Weekly (1 paper) |
| New LLM Releases | HF trending, r/LocalLLaMA | Weekly |
| LangChain Updates | [LangChain blog](https://blog.langchain.dev/) | Bi-weekly |
| Kaggle Competitions | [kaggle.com/competitions](https://www.kaggle.com/competitions) | Monthly |
| AI Podcasts | "Chai Time Data Science" by Sanyam Bhutani (Indian!) | Weekly |

**Open Source Contributions (Huge for Resume):**

| Repo | Difficulty | Why |
|------|-----------|-----|
| LangChain | Medium | Shows GenAI depth |
| Hugging Face Transformers | Medium-Hard | Top-tier resume signal |
| Streamlit | Easy-Medium | Good first contribution |
| scikit-learn | Medium | Classic ML library |
| Label Studio | Easy | Good first PR |

> Start with: Fix documentation, add examples, fix small bugs. Don't try to rewrite core code on day 1.

---

## 9. COMMON MISTAKES TO AVOID

| # | Mistake | Fix |
|---|---------|-----|
| 1 | **Tutorial Hell** — watching endlessly without building | Rule: 1 hour watch = 1 hour code |
| 2 | **Skipping math/stats** — you'll hit a wall in DL/NLP | Power through Phase 2. It pays off in Phase 4+ |
| 3 | **Not pushing to GitHub daily** — no portfolio = no proof | Commit EVERY day. Even small changes |
| 4 | **Buying too many courses** — shiny object syndrome | Buy MAX 5 courses. Finish each before buying next |
| 5 | **Skipping SQL** — 90% of interviews have SQL round | 30 min/day from Week 4. Non-negotiable |
| 6 | **Ignoring deployment** — "works on my machine" isn't enough | Every project should be deployed (Streamlit Cloud = free) |
| 7 | **Perfectionism** — spending 2 weeks for 99% accuracy | 80% accuracy + deployed > 99% accuracy in notebook |
| 8 | **Not networking on LinkedIn** — applying blindly to 100 jobs | Post weekly. Comment on posts. DM recruiters |
| 9 | **Learning React/Angular for AI roles** — wasting time on frontend | Streamlit/Gradio for AI demos. Period. |
| 10 | **Not reading error messages** — blindly pasting into ChatGPT | Read the error. Google it. THEN ask ChatGPT |
| 11 | **Comparing yourself to others** — "he got a job in 3 months" | Your timeline is YOUR timeline. Consistency > speed |
| 12 | **Waiting to "feel ready"** — you'll never feel 100% ready | Start applying after Phase 6 (Week 32). Learn the rest on the job |

---

## 10. MASTER PROGRESS TRACKER

```
WEEK  1 [  ] Python Basics          → Project: Expense Tracker
WEEK  2 [  ] Python Intermediate    → Project: Web Scraper
WEEK  3 [  ] NumPy/Pandas/Matplotlib→ Project: Weather App
WEEK  4 [  ] Descriptive Stats      → Project: Zomato EDA
WEEK  5 [  ] Inferential Stats      → Project: IPL Analysis
WEEK  6 [  ] Feature Engineering    → Project: Netflix EDA
WEEK  7 [  ] EDA Capstone           → Project: COVID Dashboard
WEEK  8 [  ] Linear Regression      → Project: House Price Prediction
WEEK  9 [  ] Classification         → Project: Loan Approval
WEEK 10 [  ] Model Eval + Clustering→ Project: Spam Classifier
WEEK 11 [  ] Ensemble/Boosting      → Project: Customer Churn
WEEK 12 [  ] ML Pipeline/Deploy     → Project: Fake News Detection
WEEK 13 [  ] Advanced ML            → Project: Movie Recommender
WEEK 14 [  ] ML Revision            → Kaggle Sprint + Polish
WEEK 15 [  ] Neural Networks        → Practice: NN from scratch
WEEK 16 [  ] CNNs                   → Project: CIFAR-10 Classifier
WEEK 17 [  ] Transfer Learning/YOLO → Project: Object Detection
WEEK 18 [  ] RNN/LSTM               → Project: Stock Prediction
WEEK 19 [  ] Advanced DL            → Project: Potato Disease Detection
WEEK 20 [  ] DL Revision            → Project: Dog vs Cat
WEEK 21 [  ] NLP Basics             → Project: Sentiment Analysis
WEEK 22 [  ] Advanced NLP           → Project: Resume Parser
WEEK 23 [  ] Transformers/HF        → Project: Multilingual BERT
WEEK 24 [  ] NER/Summarization      → Project: Text Summarizer
WEEK 25 [  ] NLP Revision           → Project: Chatbot
WEEK 26 [  ] LLMs + Prompting       → Project: Blog Generator
WEEK 27 [  ] LangChain Core         → Project: AI Support Bot
WEEK 28 [  ] RAG ⭐                 → Project: Chat with PDF ⭐
WEEK 29 [  ] Advanced RAG           → Project: Multi-Doc RAG
WEEK 30 [  ] LLM Fine-Tuning        → Project: Invoice Extractor
WEEK 31 [  ] AI Agents ⭐           → Project: Multi-Agent System ⭐
WEEK 32 [  ] GenAI Revision         → Project: ATS Resume Scorer
WEEK 33 [  ] FastAPI                → Project: ML API
WEEK 34 [  ] Docker                 → Containerize projects
WEEK 35 [  ] MLflow/DVC             → Project: ML Pipeline
WEEK 36 [  ] CI/CD                  → Project: GitHub Actions
WEEK 37 [  ] AWS Deploy             → Project: Cloud Deploy
WEEK 38 [  ] Theory Interview Prep  → Mock interviews
WEEK 39 [  ] Coding/System Design   → Resume + LinkedIn
WEEK 40 [  ] Capstone: AI SaaS App  → Full deploy
WEEK 41 [  ] Capstone: AI Analyst   → Portfolio website
WEEK 42 [  ] Job Application Sprint → Apply to 30+ jobs
```

---

## 11. JOB-READY CHECKLIST

> Before applying, you should answer YES to ALL of these:

```
PYTHON
  [ ] Can I write a 200-line Python script from scratch without Googling syntax?
  [ ] Can I use NumPy, Pandas, Matplotlib fluently?

SQL
  [ ] Can I write JOINs, window functions, CTEs without help?
  [ ] Have I solved 50+ SQL problems on LeetCode/HackerRank?

MACHINE LEARNING
  [ ] Can I explain bias-variance tradeoff to a 10-year-old?
  [ ] Can I build an end-to-end ML pipeline (data → model → deploy)?
  [ ] Do I know when to use which algorithm?

DEEP LEARNING
  [ ] Can I explain backpropagation with math?
  [ ] Can I build and train a CNN/RNN from scratch?
  [ ] Can I use transfer learning for a custom task?

NLP
  [ ] Can I explain the Transformer architecture?
  [ ] Can I fine-tune BERT/GPT using Hugging Face?

GENERATIVE AI ⭐
  [ ] Can I build a RAG pipeline from scratch?
  [ ] Can I use LangChain (chains, memory, agents)?
  [ ] Can I explain vector databases and embeddings?
  [ ] Have I built at least 3 GenAI projects?

MLOps
  [ ] Can I containerize an ML model with Docker?
  [ ] Can I deploy a model API with FastAPI?
  [ ] Can I set up CI/CD with GitHub Actions?

PORTFOLIO
  [ ] Do I have 20+ projects on GitHub with good READMEs?
  [ ] Are my top 6 projects deployed with live links?
  [ ] Is my LinkedIn active with 30+ posts?
  [ ] Do I have a portfolio website?

DSA
  [ ] Have I solved 50+ LeetCode problems in Python?

If all checked → YOU ARE READY. START APPLYING AGGRESSIVELY.
If 80% checked → Start applying anyway. Learn the rest during interview prep.
```

---

> **The formula:** Course → Project → GitHub → LinkedIn Post → Repeat → Get Hired
>
> **42 weeks. 35+ projects. 15 courses. 8 platforms. 0 excuses.**
>
> **Print the tracker. Follow the plan. Build the projects. Push to GitHub. Post on LinkedIn.**
