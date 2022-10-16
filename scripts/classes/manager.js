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


    static addAlienRow() {
        
        // trouver le point Y de la nouvelle ligne d'aliens
        let lower = window.innerHeight - 50;
        Manager.alienRows.forEach(row => {
            if (row.instances[0].getBottom() < lower){
                lower = row.instances[0].getBottom()
            }
        })
        const y = lower - 2 * Manager.alienData.height;
    
        // on construit la ligne
        let alienRow = {};
        alienRow.instances = [];
        for (let x = 0; x < rowNumber.value; x++) {
            alienRow.instances.push(
                Manager.generateAlien(10 + x * Manager.alienData.width * 2, y)
            );
        }
        Manager.alienRows.push(alienRow);
        Manager.buildRowOptions(alienRow);
    }
    
    
    static buildRowOptions(alienRow) {
    
        const rowLastAlien = Manager.getLastAlienRow(alienRow);
    
        // construire la div contenant les boutons
        alienRow.options = document.createElement('div');
        document.body.appendChild(alienRow.options);
        alienRow.options.style.position = 'absolute';
        alienRow.options.style.left = rowLastAlien.getLeft() + rowLastAlien.getWidth() * 2 + 'px';
        alienRow.options.style.top = rowLastAlien.getTop() + 'px';
    
        // construire le bouton de suppression
        const removeButton = document.createElement('i');
        alienRow.options.appendChild(removeButton);
        removeButton.classList.add('fa-solid', 'fa-trash');
        removeButton.style.marginRight = '10px';
        removeButton.onclick = () => {
            Manager.deleteRow(alienRow);
        }
    
        // construire le bouton d'ajout d'alien
        const addButton = document.createElement('i');
        alienRow.options.appendChild(addButton);
        addButton.classList.add('fa-solid', 'fa-plus');
        addButton.style.marginRight = '10px';
        addButton.onclick = () => {
            Manager.addAlien(alienRow);
        };
    
        // construire le bouton de suppression d'un alien
        const deleteButton = document.createElement('i');
        alienRow.options.appendChild(deleteButton);
        deleteButton.classList.add('fa-solid', 'fa-minus');
        deleteButton.onclick = () => {
            Manager.deleteAlien(alienRow);
        };
    }
    
    
    static deleteRow(alienRow) {
    
        alienRow.instances.forEach(alien => {
            alien.img.remove();
        });
        alienRow.options.remove();
        Manager.alienRows.splice(Manager.alienRows.indexOf(alienRow), 1);
    }
    
    
    static addAlien(alienRow) {
    
        const rowLastAlien = Manager.getLastAlienRow(alienRow);
    
        const alien = new Alien(
            Manager.alienData.img,
                Manager.alienData.width,
                Manager.alienData.height,
                rowLastAlien.getLeft() + Manager.alienData.width * 2,
                rowLastAlien.getBottom(),
                Manager.alienData.speed,
                Manager.alienData.reloadTime
        )
    
        alienRow.instances.push(
            alien
        );
    
        // on met à jour la position des options de la ligne d'aliens
        alienRow.options.style.left = alien.getLeft() + alien.getWidth() * 2 + 'px';
    }
    
    
    static deleteAlien(alienRow){
    
        const alienToDelete = Manager.getLastAlienRow(alienRow);
        alienToDelete.img.remove();
        alienRow.instances.splice(alienRow.instances.indexOf(alienToDelete), 1);
    
        // on met à jour la position des options de la ligne d'aliens
        const lastAlien = Manager.getLastAlienRow(alienRow);
        alienRow.options.style.left = lastAlien.getLeft() + lastAlien.getWidth() * 2 + 'px';
    }


    static getLastAlienRow(alienRow) {
        return alienRow.instances[alienRow.instances.length - 1];
    }


    static generateShip(){

        window.ship = new Ship(
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

        const scoreValue = document.querySelector('#score-value');
        scoreValue.innerHTML = '0';

        Alien.instances.forEach(alien =>{
            alien.initAction();
        });

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


    static stopGame() {

        Alien.instances.forEach(alien => {
            alien.clear();
        })

        Manager.alienRows.forEach(alienRow => {
            alienRow.options.remove();
            alienRow.instances.forEach(instance => {
                instance.img.remove();
            })
        })
        Manager.alienRows = [];

        LaserShot.instances.forEach(instance => {
            instance.die();
        })

        Missile.instances.forEach(instance => {
            instance.die();
        })

        ship.clear();

        Manager.generateShip();
        ship.initAction();
    }

    
    static upgradeScore() {
        const scoreValue = document.querySelector('#score-value');
        scoreValue.innerHTML = parseInt(scoreValue.innerHTML) + 10;
    }


    static checkVictory() {
        if (Alien.instances.length === 0) {
            Manager.stopGame();
            const endPopUp = document.querySelector('#end-pop-up');
            const message = document.querySelector('#pop-up-message');
            endPopUp.style.display = 'flex';
            message.innerHTML = 'Victory : all aliens were destroyed.';

            // Manager.addPlayerPoints();
        }
    }


    // static lose() {

    //     Manager.pauseGame();
    //     const endPopUp = document.querySelector('#end-pop-up');
    //     const message = document.querySelector('#pop-up-message');
    //     endPopUp.style.display = 'flex';
    //     message.innerHTML = 'Defeat : ship destroyed.';
    // }


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