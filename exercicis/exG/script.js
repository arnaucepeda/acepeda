var image = ["imagen1", "imagen2", "imagen3", "imagen4", "imagen5", "imagen6", "imagen7", "imagen8", "imagen9"];
var score = 0;
var lastImages = [];

// Temporitzador de 60 segons
var timeleft = 60;
var gameover = false; // flag to keep track of game over
var countdown = setInterval(function () {
    timeleft -= 1;
    if (timeleft <= 0) {
        clearInterval(countdown);
        clearInterval(gameplay);
        gameover = true; // set game over flag
        alert("Time is over! Your score is:  " + score + " points");
    }
    document.getElementById("timer").textContent = "TIMER: " + timeleft;

}, 1000);

// Inicialitzem el joc
var gameplay = setInterval(function () {
    document.getElementById("song2").play();

    var random;
    do {
        random = Math.floor(Math.random() * 9);
    } while (lastImages.includes(random));

    lastImages.push(random);
    if (lastImages.length > 3) {
        lastImages.shift();
    }

    var next = document.getElementById(image[random]);
    next.src = "topoSi.png";

    setTimeout(function () {
        next.src = "topoNo.png";
    }, 1000);
}, 1000);

function clicked(images) {
    if (!gameover) { // check game over flag before modifying score
        if (images.src.endsWith("topoSi.png")) {
            var audio = new Audio('boing.mp3');
            audio.currentTime = 0;
            audio.play();
            score += 10;

        } else {
            if (score > 0)
                score -= 5;
        }
        document.getElementById("score").textContent = "SCORE: " + score; // Actualitzem el valor del score en el div amb id "score"
        images.src = "topoPam.png";
        setTimeout(function () {
            images.src = "topoNo.png";
        }, 500);
    }
}
