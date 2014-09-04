var tecla,
    keyBump,
    dalekMovement,
    posDalek = 0,
    shotVis = false,
    tardisVis = true,
    dalekSpeed = 10,
    MAPHORSIZE = 750,
    MAPVERSIZE = 500,
    TAMANHOOBJETO = 63,
    CROSSBORDERTOLERANCE = 15,
    TARDISHEIGHT = 60,
    tardisSpeed = 5;

var posTardis = new Array((MAPHORSIZE - 73), 187),
    posShot = new Array(0 ,0);

$(document).on("dblclick", function() {
    return false;
});

$(document).on("keydown", function(e) {
    tecla = e.which;
    //if (tecla != 123) return false;
});

$(document).on("keyup", function(e) {
    tecla = false;
    //if (tecla != 123) return false;
});

$(document).on("ready", function() {

    $.gameLoop = function() {
        if (tecla == 38) {
            dalekMovement = "up";
        } else if (tecla == 40) {
            dalekMovement = "down";
        } else if ((tecla == 32) && (tecla != keyBump)) {
            $.shoot();
            keyBump = false;
        /*} else if (tecla != 32) {
            keyBump = false;*/
        }
        $.moveDalek(dalekMovement);
        setTimeout($.gameLoop, 40);
    };

    $.resetGame = function() {
        $("#dalek").css("top", 0);
        $("#dalek").css("left", 10);
        $("#tardis").css("top", posTardis[1]);
        $("#tardis").css("left", posTardis[0]);
        $.moveTardis();
    }

    $.moveTardis = function() {
        if (tardisVis === true) {
            var tardisInterval = setInterval(function() {
                $("#tardis").css("left", posTardis[0]);
                $("#tardis").css("top", posTardis[1]);

                if (posTardis[0] > 0) {
                    posTardis[0] = posTardis[0] - tardisSpeed;
                    $("#tardis").css("left", posTardis[0]);
                } else {
                    $("#tiro").hide();
                    tardisVis = false;
                    clearInterval(tardisInterval);
                }
            }, 50);
        }
    }

    $.shoot = function() {
        if (shotVis === false) {
        shotVis = true;
            tiro = $("#tiro");
            posShot[0] = 60;
            posShot[1] = posDalek + 25;
            tiro.css("top", posShot[1]);
            tiro.css("left", posShot[0]);
            tiro.show();
            var shotInterval = setInterval(function() {
                if ($.hit()) {
                    tiro.hide();
                    shotVis = false;
                    $.resetTardis();
                    clearInterval(shotInterval);
                } else if (posShot[0] <= (MAPHORSIZE - 25)) {
                    posShot[0] = posShot[0] + 10;
                    tiro.css("left", posShot[0]);
                } else {
                    tiro.hide();
                    shotVis = false;
                    clearInterval(shotInterval);
                }
            }, 5);
        }
    }

    $.resetTardis = function() {
        tardisVis = false;
        $("#tardis").hide();
        tardisSpeed = tardisSpeed + 1
        posTardis[0] = MAPHORSIZE - 73;
        posTardis[1] = Math.floor(Math.random() * (MAPVERSIZE - TARDISHEIGHT));
        $("#tardis").css("left", posTardis[0]);
        $("#tardis").css("top", posTardis[1]);
        $("#tardis").show();
        tardisVis = true;

    }

    $.hit = function() {
        if (
            (
                (posShot[0] >= (posTardis[0] - 20)) &&
                (posShot[0] < (posTardis[0] + 35))
            ) && (
                (posShot[1] >= posTardis[1]) &&
                (posShot[1] < (posTardis[1] + TARDISHEIGHT))
            )
        ){
            return true;
        }
        return false;
    };

    $.moveDalek = function(direction) {
        if (direction == "up") {
            posDalek = posDalek - dalekSpeed;
        } else if (direction == "down") {
            posDalek = posDalek + dalekSpeed;
        }
        posDalek = $.ajustaLimite(posDalek);
        $("#dalek").css("top", posDalek);
    }

    $.ajustaLimite = function(posicao) {
        if (posicao > (MAPVERSIZE - TAMANHOOBJETO)) {
            posicao = -CROSSBORDERTOLERANCE;
        } else if (posicao <= (-TAMANHOOBJETO + CROSSBORDERTOLERANCE)) {
            posicao = posicao + (MAPVERSIZE - CROSSBORDERTOLERANCE);
        }
        return posicao;
    };

    $(".swipeMove").on("swipeup", function() {
        tecla = 38;
    }).on("swipedown", function() {
        tecla = 40;
    });
    
    $(".shootTap").on("tap", function() {
        $.shoot();
    });


    /*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*/
    $.resetGame()
    $.gameLoop();

});