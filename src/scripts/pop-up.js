function showPopUp(element) {
    let currentNotification = null;

    if (currentNotification) {
        currentNotification.remove();
    }

    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = element.checked ? 'Song added to the playlist!' : 'Song removed from playlist!';
    document.body.appendChild(notification);
    
    setTimeout(function() {
        notification.remove();
    }, 3000);

    currentNotification = notification;
};