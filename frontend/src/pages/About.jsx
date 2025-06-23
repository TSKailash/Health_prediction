import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 py-12 px-6 flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold text-blue-800 mb-6">About HealthPredict</h1>
      <p className="text-lg text-gray-700 max-w-3xl mb-6">
        At <span className="text-blue-700 font-semibold">HealthPredict</span>, we believe prevention is better than cure.
        Our intelligent system empowers individuals to take control of their health by offering early risk predictions based on lifestyle and clinical data.
      </p>

      <p className="text-lg text-gray-700 max-w-3xl mb-6">
        Using the power of machine learning, we analyze key indicators like glucose, BMI, age, and blood pressure to provide
        instant, personalized risk assessments. Whether you're proactively monitoring your health or supporting a loved one,
        <span className="text-blue-700 font-semibold"> HealthPredict</span> is your intelligent healthcare companion.
      </p>

      <p className="text-lg text-gray-700 max-w-3xl mb-10">
        With a user-friendly interface and a secure backend, we aim to simplify healthcare for everyone — because your
        well-being shouldn't be complicated.
      </p>

      <p className="text-sm text-gray-500">Built with ❤️ by passionate developers who care about your health.</p>
    </div>
  );
};

export default About;
