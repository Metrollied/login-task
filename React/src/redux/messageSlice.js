import { createSlice } from "@reduxjs/toolkit";

export const messageSlice = createSlice({
	name: "message",
	initialState: {
		text: ""
	},
	reducers: {
		change: (state, action) => {
			state.text = action.payload
		},
		remove: (state, action) => {
			state.text = "";
		}
	}
})

export const { change, remove } = messageSlice.actions;
export default messageSlice.reducer;