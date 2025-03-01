import transaction from '../models/transactionModel.js';

// -------------------------------------------------------------------------------------------------------------------------
export const getall = async (req, res) => {
    try {
        const user = req.user;
        const all_transactions = await transaction.find({ createdBy: user._id });

        res.status(200).json({ success: true, user_name: user.name, transactions: all_transactions });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
};
// -------------------------------------------------------------------------------------------------------------------------
export const add_New_transcation = async (req, res) => {
    try {
        const user = req.user;
        const { title, amount, category, type, date } = req.body;

        if (!title || !amount || !category || !type || !date) {
            return res.status(400).json({ success: false, message: "⚠️ All fields are required. Please fill in all details." });
        }

        // Validate that amount is a positive number without signs
        if (!/^\d+(\.\d{1,2})?$/.test(amount)) {
            return res.status(400).json({ success: false, message: "❌ Invalid amount. Please enter a positive number without signs." });
        }

        let message = "";
        if (type === "income") {
            message = `🎉 Great! You've added an income of $${amount}. Keep growing your finances! 💰`;
        } else if (type === "expense") {
            message = `💸 Expense recorded: $${amount}. Track your spending wisely! 😉`;
        }

        const newTransaction = new transaction({
            createdBy: user._id,
            title,
            amount: Number(amount), // Ensure it's stored as a number
            category,
            type,
            date
        });

        await newTransaction.save();

        res.status(201).json({ success: true, message });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
};
// -------------------------------------------------------------------------------------------------------------------------
export const delete_transcation = async (req, res) => {
    try {
        const { id } = req.params;
        const find_transaction = await transaction.findById(id);

        if (!find_transaction) {
            return res.status(404).json({ success: false, message: "❌ Transaction not found with this ID." });
        }

        await transaction.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: '✔ Transaction deleted successfully.' });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
};
// -------------------------------------------------------------------------------------------------------------------------
export const update_transcation = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, amount, category, type, date } = req.body;

        if (!title || !amount || !category || !type || !date) {
            return res.status(400).json({ success: false, message: "⚠️ All fields are required to update, kindly fill all." });
        }

        const updatedTransaction = await transaction.findByIdAndUpdate(
            id,
            { title, amount: Number(amount), category, type, date },
            { new: true }
        );

        if (!updatedTransaction) {
            return res.status(404).json({ success: false, message: "❌ Transaction not found with this ID." });
        }

        res.status(200).json({ success: true, message: "✔ Transaction updated successfully.", updatedTransaction });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
};
// -------------------------------------------------------------------------------------------------------------------------
export const get_transaction_by_id = async (req, res) => {
    try {
        const { id } = req.params;
        const single_transaction = await transaction.findById(id);

        if (!single_transaction) {
            return res.status(404).json({ success: false, message: "❌ Transaction ID not found!" });
        }

        res.status(200).json({ success: true, transaction: single_transaction });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
};
// -------------------------------------------------------------------------------------------------------------------------
export const total_income = async (req, res) => {
    try {
        const user = req.user;
        const all_income_transactions = await transaction.find({ createdBy: user._id, type: 'income' });

        const income = all_income_transactions.reduce((sum, t) => sum + Number(t.amount), 0);

        if(income == 0 || !income){
            income = 0
        }

        res.status(200).json({ success: true, message: `${user.name} has a total income of $${income}.`, income });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
};
// -------------------------------------------------------------------------------------------------------------------------
export const total_expense = async (req, res) => {
    try {
        const user = req.user;
        const all_expense_transactions = await transaction.find({ createdBy: user._id, type: 'expense' });

        const expense = all_expense_transactions.reduce((sum, t) => sum + Number(t.amount), 0);

        res.status(200).json({ success: true, message: `${user.name} has a total expense of $${expense}.`, expense });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
};
// -------------------------------------------------------------------------------------------------------------------------
