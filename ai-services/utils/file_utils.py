import shutil
import os

def save_upload(upload_file, filename, folder="temp"):
    os.makedirs(folder, exist_ok=True)
    file_path = os.path.join(folder, filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(upload_file.file, buffer)
    return file_path
