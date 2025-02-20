import { createSlice } from "@reduxjs/toolkit";



type chatSliceProps = {
    title: string;
}
const initialState:chatSliceProps = {
    title:"",
};


const ChatSlice = createSlice({
    name:"Chatslice",
    initialState:initialState,
    reducers: {
        setQuestionTitle(state, actions) {
            state.title = actions.payload;
        },
        reset() {
            initialState
        }
    }
});


export const ChatActons = ChatSlice.actions;

export default ChatSlice;
