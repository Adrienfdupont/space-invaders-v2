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

            // déplacement du tir
            this.setBottom(this.getBottom() - this.speed);
            // collisions avec murs et vaisseau
            this.checkCollision(ship);
            Wall.instances.forEach(wall=>{
                this.checkCollision(wall);
            })
            // nouvelle frame
            requestAnimationFrame(()=>this.move());

        } else {

            cancelAnimationFrame(this.animation);
            this.img.remove();
        }
    }

    checkCollision(other){
        if (this.getBottom() <= other.getBottom() + other.getHeight()
            && this.getBottom() + this.getHeight() > other.getBottom() + other.getHeight()){

            if (this.getLeft() >= other.getLeft() &&
            this.getLeft() <= other.getLeft() + other.getWidth()
            || this.getLeft() + this.getWidth() >= other.getLeft() &&
            this.getLeft() + this.getWidth() <= other.getLeft() + other.getWidth()){
                
                other.die();
            }
        }
    }
}