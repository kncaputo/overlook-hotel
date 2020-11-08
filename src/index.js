import './css/base.scss';
// import {usernameInput, passwordInput, submitBtn} from './domElements.js';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'
import './images/5.jpg';

import apiCalls from './apiCalls';
import moment from 'moment';
import HotelOperation from './HotelOperation';

let hotelOperation;
let currentUser;
let today = moment().format('YYYY/MM/DD');
let todayDashes = moment().format('YYYY-MM-DD');

let availabilityBox = document.getElementById('availability-box');
let bookRoomNav = document.getElementById('book-room-nav');
let managerClearBtn = document.getElementById('manager-clear-btn');
let managerDashboard = document.getElementById('manager-dashboard');
let managerResultsContainer = document.getElementById('manager-results-container');
let managerSearchBtn = document.getElementById('manager-search-btn');
let modal = document.getElementById('modal');
let myBookingsContainer = document.getElementById('my-bookings-container');
let myBookingsNav = document.getElementById('my-bookings-nav');
let passwordInput = document.getElementById('password-input');
let radioJunior = document.getElementById('radio-junior');
let radioResidential = document.getElementById('radio-residential');
let radioSingle = document.getElementById('radio-single');
let signInPage = document.getElementById('sign-in-page');
let signOutNav = document.querySelector('.sign-out-nav');
let submitBtn = document.getElementById('submit-btn');
let userAvailabilityContainer = document.getElementById('user-availability-container');
let userBookingsContainer = document.getElementById('user-bookings-container');
let userCalendar = document.getElementById('user-calendar');
let userDashboard = document.getElementById('user-dashboard');
let userDashboardContainer = document.getElementById('user-dashboard-container');
let userFilter = document.getElementById('user-filter');
let usernameInput = document.getElementById('username-input');
let userRadio = document.querySelectorAll('user-radio');
let userResetBtn = document.getElementById('user-reset-btn');
let userWelcome = document.querySelector('.user-welcome');
let managerStatsCal = document.getElementById('manager-stats-calendar');
let managerBookingForm = document.getElementById('manager-booking-form');

window.onload = fetchAllData();
// --------- This is event listener wanted for production -------
// submitBtn.addEventListener('click', verifyLogin);
// --------------------------------------------------------------
// submitBtn.addEventListener('click', displayUserDashboard); // Just for dev mode
submitBtn.addEventListener('click', displayManagerDashboard); // Just for dev mode

bookRoomNav.addEventListener('click', displayBookRoomDash);
managerClearBtn.addEventListener('click', clearSearchForm);
managerSearchBtn.addEventListener('click', searchUserBookings);
myBookingsNav.addEventListener('click', displayMyBookingsDash);
signOutNav.addEventListener('click', signOut);
userCalendar.addEventListener('change', findRooms);
userFilter.addEventListener('click', findRooms);
userResetBtn.addEventListener('click', resetRadioForm);
managerStatsCal.addEventListener('change', updateStats);
managerResultsContainer.addEventListener('click', () => {
  deleteBooking(event);
});
userAvailabilityContainer.addEventListener('click', () => {
  bookRoom(event);
});

function fetchAllData() {
  let roomsPromise = apiCalls.fetchData('rooms');
  let bookingsPromise = apiCalls.fetchData('bookings');
  let usersPromise = apiCalls.fetchData('users');

  Promise.all([roomsPromise, bookingsPromise, usersPromise])
  .then(data => hotelOperation = new HotelOperation(data[0], data[1], data[2]))
  .then(() => loadPage())
  .catch(err => console.log(err))
}

function loadPage() {
  hotelOperation.start()
}

function verifyLogin() {
  event.preventDefault()
  if (usernameInput.value === 'manager') {
    if (passwordInput.value === 'overlook2020') {
      currentUser = {name: 'Manager'};
      usernameInput.value = "";
      passwordInput.value = "";
      return displayManagerDashboard();
    }
    deliverLoginError();
  }

  let attemptedUser = hotelOperation.usersRecord.find(user => {
    return user.username === usernameInput.value
  });

  if (attemptedUser !== undefined) {
    verifyPassword(attemptedUser);
  }
}

function displayManagerDashboard() {
  managerStatsCal.setAttribute('value', `${todayDashes}`);
  managerStatsCal.setAttribute('max', `${todayDashes}`);
  updateStats();
  signInPage.classList.add('hidden');
  managerDashboard.classList.remove('hidden');

  displayRoomsToUserAvailability(hotelOperation.findAvailableRooms(today));
}

function verifyPassword(attemptedUser) {
  console.log('Verifying Password');
  if (passwordInput.value === attemptedUser.password) {
    currentUser = attemptedUser;
    usernameInput.value = "";
    passwordInput.value = "";
    displayUserDashboard()
  }
  deliverLoginError()
}

function deliverLoginError() {
  console.log('Login Error');
}

