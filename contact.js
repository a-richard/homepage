let submitForm = document.querySelector('#submit-form');
let nature = document.querySelector('#inlineFormCustomSelect');
let name = document.querySelector('#inlineFormInputName2');
let message = document.querySelector('#exampleFormControlTextarea1');

submitForm.onclick = function () {
  let yourNature = nature.value;
  let yourName = name.value;
  let yourMessage = message.value;
  if (yourNature === 'choose...' || yourName === '' || yourMessage === '') {
    alert('Please fill out the missing fields');
    return false;
  }
  document.location.href = `mailto:support@myproduct.com?subject=${encodeURIComponent(
    'Hello'
  )}&body=${encodeURIComponent(yourMessage)}${encodeURIComponent(
    '\n'
  )}${encodeURIComponent(yourNature)}${encodeURIComponent(
    ' named '
  )}${encodeURIComponent(yourName)}`;
  return false;
};
