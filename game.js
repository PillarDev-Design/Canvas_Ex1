//****************************************
// UTIL / Stubs
//****************************************
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
          window.webkitRequestAnimationFrame || 
          window.mozRequestAnimationFrame    || 
          window.oRequestAnimationFrame      || 
          window.msRequestAnimationFrame     || 
          function(/* function */ callback, /* DOMElement */ element){
            window.setTimeout(callback, 1000 / 60);
          };
})();

//****************************************
// Inits / Variable Declarations
//****************************************
var width = 800;
var height = 600;
var menu_loop;
var how_many_stars = 20;
var stars = [];

var main_canvas = document.getElementById('main_canvas');
var ctx = main_canvas.getContext('2d');
main_canvas.width = width;
main_canvas.height = height;

// Generate Initial Stars
for (var i=0;i<how_many_stars;i++){
    stars.push([
        Math.random() * width,
        Math.random() * height,
        Math.random() * 10,
        Math.random() / 2
        ]);
}

//****************************************
// Function Declarations
//****************************************
var clear = function(){
    ctx.fillStyle = '#000000';
    ctx.clearRect(0,0,width,height);
    ctx.beginPath();
    ctx.rect(0,0,width,height);
    ctx.closePath();
    ctx.fill();
};
var draw_stars = function(){
    for (var i=0;i<how_many_stars;i++){
        ctx.fillStyle = 'rgba(255,255,255, ' + stars[i][3] + ')';
        ctx.beginPath();
        ctx.arc(
            stars[i][0],
            stars[i][1],
            stars[i][2],
            0,
            Math.PI * 2,
            true);
        ctx.closePath();
        ctx.fill();
    }
};
var move_stars = function(e){
    for (var i=0;i<how_many_stars;i++){
        if (stars[i][1] - stars[i][2] > height){
            stars[i][0] = Math.random() * width;
            stars[i][2] = Math.random() * 5;
            stars[i][1] = 0 - stars[i][2];
            stars[i][3] = Math.random() / 2;
        }else{
            stars[i][0] += (e * 0.8);
            stars[i][1] += e;
        }
    }
};
//****************************************
// Planet Class Declaration
//****************************************
var planet = new (function(){
    // Local Variables
    var that = this;
    that.image = new Image();
    that.image.src = "resources/a_terran_tileset.png";
    that.width = 150;
    that.height = 150;
    that.frames = 149;
    that.actualFrame = 0;
    that.interval = 0;
    that.X = 0;
    that.Y = 0;
    
    that.setPosition = function(x,y){
        that.X = x;
        that.Y = y;
    }

    that.draw = function(){
        try{
            ctx.drawImage(that.image,
                0,
                that.height * that.actualFrame,
                that.width,
                that.height,
                that.X,
                that.Y,
                that.width,
                that.height);
        }catch(e){
        };
        
        if (that.interval === 3){
            if (that.actualFrame === that.frames){
                that.actualFrame = 0;
            }else{
                that.actualFrame++;
            }
            that.interval = 0;
        }
        that.interval++;
    }
})();
var small_planet = new (function(){
    // Local Variables
    var that = this;
    that.image = new Image();
    that.image.src = "resources/a_terran_tileset_small.png";
    that.width = 75;
    that.height = 75;
    that.frames = 149;
    that.actualFrame = 0;
    that.interval = 0;
    that.X = 0;
    that.Y = 0;
    
    that.setPosition = function(x,y){
        that.X = x;
        that.Y = y;
    }

    that.draw = function(){
        try{
            ctx.drawImage(that.image,
                0,
                that.height * that.actualFrame,
                that.width,
                that.height,
                that.X,
                that.Y,
                that.width,
                that.height);
        }catch(e){
        };
        
        if (that.interval === 3){
            if (that.actualFrame === that.frames){
                that.actualFrame = 0;
            }else{
                that.actualFrame++;
            }
            that.interval = 0;
        }
        that.interval++;
    }
})();

//****************************************
// Class Inits
//****************************************
planet.setPosition((~~((width-planet.width)/2)+150),~~(((height-planet.height)/2))+150);
small_planet.setPosition((~~((width-small_planet.width)/2)-200),(~~((height-small_planet.height)/2))-200);

//****************************************
// Define game loop
//****************************************
var GameLoop = function(){
    clear();
    move_stars(2);
    draw_stars();

    planet.draw();
    small_planet.draw();

    //Old and busted
    //game_loop = setTimeout(GameLoop, 1000 / 50);

    //New and shiny
    requestAnimFrame(GameLoop);
};

//****************************************
// Game Loop Init
//****************************************
GameLoop();
