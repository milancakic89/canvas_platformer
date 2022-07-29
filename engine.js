import { ctx } from "./game/elements.js";
import { canvas } from "./game/elements.js";

const FPS = 30;


class Subject{
    subject = [];
    updating = false;
    constructor(){}

    subscribe(fn){
        this.subject.push(fn)
        return fn
    }

    unsubscribe(fn){
        this.subject = this.subject.filter(item => item !== fn)
    }

    fire(){
        if(this.subject.length && !this.updating){
            this.updating = true;
            this.subject.forEach(fn => {
                fn();
            });
            this.updating = false;
        }
    }
}

const engine2 = new Subject();

function animate(){
    engine2.fire();
    requestAnimationFrame(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        animate();
    })
}
animate();

class Updater {
    constructor() {
        setTimeout(()=> {
            engine2.subscribe(this.update)
        }, 0)
       
    }

    update = () =>{
       throw new Error('Class that extends Engine must implement "update" method')
    }

    unsubscribe(){
        engine2.unsubscribe(this.update);
    }
}

export const Engine = Updater;