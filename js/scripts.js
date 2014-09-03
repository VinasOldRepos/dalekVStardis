var tecla,
    keyBump,
    dalekMovement,
    shotInterval,
    posDalek = 0,
    posShot = 0,
    shotVis = false,
    dalekSpeed = 10,
    TAMANHOMAPA = 500,
    TAMANHOOBJETO = 63,
    CROSSBORDERTOLERANCE = 15;

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
    }

    $.shoot = function() {
        if (shotVis === false) {
        shotVis = true;
            tiro = $("#tiro");
            tiro.css("top", (posDalek + 25));
            posShot = 60;
            tiro.css("left", posShot);
            tiro.show();
            var shotInterval = setInterval(function() {
                if (posShot <= (TAMANHOMAPA - 25)) {
                    posShot = posShot + 10;
                    tiro.css("left", posShot);
                } else {
                    tiro.hide();
                    shotVis = false;
                    clearInterval(shotInterval);
                }
            }, 8);
        }
    }

    $.moveShot = function(tiro, shotInterval) {
    }

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
        if (posicao > (TAMANHOMAPA - TAMANHOOBJETO)) {
            posicao = -CROSSBORDERTOLERANCE;
        } else if (posicao <= (-TAMANHOOBJETO + CROSSBORDERTOLERANCE)) {
            posicao = posicao + (TAMANHOMAPA - CROSSBORDERTOLERANCE);
        }
        return posicao;
    };

    /*$("#l_fundo, #ladrao").on("swipeleft", function() {
        tecla = 37;
    }).on("swiperight", function() {
        tecla = 39;
    }).on("swipeup", function() {
        tecla = 38;
    }).on("swipedown", function() {
        tecla = 40;
    });*/


    /*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*/
    $.resetGame()
    $.gameLoop();

});