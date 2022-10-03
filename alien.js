class Alien extends Entity{

    static instances = [];

    constructor(imgPath, width, height, left, bottom, speed, reloadTime){

        super(imgPath, width, height, left, bottom);

        this.speed = speed;
        this.reloadTime = reloadTime;
        this.animation = requestAnimationFrame(()=>this.moveRight());
        Alien.instances.push(this);
        this.shot = setInterval(()=>{this.shoot()},
            Math.floor(Math.random() * (this.reloadTime + this.reloadTime / 2 - this.reloadTime / 2) + this.reloadTime / 2));
    }

    moveRight(){
        if (this.getBottom() + this.getHeight() > 0){
            if (this.getRight() > 0){
                this.setLeft(this.getLeft() + this.speed);
                this.animation = requestAnimationFrame(()=>this.moveRight());
            } else {
                cancelAnimationFrame(this.animation);
                this.setBottom(this.getBottom() - this.getHeight() * 2);
                this.animation = requestAnimationFrame(()=>this.moveLeft());
            }
        } else {
            this.die();
        }
    }

    moveLeft(){
        if (this.getBottom() + this.getHeight() > 0){
            if (this.getLeft() > 0){
                this.setLeft(this.getLeft() - this.speed);
                this.animation = requestAnimationFrame(()=>this.moveLeft());
            } else {
                cancelAnimationFrame(this.animation);
                this.setBottom(this.getBottom() - this.getHeight() * 2);
                this.animation = requestAnimationFrame(()=>this.moveRight());
            }
        } else {
            this.die();
        }
    }

    shoot(){
        new LaserShot(
            laserShotData.img,
            laserShotData.width,
            laserShotData.height,
            laserShotData.speed,
            this
        );
    }

    die(){
        this.img.remove();
        Alien.instances.splice(Alien.instances.indexOf(this), 1);
        cancelAnimationFrame(this.animation);
        clearInterval(this.shot);
    }
}
