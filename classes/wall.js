class Wall extends Entity{

    static instances = [];

    constructor(imgPath, width, height, left, bottom){

        super(imgPath, width, height, left, bottom);

        Wall.instances.push(this);
    }

    die(){
        this.img.remove();
    }
}