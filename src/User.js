export default class User {
  constructor(rawData) {
    this.id = rawData.id;
    this.name = rawData.name;
    this.username = `customer${rawData.id}`;
    this.password = 'overlook2020';
    this.bookings = [];
  }
}
