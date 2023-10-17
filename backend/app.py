import os
import base64
from flask import Flask, jsonify, request
from flask_cors import CORS
from ultralytics import YOLO
from PIL import Image
from io import BytesIO

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize the YOLO model
model = YOLO('./best.pt')

@app.route('/api/hello', methods=['GET'])
def hello():
    return jsonify(message='Hello, world!')

# Route for object detection
@app.route('/api/detect', methods=['POST'])
def detect_objects():
    # Check if the POST request contains a file
    if 'file' not in request.files:
        return jsonify(error='No file part')
    
    file = request.files['file']

    # If the user does not select a file, the browser may also
    # submit an empty file without a filename
    if file.filename == '':
        return jsonify(error='No selected file')
    
    # Save the uploaded file temporarily
    uploaded_file_path = 'uploaded_image.jpg'
    file.save(uploaded_file_path)

    # Run inference on the uploaded image and save the results
    results = model(uploaded_file_path, save=False)
    results_object = results[0]

    # Create an annotated image
    annotated_image = results_object.plot()
    annotated_image_pil = Image.fromarray(annotated_image[..., ::-1])  # Convert BGR to RGB

    # Convert the annotated image to base64 for sending in response
    buffered = BytesIO()
    annotated_image_pil.save(buffered, format="JPEG")
    annotated_image_base64 = base64.b64encode(buffered.getvalue()).decode("utf-8")

    # Save the annotated image
    annotated_image_path = 'annotated_image.jpg'
    annotated_image_pil.save(annotated_image_path)

    # Return the path of the saved annotated image and the annotated image in base64 format
    return jsonify(result='Detection complete', annotated_image_path=annotated_image_path, annotated_image_base64=annotated_image_base64)


if __name__ == '__main__':
    app.run(debug=True)
