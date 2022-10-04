class Alien extends Entity{

    static instances = [];

    static rows = [];

    constructor(imgPath, width, height, left, bottom, speed, reloadTime){

        super(imgPath, width, height, left, bottom);

        this.speed = speed;
        this.reloadTime = reloadTime;
        Alien.instances.push(this);
    }

    initAction(){
        this.animation = requestAnimationFrame(()=>this.moveRight());
        this.shot = setInterval(()=>{this.shoot()},
            Math.floor(Math.random() * (this.reloadTime + this.reloadTime / 2 - this.reloadTime / 2) + this.reloadTime / 2));
    }

    moveRight(){
        if (this.getBottom() + this.getHeight() > 0){
            if (this.getRight() > 0){
                this.setLeft(this.getLeft() + this.speed);
                requestAnimationFrame(()=>this.moveRight());
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
            Manager.laserShotData.img,
            Manager.laserShotData.width,
            Manager.laserShotData.height,
            Manager.laserShotData.speed,
            this
        );
    }

    die(){
        this.img.remove();
        Alien.instances.splice(Alien.instances.indexOf(this), 1);
        cancelAnimationFrame(this.animation);
        clearInterval(this.shot);
    }

    static deleteRows(){

        Alien.rows.forEach(row => {
            let rowLastAlien = row[row.length - 1];
            let deleteButton = document.createElement('img');
            document.body.appendChild(deleteButton);
            deleteButton.src = '../images/trash.png';
            deleteButton.style.position = 'absolute';
            deleteButton.style.left = rowLastAlien.getLeft() + rowLastAlien.getWidth() + 10 + 'px';
            deleteButton.style.bottom = rowLastAlien.getBottom() + 'px';
            deleteButton.style.height = rowLastAlien.getHeight() + 'px';
            
        })
    }
}
