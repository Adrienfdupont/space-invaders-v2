// mise en pause du jeu
const pauseButton = document.querySelector('#pause-button');
const pausePopUp = document.querySelector('#pause-pop-up');
const resumeButton = document.querySelector('#resume-button');
pauseButton.onclick = () => {
    Manager.pauseGame();
    pausePopUp.style.display = 'flex';
}
resumeButton.onclick = () => {
    pausePopUp.style.display = 'none';
    Manager.resumeGame();
}