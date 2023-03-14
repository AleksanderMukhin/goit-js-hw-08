import throttle from "lodash.throttle";

const onForm = document.querySelector('.feedback-form');
const email = document.querySelector('input');
const textarea = document.querySelector('textarea');
const STORAG_KEY = 'feedback-form-state'

onForm.addEventListener('submit', onFormSubmit);
textarea.addEventListener('input', throttle(onFormInput, 1000));

const formData = {};

populateTextarea();

function onFormSubmit(evt) {
  evt.preventDefault();
  evt.currentTarget.reset();
  localStorage.removeItem(STORAG_KEY);
};

function onFormInput(evt) {
  const messaga = evt.target.value;
  localStorage.setItem(STORAG_KEY, messaga);
};

function populateTextarea() {
  const savedMessage = localStorage.getItem(STORAG_KEY);

  if (savedMessage) {
    textarea.value = savedMessage;
  }
};