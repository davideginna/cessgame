var canvascolor = document.getElementById("choosecolor");
var ctxcolor = canvascolor.getContext("2d");
var pennello = -1;
var mouse_down = false;
var mousePos;

function options(){
    document.getElementById("overlay-content").style.display = "none";
    document.getElementById("closebtn").style.display = "block";
    document.getElementById("choosefig").style.display = "block";
    disegnafigure();
}
var canvast = document.getElementById("seltriangle");
var ctxt = canvast.getContext("2d");
var canvasq = document.getElementById("selsquare");
var ctxq = canvasq.getContext("2d");
var canvash = document.getElementById("selhexagon");
var ctxh = canvash.getContext("2d");


canvast.addEventListener('mousemove',function(evt){
    mousePos = getMousePos(canvast,evt);
    ctxt.clearRect(0, 0, canvast.width, canvast.height);
    draw_triangle(ctxt,10,36,100,190,190,36,"white");

    if(ctxt.isPointInPath(mousePos.x, mousePos.y)){
        document.getElementById("seltriangle").style.transform = "scale(1.1,1.1)";
        document.getElementById("seltriangle").style.cursor = "pointer";
    }else{
        document.getElementById("seltriangle").style.cursor = "default";
        document.getElementById("seltriangle").style.transform = "scale(1.0,1.0)";
    }
});

canvasq.addEventListener('mousemove',function(evt){
    mousePos = getMousePos(canvasq,evt);
    ctxq.clearRect(0, 0, canvasq.width, canvasq.height);
    draw_square(ctxq,20,20,180,20,180,180,20,180,"white");

    if(ctxq.isPointInPath(mousePos.x, mousePos.y)){
        document.getElementById("selsquare").style.transform = "scale(1.1,1.1)";
        document.getElementById("selsquare").style.cursor = "pointer";
    }else{
        document.getElementById("selsquare").style.cursor = "default";
        document.getElementById("selsquare").style.transform = "scale(1.0,1.0)";
    }
});

canvash.addEventListener('mousemove',function(evt){
    mousePos = getMousePos(canvash,evt);
    ctxh.clearRect(0, 0, canvash.width, canvash.height);
    draw_hexagon(ctxh,5,100,50,185,150,185,195,100,150,15,50,15,"white");

    if(ctxh.isPointInPath(mousePos.x, mousePos.y)){
        document.getElementById("selhexagon").style.transform = "scale(1.1,1.1)";
        document.getElementById("selhexagon").style.cursor = "pointer";
    }else{
        document.getElementById("selhexagon").style.cursor = "default";
        document.getElementById("selhexagon").style.transform = "scale(1.0,1.0)";
    }
});


function disegnafigure(){
    ctxt.clearRect(0, 0, canvast.width, canvast.height);
    ombracanvas(ctxt);
    draw_triangle(ctxt,10,36,100,190,190,36,"white");

    ctxq.clearRect(0, 0, canvasq.width, canvasq.height);
    ombracanvas(ctxq);
    draw_square(ctxq,20,20,180,20,180,180,20,180,"white");
    
    ctxh.clearRect(0, 0, canvash.width, canvash.height);
    ombracanvas(ctxh);
    draw_hexagon(ctxh,5,100,50,185,150,185,195,100,150,15,50,15,"white");
}

function selfig(arg){
    if(arg.id == "selsquare"){
        lati = 4;
    }
    if(arg.id == "seltriangle"){
        lati = 3;
    }
    if(arg.id == "selhexagon"){
        lati = 6;
    }

    document.getElementById("choosefig").style.display = "none";
    document.getElementById("choosecolor").style.display = "block";
    paint();
    infocolor();
}

