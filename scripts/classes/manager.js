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

        ship.initAction();
    }

    
    static pauseGame(){

        LaserShot.instances.forEach(laserShot => {
            laserShot.pause();
        })

        Alien.instances.forEach(alien => {
            alien.pause();
        })

        Missile.instances.forEach(missile => {
            missile.pause();
        })

        ship.pause();
    }


    static resumeGame(){

        LaserShot.instances.forEach(laserShot => {
            laserShot.resume();
        })

        Alien.instances.forEach(alien => {
            alien.resume();
        })

        Missile.instances.forEach(missile => {
            missile.resume();
        })

        ship.resume();
    }

    
    static upgradeScore() {
        const score = document.querySelector('#score-value');
        score.innerHTML = parseInt(score.innerHTML) + 10;
    }


    static checkVictory() {
        if (Alien.instances.length === 0) {
            Manager.pauseGame();
            const endPopUp = document.querySelector('#end-pop-up');
            const message = document.querySelector('#pop-up-message');
            endPopUp.style.display = 'flex';
            message.innerHTML = 'Victory : all aliens were destroyed.';
        }
    }


    static lose() {
        Manager.pauseGame();
        const endPopUp = document.querySelector('#end-pop-up');
        const message = document.querySelector('#pop-up-message');
        endPopUp.style.display = 'flex';
        message.innerHTML = 'Defeat : ship destroyed.';
    }
}