from fastapi import FastAPI
import face_recognition

app = FastAPI()  

def verify_faces(selfie_path: str, document_path: str, tolerance: float = 0.6) -> dict:
    selfie_img = face_recognition.load_image_file(selfie_path)
    document_img = face_recognition.load_image_file(document_path)

    selfie_encodings = face_recognition.face_encodings(selfie_img)
    doc_encodings = face_recognition.face_encodings(document_img)

    if not selfie_encodings or not doc_encodings:
        return {"error": "No faces found in images."}

    distances = face_recognition.face_distance([selfie_encodings[0]], doc_encodings[0])
    if bool(distances[0] <= tolerance): 
        verified = "verified"
    else:
        verified = "rejected"
    

    return {"selfieStatus": verified, "selfieMatchScore": float(distances[0])} 