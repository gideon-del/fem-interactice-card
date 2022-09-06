"use strict";
//Input Eleent
const inputName = document.querySelector("#name");
const inputNumber = document.querySelector("#number");
const inputMonth = document.querySelector(".month");
const inputYear = document.querySelector(".year");
const inputCvc = document.querySelector("#cvc");

//Error Element
const numberError = document.querySelector(".number-error");
const dateError = document.querySelector(".date-error");
const cvcError = document.querySelector(".cvc-error");

//Form and all inputs
const form = document.querySelector("form");
const inputs = document.querySelectorAll("input");

//Card Ellements
const cardNum = document.querySelector(".card-num");
const date = document.querySelector("#card-date");
const cvcEl = document.querySelector(".cv");
const errorEl = document.querySelectorAll(".error");
const nameEl = document.querySelector("#card-name");
const successEl = document.querySelector(".success");
const formContainer = document.querySelector(".container");

let Name;
let number;
let month;
let year;
let cvc;
let error = false;
console.log(successEl);
const displayError = (err, input, text) => {
  err.textContent = `${text}`;
  err.classList.remove("hidden");
  console.log("removed hiddeden");
  input.classList.add("red");
};
const checkNumber = (input) => {
  const transformedNum = +input.value
    .split("")
    .filter((x) => x !== " ")
    .join("");
  console.log(`${transformedNum}`.length);
  if (!Number.isFinite(transformedNum)) {
    error = true;
    displayError(numberError, input, `Wrong format, numbers only`);
    if (!error) error = true;
  }
  if (input.value.length < 12) {
    error = true;
    displayError(numberError, input, `Must be 12 digits long`);
    if (!error) error = true;
  }
  if (error) return;
  let str = `${transformedNum}`.split("");
  let newstr = str.reduce((acc, val, i) => {
    if (i % 4 == 0) {
      return `${acc} ${val}`;
    }
    return `${acc}${val}`;
  }, "");
  number = `${newstr}`;
  error = false;
};

const checkDates = (el, err, global) => {
  console.log(el.value == "");
  if (el.value === "") {
    displayError(err, el, `Can't be blank`);
    if (!error) error = true;
  }
  if (error) return;
  if (global == "month") {
    month = `${el.value}`.padStart(2, 0);
  }
  if (global == "year") {
    year = `${el.value}`;
  }

  console.log(global);
  error = false;
};
const checkCvc = (el, err) => {
  if (el.value == "") {
    error = true;
    displayError(err, el, `Can't be blank`);
    if (!error) error = true;
  }
  if (error) return;
  cvc = `${el.value}`;
};
inputs.forEach((input) =>
  input.addEventListener("input", function () {
    input.classList.remove("red");
    error = false;
    errorEl.forEach((err) => err.classList.add("hidden"));
  })
);

form.addEventListener("submit", function (e) {
  e.preventDefault();
  checkNumber(inputNumber);
  checkDates(inputMonth, dateError, "month");
  checkDates(inputYear, dateError, "year");
  checkCvc(inputCvc, cvcError);
  Name = inputName.value.toUpperCase();
  if (error) return;
  nameEl.textContent = `${Name}`;
  cardNum.textContent = number;
  date.textContent = `${month}/${year}`;
  cvcEl.textContent = cvc;
  inputCvc.value =
    inputMonth.value =
    inputName.value =
    inputNumber.value =
    inputYear.value =
      "";
  formContainer.classList.add("hide-container");
  successEl.classList.remove("hide-container");
});
