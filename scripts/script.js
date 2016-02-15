var API_SERVER = 'http://elections.huffingtonpost.com',
    API_BASE = '/pollster/api/',
    API_FILE = 'polls.json',
    callback = '?callback=pollsterPoll',
    params = '&state=US&page=3&topic=2016-president',
    latest_data;

window.pollsterPoll = function (incoming_data) {
    latest_data = incoming_data;
    visualize();
};

$(document).ready(function () {
    $.ajax({
        url: API_SERVER + API_BASE + API_FILE + callback + params,
        dataType: 'script',
        type: 'GET',
        cache: true
    });
});

function visualize() {
    console.log(latest_data);

    for (i = 0; i < 3; i++) {
        console.log(latest_data[i].method);
        $("#polldata" + i).append("<p> Pollster: " + latest_data[i].pollster + "</p>");
        $("#polldata" + i).append("<p> Method: " + latest_data[i].method + "</p>");
        $("#polldata" + i).append("<p> Partisan: " + latest_data[i].partisan + "</p>");

        for (j = 0; j < 3; j++) {
            console.log(latest_data[i].questions[j].name);
            $("#polldata" + i).append("<p>" + latest_data[i].questions[j].name + "</p>")

            for (k = 0; k < latest_data[i].questions[j].subpopulations[0].responses.length; k++) {
                $("#polldata" + i).append("<div class='question' width='100' height='50' style = 'background-color:lightgrey;'>" + latest_data[i].questions[j].subpopulations[0].responses[k].choice + " <br> " + latest_data[i].questions[j].subpopulations[0].responses[k].value + " </div>");
            }
        }

    }

}

var voteDisplayReadyInterval = setInterval(function () {
    if (document.readyState == "complete") {
        clearInterval(voteDisplayReadyInterval);
        var canvas01 = new VoteDisplay("canvas-polldata0");
        canvas01.initialize();
        var canvas02 = new VoteDisplay("canvas-polldata1");
        canvas02.initialize();
        var canvas03 = new VoteDisplay("canvas-polldata2");
        canvas03.initialize();
    }
}, 50);



$("#start").on("click", function () {
    openanimation();
    $("#start").css({
        'visibility': "hidden",
        'display': "none",
    }).fadeOut("slow");
})


function openanimation() {
    document.getElementById("leftside").style.width = "0px";
    document.getElementById("leftside").style.height = "0px";
    document.getElementById("leftside").style.borderRadius = "1000px";

    document.getElementById("rightside").style.left = "100%";
    document.getElementById("rightside").style.width = "0px";
    document.getElementById("rightside").style.height = "0px";
    document.getElementById("rightside").style.borderRadius = "1000px";

    document.getElementById("rightside").style.webkitTransform = 'rotate(' + 45 + 'deg)';
    document.getElementById("rightside").style.mozTransform = 'rotate(' + 45 + 'deg)';
    document.getElementById("rightside").style.msTransform = 'rotate(' + 45 + 'deg)';
    document.getElementById("rightside").style.oTransform = 'rotate(' + 45 + 'deg)';
    document.getElementById("rightside").style.transform = 'rotate(' + 45 + 'deg)';

    document.getElementById("leftside").style.webkitTransform = 'rotate(-' + 45 + 'deg)';
    document.getElementById("leftside").style.mozTransform = 'rotate(-' + 45 + 'deg)';
    document.getElementById("leftside").style.msTransform = 'rotate(-' + 45 + 'deg)';
    document.getElementById("leftside").style.oTransform = 'rotate(-' + 45 + 'deg)';
    document.getElementById("leftside").style.transform = 'rotate(-' + 45 + 'deg)';

}