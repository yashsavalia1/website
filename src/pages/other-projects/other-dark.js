darkmode()

function darkmode() {
    if (document.cookie == "darkmode") {
        document.getElementsByTagName("BODY")[0].style.backgroundImage = "linear-gradient(#363636, rgb(27, 27, 27))"
    } else {
        document.getElementsByTagName("BODY")[0].style.backgroundImage = "linear-gradient(45deg, rgb(153, 208, 245), rgb(244, 123, 255))"

    }
}