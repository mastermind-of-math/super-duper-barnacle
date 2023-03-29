function preload(){
    classifier = ml5.imageClassifier("DoodleNet");
}

function setup(){
    canvas = createCanvas(350, 350);
    canvas.center();
    background('white');
    canvas.mouseReleased(getResults);
}

function draw(){
    strokeWeight(13);
    stroke(0);
    if(mouseIsPressed){
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function clearc(){
    background('white')
}

function talk(stuff){
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(stuff))
}

function getResults(){
    classifier.classify(canvas, gotResults);
}

function gotResults(error, results){
    if(error){
        console.error(error);
    } else {
        console.log(results);
        guess = ""
        lguess = guess;
        guess = results[0].label;
        confidence = results[0].confidence;
        percent = (confidence*100).toFixed(2) +  "%";
        document.getElementById("confidence-text").innerText = percent;
        document.getElementById("label-text").innerText = guess;
        if(lguess != guess){
            talk("I see a " + guess + " and I am " + percent + " sure.");
        }
    }
}