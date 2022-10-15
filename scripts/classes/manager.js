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
    };


    static levels = {
        1 : 0,
        2 : 300,
        3 : 800,
        4 : 2000,
        5 : 5000
    };


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
        const scoreValue = document.querySelector('#score-value');
        scoreValue.innerHTML = parseInt(scoreValue.innerHTML) + 10;
    }


    static checkVictory() {
        if (Alien.instances.length === 0) {
            Manager.pauseGame();
            const endPopUp = document.querySelector('#end-pop-up');
            const message = document.querySelector('#pop-up-message');
            endPopUp.style.display = 'flex';
            message.innerHTML = 'Victory : all aliens were destroyed.';

            Manager.addPlayerPoints();
        }
    }


    static lose() {

        Manager.pauseGame();
        const endPopUp = document.querySelector('#end-pop-up');
        const message = document.querySelector('#pop-up-message');
        endPopUp.style.display = 'flex';
        message.innerHTML = 'Defeat : ship destroyed.';
    }


    static showLevel() {

        // vérifier qu'un niveau est stocké dans le cache
        if (!localStorage['playerLevel']) {
            localStorage['playerLevel'] = 1;
            localStorage['playerPoints'] = 0;
        }
        // afficher le niveau
        const levelValue = document.querySelector('.level-value');
        levelValue.innerHTML = localStorage['playerLevel'];

        // afficher la progression
        const progress = document.querySelector('.progress');
        const nextLevelPoints = Manager.levels[parseInt(localStorage['playerLevel']) + 1];
        const currentLevelPoints = Manager.levels[parseInt(localStorage['playerLevel'])];
        const progressValue = 100 * (parseInt(localStorage['playerPoints']) - currentLevelPoints) / nextLevelPoints;
        progress.style.width = progressValue + '%';
    }


    static addPlayerPoints() {

        const scoreValue = document.querySelector('#score-value');
        localStorage['playerPoints'] += scoreValue.innerHTML;

        Manager.updateLevel();
    }


    static updateLevel() {

        for (const i in Manager.levels) {
            if (localStorage['playerPoints'] >= Manager.levels[i]) {
                localStorage['playerLevel'] = i;
            }
        }
        Manager.showLevel();
    }
}