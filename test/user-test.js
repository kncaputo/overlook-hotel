import chai from 'chai';
const expect = chai.expect;
import User from '../src/User'

describe('User', () => {
  let user;
  let user2;
  let userData = {"id":1,"name":"Lila Jones"};

  beforeEach(() => {
    user = new User(userData, false);
    user2 = new User(userData);
  });

  describe('Constructor', () => {
    it('should be a function', () => {
      expect(User).to.be.a('function');
    });

    it('should have an id', () => {
      expect(user.id).to.deep.equal(1);
    });

    it('should have an name', () => {
      expect(user.name).to.deep.equal("Lila Jones");
    });

    it('should take in manager status as an argument and assign to a property', () => {
      expect(user.isManager).to.deep.equal(false);
    });

    it('should default to false if no manager status is provided', () => {
      expect(user2.isManager).to.deep.equal(false);
    });

    it('should have a username', () => {
      expect(user.username).to.deep.equal('customer1');
    });

    it('should have a password', () => {
      expect(user.password).to.deep.equal('overlook2020');
    });

    it('should have a bookings array', () => {
      expect(user.bookings).to.deep.equal([]);
    })
  });




});
