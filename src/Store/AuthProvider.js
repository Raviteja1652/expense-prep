import React, { useState } from "react";
import AuthContext from "./AuthContext";
import axios from "axios";

const formatMail = (email) => {
    const formatted = email
    return formatted
};

const AuthProvider = props => {
    const initialToken = localStorage.getItem('token')
    const [token, setToken] = useState(initialToken)
    const [mailId, setMailId] = useState('')
    const [expensesData, setExpensesData] = useState([])

    const loginHandler = async (token, changedMail) => {
        setToken(token)
        localStorage.setItem('token', token)
        const formatted = formatMail(changedMail)
        setMailId(prev => {
            return formatted
        })
        localStorage.setItem('mailId', changedMail)

        setExpensesData([])
        try {
            const res = await axios.get(`https://api-calls-prep-default-rtdb.firebaseio.com/_${formatted}_expenses.json`)
            const data = await res.data
            let reqData = []
            for (let key in data) {
                reqData.push({...data[key], id: key})
            }
            setExpensesData(reqData)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    };

    const logoutHandler = () => {
        setToken(null)
        localStorage.removeItem('token')
        setMailId('')
        localStorage.removeItem('mailId')
    };

    const pageLoadHandler = async () => {
        const token = localStorage.getItem('token')
        setToken(token)
        const mailId = localStorage.getItem('mailId')
        const formatted = formatMail(mailId)
        setMailId(prev => {
            return formatted
        });

        try {
            const res = await axios.get(`https://api-calls-prep-default-rtdb.firebaseio.com/_${mailId}_expenses.json`)
            const data = await res.data
            let reqData = []
            for (let key in data) {
                reqData.push({...data[key], id: key})
            }
            setExpensesData(reqData)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    };

    const submitExpenseHandler = async (enteredData) => {
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
            setExpensesData(reqData)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    };
    const deleteExpenseHandler = async (id) => {
        try {
            const res = await axios.delete(`https://api-calls-prep-default-rtdb.firebaseio.com/_${mailId}_expenses/${id}.json`)
            const data = await res.data
            console.log(data)
            setExpensesData(prev => {
                const updated = prev.filter(expense => expense.id !== id)
                return updated
            })
        } catch (error) {
            console.log(error)
        }
    };

    const editExpenseHandler = async (enteredData, id) => {
        try {
            const res = await axios.put(`https://api-calls-prep-default-rtdb.firebaseio.com/_${mailId}_expenses/${id}.json`, enteredData);
            const data = await res.data
            console.log(data)

            setExpensesData(prev => {
                const index = prev.findIndex(expense => expense.id === id)
                const updated = [...prev]
                updated[index] = {...enteredData, id: id}
                return updated
            });
        } catch (error) {
            console.log(error)
        }
    }

    const contextValue = {
        token: token,
        expenses: expensesData,
        onLogin: loginHandler,
        onLogout: logoutHandler,
        onSubmitExpense: submitExpenseHandler,
        deleteExpense: deleteExpenseHandler,
        editExpense: editExpenseHandler,
        onPageLoad: pageLoadHandler
    }

    return (
        <div>
            <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
        </div>
    )
};

export default AuthProvider;