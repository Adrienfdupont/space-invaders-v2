class Alien extends Entity{

    static instances = [];

    constructor(imgPath, width, height, left, bottom, speed){

        super(imgPath, width, height, left, bottom);

        this.speed = speed;
        this.animation = requestAnimationFrame(()=>this.moveRight());
        Alien.instances.push(this);
    }

    moveRight(){
        if (this.getBottom() + this.getHeight() > 0){
            if (this.getRight() > 0){
                this.setLeft(this.getLeft() + this.speed);
                requestAnimationFrame(()=>this.moveRight());
            } else {
                cancelAnimationFrame(this.animation);
                this.setBottom(this.getBottom() - this.getHeight() * 1.3);
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

    die(){
        this.img.remove();
    }
}
