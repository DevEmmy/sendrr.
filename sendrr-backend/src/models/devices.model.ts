import {Schema} from "mongoose"
import mongoose from "mongoose"

const schema = new Schema({
    deviceName: String,
    username: String,
    myDevices: [{type: Schema.Types.ObjectId, ref: "Device"}]
},
{
    timestamps: true
})

const Device = mongoose.model("Device", schema)
export default Device