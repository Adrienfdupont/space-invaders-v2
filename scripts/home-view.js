'use strict';

Manager.showLevel();
Manager.generateShip();


//afficher la ram
const ramValue = document.querySelectorAll('.ram-value');
setInterval(() => {
    ramValue.forEach(element => {
        element.innerHTML = navigator.deviceMemory;
    })
}, 10000);


// effacer le cache
const clearCacheButton = document.querySelector('#clear-cache-button');
clearCacheButton.onclick = () => {
    localStorage.clear();
    location.reload();    
}


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