const playView = document.querySelector('#play-view');
const homeView = document.querySelector('#home-view');
const videoView = document.querySelector('#video-view');


// choisir l'image des aliens : video view
const chooseEnemyButton = document.querySelector('#choose-enemy-button');
chooseEnemyButton.onclick = () => {
    homeView.style.display = 'none';
    videoView.style.display = 'flex';
    initVideo();
}


// lancement de la partie : play view
const playButton = document.querySelector('#play-button');
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


// revenir à la home view
const quitButtons = document.querySelectorAll('.quit-button');
const endPopUp = document.querySelector('#end-pop-up');

quitButtons.forEach(quitButton => {
    quitButton.onclick = () => {
        Manager.stopGame();
        playView.style.display = 'none';
        homeView.style.display = 'block';
        pausePopUp.style.display = 'none';
        endPopUp.style.display = 'none';
    }
})