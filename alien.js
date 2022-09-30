class Alien extends Entity{

    static instances = [];

    constructor(imgPath, width, height, left, bottom, speed, reloadTime){

        super(imgPath, width, height, left, bottom);

        this.alive = true;
        this.speed = speed;
        this.reloadTime = reloadTime;
        this.animation = requestAnimationFrame(()=>this.moveRight());
        Alien.instances.push(this);
        setTimeout(() => {
            this.shoot()}, Math.random() * (20000 - 2000) + 2000);
    }

    moveRight(){
        if (this.getBottom() + this.getHeight() > 0){
            if (this.getRight() > 0){
                this.setLeft(this.getLeft() + this.speed);
                requestAnimationFrame(()=>this.moveRight());
            } else {
                cancelAnimationFrame(this.animation);
                this.setBottom(this.getBottom() - this.getHeight() * 1.8);
                this.animation = requestAnimationFrame(()=>this.moveLeft());
            }
        }
    }

    moveLeft(){
        if (this.getBottom() + this.getHeight() > 0){
            if (this.getLeft() > 0){
                this.setLeft(this.getLeft() - this.speed);
                requestAnimationFrame(()=>this.moveLeft());
            } else {
                cancelAnimationFrame(this.animation);
                this.setBottom(this.getBottom() - this.getHeight() * 1.8);
                this.animation = requestAnimationFrame(()=>this.moveRight());
            }
        }
    }

    shoot(){
        if (this.alive){
            new LaserShot(
                laserShotData.img,
                laserShotData.width,
                laserShotData.height,
                laserShotData.speed,
                this
            );
    
            // rechargement du canon
            setTimeout(() => {
                this.shoot()}, this.reloadTime);
        }
        }

    die(){
        this.img.remove();
        this.alive = false;
    }
}
