import * as React from "react";
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
  InputAdornment,
} from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MicIcon from "@mui/icons-material/Mic";
export default function Hero() {
  const [sourceLanguage, setSourceLanguage] = React.useState("en");
  const [targetLanguage, setTargetLanguage] = React.useState("it");
  const [sourceText, setSourceText] = React.useState("");
  const [translatedText, setTranslatedText] = React.useState("");
  const [file, setFile] = React.useState(null);

  const handleChangeSource = (event) => {
    setSourceLanguage(event.target.value);
  };

  const handleChangeTarget = (event) => {
    setTargetLanguage(event.target.value);
  };

  const handleSwapLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
  };

  const handleTranslate = () => {
    // Logic to handle translation
    // For now, we just copy the text for demonstration
    setTranslatedText(sourceText);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    // Potentially handle file upload or processing here
  };

  const handleAudioRecord = () => {
    // Logic to handle audio recording or uploading
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
            minHeight: { xs: 200, sm: 500 },
            width: "100%",
            backgroundImage:
              theme.palette.mode === "light"
                ? 'url("/static/images/templates/templates-images/hero-light.png")'
                : 'url("/static/images/templates/templates-images/hero-dark.png")',
            backgroundSize: "cover",
            borderRadius: "10px",
            outline: "1px solid",
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
              <Box sx={{ display: "flex", alignItems: "flex-end", mt: 2 }}>
                <TextField
                  label="Enter text or attach media"
                  fullWidth
                  margin="normal"
                  value={sourceText}
                  onChange={(e) => setSourceText(e.target.value)}
                  multiline
                  rows={4}
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton color="primary" component="label">
                          <AttachFileIcon />
                          <input
                            type="file"
                            hidden
                            onChange={handleFileChange}
                            accept="video/*,audio/*"
                          />
                        </IconButton>
                        <IconButton color="primary" onClick={handleAudioRecord}>
                          <MicIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Grid>
            {/*<Divider orientation="vertical" flexItem sx={{ mx: 2, height: '100%' }} />*/}
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

              <TextField
                label="Translation"
                fullWidth
                margin="normal"
                value={translatedText}
                InputProps={{
                  readOnly: true,
                }}
                multiline
                rows={4}
                variant="outlined"
                sx={{ marginTop: theme.spacing(4) }}
              />
              <Typography
                variant="body1"
                sx={{ mt: 1, whiteSpace: "pre-line" }}
              >
                {translatedText}
              </Typography>
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Button
              onClick={handleTranslate}
              variant="contained"
              color="primary"
            >
              Translate
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