//tavolozza di colori
var palette = new Array();
    c = new Color("#FF0054");//rosso
    palette.push(c);
    c = new Color("#FFE400");//giallo
    palette.push(c);
    c = new Color("#78FF00");//verde
    palette.push(c);
    c = new Color("#00BAFF");//celeste
    palette.push(c);
    c = new Color("#FF7514");//arancione
    palette.push(c);
    c = new Color("#8F00FF");//viola
    palette.push(c);
    c = new Color("#FFC0CB");//rosa
    palette.push(c);
    c = new Color("#0000FF");//blu
    palette.push(c);
    c = new Color("#808080");//grigio
    palette.push(c);
    c = new Color("#000000");//nero
    palette.push(c);

//disegno fgure in base a quella selezionata
function figtocolor(){
    ctxcolor.clearRect(0, 0, canvascolor.width, canvascolor.height);
    // ombracanvas(ctxcolor);
    if(lati == 4){
        //aumento x di 600 e y di 50
        draw_triangle(ctxcolor,600,50,900,50,750,200,color_sqaure[0].color);//rosso
        draw_triangle(ctxcolor,600,50,600,350,750,200,color_sqaure[1].color);//giallo
        draw_triangle(ctxcolor,600,350,900,350,750,200,color_sqaure[2].color);//verde
        draw_triangle(ctxcolor,900,50,900,350,750,200,color_sqaure[3].color);//celeste
    }

    if(lati == 3){
        draw_triangle(ctxcolor,620,126,880,126,750,200,color_sqaure[0].color);//rosso
        draw_triangle(ctxcolor,620,126,750,350,750,200,color_sqaure[1].color);//giallo
        draw_triangle(ctxcolor,880,126,750,350,750,200,color_sqaure[2].color);//verde  
    }

    if(lati == 6){
        draw_triangle(ctxcolor,675,70,825,70,750,200,color_sqaure[0].color);//rosso
        draw_triangle(ctxcolor,600,200,675,70,750,200,color_sqaure[1].color);//giallo
        draw_triangle(ctxcolor,675,330,600,200,750,200,color_sqaure[2].color);//verde
        draw_triangle(ctxcolor,825,330,675,330,750,200,color_sqaure[3].color);//celeste
        draw_triangle(ctxcolor,900,200,825,330,750,200,color_sqaure[4].color);//verde
        draw_triangle(ctxcolor,825,70,900,200,750,200,color_sqaure[5].color);//viola
    }
}



function choosecolor(){
    /*sezione di selezione di colori con drag & drop*/
    
    //disegno dei vari colori
    var x = 20;
    var y = 20;
    var j = 0;
    var l = 60;

    //rosso
    palette_color(ctxcolor,x,y,j,l);
    y = y + 75;
    j++;

    //giallo
    palette_color(ctxcolor,x,y,j,l);
    y = y + 75;
    j++;

    //verde
    palette_color(ctxcolor,x,y,j,l);
    y = y + 75;
    j++;

    //celeste
    palette_color(ctxcolor,x,y,j,l);
    y = y + 75;
    j++;

    //arancione
    palette_color(ctxcolor,x,y,j,l);
    y = 20;
    x = x + 75;
    j++;

    //viola
    palette_color(ctxcolor,x,y,j,l);
    y = y + 75;
    j++;

    //rosa
    palette_color(ctxcolor,x,y,j,l);
    y = y + 75;
    j++;

    //blu
    palette_color(ctxcolor,x,y,j,l);
    y = y + 75;
    j++;

    //grigio
    palette_color(ctxcolor,x,y,j,l);
    y = y + 75;
    j++;

    //nero
    palette_color(ctxcolor,x,y,j,l);
    y = y + 75;
    j++;
}

