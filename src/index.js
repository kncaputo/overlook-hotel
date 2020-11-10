import './css/base.scss';
// import {usernameInput, passwordInput, submitBtn} from './domElements.js';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'
import './images/1.jpg';
import './images/2.jpg';
import './images/3.jpg';
import './images/4.jpg';
import './images/5.jpg';
import './images/6.jpg';
import './images/7.jpg';
import './images/8.jpg';
import './images/9.jpg';
import './images/10.jpg';
import './images/11.jpg';
import './images/12.jpg';
import './images/13.jpg';
import './images/14.jpg';
import './images/15.jpg';
import './images/16.jpg';
import './images/17.jpg';
import './images/18.jpg';
import './images/19.jpg';
import './images/20.jpg';
import './images/21.jpg';
import './images/22.jpg';
import './images/23.jpg';
import './images/24.jpg';
import './images/25.jpg';

import apiCalls from './apiCalls';
import moment from 'moment';
import HotelOperation from './HotelOperation';

let hotelOperation;
let currentUser;
let today = moment().format('YYYY/MM/DD');
let todayDashes = moment().format('YYYY-MM-DD');

let availabilityBox = document.getElementById('availability-box');
let bookRoomNav = document.getElementById('book-room-nav');
let customersBookings = document.getElementById('customers-bookings');
let managerBookingCal = document.getElementById('manager-booking-cal');
let managerBookingForm = document.getElementById('manager-booking-form');
let managerClearBtn = document.getElementById('manager-clear-btn');
let managerDashboard = document.getElementById('manager-dashboard');
let managerNewBookingContainer = document.getElementById('manager-new-booking-container');
let managerResultsContainer = document.getElementById('manager-results-container');
let managerSearchBtn = document.getElementById('manager-search-btn');
let managerSearchSubject = document.getElementById('manager-search-subject');
let managerSelectRoom = document.getElementById('manager-select-room');
let managerStatsCal = document.getElementById('manager-stats-calendar');
let mgrAddBookingBtn = document.getElementById('mgr-add-booking-btn');
let modal = document.getElementById('modal');
let myBookingsContainer = document.getElementById('my-bookings-container');
let myBookingsNav = document.getElementById('my-bookings-nav');
let passwordInput = document.getElementById('password-input');
let radioJunior = document.getElementById('radio-junior');
let radioResidential = document.getElementById('radio-residential');
let radioSingle = document.getElementById('radio-single');
let radioSuite = document.getElementById('radio-suite');
let searchInput = document.getElementById('search-input');
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
let userTotalSpent = document.getElementById('user-total-spent');
let loginError = document.getElementById('login-error');

window.onload = fetchAllData();
// --------- This is event listener wanted for production -------
submitBtn.addEventListener('click', verifyLogin);
// --------------------------------------------------------------
// submitBtn.addEventListener('click', displayUserDashboard); // Just for dev mode
// submitBtn.addEventListener('click', displayManagerDashboard); // Just for dev mode

bookRoomNav.addEventListener('click', displayBookRoomDash);
managerClearBtn.addEventListener('click', clearSearchForm);
managerSearchBtn.addEventListener('click', searchUserBookings);
myBookingsNav.addEventListener('click', displayMyBookingsDash);
signOutNav.addEventListener('click', signOut);
userCalendar.addEventListener('change', findRooms);
userFilter.addEventListener('click', findRooms);
userResetBtn.addEventListener('click', resetRadioForm);
managerStatsCal.addEventListener('change', updateStats);
mgrAddBookingBtn.addEventListener('click', showManagerCalendar);
managerBookingCal.addEventListener('change', showMgrAvailableRooms);
usernameInput.addEventListener('click', hideError);
passwordInput.addEventListener('click', hideError);

managerSelectRoom.addEventListener('click', () => {
  managerBookRoom(event);
});
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
    return deliverLoginError();
  }
  if (usernameInput.value.length < 9) {
    return deliverLoginError();
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
    displayUserDashboard();
  }
  deliverLoginError();
}

function deliverLoginError() {
  console.log('Login Error');
  loginError.classList.remove('hidden');
}

function hideError() {
  loginError.classList.add('hidden');
}

