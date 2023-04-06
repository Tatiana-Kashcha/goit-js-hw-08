import throttle from 'lodash.throttle';
import '../css/common.css';
import '../css/03-feedback.css';

const formEl = document.querySelector('.feedback-form');
const inputEmail = document.querySelector('.feedback-form input');
const textareaMessage = document.querySelector('.feedback-form textarea');
const STORAGE_KEY = 'feedback-form-state';

formEl.addEventListener('submit', onSubmit);
inputEmail.addEventListener('input', throttle(onEmailInput, 500));
textareaMessage.addEventListener('input', throttle(onTextareaInput, 500));

notEmptyEmail();
notEmptyTextarea();

function onSubmit(event) {
  event.preventDefault();
  const {
    elements: { email, message },
  } = event.currentTarget;

  if (email.value === '' || message.value === '') {
    console.log('Please fill in all the fields!');
    return;
  }
  const user = { email: email.value, message: message.value };

  console.log(user);
  event.currentTarget.reset();
}

function onTextareaInput(evt) {
  const messageText = evt.target.value;

  localStorage.setItem(STORAGE_KEY, messageText);
}

function onEmailInput(evt) {
  const inputText = evt.target.value;

  localStorage.setItem(STORAGE_KEY, inputText);
}

function notEmptyEmail() {
  const savedEmail = localStorage.getItem(STORAGE_KEY);
  if (savedEmail) {
    console.log(savedEmail);
    inputEmail.value = savedEmail;
    console.log(inputEmail.value);
  }
}

function notEmptyTextarea() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);
  if (savedMessage) {
    console.log(savedMessage);
    textareaMessage.value = savedMessage;
    console.log(textareaMessage.value);
  }
}
