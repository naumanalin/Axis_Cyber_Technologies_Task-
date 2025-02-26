import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: [true, "Transaction must have a creator (User ID)."],
  },
  title: {
    type: String,
    required: [true, "Transaction title is required."],
    trim: true,
  },
  amount: {
    type: Number,
    required: [true, "Transaction amount is required."],
    min: [0, "Amount must be a positive number."],
  },
  category: {
    type: String,
    required: [true, "Transaction category is required."],
  },
  type: {
    type: String,
    enum: ["income", "expense"],
    required: [true, "Transaction type must be either 'income' or 'expense'."],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
