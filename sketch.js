const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;

var bg_img;
var food;
var rabbit;

var button,button1,button2;
var bunny;
var blink,eat,sad;

function preload()
{
  bg_img = loadImage('assets/kitchen.jpeg');
  cupcake_img = loadImage('assets/cupcake.png')
  cakepop_img = loadImage('assets/cake pop.png')
  cake_img = loadImage('assets/cake slice.png')
  maceron_img= loadImage('assets/maceron.png')

  food = loadImage('assets/melon.png');
  rabbit = loadImage('assets/Rabbit-01.png');;
  blink = loadAnimation("assets/blink_1.png","assets/blink_2.png","assets/blink_3.png");
  eat = loadAnimation("assets/eat_0.png" , "assets/eat_1.png","assets/eat_2.png","assets/eat_3.png","assets/eat_4.png");
  sad = loadAnimation("assets/sad_1.png","assets/sad_2.png","assets/sad_3.png");
  eating_sound = loadSound ("assets/eating_sound.mp3");
  cutting_sound = loadSound("assets/Cutting Through Foliage.mp3");
  rope_cut_sound = loadSound("assets/rope_cut.mp3")
  sound1 = loadSound("assets/sound1.mp3")
  bg_img2 = loadImage("assets/bg_plain.png");
  mutebutton = loadImage("assets/cut_button.png")
  cake_pop = loadImage("assets/cake_pop.png")

  lucky_img = loadImage("assets/lucky_img.png")

  
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {
  
  var isMObile=/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  if(isMObile)
{
  canW = displayWidth;
  canH = displayHeight
}  
else{
  canW = windowWidth; 
    canH = windowHeight; 
}
createCanvas(canW,canH);
  frameRate(80);


  cupcake = createSprite(200,200,0,0);
  cupcake.addImage('cupcake',cupcake_img);
  cupcake.scale=0.1

  cake = createSprite(400,200,0,0);
  cake.addImage('cake',cake_img);
  cake.scale =0.5;

  maceron = createSprite(600,200,0,0);
  maceron.addImage('maceron',maceron_img);
  maceron.scale =0.5;

  cakepop = createSprite(800,200,0,0);
  cakepop.addImage('cakepop',cake_pop);
  cakepop.scale =0.5;


  lucky = createSprite(500,650,0,0);
  lucky.addImage('lucky',lucky_img);
  lucky.scale =0.8;

sound1.play();
  sound1.setVolume(0.1);
  engine = Engine.create();
  world = engine.world;
  

  blower = createImg('assets/blower.png');
  blower.position(10,250);
  blower.size(150,150)
  blower.mouseClicked(airBlow)

  mute_btn = createImg('assets/cut_button.png');
  mute_btn.position(20,200)
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute)

  
  rope = new Rope(7,{x:245,y:80});
  ground = new Ground(200,690,600,20);

  rope2 = new Rope (8,{x:445,y:80});

  rope3 = new Rope (8,{x:645,y:80});

  rope4 = new Rope (8,{x:845,y:80})

  blink.frameDelay = 20;
  eat.frameDelay = 20;
  sad.frameDelay = 20;

  bunny = createSprite(230,620,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);

  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');
  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  // fruit_con = new Link(rope,fruit);
  // fruit_con2 = new Link (rope2,fruit)
  // fruit_con3 = new Link (rope3,fruit)

  
  button1 = createImg('assets/cut_btn.png');
  button1.position(220,80);
  button1.size(50,50);
  button1.mouseClicked(drop);

  button2 = createImg('assets/cut_btn.png');
  button2.position(420,80)
  button2.size(50,50);
  button2.mouseClicked(drop2);

  button3 = createImg('assets/cut_btn.png');
  button3.position(625,80)
  button3.size(50,50);
  button3.mouseClicked(drop3);

  button4 = createImg('assets/cut_btn.png');
  button4.position(845,80)
  button4.size(50,50);
  button4.mouseClicked(drop3);
  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
 

}

function draw() 
{
  background(51);
  image(bg_img,width/2,height/2,canW,canH);

  


  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }

  rope.show();
  rope2.show()
  rope3.show()
  rope4.show();
  Engine.update(engine);
  // ground.show();

  if(collide(fruit,bunny)==true)
  {
    bunny.changeAnimation('eating');
    eating_sound.play()
    //cutting_sound.play()
  }
   
  if(collide(fruit,ground.body)==true )
  {
     bunny.changeAnimation('crying');
   }

   drawSprites();
}

function drop()
{
  rope.break();
  fruit_con.dettach();
  fruit_con = null; 
  rope_cut_sound.play()
  //cutting_sound.play()
  
}
function drop2()
{
  rope2.break();
  fruit_con2.dettach();
  fruit_con2 = null; 
  rope_cut_sound.play()
  //cutting_sound.play()
  
}
function drop3()
{
  rope3.break();
  fruit_con3.dettach();
  fruit_con3 = null; 
  rope_cut_sound.play()
  //cutting_sound.play()
  
}
function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,fruit);
               fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
}

function airBlow(){
Body.applyForce(fruit,{x:0,y:0},{x:0.01, y:0.01})
}

function mute(){
  if (sound1.isPlaying()){
    sound1.stop()
  
  }
  else 
  {
    sound1.play()
  }
}
