class Manager{
    
    static kw = window.innerWidth / 100;
    static kh = window.innerHeight / 100;

    static shipData = {
        img : '../images/ship.png',
        width : 3 * Manager.kw,
        height : 3 * Manager.kw,
        speed : 1 * Manager.kw,
        reloadTime : 2000
    };

    static missileData = {
        img : '../images/missile.png',
        width : 0.5 * Manager.kw,
        height : 2 * Manager.kw,
        speed : 0.25 * Manager.kh,
    };

    static alienData = {
        nbRows : 3,
        nbCols : 7,
        img : '../images/alien.png',
        width : 2 * Manager.kw,
        height : 1.5 * Manager.kw,
        speed : 2,
        reloadTime : 15000
    };

    static laserShotData = {
        img : '../images/laser-shot.png',
        width : 0.2 * Manager.kw,
        height : 0.8 * Manager.kw,
        speed : 2
    };

    static wallData = {
        img : '../images/wall.png',
        width : 0.5 * Manager.kw,
        height : 0.5 * Manager.kw,
    }


    static generateShip(){
        return new Ship(
            Manager.shipData.img,
            Manager.shipData.width,
            Manager.shipData.height,
            Manager.shipData.speed,
            Manager.shipData.reloadTime
        );
    }

    
    static generateAlien(x, y){
        
        return new Alien(
            Manager.alienData.img,
            Manager.alienData.width,
            Manager.alienData.height,
            x,
            y,
            Manager.alienData.speed,
            Manager.alienData.reloadTime
        )
    }


    static initGame(){

        // animations des aliens
        Alien.instances.forEach(alien =>{
            alien.animation = requestAnimationFrame(()=>alien.moveRight());
            alien.shot = setInterval(()=>{alien.shoot()},
                Math.floor(Math.random() * (alien.reloadTime + alien.reloadTime / 2 - alien.reloadTime / 2) + alien.reloadTime / 2));
        })

        // contrôles du vaisseau
        window.onkeydown = (e)=>{
            ship.controll(e);
        }
    }

    
    static pauseGame(){
        Alien.instances.forEach(alien =>{
            cancelAnimationFrame(alien.animation);
        })

        LaserShot.instances.forEach(laserShot => {
            cancelAnimationFrame(laserShot.animation)
        })

    }
}