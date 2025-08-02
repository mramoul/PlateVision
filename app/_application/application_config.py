from _application.detection_plate.detection_plate_service import DetectionPlateService, IDetectionPlateService

def get_detection_plate_service() -> IDetectionPlateService:
    return DetectionPlateService()