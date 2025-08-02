from abc import ABC, abstractmethod
import easyocr
from ultralytics import YOLO
import cv2
import numpy as np
import base64
from _application.detection_plate.dto.detection_plate_result import DetectionPlateResult

class IDetectionPlateService(ABC):
    @abstractmethod
    def get_plate(self, image_bytes: bytes) -> DetectionPlateResult:
        pass
    
class DetectionPlateService(IDetectionPlateService):
    def __init__(self, model_path='_infrastructure/ai_models/license_plate_detector.pt'):
        self.model = YOLO(model_path)
        self.reader = easyocr.Reader(['en'], gpu=False)  # Use GPU=True if available

    def get_plate(self, image_bytes: bytes) -> DetectionPlateResult:
        np_image = np.frombuffer(image_bytes, np.uint8)
        image = cv2.imdecode(np_image, cv2.IMREAD_COLOR)

        model_results = self.model(image)

        result: DetectionPlateResult = DetectionPlateResult(detections=[])

        for out_put in model_results:
            for box in out_put.boxes:
                x1, y1, x2, y2 = map(int, box.xyxy[0].tolist())
                conf = float(box.conf[0])  # confidence score

                # Clamp coordinates to image bounds
                x1, y1 = max(x1, 0), max(y1, 0)
                x2, y2 = min(x2, image.shape[1]), min(y2, image.shape[0])

                cropped = image[y1:y2, x1:x2]

                # OCR
                ocr_result = self.reader.readtext(cropped, detail=0)

                _, buffer = cv2.imencode('.jpg', cropped)
                base64_img = base64.b64encode(buffer).decode('utf-8')

                result.detections.append({
                    "image": base64_img,
                    "confidence": round(conf * 100, 2),
                    "text": " ".join(ocr_result)
                })

        return result