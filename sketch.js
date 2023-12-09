//ボールの設定
let ballX;
let ballY;
let ballSpeedX;
let ballSpeedY;
let ballRadius;

//左パドル(棒)の設定
//パドルの座標はパドルの左上が基準
let paddleAX;
let paddleAY;
let paddleASpeed;
let paddleAWidth;
let paddleAHeight;

//右パドルの設定
let paddleBX;
let paddleBY;
let paddleBSpeed;
let paddleBWidth;
let paddleBHeight;

//真ん中の線の設定
let x1;
let y1;
let xWidth;
let yHeight;

//点数表示の設定
let scoreA=0;
let scoreB=0;
let textA;
let textB;

//画面の区別(modeの設定)
let mode

//起動時に１回実行
function setup() {
  createCanvas(700,400);
  mode=0
  x1=(width/2)-1;
  y1=height*0;
  xWidth=2;
  yHeight=height;
  ballX=width/2;
  ballY=height/2;
  ballSpeedX=7;
  ballSpeedY=0;
  ballRadius=10;
  paddleAX=width-670;
  paddleAY=height/2-50;
  paddleASpeed=10;
  paddleAWidth=10; 
  paddleAHeight=100;
  paddleBX=width-40;
  paddleBY=height/2-50;
  paddleBSpeed=10;
  paddleBWidth=10;
  paddleBHeight=100;
}

//１秒間に６０回実行
function draw() {
  background('green');

  //スタート画面(mode=0)
  if(mode==0){
    textSize(20)
    textAlign(CENTER);
    fill("white");
    text("TENNIS GAME",width/2,height/2-30);
    text("PRESS [SPACE] BUTTON",width/2,height/2+30);
    if(keyIsDown(32)){
      mode=1;
    }
  }

  //ゲーム画面(mode=1)
  if (mode==1) {
    textAlign(LEFT);
    textA="Left:"+scoreA;
    textB="Right:"+scoreB;
    fill("white");
    textSize(20);
    text(textA,150,25);
    text(textB,500,25);
    ballX+=ballSpeedX;
    ballY+=ballSpeedY;

    //左パドルの挙動
    if(keyIsDown(87)){
      if(paddleAY<=0){
        paddleAY=0;
        }else{
          paddleAY-=paddleASpeed;
      }
    }
    if(keyIsDown(83)){
      if(paddleAY+100>=height){
        paddleAY+100==height;
      }else{
        paddleAY+=paddleASpeed;
      }
    }
      
    //右パドルの挙動
    if(keyIsDown(79)){
      if(paddleBY<=0){
        paddleBY=0;
      }else{
        paddleBY-=paddleASpeed;
      }
    }
    if(keyIsDown(76)){
      if(paddleBY+100>=height){
        paddleBY+100==height;
      }else{
        paddleBY+=paddleBSpeed;
      }
    }
    
    //ポーズ画面(mode=2)へワープ
    if(keyIsDown(54)){
      mode=2;
    }
    
    //ボールとパドルの衝突時の設定
    if(paddleAY < ballY && ballY < paddleAY + paddleAHeight && paddleAX + paddleAWidth + ballRadius > ballX && ballX > paddleAX + paddleAWidth){
      ballSpeedY = (ballY - (paddleAY+paddleAHeight / 2) ) / (paddleAHeight / 2) * 7;
      ballSpeedX*=-1;
    }
    if(paddleBY < ballY && ballY < paddleBY + paddleBHeight && paddleBX - ballRadius < ballX && ballX < paddleBX){
      ballSpeedY = (ballY - (paddleBY+paddleBHeight / 2) ) / (paddleBHeight / 2) * 7
      ballSpeedX*=-1; 
    }
    
    //ボールと壁の衝突時の設定
    if(ballY+ballRadius>height){
      ballSpeedY*=-1;
    }
    if(ballY-ballRadius<0){
      ballSpeedY*=-1;
    }
  
    //ゲームの勝敗＋continue時の設定
    if(ballX-ballRadius<0){
      ballSpeedX=0;
      ballSpeedY=0;
      fill("white");
      text("RIGHT  WIN",width/2-65,height/2);
      if(keyIsDown(32)){
        scoreB+=1;
        setup();
      }
      if(keyIsDown(78)){
        scoreA=0;
        scoreB=0;
        mode=0;
      }
    }
    if(ballX+ballRadius>width){
      ballSpeedX=0;
      ballSpeedY=0;
      fill("white");
      text("LEFT  WIN",width/2-58,height/2);
      if(keyIsDown(32)){ 
        scoreA+=1;
        setup();
      }
      if(keyIsDown(78)){
        scoreA=0;
        scoreB=0;
        mode=0;
      }
    }
    //ボール・パドル・線の表示
    circle(ballX,ballY,ballRadius*2);
    rect(paddleAX,paddleAY,paddleAWidth,paddleAHeight);
    rect(paddleBX,paddleBY,paddleBWidth,paddleBHeight);
    rect(x1,y1,xWidth,yHeight);
  }

  if(mode==2){
    textSize(20)
    textAlign(CENTER);
    fill("white");
    text("PAUSE",width/2,height/2);
    if(keyIsDown(55)){
      mode=1;
    }
    if(keyIsDown(78)){
      scoreA=0;
      scoreB=0;
      mode=0;
    }
  }
}
