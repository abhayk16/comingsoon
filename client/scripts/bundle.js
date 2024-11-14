var yourDate = new Date("2025-01-01T00:00:00").getTime();

function updateCountdown() {
    var now = new Date().getTime();
    var distance = yourDate - now;

    if (distance < 0) {
        document.querySelector('.days').textContent = "00";
        document.querySelector('.hours').textContent = "00";
        document.querySelector('.minutes').textContent = "00";
        document.querySelector('.seconds').textContent = "00";
        return;
    }

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.querySelector('.days').textContent = days < 10 ? "0" + days : days;
    document.querySelector('.hours').textContent = hours < 10 ? "0" + hours : hours;
    document.querySelector('.minutes').textContent = minutes < 10 ? "0" + minutes : minutes;
    document.querySelector('.seconds').textContent = seconds < 10 ? "0" + seconds : seconds;
}

setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call to display values immediately
