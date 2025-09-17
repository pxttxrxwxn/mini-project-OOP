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

// Encapsulation: Bus class
export class Bus {
  #carNumber;
  #licensePlate;
  #driver; // instance of Person
  constructor(carNumber, licensePlate, driver) {
    this.#carNumber = carNumber;
    this.#licensePlate = licensePlate;
    this.#driver = driver;
  }

  get carNumber() {
    return this.#carNumber;
  }

  get licensePlate() {
    return this.#licensePlate;
  }

  get driver() {
    return this.#driver;
  }

  set driver(newDriver) {
    this.#driver = newDriver;
  }

  displayBusInfo() {
    return `${this.#carNumber} - ${this.#licensePlate} (Driver: ${this.#driver.name})`;
  }
}

// Inheritance: BusSchedule extends Bus
export class BusSchedule extends Bus {
  constructor(carNumber, licensePlate, driver, startStation, endStation, departTime, arriveTime, shift, trip) {
    super(carNumber, licensePlate, driver);
    this.startStation = startStation;
    this.endStation = endStation;
    this.departTime = departTime;
    this.arriveTime = arriveTime;
    this.shift = shift;
    this.trip = trip;
  }

  // Polymorphism - Overriding displayBusInfo
  displayBusInfo() {
    return `${super.displayBusInfo()} | ${this.startStation} -> ${this.endStation} [${this.departTime}-${this.arriveTime}] Shift: ${this.shift} Trip: ${this.trip}`;
  }

  // Polymorphism - Overloading (simulate using optional params)
  searchSchedule(field, value) {
      if (!field || !value) return this.displayBusInfo();

      // ตรวจสอบแต่ละฟิลด์
      switch (field) {
          case "name":
              return this.driver.name.includes(value) ? this.driver.name : "";
          case "startStation":
              return this.startStation.includes(value) ? this.startStation : "";
          case "endStation":
              return this.endStation.includes(value) ? this.endStation : "";
          case "departTime":
              return this.departTime.includes(value) ? this.departTime : "";
          case "arriveTime":
              return this.arriveTime.includes(value) ? this.arriveTime : "";
          default:
              return ""; // ถ้า field ไม่ตรงกับที่กำหนด
      }
  }
}

// Example Driver class
export class Driver extends Person {
  constructor(name, contact, licenseNumber) {
    super(name, contact);
    this.licenseNumber = licenseNumber;
  }

  getRole() {
    return "Driver";
  }
}
