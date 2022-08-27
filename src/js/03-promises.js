import Notiflix from 'notiflix';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}

const form = document.querySelector('.form');

form.addEventListener('submit', e => {
  e.preventDefault();
  const formData = [...new FormData(e.target).entries()];
  const formDataObj = {};
  formData.forEach(inputField => {
    formDataObj[inputField[0]] = parseInt(inputField[1]);
  });

  if (formData.length === 3) {
    for (let i = 0; i < formDataObj.amount; i++) {
      let currentAddedStep = i * formDataObj.step;
      createPromise(i + 1, formDataObj.delay + currentAddedStep)
        .then(value => Notiflix.Notify.success(value))
        .catch(error => Notiflix.Notify.failure(error));
    }
  }
});
