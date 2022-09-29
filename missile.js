class Missile extends Entity{
  
    constructor(imgPath, width, height, speed){

        let left = ship.getLeft() + ship.getWidth() / 2 - missileData.width / 2;
        let bottom = ship.getBottom() + ship.getHeight() / 2;
        super(imgPath, width, height, left, bottom);

        this.img.style.zIndex = '-10';
        this.speed = speed;
        this.animation = requestAnimationFrame(()=>this.move());
    }
  
    move(){
        if (this.getBottom() < window.innerHeight){
            this.setBottom(this.getBottom() + this.speed);
            requestAnimationFrame(()=>this.move());
        } else {
            cancelAnimationFrame(this.animation);
            this.img.remove();
        }
    }
}