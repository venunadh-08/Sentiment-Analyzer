from flask import Flask, request, jsonify
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.linear_model import LogisticRegression
import joblib

app = Flask(__name__)

# Load your trained model and vectorizer
# (Assuming you've saved them after training)
model = joblib.load('sentiment_model.pkl')
vectorizer = joblib.load('vectorizer.pkl')

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    text = data['text']
    
    # Vectorize the input text
    text_vec = vectorizer.transform([text])
    
    # Make prediction
    prediction = model.predict(text_vec)
    
    return jsonify({'sentiment': prediction[0]})

if __name__ == '__main__':
    app.run(debug=True)