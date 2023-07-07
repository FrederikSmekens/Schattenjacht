"use strict"

export class Spelbord {
  #id;
  #parent;
  #width;
  #height;
  constructor(id, parent, width, height) {
    this.#id = id;
    this.#parent = parent;
    this.#width = width;
    this.#height = height;
  }

  maakSpelbord() {
   // console.log(document.getElementById(this.#id));
    let spelbordDiv
    if(!document.getElementById(this.#id)){
            spelbordDiv = document.createElement('div');     
    }
    else{
      document.getElementById(this.#id).remove();      
    }

    spelbordDiv = document.createElement('div');
    spelbordDiv.setAttribute("id", this.#id);
    spelbordDiv.setAttribute("class", "spelbord");
    spelbordDiv.setAttribute("style", `width: ${this.#width}px; height: ${this.#height}px`);
    this.#parent.appendChild(spelbordDiv);
  }

  getSpelbordWidth() {
    return this.#width;
  }
  getSpelbordHeight() {
    return this.#height;
  }
  getSpelbordDiv() {
    return document.getElementById(this.#id);
  }
}


