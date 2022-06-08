function setup(){
  canvas = createCanvas(380,380);
  canvas.center();
  video.hide();
  
  

  
}
function preload(){
    video = createVideo('video.mp4');
    
    
}
function draw(){
    image(video,0,0,380,380);
    if(status != ""){
      objectDetector.detect(video,gotResult);
      for(i=0; i<objects.length; i++){
        document.getElementById('status').innerHTML = "Status:Objects detected";
        document.getElementById('result').innerHTML = "No of objects" + objects.length;
        fill("red");
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%",objects[i].x + 15,objects[i].y + 15);
        noFill();
        stroke("red");
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
      }
    }
}

status = "";
objects = [];


function modelLoaded(){
  status = true;
  console.log("Model is loaded");
  video.loop();
  video.speed(1);
  video.volume(.5);
  
}
function gotResult(error,results){
  if(error){
    console.log(error);
  }
  console.log(results);
  objects = results;
}
function start(){
  objectDetector =ml5.objectDetector('cocossd',modelLoaded);
  document.getElementById('status').innerHTML ="Status:Dedecting Objects";
}
