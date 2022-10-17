class Ship extends Entity{

    constructor(imgPath, width, height, speed, reloadTime){

        let left = window.innerWidth / 2 - width / 2;
        let bottom = 10;
        super(imgPath, width, height, left, bottom);

        this.speed = speed;
        this.loaded = true;
        this.reloadTime = reloadTime;
        window.onkeydown = (e) => {
            this.controll(e);
        }
    }

    controll(e){
        // tir du missile
        if (e.key == ' '){
            this.shoot();
        }
        // déplacement vaisseau vers la gauche
        else if (e.key == 'ArrowLeft' && this.getLeft() >= 0){
            this.setLeft(this.getLeft() - this.speed);
        }
        // déplacement vaisseau vers la droite
        else if (e.key == 'ArrowRight' && this.getRight() >= 0){
          this.setLeft(this.getLeft() + this.speed);
        }
    }

    shoot(){
        if (this.loaded){
            new Missile(
                Manager.missileData.img,
                Manager.missileData.width,
                Manager.missileData.height,
                Manager.missileData.speed
            );

            // rechargement du canon
            this.loaded = false;
            setTimeout(() => {
                this.loaded = true}, this.reloadTime);
        }
    }

    pause(){
        window.onkeydown = false;
    }

    resume(){
        window.onkeydown = (e) => {
            this.controll(e);
        }
    }

    die(){
        this.clear();
        Manager.lose();
    }

    clear() {
        this.pause();
        this.img.remove();
    }
}
