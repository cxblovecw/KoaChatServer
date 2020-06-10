import mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/chatApp", { useUnifiedTopology: true, useNewUrlParser: true });
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  userName: String,
  password: String,
  friend: [
    {
      account: Number,
      subGroup: String,
      remark: String,
      records:{
        type:{
          recordType: String,
          localUrl: String,
          remoteUrl: String,
          time: String,
          from: Number,
          to: Number,
          fileName: String,
          context: String,
          callDuration: Number,
        },
        index:true
      }
    },
  ],
  phone: String,
  account: Number,
  qcCodeUrl: String,
  avatarUrl: String,
  signature: {
    type:[{
      date:String,
      text:String,
    }],
    index:true,
  },
  group: Array,
  sex: String,
  age: Number,
  birthday: String
})

const User = mongoose.model('user', UserSchema)

export { User }