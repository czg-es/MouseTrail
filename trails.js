const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particleArray = [];
const numberOfParticles = 200;

const mouse = {
    x: null,
    y: null
}

window.addEventListener('pointermove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    
});
setInterval(function(){
    mouse.x = undefined;
    mouse.y = undefined;

},200);
// Create particles
class Particle{
    constructor(x, y, size, color, weight){
        this.x  = x ;  //= ((Math.random()* 10)-3);
        this.y  = y ; //= ((Math.random()* 8)-1);
        this.size = size;
        this.color = '#' + (Math.floor(Math.random()*16777215).toString(16));
        this.weight = weight;
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x ,this.y ,this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update(){
        this.size -= 0.05;
        if(this.size < 0){
            this.x = (mouse.x + ((Math.random() * 80) -10) );//(mouse.x + Math.floor((Math.random()*199) - 99));
            this.y = (mouse.y + ((Math.random() * 80) -10) ); //(mouse.y + Math.floor((Math.random()*199) - 99));
            this.size = (Math.random() * 10 ) +2;
            this.weight = (Math.random() * 1 ) -0.5;
        }
        this.y += this.weight;
        this.x -= (Math.random() * 0.5 ) +3;
        //this.x += -3;
        //this.y += -6;
        this.weight += 0.05;
        if(this.y > canvas.height - this.size){
            this.weight *= -0.5; //bouncing

        };
    }
}

function init(){
    particleArray = [];
    for(let i = 0; i < numberOfParticles; i ++){
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let size = (Math.random() * 5) +2 ;
        let color = 'rgba(123,30,90,0)';
        let weight = 1;
        particleArray.push(new Particle(x, y, size, color, weight));
    }
}
function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //ctx.fillStyle = 'rgba(0,0,0,0.01)';
    //ctx.fillRect(0,0, canvas.width, canvas.height);
    for (let i = 0; i < particleArray.length; i++){
        particleArray[i].update();
        particleArray[i].draw();
    }
    connect();
    requestAnimationFrame(animate);
}

init();
animate();

function connect(){
    let opacityValue = 1;
    for(let a = 0; a < particleArray.length; a++ ){
        for(let b = a; b < particleArray.length; b++){
            let distance = ((particleArray[a].x - particleArray[b].x)* 
                                    ( particleArray[a].x - particleArray[b].x))
                                  + ((particleArray[a].y - particleArray[b].y)* 
                                    ( particleArray[a].y - particleArray[b].y));
            if (distance < 8000){
                opacityValue = 1 - (distance/10000 * 2 );
                ctx.strokeStyle = 'rgba(123,30,90,' + opacityValue + ')';
                ctx.beginPath();
                ctx.lineWidth = 1;
                ctx.moveTo(particleArray[a].x, particleArray[a].y );
                ctx.lineTo(particleArray[b].x, particleArray[b].y );
                ctx.stroke();
            }
        }

    }
}








