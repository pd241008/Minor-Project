from pydantic import BaseModel

class EpsilonRequest(BaseModel):
    epsilon: float
