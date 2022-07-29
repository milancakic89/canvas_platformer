import { ctx } from "./elements.js";
import { Engine } from "../engine.js";
import { keys } from "./globals.js";
import { player } from "./globals.js";

export class Platform extends Engine {
    constructor({ x, y, width, height, solid_x, solid_y }) {
        super();
        this.position = {
            x,
            y
        }
        this.width = width;
        this.height = height;
        this.solid_x = solid_x ? true : false;
        if(typeof solid_y == 'undefined'){
            this.solid_y = true;
        }else{
            this.solid_y = solid_y;
        }
       
        this.collisions = {
            top: this.position.y,
            bottom: this.position.y + this.height,
            left: this.position.x,
            right: this.position.x + this.width
        }
        this.draw();
    }

    draw = () => {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    checkMovement = () => {
        if (keys.left.pressed && !keys.moving.player && player.collisions.left <= 250) {
            this.position.x += 10;
        } else if (keys.right.pressed && !keys.moving.player && player.collisions.left >= 700) {
            this.position.x -= 10;
        }


    }

    update = () => {
        this.collisions = {
            top: this.position.y,
            bottom: this.position.y + this.height,
            left: this.position.x,
            right: this.position.x + this.width
        }
        this.draw();
        this.checkMovement();
    }
}
