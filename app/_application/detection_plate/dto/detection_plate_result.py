from pydantic import BaseModel
from typing import Dict, List

class DetectionPlateResult(BaseModel):
    detections: List[Dict[str, str]] = []