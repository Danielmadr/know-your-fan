from flask import Flask, request, jsonify
import pytesseract
from PIL import Image
import io

app = Flask(__name__)

@app.route('/validate-id', methods=['POST'])
def validate_id():
    file = request.files['document']
    img_bytes = file.read()
    img = Image.open(io.BytesIO(img_bytes))
    text = pytesseract.image_to_string(img)
    return jsonify({"extracted_text": text})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

