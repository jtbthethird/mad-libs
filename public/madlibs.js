var sentence;
var wordItems;
var libButton = document.getElementById('madlib-button');
var madlibBody = document.getElementById('madlib-body');

function displayForm() {
    madlibBody.innerHTML = "";
    var newHtml = "<ul>";
    for (var i = 0; i < wordItems.length; i++) {
        var item = wordItems[i];
        console.log(item.word);
        newHtml += "<li><input type='text' placeholder='" + item.word + "' id='" + item.id + "'/></li>"
    }
    newHtml += "</ul><br/><button id='madlib-generate' onclick='generate()'>Generate</button>"
    madlibBody.innerHTML = newHtml;
    libButton.style.visibility = "hidden";
}

function parseMadLib(rawMadLib) {
    if (rawMadLib === "") {
        return;
    }
    wordItems = [];
    sentence = rawMadLib;
    var next = 0;
    var index = 0;
    while (next < rawMadLib.length) {
        var next = rawMadLib.indexOf("{{", next);
        if (next == -1) {
            break;
        }
        var closer = rawMadLib.indexOf("}}", next+2);
        if (closer == -1) {
            break;
        }
        var word = rawMadLib.substring(next+2, closer).trim();
        next = closer;
        wordItems.push({
            id: index,
            word: word
        });
        index ++;
    }
    displayForm();
}

function fetchMadlib(e) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status === 200) {
            console.log(this.responseText);
            parseMadLib(this.responseText);
        }
    };
    xhttp.open("GET", "/madlib", true);
    xhttp.send();
}

function generate() {
    var newSentence = sentence;
    var wordTypes = [];
    var next = 0;
    var index = 0;
    while (true) {
        var next = newSentence.indexOf("{{");
        if (next == -1) {
            break;
        }
        var closer = newSentence.indexOf("}}", next+2);
        if (closer == -1) {
            break;
        }
        var wordToReplace = newSentence.substring(next, closer+2);
        var wordKey = wordItems[index];
        var wordToInsert = "<span class='inserted'>" + document.getElementById(wordKey.id).value + "</span>";
        newSentence = newSentence.replace(wordToReplace, wordToInsert);
        index ++;
    }
    madlibBody.innerHTML = "<p class='mad-lib-done'>" + newSentence + "</p>";
    libButton.style.visibility = "visible";
}

libButton.addEventListener('click', fetchMadlib);
