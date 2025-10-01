// Abstraction: Person class is abstract
export class Person {
  constructor(name, contact) {
    if (this.constructor === Person) {
      throw new Error("Cannot instantiate abstract class Person");
    }
    this._name = name;
    this._contact = contact;
  }

  get name() {
    return this._name;
  }

  get contact() {
    return this._contact;
  }

  // Abstract method
  getRole() {
    throw new Error("Method 'getRole()' must be implemented.");
  }
}

// Level 1 Inheritance
export class Driver extends Person {
  constructor(name, contact, licensePlate) {
    super(name, contact);
    this.licensePlate = licensePlate;
  }

  getRole() {
    return "Driver";
  }
}

// Level 2 Inheritance
export class Bus extends Driver {
  #carNumber;

  constructor(name, contact, licensePlate, carNumber) {
    super(name, contact, licensePlate); // Driver properties
    this.#carNumber = carNumber;
  }

  get carNumber() {
    return this.#carNumber;
  }

  displayBusInfo() {
    return `${this.#carNumber} - ${this.licensePlate} (Driver: ${this.name})`;
  }
}

// Level 3 Inheritance
export class BusSchedule extends Bus {
  constructor(
    name,
    contact,
    carNumber,
    licensePlate,
    startStation,
    endStation,
    departTime,
    arriveTime,
    shift,
    trip
  ) {
    super(name, contact, carNumber, licensePlate);
    this.startStation = startStation;
    this.endStation = endStation;
    this.departTime = departTime;
    this.arriveTime = arriveTime;
    this.shift = shift;
    this.trip = trip;
  }

  // Polymorphism - Overriding
  displayBusInfo() {
    return `${super.displayBusInfo()} | ${this.startStation} -> ${this.endStation} [${this.departTime}-${this.arriveTime}] Shift: ${this.shift} Trip: ${this.trip}`;
  }

  // Polymorphism - Overloading (simulate with optional params)
  searchSchedule(field, value) {
    if (!field || !value) return this.displayBusInfo();

    switch (field) {
      case "name":
        return this.name.includes(value) ? this.name : "";
      case "startStation":
        return this.startStation.includes(value) ? this.startStation : "";
      case "endStation":
        return this.endStation.includes(value) ? this.endStation : "";
      case "departTime":
        return this.departTime.includes(value) ? this.departTime : "";
      case "arriveTime":
        return this.arriveTime.includes(value) ? this.arriveTime : "";
      default:
        return "";
    }
  }
}
