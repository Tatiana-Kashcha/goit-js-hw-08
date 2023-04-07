import throttle from 'lodash.throttle';
import '../css/common.css';
import '../css/03-feedback.css';

const formEl = document.querySelector('.feedback-form');
const inputEmail = document.querySelector('.feedback-form input');
const textareaMessage = document.querySelector('.feedback-form textarea');
const STORAGE_KEY = 'feedback-form-state';
const formData = {};

formEl.addEventListener('submit', onSubmit);
formEl.addEventListener('input', throttle(onFormInput, 500));

notEmptyForm();

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
  localStorage.removeItem(STORAGE_KEY);
}

function onFormInput(evt) {
  formData[evt.target.name] = evt.target.value;
  const formDataStorage = JSON.stringify(formData);
  localStorage.setItem(STORAGE_KEY, formDataStorage);

  console.log(formData);
}

function notEmptyForm() {
  const savedValue = localStorage.getItem(STORAGE_KEY);
  if (savedValue) {
    const setValueForm = JSON.parse(savedValue);

    if (setValueForm.email) {
      inputEmail.value = setValueForm.email;
    } else {
      inputEmail.value = ''; // бо інакше там undefined прописується, а це мене бісить
    }

    if (setValueForm.message) {
      textareaMessage.value = setValueForm.message;
    } else {
      textareaMessage.value = ''; // бо інакше там undefined прописується, а це мене бісить
    }
  }
}
