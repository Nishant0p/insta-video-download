document.getElementById('downloadBtn').addEventListener('click', function() {
    const videoUrl = document.getElementById('videoUrl').value;
    const userId = ''; // Add user ID if needed for specific types
    const apiKey = ''; // Replace with your actual API key

    const data = {
        video_url: videoUrl,
        type: 'instagram',
        user_id: userId // Optional, based on your needs
    };

    const url = "https://apihut.in/api/download/videos";

    axios.post(url, data, {
        headers: {
            'x-avatar-key': apiKey,
            'Content-Type': 'application/json'
        }
    })
    .then((response) => {
        console.log("Response:", response.data);
        
        // Check if the response contains valid data
        if (response.data.success && response.data.data.length > 0) {
            const videoData = response.data.data[0]; // Get the first video data
            
            // Check if the URL is present
            if (videoData.url) {
                // Show the download link
                document.getElementById('result').innerHTML = `<a href="${videoData.url}" target="_blank">Download Video</a>`;
                
                // Show the video player
                const videoPlayer = document.getElementById('videoPlayer');
                videoPlayer.src = videoData.url; // Set the video source
                videoPlayer.style.display = 'block'; // Show the video player
                videoPlayer.play(); // Automatically play the video
            } else {
                document.getElementById('result').innerText = 'No video found.';
            }
        } else {
            document.getElementById('result').innerText = 'No video found.';
        }
    })
    .catch((error) => {
        console.error("Error:", error);
        document.getElementById('result').innerText = 'Error downloading video. Please check the URL.';
    });

});
