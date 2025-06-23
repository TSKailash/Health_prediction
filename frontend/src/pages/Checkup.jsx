import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PredictionForm = () => {
  const [formData, setFormData] = useState({
    glucose: '',
    bmi: '',
    bp: '',
    age: '',
  });
  const [predictionResult, setPredictionResult] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('user');
    if (!userId) return setError('User not logged in');

    try {
      const res = await axios.post('https://health-prediction-4.onrender.com/prediction/predict', {
        ...formData,
        userId,
      });

      setPredictionResult(res.data); // Save result in state
      localStorage.setItem("latestPrediction", JSON.stringify(res.data)); // So you can view it on another page
    } catch (err) {
      setError(err.response?.data?.error || 'Prediction failed');
    }
  };

  const goToResult = () => {
    navigate(`/result/${localStorage.getItem('user')}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-teal-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-teal-700 mb-6">
          Health Prediction Form
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {['glucose', 'bmi', 'bp', 'age'].map((field) => (
            <input
              key={field}
              type="number"
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData[field]}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          ))}
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition"
          >
            Predict
          </button>
        </form>

        {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}

        {predictionResult && (
          <div className="text-center mt-6">
            <p className="text-teal-700 font-medium">Prediction: <strong>{predictionResult.prediction}</strong></p>
            <p className="text-gray-600">Confidence: {Math.round(predictionResult.probability * 100)}%</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              onClick={goToResult}
            >
              View Full Report
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictionForm;
