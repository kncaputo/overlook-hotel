export default class User {
  constructor(rawData, managerStatus) {
    this.id = rawData.id;
    this.name = rawData.name;
    this.isManager = managerStatus || false;
    this.username = `customer${this.id}`;
    this.password = 'overlook2020';
    this.bookings = [];
  }
}
