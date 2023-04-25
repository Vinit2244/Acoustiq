// Animation
var zoomIn = true;
function funcZoomIn() {
  document.getElementById("artist-image").style.width = "550px";
}
function funcZoomOut() {
  document.getElementById("artist-image").style.width = "500px";
}

function addReview() {
  var rating = document.querySelector('input[name="rating"]:checked').value;
  var review = document.getElementById("review").value;
  var userName = document.getElementById("user-name").value;

  if (rating && review && userName) {
    var reviewObject = {
      rating: rating,
      review: review,
      userName: userName
    };

    var reviewsTableBody = document.getElementById("reviews-table-body");
    var temprow1 = reviewsTableBody.insertRow(-1);
    temprow1.style.height = "10px";
    var row = reviewsTableBody.insertRow(-1);
    var userCell = row.insertCell(0);
    var ratingCell = row.insertCell(1);
    var r = reviewsTableBody.insertRow(-1);
    var reviewCell = r.insertCell(0);
    reviewCell.style.fontFamily = "'Edu TAS Beginner', cursive";
    reviewCell.colSpan = 2;
    if (rating == "sad") {
      ratingCell.style.backgroundColor = "rgba(229, 132, 0, 0.2)";
      reviewCell.style.backgroundColor = "rgba(229, 132, 0, 0.2)";
      userCell.style.backgroundColor = "rgba(229, 132, 0, 0.2)";
      ratingCell.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="100%" height="100%" viewBox="0 0 24 24"><path d="M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M15.5,8C16.3,8 17,8.7 17,9.5C17,10.3 16.3,11 15.5,11C14.7,11 14,10.3 14,9.5C14,8.7 14.7,8 15.5,8M10,9.5C10,10.3 9.3,11 8.5,11C7.7,11 7,10.3 7,9.5C7,8.7 7.7,8 8.5,8C9.3,8 10,8.7 10,9.5M12,14C13.75,14 15.29,14.72 16.19,15.81L14.77,17.23C14.32,16.5 13.25,16 12,16C10.75,16 9.68,16.5 9.23,17.23L7.81,15.81C8.71,14.72 10.25,14 12,14Z" style="fill: rgb(229, 132, 0);" /></svg> `
    }
    if (rating == "super-sad") {
      ratingCell.style.backgroundColor = "rgba(239, 42, 16, 0.2)";
      reviewCell.style.backgroundColor = "rgba(239, 42, 16, 0.2)";
      userCell.style.backgroundColor = "rgba(239, 42, 16, 0.2)";
      ratingCell.innerHTML = `<svg viewBox="0 0 24 24"><path d="M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M16.18,7.76L15.12,8.82L14.06,7.76L13,8.82L14.06,9.88L13,10.94L14.06,12L15.12,10.94L16.18,12L17.24,10.94L16.18,9.88L17.24,8.82L16.18,7.76M7.82,12L8.88,10.94L9.94,12L11,10.94L9.94,9.88L11,8.82L9.94,7.76L8.88,8.82L7.82,7.76L6.76,8.82L7.82,9.88L6.76,10.94L7.82,12M12,14C9.67,14 7.69,15.46 6.89,17.5H17.11C16.31,15.46 14.33,14 12,14Z" style="fill: rgb(239, 42, 16);"/></svg>`
    }
    if (rating == "neutral") {
      ratingCell.style.backgroundColor = "rgba(232, 214, 0, 0.2)";
      reviewCell.style.backgroundColor = "rgba(232, 214, 0, 0.2)";
      userCell.style.backgroundColor = "rgba(232, 214, 0, 0.2)";
      ratingCell.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="100%" height="100%" viewBox="0 0 24 24"><path d="M8.5,11A1.5,1.5 0 0,1 7,9.5A1.5,1.5 0 0,1 8.5,8A1.5,1.5 0 0,1 10,9.5A1.5,1.5 0 0,1 8.5,11M15.5,11A1.5,1.5 0 0,1 14,9.5A1.5,1.5 0 0,1 15.5,8A1.5,1.5 0 0,1 17,9.5A1.5,1.5 0 0,1 15.5,11M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M9,14H15A1,1 0 0,1 16,15A1,1 0 0,1 15,16H9A1,1 0 0,1 8,15A1,1 0 0,1 9,14Z" style="fill: rgb(232, 214, 0);"/></svg>`
    }
    if (rating == "happy") {
      ratingCell.style.backgroundColor = "rgba(0, 204, 79, 0.2)";
      reviewCell.style.backgroundColor = "rgba(0, 204, 79, 0.2)";
      userCell.style.backgroundColor = "rgba(0, 204, 79, 0.2)";
      ratingCell.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="100%" height="100%" viewBox="0 0 24 24"><path d="M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M10,9.5C10,10.3 9.3,11 8.5,11C7.7,11 7,10.3 7,9.5C7,8.7 7.7,8 8.5,8C9.3,8 10,8.7 10,9.5M17,9.5C17,10.3 16.3,11 15.5,11C14.7,11 14,10.3 14,9.5C14,8.7 14.7,8 15.5,8C16.3,8 17,8.7 17,9.5M12,17.23C10.25,17.23 8.71,16.5 7.81,15.42L9.23,14C9.68,14.72 10.75,15.23 12,15.23C13.25,15.23 14.32,14.72 14.77,14L16.19,15.42C15.29,16.5 13.75,17.23 12,17.23Z" style="fill: rgb(0, 204, 79);" /></svg>`
    }
    if (rating == "super-happy") {
      ratingCell.style.backgroundColor = "rgba(0, 109, 217, 0.2)";
      reviewCell.style.backgroundColor = "rgba(0, 109, 217, 0.2)";
      userCell.style.backgroundColor = "rgba(0, 109, 217, 0.2)";
      ratingCell.innerHTML = `<svg viewBox="0 0 24 24"><path d="M12,17.5C14.33,17.5 16.3,16.04 17.11,14H6.89C7.69,16.04 9.67,17.5 12,17.5M8.5,11A1.5,1.5 0 0,0 10,9.5A1.5,1.5 0 0,0 8.5,8A1.5,1.5 0 0,0 7,9.5A1.5,1.5 0 0,0 8.5,11M15.5,11A1.5,1.5 0 0,0 17,9.5A1.5,1.5 0 0,0 15.5,8A1.5,1.5 0 0,0 14,9.5A1.5,1.5 0 0,0 15.5,11M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" style="fill: rgb(0, 109, 217);"/></svg>`
    }
    reviewCell.innerHTML = `&NonBreakingSpace;&NonBreakingSpace;&NonBreakingSpace;&NonBreakingSpace;&NonBreakingSpace;&NonBreakingSpace;&NonBreakingSpace;&NonBreakingSpace;&NonBreakingSpace;&NonBreakingSpace;&NonBreakingSpace;&NonBreakingSpace;&NonBreakingSpace;&NonBreakingSpace;&NonBreakingSpace;&NonBreakingSpace;&NonBreakingSpace;&NonBreakingSpace;&NonBreakingSpace;&NonBreakingSpace;&NonBreakingSpace;&NonBreakingSpace;&NonBreakingSpace;&NonBreakingSpace;&NonBreakingSpace;${'~ ' + review}`;
    userCell.innerHTML = `&NonBreakingSpace;&NonBreakingSpace;${userName}`;

    var temprow2 = reviewsTableBody.insertRow(-1);
    temprow2.style.height = "10px";

    document.getElementById("form-rating").reset();
    document.getElementById("review").reset();
    document.getElementById("user-name").reset();
  } else {
    alert("Please fill in all fields.");
  }

}

console.clear();

function CountdownTracker(label, value) {

  var el = document.createElement('span');

  el.className = 'flip-clock__piece';
  el.innerHTML = '<b class="flip-clock__card card2"><b class="card__top"></b><b class="card__bottom"></b><b class="card__back"><b class="card__bottom"></b></b></b>' +
    '<span class="flip-clock__slot">' + label + '</span>';

  this.el = el;

  var top = el.querySelector('.card__top'),
    bottom = el.querySelector('.card__bottom'),
    back = el.querySelector('.card__back'),
    backBottom = el.querySelector('.card__back .card__bottom');

  this.update = function (val) {
    val = ('0' + val).slice(-2);
    if (val !== this.currentValue) {

      if (this.currentValue >= 0) {
        back.setAttribute('data-value', this.currentValue);
        bottom.setAttribute('data-value', this.currentValue);
      }
      this.currentValue = val;
      top.innerText = this.currentValue;
      backBottom.setAttribute('data-value', this.currentValue);

      this.el.classList.remove('flip');
      void this.el.offsetWidth;
      this.el.classList.add('flip');
    }
  }

  this.update(value);
}

function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  return {
    'Total': t,
    'Days': Math.floor(t / (1000 * 60 * 60 * 24)),
    'Hours': Math.floor((t / (1000 * 60 * 60)) % 24),
    'Minutes': Math.floor((t / 1000 / 60) % 60),
    'Seconds': Math.floor((t / 1000) % 60)
  };
}

function getTime() {
  var t = new Date();
  return {
    'Total': t,
    'Hours': t.getHours() % 12,
    'Minutes': t.getMinutes(),
    'Seconds': t.getSeconds()
  };
}

function Clock(countdown, callback) {

  countdown = countdown ? new Date(Date.parse(countdown)) : false;
  callback = callback || function () { };

  var updateFn = countdown ? getTimeRemaining : getTime;

  this.el = document.createElement('div');
  this.el.className = 'flip-clock';

  var trackers = {},
    t = updateFn(countdown),
    key, timeinterval;

  for (key in t) {
    if (key === 'Total') { continue; }
    trackers[key] = new CountdownTracker(key, t[key]);
    this.el.appendChild(trackers[key].el);
  }

  var i = 0;
  function updateClock() {
    timeinterval = requestAnimationFrame(updateClock);

    if (i++ % 10) { return; }

    var t = updateFn(countdown);
    if (t.Total < 0) {
      cancelAnimationFrame(timeinterval);
      for (key in trackers) {
        trackers[key].update(0);
      }
      callback();
      return;
    }

    for (key in trackers) {
      trackers[key].update(t[key]);
    }
  }

  setTimeout(updateClock, 500);
}

var deadline = new Date('June 30, 2023 00:00:00');
var c = new Clock(deadline, function () { alert('countdown complete') });
var flip = document.querySelector(".clock-flip");
flip.appendChild(c.el);



window.addEventListener('load', function() {
  var image = document.getElementById('artist-image');
  var currentWidth = 900;
  var targetWidth = 500;
  var transitionTime = 3000;

  image.style.width = currentWidth + 'px';

  var startTime = performance.now();

  function animate() {
    var elapsed = performance.now() - startTime;
    var progress = Math.min(elapsed / transitionTime, 1);
    var newWidth = currentWidth + (targetWidth - currentWidth) * progress;
    image.style.width = newWidth + 'px';

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
});