function displayUserDashboard() {
  // ------ Just for dev mode
  if (!hotelOperation.usersRecord[0]) {
    currentUser = {name: 'User'};
  } else {
    currentUser = hotelOperation.usersRecord[0];
  }

  userCalendar.setAttribute('value', `${todayDashes}`);
  userCalendar.setAttribute('min', `${todayDashes}`);
  signInPage.classList.add('hidden');
  userDashboard.classList.remove('hidden');
  myBookingsContainer.classList.add('hidden');
  userWelcome.innerHTML = `Welcome back, ${currentUser.name}`;
  displayRoomsToUserAvailability(hotelOperation.findAvailableRooms(today));
  // TODO - add styles for that Book A Room nav looks highlighted
}

function updateStats() {
  console.log("calendar value: ", managerStatsCal.value)
  let date = formatDateForStats()
  console.log("date", date)
  console.log("hotelOperation.getTotalRevenue(date).toFixed(2)", hotelOperation.getTotalRevenue(date).toFixed(2))
  let html = `<p class="manager-stats"><strong>Total Available Rooms:</strong> ${hotelOperation.getNumOfAvailable(date)}</p>
  <p class="manager-stats"><strong>Total Revenue for Date:</strong> ${hotelOperation.getTotalRevenue(date).toFixed(2)}</p>
  <p class="manager-stats"><strong>Percentage Occupied:</strong> ${hotelOperation.getPercentageOccupied(date)}%</p>`
  document.getElementById('manager-stats-container').innerHTML = '';
  document.getElementById('manager-stats-container').insertAdjacentHTML('afterbegin', html);
}

function displayBookRoomDash() {
  availabilityBox.classList.remove('hidden');
  userDashboardContainer.classList.remove('hidden');
  myBookingsContainer.classList.add('hidden');
}

function displayRoomsToUserAvailability(roomsToDisplay) {
  userAvailabilityContainer.innerHTML = '';
  roomsToDisplay.forEach(room => {
    let roomCardHtml = createRoomCard(room)
    userAvailabilityContainer.insertAdjacentHTML('beforeend', roomCardHtml);
  })
}

