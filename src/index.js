// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'
import apiCalls from './apiCalls';

import HotelOperation from './HotelOperation';
import domElements from './domElements';


let hotelOperation;

window.onload = fetchAllData();


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
  // hotelOperation = new HotelOperation();

  Promise.all([roomsPromise, bookingsPromise, usersPromise])
    .then(data => hotelOperation = new HotelOperation(data[0], data[1], data[2]))
    .then(() => loadPage())
    .catch(err => console.log(`Sorry! Data cannot be loaded at this time ${err}`))
}

function loadPage() {
  hotelOperation.start()
  // console.log("hotel ops", hotelOperation.roomsData)
}

function fetchData(key) {
  return fetch(`https://fe-apps.herokuapp.com/api/v1/overlook/1904/${key}/${key}`)
    .then(response => response.json())
    .then(data => data[key])
    .catch(err => console.log(err))
}
