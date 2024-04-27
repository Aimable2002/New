import React from "react";
import { create } from 'zustand'

const messageZustand = create ((set) => ({
    selectedUser: null,
    setUser: (selectedUser) => set({selectedUser}),
    messages: [],
    setMessages: (messages) => set({messages})
}))

export default messageZustand;