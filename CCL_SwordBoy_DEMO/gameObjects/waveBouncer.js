import { GameObject } from "./gameObject.js"

class WaveBouncer extends GameObject {

    constructor(x, y, width, height, id) {
        super(x, y, width, height)
        id = this.id
    }

}

export {WaveBouncer}