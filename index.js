// affichage du vaisseau et des aliens
Manager.displayElements();

// lancement de la partie
const playButton = document.querySelector('#play-button');
playButton.onclick = ()=>{
    Manager.initGame();
}