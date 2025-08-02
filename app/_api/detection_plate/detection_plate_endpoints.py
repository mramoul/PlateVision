from fastapi import APIRouter, UploadFile, File, Depends
from fastapi.responses import JSONResponse
from _application.application_config import get_detection_plate_service
from _application.detection_plate.detection_plate_service import IDetectionPlateService

detection_plate_endpoints = APIRouter()

@detection_plate_endpoints.post("/detect-plate")
async def detect_plate(file: UploadFile = File(...), detection_plate_service: IDetectionPlateService = Depends(get_detection_plate_service)):
    try:
        image_bytes = await file.read()
        cropped_plates_base64 = detection_plate_service.get_plate(image_bytes)
        return cropped_plates_base64
    except Exception as e:
        return JSONResponse(content={"error": str(e)})