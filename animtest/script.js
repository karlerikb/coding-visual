/* BUTTONS AND CLICKCOUNT */

document.getElementById("stepForward").addEventListener("click", stepForward);
document.getElementById("stepBack").addEventListener("click", stepBack);

function stepForward() {
    const stepCountElement = document.getElementById("stepCount");
    let stepCount = parseInt(stepCountElement.innerText);
    stepCountElement.innerText = ++stepCount;
}

function stepBack() {
    const stepCountElement = document.getElementById("stepCount");
    let stepCount = parseInt(stepCountElement.innerText);
    
    if (stepCount > 0)
        stepCountElement.innerText = --stepCount;
    else
        stepCount = 0;
}

/* CODELINES */
document.addEventListener("click", getCodeLines);

function getCodeLines() {
    const stepCount = parseInt(document.getElementById("stepCount").innerText);
    
    if (stepCount === 0) {
        clearHighlights();
    }

    if (stepCount > 0 && stepCount < 5) {
        lineOne(stepCount);
    }


}


function lineOne(stepCount) {
    const line11Steps = document.querySelectorAll(".line11");
    const line1Steps = document.querySelectorAll(".line1");
    
    switch(stepCount) {
        case 1:
            clearHighlights();
            line11Steps[0].style.backgroundColor = "#97781c";
            break;
        case 2:
            clearHighlights();
            line1Steps[0].style.backgroundColor = "#97781c";
            break;
        case 3:
            clearHighlights();

            break;
    }

    
}

function clearHighlights() {
    const spanElements = document.querySelectorAll("#codingContainer > pre > span");
    spanElements.forEach(function(span) {
        span.style.backgroundColor = "#333";
    });
}


function methodArgumentsAnimation() {

}

console.log($(document.querySelector("#line1-n")).offset());

$("body").click(function() {
    const line1n = $("#line1-n");
    const line11n = $("#line11-n");
    const line1nPos = line1n.offset();
    const line11nPos = line11n.offset();

    /* teen uue liikuva spani */
    const movingNNode = document.createElement("span");
    const movingNText = document.createTextNode("3");
    movingNNode.appendChild(movingNText);
    const codingContainerNode = document.querySelector("#codingContainer");
    codingContainerNode.appendChild(movingNNode);
    movingNNode.setAttribute("id", "moving-N");
    movingNNode.style.position = "absolute";
    movingNNode.style.color = "#999";

    /* uus span saab line11n asukoha */
    const createdMovingN = $("#moving-N");
    createdMovingN.offset({
        top: line11n.offset().top,
        left: line11n.offset().left
    });

    let topPos = (line1nPos.top - line11nPos.top) + "px";
    let leftPos = (line1nPos.left - line11nPos.left) + "px";

    line11n.animate({top: topPos, left: leftPos}, 1500, function() {
        console.log(line11n.offset());
        line1n.animate({opacity: 0}, 200);
    });
});