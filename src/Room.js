export default class Room {
  constructor(rawData) {
    this.number = rawData.number || 26;
    this.roomType = rawData.roomType;
    this.bidet = rawData.bidet;
    this.bedSize = rawData.bedSize;
    this.numBeds = rawData.numBeds;
    this.costPerNight = rawData.costPerNight;
  }
}
