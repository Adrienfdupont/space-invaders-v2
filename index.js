// lancement de la partie
const playButton = document.querySelector('#play-button');

playButton.onclick = ()=>{
    Manager.initGame();
}


// affichage des paramètres
const settings = document.querySelector('#settings');
const settingsOpenButton = document.querySelector('#settings-open-button');
const settingsCloseButton = document.querySelector('#settings-close-button');

settingsOpenButton.onclick = () =>{
    settings.style.animation = 'show-settings 0.5s linear 0s 1 normal forwards';
    Alien.deleteRows();
}

settingsCloseButton.onclick = () =>{
    settings.style.animation = 'hide-settings 0.5s linear 0s 1 normal forwards';
}


// ajout d'aliens
const alienRowAddButton = document.querySelector('#alien-row-add-button');
const rowNumber = document.querySelector('#row-number');

alienRowAddButton.onclick = () =>{
    Manager.addAlienRow(rowNumber.value);
}