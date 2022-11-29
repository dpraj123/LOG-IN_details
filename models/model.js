import mongoose from "mongoose";

// define schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  term: { type: Boolean, required: true },
});
// trim for ignore space in string
// model
const Usermodel = mongoose.model("user", UserSchema);
export default Usermodel;
