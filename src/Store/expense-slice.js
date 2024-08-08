import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { authActions } from "./auth-slice";

const initialState = {
    expenses: []
}
const expenseSlice = createSlice({
    name: 'expense',
    initialState: initialState,
    reducers: {
        addExpense(state, action) {
            state.expenses = action.payload.items
        },
        edit(state, action) {
            const id = action.payload.id
            const existingExpense = state.expenses.findIndex(exp => exp.id === id)
            state.expenses[existingExpense] = action.payload.enteredData
        },
        delete(state, action) {
            state.expenses = state.expenses.filter(exp => exp.id !== action.payload)
        }
    }
});

export const expenseActions = expenseSlice.actions;

export default expenseSlice.reducer;


export const onPageLoad = (token, mailId) => {
    return (dispatch) => {
        dispatch(authActions.login({token, changedMail: mailId}))

        const sendRequest = async () => {
            try {
                const res = await axios.get(`https://api-calls-prep-default-rtdb.firebaseio.com/_${mailId}_expenses.json`)
                const data = await res.data
                let reqData = []
                for (let key in data) {
                    reqData.push({...data[key], id: key})
                }

                dispatch(expenseActions.addExpense({items: reqData || []}))

                console.log(data)
                console.log(reqData)
            } catch (error) {
                console.log(error)
            }
        }
        sendRequest()
    }
}

export const submitExpense = (enteredData, mailId) => {
    return (dispatch) => {
        const sendRequest = async () => {
            try {
                const res = await axios.post(`https://api-calls-prep-default-rtdb.firebaseio.com/_${mailId}_expenses.json`, enteredData)
                const data = await res.data
                console.log(data)
            } catch (error) {
                console.log(error)
            }
    
            try {
                const res = await axios.get(`https://api-calls-prep-default-rtdb.firebaseio.com/_${mailId}_expenses.json`)
                const data = await res.data
                let reqData = []
                for (let key in data) {
                    reqData.push({...data[key], id: key})
                }

                dispatch(expenseActions.addExpense({items: reqData || []}))

                console.log(data)
            } catch (error) {
                console.log(error)
            }
        };
        sendRequest()
    }
}

export const editExpense = (enteredData, id, mailId) => {
    return (dispatch) => {
        const sendRequest = async () => {
            try {
                console.log('from exp-slice edit func', id, mailId)
                const res = await axios.put(`https://api-calls-prep-default-rtdb.firebaseio.com/_${mailId}_expenses/${id}.json`, enteredData);
                const data = await res.data
                console.log(data)
                const transformed = {...enteredData, id: id}

                dispatch(expenseActions.edit({id, enteredData: transformed}))

            } catch (error) {
                console.log(error)
            }
        }
        sendRequest()
    }
}

export const deleteExpense = (id, mailId) => {
    return (dispatch) => {
        const sendRequest = async () => {
            console.log('from expense-slice', id)
            try {
                console.log('from exp-slice, ', mailId, 'and! ', id)
                const res = await axios.delete(`https://api-calls-prep-default-rtdb.firebaseio.com/_${mailId}_expenses/${id}.json`)
                const data = await res.data
                console.log(data)

                dispatch(expenseActions.delete(id))

            } catch (error) {
                console.log(error)
            }
        }
        sendRequest()
    }
}