'use strict';


Manager.showLevel();
Manager.generateShip();


// affichage des paramètres de jeu
const settings = document.querySelector('#settings');
const settingsOpenButton = document.querySelector('#settings-open-button');
const settingsCloseButton = document.querySelector('#settings-close-button');
settingsOpenButton.onclick = () => {
    showSettings();
};
settingsCloseButton.onclick = () => {
    hideSettings();
};


// ajout d'aliens
const alienRowAddButton = document.querySelector('#alien-row-add-button');
const rowNumber = document.querySelector('#alien-row-number');
Manager.alienRows = [];
alienRowAddButton.onclick = () => {
    Manager.addAlienRow();
};


// lancement de la partie : changement de vue
const playButton = document.querySelector('#play-button');
const playView = document.querySelector('#play-view');
const homeView = document.querySelector('#home-view');
const alienPopUp = document.querySelector('#alien-pop-up');
playButton.onclick = () => {
    // vérifier que le joueur a bien ajouté des aliens
    if (Manager.alienRows.length === 0){
        alienPopUp.style.display = 'flex';
    } else {
        hideSettings();
        playView.style.display = 'block';
        homeView.style.display = 'none';
        Manager.initGame();
    }
};


// contrôle pop-up
const alienPopUpCloseButton = document.querySelector('#alien-pop-up-close-button');
alienPopUpCloseButton.onclick = () => {
    alienPopUp.style.display = 'none';
}


// -------------------- fonctions utiles ------------------

function showSettings() {
    settings.style.animation = 'show-settings 0.3s linear 0s 1 normal forwards';
    // on affiche les options des lignes d'aliens
    Manager.alienRows.forEach(row => {
        row.options.style.display = 'flex';
    })
}


function hideSettings() {
    settings.style.animation = 'hide-settings 0.3s linear 0s 1 normal forwards';
    // on cache les options des lignes d'aliens
    Manager.alienRows.forEach(row => {
        row.options.style.display = 'none';
    })
}