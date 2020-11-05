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

  filterBookingsByDate(date) {
    return this.bookingsRecord.filter(booking => booking.date === date);
  }

  findAvailableRooms(date) {
    let filteredBookings = this.filterBookingsByDate(date);

    return this.roomsRecord.reduce((rooms, room) => {
      filteredBookings.forEach(booking => {
        if (!(room.number === booking.roomNumber)) rooms.push(room);
      });

      return rooms;
    }, []);
  }

  filterByRoomType(roomType, roomsToFilter) {
    return roomsToFilter.filter(room => {
      return room.roomType === roomType;
    })
  }

  getNumOfAvailable(date) {
    return this.findAvailableRooms(date).length;
  }


  getPercentageOccupied(date) {
    let filteredBookings = this.filterBookingsByDate(date);
    let percentOccupied = Math.floor((filteredBookings.length  / this.roomsRecord.length) * 100);
    return percentOccupied
  }

  // TODO - Why is there a 0 in front of this when it's returned?
  getTotalRevenue(date) {
    let filteredBookings = this.filterBookingsByDate(date);

    return filteredBookings.reduce((sum, booking) => {
      this.roomsRecord.forEach(room => {
        console.log(room.costPerNight)
        if (booking.roomNumber === room.number) {sum += room.costPerNight}
      })
      return sum;
    }, 0);
  }
}
