import Room from '../src/Room';
import Booking from '../src/Booking';
import User from '../src/User';

export default class HotelOperation {
  constructor() {
    this.roomsRecord = [];
    this.bookingsRecord = [];
    this.usersRecord = [];
  }

  createRoom(rawRoom) {
    let room = new Room(rawRoom);
    this.roomsRecord.push(room);
    return room;
  }

  createBooking(rawBooking) {
    let booking = new Booking(rawBooking);
    this.bookingsRecord.push(booking);
    return booking;
  }

  createUser(rawUser) {
    let user = new User(rawUser);
    this.usersRecord.push(user);
    return user;
  }

  createRoomsRecord(rawRoomsData) {
    let roomsRecord = rawRoomsData.forEach(rawRoom => {
      this.createRoom(rawRoom);
    })
  }

  createBookingsRecord(rawBookingsData) {
    let bookingsRecord = rawBookingsData.forEach(rawBooking => {
      this.createBooking(rawBooking);
    })
  }

  createUsersRecord(rawUsersData) {
    let users = rawUsersData.forEach(rawUser => {
      this.createUser(rawUser);
    })
  }

  findUserName(userID) {
    let searchedUser = this.usersRecord.find(user => {
      return user.id === userID;
    });
    return searchedUser.name;
  }

  findUserID(name) {
    let searchedUser = this.usersRecord.find(user => {
      return user.name === name;
    });
    return searchedUser.id;
  }

  filterBookingsByName(name) {
    let bookingsByName = this.bookingsRecord.filter(booking => {
      let userID = this.findUserID(name);
      return booking.userID === userID;
    })
    return bookingsByName;
  }

  findAvailableRooms(date) {
    let filteredBookings = this.bookingsRecord.filter(booking => {
      return booking.date === date;
    })

    let availableRooms = this.roomsRecord.reduce((rooms, room) => {
      let isBooked = false;

      filteredBookings.forEach(booking => {
        if (room.number === booking.roomNumber) {
          isBooked = true;
        }
      });

      if (!isBooked) {
        rooms.push(room);
      }

      return rooms;
    }, []);

    return availableRooms;
  }

  filterByRoomType(roomType, roomsArray) {

  }

  getNumOfAvaialble() {

  }
}
