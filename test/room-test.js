import chai from 'chai';
const expect = chai.expect;
import Room from '../src/Room';

describe('Room', () => {
  let room;
  const roomData = {
    number: 1,
    roomType: "residential suite", bidet: true,
    bedSize: "queen",
    numBeds: 1,
    costPerNight: 123.4
  };

  beforeEach(() => {
    room = new Room(roomData);
  });

  describe('Constructor', () => {
    it('should be a function', () => {
      expect(Room).to.be.a('function');
    });

    it('should have a number', () => {
      expect(room.number).to.deep.equal(1);
    });

    it('should have a room type', () => {
      expect(room.roomType).to.deep.equal('residential suite');
    });

    it('should specifiy if there is a bidet', () => {
      expect(room.bidet).to.deep.equal(true);
    });

    it('should have a bed size', () => {
      expect(room.bedSize).to.deep.equal('queen');
    });

    it('should have the number of beds', () => {
      expect(room.numBeds).to.deep.equal(1);
    });

    it('should have a cost per night', () => {
      expect(room.costPerNight).to.deep.equal(123.4);
    });
  });
});
