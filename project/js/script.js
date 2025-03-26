function exitpage(){
    window.close();
}

function settingsPage(clicked, selve){
    let settingsButtons = document.getElementsByClassName("settingsOption");
    let GameplayPage = document.getElementById("Gameplay");
    let VideoPage = document.getElementById("Video");
    let AudioPage = document.getElementById("Audio");


    for (let i = 0; i < settingsButtons.length; i++) {
        settingsButtons[i].classList.remove("active");
    }
    selve.classList.add("active");
    switch(clicked){
        case 1:
            GameplayPage.style.display = "flex";
            VideoPage.style.display = "none";
            AudioPage.style.display = "none";
            break;
        case 2:
            GameplayPage.style.display = "none";
            VideoPage.style.display = "flex";
            AudioPage.style.display = "none";
            break;
        case 3:
            GameplayPage.style.display = "none";
            VideoPage.style.display = "none";
            AudioPage.style.display = "flex";
            break;
    }
}

function loadFirstPage(){
    let GameplayPage = document.getElementById("Gameplay");
    GameplayPage.style.display = "flex";

}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.error(`Fehler beim Aktivieren des Vollbildmodus: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}

