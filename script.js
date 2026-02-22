var IMAGE_NAMES = [
    "IMG13", "IMG14", "IMG3", "IMG5", "IMG6",
    "IMG7", "IMG8", "IMG9", "IMG10", "IMG1", "IMG2"
];

var currentIndex = 0;
var activeBg = 1;
var supportsWebP = false;
var transitioning = false;

// Detect WebP support
function checkWebP(callback) {
    var img = new Image();
    img.onload = function () { callback(img.width > 0 && img.height > 0); };
    img.onerror = function () { callback(false); };
    img.src = "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA";
}

// Pick the right size based on screen, cap DPR at 2 to avoid oversized images
function getSizeBreakpoint() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = window.innerWidth * dpr;
    if (w <= 640) return "640w";
    if (w <= 1024) return "1024w";
    return "1920w";
}

// Build the image URL for a given image name
function getImageUrl(name) {
    var size = getSizeBreakpoint();
    var ext = supportsWebP ? "webp" : "jpeg";
    return "img/" + name + "-" + size + "." + ext;
}

// Preload an image and call back when done
function preloadImage(url, callback) {
    var img = new Image();
    img.onload = function () { if (callback) callback(); };
    img.onerror = function () { if (callback) callback(); };
    img.src = url;
}

// Prefetch the next image in the rotation
function prefetchNext() {
    var nextIndex = (currentIndex) % IMAGE_NAMES.length;
    preloadImage(getImageUrl(IMAGE_NAMES[nextIndex]));
}

function changeImage() {
    if (transitioning) return;

    if (currentIndex >= IMAGE_NAMES.length) {
        currentIndex = 0;
    }

    var url = getImageUrl(IMAGE_NAMES[currentIndex]);
    var showBg, hideBg;

    if (activeBg === 1) {
        showBg = document.getElementById("bg2");
        hideBg = document.getElementById("bg1");
        activeBg = 2;
    } else {
        showBg = document.getElementById("bg1");
        hideBg = document.getElementById("bg2");
        activeBg = 1;
    }

    // Set the new image on the hidden layer, then crossfade
    showBg.style.backgroundImage = "url(" + url + ")";
    transitioning = true;
    showBg.style.opacity = "1";
    hideBg.style.opacity = "0";

    currentIndex++;

    // Wait for the CSS transition to finish before allowing the next change
    showBg.addEventListener("transitionend", function onEnd() {
        showBg.removeEventListener("transitionend", onEnd);
        transitioning = false;
        // Prefetch the next image once the transition completes
        prefetchNext();
    });
}

checkWebP(function (supported) {
    supportsWebP = supported;

    // Preload the first image, then start the slideshow
    var firstUrl = getImageUrl(IMAGE_NAMES[0]);
    preloadImage(firstUrl, function () {
        changeImage();
        setInterval(changeImage, 6000);
    });
});
