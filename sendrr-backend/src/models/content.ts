import {Schema} from "mongoose"
import mongoose from "mongoose"

const schema = new Schema({
    content: String,
    toDevice: {type: Schema.Types.ObjectId, ref: "Device"},
    fromDevice: {type: Schema.Types.ObjectId, ref: "Device"}
},
{
    timestamps: true
})

const Content = mongoose.model("Content", schema)
export default Content