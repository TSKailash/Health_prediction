import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar
} from 'recharts';

const Chart = () => {
  const [data, setData] = useState([]);
  const userId = localStorage.getItem("user");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/prediction/history/${userId}`);
        const formatted = res.data.map((entry, index) => ({
          ...entry,
          timestamp: new Date(entry.timestamp).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: '2-digit',
          }),
        }));
        setData(formatted.reverse());
      } catch (err) {
        console.error("Failed to load prediction history", err);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">Your Health Trends</h2>

      {data.length === 0 ? (
        <p className="text-center text-gray-600">No data available. Make some predictions!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-center text-blue-700 mb-4">Glucose Level</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="glucose" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-center text-red-600 mb-4">Risk Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="probability" fill="#ff6b6b" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-md col-span-full">
            <h3 className="text-lg font-semibold text-center text-green-700 mb-4">BMI vs BP</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="bmi" stroke="#82ca9d" />
                <Line type="monotone" dataKey="bp" stroke="#ffb74d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chart;