function createRoomCard(room) {
  return `<article class="flex-row rooms-card" id="container${room.number}">
    <section class="flex-column room-img-box">
      <img class="room-card-photo" src="./images/5.jpg" alt="${room.roomType}">
    </section>
    <section class="flex-column room-card-details">
      <h3>${room.roomType.toUpperCase()}</h3>
      <p class="primary-details-text">Room Number ${room.number}</p>
      <p class="primary-details-text">${determineBedHtml(room)}<br>
      <p class="primary-details-text">Bidet: ${determineBidet(room)}</p>
    </section>
    <section class="flex-column room-card-price">
      <article class="flex-column card-inner-contents">
        <h3>${room.costPerNight}</h3>
        <p>Per night</p>
        <button class="card-btn-book-room" id="${room.number}">Book Room</button>
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

function updateBookings() {
  let bookingsPromise = apiCalls.fetchData('bookings');

  Promise.all([bookingsPromise])
  .then(data => hotelOperation.bookingsData = data[0])
  .then(() => hotelOperation.createBookingsRecord())
  .catch(err => console.log(err))
}

function bookRoom(event) {
  // modal.classList.remove('hidden');
  console.log("Pre Post", hotelOperation.bookingsRecord.length)
  let bookingDate = getFormatDate();
  let onSuccess = () => {
    removeRoomBooked(event)
    console.log("Post Post", hotelOperation.bookingsRecord.length)
  }

  let roomToBook = hotelOperation.roomsRecord.find(room => {
    return room.number == event.target.id;
  })

  let bookingData = {
    userID: currentUser.id,
    date: bookingDate,
    roomNumber: roomToBook.number
  }
  apiCalls.postData(bookingData, onSuccess)
  updateBookings();
}

function removeRoomBooked(event) {
  let roomToDeleteId = event.target.id;
  document.getElementById(`container${roomToDeleteId}`).remove();
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
    return displayRoomsToUserAvailability(roomsToDisplay);
  }
  return displayRoomsToUserAvailability(filteredByDate)
}

// --------------- DATE FORMATTING ---------------------
function getFormatDate() {
  if (!userCalendar.value) {
    return today;
  } else {
    let formatDate = userCalendar.value.split('-');
    let formattedDate = formatDate.join('/');
    return formattedDate;
  }
}

// function formatTodayCalendarDate() {
//   let formatDate = today.split('/');
//   let formattedDate = formatDate.join('-');
//   return formattedDate;
// }

function formatDateForStats() {
  if (!managerStatsCal.value) {
    return today;
  } else {
    let formatDate = managerStatsCal.value.split('-');
    let formattedDate = formatDate.join('/');
    return formattedDate;
  }
}
// -----------------------------------

function filterRoomsByDate() {
  let date = getFormatDate();

  let roomsToDisplay = hotelOperation.findAvailableRooms(date);
  return roomsToDisplay;
}

function resetRadioForm() {
  radioSingle.checked=false;
  radioJunior.checked=false;
  radioResidential.checked=false;
  findRooms();
}

function displayMyBookingsDash() {
  availabilityBox.classList.add('hidden');
  userDashboardContainer.classList.add('hidden');
  myBookingsContainer.classList.remove('hidden');
  displayRoomsToMyBookings();
}

function displayRoomsToMyBookings() {
  userBookingsContainer.innerHTML = '';
  let userBookings = hotelOperation.filterBookingsByName(currentUser.name);
  let sortedBookings = sortBookingsByDate(userBookings)
  sortedBookings.forEach(booking => {
    let roomCardHtml = createBookingCard(booking)
    userBookingsContainer.insertAdjacentHTML('beforeend', roomCardHtml);
  })
}

function createBookingCard(booking) {
  let roomBooked = hotelOperation.getRoomDetails(booking.roomNumber);

  return `<article class="flex-row rooms-card" id="${booking.id}">
    <section class="flex-column room-img-box">
      <img class="room-card-photo" src=${roomBooked.src} alt="">
    </section>
    <section class="flex-column room-card-details">
      <h3>${booking.date}</h3>
      <p class="primary-details-text">${roomBooked.roomType.toUpperCase()}</p>
      <p class="primary-details-text">Booking id: ${booking.id}</p>
      <p class="secondary-details-text">${determineBedHtml(roomBooked)}<br>
      <p class="secondary-details-text">Bidet: ${determineBidet(roomBooked)}</p>
    </section>
    <section class="flex-column room-card-price">
      <article class="flex-column card-inner-contents">
        <h3>${roomBooked.costPerNight}</h3>
        <p>Per night</p>
      </article>
    </section>
  </article>`
}

function sortBookingsByDate(bookings) {
  return bookings.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
}

function searchUserBookings() {
  let searchInput = document.getElementById('search-input').value;
  let userBookings = hotelOperation.filterBookingsByName(searchInput);
  let sortedBookings = sortBookingsByDate(userBookings);
  managerBookingForm.classList.remove('hidden');
  displaySearchedBookings(sortedBookings);
}

function displaySearchedBookings(bookings) {
  managerResultsContainer.innerHTML = '';
  bookings.forEach(booking => {
    let bookingCard = createManagerBookingCard(booking);
    managerResultsContainer.insertAdjacentHTML('beforeend', bookingCard);
  });
}

function createManagerBookingCard(booking) {
  let roomBooked;
  if (booking.roomNumber > 25) {
    roomBooked = {
      number: 26,
      roomType: 'honeymoon suite',
      id: booking.id,
      bidet: true,
      bedSize: 'king',
      numBeds: 1,
      costPerNight: 599,
      src: './images/honeymoon-suite.jpg'
    }
  } else {
      roomBooked = hotelOperation.getRoomDetails(booking.roomNumber);
  }

  return `<article class="flex-row rooms-card" id="${booking.id}">
    <section class="flex-column room-card-details">
      <h3>${booking.date}</h3>
      <p class="primary-details-text">${roomBooked.roomType.toUpperCase()}</p>
      <p class="primary-details-text">Booking id: ${booking.id}</p>
      <p class="secondary-details-text">${roomBooked.numBeds} ${roomBooked.bedSize} bed/s<br>
      <p class="secondary-details-text">Bidet: ${determineBidet(roomBooked)}</p>
    </section>
    <section class="flex-column room-card-price">
      <article class="flex-column card-inner-contents">
        <h3>${roomBooked.costPerNight}</h3>
        <p>Per night</p>
        ${determineFutureBooking(booking)}
      </article>
    </section>
  </article>`
}

function determineFutureBooking(booking) {
  if (booking.date > today) {
    return `<button class="btn" id="${booking.id}">Delete Booking</button>`
  } else {
    return '';
  }
}

function deleteBooking(event) {
  let bookingId = event.target.id;
  console.log(bookingId)
  let deleteRequest;

  let onSuccess = () => {
    removeDeletedBooking(bookingId)
  }
  let parsedInt = parseInt(bookingId);
  if (typeof parsedInt === 'number') {
    deleteRequest = {
      id: parsedInt
    }
  } else {
    deleteRequest = {
      id: bookingId
    }
  }

  apiCalls.deleteData(deleteRequest, onSuccess);
  updateBookings();
  document.getElementById(`${bookingId}`).remove();
}
//
// function removeDeletedBooking(bookingId) {
//   document.getElementById(`${bookingId}`).remove();
// }

function clearSearchForm() {
  searchInput.value = '';
  managerBookingForm.classList.add('hidden');
}

function signOut() {
  currentUser = "";
  userDashboard.classList.add('hidden');
  signInPage.classList.remove('hidden')
}
