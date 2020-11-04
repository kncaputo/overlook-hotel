import chai from 'chai';
const expect = chai.expect;
import HotelOperation from '../src/HotelOperation';
import Room from '../src/Room';
import Booking from '../src/Booking';
import User from '../src/User';


describe('HotelOperation', () => {
  let hotelOperation;
  let room;
  let bookingsData;
  let roomsData;

  describe('Constructor', () => {
    beforeEach(() => {
      hotelOperation = new HotelOperation();
    });

    it('should be a function', () => {
      expect(HotelOperation).to.be.a('function');
    });

    it('should start with an empty rooms record', () => {
      expect(hotelOperation.roomsRecord).to.deep.equal([]);
    });

    it('should start with an empty bookings record', () => {
      expect(hotelOperation.bookingsRecord).to.deep.equal([]);
    });

    it('should start with an empty users record', () => {
      expect(hotelOperation.users).to.deep.equal([]);
    });
  });

  describe('Methods', () => {
    beforeEach(() => {
      hotelOperation = new HotelOperation();
      bookingsData = [{"id":"1abcde2f3h11ij4lm","userID":1,"date":"2020/01/01","roomNumber":1,"roomServiceCharges":[]},{"id":"5fwrgu4i7k55hl6t6","userID":13,"date":"2020/01/10","roomNumber":12,"roomServiceCharges":[]}];
      roomsData = [{"number":1,"roomType":"residential suite","bidet":true,"bedSize":"queen","numBeds":1,"costPerNight":123.4},{"number":2,"roomType":"suite","bidet":false,"bedSize":"full","numBeds":2,"costPerNight":477.38},{"number":3,"roomType":"single room","bidet":false,"bedSize":"king","numBeds":1,"costPerNight":491.14}];
    });

    it('should have a method to create instances of room when passed an array', () => {
      expect(hotelOperation.createRoom(roomsData[0])).to.be.an.instanceof(Room);
    });

    it('should push new booking instance to the bookings record', () => {
      expect(hotelOperation.roomsRecord.length).to.deep.equal(0);

      hotelOperation.createRoom(roomsData[0]);

      expect(hotelOperation.roomsRecord.length).to.deep.equal(1);
    });


    it('should have a method to create instances of booking when passed an array', () => {
      expect(hotelOperation.createBooking(roomsData[0])).to.be.an.instanceof(Booking);
    });

    it('should push new booking instance to the bookings record', () => {
      expect(hotelOperation.bookingsRecord.length).to.deep.equal(0);

      hotelOperation.createBooking(bookingsData[0]);

      expect(hotelOperation.bookingsRecord.length).to.deep.equal(1);
    });

    it('should have a method to create multiple instances of room when passed data', () => {
      let result = hotelOperation.createRoomsRecord(roomsData);

      expect(hotelOperation.roomsRecord[0]).to.be.an.instanceof(Room);
      expect(hotelOperation.roomsRecord[1]).to.be.an.instanceof(Room);
    });

    it('should have a method to create multiple instances of booking when passed data', () => {
      let result = hotelOperation.createBookingsRecord(roomsData);

      expect(hotelOperation.bookingsRecord[0]).to.be.an.instanceof(Booking);
      expect(hotelOperation.bookingsRecord[1]).to.be.an.instanceof(Booking);
    });

  });
});
