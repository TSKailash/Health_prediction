# 🩺 HealthPredict – Early Health Risk Prediction App

**HealthPredict** is a full-stack web application designed to help users predict health risks early using machine learning. The platform allows users to input key health metrics, view their prediction results, and track past data with beautiful visual analytics.

---

## 🚀 Features

### 👨‍⚕️ User Features
- 🔐 **Authentication** (Login/Signup)
- 🧠 **ML-Based Risk Prediction** using Glucose, BMI, Age, and Blood Pressure
- 📊 **Interactive Chart Analytics** based on prediction history
- 📝 **Personalized Health Tips** based on risk level
- 🌐 **Fully Responsive Frontend** built with React + TailwindCSS

---

## 🧩 Tech Stack

| Layer        | Technology                 |
| ------------ | -------------------------- |
| **Frontend** | React, React Router, Tailwind CSS |
| **Backend**  | Flask (Python), MongoDB (via PyMongo) |
| **ML Model** | Scikit-learn (Pickle serialized model) |
| **Database** | MongoDB Atlas |
| **Deployment** | [Optional: Add if hosted on Vercel/Render] |

---

## 📁 Project Structure

HealthPredict/
├── backend/
│ ├── routes/ # Flask Blueprints (auth, predict, recommend)
│ ├── app.py # Entry point for Flask
│ ├── model.pkl # Trained ML model
│ ├── requirements.txt # Python dependencies
│ └── .env # Environment variables (Mongo URI, etc.)
├── frontend/
│ ├── src/pages/ # React pages (Login, Predict, Result, Chart)
│ ├── src/assets/ # Logos, icons
│ ├── App.jsx # Main React App
│ └── index.html # Entry HTML



---

## 🧪 Setup Instructions

### 🖥️ Backend Setup

```
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
# or
source venv/bin/activate  # Mac/Linux

pip install -r requirements.txt
MONGO_URI=your_mongodb_connection_string
python app.py
```

### 🌐 Frontend Setup
```
cd frontend
npm install
npm run dev

Access app at: http://localhost:5173

```
