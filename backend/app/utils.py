from database import db

def calculate_scores(answers, target_condition):
    """Calculate scores for all conditions based on general questions and return top two, or single condition if specified"""
    condition_scores = {}
    
    # Get all conditions from Firestore
    conditions_ref = db.collection("Conditions").stream()
    
    for condition in conditions_ref:
        condition_id = condition.id
        questions = condition.to_dict().get('questions', [])
        score = 0
        print(f"Processing {condition_id} with questions: {questions}")  # Debug log
        
        # Score each answer based on array index, assuming general questions apply to all
        for q_id, user_answer in answers.items():
            if 0 <= int(q_id) < len(questions):  # Match by index
                if user_answer == "Strongly Agree":
                    score += 2
                elif user_answer == "Agree":
                    score += 1
                elif user_answer == "Disagree":
                    score -= 1
                elif user_answer == "Strongly Disagree":
                    score -= 2
        
        # Normalize score to percentage (assuming 2 points per question as max)
        max_score = 2 * len(questions)
        percentage = (score / max_score * 100) if max_score > 0 else 0
        condition_scores[condition_id] = max(0, min(100, percentage))
        print(f"{condition_id} score: {percentage}%")
    
    # If target_condition is 'General Questions', return top 2; otherwise, return only the target condition
    if target_condition == 'General Questions':
        sorted_scores = sorted(condition_scores.items(), key=lambda x: x[1], reverse=True)
        return dict(sorted_scores[:2])  # Return top 2 conditions with percentages
    else:
        return {target_condition: condition_scores[target_condition]}  # Return only the specified condition