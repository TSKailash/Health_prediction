from flask import Blueprint, jsonify

recommendation_bp = Blueprint('recommendation', __name__)

@recommendation_bp.route('/<risk>', methods=['GET'])
def get_recommendations(risk):
    tips = {
        "High": [
            "Consult a doctor for a proper diagnosis.",
            "Maintain a healthy, low-sugar diet.",
            "Exercise at least 30 minutes daily.",
            "Monitor your glucose levels regularly.",
            "Reduce weight if overweight."
        ],
        "Low": [
            "Continue a healthy balanced diet.",
            "Exercise regularly to stay fit.",
            "Get screened annually.",
            "Avoid excessive sugar consumption.",
            "Keep an eye on weight and BMI."
        ]
    }

    return jsonify({
        "risk": risk,
        "tips": tips.get(risk, ["No recommendations available."])
    })
