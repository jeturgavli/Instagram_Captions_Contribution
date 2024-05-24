from flask import Flask, render_template, request, jsonify
import json
import os
from datetime import datetime

app = Flask(__name__)

captions_file = 'captions.json'

def load_captions():
    if os.path.exists(captions_file):
        with open(captions_file, 'r') as file:
            return json.load(file)
    return {"captions": []}

def save_captions(data):
    with open(captions_file, 'w') as file:
        json.dump(data, file, indent=4)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/captions')
def captions():
    return render_template('caption.html')

@app.route('/add_caption', methods=['POST'])
def add_caption():
    new_caption = request.json
    new_caption["timestamp"] = datetime.utcnow().isoformat()
    captions = load_captions()
    captions["captions"].append(new_caption)
    save_captions(captions)
    return jsonify({"message": "Caption added successfully!"})

@app.route('/get_captions')
def get_captions():
    captions = load_captions()
    return jsonify(captions)


if __name__ == '__main__':
    app.run(debug=True)
