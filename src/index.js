// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'
import apiCalls from './apiCalls';

import Room from './Room';
import Booking from './Booking';
import User from './User';
import domElements from './domElements';


let hotelOperation;
let today = moment().format('YYYY/MM/DD')

window.onload = fetchAllData();

function fetchAllData() {
  let roomsPromise = apiCalls.fetchData('rooms');
  let bookingsPromise = apiCalls.fetchData('bookings');
  let usersPromise = apiCalls.fetchData('users');
  hotelOperation = new HotelOperation();
  Promise.all([roomsPromise, bookingsPromise, usersPromise])
    .then(data => hotelOperation.start(data[0], data[1], data[2]) = new HotelOperation())
    .then(() => loadPage())
    .catch(err => alert(`Sorry! Data cannot be loaded at this time ${err}`))
}
function loadPage() {
  console.log('hi kara')
}
