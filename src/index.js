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
let userAvailabilityContainer = document.getElementById('user-availability-container');
let userRadio = document.querySelectorAll('user-radio');
let userFilter = document.getElementById('user-filter');
let radioSingle = document.getElementById('radio-single');
let radioJunior = document.getElementById('radio-junior');
let radioResidential = document.getElementById('radio-residential');
let resetBtn = document.getElementById('reset-btn');


window.onload = fetchAllData();
// --------- This is event listener wanted for production -------
// submitBtn.addEventListener('click', verifyLogin);
// --------------------------------------------------------------
submitBtn.addEventListener('click', displayUserDashboard); // Just for dev mode
userCalendar.addEventListener('change', findRooms);
userFilter.addEventListener('click', findRooms);
// resetBtn.addEventListener('click', resetForm);


function fetchAllData() {
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
  displayRooms(hotelOperation.findAvailableRooms(today));
  // TODO - add styles for that Book A Room nav looks highlighted
}

function displayRooms(roomsToDisplay) {
  userAvailabilityContainer.innerHTML = '';
  roomsToDisplay.forEach(room => {
    let roomCardHtml = createRoomCard(room)
    userAvailabilityContainer.insertAdjacentHTML('beforeend', roomCardHtml);
  })
}

function createRoomCard(room) {
  return `<article class="flex-row rooms-card">
    <section class="flex-column" id="room-img-box">
      <img class="room-card-photo" src=${room.src} alt="">
    </section>
    <section class="flex-column" id="room-card-details">
      <h6>${room.roomType}</h6>
      <p>${determineBedHtml(room)}<br>
      <p>Bidet: ${determineBidet(room)}</p>
    </section>
    <section class="flex-column" id="room-card-price">
      <article class="flex-column card-inner-contents">
        <h3>${room.costPerNight}</h3>
        <p>Per night</p>
        <button id="card-btn-book-room">Book Room</button>
      </article>
    </section>
  </article>`
}

function determineBedHtml(room) {
  if (room.numBeds > 1) {
    return `This room boasts ${room.numBeds} ${room.bedSize} beds.`;
  }
  return `This room boasts ${room.numBeds} ${room.bedSize} bed.`
}

function determineBidet(room) {
  if (room.bidet) {
    return `Yes`
  }
  return `No`
}

function determineSelection() {
  if (radioSingle.checked) {return 'single room'}
  else if (radioJunior.checked) {
    return 'junior suite';
  } else if (radioResidential.checked) {
    return 'residential suite';
  }
  return false;
}

function findRooms() {
  let filteredByDate = filterRoomsByDate();
  let radioFilterValue = determineSelection();
  if (radioFilterValue !== false) {
    let roomsToDisplay = hotelOperation.filterByRoomType(radioFilterValue, filteredByDate)
    return displayRooms(roomsToDisplay);
  }
  return displayRooms(filteredByDate)
}

function filterRoomsByDate() {
  let formatDate = userCalendar.value.split('-');
  let formattedDate = formatDate.join('/');

  let roomsToDisplay = hotelOperation.findAvailableRooms(formattedDate);
  return roomsToDisplay;

}
