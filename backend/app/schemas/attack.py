from pydantic import BaseModel

class FGSMRequest(BaseModel):
    epsilon: float

class PGDRequest(BaseModel):
    epsilon: float = 0.1
    alpha: float = 0.01
    steps: int = 40
