class Entity{

    constructor(imgPath, width, x, y){

        // création de l'élément du DOM
        this.el = document.createElement('img');
        this.el.src = imgPath;
        this.setWidth(width);
        document.body.appendChild(this.el);

        // positionnement de l'élément
        this.el.style.position = 'absolute';
        this.setX(x);
        this.el.style.transform = 'translateX(-50%)';
        this.setY(y);
    }

    getX(){
        return parseInt(this.el.style.left.substring(0, this.el.style.left.length - 2));
    }
    getY(){
        return parseInt(this.el.style.bottom.substring(0, this.el.style.bottom.length - 2));
    }
    getWidth(){
        return parseInt(this.el.style.width.substring(0, this.el.style.width.length - 2));
    }
    setX(int){
        this.el.style.left = int + 'px';
    }
    setY(int){
        this.el.style.bottom = int + 'px';
    }
    setWidth(int){
        this.el.style.width = int + 'px';
    }

}

class Ship extends Entity{

    constructor(imgPath){

        let width = window.innerWidth / 20;
        let x = window.innerWidth / 2;
        let y =10

        super(imgPath, width, x, y);
        
        // contrôles clavier
        window.addEventListener('keydown', (e)=>{
            this.controllShip(e);
        })
    }

    controllShip(event){
        // tir du missile
        if (event.key == ' '){
            this.shootMissile();
        }
        // déplacement vaisseau vers la gauche
        else if (event.key == 'ArrowLeft' && this.getX() > 0 + this.getWidth() / 2){
            this.setX(this.getX() - window.innerWidth / 100);
        }
        // déplacement vaisseau vers la droite
        else if (event.key == 'ArrowRight' && this.getX() < window.innerWidth - this.getWidth() / 2){
            this.setX(this.getX() + window.innerWidth / 100);
        }
    }

    shootMissile(){
        const missile = new Missile('./images/missile.png');
    }
}

class Missile extends Entity{

    constructor(imgPath){
        
        let width = window.innerWidth / 50;
        let x = ship.getX();
        let y = ship.getY();

        super(imgPath, width, x, y);

        var missileShot = setInterval(()=>{this.moveMissile()}, 10);
    }

    moveMissile(){
        if (this.getY() < window.innerHeight){
            this.setY(this.getY() + 5);
        } else {
            console.log(window);
            // this.el.remove();
        }
    }
}

const ship = new Ship('./images/ship.png');
