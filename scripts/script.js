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