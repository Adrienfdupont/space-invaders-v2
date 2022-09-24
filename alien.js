class Alien extends Entity{

    constructor(imgPath, width, height, left, bottom, speed){

        super(imgPath, width, height, left, bottom);

        this.speed = speed;

        this.moveAlienRight();
    }

    moveAlienRight(){
        if (this.getBottom() + this.getHeight() > 0) {
            this.animation = setInterval(()=>{
                if (this.getRight() > 0){
                    this.setLeft(this.getLeft() + this.speed);
                } else {
                    clearInterval(this.animation);
                    this.setBottom(this.getBottom() - this.getHeight() * 1.3);
                    this.moveAlienLeft();
                }
            }), 10
        } else {
            clearInterval(this.animation);
            this.img.remove();
        }
    }

    moveAlienLeft(){
        if (this.getBottom() + this.getHeight() > 0){
            this.animation = setInterval(()=>{
                if (this.getLeft() > 0){
                    this.setLeft(this.getLeft() - this.speed);
                } else {
                    clearInterval(this.animation);
                    this.setBottom(this.getBottom() - this.getHeight() * 1.3);
                    this.moveAlienRight();
                }
            }), 10
        } else {
            clearInterval(this.animation);
            this.img.remove();
        }
    }
}
