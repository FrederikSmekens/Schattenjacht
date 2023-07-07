"use strict"
let jager;
//let jagersnelheid = 4;
let vorigeRichting;

export class Jager {
    #id;
    #xCoordinaat;
    #yCoordinaat;
    #width;
    #height;
    #jagerSnelheid;

    constructor(id, xCoordinaat, yCoordinaat, width, height) {
        this.#id = id;
        this.#xCoordinaat = xCoordinaat;
        this.#yCoordinaat = yCoordinaat;
        this.#height = height;
        this.#width = width;
        this.#jagerSnelheid = 4;
    }
    
    maakJager(spelbord) {
        let spelbordDiv = spelbord.getSpelbordDiv();
        jager = document.createElement('div');
        jager.setAttribute("id", "jager");
        jager.setAttribute("class", "jager");
        jager.setAttribute("style", `left: ${this.getXCoordinaat()}px;top: ${this.getYCoordinaat()}px; width:${this.getWidth()}px ;height:${this.getHeight()}px`);
        spelbordDiv.appendChild(jager);
        return jager;

    }
    setJagerSnelheid(snelheid){
        this.#jagerSnelheid = snelheid;
    }
    getXCoordinaat() {
        return this.#xCoordinaat;
    }
    setXCoordinaat(xCoordinaat) {
        this.#xCoordinaat = xCoordinaat;
    }
    getYCoordinaat() {
        return this.#yCoordinaat;
    }
    setYCoordinaat(yCoordinaat) {
        this.#yCoordinaat = yCoordinaat;
    }

    setLocatieJager(richting) {
        jager.classList.remove(vorigeRichting);

        jager.setAttribute("style", 
                            `left: ${this.getXCoordinaat()}px;
                            top: ${this.getYCoordinaat()}px;
                            width:${this.getWidth()}px; 
                            height:${this.getHeight()}px`);
        jager.classList.add(richting);
        vorigeRichting = richting;
    }
    getHeight() {
        return this.#height;
    }
    getWidth() {
        return this.#width;
    }
    beweegJager(richting, spelbordWidth, spelbordHeight) {
        switch (richting) {
            case 'up':
                if (this.getYCoordinaat() > 0) {
                    this.setYCoordinaat(this.getYCoordinaat() - this.#jagerSnelheid);                     
                }
                break

            case 'down':
                if (this.getYCoordinaat() < (spelbordHeight - this.getHeight())) {
                    this.setYCoordinaat(this.getYCoordinaat() + this.#jagerSnelheid);                   
                }
                break

            case 'left':
                if (this.getXCoordinaat() > 0) {
                    this.setXCoordinaat(this.getXCoordinaat() - this.#jagerSnelheid);                 
                }
                break

            case 'right':
                if (this.getXCoordinaat() < (spelbordWidth - this.getWidth())) {
                    this.setXCoordinaat(this.getXCoordinaat() + this.#jagerSnelheid);                   
                }

                break
        }
        this.setLocatieJager(richting);  

    }
}