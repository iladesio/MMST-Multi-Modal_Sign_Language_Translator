from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, validator, constr
import deepl

import constants

class TextToSign(BaseModel):
    text: str
    src: str 
    trg: str

    @validator('src', 'trg')
    def check_string(cls, value):
        if value not in constants.LANGUAGE_DICT:
            raise ValueError('Invalid value. Must be one of: {}'.format(', '.join(constants.LANGUAGE_DICT)))
        return value

app = FastAPI()

# input parameters: text: str, src_lang, target_lang
@app.post("/translate/text_to_sign")
async def text_to_sign(req: TextToSign):
    if req.src == req.trg:
        raise HTTPException(
            status_code=400,
            detail='string_param1 and string_param2 must be different values.'
        )
    
    #translator = deepl.Translator(constants.DEEPL_TOKEN)

    return req