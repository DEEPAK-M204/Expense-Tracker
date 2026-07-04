const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  addExpense, getExpenses, updateExpense, deleteExpense,
  getCategorySummary, getMonthlySummary
} = require('../controllers/expenseController');

router.use(auth); // every route below requires a valid token

router.post('/', addExpense);
router.get('/', getExpenses);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);
router.get('/summary/category', getCategorySummary);
router.get('/summary/monthly', getMonthlySummary);

module.exports = router;