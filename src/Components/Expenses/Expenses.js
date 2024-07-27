import React, { useContext, useRef } from 'react';
import './Expenses.css';
import ExpenseItem from './ExpenseItem';
import AuthContext from '../../Store/AuthContext';

const Expenses = () => {
    const amountRef = useRef()
    const descRef = useRef()
    const ctgrRef = useRef()
    const ctx = useContext(AuthContext)

    const submitHandler = e => {
        e.preventDefault()

        const enteredData = {
            amount: amountRef.current.value,
            description: descRef.current.value,
            category: ctgrRef.current.value
        }
        
        ctx.onSubmitExpense(enteredData)

        amountRef.current.value = ''
        descRef.current.value = ''
    }

    return (
        <div>
            <form className='expenses-form' onSubmit={submitHandler}>
                <div>
                    <label>Amount: </label>
                    <input type='number' ref={amountRef}></input>
                </div>
                <div>
                    <label>Description: </label>
                    <input type='text' ref={descRef}></input>
                </div>
                <div>
                    <label htmlFor='category'>Category: </label>
                    <select id='category' ref={ctgrRef}>
                        <option value='Food'>Food</option>
                        <option value='Grocery'>Grocery</option>
                        <option value='Entertainment'>Entertainment</option>
                        <option value='Petrol'>Petrol</option>
                    </select>
                </div>
                <button className='expenses-button'>Add</button>
            </form>
            <div>
                <ExpenseItem />
            </div>
        </div>
    )
}

export default Expenses;