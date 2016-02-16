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

const chartColors = ["#74FF52", "#FF5252", "#FFC252", "#52FFC2", "#5260FF", "#E552FF", "#F9FF52", "#5CBF49", "#BF8049", "#BF49AF", "#BF4949", "#FF8400", "#FF00D9"];

function visualize() {
    console.log(latest_data);
    var counter = 0;

    for (var i = 0; i < 3; i++) {
        console.log(latest_data[i].method);
        $("#polldata" + i).append("<p> Pollster: " + latest_data[i].pollster + "</p>");
        $("#polldata" + i).append("<p> Method: " + latest_data[i].method + "</p>");
        $("#polldata" + i).append("<p> Partisan: " + latest_data[i].partisan + "</p>");

        for (var j = 0; j < 3; j++) {
            counter++;
            const canvasID = "canvas-polldata" + counter;
            const choiceArray = [];
            console.log(latest_data[i].questions[j].name);
            const questionName = latest_data[i].questions[j].name;
            $("#polldata" + i).append("<p>" + latest_data[i].questions[j].name + "</p>");
            for (k = 0; k < latest_data[i].questions[j].subpopulations[0].responses.length; k++) {
                $("#polldata" + i).append("<div class='question' width='100' height='50' style = 'background-color:lightgrey;'>" + latest_data[i].questions[j].subpopulations[0].responses[k].choice + " <br> " + latest_data[i].questions[j].subpopulations[0].responses[k].value + " </div>");
                choiceArray.push([latest_data[i].questions[j].subpopulations[0].responses[k].choice, Number(latest_data[i].questions[j].subpopulations[0].responses[k].value)]);
            }
            $("#polldata" + i).append("<div class='canvasVote' id='" + canvasID + "'></div>");
            var canvas = new VoteDisplay(canvasID);
            canvas.initialize();
            canvas.setText(questionName);
            for (var s = 0; s < choiceArray.length; s++) {
                canvas.addLegendItem(choiceArray[s][0], chartColors[s], choiceArray[s][1]);
            }
            canvas.setWidth(250 + ( 60 * choiceArray.length));
            canvas.setHeight(80 + ( 30 * choiceArray.length));
        }

    }

}

//var voteDisplayReadyInterval = setInterval(function () {
//    if (document.readyState == "complete") {
//        clearInterval(voteDisplayReadyInterval);
//        var canvas01 = new VoteDisplay("canvas-polldata0");
//        canvas01.initialize();
//        canvas01.setText("Test Title");
//        var canvas02 = new VoteDisplay("canvas-polldata1");
//        canvas02.initialize();
//        var canvas03 = new VoteDisplay("canvas-polldata2");
//        canvas03.initialize();
//    }
//}, 50);



$("#start").on("click", function () {
    openanimation();
    $("#start").css({
        'visibility': "hidden",
        'display': "none",
    }).fadeOut("slow");
})


function openanimation() {
    document.getElementById("leftside").style.width = "0px";
    document.getElementById("rightside").style.left = "100%";
    document.getElementById("rightside").style.width = "0px";


}