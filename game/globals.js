import { Player } from "./player.js";

export const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },
    up: {
        pressed: false
    },
    moving: {
        player: false
    }
}

export const gravity = 1;

export const player = new Player({ x: 200, y: 100, width: 100, height: 100, color: 'blue' });

addEventListener('keydown', ({ code }) => {
    switch (code) {
        case 'ArrowLeft':
            keys.left.pressed = true;
            break;
        case 'ArrowUp':
            keys.up.pressed = true;
            break;
        case 'ArrowRight':
            keys.right.pressed = true;
            break;
    }
})

addEventListener('keyup', ({ code }) => {
    switch (code) {
        case 'ArrowLeft':
            keys.left.pressed = false;
            break;
        case 'ArrowUp':
            keys.up.pressed = false;
            break;
        case 'ArrowRight':
            keys.right.pressed = false;
            break;
    }
})