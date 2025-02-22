import { createSlice } from "@reduxjs/toolkit";

type chatSliceProps = {
    title: string;
    chatControl:boolean;
    codeWindow: boolean;
    favouriteChat:string
}
const initialState:chatSliceProps = {
    title:"",
    chatControl:false,
    codeWindow:false,
    favouriteChat:""
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
        setShowCodeWindow(state, action) {
            state.codeWindow = action.payload
        },
        setFavouriteChat(state, action) {
            state.favouriteChat = action.payload;
        },
        reset() {
            initialState
        }
    }
});


export const ChatActons = ChatSlice.actions;
export default ChatSlice;
