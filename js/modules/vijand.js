"use strict"
import { Obstakel } from './obstakels.js';



export class Vijand extends Obstakel {
    #vijandDiv;
    #vorigeRichtingVijand;
   // #nummer;

    constructor(id, type, xCoordinaat, yCoordinaat, obstakelWidth, obstakelHeight, viandDiv,vorigeRichtingVijand) {
        super(id, type, xCoordinaat, yCoordinaat, obstakelWidth, obstakelHeight);
        this.#vijandDiv = viandDiv;
        //this.#nummer = Math.floor(Math.random() * 10000);
    }

 
    beweegVijand(richting, spelbordWidth, spelbordHeight) {
       // console.log(this.#nummer);
        switch (richting) {
            case 'up':
                if (this.getYCoordinaat() > 0) {
                    this.setYCoordinaat(this.getYCoordinaat() - 10);
                    this.setLocatieVijand(richting);
                }
                break

            case 'down':
                if (this.getYCoordinaat() < (spelbordHeight - this.getHeight())) {                 
                    this.setYCoordinaat(this.getYCoordinaat() + 10);
                    this.setLocatieVijand(richting);
                }
                break

            case 'left':
                if (this.getXCoordinaat() > 0) {
                    this.setXCoordinaat(this.getXCoordinaat() - 10);
                    this.setLocatieVijand(richting);
                }
                break

            case 'right':
                if (this.getXCoordinaat() < (spelbordWidth - this.getWidth())) {
                    this.setXCoordinaat(this.getXCoordinaat() + 10);
                    this.setLocatieVijand(richting);
                }

                break
        }
    }
    setLocatieVijand(richting) {
       // console.log(this);
        this.#vijandDiv = document.getElementById(this.getID());
        this.#vijandDiv.classList.remove( this.#vorigeRichtingVijand);        
        this.#vijandDiv.setAttribute("style",
            `left: ${this.getXCoordinaat()}px;
                                    top: ${this.getYCoordinaat()}px;
                                    width:${this.getWidth()}px; 
                                    height:${this.getHeight()}px`);
        this.#vijandDiv.classList.add(richting);
        this.#vorigeRichtingVijand = richting;
    }
};