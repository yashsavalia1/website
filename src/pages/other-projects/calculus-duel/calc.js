darkmode()

function darkmode() {
    if (document.cookie == "darkmode") {
        document.getElementsByTagName("BODY")[0].style.backgroundImage = "linear-gradient(#363636, rgb(27, 27, 27))"
        document.getElementsByTagName("BODY")[0].style.backgroundSize = "cover"
    } else {
        document.getElementsByTagName("BODY")[0].style.background = "url(background.png)"
        document.getElementsByTagName("BODY")[0].style.backgroundSize = "cover"

    }
}