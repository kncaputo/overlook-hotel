import Room from '../src/Room';
import Booking from '../src/Booking';
import User from '../src/User';

export default class HotelOperation {
  constructor(roomsData, bookingsData, usersData) {
    this.roomsData = roomsData;
    this.bookingsData = bookingsData;
    this.usersData = usersData;
    this.roomsRecord = [];
    this.bookingsRecord = [];
    this.usersRecord = [];
  }

  start() {
    this.createRoomsRecord();
    this.createBookingsRecord();
    this.createUsersRecord();
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

  createRoomsRecord() {
    let roomsRecord = this.roomsData.forEach(rawRoom => {
      this.createRoom(rawRoom);
    })
  }

  createBookingsRecord() {
    this.bookingsRecord = [];
    let bookingsRecord = this.bookingsData.forEach(rawBooking => {
      this.createBooking(rawBooking);
    })
  }

  createUsersRecord() {
    let users = this.usersData.forEach(rawUser => {
      this.createUser(rawUser);
    })
  }

  findUserName(userID) {
    let searchedUser = this.usersRecord.find(user => {
      return user.id === userID;
    });
    if (searchedUser) {
      return searchedUser.name;
    }
    return false;
  }

  findUserID(userName) {
    let searchedUser = this.usersRecord.find(user => {
      return user.name.toLowerCase().includes(userName.toLowerCase())
    });
    if (searchedUser) {
      return searchedUser.id;
    }
    return false;
  }

  filterBookingsByName(name) {
    let userID = this.findUserID(name);

    if (!userID) {
      return 'User not in database.'
    }

    let bookingsByName = this.bookingsRecord.filter(booking => {
      return booking.userID === userID;
    })
    return bookingsByName;
  }

  filterBookingsByDate(date) {
    return this.bookingsRecord.filter(booking => booking.date === date);
  }

  findAvailableRooms(date) {
    let filteredBookings = this.bookingsRecord.filter(booking => {
      return booking.date === date;
    })

    let availableRooms = this.roomsRecord.reduce((rooms, room) => {
      let isBooked = false;

      filteredBookings.forEach(booking => {
        if (room.number === booking.roomNumber) {isBooked = true}
      });

      if (!isBooked) {rooms.push(room)}

      return rooms;
    }, []);

    return availableRooms;
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

  getTotalRevenue(date) {
    let filteredBookings = this.filterBookingsByDate(date);

    return filteredBookings.reduce((sum, booking) => {
      this.roomsRecord.forEach(room => {
        if (booking.roomNumber === room.number) {sum += room.costPerNight}
      })
      return sum;
    }, 0);
  }

  getRoomDetails(roomNumber) {
    return this.roomsRecord.find(room => {
      return room.number === roomNumber;
    })
  }

  calculateUserSpending(name) {
    let bookings = this.filterBookingsByName(name);

    return bookings.reduce((sum, booking) => {
      this.roomsRecord.forEach(room => {
        if (booking.roomNumber === room.number) {sum += room.costPerNight}
      })
      return sum;
    }, 0);
  }
}
