import React, { useContext } from 'react'
import Card from '../UI/Card';
import './ExpenseItem.css'
import AuthContext from '../../Store/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { deleteExpense } from '../../Store/expense-slice';

const ExpenseItem = (props) => {
    // const ctx = useContext(AuthContext);
    const dispatch = useDispatch()
    const expenses = useSelector(state => state.expense.expenses)
    const mailId = useSelector(state => state.auth.mailId)

    const deleteHandler = id => {
        dispatch(deleteExpense(id, mailId))
    }

    const listOfExpenses = expenses.map(expense => (
        <li key={expense.id} className='expense-item'>

            <div className='expense-amount'>{expense.amount}</div>
            <div className='expense-desc'>{expense.description}</div>
            <div className='expense-catg'>{'  '}{expense.category}</div>
            <div className='expense-actions'>
                <button className='expense-item-button-edit' onClick={() => props.onClickEdit(expense.id)}>Edit</button>
                <button className='expense-item-button' onClick={() => deleteHandler(expense.id)}>Delete</button>
            </div>

        </li>
    ))

  return (
    <section className='expense-list'>
        <Card>
            <ul>
                {listOfExpenses}
            </ul>
        </Card>
    </section>
  )
}

export default ExpenseItem;