import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import contactService from "./contactService";

const initialState = {
  contact: "",
  isError: false,
  isLoading: false,
};

// get contact
export const getContact = createAsyncThunk("contact", async (_, thunkAPI) => {
  try {
    return await contactService.getContact();
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    console.log(message);
    return thunkAPI.rejectWithValue(message);
  }
});

// add contact
export const addContact = createAsyncThunk("contact/add", async (data, thunkAPI) => {
  console.log(data);
  try {
    return await contactService.addContact(data);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    console.log(message);
    return thunkAPI.rejectWithValue(message);
  }
});

// edit contact
export const editContact = createAsyncThunk("contact/edit", async (data, thunkAPI) => {
  // console.log(data);
  try {
    return await contactService.editContact(data);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    console.log(message);
    return thunkAPI.rejectWithValue(message);
  }
});

// delete contact
export const deleteContact = createAsyncThunk("contact/delete", async (data, thunkAPI) => {
  console.log(data);
  try {
    return await contactService.deleteContact(data);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    console.log(message);
    return thunkAPI.rejectWithValue(message);
  }
});

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contact = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(getContact.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.contact = "";
      })
      .addCase(addContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.isSuccess = true;
      })
      .addCase(addContact.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(editContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editContact.fulfilled, (state, action) => {
        console.log(action);
        state.isLoading = false;
        state.message = action.payload.message;
        state.isSuccess = true;
      })
      .addCase(editContact.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        console.log(action);
        state.isLoading = false;
        state.contact = state.contact && state.contact.filter((contact) => contact.id !== action.payload.id);
        state.message = action.payload.message;
        state.isSuccess = true;
      })
      .addCase(deleteContact.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
        state.isError = true;
        state.contact = action.payload.data;
        state.message = action.payload;
      });
  },
});

export const { reset } = contactSlice.actions;
export default contactSlice.reducer;
