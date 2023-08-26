import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

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

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

document.addEventListener('DOMContentLoaded', function () {
  const startButton = document.querySelector('[data-start]');
  const daysElem = document.querySelector('[data-days]');
  const hoursElem = document.querySelector('[data-hours]');
  const minutesElem = document.querySelector('[data-minutes]');
  const secondsElem = document.querySelector('[data-seconds]');

  flatpickr('#datetime-picker', {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      const selectedDate = selectedDates[0];

      if (selectedDate <= new Date()) {
        Notiflix.Notify.failure('Будь ласка, оберіть дату в майбутньому');
        startButton.disabled = true;
      } else {
        startButton.disabled = false;
      }
    },
  });

  startButton.addEventListener('click', function () {
    const selectedDate = new Date(
      document.querySelector('#datetime-picker').value
    );
    const countdownInterval = setInterval(updateCountdown, 1000);

    updateCountdown();

    function updateCountdown() {
      const currentTime = new Date();
      const difference = selectedDate - currentTime;

      if (difference <= 0) {
        clearInterval(countdownInterval);
        startButton.disabled = true;
        Notiflix.Notify.success('Відлік закінчено!');
        return;
      }

      const { days, hours, minutes, seconds } = convertMs(difference);

      daysElem.textContent = addLeadingZero(days);
      hoursElem.textContent = addLeadingZero(hours);
      minutesElem.textContent = addLeadingZero(minutes);
      secondsElem.textContent = addLeadingZero(seconds);
    }
  });
});

const timerContainer = document.querySelector('.timer');
const timerFields = Array.from(document.querySelectorAll('.field'));

timerContainer.style.display = 'flex';
timerContainer.style.justifyContent = 'center';
timerContainer.style.alignItems = 'center';
timerContainer.style.height = '100vh';
timerContainer.style.fontFamily = 'Arial, sans-serif';
timerContainer.style.fontSize = '2rem';

timerFields.forEach(field => {
  field.style.display = 'flex';
  field.style.flexDirection = 'column';
  field.style.alignItems = 'center';
  field.style.margin = '0 10px';
});

const timerValues = Array.from(document.querySelectorAll('.value'));
const timerLabels = Array.from(document.querySelectorAll('.label'));

timerValues.forEach(value => {
  value.style.fontSize = '3rem';
  value.style.fontWeight = 'bold';
});

timerLabels.forEach(label => {
  label.style.fontSize = '1rem';
});
