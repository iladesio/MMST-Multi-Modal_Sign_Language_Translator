import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { alpha } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import PanToolIcon from "@mui/icons-material/PanTool";
import {
  InputLabel,
  MenuItem,
  Select,
  Grid,
  FormControl,
  IconButton,
} from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MicIcon from "@mui/icons-material/Mic";
import VideocamIcon from "@mui/icons-material/Videocam";
import RestoreIcon from "@mui/icons-material/Restore";
import WaveSurfer from "wavesurfer.js";

export default function Hero() {
  const [sourceLanguage, setSourceLanguage] = useState("en");
  const [targetLanguage, setTargetLanguage] = useState("it");
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [file, setFile] = useState(null);
  const [isRecordingAudio, setIsRecordingAudio] = useState(false);
  const [isRecordingVideo, setIsRecordingVideo] = useState(false);
  const [audioSrc, setAudioSrc] = useState("");
  const [videoSrc, setVideoSrc] = useState("");
  const [uploadedVideoSrc, setUploadedVideoSrc] = useState("");
  const [recordedVideoUrl, setRecordedVideoUrl] = useState("");
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const streamRef = useRef(null);
  const waveSurferRef = useRef(null);

  const handleChangeSource = (event) => {
    setSourceLanguage(event.target.value);
  };

  const handleChangeTarget = (event) => {
    setTargetLanguage(event.target.value);
  };

  const handleSwapLanguages = () => {
    const temp = sourceLanguage;
    setSourceLanguage(targetLanguage);
    setTargetLanguage(temp);
  };

  const handleTranslate = async () => {
    if (!sourceText || !sourceLanguage || !targetLanguage) {
      console.error("Invalid input data");
      return;
    }

    const url = "http://localhost:8000/translate/text_to_sign";
    const requestBody = {
      text: sourceText,
      src: sourceLanguage,
      trg: targetLanguage,
    };

    console.log("Request Body:", requestBody);

    try {
      const response = await axios.post(url, requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const base64Data = response.data.pose;
        const binaryString = atob(base64Data);
        const byteArray = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          byteArray[i] = binaryString.charCodeAt(i);
        }

        const blob = new Blob([byteArray], { type: "video/mp4" });
        const videoUrl = URL.createObjectURL(blob);
        setVideoSrc(videoUrl);
        setTranslatedText(response.data.translatedText); // Assuming translatedText is returned by the API
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error during translation:", error);
      console.error("Response Data:", error.response?.data);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      setUploadedVideoSrc(videoUrl);
      setFile(file);
    }
  };

  const handleAudioRecord = async () => {
    if (isRecordingAudio) {
      mediaRecorderRef.current.stop();
      streamRef.current.getTracks().forEach((track) => track.stop());
      setIsRecordingAudio(false);
    } else {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: "audio/webm",
      });

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, {
          type: "audio/webm",
        });
        const audioUrl = URL.createObjectURL(blob);
        setAudioSrc(audioUrl);
        recordedChunksRef.current = [];
      };

      mediaRecorderRef.current.start();
      setIsRecordingAudio(true);
    }
  };

  useEffect(() => {
    if (audioSrc) {
      if (waveSurferRef.current) {
        waveSurferRef.current.destroy();
      }
      waveSurferRef.current = WaveSurfer.create({
        container: "#waveform",
        waveColor: "violet",
        progressColor: "purple",
      });
      waveSurferRef.current.load(audioSrc);
    }
  }, [audioSrc]);

  useEffect(() => {
    return () => {
      if (waveSurferRef.current) {
        waveSurferRef.current.destroy();
        waveSurferRef.current = null;
      }
    };
  }, []);

  const handleVideoRecord = async () => {
    if (isRecordingVideo) {
      mediaRecorderRef.current.stop();
      streamRef.current.getTracks().forEach((track) => track.stop());
      setIsRecordingVideo(false);
    } else {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;

      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: "video/webm",
      });

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, {
          type: "video/webm",
        });
        const videoUrl = URL.createObjectURL(blob);
        setRecordedVideoUrl(videoUrl);
        recordedChunksRef.current = [];
      };

      mediaRecorderRef.current.start();
      setIsRecordingVideo(true);
    }
  };

  const handleReset = () => {
    setRecordedVideoUrl("");
    setUploadedVideoSrc("");
    setVideoSrc("");
    setSourceText("");
    setTranslatedText("");
    setAudioSrc("");
    if (waveSurferRef.current) {
      waveSurferRef.current.destroy();
      waveSurferRef.current = null;
    }
  };

  const theme = useTheme();

  return (
    <Box
      id="hero"
      sx={{
        width: "100%",
        backgroundImage:
          theme.palette.mode === "light"
            ? "linear-gradient(180deg, #CEE5FD, #FFF)"
            : `linear-gradient(#02294F, ${alpha("#090E10", 0.0)})`,
        backgroundSize: "100% 20%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack spacing={2} sx={{ width: { xs: "100%", sm: "70%" } }}>
          <Typography
            variant="h1"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignSelf: "center",
              textAlign: "center",
              fontSize: "clamp(3.5rem, 10vw, 4rem)",
            }}
          >
            MMSigns&nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={{
                fontSize: "clamp(3rem, 10vw, 4rem)",
                color:
                  theme.palette.mode === "light"
                    ? "primary.main"
                    : "primary.light",
              }}
            >
              AI
            </Typography>
          </Typography>
          <Typography
            textAlign="center"
            color="text.secondary"
            sx={{ alignSelf: "center", width: { sm: "100%", md: "80%" } }}
          >
            Your Sign Language Translator in Pocket.
          </Typography>
        </Stack>
        <Box
          id="image"
          sx={{
            mt: { xs: 8, sm: 10 },
            alignSelf: "center",
            minHeight: { xs: 233, sm: 300 },
            width: "100%",
            outline: "none",
            outlineColor:
              theme.palette.mode === "light"
                ? alpha("#BFCCD9", 0.5)
                : alpha("#9CCCFC", 0.1),
            boxShadow:
              theme.palette.mode === "light"
                ? `0 0 12px 8px ${alpha("#9CCCFC", 0.2)}`
                : `0 0 24px 12px ${alpha("#033363", 0.2)}`,
          }}
        >
          <Grid
            container
            spacing={2}
            alignItems="flex-start"
            justifyContent="center"
            style={{ paddingTop: "16px", height: "100%" }}
          >
            <Grid item xs={5}>
              <FormControl fullWidth>
                <InputLabel id="source-language-label">
                  Source Language
                </InputLabel>
                <Select
                  labelId="source-language-label"
                  id="source-language-select"
                  value={sourceLanguage}
                  onChange={handleChangeSource}
                >
                  <MenuItem value="en">🇺🇸 English</MenuItem>
                  <MenuItem value="it">🇮🇹 Italian</MenuItem>
                  <MenuItem value="es">🇪🇸 Spanish</MenuItem>
                  <MenuItem value="asl">
                    <PanToolIcon
                      fontSize="small"
                      style={{ marginRight: "5px", verticalAlign: "middle" }}
                    />
                    🇺🇸 ASL (American Sign Language)
                  </MenuItem>
                  <MenuItem value="lis">
                    <PanToolIcon
                      fontSize="small"
                      style={{ marginRight: "5px", verticalAlign: "middle" }}
                    />
                    🇮🇹 LIS (Italian Sign Language)
                  </MenuItem>
                  <MenuItem value="bsl">
                    <PanToolIcon
                      fontSize="small"
                      style={{ marginRight: "5px", verticalAlign: "middle" }}
                    />
                    🇬🇧 BSL (British Sign Language)
                  </MenuItem>
                </Select>
              </FormControl>

              <Box
                sx={{
                  marginTop: theme.spacing(4),
                  padding: theme.spacing(2),
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: theme.shape.borderRadius,
                  backgroundColor: theme.palette.background.paper,
                  minHeight: 200,
                }}
              >
                {!isRecordingVideo &&
                  !recordedVideoUrl &&
                  !uploadedVideoSrc &&
                  !audioSrc && (
                    <TextField
                      label="Enter text or attach media"
                      fullWidth
                      margin="normal"
                      value={sourceText}
                      onChange={(e) => setSourceText(e.target.value)}
                      multiline
                      rows={4}
                      variant="outlined"
                    />
                  )}
                {uploadedVideoSrc && (
                  <Box mt={2}>
                    <video width="100%" controls>
                      <source src={uploadedVideoSrc} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </Box>
                )}
                {recordedVideoUrl && (
                  <Box mt={2}>
                    <video width="100%" controls>
                      <source src={recordedVideoUrl} type="video/webm" />
                      Your browser does not support the video tag.
                    </video>
                  </Box>
                )}
                {audioSrc && (
                  <Box mt={2} sx={{ width: "100%", height: "100px" }}>
                    <div id="waveform"></div>
                    <Button onClick={() => waveSurferRef.current.playPause()}>
                      Play / Pause
                    </Button>
                  </Box>
                )}
              </Box>
            </Grid>
            <Grid item>
              <IconButton
                onClick={handleSwapLanguages}
                aria-label="Swap languages"
              >
                <SwapHorizIcon />
              </IconButton>
            </Grid>
            <Grid item xs={5}>
              <FormControl fullWidth>
                <InputLabel id="target-language-label">
                  Target Language
                </InputLabel>
                <Select
                  labelId="target-language-label"
                  id="target-language-select"
                  value={targetLanguage}
                  onChange={handleChangeTarget}
                  margin="dense"
                >
                  <MenuItem value="en">🇺🇸 English</MenuItem>
                  <MenuItem value="it">🇮🇹 Italian</MenuItem>
                  <MenuItem value="es">🇪🇸 Spanish</MenuItem>
                  <MenuItem value="bfi">
                    <PanToolIcon
                      fontSize="small"
                      style={{ marginRight: "5px", verticalAlign: "middle" }}
                    />
                    🇺🇸 ASL (American Sign Language)
                  </MenuItem>
                  <MenuItem value="lis">
                    <PanToolIcon
                      fontSize="small"
                      style={{ marginRight: "5px", verticalAlign: "middle" }}
                    />
                    🇮🇹 LIS (Italian Sign Language)
                  </MenuItem>
                  <MenuItem value="bsl">
                    <PanToolIcon
                      fontSize="small"
                      style={{ marginRight: "5px", verticalAlign: "middle" }}
                    />
                    🇬🇧 BSL (British Sign Language)
                  </MenuItem>
                </Select>
              </FormControl>

              <Box
                sx={{
                  marginTop: theme.spacing(4),
                  padding: theme.spacing(2),
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: theme.shape.borderRadius,
                  backgroundColor: theme.palette.background.paper,
                  minHeight: 200,
                }}
              >
                {!videoSrc && (
                  <TextField
                    label="Translated text or media"
                    fullWidth
                    margin="normal"
                    value={translatedText}
                    onChange={(e) => setTranslatedText(e.target.value)}
                    multiline
                    rows={4}
                    variant="outlined"
                  />
                )}
                {videoSrc && (
                  <Box mt={2}>
                    <video width="100%" controls>
                      <source src={videoSrc} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            container
            justifyContent="center"
            spacing={2}
            sx={{ mt: 2, mb: 2 }}
          >
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={handleTranslate}
                startIcon={<PanToolIcon />}
              >
                Translate
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                component="label"
                startIcon={<AttachFileIcon />}
              >
                Upload Video
                <input
                  type="file"
                  hidden
                  onChange={handleFileChange}
                  accept="video/*"
                />
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="success"
                onClick={handleAudioRecord}
                startIcon={<MicIcon />}
              >
                {isRecordingAudio ? (
                  <>
                    <span className="blinking-dot"></span>Recording Audio
                  </>
                ) : (
                  "Record Audio"
                )}
              </Button>
            </Grid>
            <Grid item>
              <Button
                style={{ backgroundColor: "orange", color: "white" }}
                variant="contained"
                onClick={handleVideoRecord}
                startIcon={<VideocamIcon />}
              >
                {isRecordingVideo ? (
                  <>
                    <span className="blinking-dot"></span>Recording Video
                  </>
                ) : (
                  "Record Video"
                )}
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleReset}
                startIcon={<RestoreIcon />}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
