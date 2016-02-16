/**
 * Created by Maravis on 2/11/2016.
 */

function VoteDisplay(id) {
    const that = this;
    const fps = 30;
    const initialWidth = 700;
    const initialHeight = 340;
    const divHTML = "<canvas></canvas>";
    const transArray = [];
    const titleArray = [];
    var time = 0;
    var selectorDiv = null;
    var selectorCanvas = null;
    var ctx = null;
    var openingTransition = null;
    var titleText = "";
    var drawLegend = null;
    var legend = null;
    this.id = id;
    this.initialize = function() {
        selectorDiv = document.getElementById(id);
        selectorDiv.innerHTML = "";
        selectorDiv.innerHTML += divHTML;
        selectorCanvas = selectorDiv.getElementsByTagName("canvas")[0];
        ctx = selectorCanvas.getContext("2d");
        selectorCanvas.width = initialWidth;
        selectorCanvas.height = initialHeight;
        setInterval(that.update, 1);
        openingTransition = new that.Transitioner();
        openingTransition.onTransitionFinish = function(){
            var title = new that.Title();
            title.onUpdate = function(){title.setText(titleText)};
            title.setX(that.getWidth()/2);
            title.setY(40);
            drawLegend = legend;
        };
        setInterval(that.draw, 1000/fps);
    };
    this.lerp = function(a, b, t) {
        var len = a.length;
        if(b.length != len) return;

        var x = [];
        for(var i = 0; i < len; i++)
            x.push(a[i] + t * (b[i] - a[i]));
        return x;
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
    this.setTitle = function(newTitle){
        titleText = newTitle;
    };
    this.getTitle = function(){
        return titleText;
    };
    this.ChartBar = function(){
        const self = this;
        var drawHeight = 0;
        var drawValue = 0;
        var targetHeight = 0;
        var value = 0;
        this.update = function(newValue){
            if (newValue) {
                value = newValue;
            }
            drawValue = (that.lerp([drawValue], [value], 0.005)[0]);
            drawHeight = that.lerp([drawHeight], [targetHeight], 0.005)[0];
        };
        this.draw = function(x, y, width, height, color){
            targetHeight = height;
            ctx.fillStyle = color;
            ctx.fillRect(x, y, width, -drawHeight);
            ctx.font = "14px Verdana";
            ctx.fillStyle = "#000000";
            ctx.textAlign = "center";
            ctx.fillText(Math.round(drawValue).toString(), x + width/2, y + (-drawHeight) - 10);
        };
    };
    this.LegendItem = function(newText, newColor, newValue){
        const self = this;
        var color = "black";
        var text = "None";
        var value = 0;
        this.getColor = function(){
            return color;
        };
        this.getText = function(){
            return text;
        };
        this.getValue = function(){
            return value;
        };
        this.update = function(){};
        this.draw = function(x, y){
            ctx.fillStyle = color;
            ctx.fillRect(x, y, 20, 20);
            ctx.fillStyle = "#000000";
            ctx.strokeStyle = "#000000";
            ctx.strokeRect(x, y, 20, 20);
            ctx.font = "14px Verdana";
            ctx.textAlign = "left";
            ctx.fillText(text, x + 30, y + 15);
        };
        if (newText) { text = newText; }
        if (newColor) { color = newColor; }
        if (newValue) { value = newValue; }
    };
    this.Legend = function() {
        const self = this;
        var items = {};
        var alpha = 0;
        var sumValue = 0;
        var bars = {};
        var counter = 0;
        var targetX = 0;
        var drawX = -100;
        this.addItem = function(id, newLegendItem){
            items[id] = newLegendItem;
            sumValue = 0;
            bars = {};
            for (i in items) {
                sumValue += items[i].getValue();
                bars[i] = new that.ChartBar();
            }
        };
        this.update = function(){
            drawX = that.lerp([drawX], [targetX], 0.005)[0];
            if (alpha < 1) {
                alpha += 0.005;
            }
            for (i in items) {
                items[i].update();
                bars[i].update(items[i].getValue());
            }
        };
        this.draw = function(x, y, width, height) {
            targetX = x;
            ctx.globalAlpha = alpha;
            ctx.fillStyle = "#B2DEED";
            ctx.fillRect(drawX, y, width, height);
            ctx.strokeStyle = "#000000";
            ctx.strokeRect(drawX, y, width, height);
            counter = 0;
            for (i in items) {
                counter++;
                items[i].draw(drawX + 10, y + 10 + (30 * (counter-1)));
                bars[i].draw((drawX + width) + 30 + (60 * (counter-1)), that.getHeight() - 10, 50, ((height - 10) * items[i].getValue())/sumValue, items[i].getColor());
            }
            ctx.globalAlpha = 1;
        };
    };
    this.Transitioner = function() {
        var alpha = 0;
        var color = "#80CEE8";
        const self = this;
        this.setAlpha = function(newAlpha){
            alpha = newAlpha;
        };
        this.getAlpha = function(){
            return alpha;
        };
        this.setColor = function(newColor){
            color = newColor;
        };
        this.getColor = function(){
            return color;
        };
        this.update = function(){
            if (alpha < 1) {
                alpha += 0.005;
            } else {
                self.update = function(){};
                self.onTransitionFinish();
            }
        };
        this.draw = function(){
            ctx.globalAlpha = alpha;
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, that.getWidth(), that.getHeight());
            ctx.globalAlpha = 1;
        };
        this.remove = function(){
            var i = transArray.indexOf(self);
            transArray.splice(i, 1);
        };
        this.onTransitionFinish = function(){};
        transArray.push(this);
    };
    this.Title = function() {
        const self = this;
        var text = "Title";
        var x = 0;
        var y = 0;
        var alpha = 0;
        var drawY = -100;
        this.onUpdate = function(){};
        this.update = function() {
            drawY = that.lerp([drawY], [y], 0.005)[0];
            if (alpha < 1) {
                alpha += 0.005;
            }
            self.onUpdate();
        };
        this.draw = function(){
            ctx.globalAlpha = alpha;
            ctx.font = "20px Verdana";
            ctx.fillStyle = "#000000";
            ctx.textAlign = "center";
            ctx.fillText(text, x, drawY);
            ctx.globalAlpha = 1;
        };
        this.setText = function(newText){
            text = newText;
        };
        this.setX = function(newX){
            x = newX;
        };
        this.getX = function(){
            return x;
        };
        this.setY = function(newY){
            y = newY;
        };
        this.getY = function(){
            return y;
        };
        titleArray.push(this);
    };
    this.update = function(){
        time++;
        for (var i = 0; i < transArray.length; i++) {
            transArray[i].update();
        }
        for (var i = 0; i < titleArray.length; i++) {
            titleArray[i].update();
        }
        if (drawLegend) {
            drawLegend.update();
        }
    };
    this.draw = function() {
        ctx.clearRect(0, 0, that.getWidth(), that.getHeight());
        for (var i = 0; i < transArray.length; i++) {
            transArray[i].draw();
        }
        for (var i = 0; i < titleArray.length; i++) {
            titleArray[i].draw();
        }
        if (drawLegend) {
            drawLegend.draw(10, 60, 200, that.getHeight() - 70);
        }
    };
    this.setText = function(text){
        titleText = text;
    };
    this.addLegendItem = function(id, color, value){
        legend.addItem(id, new that.LegendItem(id, color, value));
    };
    legend = new that.Legend();
}