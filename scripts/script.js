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

    $("#polldata").append("<p>" + latest_data[0].pollster + "<br> 1. " + latest_data[0].questions[0].name + "</p>")


    for (i = 0; i < latest_data[0].questions[0].subpopulations[0].responses.length; i++) {
        $("#polldata").append("<div class='question' width='100' height='50' style = 'background-color:lightgrey;'>" + latest_data[0].questions[0].subpopulations[0].responses[i].choice + " <br> " + latest_data[0].questions[0].subpopulations[0].responses[i].value + " </div>");
    }

}