//mousedown sui colori
canvascolor.addEventListener('mousedown',
    function(evt){
        mouse_down = true;
        mousePos = getMousePos(canvascolor,evt);
        // posizione del mouse rispetto al quadrato bianco
        // console.log(mousePos);
        
        //rosso
        if(hitColor(mousePos.x, mousePos.y, 20, 80, 20, 80)){
            pennello = 0;
        }

        //giallo
        if(hitColor(mousePos.x, mousePos.y, 20, 80, 95, 155)){
            pennello = 1;
        }

        //verde
        if(hitColor(mousePos.x, mousePos.y, 20, 80, 170, 230)){
            pennello = 2;
        }

        //blu
        if(hitColor(mousePos.x, mousePos.y, 20, 80, 245, 305)){
            pennello = 3;
        }

        //arancione
        if(hitColor(mousePos.x, mousePos.y, 20, 80, 320, 380)){
            pennello = 4;
        }

        //viola
        if(hitColor(mousePos.x, mousePos.y, 95, 155, 20, 80)){
            pennello = 5;
        }

        //marrone
        if(hitColor(mousePos.x, mousePos.y, 95, 155, 95, 155)){
            pennello = 6;
        }

        //rosa
        if(hitColor(mousePos.x, mousePos.y, 95, 155, 170, 230)){
            pennello = 7;
        }

        //grigio
        if(hitColor(mousePos.x, mousePos.y, 95, 155, 245, 305)){
            pennello = 8;
        }

        //nero
        if(hitColor(mousePos.x, mousePos.y, 95, 155, 320, 380)){
            pennello = 9;
        }
    }
);

canvascolor.addEventListener('mouseup',
    function(evt){
        mouse_down = false;
        mousePos = getMousePos(canvascolor,evt);
        if(lati == 4 && pennello != -1){
            draw_triangle(ctxcolor,600,50,900,50,750,200,color_sqaure[0].color);//rosso
            if(ctxcolor.isPointInPath(mousePos.x, mousePos.y)){
                color_sqaure[0].color = palette[pennello].color;
            }
            draw_triangle(ctxcolor,600,50,600,350,750,200,color_sqaure[1].color);//giallo
            if(ctxcolor.isPointInPath(mousePos.x, mousePos.y)){
                color_sqaure[1].color = palette[pennello].color;
            }
            draw_triangle(ctxcolor,600,350,900,350,750,200,color_sqaure[2].color);//verde
            if(ctxcolor.isPointInPath(mousePos.x, mousePos.y)){
                color_sqaure[2].color = palette[pennello].color;
            }
            draw_triangle(ctxcolor,900,50,900,350,750,200,color_sqaure[3].color);//celeste
            if(ctxcolor.isPointInPath(mousePos.x, mousePos.y)){
                color_sqaure[3].color = palette[pennello].color;
            }
        }

        if(lati == 3 && pennello != -1){
            draw_triangle(ctxcolor,620,126,880,126,750,200,color_sqaure[0].color);//rosso
            if(ctxcolor.isPointInPath(mousePos.x, mousePos.y)){
                color_sqaure[0].color = palette[pennello].color;
            }
            draw_triangle(ctxcolor,620,126,750,350,750,200,color_sqaure[1].color);//giallo
            if(ctxcolor.isPointInPath(mousePos.x, mousePos.y)){
                color_sqaure[1].color = palette[pennello].color;
            }
            draw_triangle(ctxcolor,880,126,750,350,750,200,color_sqaure[2].color);//verde
            if(ctxcolor.isPointInPath(mousePos.x, mousePos.y)){
                color_sqaure[2].color = palette[pennello].color;
            }
        }

        if(lati == 6 && pennello != -1){
        draw_triangle(ctxcolor,675,70,825,70,750,200,color_sqaure[0].color);//rosso
        if(ctxcolor.isPointInPath(mousePos.x, mousePos.y)){
                color_sqaure[0].color = palette[pennello].color;
            }
        draw_triangle(ctxcolor,600,200,675,70,750,200,color_sqaure[1].color);//giallo
        if(ctxcolor.isPointInPath(mousePos.x, mousePos.y)){
                color_sqaure[1].color = palette[pennello].color;
            }
        draw_triangle(ctxcolor,675,330,600,200,750,200,color_sqaure[2].color);//verde
        if(ctxcolor.isPointInPath(mousePos.x, mousePos.y)){
                color_sqaure[2].color = palette[pennello].color;
            }
        draw_triangle(ctxcolor,825,330,675,330,750,200,color_sqaure[3].color);//celeste
        if(ctxcolor.isPointInPath(mousePos.x, mousePos.y)){
                color_sqaure[3].color = palette[pennello].color;
            }
        draw_triangle(ctxcolor,900,200,825,330,750,200,color_sqaure[4].color);//verde
        if(ctxcolor.isPointInPath(mousePos.x, mousePos.y)){
                color_sqaure[4].color = palette[pennello].color;
            }
        draw_triangle(ctxcolor,825,70,900,200,750,200,color_sqaure[5].color);//viola
        if(ctxcolor.isPointInPath(mousePos.x, mousePos.y)){
                color_sqaure[5].color = palette[pennello].color;
            }
        }
        
        //controllo dove ho rilasciato in base alle figure e cambio valore nell'array
        document.getElementById("choosecolor").style.cursor = "default";
        paint();
        infocolor();
        pennello = -1;
        //console.log("pennello up "+ pennello);
    }
);

