const formElement = document.querySelector('form');
const locationElement = document.querySelector('input');

formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(locationElement.value);
})