function startgame() {
    // setTimeout(function(){randColor(),playgame(),init();},1000);
    setTimeout(function () { playgame(), init(); }, 1000);
}

function backChange() {
    document.getElementsByClassName("menu").style.backgroundColor = randColor()[0];
}

function openNav() {
    document.getElementById("menu").style.height = "100%";
    document.getElementById("container").style.display = "none";
    document.getElementById("punteggioFinale").classList.remove("puntFinale");
    document.getElementById("record").classList.remove("rec");
    document.getElementById("totPunti").classList.remove("totP");
    document.getElementById("totRecord").classList.remove("totR");
    document.getElementById("boxtip").style.visibility = "visible";
}

function closeNav() {
    document.getElementById("menu").style.height = "0%";
    document.getElementById("container").style.display = "block";
    document.getElementById("punteggioFinale").classList.add("puntFinale");
    document.getElementById("record").classList.add("rec");
    document.getElementById("totPunti").classList.add("totP");
    document.getElementById("totRecord").classList.add("totR");
    setTimeout(function () {
        document.getElementById("boxtip").style.visibility = "hidden";
    }, 3000);
}

function closebtn() {
    document.getElementById("overlay-content").style.display = "block";
    document.getElementById("closebtn").style.display = "none";
    if (document.getElementById("choosefig").style.display = "block") {
        document.getElementById("choosefig").style.display = "none";
    }
    if (document.getElementById("bestscore").style.display = "block") {
        document.getElementById("bestscore").style.display = "none";
    }
    if (document.getElementById("choosecolor").style.display = "block") {
        document.getElementById("choosecolor").style.display = "none";
    }
    if (document.getElementById("info").style.display = "block") {
        document.getElementById("info").style.display = "none";
    }
}