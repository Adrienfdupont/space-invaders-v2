class LaserShot extends Entity{
    
    static instances = [];

    constructor(imgPath, width, height, speed, alien){

        let left = alien.getLeft() + alien.getWidth() / 2 - Manager.laserShotData.width / 2;
        let bottom = alien.getBottom() + alien.getHeight() / 2;
        super(imgPath, width, height, left, bottom);

        this.img.style.zIndex = '-10';
        this.speed = speed;
        this.animation = requestAnimationFrame(()=>this.move());

        LaserShot.instances.push(this);
    }

    move(){
        if (this.getBottom() + this.getHeight() > 0){

            this.setBottom(this.getBottom() - this.speed);
            this.checkCollision(ship);
            this.animation = requestAnimationFrame(() => this.move());

        } else {

            cancelAnimationFrame(this.animation);
            this.img.remove();
        }
    }

    pause(){
        cancelAnimationFrame(this.animation);
    }

    resume(){
        this.animation = requestAnimationFrame(() => this.move());
    }

    checkCollision(other){
        if (this.getBottom() <= other.getBottom() + other.getHeight()
            && this.getBottom() + this.getHeight() > other.getBottom() + other.getHeight()){

            if (this.getLeft() >= other.getLeft() &&
            this.getLeft() <= other.getLeft() + other.getWidth()
            || this.getLeft() + this.getWidth() >= other.getLeft() &&
            this.getLeft() + this.getWidth() <= other.getLeft() + other.getWidth()){
                
                other.die();
                this.die();
            }
        }
    }

    die(){
        this.img.remove();
        cancelAnimationFrame(this.animation);
    }
}