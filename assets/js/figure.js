var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var i = 1;
var lati = 4;
var num_colore = (i - 1) % lati;
var d;

function ruota() {
    var newdeg = i * (360 / lati);
    d = newdeg;
    console.log(d);
    document.getElementById('canvas').style.transform = 'rotate(' + newdeg + 'deg)';
    i++;
    /*colore in alto*/
    num_colore = (i - 1) % lati;
    console.log("num_colore " + num_colore);
}


function figurasel() {
    //quadrato
    if (lati == 4) {
        //cancella figure precedenti
        context.clearRect(0, 0, canvas.width, canvas.height);

        //costruzione triangoli
        var t0 = draw_triangle(context, 0, 0, 300, 0, 150, 150, color_sqaure[0].color);//rosso
        var t1 = draw_triangle(context, 0, 0, 0, 300, 150, 150, color_sqaure[1].color);//giallo
        var t2 = draw_triangle(context, 0, 300, 300, 300, 150, 150, color_sqaure[2].color);//verde
        var t3 = draw_triangle(context, 300, 0, 300, 300, 150, 150, color_sqaure[3].color);//blu
    }

    //triangolo
    if (lati == 3) {
        //cancella figure precedenti
        context.clearRect(0, 0, canvas.width, canvas.height);

        //costruzione triangoli
        var t0 = draw_triangle(context, 20, 76, 280, 76, 150, 150, color_sqaure[0].color);//rosso
        var t1 = draw_triangle(context, 20, 76, 150, 300, 150, 150, color_sqaure[1].color);//giallo
        var t2 = draw_triangle(context, 280, 76, 150, 300, 150, 150, color_sqaure[2].color);//verde  
    }

    //esagono
    if (lati == 6) {
        //cancella figure precedenti
        context.clearRect(0, 0, canvas.width, canvas.height);

        //costruzione triangoli
        var t0 = draw_triangle(context, 75, 20, 225, 20, 150, 150, color_sqaure[0].color);//rosso
        var t1 = draw_triangle(context, 0, 150, 75, 20, 150, 150, color_sqaure[1].color);//giallo
        var t2 = draw_triangle(context, 75, 280, 0, 150, 150, 150, color_sqaure[2].color);//verde
        var t4 = draw_triangle(context, 225, 280, 75, 280, 150, 150, color_sqaure[3].color);//blu
        var t5 = draw_triangle(context, 300, 150, 225, 280, 150, 150, color_sqaure[4].color);//verde
        var t3 = draw_triangle(context, 225, 20, 300, 150, 150, 150, color_sqaure[5].color);//viola   
    }
}

//disegna triangolo
function draw_triangle(ctx, x1, y1, x2, y2, x3, y3, color) {
    // triangolo interno
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
}

//disegna quadrato
function draw_square(ctx, x1, y1, x2, y2, x3, y3, x4, y4, color) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.lineTo(x4, y4);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
}

//disegna esagono
function draw_hexagon(ctx, x1, y1, x2, y2, x3, y3, x4, y4, x5, y5, x6, y6, color) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.lineTo(x4, y4);
    ctx.lineTo(x5, y5);
    ctx.lineTo(x6, y6);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
}

function ombracanvas(c) {
    c.shadowOffsetX = 0;
    c.shadowOffsetY = 0;
    c.shadowBlur = 20;
    c.shadowColor = 'rgba(0,0,0, 0.4)';
}


//eventi tasti della tastiera
window.addEventListener('keydown', this.check, false);
function check(e) {
    var code = e.keyCode;
    //space per ruotare quando inizia il gioco
    if (code == 32 && document.getElementById("container").style.display == "block") {
        ruota();
    }

    if (code == 27 && document.getElementById("closebtn").style.display == "block") {
        closebtn();
    }

    if (code == 27 && document.getElementById("container").style.display == "block") {
        i = 1;
        document.getElementById("canvas").style.transform = 'rotate(0deg)';
        num_colore = (i - 1) % lati;
        termina = true;
        error.play();
        openNav();
        backChange();
        clearTimeout(timer);
        ball.motion.dy = 0;
        timer = null;
        start = 1;
        ball.style.display = "none";
        ctx2.fillStyle = "#F0F0F0";
        ctx2.fillRect(0, 0, 200, 200);

        if (lati == 3 && punteggio > rec_tr) {
            rec_tr = punteggio;
        }
        if (lati == 4 && punteggio > rec_sq) {
            rec_sq = punteggio;
        }
        if (lati == 6 && punteggio > rec_he) {
            rec_he = punteggio;
        }

        document.getElementById("punteggioFinale").innerHTML = punteggio;
        document.getElementById("punteggio").innerHTML = 0;
        document.getElementById("totPunti").innerHTML = "Score";
        document.getElementById("totRecord").innerHTML = "Record";
        document.getElementById("record").innerHTML = Math.max(rec_tr, rec_sq, rec_he);


    }
}