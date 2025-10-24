import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore"
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
const ChatContainer = () => {

  const {messages, getMessages, isMessegesLoading, selectedUsers} = useChatStore();

  if(isMessegesLoading) return <div>Loading...</div>

  useEffect(() => {
    getMessages(selectedUsers._id)
  }, [selectedUsers._id,getMessages]);

  return(
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <p>messages...</p>

      <MessageInput />
    </div>
  )
}

export default ChatContainer
