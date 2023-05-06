const album = document.querySelector("h1.heading-1").innerText;
const img = document.querySelector("body > table > tbody > tr:nth-child(1) > td:nth-child(1) > img").src;

function showPopUp(element) {
    let currentNotification = null;

    if (currentNotification) {
        currentNotification.remove();
    }

    const notification = document.createElement('div');
    notification.classList.add('notification');
    
    row_node = element.parentNode.parentNode;
    duration_node = row_node.previousElementSibling;
    artist_node = duration_node.previousElementSibling.previousElementSibling;
    song_node = artist_node.previousElementSibling;
    
    duration = duration_node.innerText;
    song = song_node.innerText;
    artist = artist_node.innerText;

    let body = new URLSearchParams({
	name: name,
	artist: artist,
	duration: duration,
	album: album,
	img: img,
    });

    fetch("http://127.0.0.1:5000/playlist/add", {
	method: "POST",
	mode: "no-cors",
	headers: {
	    "Content-Type": "application/x-www-form-urlencoded"
	},
	body: body,
    })
	.then(() => {notification.textContent = "Song added to the playlist!";})
	.catch(() => notification.textContent = "Couldn't reach server!");
    
    element.disabled = true;
    document.body.appendChild(notification);
    
    setTimeout(function() {
        notification.remove();
    }, 3000);

    currentNotification = notification;
};
