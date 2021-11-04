 /**
  * 
  *  1. add script just after client.js in html file
  *     <script type="text/javascript" src="video-controller.js"></script>
  * 
  * Add ui to html 
  * 
  *             <div id="video-clip-controls">
                <label for="clip-url-input" class="form-text">Enter a video URL</label>
                <input id="clip-url-input"
                    value="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                    class="form-control" aria-describedby="clipURLHelp" />
                <div class="btn-group-sm p-3">
                    <button type="button" class="btn btn-success" id="start-clip-btn" disabled> Begin</button>
                    <button type="button" class="btn btn-success" id="play-clip-btn" disabled> Play </button>
                    <button type="button" class="btn btn-success" id="pause-clip-btn" disabled> Pause </button>
                    <button type="button" class="btn btn-success" id="stop-clip-btn" disabled> End</button>
                </div>
            </div>
  * 
  * 
  * 
  * 
  */
 
 // clip video Controller controls

 const clipURLInput = document.getElementById('clip-url-input');
 const startClipBtn = document.getElementById('start-clip-btn');
 const playClipBtn = document.getElementById('play-clip-btn');
 const pauseClipBtn = document.getElementById('pause-clip-btn');
 const stopClipBtn = document.getElementById('stop-clip-btn');
 
 let timestamp = 0;



 //  start video presentation with a url
 startClipBtn.onclick = () => {
   videoURL = clipURLInput.value;
   VoxeetSDK.videoPresentation.start(videoURL)
     .then(() => {
       console.log("video started")
     })
     .catch((error) => {
       console.log(error);
     })
 }

 //play
 playClipBtn.onclick = () => {
   VoxeetSDK.videoPresentation.play()
     .then(() => {
       console.log("video play")
     })
     .catch((error) => {
       console.log(error);
     })
 }
 // pause
 pauseClipBtn.onclick = () => {
   
   VoxeetSDK.videoPresentation.pause()
     .then(() => {
       console.log("video pause")
     })
     .catch((error) => {
       console.log(error);
     })
 }
 // stop 
 stopClipBtn.onclick = () => {
   VoxeetSDK.videoPresentation.stop()
     .then(() => {
       console.log("video Stop")
     })
     .catch((error) => {
       console.log(error);
     })
 }

 // Video Presentation listeners
 VoxeetSDK.videoPresentation.on("started", (participant, stream) => {
   console.log("started", participant, stream)
   addClipNode(participant, stream)
   startClipBtn.disabled = true;
   playClipBtn.disabled = true;
   pauseClipBtn.disabled = false;
   stopClipBtn.disabled = false;
 });

 VoxeetSDK.videoPresentation.on("paused", (participant, stream) => {
   console.log("paused", participant, stream)
   let videoNode = document.getElementById('video-clip');
   timestamp = Math.round(videoNode.currentTime * 1000);
   // videoNode.currentTime = timestamp;
   videoNode.pause()
   
   startClipBtn.disabled = true;
   playClipBtn.disabled = false;
   pauseClipBtn.disabled = true;
   stopClipBtn.disabled = false;
 });

 VoxeetSDK.videoPresentation.on("sought", (participant, stream) => {

   let videoNode = document.getElementById('video-clip');
   timestamp = Math.round(videoNode.currentTime * 1000);
   // videoNode.currentTime = timestamp;
   console.log("seek", participant, stream)
 });

 VoxeetSDK.videoPresentation.on("played", (participant, stream) => {
   console.log("play", participant, stream)
   let videoNode = document.getElementById('video-clip');
   videoNode.play()
   videoNode.muted = false;
   startClipBtn.disabled = true;
   playClipBtn.disabled = true;
   pauseClipBtn.disabled = false;
   stopClipBtn.disabled = false;
 });

 VoxeetSDK.videoPresentation.on("stopped", (participant, stream) => {
   console.log("stopped", participant, stream);
   let videoNode = document.getElementById('video-clip');
   videoNode.pause()
   resetRemoveVideo()
 });

 var resetRemoveVideo = () => {
   let videoNode = document.getElementById('video-clip');
   if (videoNode) {
     videoNode.pause()
     removeClipNode()
   }
   startClipBtn.disabled = false;
   playClipBtn.disabled = true;
   pauseClipBtn.disabled = true;
   stopClipBtn.disabled = true;
 }
 // Add a Clip stream to the web page
 const addClipNode = (participant, stream) => {

   let videoNode = document.getElementById('video-clip');

   if (!videoNode) {
     videoNode = document.createElement('video');
     videoNode.setAttribute('class', 'clip-item'); // style lager
     videoNode.setAttribute('id', 'video-clip');
     videoNode.setAttribute('height', 480);
     videoNode.setAttribute('width', 640);
     videoNode.setAttribute("playsinline", true);
     videoNode.muted = false;
     videoNode.setAttribute("autoplay", 'autoplay');
     videoNode.setAttribute("src", participant.url);;
     const videoContainer = document.getElementById('video-container');
     videoContainer.prepend(videoNode)
   }
   navigator.attachMediaStream(videoNode, stream);
   playClipBtn.disabled = false;
 };
 // Remove the Clip stream from the web page
 const removeClipNode = () => {
   let clipNode = document.getElementById('video-clip');
   if (clipNode) {
     clipNode.parentNode.removeChild(clipNode);
   }
 };

