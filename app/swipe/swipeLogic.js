
const swipeArea = document.getElementById("swipeZone");
const swipeParent = swipeArea.parentElement

let startX = 0;
let isSwiping = false;

swipeArea.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isSwiping = true;
});

swipeArea.addEventListener("touchmove", (e) => {
    if (!isSwiping) return;
    swipeParent.style.transition = ""
    e.preventDefault();

    const currentX = e.touches[0].clientX;
    const diffX = currentX - startX;
    swipeParent.style.transform = `translateX(${diffX/4}%) rotate(${diffX/30}deg)`
});

swipeArea.addEventListener("touchend", (e) => {
    if (!isSwiping) return;
    swipeParent.style.transition = "transform 0.1s" 
    isSwiping = false;

    const endX = e.changedTouches[0].clientX;
    const diffX = endX - startX;
    const threshold = 200;

    if (diffX > threshold) {
        swipeParent.style.transform = `translateX(120%) rotate(13deg)`
    } else if (diffX < -threshold) {
        swipeParent.style.transform = `translateX(-120%) rotate(-13deg)`
        
    } else {
        swipeParent.style.transform = `translateX(0px) rotate(0deg)`
    }
});
