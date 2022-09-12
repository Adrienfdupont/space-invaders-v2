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
        this.el.style.transform = 'translate(-50%, 50%)';
        this.setY(y);
    }

    // getters et setter relatifs à la position de l'élément
    getX(){
        return parseInt(this.el.style.left.substring(0, this.el.style.left.length - 2));
    }
    getY(){
        return parseInt(this.el.style.bottom.substring(0, this.el.style.bottom.length - 2));
    }
    setX(int){
        this.el.style.left = int + 'px';
    }
    setY(int){
        this.el.style.bottom = int + 'px';
    }

    // getters et setters relatifs aux bords de l'élément
    getLeft(){
        return this.getX() - this.getWidth() / 2;
    }
    getRight(){
        const cssObj = window.getComputedStyle(this.el, null);   
        const right = cssObj.getPropertyValue("right");
        return parseInt(right.substring(0, right.length - 2)) + this.getWidth() / 2;
    }
    getBottom(){
        return this.getY() - this.getHeight() / 2;
    }
    getTop(){
        const cssObj = window.getComputedStyle(this.el, null);   
        const top = cssObj.getPropertyValue("top");
        return parseInt(top.substring(0, top.length - 2)) - this.getHeight() / 2;
    }

    // getters et setters relatifs à la taille de l'élément
    getWidth(){
        return parseInt(this.el.style.width.substring(0, this.el.style.width.length - 2));
    }   
    setWidth(int){
        this.el.style.width = int + 'px';
    }
    getHeight(){
        const cssObj = window.getComputedStyle(this.el, null);
        const height = cssObj.getPropertyValue("height");
        return parseInt(height.substring(0, height.length - 2));
    }
}

class Ship extends Entity{

    constructor(imgPath, speed, reloadTime){

        let width = window.innerWidth / 20;
        let x = window.innerWidth / 2;
        let y = 50;
        super(imgPath, width, x, y);

        this.speed = speed;
        this.loaded = true;
        this.reloadTime = reloadTime;
        
        // contrôles clavier
        window.addEventListener('keydown', (e)=>{
            this.controllShip(e);
        })
    }

    controllShip(e){
        // tir du missile
        if (e.key == ' '){
            this.shootMissile();
        }
        // déplacement vaisseau vers la gauche
        else if (e.key == 'ArrowLeft' && ship.getLeft() >= 0){
            this.setX(this.getX() - window.innerWidth / 100 * this.speed);
        }
        // déplacement vaisseau vers la droite
        else if (e.key == 'ArrowRight' && ship.getRight() >= 0){
            this.setX(this.getX() + window.innerWidth / 100 * this.speed);      }
    }

    shootMissile(){
        if (this.loaded){
            new Missile('./images/missile.png', 5);

            // rechargement du canon
            this.loaded = false;
            this.reload = setTimeout(() => {this.loaded = true}, this.reloadTime);
        }
    }
}

class Missile extends Entity{

    constructor(imgPath, speed){
        
        let width = window.innerWidth / 50;
        let x = ship.getX();
        let y = ship.getY();
        super(imgPath, width, x, y);

        this.el.style.zIndex = '-10';
        this.speed = speed;

        this.animation = setInterval(() => {this.moveMissile()}, 10);
    }

    moveMissile(){
        if (this.getY() < window.innerHeight){
            this.setY(this.getY() + this.speed);
        } else {
            clearInterval(this.animation);
            this.el.remove();
        }
    }
}

class Alien extends Entity{

    constructor(imgPath, x, y){
        
        let width = window.innerWidth / 20;
        super(imgPath, width, x, y);

        this.moveAlienRight();
    }

    moveAlienRight(){
        if (this.getTop() > 0) {
            this.animation = setInterval(()=>{
                if (this.getRight() > 0){
                    this.setX(this.getX() + 1);
                } else {
                    clearInterval(this.animation);
                    this.setY(this.getY() - 30);
                    this.moveAlienLeft();
                }
            }), 10
        } else {
            clearInterval(this.animation);
            this.el.remove();
        }
    }

    moveAlienLeft(){
        if (this.getTop() > 0){
            this.animation = setInterval(()=>{
                if (this.getLeft() > 0){
                    this.setX(this.getX() - 1);
                } else {
                    clearInterval(this.animation);
                    this.setY(this.getY() - 30);
                    this.moveAlienRight();
                }
            }), 10
        } else {
            clearInterval(this.animation);
            this.el.remove();
        }
    }

    // moveAlienDown(nextDirection){
    //     const from = this.getY();
    //     const to = this.getY() + this.el.
    //     while (this.getY < )
    // }
}