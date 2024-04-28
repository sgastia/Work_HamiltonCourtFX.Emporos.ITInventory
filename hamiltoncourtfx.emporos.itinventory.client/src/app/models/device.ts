import { DeviceInterface } from "../interfaces/device.interface";

export class DeviceModel implements DeviceInterface {
  constructor(
    public id: number,
    public deviceType: string,
    public description: string,

  ) { }

} 
