$("#submitTextBtn").click(submitText);

window.onload = function() {
    testTabs();
};

document.querySelector("#displayContainer").addEventListener("mouseup", selectedText);


function submitText() {
    console.log("clicked button");
    let codeInputString = getInputString();
    getCodeLines(codeInputString);
    // displayInputString(codeInputString);
}

function getInputString() {
    return document.querySelector("#codeInput").value;
}

/* function displayInputString(codeInputString) {
    const displayContainer = document.querySelector("#codeContainer > pre");
    displayContainer.innerHTML = codeInputString;
} */

function getCodeLines(codeInputString) {
    let codeLinesArray = codeInputString.split(/\n/);
    console.log(codeLinesArray);
    createRowNumbers(codeLinesArray.length);
    createCodeLineElements(codeLinesArray, codeLinesArray.length);
}

function createRowNumbers(numberOfLines) {
    const rowNumbersContainer = document.querySelector("#rowNumbersContainer > pre");
    const allRowNumberElements = document.querySelectorAll("#rowNumbersContainer > pre > div");

    if(allRowNumberElements.length > 0) {
        removeRowNumbers(rowNumbersContainer, allRowNumberElements);
    }

    for(let rowNumber = 1; rowNumber <= numberOfLines; rowNumber++) {
        let rowElementNode = document.createElement("div");
        let rowTextNode = document.createTextNode(rowNumber);
        rowElementNode.appendChild(rowTextNode);
        rowNumbersContainer.appendChild(rowElementNode);
        rowElementNode.setAttribute("id", "row" + rowNumber);
        rowElementNode.setAttribute("class", "rowNumber")
    }
}

function removeRowNumbers(parent, children) {
    for(let i = 0; i < children.length; i++) {
        parent.removeChild(children[i]);
    }
}

function testTabs() {
    document.querySelector("textarea").addEventListener("keydown", function(e) {
        if(e.keyCode === 9) {
            let start = this.selectionStart;
            let end = this.selectionEnd;
    
            let target = e.target;
            let value = target.value;
            target.value = value.substring(0, start) + "\xa0\xa0\xa0\xa0" + value.substring(end);

            this.selectionStart = this.selectionEnd = start + 4;

            e.preventDefault();
        }
    }, false);
}

function createCodeLineElements(codeLinesArray, numberOfLines) {
    const codeContainer = document.querySelector("#codeContainer > pre");
    const allCodeLineElements = document.querySelectorAll("#codeContainer > pre > div");

    if(allCodeLineElements.length > 0) {
        removeCodeLineElements(codeContainer, allCodeLineElements);
    }

    for(let lineNumber = 1; lineNumber <= numberOfLines; lineNumber++) {
        let lineElementNode = document.createElement("div");
        let lineTextNode = document.createTextNode(codeLinesArray[lineNumber-1]);
        lineElementNode.appendChild(lineTextNode);
        codeContainer.appendChild(lineElementNode);
        lineElementNode.setAttribute("id", "line" + lineNumber);
        lineElementNode.setAttribute("class", "lineNumber");
    }
}

function removeCodeLineElements(parent, children) {
    for(let i = 0; i < children.length; i++) {
        parent.removeChild(children[i]);
    }
}

function selectedText() {
    let selectedObject = window.getSelection();
    let selectedString = getSelectedText(selectedObject);
    let codeLineElement = getSelectedTextElement(selectedObject);
    
    let codeLineText = codeLineElement.innerText;
    let stringToSplit = codeLineText.replace(selectedString, "~" + selectedString + "~");
    let stringArray = stringToSplit.split("~");
    
    removeCodeLineElementNodes(codeLineElement);

    stringArray.forEach(function(text) {
        if(text === selectedString) {
            let spanNode = document.createElement("span");
            let spanText = document.createTextNode(text);
            spanNode.appendChild(spanText);
            codeLineElement.appendChild(spanNode);
            spanNode.setAttribute("id", "test");
        } else {
            let textNode = document.createTextNode(text);
            codeLineElement.appendChild(textNode);
        }
    });
    
}

function removeCodeLineElementNodes(node) {
    while(node.lastChild) {
        node.removeChild(node.lastChild);
    }
}

function getSelectedText(selectedObject) {
    return selectedObject.toString();
}

function getSelectedTextElement(selectedObject) {
    let selRange = selectedObject.getRangeAt(0);
    return selRange.commonAncestorContainer.parentElement;
}



/* def move(n, A, B):

    if n == 1:
        move A to B */