import chai from 'chai';
const expect = chai.expect;
import Booking from '../src/Booking';

describe('Booking', () => {
  let booking;
  let booking2;
  let bookingData = {"id":"1abcde2f3h11ij4lm","userID":1,"date":"2020/01/01","roomNumber":11,"roomServiceCharges":[]};

  beforeEach(() => {
    booking = new Booking(bookingData, 'Carlton');
    booking2 = new Booking(bookingData);
  });

  describe('Constructor', () => {
    it('should be a function', () => {
      expect(Booking).to.be.a('function');
    });

    it('should have an id', () => {
      expect(booking.id).to.deep.equal('1abcde2f3h11ij4lm');
    });

    it('should have an name', () => {
      expect(booking.name).to.deep.equal('Carlton');
    });

    it('should default to null when a name isn\'t provided', () => {
      expect(booking2.name).to.deep.equal(null);
    });

    it('should have a user id', () => {
      expect(booking.userID).to.deep.equal(1);
    });

    it('should have a date', () => {
      expect(booking.date).to.deep.equal('2020/01/01');
    });

    it('should have a room number', () => {
      expect(booking.roomNumber).to.deep.equal(11);
    });

    it('should have an empty array of service charges', () => {
      expect(booking.serviceCharges).to.deep.equal([]);
    });
  });
});
