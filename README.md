# Multimodal Interaction - M.Sc. in Computer Science  
# Multimodal Sign Language Translator (MMST)

## Project Overview

**MMST (Multimodal Sign Language Translator)** is a web application that provides users with the ability to input sentences using speech, text, or sign language (SL) in various available languages and receive the corresponding translation in one of the aforementioned modalities in the desired language.

This project is an initial step toward building a comprehensive SL-to-SL translator. However, it's important to note that current state-of-the-art models still present limitations, particularly in Sign-to-* translation scenarios. Despite these challenges, MMST represents a significant advance in the development of sign language translation systems.

## Features

- **Multimodal Input and Output**: Users can input sentences using three modalities:
  1. **Speech**
  2. **Text**
  3. **Sign Language (SL)**
  
  Output can be provided in any of these modalities as well, depending on user preference.
  
- **Polyglot Capabilities**: Supports translations between different spoken and signed languages.

- **Bidirectional Translation**: MMST allows translations from speech/text to sign language and vice versa, making it a flexible tool for communication.

- **User-Centric Design**: The web app is designed for a wide and diverse range of users, including:
  - Deaf or hard-of-hearing individuals
  - Sign language interpreters
  - Educators
  - Learners of sign language
  - Anyone engaging in everyday interactions involving sign language

## Use Cases

- **Everyday Communication**: Facilitates real-time communication between individuals who use different languages, including signed languages.
- **Language Learning**: A useful tool for learning sign language, as users can practice by translating sentences into SL.
- **Sign Language Interpretation**: Supports sign language interpreters by offering multimodal translation capabilities.
- **Educational Settings**: Can be used in classrooms or learning environments where both spoken and signed languages are being used.


## Getting Started


You can run the front-end after having installed all the backend's requirements. If you have all the requirements, open a terminal in the backend's folder and type:

```bash
fastapi dev main.py

You also need Node.js to run the npm commands. You can download it from: https://nodejs.org/.

The following npm install instruction can be skipped after the first launch.

Then, on another terminal, open in the main folder. If you want to run the frontend, run:
cd frontend
npm install package.json
npm install wavesurfer.js
npm start

and go to your browser.

If an error is returned regarding FFmpeg, then in the terminal type:
pip install FFmpeg


## Contributions

Contributions to this project are welcome! If you have ideas, suggestions, or would like to report an issue, feel free to open a pull request or an issue.

---
