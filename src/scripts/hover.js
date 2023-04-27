document.querySelectorAll("ul.navigation-options > li > a").forEach((el)=> el.onmouseenter = function (event) {
    event.target.prev_color = event.target.style.color;
    event.target.style.color = "blanchedalmond";
})

document.querySelectorAll("ul.navigation-options > li > a").forEach((el)=> el.onmouseleave = function (event) {
    event.target.style.color = event.target.prev_color;
})
