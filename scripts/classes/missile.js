class Missile extends Entity{
  
    constructor(imgPath, width, height, speed){

        let left = ship.getLeft() + ship.getWidth() / 2 - Manager.missileData.width / 2;
        let bottom = ship.getBottom() + ship.getHeight() / 2;
        super(imgPath, width, height, left, bottom);

        this.img.style.zIndex = '-10';
        this.speed = speed;
        this.animation = requestAnimationFrame(()=>this.move());
    }
  
    move(){
        if (this.getBottom() < window.innerHeight){
            this.setBottom(this.getBottom() + this.speed);
            this.checkCollision();
            requestAnimationFrame(()=>this.move());
        } else {
            cancelAnimationFrame(this.animation);
            this.img.remove();
        }
    }

    checkCollision(){
        Alien.instances.forEach(alien => {

            if (this.getBottom() + this.getHeight() >= alien.getBottom()
            && this.getBottom() < alien.getBottom()){

                if (this.getLeft() >= alien.getLeft() &&
                this.getLeft() <= alien.getLeft() + alien.getWidth()
                || this.getLeft() + this.getWidth() >= alien.getLeft() &&
                this.getLeft() + this.getWidth() <= alien.getLeft() + alien.getWidth()){

                    this.die();
                    alien.die();
                }
            }
        });
    }

    die(){
        cancelAnimationFrame(this.animation);
        this.img.remove();
    }
}
