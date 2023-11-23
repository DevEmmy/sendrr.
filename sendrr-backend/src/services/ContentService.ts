import { Service } from "typedi";
import Device from "../models/devices.model";
import "reflect-metadata";
import Content from "../models/content";

@Service()
class ContentService{
    constructor(private readonly model = Content){

    }

    async save(data: any){
        let result = await new this.model(data).save()
        return result
    }

    async getContentsByUser(deviceId: string){
        let result = await this.model.find({toDevice: deviceId})
        return result;
    }

    
}

export default ContentService