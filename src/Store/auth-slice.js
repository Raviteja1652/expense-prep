import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { expenseActions } from "./expense-slice";

const formatMail = (mail) => {
    return mail
}

const initialState = {
    token: localStorage.getItem('token'),
    mailId: localStorage.getItem('mailId')
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        login(state, action) {
            state.token = action.payload.token
            state.mailId = action.payload.changedMail
        },
        logout(state) {
            state.token = null
            state.mailId = null
        },
        pageLoad() {}
    }
});

export const authActions =  authSlice.actions;

export default authSlice.reducer;


export const onLogin = (token, changedMail) => {
    return (dispatch) => {
        localStorage.setItem('token', token)
        localStorage.setItem('mailId', changedMail)
        dispatch(authActions.login({token, changedMail}))

        const sendRequest = async () => {
            try {
                const res = await axios.get(`https://api-calls-prep-default-rtdb.firebaseio.com/_${changedMail}_expenses.json`)
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
        }
        sendRequest()
    }
};

export const onLogout = () => {
    return (dispatch) => {
        localStorage.removeItem('token')
        localStorage.removeItem('mailId')
        dispatch(authActions.logout())
    }
}