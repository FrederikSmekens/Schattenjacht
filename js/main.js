"use strict";
import { Spelbord } from './modules/spelbord.js';
import { Jager } from './modules/jager.js';
import { Obstakel } from './modules/obstakels.js';
import { Vijand } from './modules/vijand.js';
let gameTimer;
let timerBeweegVijand;
let spelbord;
let jager;
//let vijand;
let schattenjacht;
let aantalSchatten;
document.getElementById("btnNewGame").addEventListener("click", newGame);
class Spel {
    #naam;
    #score;
    #levens;
    #obstakels = [];
    #vijanden = [];
    #timer;
    #spelbord;
    #jager;
    // #vijand;


    constructor(naam, score, levens, timer, spelbord, jager, vijanden, obstakels) {
        this.#naam = naam;
        this.#score = score;
        this.#levens = levens;
        this.#timer = timer;
        this.#spelbord = spelbord;
        this.#jager = jager;
        //this.#vijand = vijand;
    }
    getJager() {
        return this.#jager;
    }
    // getVijand() {
    //     return this.#vijand;
    // }
    getVijanden() {
        return this.#vijanden;
    }

    getSpelbord() {
        return this.#spelbord;
    }
    maakObstakels(aantal, type, breedte, hoogte) {
        let i = 0;

        while (i < aantal) {
            //console.log(this.#obstakels.length);
            let xCoordinaat = Math.floor(Math.random() * (this.#spelbord.getSpelbordWidth() - this.#jager.getWidth()));
            let yCoordinaat = Math.floor(Math.random() * (this.#spelbord.getSpelbordHeight() - this.#jager.getHeight()));

            let oObstakel = new Obstakel(type + i, type, xCoordinaat, yCoordinaat, breedte, hoogte, false)
            let obstakelsOverlappenJager = this.checkOfObstakelsOverlappen(oObstakel, this.#jager);
            //let obstakelsOverlappenVijand = this.checkOfObstakelsOverlappen(oObstakel, this.#vijand);
            let obstakelsOverlappen;

            for (const obstakel of this.#obstakels) {
                obstakelsOverlappen = this.checkOfObstakelsOverlappen(obstakel, oObstakel);
                //   console.log(obstakelsOverlappen);  
                if (obstakelsOverlappen) break;
            }

            if (!obstakelsOverlappenJager && !obstakelsOverlappen) {
                this.#obstakels.push(oObstakel);
                i++;
            }

        };
    }
    maakVijanden(aantal, breedte, hoogte) {
        // console.log(aantal);
        let i = 0;

        while (i < aantal) {
            //console.log(this.#obstakels.length);
            let xCoordinaat = Math.floor(Math.random() * (this.#spelbord.getSpelbordWidth() - 30));
            let yCoordinaat = Math.floor(Math.random() * (this.#spelbord.getSpelbordHeight() - 30));


            let oVijand = new Vijand("vijand" + i, "vijand", xCoordinaat, yCoordinaat, breedte, hoogte, document.getElementById("vijand" + i))
            let obstakelsOverlappenJager = this.checkOfObstakelsOverlappen(oVijand, this.#jager);
            // let obstakelsOverlappenVijand = this.checkOfObstakelsOverlappen(oVijand, this.#vijand);
            let obstakelsOverlappen;

            for (const obstakel of this.#obstakels) {
                obstakelsOverlappen = this.checkOfObstakelsOverlappen(obstakel, oVijand);
                //   console.log(obstakelsOverlappen);  
                if (obstakelsOverlappen) break;
            }

            if (!obstakelsOverlappenJager && !obstakelsOverlappen) {
                this.#obstakels.push(oVijand);
                this.#vijanden.push(oVijand)
                i++;
            }

        };
    }
    addObstakel(obstakel) {
        this.#obstakels.push(obstakel);
    }
    checkOfObstakelsOverlappen(oObstakel, oObstakel2) {
        if (oObstakel != undefined && oObstakel2 != undefined) {
            if (
                oObstakel.getXCoordinaat() < oObstakel2.getXCoordinaat() + oObstakel2.getWidth() &&
                oObstakel.getXCoordinaat() + oObstakel.getWidth() > oObstakel2.getXCoordinaat() &&
                oObstakel.getYCoordinaat() < oObstakel2.getYCoordinaat() + oObstakel2.getHeight() &&
                oObstakel.getHeight() + oObstakel.getYCoordinaat() > oObstakel2.getYCoordinaat()
            ) {
                return true;
            }
        } else return false;

    }
    checkCollision(jager, oObstakels) {
        //console.log(oObstakels)
        for (const obstakel of oObstakels) {
            if (this.checkOfObstakelsOverlappen(jager, obstakel)) {
                return obstakel;
            }
        }
    }
    checkCollisionVijand(vijand, oObstakels) {
        if (vijand != undefined && oObstakels != undefined) {

            for (let i = 1; i < oObstakels.length; i++) {
                if (this.checkOfObstakelsOverlappen(vijand, oObstakels[i])) {
                    return oObstakels[i];
                }
            }
        }

    }
    plaatsObstakels(oObstakels) {
        let spelbordDiv = this.#spelbord.getSpelbordDiv();
        for (const obstakel of oObstakels) {
            let obstakelDiv = document.createElement('div');
            obstakelDiv.setAttribute("id", obstakel.getID());
            obstakelDiv.setAttribute("class", obstakel.getType());

            obstakelDiv.setAttribute("style", `width: ${obstakel.getWidth()}px; height: ${obstakel.getHeight()}px;left:${obstakel.getXCoordinaat()}px;top:${obstakel.getYCoordinaat()}px`)
            spelbordDiv.appendChild(obstakelDiv);
        }
    }
    getObstakels() {
        //console.log(this.#obstakels);
        return this.#obstakels;
    }
    checkBlokade(blokade) {
        if (blokade != undefined) {
            let blokadeType;
            blokadeType = blokade.getType();
            //console.log(blokadeType);
            blokadeType == "schat" ? this.schatGevonden(blokade) : "";
            blokadeType == "val" ? this.valGevonden(blokade) : "";
            blokadeType == "vijand" ? this.vijandAanGeraakt(blokade) : "";
            blokadeType == "leven" ? this.addLeven(blokade) : "";
            blokadeType == "snelheidsboost" ? this.snelheidsBoost(blokade) : "";

            this.updateScorebord();
            return blokadeType;

        }
    }
    addLeven(blokade) {        
        document.getElementById(blokade.getID()).remove();
        this.#obstakels = this.#obstakels.filter(function (el) { return el.getID() != blokade.getID(); });

        this.#levens += 1;
    }
    snelheidsBoost(blokade) {
        console.log(blokade.getID());
        document.getElementById(blokade.getID()).remove();
        this.#obstakels = this.#obstakels.filter(function (el) { return el.getID() != blokade.getID(); });
        jager.setJagerSnelheid(8);
        document.getElementById("jager").classList.add("powerup");
        setTimeout(() => {
            jager.setJagerSnelheid(4);
            document.getElementById("jager").classList.remove("powerup");
        }, "10000");
        this.#levens += 1;
    }
    maakScoreBord() {
        let scorebordDiv = document.createElement('div');
        scorebordDiv.setAttribute("id", "scorebord");
        scorebordDiv.setAttribute("class", "scorebord");

        let scoreDiv = document.createElement('div');
        scoreDiv.setAttribute("id", "score");
        scoreDiv.setAttribute("class", "score");

        let levensDiv = document.createElement('div');
        levensDiv.setAttribute("id", "levens");
        levensDiv.setAttribute("class", "levens");

        let timerDiv = document.createElement('div');
        timerDiv.setAttribute("id", "timer");
        timerDiv.setAttribute("class", "timer");

        scorebordDiv.appendChild(scoreDiv);
        scorebordDiv.appendChild(levensDiv);
        scorebordDiv.appendChild(timerDiv);
        document.body.appendChild(scorebordDiv);

        this.updateScorebord();
    }
    schatGevonden(blokade) {
        if (blokade.getObstakelGevonden() == false) {
            document.getElementById(blokade.getID()).classList.add("open");
            blokade.setObstakelGevonden(true);
            this.addScore(1);

            if (this.#score == aantalSchatten) {
                this.gameWin();
            }
        }
    }
    valGevonden(blokade) {
        if (blokade.getObstakelGevonden() == false) {
            document.getElementById(blokade.getID()).classList.add("open");

            blokade.setObstakelGevonden(true);
            this.#levens -= 1;
            if (this.#levens == 0) {
                clearInterval(gameTimer);
                clearInterval(timerBeweegVijand);
                this.gameOver();
            }
        }
    }
    vijandAanGeraakt(blokade) {
        if (this.#levens == 0) {
            clearInterval(gameTimer);
            clearInterval(timerBeweegVijand);
            this.#obstakels = "";
            this.gameOver();
        }
        else {
            //console.log(blokade);
            if (!blokade.getObstakelGevonden()) {
                blokade.setObstakelGevonden(true);
                this.#levens -= 1;
            }
        }
        // vijand kan na 2 seconden terug damage doen
        setTimeout(() => {
            blokade.setObstakelGevonden(false);
        }, "2000");
    }
    addScore(score) {
        this.#score += score;
    }

    updateScorebord() {
        document.getElementById("score").innerHTML = this.#score;
        document.getElementById("levens").innerHTML = this.#levens;
    }
    gameWin() {
        let spelbordDiv = this.getSpelbord().getSpelbordDiv();
        let gameWin = document.createElement('div');
        gameWin.setAttribute("id", "gameWin");
        gameWin.setAttribute("class", "gameWin");
        gameWin.innerHTML = "Nice! <br />";
        gameWin.innerHTML += "<span>Final score: " + this.#score + "</span> <br>";
        gameWin.innerHTML += "<button id='Restart'>Nieuw Spel</button>"

        spelbordDiv.appendChild(gameWin);
        document.getElementById("Restart").addEventListener("click", newGame);
        clearInterval(gameTimer);
        clearInterval(timerBeweegVijand);
    }
    gameOver() {
        let spelbordDiv = this.getSpelbord().getSpelbordDiv();
        let gameOver = document.createElement('div');
        gameOver.setAttribute("id", "gameOver");
        gameOver.setAttribute("class", "gameOver");
        gameOver.innerHTML = "Game Over! <br />";
        gameOver.innerHTML += "<span>Final score: " + this.#score + "</span> <br>";
        gameOver.innerHTML += "<button id='Restart'>Nieuw Spel</button>"

        spelbordDiv.appendChild(gameOver);
        document.getElementById("Restart").addEventListener("click", newGame);

    }
    getTimer() {
        return this.#timer;
    }
    startTimer() {
        let i = 1;
        let j = 1;
        
        //console.log(schattenjacht.getVijanden());
        gameTimer = setInterval(function () {
            i++;
            //console.log(i);
            document.getElementById("timer").innerHTML = i;

            let spelbordWidth = schattenjacht.getSpelbord().getSpelbordWidth();
            let spelbordHeight = schattenjacht.getSpelbord().getSpelbordHeight();
            clearInterval(timerBeweegVijand);
            timerBeweegVijand = setInterval(function () {

                let richtingen = ['up', 'down', 'left', 'right'];
                let richting;
                let blokade;
                // console.log(schattenjacht.getObstakels());
                for (const vijand of schattenjacht.getVijanden()) {

                    richting = richtingen[Math.floor(Math.random() * richtingen.length)];
                    //console.log(obstakel);

                    blokade = schattenjacht.checkCollisionVijand(vijand, schattenjacht.getObstakels());

                    //console.log(blokade);
                    if (blokade != undefined) {
                        vijand.beweegVijand(richting, spelbordWidth, spelbordHeight);
                    }
                    else {
                        switch (richting) {
                            case 'up':
                                vijand.beweegVijand("down", spelbordWidth, spelbordHeight);
                                break

                            case 'down':
                                vijand.beweegVijand("up", spelbordWidth, spelbordHeight);
                                break

                            case 'left':
                                vijand.beweegVijand("right", spelbordWidth, spelbordHeight);
                                break
                            case 'right':
                                vijand.beweegVijand("left", spelbordWidth, spelbordHeight);
                                break
                        }
                    }
                }

                //console.log("x");

            }, 100);
            //console.log("y");
            //setTimeout( clearTimeout(timerBeweegVijand),2000);

        }, 1000);

    }

}

function newGame() {
    document.getElementById("settings-gear").checked = false;
    clearInterval(gameTimer);
    // release our intervalID from the variable
    gameTimer = null;
    clearInterval(timerBeweegVijand);
    timerBeweegVijand = null;

    //document.getElementById("spelbord") ? document.getElementById("spelbord").remove() : "";
    document.getElementById("scorebord") ? document.getElementById("scorebord").remove() : "";
    let aantalMuren = document.getElementById("aantalMuren").value;
    aantalSchatten = document.getElementById("aantalSchatten").value;
    let aantalVallen = document.getElementById("aantalVallen").value;
    let aantalVijanden = document.getElementById("aantalVijanden").value;

    //spelbordgrootte: breedte random tussen 1000 & 700 & hoogte random tussen 800 & 400
    spelbord = new Spelbord('spelbord', document.body, Math.floor(Math.random() * (1000 - 700) + 700), Math.floor(Math.random() * (800 - 400) + 400));
    spelbord.maakSpelbord();

    jager = new Jager("jager", Math.floor(Math.random() * (spelbord.getSpelbordWidth() - 30)), Math.floor(Math.random() * (spelbord.getSpelbordHeight() - 30)), 23, 23); //Jager(id,xCoordinaat,yCoordinaat,breedte,hoogte);
    jager.maakJager(spelbord);

    //vijand = new Vijand("vijand", "vijand", Math.floor(Math.random() * (spelbord.getSpelbordWidth() - 30)), Math.floor(Math.random() * (spelbord.getSpelbordHeight() - 30)), 23, 23, document.getElementById("vijand"));


    schattenjacht = new Spel("Schattenjacht", 0, 3, 0, spelbord, jager);

    schattenjacht.maakScoreBord();
    // schattenjacht.addObstakel(vijand);

    schattenjacht.maakObstakels(aantalMuren, "muur", 30, 30);
    schattenjacht.maakObstakels(aantalSchatten, "schat", 30, 30);
    schattenjacht.maakObstakels(aantalVallen, "val", 20, 20);
    schattenjacht.maakObstakels(3, "leven", 20, 20);
    schattenjacht.maakObstakels(3,"snelheidsboost", 20,20);
    schattenjacht.maakVijanden(aantalVijanden, 30, 30);
   

    schattenjacht.plaatsObstakels(schattenjacht.getObstakels());

    schattenjacht.startTimer();

    //beweeg jager
    document.onkeydown = function (event) {
        let blokade;
        let blokadeType;
        
        switch (event.code) {
            case "ArrowUp":
                jager.beweegJager("up", spelbord.getSpelbordWidth(), spelbord.getSpelbordHeight());
                blokade = schattenjacht.checkCollision(jager, schattenjacht.getObstakels());
                blokadeType = schattenjacht.checkBlokade(blokade);
                blokadeType == "muur" ? jager.beweegJager("down", spelbord.getSpelbordWidth(), spelbord.getSpelbordHeight()) : "";
                break;
            case "ArrowDown":
                jager.beweegJager("down", spelbord.getSpelbordWidth(), spelbord.getSpelbordHeight());
                blokade = schattenjacht.checkCollision(jager, schattenjacht.getObstakels());
                blokadeType = schattenjacht.checkBlokade(blokade);
                blokadeType == "muur" ? jager.beweegJager("up", spelbord.getSpelbordWidth(), spelbord.getSpelbordHeight()) : "";
                break;
            case "ArrowLeft":
                jager.beweegJager("left", spelbord.getSpelbordWidth(), spelbord.getSpelbordHeight());
                blokade = schattenjacht.checkCollision(jager, schattenjacht.getObstakels());
                blokadeType = schattenjacht.checkBlokade(blokade);
                blokadeType == "muur" ? jager.beweegJager("right", spelbord.getSpelbordWidth(), spelbord.getSpelbordHeight()) : "";
                break;
            case "ArrowRight":
                jager.beweegJager("right", spelbord.getSpelbordWidth(), spelbord.getSpelbordHeight());
                blokade = schattenjacht.checkCollision(jager, schattenjacht.getObstakels());
                blokadeType = schattenjacht.checkBlokade(blokade);
                blokadeType == "muur" ? jager.beweegJager("left", spelbord.getSpelbordWidth(), spelbord.getSpelbordHeight()) : "";
                break;
            default:
        }
    };
}