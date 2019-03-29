//code for if we want to give them certain colors that we decide on
$(".color-wrapper").on("click", function () {
    $(".color-wrapper").removeClass("active");
    $(this).addClass("active");
    $("#basic-log").text($(this).find(".value").text());
    $("#color-info-svg-wrapper").removeAttr('class');
    $("#color-info-svg-wrapper").attr('class', $(this).find(".value").text().replace("#", "clr-"));
});

$(".zoom-in").on("click", function () {
    zoomit();
});

$(document).keypress(function (e) {
    if (e.which == 43) {
        zoomit();
    }
});

$(".zoom-out").on("click", function () {
    zoomout();
});

$(document).keypress(function (e) {
    if (e.which == 45) {
        zoomout();
    }
});

function zoomit() {
    var currentValue = $("#color-info-svg-wrapper").css("width");
    if ((currentValue == "400px") || (currentValue == "295px")) {
        $(".zoom-wrapper").addClass("times2");
        $(".copy-wrapper").addClass("pad-it");
    }
    else if (currentValue == "600px") {
        $(".zoom-wrapper").addClass("times3");
        $(".zoom-wrapper").removeClass("times2");
    }
    else if (currentValue == "800px") {
        $(".zoom-wrapper").addClass("times4");
        $(".zoom-wrapper").removeClass("times3");
    }
    else if (currentValue == "1000px") {
        $(".zoom-wrapper").addClass("times5");
        $(".zoom-wrapper").removeClass("times4");
    }
}

function zoomout() {
    var currentValue = $("#color-info-svg-wrapper").css("width");
    if (currentValue == "1200px") {
        $(".zoom-wrapper").addClass("times4");
        $(".zoom-wrapper").removeClass("times5");
    }
    else if (currentValue == "1000px") {
        $(".zoom-wrapper").addClass("times3");
        $(".zoom-wrapper").removeClass("times4");
    }
    else if (currentValue == "800px") {
        $(".zoom-wrapper").addClass("times2");
        $(".zoom-wrapper").removeClass("times3");
    }
    else if (currentValue == "600px") {
        $(".zoom-wrapper").removeClass("times2");
        $(".copy-wrapper").removeClass("pad-it");
    }
}

$(".close").on("click", function () {
    $(".color-selectors").css("left", (-300));
    $(".close-container").css("left", (-300));
});

$(".open-container").on("click", function () {
    $(".color-selectors").css("left", (-80));
    $(".close-container").css("left", (0));
});

$("#download").on("click", function () {
    //use blob since IE and Firefox will not work with just a tag download
    var blob = new Blob([$("#color-info-svg-wrapper").html()], { type: 'image/svg+xml;charset=utf-8' });
    if (navigator.msSaveBlob) {
        return navigator.msSaveBlob(blob, "BackeHolidayImage.svg");
    }
    else {
        var link = document.createElement('a');
        document.body.appendChild(link);
        link.download = "BackeHolidayImage.svg";
        link.href = window.URL.createObjectURL(blob);
        link.click();
        $(link).remove()
    }
});

$("#print").on("click", function () {
    console.log("print attempt");
    window.print();
});

//grabs all the paths, shapes, and other things inside the svg then on click updates based on fill
var allTheThings = $("svg.svgClass > *");
allTheThings.on("click", function () {
    var newColor = $('#basic-log').text();
    //This logic so so that if the color is black or undefined then do not let someone changes (this is so the lines will stay black and they can only color in the white parts of the images)
    //Stroke #000101 is for the borders so it wont fill the whole svg and cause chaos
    if (($(this).attr('fill') != "#000000") && $(this).attr('fill') != null && $(this).attr('stroke') != "#000101") {
        $(this).attr('fill', newColor);
    }
});