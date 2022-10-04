// affichage du vaisseau et des aliens
Manager.displayElements();

// lancement de la partie
const playButton = document.querySelector('#play-button');

playButton.onclick = ()=>{
    Manager.initGame();
}

// affichage des paramètres
const settings = document.querySelector('#settings');
const settingsButton = document.querySelector('#settings-button');

settingsButton.onclick = () =>{
    console.log('test');
    settings.style.display = 'flex';
}