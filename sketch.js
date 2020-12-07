// To create variables here.
var Dog,Dog2,HappyDog,database,foodS,foodStock;

function preload()
{
  //To load Images.
  Dog = loadImage("images/dogImg.png");
  HappyDog = loadImage("images/dogImg1.png")

	
}

function setup() {

//To create datatbase, canvas, sprites etc.

  createCanvas(600, 600);

  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  Dog2= createSprite(300,300,20,20);
  Dog2.addImage(Dog);
  Dog2.scale=0.2;
}


function draw() {  
  //to give colour to background.
   background(46, 139, 87);
    
   //To draw sprites
  drawSprites();
  //functions
keyPressed();

// If condition to refill the food. 
if(foodS < 1)
{
  database.ref('/').set(
    {
      Food:20
    }
  )
}
//To add colour, text and to give size to the text.
fill("blue");
textSize(30);
text("Food remaining : " + foodS,150,150);

textSize(25);
text("Press UP_ARROW to give Draggo food",100,50);
}

function writeStock(varname)
{
  //For updating realtime database.
  varname =varname -1;

  database.ref('/').set(
    {
      Food:varname
    }
    
  )

  
}

function readStock(data)
{
  //To get values from real time database.
  foodS = data.val();
}



function keyPressed()
{
  //If condition to update the realtime database and change dog to happy dog.
  if(keyWentDown(UP_ARROW))
  {
    writeStock(foodS);
    Dog2.addImage(HappyDog);
  }
}
