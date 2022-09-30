class LaserShot extends Entity{
    
    constructor(imgPath, width, height, speed, alien){

        let left = alien.getLeft() + alien.getWidth() / 2 - laserShotData.width / 2;
        let bottom = alien.getBottom() + alien.getHeight() / 2;
        super(imgPath, width, height, left, bottom);

        this.img.style.zIndex = '-10';
        this.speed = speed;
        this.animation = requestAnimationFrame(()=>this.move());
    }

    move(){
        if (this.getBottom() + this.getHeight() > 0){
            this.setBottom(this.getBottom() - this.speed);
            // this.checkCollision();
            requestAnimationFrame(()=>this.move());
        } else {
            cancelAnimationFrame(this.animation);
            this.img.remove();
        }
    }
}