import { expect } from 'chai';
import User from '../src/User';

describe('User', () => {
  let user;
  let userData = {
    id: 1,
    name: "Lila Jones"
  };

  beforeEach(() => {
    user = new User(userData, false);
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
