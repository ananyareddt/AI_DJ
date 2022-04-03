song="";
function preload(){
    song= loadSound("music.mp3");
}
scoreRightwrist=0;
scoreLeftwrist=0;
rightwristX=0;
rightwristY=0;

leftwristX=0;
leftwristY=0;

function setup(){
    canvas=createCanvas(600,500);
    canvas.center;

    video=createCapture(VIDEO);
    video.hide;


poseNet=ml5.poseNet(video,modelLoaded);
poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("PoseNet Is Initalized");
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results){
    if (results.length>0){
           
        console.log(results);
        scoreRightwrist=results[0].pose.keypoint[10].score;
        scoreLeftwrist=results[0].pose.keypoint[9].score;
        console.log("scoreRightwrist="+scoreRightwrist+"scoreLeftwrist="+scoreLeftwrist);

        rightwristX=results[0].pose.rightwrist.X;
        rightwristY=results[0].pose.rightwrist.Y;
        console.log("rightwristX="+ rightwristX+"rightwristY="+rightwristY);

        leftwristX=results[0].pose.leftwrist.X;
        lefttwristY=results[0].pose.leftwrist.Y;
        console.log("leftwristX="+ leftwristX+"lefttwristY="+leftwristY);
    }
}
function draw(){

    Image(video,0,0,600,500);
    fill("#FF0000");
    stroke("#FF0000");

    if(scoreRightwrist>0.2){
        circle(rightwristX,rightwristY,20);
    }
if(rightwristX>0 && rightwristY<=100){
document.getElementById("speed").innerHTML="speed=0.5x";
song.rate("0.5");
    }
else if(rightwristX>100 && rightwristY<=200){
document.getElementById("speed").innerHTML="speed=1x";
song.rate("1");
}
else if(rightwristX>200 && rightwristY<=300){
document.getElementById("speed").innerHTML="speed=1.5x";
song.rate("1.5");
 }
else if(rightwristX>300 && rightwristY<=400){
 document.getElementById("speed").innerHTML="speed=2x";
song.rate("2");
}
else if(rightwristY>400){
 document.getElementById("speed").innerHTML="speed=2.5x";
 song.rate("2.5");
 }
 if(scoreLeftwrist>0.2){
    circle(leftwristX,leftwristY,20);
    InNumberleftwristY=Number(lefttwristY);
    remove_decimals=floor(InNumberleftwristY);
    volume=remove_decimals/500;
    document.getElementById("volume").innerHTML="Volume="+volume;
    song.setVolume(volume);
}

}