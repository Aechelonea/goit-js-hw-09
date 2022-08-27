import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const dateInput = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const dateDays = document.querySelector('[data-days]');
const dateHours = document.querySelector('[data-hours]');
const dateMinutes = document.querySelector('[data-minutes]');
const dateSeconds = document.querySelector('[data-seconds]');
let intervalId = null;
let inputDate = new Date();
let notifyOptions = {
  timeout: 2000,
  fontSize: '20px',
  width: '400px',
};
startButton.disabled = true;

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function handleInputDate(selectedDate) {
  clearInterval(intervalId);
  if (selectedDate < new Date()) {
    startButton.disabled = true;
    Notiflix.Notify.failure(
      'Please choose a date in the future',
      notifyOptions
    );
  }
  if (selectedDate >= new Date()) {
    startButton.disabled = false;
    dateDays.textContent = '00';
    dateHours.textContent = '00';
    dateMinutes.textContent = '00';
    dateSeconds.textContent = '00';
    inputDate = selectedDate;
  }
}

function padTime(value) {
  return value.padStart(2, '0');
}

startButton.addEventListener('click', () => {
  startCountdown(inputDate);
});

function startCountdown(selectedDate) {
  startButton.disabled = false;
  let dateObj = convertMs(selectedDate - new Date());
  dateDays.textContent = padTime(dateObj.days.toString());
  dateHours.textContent = padTime(dateObj.hours.toString());
  dateMinutes.textContent = padTime(dateObj.minutes.toString());
  dateSeconds.textContent = padTime(dateObj.seconds.toString());
  intervalId = setInterval(() => {
    if (selectedDate - new Date() > 0) {
      let dateObj = convertMs(selectedDate - new Date());
      dateDays.textContent = padTime(dateObj.days.toString());
      dateHours.textContent = padTime(dateObj.hours.toString());
      dateMinutes.textContent = padTime(dateObj.minutes.toString());
      dateSeconds.textContent = padTime(dateObj.seconds.toString());
    } else {
      Notiflix.Notify.success('Finished!', notifyOptions);
      clearInterval(intervalId);
    }
  }, 1000);
}

flatpickr(dateInput, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    handleInputDate(selectedDates[0]);
  },
});
