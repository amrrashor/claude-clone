import { configureStore } from "@reduxjs/toolkit";
import ChatSlice from "./Chat/Chat.slice";

const store = configureStore({
    reducer: {
        chat: ChatSlice.reducer
    }
});

export default store;