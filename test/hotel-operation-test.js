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
  let usersData;

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
      expect(hotelOperation.usersRecord).to.deep.equal([]);
    });
  });

  describe.only('Methods', () => {
    beforeEach(() => {
      hotelOperation = new HotelOperation();
      bookingsData = [{"id":"1abcde2f3h11ij4lm","userID":1,"date":"2020/01/01","roomNumber":1,"roomServiceCharges":[]},{"id":"5fwrgu4i7k55hl6t6","userID":1,"date":"2020/01/02","roomNumber":3,"roomServiceCharges":[]}, {"id":"5fwrgu4i7k55hl6t6","userID":13,"date":"2020/01/10","roomNumber":12,"roomServiceCharges":[]}];
      roomsData = [{"number":1,"roomType":"residential suite","bidet":true,"bedSize":"queen","numBeds":1,"costPerNight":123.4},{"number":2,"roomType":"suite","bidet":false,"bedSize":"full","numBeds":2,"costPerNight":477.38},{"number":3,"roomType":"suite","bidet":false,"bedSize":"king","numBeds":1,"costPerNight":491.14}];
      usersData = [{"id":1,"name":"Anson Aimes"},{"id":2,"name":"Theo Hernandez"},{"id":3,"name":"Jane Schmoe"}];
    });

    it('should have a method to create instances of room when passed an array', () => {
      expect(hotelOperation.createRoom(roomsData[0])).to.be.an.instanceof(Room);
    });

    it('should push new room instance to the rooms record', () => {
      expect(hotelOperation.roomsRecord.length).to.deep.equal(0);

      hotelOperation.createRoom(roomsData[0]);

      expect(hotelOperation.roomsRecord.length).to.deep.equal(1);
    });

    it('should have a method to create instances of booking when passed an array', () => {
      expect(hotelOperation.createBooking(bookingsData[0])).to.be.an.instanceof(Booking);
    });

    it('should push new booking instance to the bookings record', () => {
      expect(hotelOperation.bookingsRecord.length).to.deep.equal(0);

      hotelOperation.createBooking(bookingsData[0]);

      expect(hotelOperation.bookingsRecord.length).to.deep.equal(1);
    });

    it('should have a method to create instances of user when passed an array', () => {
      expect(hotelOperation.createUser(usersData[0])).to.be.an.instanceof(User);
    });

    it('should push new user instance to the users array', () => {
      expect(hotelOperation.usersRecord.length).to.deep.equal(0);

      hotelOperation.createUser(usersData[0]);

      expect(hotelOperation.usersRecord.length).to.deep.equal(1);
    });

    it('should have a method to create multiple instances of room when passed data', () => {
      let result = hotelOperation.createRoomsRecord(roomsData);

      expect(hotelOperation.roomsRecord[0]).to.be.an.instanceof(Room);
      expect(hotelOperation.roomsRecord[1]).to.be.an.instanceof(Room);
    });

    it('should have a method to create multiple instances of booking when passed data', () => {
      hotelOperation.createUsersRecord(usersData);
      let result = hotelOperation.createBookingsRecord(roomsData);

      expect(hotelOperation.bookingsRecord[0]).to.be.an.instanceof(Booking);
      expect(hotelOperation.bookingsRecord[1]).to.be.an.instanceof(Booking);
    });

    it('should have a method to create multiple instances of user when passed data', () => {
      let result = hotelOperation.createUsersRecord(usersData);

      expect(hotelOperation.usersRecord[0]).to.be.an.instanceof(User);
      expect(hotelOperation.usersRecord[1]).to.be.an.instanceof(User);
    });

    it('should have a method to find user name when given an id', () => {
      hotelOperation.createUsersRecord(usersData);
      let result = hotelOperation.findUserName(2, 'name');

      expect(result).to.deep.equal('Theo Hernandez');
    });

    it('should have a method to find user id when given a name', () => {
      // TODO - write this test
    });

    it('should filter bookings by user name', () => {
      hotelOperation.createBookingsRecord(bookingsData);
      hotelOperation.createUsersRecord(usersData);

      let result = hotelOperation.filterBookingsByName('Anson Aimes');

      expect(result.length).to.deep.equal(2);
      expect(result[0].userID).to.deep.equal(1);
      expect(result[1].userID).to.deep.equal(1);
    });

    it('should have a method that filters bookings when given a date', () => {
      hotelOperation.createBookingsRecord(bookingsData);
      hotelOperation.createUsersRecord(usersData);

      let result = hotelOperation.filterBookingsByDate('2020/01/02');

      expect(result.length).to.deep.equal(1);
      expect(result[0].id).to.deep.equal('5fwrgu4i7k55hl6t6');
    });

    it('should have a method that finds available rooms for a given date', () => {
      hotelOperation.createRoomsRecord(roomsData);
      hotelOperation.createBookingsRecord(bookingsData);

      let results = hotelOperation.findAvailableRooms('2020/01/02');

      expect(results.length).to.deep.equal(2);
      expect(results[0].number).to.deep.equal(1);
      expect(results[1].number).to.deep.equal(2);
    });

    it('should have a method that filters by room type when given a room type and an array', () => {
      hotelOperation.createRoomsRecord(roomsData);

      let results = hotelOperation.filterByRoomType('suite', roomsData);

      expect(results.length).to.deep.equal(2);
      expect(results[0].number).to.deep.equal(2);
      expect(results[1].number).to.deep.equal(3);
    });

    it('should have a method that gets the number of avaialable rooms for a given  date', () => {
      hotelOperation.createRoomsRecord(roomsData);
      hotelOperation.createBookingsRecord(bookingsData);

      let results = hotelOperation.getNumOfAvailable('2020/01/02');

      expect(results).to.deep.equal(2);
    });

    it('should have a method that gets the percentage of occupied rooms for a given  date', () => {
      hotelOperation.createRoomsRecord(roomsData);
      hotelOperation.createBookingsRecord(bookingsData);

      let results = hotelOperation.getPercentageOccupied('2020/01/02');

      expect(results).to.deep.equal(33);
    });

  });
});
