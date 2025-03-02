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

        res.status(200).json({ success: true, message: '✔ Mission failed successfully 🤔' });
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

        res.status(200).json({ success: true, message: `${user.name} has a total income of $${income}.`, income });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error!", error });
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
        return res.status(500).json({ success: false, message: "Internal server error!", error });
    }
};
// -------------------------------------------------------------------------------------------------------------------------

// function to get first and last date of current month
const getCurrentMonthRange = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.toLocaleString('default', { month: 'long' }); 
    const firstDay = new Date(year, now.getMonth(), 1); 
    const lastDay = new Date(year, now.getMonth(), now.getDate());

    return { firstDay, lastDay, month, year };
};

export const total_income_of_current_month = async (req, res) => {
    try {
        const user = req.user;
        const { firstDay, lastDay, month, year } = getCurrentMonthRange();

        const incomeTransactions = await transaction.find({
            createdBy: user._id,
            type: 'income',
            date: { $gte: firstDay, $lte: lastDay }
        });

        const totalIncome = incomeTransactions.reduce((sum, t) => sum + Number(t.amount), 0);
        
        res.status(200).json({ 
            success: true, 
            message: `${user.name} has a total income of $${totalIncome} in ${month} from day ${firstDay.getDate()} to ${lastDay.getDate()}.`,
            income: totalIncome,
            month: `${month} ${year}`,
            date: `${firstDay.getDate()} to ${lastDay.getDate()} ${month} - ${year}`
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error!", error });
    }
};

// -------------------------------------------------------------------------------------------------------------------------

export const total_expense_of_current_month = async (req, res) => {
    try {
        const user = req.user;
        const { firstDay, lastDay, month, year } = getCurrentMonthRange();

        const expenseTransactions = await transaction.find({
            createdBy: user._id,
            type: 'expense',
            date: { $gte: firstDay, $lte: lastDay } 
        });

        const totalExpense = expenseTransactions.reduce((sum, t) => sum + Number(t.amount), 0);

        res.status(200).json({ 
            success: true, 
            message: `${user.name} has a total expense of $${totalExpense} in ${month} from day ${firstDay.getDate()} to ${lastDay.getDate()}.`,
            expense: totalExpense,
            month: `${month} ${year}`,
            date: `${firstDay.getDate()} to ${lastDay.getDate()} ${month} - ${year}`
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error!", error });
    }
};



