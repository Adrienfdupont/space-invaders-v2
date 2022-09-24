class Ship extends Entity{

    constructor(imgPath, width, height, speed, reloadTime){

        let left = window.innerWidth / 2 - width / 2;
        let bottom = 10;
        // appel du constructeur parent
        super(imgPath, width, height, left, bottom);

        this.speed = speed;
        this.loaded = true;
        this.reloadTime = reloadTime;

        // contrôles clavier
        window.onkeydown = (e)=>{
            this.controllShip(e);
        }
    }

    controllShip(e){
        // tir du missile
        if (e.key == ' '){
            this.shootMissile();
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

    shootMissile(){
        if (this.loaded){
            new Missile(
                './images/missile.png',
                missileData.width,
                missileData.height,
                missileData.speed
            );

            // rechargement du canon
            this.loaded = false;
            this.reload = setTimeout(() => {this.loaded = true}, this.reloadTime);
        }
    }
}
