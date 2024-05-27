#this file contains all the possible http request developed. Visit localhost:8000/docs to see an overview of the available REST API.

from fastapi import FastAPI, Response, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, validator, constr
import deepl
import os
import utils
import requests
import base64
from datetime import datetime
from pose_format import Pose
from pose_format.pose_visualizer import PoseVisualizer
from dotenv import load_dotenv, dotenv_values 

# loading variables from .env file
load_dotenv()

#import constants file
import constants

#Object tha represents a TextToSign request.
class TextToSign(BaseModel):
    text: str
    src: str 
    trg: str

    @validator('src')
    def check_src(cls, value):
        if value not in constants.LANGUAGE_DICT:
            raise ValueError('Invalid value. Source language must be one of: {}'.format(', '.join(constants.LANGUAGE_DICT)))
        return value
    @validator('trg')
    def check_trg(cls, value):
        if value not in constants.SIGNED_LANGUAGES_DICT:
            raise ValueError('Invalid value. Target sign language must be one of: {}'.format(', '.join(constants.SIGNED_LANGUAGES_DICT)))
        return value
    

app = FastAPI()

# CORS configuration. Allow requests from all the origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# input parameters: text: str, src_lang, target_lang
@app.post("/translate/text_to_sign", status_code=200)
async def text_to_sign(req: TextToSign):

    try:
    
        #translation from text to text is not needed anymore
        #translator = deepl.Translator(os.getenv("DEEPL_API_KEY"))
        #text_info = translator.translate_text(req.text, source_lang = req.src, target_lang="en-us" if req.trg == "en" else req.trg)

        #prepare params to be inserted in the GET http request
        params = {
            "text": req.text,
            "spoken": req.src,
            "signed": req.trg
        }

        #send get request to sign.mt REST API
        response = requests.get(utils.build_url(constants.TEXT_TO_SIGNED_BASE_URL, params))
        response.raise_for_status()  
        
        #retrieve sequence of bytes
        pose_bytes = response.content

        #convert sequence of bytes into an mp4 file
        pose = Pose.read(pose_bytes)
        v = PoseVisualizer(pose)
        file_name = datetime.now().strftime("%Y_%m_%d_%H_%M_%S.mp4")
        file_path = f"tmp/{file_name}"
        v.save_video(file_path, v.draw((0,0,0)))

        #encode the mp4 video in base64
        pose_base64 = utils.encode_video_to_base64(file_path)

        #remove the just created mp4
        utils.deleteFile(file_path)

        return {"pose": pose_base64}

    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal Server Error: Something went wrong. [ERROR: '" + str(e)+ "']")
    

    