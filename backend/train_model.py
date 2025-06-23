import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
import pickle

df = pd.read_csv("diabetes.csv")

X = df[[
    "Glucose",
    "BMI",
    "Age",
    "BloodPressure"
]]
y = df["Outcome"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = LogisticRegression(max_iter=1000)
model.fit(X_train, y_train)

with open("model.pkl", "wb") as f:
    pickle.dump(model, f)

print(df['Outcome'].value_counts())
print("✅ Model trained and saved as model.pkl")