function displayUserDashboard() {
  bookRoomNav.disabled = true;
  userCalendar.setAttribute('value', `${todayDashes}`);
  userCalendar.setAttribute('min', `${todayDashes}`);
  signInPage.classList.add('hidden');
  userDashboard.classList.remove('hidden');
  myBookingsContainer.classList.add('hidden');
  userWelcome.innerHTML = `Welcome back, ${currentUser.name}`;
  displayRoomsToUserAvailability(hotelOperation.findAvailableRooms(today));
}

function updateStats() {
  let date = formatDateForStats()
  let html = `<p class="manager-stats"><strong>Total Available Rooms:</strong> ${hotelOperation.getNumOfAvailable(date)}</p>
  <p class="manager-stats"><strong>Total Revenue for Date:</strong> $${hotelOperation.getTotalRevenue(date).toFixed(2)}</p>
  <p class="manager-stats"><strong>Percentage Occupied:</strong> ${hotelOperation.getPercentageOccupied(date)}%</p>`
  document.getElementById('manager-stats-container').innerHTML = '';
  document.getElementById('manager-stats-container').insertAdjacentHTML('afterbegin', html);
}

function displayBookRoomDash() {
  bookRoomNav.disabled = true;
  myBookingsNav.disabled = false;
  availabilityBox.classList.remove('hidden');
  userDashboardContainer.classList.remove('hidden');
  myBookingsContainer.classList.add('hidden');
}

function displayRoomsToUserAvailability(roomsToDisplay) {
  userAvailabilityContainer.innerHTML = '';
  roomsToDisplay.forEach(room => {
    let roomCardHtml = createRoomCard(room)
    userAvailabilityContainer.insertAdjacentHTML('afterbegin', roomCardHtml);
  })
}