//mouse move con il colore
canvascolor.addEventListener('mousemove',
    function(evt){
        //se ho selezionato il colore
        mousePos = getMousePos(canvascolor,evt);
        if(hitColor(mousePos.x, mousePos.y, 20, 80, 20, 80) || 
            hitColor(mousePos.x, mousePos.y, 20, 80, 95, 155) ||
            hitColor(mousePos.x, mousePos.y, 20, 80, 170, 230) ||
            hitColor(mousePos.x, mousePos.y, 20, 80, 245, 305) ||
            hitColor(mousePos.x, mousePos.y, 20, 80, 320, 380) ||
            hitColor(mousePos.x, mousePos.y, 95, 155, 20, 80) ||
            hitColor(mousePos.x, mousePos.y, 95, 155, 95, 155) ||
            hitColor(mousePos.x, mousePos.y, 95, 155, 170, 230) ||
            hitColor(mousePos.x, mousePos.y, 95, 155, 245, 305) ||
            hitColor(mousePos.x, mousePos.y, 95, 155, 320, 380)){
            document.getElementById("choosecolor").style.cursor = "pointer";
        }else{
            document.getElementById("choosecolor").style.cursor = "default";
        }

        if(mouse_down && pennello != -1){
            //disegno un quadratino con il colore uguale a quello del pennello
            ctxcolor.clearRect(0,0,canvascolor.width,canvascolor.height);
            document.getElementById("choosecolor").style.cursor = "pointer";
            paint();
            //disegno il pennello
            drag_color(ctxcolor,mousePos.x,mousePos.y,pennello,20);
            // console.log("prova pennello " + pennello+ " " + mousePos.x + " "+mousePos.y);
        }
    }
);

function paint(){
    figtocolor();
    choosecolor();
}

function infocolor(){
    ctxcolor.fillStyle = "grey";
    ctxcolor.font = "30px sans-serif";
    ctxcolor.fillText("Drag & Drop",310,150);
    ctxcolor.fillText("the color on the shape",250,190);
}
function hitColor(mx, my, x1, x2, y1, y2){
    if((x1 <= mx && mx <= x2) && ( y1 <= my && my <= y2)){
        return true;
    }
    else return false;
}

//il quadratino del colore
function palette_color(ctxcolor,x,y,j,l){
    ctxcolor.beginPath();
    ctxcolor.moveTo(x,y);
    ctxcolor.lineTo(x+l,y);
    ctxcolor.lineTo(x+l,y+l);
    ctxcolor.lineTo(x,y+l);
    ctxcolor.closePath();
    ctxcolor.fillStyle = palette[j].color;
    ctxcolor.fill();
}

function drag_color(ctxcolor,x,y,j,r){
    ctxcolor.beginPath();
    ctxcolor.arc(x,y,r,0,2*Math.PI);
    ctxcolor.fillStyle = palette[j].color;
    ctxcolor.fill();
}

function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }