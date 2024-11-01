let time = 300;
const timer = document.getElementById('timer');

const countdown = setInterval(() => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timer.innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    if (time-- <= 0) clearInterval(countdown);
}, 1000);
