import { Platform } from "./platform.js";
import { canvas } from "./elements.js";


export const platforms = [
    new Platform({ x: 270, y: 400, width: 300, height: 40}),
    new Platform({ x: 0, y: canvas.height - 40, width: canvas.width, height: 40}),
]

