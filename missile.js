class Missile extends Entity{
  
    constructor(imgPath, width, height, speed){

        let left = ship.getLeft() + ship.getWidth() / 2 - missileData.width / 2;
        let bottom = ship.getBottom() + ship.getHeight() / 2;
        super(imgPath, width, height, left, bottom);

        this.img.style.zIndex = '-10';
        this.speed = speed;
        this.animation = setInterval(() => {this.moveMissile()},10);
    }
  
    moveMissile(){
        if (this.getBottom() < window.innerHeight){
            this.setBottom(this.getBottom() + this.speed);
        } else {
            clearInterval(this.animation);
            this.img.remove();
        }
    }
  }