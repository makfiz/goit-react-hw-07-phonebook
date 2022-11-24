import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://637f73835b1cc8d6f945cb00.mockapi.io";

export const fetchContacts = createAsyncThunk("contacts/fetchAll", async (_, thunkAPI) => {
    try {
        const response = await axios.get("/contacts")
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})

export const addContact = createAsyncThunk("contacts/addContact", async ({ phone, name }, thunkAPI) => {
    try {
        const response = await axios.post("/contacts", {phone, name})
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})

export const deleteContact = createAsyncThunk("contacts/deleteContact", async (id, thunkAPI) => {
    try {
        const response = await axios.delete(`/contacts/${id}`)
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})
