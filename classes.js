// const scale = window.innerWidth / 100;
// consp

// class Entity{

//     constructor(imgPath, width, height , left, bottom){

//         // création de l'élément du DOM
//         this.el = document.createElement('img');
//         this.el.src = imgPath;
//         this.setWidth(width);
//         this.setHeight(height);
//         document.body.appendChild(this.el);

//         // positionnement de l'élément
//         this.el.style.left = left + 'px';
//         this.el.style.bottom = bottom + 'px';
//     }

//     // getters et setters relatifs aux bords de l'élément
//     getLeft(){
//         return parseInt(left.substring(0, left.length - 2))
//     }
//     getBottom(){
//         return parseInt(bottom.substring(0, bottom.length - 2))
//     }
//     getRight(){
//         const right = window.getComputedStyle(this.el, null).right;   
//         return parseInt(right.substring(0, right.length - 2));
//     }
//     getTop(){
//         const top = window.getComputedStyle(this.el, null).top;   
//         return parseInt(top.substring(0, top.length - 2));
//     }

//     // getters et setters relatifs à la taille de l'élément
//     getWidth(){
//         return parseInt(this.el.style.width.substring(0, this.el.style.width.length - 2));
//     }
//     getHeight(){
//         return parseInt(this.el.style.height.substring(0, this.el.style.height.length - 2));
//     }
//     setWidth(int){
//         this.el.style.width = int * scale + 'px'
//     }
//     setHeight(int){
//         this.el.style.height = int * scale + 'px';
//     }
// }

// class Ship extends Entity{

//     constructor(imgPath, speed, reloadTime){

//         let width = window.innerWidth / 20;
//         let height = window.innerHeight / 10;
//         let x = window.innerWidth / 2;
//         let y = 50;
//         super(imgPath, width, height, x, y);

//         this.speed = speed;
//         this.loaded = true;
//         this.reloadTime = reloadTime;
        
//         // contrôles clavier
//         window.onkeydown = (e)=>{
//             this.controllShip(e);
//         }
//     }

//     controllShip(e){
//         // tir du missile
//         if (e.key == ' '){
//             this.shootMissile();
//         }
//         // déplacement vaisseau vers la gauche
//         else if (e.key == 'ArrowLeft' && this.getLeft() >= 0){
//             this.setX(this.getX() - window.innerWidth / 100 * this.speed);
//         }
//         // déplacement vaisseau vers la droite
//         else if (e.key == 'ArrowRight' && this.getRight() >= 0){
//             this.setX(this.getX() + window.innerWidth / 100 * this.speed);      }
//     }

//     shootMissile(){
//         if (this.loaded){
//             new Missile('./images/missile.png', 5);

//             // rechargement du canon
//             this.loaded = false;
//             this.reload = setTimeout(() => {this.loaded = true}, this.reloadTime);
//         }
//     }
// }

// class Missile extends Entity{

//     constructor(imgPath, speed){
        
//         let width = window.innerWidth / 50;
//         let x = ship.getX();
//         let y = ship.getY();
//         super(imgPath, width, x, y);

//         this.el.style.zIndex = '-10';
//         this.speed = speed;

//         this.animation = setInterval(() => {this.moveMissile()}, 10);
//     }

//     moveMissile(){
//         if (this.getY() < window.innerHeight){
//             this.setY(this.getY() + this.speed);
//         } else {
//             clearInterval(this.animation);
//             this.el.remove();
//         }
//     }
// }

// class Alien extends Entity{

//     constructor(imgPath, x, y, speed){
        
//         let width = window.innerWidth / 20;
//         let height = 70;
//         super(imgPath, width, height, x, y);

//         this.speed = speed;

//         this.moveAlienRight();
//     }

//     moveAlienRight(){
//         if (this.getY() > 0) {
//             this.animation = setInterval(()=>{
//                 if (this.getRight() > 0){
//                     this.setX(this.getX() + this.speed);
//                 } else {
//                     clearInterval(this.animation);
//                     this.setY(this.getY() - this.getHeight());
//                     this.moveAlienLeft();
//                 }
//             }), 10
//         } else {
//             clearInterval(this.animation);
//             this.el.remove();
//         }
//     }

//     moveAlienLeft(){
//         if (this.getY() > 0){
//             this.animation = setInterval(()=>{
//                 if (this.getLeft() > 0){
//                     this.setX(this.getX() - this.speed);
//                 } else {
//                     clearInterval(this.animation);
//                     this.setY(this.getY() - this.getHeight());
//                     this.moveAlienRight();
//                 }
//             }), 10
//         } else {
//             clearInterval(this.animation);
//             this.el.remove();
//         }
//     }
// }

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

class Ship {
    constructor() {
        const image = new Image()
        image.src = 'url de ton image' //modifie ça hein !
        image.onload = () => {
            const scale = 0.5
            this.image = image
            this.width = image.width * scale
            this.height = image.height * scale
            this.position = {
                x: canvas.width / 2 - this.width / 2,
                y: canvas.height - this.height - 50
            }
        }
        
        draw() {
            if (this.image)
                c.drawImage(
                    this.image,
                    this.position.x,
                    this.position.y,
                    this.width,
                    this.height
                )
        }
    }
}

const ship = new Ship()
ship.draw()