// mise en pause du jeu
const pauseButton = document.querySelector('#pause-button');
const pausePopUp = document.querySelector('#pause-pop-up');
const resumeButton = document.querySelector('#resume-button');
const pausePopUpCloseButton = document.querySelector('#pause-pop-up-close-button');
pauseButton.onclick = () => {
    Manager.pauseGame();
    pausePopUp.style.display = 'flex';
}
resumeButton.onclick = () => {
    pausePopUp.style.display = 'none';
    Manager.resumeGame();
}
pausePopUpCloseButton.onclick = () => {
    pausePopUp.style.display = 'none';
    Manager.resumeGame();
}


// revenir à la home view
const quitButtons = document.querySelectorAll('.quit-button');
quitButtons.forEach(quitButton => {
    quitButton.onclick = () => {
        Manager.stopGame();

        const homeView = document.querySelector('#home-view');
        const playView = document.querySelector('#play-view');
        playView.style.display = 'none';
        homeView.style.display = 'block';
    }
})