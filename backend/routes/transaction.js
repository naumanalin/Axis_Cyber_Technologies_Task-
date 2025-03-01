import express from 'express';
import { getall, add_New_transcation, delete_transcation, get_transaction_by_id, update_transcation, total_expense, total_income, total_expense_of_current_month, total_income_of_current_month } from '../controllers/transaction_Controller.js';
import { isLogedin } from '../middlewares/isLogedIn.js';

const router = express.Router();

router.get('/', isLogedin, getall );
router.post('/', isLogedin, add_New_transcation);
router.delete('/:id', isLogedin, delete_transcation);

// extra api
router.get('/:id', isLogedin, get_transaction_by_id)
router.put('/transaction/update/:id', isLogedin, update_transcation)
router.get('/total/income', isLogedin, total_income)
router.get('/total/expense', isLogedin, total_expense)
router.get('/total/income/of-current-month', isLogedin, total_income_of_current_month )
router.get('/total/expense/of-current-month', isLogedin, total_expense_of_current_month)

export default router;