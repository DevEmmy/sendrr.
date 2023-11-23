import { Service } from "typedi";
import Device from "../models/devices.model";
import "reflect-metadata";

@Service()
class DeviceService{
    constructor(private readonly model = Device){

    }

    async save(data: any){
        let result = await new this.model(data).save()
        return result
    }

    async getDeviceByUsername(username: string){
        let result = await this.model.findOne({username}).populate("myDevices")
        return result;
    }
}

export default DeviceService