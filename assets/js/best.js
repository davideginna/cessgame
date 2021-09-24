function best(){
    document.getElementById("overlay-content").style.display = "none";
    document.getElementById("closebtn").style.display = "block";
    document.getElementById("bestscore").style.display = "block";
    document.getElementById("besttriangle_score").innerHTML = rec_tr;
    document.getElementById("bestsquare_score").innerHTML = rec_sq;
    document.getElementById("besthexagon_score").innerHTML = rec_he;
}

var canvasbt = document.getElementById("besttriangle");
var ctxbt = canvasbt.getContext("2d");
ombracanvas(ctxbt);
draw_triangle(ctxbt,20,36,150,260,280,36,"white");

var canvasbq = document.getElementById("bestsquare");
var ctxbq = canvasbq.getContext("2d");
ombracanvas(ctxbq);
draw_square(ctxbq,20,20,280,20,280,280,20,280,"white");

var canvasbh = document.getElementById("besthexagon");
var ctxbh = canvasbh.getContext("2d");
ombracanvas(ctxbh);
draw_hexagon(ctxbh,10,150,75,270,225,270,290,150,225,30,75,30,"white");