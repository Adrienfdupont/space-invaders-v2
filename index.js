'use strict';

// lancement de la partie
const playButton = document.querySelector('#play-button');
playButton.onclick = ()=>{
    Manager.initGame();
};


// affichage des paramètres de jeu
const settings = document.querySelector('#settings');
const settingsOpenButton = document.querySelector('#settings-open-button');
const settingsCloseButton = document.querySelector('#settings-close-button');
settingsOpenButton.onclick = () => {
    settings.style.animation = 'show-settings 0.3s linear 0s 1 normal forwards';
};
settingsCloseButton.onclick = () => {
    settings.style.animation = 'hide-settings 0.3s linear 0s 1 normal forwards';
};


// ajout d'aliens
const alienRowAddButton = document.querySelector('#alien-row-add-button');
const rowNumber = document.querySelector('#row-number');
const alienRows = [];
alienRowAddButton.onclick = () => {
    addAlienRow();
};

function addAlienRow() {

    // trouver le point Y de la nouvelle ligne d'aliens
    let lower = window.innerHeight - 50;
    alienRows.forEach(row => {
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
            new Alien(
                Manager.alienData.img,
                Manager.alienData.width,
                Manager.alienData.height,
                10 + x * Manager.alienData.width * 2,
                y,
                Manager.alienData.speed,
                Manager.alienData.reloadTime
            )
        );
    }
    alienRows.push(alienRow);

    buildRowParameters(alienRow);
}


function buildRowParameters(alienRow) {

    const rowLastAlien = getLastAlien(alienRow);

    // construire la div contenant les boutons
    alienRow.parameters = document.createElement('div');
    document.body.appendChild(alienRow.parameters);
    alienRow.parameters.style.position = 'absolute';
    alienRow.parameters.style.left = rowLastAlien.getLeft() + rowLastAlien.getWidth() * 2 + 'px';
    alienRow.parameters.style.top = rowLastAlien.getTop() + 'px';

    // construire le bouton de suppression
    const removeButton = document.createElement('i');
    alienRow.parameters.appendChild(removeButton);
    removeButton.classList.add('fa-solid', 'fa-trash');
    removeButton.style.marginRight = '10px';
    removeButton.onclick = () => {
        deleteRow(alienRow);
    }

    // construire le bouton d'ajout d'alien
    const addButton = document.createElement('i');
    alienRow.parameters.appendChild(addButton);
    addButton.classList.add('fa-solid', 'fa-plus');
    addButton.style.marginRight = '10px';
    addButton.onclick = () => {
        addAlien(alienRow);
    };

    // construire le bouton de suppression d'un alien
    const deleteButton = document.createElement('i');
    alienRow.parameters.appendChild(deleteButton);
    deleteButton.classList.add('fa-solid', 'fa-minus');
    deleteButton.style.marginRight = '10px';
    deleteButton.onclick = () => {
        deleteAlien(alienRow);
    };
}


function deleteRow(alienRow) {

    alienRow.instances.forEach(alien => {
        alien.img.remove();
    });
    alienRow.parameters.remove();
    alienRows.splice(alienRows.indexOf(alienRow));
}


function addAlien(alienRow) {

    const rowLastAlien = getLastAlien(alienRow);

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

    // on met à jour la position des paramètres de la ligne
    alienRow.parameters.style.left = alien.getLeft() + alien.getWidth() * 2 + 'px';
}


function deleteAlien(alienRow){

    const alienToDelete = getLastAlien(alienRow);
    alienToDelete.img.remove();
    alienRow.instances.splice(alienRow.instances.indexOf(alienToDelete));

    // on met à jour la position des paramètres de la ligne
    const lastAlien = getLastAlien(alienRow);
    alienRow.parameters.style.left = lastAlien.getLeft() + lastAlien.getWidth() * 2 + 'px';
}


function getLastAlien(alienRow) {
    return alienRow.instances[alienRow.instances.length - 1];
}