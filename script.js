let IMAGES = [
    "img/IMG13.JPEG",
    "img/IMG14.JPEG",
    "img/IMG3.JPEG",
    "img/IMG5.JPEG",
    "img/IMG6.JPEG",
    "img/IMG7.JPEG",
    "img/IMG8.JPEG",
    "img/IMG9.JPEG",
    "img/IMG10.JPEG",
    "img/IMG1.JPEG",
    "img/IMG2.JPEG",
]

var currentIndex = 0

window.onload = function() {

    function changeImage() {
        if (currentIndex >= IMAGES.length) {
            currentIndex = 0
        }

        let bgImg = IMAGES[currentIndex]
        document.getElementById('bg1').style.backgroundImage="url(" + bgImg + ")";
        
        currentIndex = currentIndex + 1
    }

    setInterval(changeImage, 6000)
    changeImage()
}
