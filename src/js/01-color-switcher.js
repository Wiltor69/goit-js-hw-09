

const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
}

let timId = null;

refs.startBtn.addEventListener('click', () => {
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
    timId = setInterval(() => {
     document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
});

refs.stopBtn.addEventListener('click', () => {
    refs.startBtn.disabled = false;
    refs.stopBtn.disabled = true;
    clearInterval(timId);
});


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
