from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from _api.detection_plate.detection_plate_endpoints import detection_plate_endpoints

app = FastAPI()

# Allow your frontend (adjust origin if needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],  # or ["POST"] if you want to limit
    allow_headers=["*"],)

app.include_router(detection_plate_endpoints, prefix="/api/v1")