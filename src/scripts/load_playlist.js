window.onload = () => {
    fetch("http://127.0.0.1:5000/playlist/display", {
	method: "GET",
    }).then(response => response.text())
	.then(text => {
	    document.querySelector('table.list').outerHTML = text;
	    document.querySelectorAll('form').forEach((el) => el.onclick = showPopUp);
	})
}

function showPopUp(event) {
    let currentNotification = null;

    if (currentNotification) {
        currentNotification.remove();
    }

    const notification = document.createElement('div');
    notification.classList.add('notification');
    let element = event.srcElement;
    let id = element.getAttribute('data-el-id');
    console.log(element);
    fetch("http://127.0.0.1:5000/playlist/remove/" + id, {
	method: "DELETE",
    })
        .then((response) => response.text())
	.then((text) => {
	    notification.textContent = "Song removed from playlist!";
	    document.querySelector('table.list').innerHTML = text;
        document.querySelectorAll('input[type=checkbox]').forEach((el) => el.onclick = showPopUp);
	})
	.catch(() => notification.textContent = "Couldn't reach server!");
    document.body.appendChild(notification);
    
    setTimeout(function() {
        notification.remove();
    }, 3000);

    currentNotification = notification;
};
