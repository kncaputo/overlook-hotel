import './css/base.scss';
// import {usernameInput, passwordInput, submitBtn} from './domElements.js';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'

// import apiCalls from './apiCalls';
import moment from 'moment';
import HotelOperation from './HotelOperation';

let hotelOperation;
let today = moment().format('YYYY/MM/DD');

let usernameInput = document.getElementById('username-input');
let passwordInput = document.getElementById('password-input');
let submitBtn = document.getElementById('submit-btn');
let signInHeader = document.getElementById('sign-in-header')
let signInContainter = document.getElementById('sign-in-container');
let userDashboard = document.getElementById('user-dashboard');
let userCalendar = document.getElementById('user-calendar');

window.onload = fetchAllData();
// --------- This is event listener wanted for production -------
// submitBtn.addEventListener('click', verifyLogin);
// --------------------------------------------------------------
submitBtn.addEventListener('click', displayUserDashboard); // Just for dev mode
userCalendar.addEventListener('change', displayFilteredByDate);


function fetchAllData() {
  // let roomsPromise = apiCalls.fetchData('rooms');
  // let bookingsPromise = apiCalls.fetchData('bookings');
  // let usersPromise = apiCalls.fetchData('users');

  let roomsPromise = fetch(`https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms`)
    .then(response => response.json())
    .then(data => data.rooms)
    .catch(err => console.log(err))
  let bookingsPromise = fetch(`https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings`)
    .then(response => response.json())
    .then(data => data.bookings)
    .catch(err => console.log(err))
  let usersPromise = fetch(`https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users`)
    .then(response => response.json())
    .then(data => data.users)
    .catch(err => console.log(err))
  hotelOperation = new HotelOperation();

  Promise.all([roomsPromise, bookingsPromise, usersPromise])
    .then(data => hotelOperation = new HotelOperation(data[0], data[1], data[2]))
    .then(() => loadPage())
    .catch(err => console.log(`Sorry! Data cannot be loaded at this time ${err}`))
}

function loadPage() {
  hotelOperation.start()
}

function verifyLogin() {
  event.preventDefault()

  let attemptedUser = hotelOperation.usersRecord.find(user => {
    return user.username === usernameInput.value
  });
  if (attemptedUser !== undefined) {
    if (passwordInput.value === attemptedUser.password) {
      return displayUserDashboard();
    }
    deliverLoginError();
  }
}

function verifyPassword(currentUser) {
  console.log('Verifying Password');
  passwordInput.value === currentUser.password ? displayUserDashboard() : deliverLoginError()
}

function deliverLoginError() {
  console.log('Login Error');
}

function displayUserDashboard() {
  console.log('Display Dash')
  signInHeader.classList.add('hidden');
  signInContainter.classList.add('hidden');
  userDashboard.classList.remove('hidden');
  displayFilteredByDate(today);
  // TODO - add styles for that Book A Room nav looks highlighted
}
function displayFilteredByDate(date) {

}
