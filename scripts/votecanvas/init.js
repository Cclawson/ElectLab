/**
 * Created by Maravis on 2/11/2016.
 */

function VoteDisplay(id) {
    const that = this;
    const fps = 30;
    const initialWidth = 500;
    const initialHeight = 300;
    const divHTML = "<canvas></canvas>";
    var selectorDiv = null;
    var selectorCanvas = null;
    var ctx = null;
    this.id = id;
    this.initialize = function() {
        selectorDiv = document.getElementById(id);
        selectorDiv.innerHTML = "";
        selectorDiv.innerHTML += divHTML;
        selectorCanvas = selectorDiv.getElementsByTagName("canvas")[0];
        ctx = selectorCanvas.getContext("2d");
        selectorCanvas.width = 500;
        selectorCanvas.height = 300;
        setInterval(that.draw, 1000/fps);
    };
    this.setWidth = function(width){
        selectorCanvas.width = width;
    };
    this.setHeight = function(height){
        selectorCanvas.height = height;
    };
    this.getWidth = function(){
        return selectorCanvas.width;
    };
    this.getHeight = function(){
        return selectorCanvas.height;
    };
    this.Transitioner = function() {
        var alpha = 0;
        var color = "#80CEE8";
        this.draw = function(){
            
        };
    };
    this.draw = function() {
        ctx.fillStyle = "#80CEE8";
        ctx.fillRect(0, 0, that.getWidth(), that.getHeight());
    };
}