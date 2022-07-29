import { ctx, canvas } from './elements.js';
import { Engine } from '../engine.js';
import { platforms } from './level_1.js';
import { gravity, keys } from './globals.js';

export class Player extends Engine {
    jumped = false;
    constructor({ x, y, width, height, color }) {
        super();
        this.position = { x, y };
        this.width = width;
        this.height = height;
        this.color = color;
        this.velocity = {
            x: 0,
            y: 0
        };
        this.collisions = {
            top: y,
            bottom: y + height,
            left: x,
            right: x + width
        }

        this.grounded = false;
    }

    draw = () => {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }


    moveLeft = () => {
        this.velocity.x = -10;
        keys.moving.player = true;
    }

    moveRight = () => {
        this.velocity.x = 10;
        keys.moving.player = true;
    }

    stopMoving = () => {
        this.velocity.x = 0;
        keys.moving.player = false;
    }

    jump = () => {
        if (!this.jumped) {
            this.jumped = true;
            this.velocity.y = -30;
            
        }
    }


    checkGravity = () => {
        if((this.collisions.bottom + this.velocity.y + gravity) <= canvas.height) {
            this.velocity.y += gravity;
            if (this.velocity.y >= 20) {
                this.velocity.y = 20
            }
        }
    }

    checkCollision = () => {
        this.collisions = {
            top: this.position.y,
            bottom: this.position.y + this.height,
            left: this.position.x,
            right: this.position.x + this.width
        }
        platforms.forEach(platform => {
            if(!platform.solid_x && !platform.solid_y){
                return;
            }
            let onTop = this.collisions.bottom - platform.collisions.top;
            if (platform.solid_y && (onTop > -20) &&
                (platform.collisions.left - this.collisions.right <= 1) &&
                (this.collisions.left - platform.collisions.right <= 1) && this.velocity.y > 0) {      
                    this.velocity.y = 0;
                    this.jumped = false;

                if (onTop < 0) {
                    let top = onTop;
                    while (top !== 0) {
                        top++;
                        this.position.y++;
                       
                    }
                }
            }
        })
    }

    checkMovement = () => {
        if (keys.left.pressed && this.position.x > 250) {
            this.moveLeft();
        } else if (keys.right.pressed && this.position.x < 700) {
            this.moveRight();
        } else {
            this.stopMoving()
        }

        if (keys.up.pressed) {
            this.grounded = false;
            this.jump();
        }

    }

    update = () => {
        this.draw();
        this.checkGravity();
        this.checkCollision();
        this.checkMovement();
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
      
       
    }
}