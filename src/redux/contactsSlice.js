import { createSlice } from "@reduxjs/toolkit";

import { fetchContacts, addContact, deleteContact } from "redux/operations";

const contactsInitialState = {
    items: [],
    isLoading: false,
    error: null
}

// const contactsSlice = createSlice({
//     name: "contacts",
//     initialState: contactsInitialState,
//     reducers: {
//         fetchingInProgress(state) {
//             state.isLoading = true;
//          },
//         fetchingSuccess(state, action) {
//             state.isLoading = false;
//             state.error = null;
//             state.items = action.payload
//          },
//         fetchingError(state, action) {
//             state.isLoading = false;
//             state.error = action.payload
//         },
//         addContact: {
//             reducer(state, action) {
//                 state.items.push(action.payload)
//             },
//             prepare(name, number) {
//                 return {
//                     payload: {
//                         id: shortid.generate(),
//                         name,
//                         number,
//                     }
//                 }
//             },
//         },
//         deleteContact(state, action) {
//             const index = state.items.findIndex(contact => contact.id === action.payload)
//             state.items.splice(index, 1);
//         }
//     }
// })

const contactsSlice = createSlice({
    name: "contacts",
    initialState: contactsInitialState,
    reducers: {
        
        deleteContact(state, action) {
            const index = state.items.findIndex(contact => contact.id === action.payload)
            state.items.splice(index, 1);
        }
    },
    extraReducers: {
        [fetchContacts.pending](state) {
            state.isLoading = true;
        },
        [fetchContacts.fulfilled](state, action) {
            state.isLoading = false;
            state.error = null;
            state.items = action.payload
        },
        [fetchContacts.rejected](state, action) {
            state.isLoading = false;
            state.error = action.payload
        },
        [addContact.pending](state) {
            state.isLoading = true;
        },
        [addContact.fulfilled](state, action) {
            state.isLoading = false;
            state.error = null;
            state.items.push(action.payload)
        },
        [addContact.rejected](state, action) {
            state.isLoading = false;
            state.error = action.payload
        },
        [deleteContact.pending](state) {
            state.isLoading = true;
        },
        [deleteContact.fulfilled](state, action) {
            state.isLoading = false;
            state.error = null;
            const index = state.items.findIndex(contact => contact.id === action.payload)
            state.items.splice(index, 1);
        },
        [deleteContact.rejected](state, action) {
            state.isLoading = false;
            state.error = action.payload
        },
    }
})

// export const { addContact, deleteContact, fetchingInProgress, fetchingSuccess, fetchingError} = contactsSlice.actions;
// export const { deleteContact} = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;