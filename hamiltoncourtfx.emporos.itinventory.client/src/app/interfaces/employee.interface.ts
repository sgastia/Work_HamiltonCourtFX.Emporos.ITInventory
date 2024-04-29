import { DeviceInterface } from "./device.interface";

export interface EmployeeInterface {
  id: number;
  name: string;
  email: string;
  devices: DeviceInterface[];
}
