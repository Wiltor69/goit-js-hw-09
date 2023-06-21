import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
    inputEl: document.querySelector('#datetime-picker'),
    startBtnEl: document.querySelector('button[data-start]'),
    dayEl: document.querySelector('.value[data-days]'),
    hoursEl: document.querySelector('.value[data-hours]'),
    minutEl: document.querySelector('.value[data-minutes]'),
    secondEl: document.querySelector('.value[data-seconds]'),
}
refs.startBtnEl.disabled = true;

let currentTime = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        currentTime = selectedDates[0];
        if (currentTime.getTime() < options.defaultDate.getTime()) {
            Notiflix.Report.warning("Please choose a date in the future");
            refs.startBtnEl.disabled = true;
        } else
        {
            refs.startBtnEl.disabled = false;
        }
    console.log(currentTime);
  },
};

const flat = flatpickr('#datetime-picker', options);

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}

function onClick() {
  const selectedData = flat.selectedDates[0];

  currentTime = setInterval(() => {
    const startTime = new Date();
    const deltaTime = selectedData - startTime;
    refs.startBtnEl.disabled = true;

    if (deltaTime < 0) {
      clearInterval(currentTime);
      return;
    }
    updateTime(convertMs(deltaTime));  

  }, 1000);

}

refs.startBtnEl.addEventListener('click', onClick);
    
function updateTime({ days, hours, minutes, seconds }) {
  refs.dayEl.textContent = addLeadingZero(days);
  refs.hoursEl.textContent = addLeadingZero(hours);
  refs.minutEl.textContent = addLeadingZero(minutes);
   refs.secondEl.textContent = addLeadingZero(seconds);
   }



function convertMs(ms) {
  
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
