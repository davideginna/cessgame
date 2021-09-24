var color_sqaure = new Array();

var Color = function (col) {
    this.color = col;
}

var point = new Audio("assets/sound/point.wav");
var point10 = new Audio("assets/sound/point10.wav");
var error = new Audio("assets/sound/error.wav");

/*record con le figure */
var rec_tr = 0;
var rec_sq = 0;
var rec_he = 0;

var timer;
var termina = false;
var ball = document.getElementById("ball");

var canvas2 = document.getElementById("punteggio");
var ctx2 = canvas2.getContext('2d');

var start = 0;
var punteggio = 0;
var col_palla;

var c = new Color("#FF0054");//rosso
color_sqaure.push(c);
c = new Color("#FFE400");//giallo
color_sqaure.push(c);
c = new Color("#78FF00");//verde
color_sqaure.push(c);
c = new Color("#00BAFF");//blu
color_sqaure.push(c);
c = new Color("#FF7514");//arancione
color_sqaure.push(c);
c = new Color("#8F00FF");//viola
color_sqaure.push(c);

function init() {
    var r = randColor();
    col_palla = r[0];
    document.getElementById("ball").style.background = r[0];
    // console.log("numero palla " + r[1] + " colore palla "+ r[0]);

}

function randColor() {
    var l = lati - 1;
    var num_palla = Math.round(l * Math.random());
    return [color_sqaure[num_palla].color, num_palla];
}

function playgame() {
    termina = false;
    punteggio = 0;
    var hgame = document.getElementById("gamespace").offsetHeight;
    ctx2.clearRect(0, 0, 100, 100);
    ombracanvas(ctx2);
    ctx2.fillStyle = "grey";
    ctx2.font = "14vh Lato";
    ctx2.fillText(punteggio, 25, 95);
    ball.style.top = '0%';
    ball.motion = {};
    ball.motion.y = 0;
    ball.motion.dy = 5; //velocità discesa iniziale
    ball.style.display = "block";
    start = 0;
    var urto = ((hgame / 100) * 50) + 53;
    var move = function () {

        //fare il confronto tra il colore della palla e il colore del quadrato
        if (ball.motion.y + ball.motion.dy > urto) {
            if (((col_palla.localeCompare(color_sqaure[num_colore].color)) == 0) && !termina && punteggio < 99) {
                //colore giusto
                punteggio += 1;
                if ((punteggio % 10) == 0) {
                    point10.play();
                }
                else {
                    point.play();
                }

                //aggiornare il contenuto del canvas con il punteggio e centratura testo
                ctx2.clearRect(0, 0, 100, 100);
                ombracanvas(ctx2);
                ctx2.fillStyle = "grey";
                ctx2.font = "14vh Lato";
                if (punteggio > 9) {
                    ctx2.fillText(punteggio, 0, 95);
                }
                else {
                    ctx2.fillText(punteggio, 25, 95);
                }
                ball.motion.y = 0;
                if (ball.motion.dy < 100) {
                    ball.motion.dy += 0.5;
                }
                init();//inizializza ball per la prosima discesa

            } else {
                //reset figura
                i = 1;
                document.getElementById("canvas").style.transform = 'rotate(0deg)';
                num_colore = (i - 1) % lati;
                error.play();
                openNav();
                backChange();
                //aggiornamento punteggi record per le singole figure
                if (lati == 3 && punteggio > rec_tr) {
                    rec_tr = punteggio;
                }
                if (lati == 4 && punteggio > rec_sq) {
                    rec_sq = punteggio;
                }
                if (lati == 6 && punteggio > rec_he) {
                    rec_he = punteggio;
                }

                clearTimeout(timer);
                ball.motion.dy = 0;
                timer = null;
                start = 1;
                ball.style.display = "none";

                //schermata di fine gioco con i punti fatti, record e se si vuole ricominciare
                document.getElementById("punteggioFinale").innerHTML = punteggio;
                document.getElementById("punteggio").innerHTML = 0;
                document.getElementById("totPunti").innerHTML = "Score";
                document.getElementById("totRecord").innerHTML = "Record";
                document.getElementById("record").innerHTML = Math.max(rec_tr, rec_sq, rec_he);
                ctx2.fillStyle = "#F0F0F0";
                ctx2.fillRect(0, 0, 200, 200);
                termina = false;
            }
        }
        if (start == 0) {
            ball.motion.y += ball.motion.dy;
            ball.style.top = ball.motion.y + 'px';
            timer = setTimeout(move, 30);
        }
    };
    move();
}