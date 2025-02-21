import { createSlice } from "@reduxjs/toolkit";



type chatSliceProps = {
    title: string;
    chatControl:boolean;
}
const initialState:chatSliceProps = {
    title:"",
    chatControl:false,

};


const ChatSlice = createSlice({
    name:"Chatslice",
    initialState:initialState,
    reducers: {
        setQuestionTitle(state, actions) {
            state.title = actions.payload;
        },
        setShowChatControl(state, action) {
            state.chatControl = action.payload
        },
        reset() {
            initialState
        }
    }
});


export const ChatActons = ChatSlice.actions;

export default ChatSlice;
