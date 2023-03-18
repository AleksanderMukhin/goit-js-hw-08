import throttle from "lodash.throttle";

const onForm = document.querySelector('.feedback-form');
const email = document.querySelector('input');
const textarea = document.querySelector('textarea');
const STORAGE_KEY = 'feedback-form-state'

onForm.addEventListener('submit', onFormSubmit);
onForm.addEventListener('input', throttle(onFormInput, 1000));

let formData = {};

populateTextarea();

// При отправке формы очищается пoля и хранилище
function onFormSubmit(evt) {
  evt.preventDefault();

  if (!email.value || !textarea.value) {
   return alert ("Please fill in all the fields!");
  } 

  // выводим в консоль
  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));

  // чистим хранилище
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem('email');
   // чистим пoля
  evt.currentTarget.reset();
};

// В объект форм дата добавляет ключ с названием поля и  
// присваивает ему значение, то что водится в это поле
function onFormInput(evt) {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  if (evt.target.name === 'email') {
    localStorage.setItem('email', evt.target.value);
  }
};

// Сохраняет введённый текст и вставляет после перезагрузки страницы
function populateTextarea() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);
  if (savedMessage) {
    const savedData = JSON.parse(savedMessage);
    if (savedData.email) {
      email.value = savedData.email;
    }
    if (savedData.message) {
      textarea.value = savedData.message;
    }
    formData = savedData;
  }
};