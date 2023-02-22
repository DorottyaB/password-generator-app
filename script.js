const copyBtn = document.querySelector('.copy-btn');
const slider = document.getElementById('length');
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const form = document.querySelector('form');
const bars = document.querySelectorAll('.bar');
const passwordOutput = document.querySelector('h2');
const tooltip = document.querySelector('.tooltip');

const values = {
  uppercase: 'A-Z',
  lowercase: 'a-z',
  numbers: '0-9',
  symbols: '-!@#$%^&*_+~=',
};
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-!@#$%^&*_+~=';

let pattern = '';
let charLength = 0;
let password = '';

function setStrength() {
  let strength = '';
  let rating = 1;
  const array = Array.from(checkboxes).filter(checkbox => checkbox.checked);

  if (array.length === 1 || charLength < 8) {
    strength = 'very weak';
    rating = 1;
  } else if (array.length === 2 && charLength > 11) {
    strength = 'medium';
    rating = 3;
  } else if (array.length === 2) {
    strength = 'weak';
    rating = 2;
  } else if (array.length === 3 && charLength > 11) {
    strength = 'strong';
    rating = 4;
  } else if (array.length === 3 && charLength > 7) {
    strength = 'medium';
    rating = 3;
  } else if (array.length === 4 && charLength > 11) {
    strength = 'strong';
    rating = 4;
  } else if (array.length === 4 && charLength > 7) {
    strength = 'medium';
    rating = 3;
  }

  for (let i = 0; i < rating; i++) {
    bars[i].classList.add('filled');
  }

  document.getElementById('strength').textContent = strength;
}

slider.addEventListener('input', event => {
  charLength = event.target.value;
  document.querySelector('.length').textContent = charLength;
  tooltip.classList.remove('visible');
});

checkboxes.forEach(checkbox =>
  checkbox.addEventListener('change', () => {
    tooltip.classList.remove('visible');
    if (checkbox.checked) {
      for (const regexp in values) {
        if (checkbox.id == regexp) {
          pattern += values[regexp];
        }
      }
    } else {
      for (const regexp in values) {
        if (checkbox.id == regexp) {
          pattern = pattern.replace(values[regexp], '');
        }
      }
    }
  })
);

form.addEventListener('submit', e => {
  e.preventDefault();
  if (charLength < 1) {
    tooltip.classList.add('visible');
    tooltip.textContent = 'Character length must be greater than 0';
    return;
  }
  if (!pattern.length) {
    tooltip.classList.add('visible');
    tooltip.textContent = 'Select at least 1 character set';
    return;
  }
  password = '';
  bars.forEach(bar => bar.classList.remove('filled'));
  const regexp = new RegExp(`[${pattern}]{${charLength}}`, 'g');
  const matchingChars = chars.match(regexp).join('');
  for (let i = 0; i < charLength; i++) {
    const randomNumber = Math.floor(Math.random() * matchingChars.length);
    password += matchingChars.substring(randomNumber, randomNumber + 1);
  }
  passwordOutput.classList.remove('placeholder');
  passwordOutput.textContent = password;
  setStrength();
});

copyBtn.addEventListener('click', () => {
  if (!password.length) {
    return;
  }
  navigator.clipboard.writeText(passwordOutput.textContent);
  const alert = document.querySelector('.alert');
  alert.classList.add('visible');
  setTimeout(() => {
    alert.classList.remove('visible');
  }, 3000);
});
