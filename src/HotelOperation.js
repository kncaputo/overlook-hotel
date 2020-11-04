import Room from '../src/Room';
import Booking from '../src/Booking';
import User from '../src/User';

export default class HotelOperation {
  constructor(rawRoomsData) {
    this.roomsRecord = [];
    this.bookingsRecord = [];
  }

  createRoom(rawRoomData) {
    let room = new Room(rawRoomData);
    this.roomsRecord.push(room);
    return room;
  }

  createBooking(rawBookingData) {
    let booking = new Booking(rawBookingData);
    this.bookingsRecord.push(booking);
    return booking;
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

}
