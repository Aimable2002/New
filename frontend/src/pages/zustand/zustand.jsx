
// import React from "react";
// import { create } from 'zustand'

// const Conversation = create ((set) => ({
//     selectedUser: null,
//     setUser: (selectedUser) => set({selectedUser}),
//     messages: [],
//     setMessages: (messages) => set({messages})
// }))

// export default Conversation;



import { create } from 'zustand';

const initialState = {
    selectedUser:  JSON.parse(localStorage.getItem('selectedUser')) ||null,
    messages: [],
};

const Conversation = create((set) => ({
    ...initialState,
    setUser: (user) => {
        if(!user) {
            localStorage.removeItem('selectedUser')
        }else{
        localStorage.setItem('selectedUser', JSON.stringify(user));
    }
        set({ selectedUser: user });
    },
    setMessages: (messages) => set({ messages }),
}));

export default Conversation;