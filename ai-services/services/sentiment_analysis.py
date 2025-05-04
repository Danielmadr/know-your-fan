from transformers import pipeline
# from googletrans import Translator
from models.comments_data import CommentsRequest
from translate import Translator


# Load sentiment analysis pipeline with an informal-language model
sentiment_pipeline = pipeline(
    "sentiment-analysis",
    model="cardiffnlp/twitter-roberta-base-sentiment"
)

# Translator instance
# translator = Translator()
translator = Translator(to_lang="en", from_lang="pt")

def analyze_sentiment_data(request: CommentsRequest):
    count = {
        "positive": 0,
        "negative": 0,
        "neutral": 0
    }
    scores = []

    for comment in request.comments:
        if not comment.strip():
            continue

        # Translate comment from Portuguese to English
        # translated = translator.translate(comment, dest="en").text
        translated = translator.translate(comment)
        print(f"Translated comment: {translated}")

        # Run sentiment analysis
        result = sentiment_pipeline(translated)[0]
        label = result['label']

        # Map and count sentiment
        if label == 'LABEL_2':  # positive
            count["positive"] += 1
            scores.append(1)
        elif label == 'LABEL_0':  # negative
            count["negative"] += 1
            scores.append(-1)
        else:  # neutral
            count["neutral"] += 1
            scores.append(0)

    # Sentiment index: average as percentage
    if scores:
        sentiment_index = round(sum(scores) / len(scores) * 100, 2)
    else:
        sentiment_index = None

    normalized_index = round((sentiment_index + 100) / 2)
    return {
        "positive": count["positive"],
        "negative": count["negative"],
        "neutral": count["neutral"],
        "sentiment_index": sentiment_index,
        "normalized_index": normalized_index
    }
