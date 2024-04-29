import { DeviceInterface } from "../interfaces/device.interface";
import { EmployeeInterface } from "../interfaces/employee.interface";

export class EmployeeModel implements EmployeeInterface {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public devices: DeviceInterface[]
  ) { }

} 
