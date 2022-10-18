class Entity{

    constructor(imgPath, width, height, left, bottom){

    // création de l'élément du DOM
    this.img = document.createElement('img');
    this.img.src = imgPath;
    this.img.style.width = width + 'px';
    this.img.style.height = height + 'px';
    document.body.appendChild(this.img);
    
    // positionnement de l'élément
    this.img.style.position = 'absolute';
    this.setLeft(left);
    this.setBottom(bottom);
  }

  hide() {
    this.img.style.display = 'none';
  }

  display () {
    this.img.style.display = 'block';
  }

  setLeft(int){
    this.img.style.left = int + 'px';
  }

  setBottom(int){
    this.img.style.bottom = int + 'px';
  }

  getWidth(){
    let width = window.getComputedStyle(this.img, null).width;
    return parseInt(width.substring(0, width.length - 2));
  }

  getHeight(){
    let height = window.getComputedStyle(this.img, null).height;
    return parseInt(height.substring(0, height.length - 2));
  }

  getLeft(){
    let left = window.getComputedStyle(this.img, null).left;
    return parseInt(left.substring(0, left.length - 2));
  }

  getBottom(){
    let bottom = window.getComputedStyle(this.img, null).bottom;
    return parseInt(bottom.substring(0, bottom.length - 2));
  }

  getTop(){
    let top = window.getComputedStyle(this.img, null).top;
    return parseInt(top.substring(0, top.length - 2));
  }

  getRight(){
    let right = window.getComputedStyle(this.img, null).right;
    return parseInt(right.substring(0, right.length - 2));
  }
}