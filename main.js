objects=[];
statusOBJ="";
video="";
function preload (){
    video=createVideo('video.mp4');
    video.hide();

}
function setup(){
    canvas=createCanvas(480,380);
    canvas.center();
}
function draw(){
    image(video,0,0,480,380);
    if(statusOBJ !=""){
       objectDetector.detect(video,gotResult)
       for(i=0;i<objects.length;i++){
           document.getElementById("status").innerHTML="status: Objects Detected";
           document.getElementById("number_of_objects").innerHTML="Number of objects detected are :"+ objects.length;

           fill("#FF0000");
           percent=floor(objects[i].confidence*100);
           text(objects[i].label+""+percent+"%",objects[i].x+15,objects[i].y+15);
           noFill();
           stroke("#FF0000")
           rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
       }
    }
}
function gotResult(error,result){
if(error){
console.error(error);
}
console.log(result);
objects=result;
}
function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="status: Detecting Objects";
}
function modelLoaded(){
console.log("Model Loaded!");
statusOBJ=true;
video.loop();
video.spped(1);
video.volume(0);
}