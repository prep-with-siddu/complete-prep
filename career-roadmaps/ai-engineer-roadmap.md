# AI Engineer Roadmap — End-to-End Learning Path with Projects & Videos

> **Goal:** Go from zero to a job-ready AI Engineer with real projects at every stage.
> **Time:** ~8-12 months (2-4 hrs/day consistently)

---

## PHASE 1: Math + Python Foundations (Weeks 1-6)

### What to Learn
- Linear Algebra (vectors, matrices, dot products, eigenvalues)
- Calculus (derivatives, gradients, chain rule)
- Probability & Statistics (distributions, Bayes, expectation)
- Python (data structures, OOP, file handling, list comprehensions)
- NumPy, Pandas, Matplotlib

### Video Courses
| Resource | Link | Type |
|----------|------|------|
| 3Blue1Brown — Essence of Linear Algebra | https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab | Free |
| 3Blue1Brown — Essence of Calculus | https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr | Free |
| StatQuest — Statistics Fundamentals | https://www.youtube.com/playlist?list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9 | Free |
| CS50P — Harvard Python Course | https://cs50.harvard.edu/python/ | Free |
| Corey Schafer — Python Tutorials | https://www.youtube.com/playlist?list=PL-osiE80TeTt2d9bfVyTiXJA-UTHn6WwU | Free |
| Keith Galli — NumPy & Pandas | https://www.youtube.com/watch?v=LHBE6Q9XlzI | Free |

