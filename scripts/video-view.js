const video = document.querySelector('#video');
const takePhotoButton = document.querySelector('#take-photo-button');
const validateButton = document.querySelector('#validate-button');
const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');


function initVideo() {

    Alien.instances.forEach(instance => {
        instance.hide();
    });
    ship.hide()
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({video: true}).then(stream => {
            video.srcObject = stream;
            video.play();
        })
    }
}

takePhotoButton.onclick = () => {
    context.drawImage(video, 0, 0, 400, 300);
}

validateButton.onclick = () => {
    Manager.updateAlienImage(canvas.toDataURL());
}