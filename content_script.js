let api_key = 'b1926027-9ed4-4917-bd94-cf6c69a3754e';


function getData(nickname) {
    fetch('https://open.faceit.com/data/v4/players?nickname=' + nickname, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + api_key,
            'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => console.log(data.steam_nickname))
    .catch(error => console.log(error));
}


function injectCustomData() {
    var css = ".match-team-member__controls__space {display: flex; align-items: center; justify-content: center;}"; // Move to custom.css
    let styleTag = document.createElement('style');
    document.head.appendChild(styleTag);
    styleTag.appendChild(document.createTextNode(css));
    var customSpaces = document.getElementsByClassName('match-team-member__controls__space');

    // Loop through our target area of the nine other players
    for (let customSpace of customSpaces) {
        // If the area is lacking the "Add Friend" button (already friended), we add a spacer where it used to be
        if (customSpace.parentElement.childElementCount === 2) {
            let spacer = document.createElement('a');
            customSpace.parentElement.prepend(spacer);
            spacer.classList.add('match-team-member__controls__button');
        }
        tempurl = customSpace.parentElement.previousElementSibling.children[1].children[0].href;
        i = tempurl.lastIndexOf('/');
        nickname = tempurl.substr(i + 1);
        customSpace.innerHTML = getData(nickname);
    }
}


function timer() {
    const checker = document.getElementsByClassName('match-team-member__controls__space');
    if (checker.length !== 9) {
        setTimeout(timer, 50);
        return;
    }
    injectCustomData();
}


timer();
