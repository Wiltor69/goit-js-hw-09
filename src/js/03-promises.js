//import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const refs = {
  formEl: document.querySelector('form'),
  delayEl: document.querySelector('input[name="delay"]'),
  stepEl: document.querySelector('input[name="step"]'),
  amountEl: document.querySelector('input[name="amount"]'),

}

refs.formEl.addEventListener('submit', onSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        // Fulfill
         resolve({ position, delay });
      } else {
        // Reject
         reject({ position, delay });
      }
    }, delay);
  });
}

function onSubmit(e) {
  e.preventDefault();

  let delayVal = Number(refs.delayEl.value);
  const stepVal = Number(refs.stepEl.value);
  const amountVal = Number(refs.amountEl.value);
 

  for (let i = 1; i <= amountVal; i += 1) {
    createPromise(i, delayVal)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    
      delayVal += stepVal;
    
  }
}




