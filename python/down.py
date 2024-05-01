# import requests

# url = 'https://youtu.be/NWdrO4BoCu8?si=2N-3S2ygZJ63jDvn'  # Replace with the URL of the file you want to download
# filename = 'shontell.mp4'  # The filename you want to save the downloaded file as

# # Send a GET request to the URL to download the file
# response = requests.get(url)

# # Check if the request was successful (status code 200)
# if response.status_code == 200:
#     # Open the file in binary mode and write the content of the response to it
#     with open(filename, 'wb') as file:
#         file.write(response.content)
#     print(f"File '{filename}' downloaded successfully.")
# else:
#     print(f"Failed to download file. Status code: {response.status_code}")


# from pytube import YouTube

# link = input ("Enter url")
# video = YouTube(link)
# stream = video.streams.get_highest_resolution()
# stream.download()


from pytube import YouTube
from pytube.exceptions import AgeRestrictedError
import requests

# link = input("Enter URL: ")

# try:
#     video = YouTube(link)
#     stream = video.streams.get_highest_resolution()
#     stream.download()
#     print("Video downloaded successfully!")
# except AgeRestrictedError:
#     print("The video is age-restricted and cannot be downloaded without logging in.")
# except Exception as e:
#     print("An error occurred:", e)




from flask import Flask, request, jsonify, send_from_directory
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/upload', methods=['POST'])
def upload_profile():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file:
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        return jsonify({'success': 'File uploaded successfully'}), 200

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == "__main__":
    app.run(port=4000) 