### Project 1: Data Analysis Dashboard
- **What:** Analyze a real dataset (Kaggle) using Pandas + Matplotlib
- **Dataset:** Titanic or Netflix Movies dataset from Kaggle
- **Skills:** Data cleaning, EDA, visualization
- **Guide Video:** [Keith Galli — Real-World Data Analysis](https://www.youtube.com/watch?v=Liv6pKxz4gE)
- **Deliverable:** Jupyter Notebook with insights + visualizations

---

## PHASE 2: Machine Learning (Weeks 7-14)

### What to Learn
- Supervised Learning: Linear Regression, Logistic Regression, Decision Trees, Random Forest, SVM, KNN
- Unsupervised Learning: K-Means, PCA, DBSCAN
- Model evaluation: train/test split, cross-validation, confusion matrix, ROC-AUC
- Feature engineering, data preprocessing
- Scikit-learn library end to end

### Video Courses
| Resource | Link | Type |
|----------|------|------|
| Andrew Ng — Machine Learning Specialization (Coursera) | https://www.coursera.org/specializations/machine-learning-introduction | Free to audit |
| Sentdex — ML with Python (YouTube) | https://www.youtube.com/playlist?list=PLQVvvaa0QuDfKTOs3Keq_kaG2P55YRn5v | Free |
| StatQuest — ML Playlist | https://www.youtube.com/playlist?list=PLblh5JKOoLUICTaGLRoHQDuF_7q2GfuJF | Free |
| Krish Naik — Complete ML Playlist | https://www.youtube.com/playlist?list=PLZoTAELRMXVPBTrWtJkn3wWQxZkmTXGwe | Free |
| Kaggle Learn — Intro to ML | https://www.kaggle.com/learn/intro-to-machine-learning | Free |

### Project 2: House Price Predictor (Regression)
- **What:** Predict house prices using multiple features
- **Dataset:** [Kaggle House Prices Competition](https://www.kaggle.com/c/house-prices-advanced-regression-techniques)
- **Skills:** Feature engineering, model selection, hyperparameter tuning
- **Guide Video:** [Ken Jee — House Price Prediction Walkthrough](https://www.youtube.com/watch?v=ZWPiQ8GEwik)
- **Deliverable:** Full pipeline from raw data to prediction + Kaggle submission

### Project 3: Spam Email Classifier (Classification)
- **What:** Classify emails as spam or not-spam
- **Dataset:** [Kaggle SMS Spam Collection](https://www.kaggle.com/datasets/uciml/sms-spam-collection-dataset)
- **Skills:** Text preprocessing, TF-IDF, Naive Bayes, model evaluation
- **Guide Video:** [CampusX — Spam Classifier End to End](https://www.youtube.com/watch?v=YncZ0WwxyzU)
- **Deliverable:** Trained model + simple Streamlit web app for demo

---

## PHASE 3: Deep Learning (Weeks 15-22)

### What to Learn
- Neural Networks from scratch (forward pass, backprop, gradient descent)
- Activation functions, loss functions, optimizers (Adam, SGD)
- CNNs (Convolutional Neural Networks) for images
- RNNs, LSTMs for sequential data
- Transfer Learning
- PyTorch (primary) or TensorFlow
- Regularization (Dropout, BatchNorm, Early Stopping)

### Video Courses
| Resource | Link | Type |
|----------|------|------|
| Andrej Karpathy — Neural Networks: Zero to Hero | https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ | Free (MUST WATCH) |
| Andrew Ng — Deep Learning Specialization (Coursera) | https://www.coursera.org/specializations/deep-learning | Free to audit |
| Fast.ai — Practical Deep Learning for Coders | https://course.fast.ai/ | Free |
| Daniel Bourke — PyTorch for Deep Learning | https://www.youtube.com/watch?v=Z_ikDlimN6A | Free (25 hrs) |
| Sentdex — PyTorch Neural Networks from Scratch | https://www.youtube.com/playlist?list=PLQVvvaa0QuDdeMyHEYc0gxFpYwHY2Qfdh | Free |

### Project 4: Image Classifier (CNN)
- **What:** Build a CNN to classify images (e.g., cats vs dogs, or CIFAR-10)
- **Dataset:** [Kaggle Dogs vs Cats](https://www.kaggle.com/c/dogs-vs-cats)
- **Skills:** CNN architecture, data augmentation, transfer learning (ResNet)
- **Guide Video:** [Daniel Bourke — PyTorch Image Classification](https://www.youtube.com/watch?v=Z_ikDlimN6A&t=32400s)
- **Deliverable:** Trained model + Gradio/Streamlit app to upload and classify images

### Project 5: Sentiment Analyzer (RNN/LSTM)
- **What:** Analyze sentiment of movie reviews or tweets
- **Dataset:** [IMDB Reviews](https://www.kaggle.com/datasets/lakshmi25npathi/imdb-dataset-of-50k-movie-reviews)
- **Skills:** Text tokenization, embeddings, LSTM networks
- **Guide Video:** [Patrick Loeber — Sentiment Analysis with PyTorch](https://www.youtube.com/watch?v=QY9Gz9gYMsI)
- **Deliverable:** Model + API endpoint for real-time sentiment prediction

---

## PHASE 4: NLP & Transformers (Weeks 23-30)

### What to Learn
- Tokenization (BPE, WordPiece, SentencePiece)
- Word Embeddings (Word2Vec, GloVe, FastText)
- Attention Mechanism (deep dive)
- Transformer Architecture from scratch
- BERT, GPT, T5 — understanding each
- Hugging Face Transformers library
- Fine-tuning pre-trained models
- Prompt Engineering

### Video Courses
| Resource | Link | Type |
|----------|------|------|
| Andrej Karpathy — Let's Build GPT from Scratch | https://www.youtube.com/watch?v=kCc8FmEb1nY | Free (LEGENDARY) |
| Hugging Face — NLP Course | https://huggingface.co/learn/nlp-course | Free |
| Stanford CS224N — NLP with Deep Learning | https://www.youtube.com/playlist?list=PLoROMvodv4rMFqRtEuo6SGjY4XbRIVRd4 | Free |
| Jay Alammar — The Illustrated Transformer | https://jalammar.github.io/illustrated-transformer/ | Free (Blog) |
| CodeEmporium — Transformers Explained | https://www.youtube.com/watch?v=TQQlZhbC5ps | Free |

### Project 6: Build GPT from Scratch (miniGPT)
- **What:** Implement a small GPT model from scratch following Karpathy
- **Skills:** Transformer architecture, self-attention, training loops
- **Guide Video:** [Andrej Karpathy — Let's Build GPT](https://www.youtube.com/watch?v=kCc8FmEb1nY)
- **Deliverable:** Working character-level language model that generates text

### Project 7: Fine-tuned Text Classifier
- **What:** Fine-tune BERT for a specific classification task
- **Dataset:** [Kaggle Disaster Tweets](https://www.kaggle.com/c/nlp-getting-started)
- **Skills:** Hugging Face Transformers, tokenizers, fine-tuning, evaluation
- **Guide Video:** [James Briggs — Fine-tuning BERT](https://www.youtube.com/watch?v=DQc2Mi7BcuI)
- **Deliverable:** Fine-tuned model on Hugging Face Hub + Kaggle submission

---

## PHASE 5: LLMs & AI Engineering (Weeks 31-40)

### What to Learn
- LLM APIs (OpenAI, Anthropic Claude, Google Gemini, open-source)
- Prompt Engineering (system prompts, few-shot, chain-of-thought)
- LangChain framework
- LlamaIndex for data indexing
- Vector Databases (Pinecone, ChromaDB, Weaviate, Qdrant)
- Embeddings & Semantic Search
- RAG (Retrieval-Augmented Generation)
- AI Agents (tool use, function calling, multi-step reasoning)
- Streaming, caching, memory management

### Video Courses
| Resource | Link | Type |
|----------|------|------|
| DeepLearning.AI — LangChain for LLM App Dev | https://www.deeplearning.ai/short-courses/langchain-for-llm-application-development/ | Free |
| DeepLearning.AI — Building Systems with ChatGPT | https://www.deeplearning.ai/short-courses/building-systems-with-chatgpt/ | Free |
| DeepLearning.AI — LangChain Chat with Your Data | https://www.deeplearning.ai/short-courses/langchain-chat-with-your-data/ | Free |
| DeepLearning.AI — Building Agentic RAG with LlamaIndex | https://www.deeplearning.ai/short-courses/ | Free |
| FreeCodeCamp — LangChain Full Course | https://www.youtube.com/watch?v=lG7Uxts9SXs | Free |
| Full Stack LLM Bootcamp | https://fullstackdeeplearning.com/llm-bootcamp/ | Free |
| Sam Witteveen — LangChain Series | https://www.youtube.com/playlist?list=PL8motc6AQftk1Bs42EW45kwYbyJ4jOdiZ | Free |

### Project 8: RAG Chatbot — Chat with Your Documents
- **What:** Build a chatbot that answers questions based on your own PDF/docs
- **Stack:** LangChain + ChromaDB + OpenAI/Ollama + Streamlit
- **Skills:** Document loading, chunking, embeddings, vector search, LLM chaining
- **Guide Video:** [Alejandro AO — Chat with PDF using LangChain](https://www.youtube.com/watch?v=dXxQ0LR-3Hg)
- **Deliverable:** Full working app where you upload a PDF and ask questions

### Project 9: AI Agent with Tool Use
- **What:** Build an autonomous AI agent that can search the web, run code, query databases
- **Stack:** LangChain Agents / CrewAI + OpenAI function calling
- **Skills:** Agent architecture, tool definitions, chain-of-thought, memory
- **Guide Video:** [DeepLearning.AI — Functions, Tools & Agents with LangChain](https://www.deeplearning.ai/short-courses/functions-tools-agents-langchain/)
- **Deliverable:** Working agent that can autonomously complete multi-step tasks

### Project 10: Semantic Search Engine
- **What:** Build a search engine that understands meaning, not just keywords
- **Stack:** Sentence Transformers + Qdrant/Pinecone + FastAPI
- **Skills:** Embedding models, vector databases, similarity search, API design
- **Guide Video:** [James Briggs — Vector Search & Embeddings](https://www.youtube.com/watch?v=dRUIGgNBvVk)
- **Deliverable:** REST API + simple frontend for semantic document search

---

## PHASE 6: Fine-tuning LLMs & Advanced Topics (Weeks 41-48)

### What to Learn
- Fine-tuning LLMs (LoRA, QLoRA, PEFT)
- RLHF (Reinforcement Learning from Human Feedback)
- Running open-source models locally (Ollama, vLLM, llama.cpp)
- Model quantization (GGUF, GPTQ, AWQ)
- Multimodal AI (Vision + Language)
- Evaluation frameworks (RAGAS, DeepEval)
- MLOps (experiment tracking, CI/CD for ML, model registries)

### Video Courses
| Resource | Link | Type |
|----------|------|------|
| DeepLearning.AI — Finetuning Large Language Models | https://www.deeplearning.ai/short-courses/finetuning-large-language-models/ | Free |
| Trelis Research — LoRA & QLoRA Fine-tuning | https://www.youtube.com/watch?v=iOdFUJiB0Zc | Free |
| Made With ML — MLOps Course | https://madewithml.com/ | Free |
| DeepLearning.AI — Evaluating & Debugging GenAI | https://www.deeplearning.ai/short-courses/ | Free |
| Yannic Kilcher — ML Paper Explanations | https://www.youtube.com/@YannicKilcher | Free |
| Matt Williams — Ollama Series | https://www.youtube.com/playlist?list=PLvsHpFkKdkSqqjBNqxTmwRXMPk-FKxQEi | Free |

### Project 11: Fine-tune Your Own LLM
- **What:** Fine-tune LLaMA/Mistral on a custom dataset for a specific task
- **Stack:** Hugging Face + PEFT + LoRA + Weights & Biases
- **Skills:** Dataset preparation, LoRA config, training loops, evaluation
- **Guide Video:** [Trelis Research — Fine-tune LLaMA 2 with LoRA](https://www.youtube.com/watch?v=iOdFUJiB0Zc)
- **Deliverable:** Fine-tuned model pushed to Hugging Face Hub

### Project 12: Multimodal AI App
- **What:** Build an app that understands both images and text (e.g., describe images, visual Q&A)
- **Stack:** LLaVA / GPT-4 Vision API + Streamlit
- **Skills:** Multimodal models, image processing, prompt design
- **Guide Video:** [DeepLearning.AI — Building Multimodal Search](https://www.deeplearning.ai/short-courses/)
- **Deliverable:** App that takes image + question and gives intelligent answers

---

## PHASE 7: Full-Stack AI Application — CAPSTONE (Weeks 49-52)

### Project 13: Full-Stack AI SaaS Product (THE CAPSTONE)
- **What:** Build a production-grade AI application end-to-end
- **Idea Options:**
  - AI-powered code reviewer
  - AI resume analyzer + job matcher
  - AI study assistant with RAG + quiz generation
  - AI customer support agent for any SaaS
- **Stack:**
  - **Frontend:** React/Next.js (use your existing skills!)
  - **Backend:** FastAPI / Node.js
  - **AI:** LangChain + OpenAI/Claude + Vector DB
  - **Database:** PostgreSQL + Redis
  - **Deployment:** Docker + Vercel/Railway/AWS
  - **Auth:** Clerk/NextAuth
- **Skills:** Everything combined — this is your portfolio centerpiece
- **Guide Videos:**
  - [Sonny Sangha — Full Stack AI SaaS](https://www.youtube.com/watch?v=JY4dQMoG0qI)
  - [Adrian Twarog — AI App with Next.js](https://www.youtube.com/watch?v=mkBUtaSgSYA)
  - [FreeCodeCamp — Full Stack AI App](https://www.youtube.com/watch?v=PBcE-7jAJSc)
- **Deliverable:** Deployed app + GitHub repo + demo video

---

## Weekly Schedule Template

| Day | Focus | Hours |
|-----|-------|-------|
| **Mon** | Course / Theory | 2-3 hrs |
| **Tue** | Code Along / Practice | 2-3 hrs |
| **Wed** | Course / Theory | 2-3 hrs |
| **Thu** | Project Work | 2-3 hrs |
| **Fri** | Project Work | 2-3 hrs |
| **Sat** | Project Work + Read 1 Blog/Paper | 3-4 hrs |
| **Sun** | Review + Document Learnings + Rest | 1-2 hrs |

---

## Essential YouTube Channels to Subscribe

| Channel | Focus |
|---------|-------|
| [Andrej Karpathy](https://www.youtube.com/@andrejkarpathy) | Deep Learning fundamentals, GPT |
| [3Blue1Brown](https://www.youtube.com/@3blue1brown) | Math intuition |
| [StatQuest](https://www.youtube.com/@statquest) | ML/Stats explained simply |
| [Yannic Kilcher](https://www.youtube.com/@YannicKilcher) | Paper reviews |
| [Two Minute Papers](https://www.youtube.com/@TwoMinutePapers) | Latest AI breakthroughs |
| [James Briggs](https://www.youtube.com/@jamesbriggs) | LangChain, Vector DBs, LLMs |
| [Sam Witteveen](https://www.youtube.com/@samwitteveen) | LangChain, Agents |
| [Matt Wolfe](https://www.youtube.com/@maboroshi) | AI tools & news |
| [Fireship](https://www.youtube.com/@Fireship) | Quick tech overviews |
| [DeepLearning.AI](https://www.youtube.com/@Deeplearningai) | Andrew Ng's courses |

---

## Essential Blogs & Reading

| Resource | Link |
|----------|------|
| Lil'Log (Lilian Weng) | https://lilianweng.github.io/ |
| Jay Alammar — Illustrated ML | https://jalammar.github.io/ |
| Chip Huyen's Blog | https://huyenchip.com/blog/ |
| The Batch (DeepLearning.AI Newsletter) | https://www.deeplearning.ai/the-batch/ |
| Towards Data Science | https://towardsdatascience.com/ |
| Sebastian Raschka's Blog | https://sebastianraschka.com/blog/ |

---

## Tools You Must Master

| Tool | Purpose |
|------|---------|
| **Python** | Everything |
| **PyTorch** | Deep Learning framework |
| **Hugging Face** | Models, datasets, transformers |
| **LangChain** | LLM application framework |
| **ChromaDB / Pinecone** | Vector databases |
| **Ollama** | Run LLMs locally |
| **Weights & Biases** | Experiment tracking |
| **FastAPI** | AI backend APIs |
| **Docker** | Containerization & deployment |
| **Git/GitHub** | Version control + portfolio |

---

## Key Tips

1. **Build > Watch.** For every 1 hour of watching, spend 2 hours coding.
2. **Publish everything.** GitHub repos, blog posts, LinkedIn posts, Hugging Face models.
3. **Don't aim for perfection.** Ship ugly projects, then iterate.
4. **Join communities.** Hugging Face Discord, MLOps Community, r/MachineLearning.
5. **Read one paper per week** after Phase 4. Start with landmark papers (Attention Is All You Need, BERT, GPT-3).
6. **Your frontend skills are a weapon.** Most AI engineers can't build good UIs. You can build complete products.

---

*Last updated: February 2026*
