import { createSlice } from "@reduxjs/toolkit";

type chatSliceProps = {
    title: string;
    chatControl:boolean;
    codeWindow: boolean;
    favouriteChat:string;
    editiedQuestion: string;
    reGenerateInitial:boolean;
    reGenerateSecondary:boolean;
}
const initialState:chatSliceProps = {
    title:"",
    chatControl:false,
    codeWindow:false,
    favouriteChat:"",
    editiedQuestion:"",
    reGenerateInitial:false,
    reGenerateSecondary:false,

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
        setEditiedQuestion(state, action) {
            state.editiedQuestion = action.payload;
        },
        reGenerateText(state, action) {
            state.reGenerateInitial = action.payload;
        },
        reGenerateSecondary(state, action) {
            state.reGenerateSecondary = action.payload;
        },
        reset() {
            initialState
        }
    }
});


export const ChatActons = ChatSlice.actions;
export default ChatSlice;
