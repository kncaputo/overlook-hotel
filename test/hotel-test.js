import chai from 'chai';
const expect = chai.expect;
import Hotel from '../src/Hotel';
import Room from '../src/Room';
import Booking from '../src/Booking';
import User from '../src/User';


describe('Hotel', () => {
  let hotel;
  let room;
  let bookingsData;
  let roomsData;

  describe('Constructor', () => {
    beforeEach(() => {
      hotel = new Hotel();
    });

    it('should be a function', () => {
      expect(Hotel).to.be.a('function');
    });

    it('should start with an empty rooms record', () => {
      expect(hotel.roomsRecord).to.deep.equal([]);
    });

    it('should start with an empty bookings record', () => {
      expect(hotel.bookingsRecord).to.deep.equal([]);
    });
  });

  describe('Methods', () => {
    beforeEach(() => {
      hotel = new Hotel();
      bookingsData = [{"id":"1abcde2f3h11ij4lm","userID":1,"date":"2020/01/01","roomNumber":1,"roomServiceCharges":[]},{"id":"5fwrgu4i7k55hl6t6","userID":13,"date":"2020/01/10","roomNumber":12,"roomServiceCharges":[]}];
      roomsData = [{"number":1,"roomType":"residential suite","bidet":true,"bedSize":"queen","numBeds":1,"costPerNight":123.4},{"number":2,"roomType":"suite","bidet":false,"bedSize":"full","numBeds":2,"costPerNight":477.38},{"number":3,"roomType":"single room","bidet":false,"bedSize":"king","numBeds":1,"costPerNight":491.14}];
    });

    it('should have a method to create instances of room when passed an array', () => {
      expect(hotel.createRoom(roomsData[0])).to.be.an.instanceof(Room);
    });

    it('should push new booking instance to the bookings record', () => {
      expect(hotel.roomsRecord.length).to.deep.equal(0);

      hotel.createRoom(roomsData[0]);

      expect(hotel.roomsRecord.length).to.deep.equal(1);
    });


    it('should have a method to create instances of booking when passed an array', () => {
      expect(hotel.createBooking(roomsData[0])).to.be.an.instanceof(Booking);
    });

    it('should push new booking instance to the bookings record', () => {
      expect(hotel.bookingsRecord.length).to.deep.equal(0);

      hotel.createBooking(bookingsData[0]);

      expect(hotel.bookingsRecord.length).to.deep.equal(1);
    });

    it('should have a method to create multiple instances of room when passed data', () => {
      let result = hotel.createRoomsRecord(roomsData);

      expect(hotel.roomsRecord[0]).to.be.an.instanceof(Room);
      expect(hotel.roomsRecord[1]).to.be.an.instanceof(Room);
    });

    it('should have a method to create multiple instances of booking when passed data', () => {
      let result = hotel.createBookingsRecord(roomsData);

      expect(hotel.bookingsRecord[0]).to.be.an.instanceof(Booking);
      expect(hotel.bookingsRecord[1]).to.be.an.instanceof(Booking);
    });







  });
});
