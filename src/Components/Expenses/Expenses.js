import React, { useEffect, useRef, useState } from 'react';
import './Expenses.css';
import ExpenseItem from './ExpenseItem';
import { useDispatch, useSelector } from 'react-redux';
import { editExpense, submitExpense } from '../../Store/expense-slice';

const Expenses = () => {
    const [toEdit, setToEdit] = useState(null)
    const amountRef = useRef()
    const descRef = useRef()
    const ctgrRef = useRef()
    // const ctx = useContext(AuthContext)
    const dispatch = useDispatch()
    const expenses = useSelector(state => state.expense.expenses)
    const mailId = useSelector(state => state.auth.mailId)

    useEffect(() => {
        if (toEdit) {
            amountRef.current.value = toEdit.amount;
            descRef.current.value = toEdit.description;
            ctgrRef.current.value = toEdit.category
        }
    }, [toEdit])

    const submitHandler = e => {
        e.preventDefault()

        const enteredData = {
            amount: amountRef.current.value,
            description: descRef.current.value,
            category: ctgrRef.current.value
        }
        if (toEdit) {
            // ctx.editExpense(enteredData, toEdit.id)
            dispatch(editExpense(enteredData, toEdit.id, mailId))

        } else {
            // ctx.onSubmitExpense(enteredData)
            dispatch(submitExpense(enteredData, mailId))
        }
        setToEdit(null)
        amountRef.current.value = ''
        descRef.current.value = ''
    };

    const editHandler = (id) => {
        // const expenseToEdit = ctx.expenses.find(expense => expense.id === id)
        const expenseToEdit = expenses.find(expense => expense.id === id)
        setToEdit(expenseToEdit)
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
                <ExpenseItem onClickEdit={editHandler} />
            </div>
        </div>
    )
}

export default Expenses;