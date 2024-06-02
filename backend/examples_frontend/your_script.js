// Define the URL of your FastAPI server endpoint
const url = "http://localhost:8000/translate/text_to_sign";

// Define the input parameters for the request
const requestBody = {
  text: "Ciao, come stai?",
  src: "it", // Source language
  trg: "bfi", // Target sign language
};

// Define the options for the fetch request
const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(requestBody),
};

// Function to handle the fetch response and display the video
async function fetchAndDisplayVideo() {
  try {
    const response = await fetch(url, options);

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the JSON response
    const jsonData = await response.json();

    // Extract the base64-encoded video data from the JSON
    const base64Data = jsonData.pose;

    // Decode the Base64 data into a binary string
    const binaryString = atob(base64Data);

    // Convert the binary string to a typed array
    const byteArray = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      byteArray[i] = binaryString.charCodeAt(i);
    }

    // Create a Blob from the typed array
    const blob = new Blob([byteArray], { type: "video/mp4" });

    // Create a URL for the Blob
    const videoUrl = URL.createObjectURL(blob);

    // Get the video element
    const videoElement = document.getElementById("poseVideo");

    // Set the source of the video element
    videoElement.src = videoUrl;
  } catch (error) {
    console.error("Error:", error);
  }
}

// Call the function to fetch and display the video when the page loads
window.onload = fetchAndDisplayVideo;
