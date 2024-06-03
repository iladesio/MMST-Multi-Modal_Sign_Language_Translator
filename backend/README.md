<h3>MMST - REST API</h3>

This folder represents the implementation of some API REST for the translation between textual language and sign language.

To install the required dependencies of backend on your machine, open terminal in the backend folder and type: 
pip install -r requirements.txt

Eventually, create the folder tmp in backend. 

The project is developed using the FastAPI framework. <br>
It can be run with the command:<br><br>
<i>fastapi dev main.py</i>

(Be sure to have installed the FastAPI framework package. A requirements.txt is available)

When the translate/text_to_sign API is called, an mp4 file is temporarily created in the /tmp folder of this project.
After the base64 encode of this file is crafted, the file is removed. 
Similarly, when the base64 encoding of an audio file is given as input, a wav file is temporarily created in the /tmp folder and then it is removed.

It could be possible that a pose can't be produced for very short phrases. In that case, try to give as input a longer phrase. 

Thank you and enjoy your translator!!!
