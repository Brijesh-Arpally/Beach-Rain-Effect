const app = () => {
    const song = document.querySelector(".song");
    const play = document.querySelector(".play");
    const outline = document.querySelector(".moving-outline circle");
    const video = document.querySelector(".vid-container video");

    // All sounds
    const sounds = document.querySelectorAll(".sound-picker button");
    //Time-Display
    const timeDisplay = document.querySelector(".time-display");
    const timeSelect = document.querySelectorAll(".time-select button");
    // Length of outline
    const outlineLength = outline.getTotalLength();
    // Time-Duration
   let fakeDuration = 600;
   
   outline.style.strokeDasharray = outlineLength;
   outline.style.strokeDashoffset = outlineLength;

   //play different sounds
   sounds.forEach(sound => {
       sound.addEventListener('click', function(){
           song.src = this.getAttribute('data-sound');
           video.src = this.getAttribute('data-video');
           checkPlaying(song);
       });
   });

   //playsound
   play.addEventListener("click",() =>{
       checkPlaying(song);
   });

   //select sound
   timeSelect.forEach(option =>{
       option.addEventListener('click', function(){
           fakeDuration = this.getAttribute("data-time");
           timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;
       });
   });
   //Pause the song
   const checkPlaying = song => {
    if(song.paused){
        song.play();
        video.play();
        play.src = "pause image.png";
    } else {
        song.pause();
        video.pause();
        play.src = "play image.png";
    }
};
     // Animation of the circle
     song.ontimeupdate = () => {
         let currentTime = song.currentTime;
         let elapsed = fakeDuration - currentTime;
         let seconds = Math.floor(elapsed % 60);
         let minutes = Math.floor(elapsed / 60);

         //Circle coloring
         let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
         outline.style.strokeDashoffset = progress;
         //Text animation
         timeDisplay.textContent = `${minutes}:${seconds}`

         if (currentTime >= fakeDuration){
             song.pause();
             song.currentTime = 0;
             play.src = "play image.png";
             video.pause();
         }
    };
};

app();