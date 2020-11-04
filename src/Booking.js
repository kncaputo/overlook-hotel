export default class Booking {
  constructor(rawData, name) {
    this.id = rawData.id;
    this.name = name || null;
    this.userID = rawData.userID;
    this.date = rawData.date;
    this.roomNumber = rawData.roomNumber;
    this.serviceCharges = [];
  }
}
