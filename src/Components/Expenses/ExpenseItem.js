import React, { useContext } from 'react'
import Card from '../UI/Card';
import './ExpenseItem.css'
import AuthContext from '../../Store/AuthContext';

const ExpenseItem = () => {
    const ctx = useContext(AuthContext);

    const listOfExpenses = ctx.expenses.map(expense => (
        <li className='expense-item'>

            <div className='expense-amount'>{expense.amount}</div>
            <div className='expense-desc'>{expense.description}</div>
            <div className='expense-catg'>{'  '}{expense.category}</div>
            <div className='expense-actions'>
                <button className='expense-item-button-edit'>Edit</button>
                <button className='expense-item-button'>Delete</button>
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