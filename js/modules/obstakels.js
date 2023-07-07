"use strict"
export class Obstakel {
    #id;
    #type;
    #xCoordinaat;
    #yCoordinaat;
    #obstakelWidth;
    #obstakelHeight;
    #obstakelGevonden;

    constructor(id, type, xCoordinaat, yCoordinaat, obstakelWidth, obstakelHeight, obstakelGevonden) {
        this.#id = id;
        this.#type = type;
        this.#xCoordinaat = xCoordinaat;
        this.#yCoordinaat = yCoordinaat;
        this.#obstakelWidth = obstakelWidth;
        this.#obstakelHeight = obstakelHeight;
        this.#obstakelGevonden = obstakelGevonden;
    }
    getType() {
        return this.#type;
    }
    getID() {
        return this.#id;
    }
    getXCoordinaat() {
        return this.#xCoordinaat;
    }
    getYCoordinaat() {
        return this.#yCoordinaat;
    }
    getWidth() {
        return this.#obstakelWidth;
    }
    getHeight() {
        return this.#obstakelHeight;
    }
    getObstakelGevonden() {
        return this.#obstakelGevonden;
    }
    setObstakelGevonden(gevonden) {
        this.#obstakelGevonden = gevonden;
    }
    setXCoordinaat(xCoordinaat) {
        this.#xCoordinaat = xCoordinaat;
    }
    setYCoordinaat(yCoordinaat) {
        this.#yCoordinaat = yCoordinaat;
    }

    
}