function createRoomCard(room) {
  return `<article class="flex-row rooms-card" id="container${room.number}">
    <section class="flex-column room-img-box">
      <img class="room-card-photo" src="./images/${room.number}.jpg" alt="${room.roomType}">
    </section>
    <section class="flex-column room-card-details">
      <h3>${room.roomType.toUpperCase()}</h3>
      <p class="primary-details-text">Room Number ${room.number}</p>
      <p class="primary-details-text">${determineBedHtml(room)}<br>
      <p class="primary-details-text">Bidet: ${determineBidet(room)}</p>
    </section>
    <section class="flex-column room-card-price">
      <article class="flex-column card-inner-contents">
        <h3>$${room.costPerNight.toFixed(2)}</h3>
        <p>per night</p>
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
  if (document.getElementById(`${event.target.id}`) !== null) {
    if (document.getElementById(`${event.target.id}`).diasbled !== true) {
      let bookingDate = getFormatDate();
      let onSuccess = () => {
        document.getElementById(`${event.target.id}`).disabled = true;
        document.getElementById(`${event.target.id}`).innerText = 'Booked!'
        document.getElementById(`${event.target.id}`).classList.add('bookedBtn')

        // removeRoomBooked(event)
      }

      let roomToBook = hotelOperation.roomsRecord.find(room => {
        return room.number == event.target.id;
      })

      let bookingData = {
        userID: currentUser.id,
        date: bookingDate,
        roomNumber: roomToBook.number
      }
      apiCalls.postData(bookingData, onSuccess);
      updateBookings();
    }
  }
}

function managerBookRoom(event) {
  let userId;
  if (event.target.id) {
    let bookingDate = formatMgrAvailabilityDate();
    let onSuccess = () => {
      managerRemoveRoomBooked(event);
      displayMgrBookingNotification(event.target.id, 'booking');
      updateMgrTotalSpent(userId);
    }

    let roomToBook = hotelOperation.roomsRecord.find(room => {
      return room.number == event.target.id;
    })
    userId = getSearchedUserId();
    let bookingData = {
      userID: userId,
      date: bookingDate,
      roomNumber: roomToBook.number
    }
    apiCalls.postData(bookingData, onSuccess);
    updateBookings();
  }
}

function displayMgrBookingNotification(idOrNum, command) {
  let bookingMsg = `Room ${idOrNum} booked for ${managerBookingCal.value}.`;
  let deletionMsg = `Booking ${idOrNum} has been deleted.`;
  document.getElementById('mgr-msg').innerHTML = '';

  if (command === 'booking') {
    document.getElementById('mgr-msg').innerHTML = bookingMsg;
  } else {
    document.getElementById('mgr-msg').innerHTML = deletionMsg;
  }
  // command === 'booking' ? :
  // document.getElementById('mgr-msg').innerHTML = '';
  // let message = `Room ${roomNumber} booked for ${managerBookingCal.value}.`
  // document.getElementById('mgr-msg').innerHTML = message;
}
//
// function displayMgrDeletionNotification(bookingId) {
//   document.getElementById('mgr-msg').innerHTML = '';
//   let message = `Room ${roomNumber} booked for ${managerBookingCal.value}.`
//   document.getElementById('mgr-msg').innerHTML = message;
// }

function getSearchedUserId() {
  let query = searchInput.value;
  return hotelOperation.findUserID(query);
}

function managerRemoveRoomBooked(event) {
  let roomToDeleteId = event.target.id;
  document.getElementById(`room${roomToDeleteId}`).remove();
}

function removeRoomBooked(event) {
  let roomToDeleteId = event.target.id;
  document.getElementById(`container${roomToDeleteId}`).remove();
}

function determineSelection() {
  if (radioSingle.checked) {return 'single room'}
  else if (radioJunior.checked) {
    return 'junior suite';
  } else if (radioSuite.checked) {
    return 'suite';
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

function formatMgrAvailabilityDate() {
  if (!managerBookingCal.value) {
    return today;
  } else {
    let formatDate = managerBookingCal.value.split('-');
    let formattedDate = formatDate.join('/');
    return formattedDate;
  }
}

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
  radioSingle.checked = false;
  radioJunior.checked = false;
  radioSuite.checked = false;
  radioResidential.checked = false;
  findRooms();
}

function displayMyBookingsDash() {
  bookRoomNav.disabled = false;
  myBookingsNav.disabled = true;
  availabilityBox.classList.add('hidden');
  userDashboardContainer.classList.add('hidden');
  myBookingsContainer.classList.remove('hidden');
  displayRoomsToMyBookings();
}

function displayRoomsToMyBookings() {
  userBookingsContainer.innerHTML = '';
  userTotalSpent.innerHTML = '';
  let total = hotelOperation.calculateUserSpending(currentUser.name).toFixed(2);
  userTotalSpent.innerHTML = `Total Spent: $${total}`;
  let userBookings = hotelOperation.filterBookingsByName(currentUser.name);
  let sortedBookings = sortBookingsByDate(userBookings);
  sortedBookings.forEach(booking => {
    let roomCardHtml = createBookingCard(booking);
    userBookingsContainer.insertAdjacentHTML('beforeend', roomCardHtml);
  })
}
// <p class="primary-details-text">Room number ${booking.roomNumber}</p>

function createBookingCard(booking) {
  let roomBooked = hotelOperation.getRoomDetails(booking.roomNumber);

  return `<article class="flex-row rooms-card" id="${booking.id}">
    <section class="flex-column room-img-box">
      <img class="room-card-photo" src="./images/${booking.roomNumber}.jpg" alt="">
    </section>
    <section class="flex-column room-card-details">
      <h3>${booking.date}</h3>
      <p class="primary-details-text">${roomBooked.roomType.toUpperCase()} #${booking.roomNumber}</p>
      <p class="primary-details-text">Booking id: ${booking.id}</p>
      <p class="secondary-details-text">${determineBedHtml(roomBooked)}<br>
      <p class="secondary-details-text">Bidet: ${determineBidet(roomBooked)}</p>
    </section>
    <section class="flex-column room-card-price">
      <article class="flex-column card-inner-contents">
        <h3>$${roomBooked.costPerNight.toFixed(2)}</h3>
        <p>per night</p>
      </article>
    </section>
  </article>`
}

function sortBookingsByDate(bookings) {
  return bookings.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
}

// MANAGER SEARCH USER BOOKINGS --------------------

function searchUserBookings() {
  let query = searchInput.value;

  if (query === '') {
    return displayManagerSearchError('Please enter a valid customer name.');
  }

  let userId = hotelOperation.findUserID(query);
  let userBookings = hotelOperation.filterBookingsByName(query);

  if (typeof userBookings === 'string') {
    return displayManagerSearchError(userBookings);
  } else if (userBookings.length === 0) {

  }
  let sortedBookings = sortBookingsByDate(userBookings);
  mgrAddBookingBtn.classList.remove('hidden');
  managerResultsContainer.innerHTML = '';
  managerSearchSubject.innerHTML = '';
  managerResultsContainer.classList.remove('hidden');
  displaySearchSubject(userId);
  displaySearchedBookings(sortedBookings);
}

function displaySearchSubject(userId) {
  let userName = hotelOperation.findUserName(userId);

  let spent = hotelOperation.calculateUserSpending(userName).toFixed(2);
  let html = `<h3 id="user-name">Customer: ${userName}</h3>
  <p id="mgr-msg"></p>
  <h3 id="mgr-total-spent">Total Spent: $${spent}</h3>`
  customersBookings.classList.remove('hidden');
  managerSearchSubject.classList.remove('hidden');
  managerSearchSubject.insertAdjacentHTML('afterbegin', html);
}

function showManagerCalendar() {
  managerBookingForm.classList.remove('hidden');
  managerBookingCal.setAttribute('value', `${todayDashes}`);
  managerBookingCal.setAttribute('min', `${todayDashes}`);
}

function displayManagerSearchError(error) {
  managerSearchSubject.innerHTML = '';
  managerSearchSubject.classList.remove('hidden');
  let html = `<p>${error}</p>`
  managerSearchSubject.insertAdjacentHTML('beforeend', html);
}

function displaySearchedBookings(bookings) {
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

  return `<article class="flex-row space-around manager-rooms-card primary-details-text" id="booking-${booking.id}">
    <p class="mgr-card-small">${booking.date}</p>
    <p class="mgr-card-large">${roomBooked.roomType.toUpperCase()}</p>
    <p class="mgr-card-small">${roomBooked.number}</p>
    <p class="mgr-card-text">${booking.id}</p>
    <p class="mgr-card-small">${roomBooked.numBeds} ${roomBooked.bedSize}</p>
    <p class="mgr-card-small">${determineBidet(roomBooked)}</p>
    <p class="mgr-card-small">$${roomBooked.costPerNight.toFixed(2)}</p>
    <div class="mgr-card-text">
    ${determineFutureBooking(booking)}
    </div>
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
  let deleteRequest;
  let searchedUserId = hotelOperation.findUserID(searchInput.value);

  let onSuccess = () => {
    document.getElementById(`booking-${event.target.id}`).remove();
    displayMgrBookingNotification(event.target.id, 'delete');
    updateMgrTotalSpent(searchedUserId);
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
}

function updateMgrTotalSpent(id) {
  let spending = hotelOperation.calculateUserSpending(hotelOperation.findUserName(id));
  document.getElementById('mgr-total-spent').innerText = `Total Spent: $${spending.toFixed(2)}`;
}

function clearSearchForm() {
  if (searchInput.value) {
    searchInput.value = '';
  }
  managerResultsContainer.innerHTML = '';
  customersBookings.classList.add('hidden');
  managerSearchSubject.innerHTML = '';
  managerSearchSubject.classList.add('hidden');
  managerSelectRoom.classList.add('hidden');
  managerBookingForm.classList.add('hidden');
  managerResultsContainer.classList.add('hidden');
  managerNewBookingContainer.innerHTML = '';
  managerNewBookingContainer.classList.remove('hidden');
}

function showMgrAvailableRooms() {
  let date = formatMgrAvailabilityDate();
  let availableRooms = hotelOperation.findAvailableRooms(date);
  managerSelectRoom.classList.remove('hidden');
  managerNewBookingContainer.classList.remove('hidden');
  availableRooms.forEach(room => {
    let html = createManagerRoomCard(room);
    managerNewBookingContainer.insertAdjacentHTML('beforeend', html)
  })
}

function createManagerRoomCard(room) {
  return `<article class="flex-row space-around manager-rooms-card primary-details-text" id="room${room.number}">
    <p class="mgr-card-large">${room.roomType.toUpperCase()}</p>
    <p class="mgr-card-small">${room.number}</p>
    <p class="mgr-card-small">${room.numBeds} ${room.bedSize}</p>
    <p class="mgr-card-small">${determineBidet(room)}</p>
    <p class="mgr-card-small">$${room.costPerNight}</p>
    <button class="btn mgr-card-btn" id="${room.number}">Book Room</button>
  </article>`
}

function signOut() {
  currentUser = "";
  userDashboard.classList.add('hidden');
  signInPage.classList.remove('hidden')
}
