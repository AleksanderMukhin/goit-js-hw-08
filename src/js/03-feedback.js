import throttle from "lodash.throttle";

const onForm = document.querySelector('.feedback-form');
const email = document.querySelector('input');
const textarea = document.querySelector('textarea');
const STORAG_KEY = 'feedback-form-state'

onForm.addEventListener('submit', onFormSubmit);
onForm.addEventListener('input', throttle(onFormInput, 1000));

const formData = {};

populateTextarea();

function onFormSubmit(evt) {
  evt.preventDefault();
  evt.currentTarget.reset();
  localStorage.removeItem(STORAG_KEY);
};

// В объект форм дата добавляет ключ с названием поля и  
// присваивает ему значение, то что водится в это поле
function onFormInput(evt) {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(STORAG_KEY, JSON.stringify(formData));
};

// Сохраняет введённый текст и вставляет после перезагрузки страницы
function populateTextarea() {
  const savedMessage = localStorage.getItem(STORAG_KEY);
  const savedData = JSON.parse(savedMessage);
  
  if (savedMessage) {
    textarea.value = savedData.message;
    email.value = savedData.email;
  }
};