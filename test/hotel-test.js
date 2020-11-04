import chai from 'chai';
const expect = chai.expect;
import Hotel from '../src/Hotel'

describe('Hotel', () => {
  let hotel;

  beforeEach(() => {
    hotel = new Hotel();
  });

  describe.only('Constructor', () => {
    it('should be a function', () => {
      expect(Hotel).to.be.a('function');
    });

    it('should start with an empty array of rooms', () => {
      expect(hotel.rooms).to.deep.equal([]);
    });

    it('should start with an empty array of bookings', () => {
      expect(hotel.bookings).to.deep.equal([]);
    });
  });

});
