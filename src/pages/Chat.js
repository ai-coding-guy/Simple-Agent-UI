import React, { useState, useRef, useEffect } from "react";
import { marked } from 'marked'

import Sidebar from "../components/Sidebar";
import { FaArrowUp } from "react-icons/fa6";

const Chat = () => {
    const [chatMessages, setChatMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const chatRef = useRef(null);

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [chatMessages]);

    const handleSendMessage = async () => {
        if (input.trim()) {
            setChatMessages([...chatMessages, { sender: 'user', message: input }]);
            setIsLoading(true);
            setChatMessages((prevMessage) => [
                ...prevMessage,
                { sender: 'bot', message: "" }
            ]);
            const data_user = {
                "username": "demo",
                "message": input,
              }
            setInput("");
            const responseMessage = await callChatAPI(data_user);
            if (responseMessage) {
                setChatMessages((prevMessage) => {
                    const updatedMessages = [...prevMessage];
                    updatedMessages[updatedMessages.length - 1] = { sender: 'bot', message: responseMessage.data[0].text };
                    return updatedMessages;
                });
            }
            setIsLoading(false);
        }
    };

    const callChatAPI = async (user_message) => {
        try {
            const response = await fetch("http://localhost:5000", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user_message)
            });

            const data = await response.json();

            return data.data;
        } catch (error) {
            console.error("Error calling API:", error);
            return [{ "recipient_id": "user", "text": "The system is maintaining..." }];
        }
    };

    const renderMessage = (msg, index) => {
        if (isLoading && msg.sender === "bot" && msg.message === "") {
            return (
                <div key={index} className="max-w-full md:max-w-[80%] self-start py-4">
                    <div className="text-gray-900 loading-dots">
                        <span>.</span>
                        <span>.</span>
                        <span>.</span>
                    </div>
                </div>
            );
        } else if (msg.sender === "bot") {
            const htmlContent = marked(msg.message);
            return (
                <p
                    key={index}
                    className="max-w-full md:max-w-[80%] self-start py-4"
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                >
                </p>
            );
        } else {
            return (
                <p key={index} className="max-w-full md:max-w-[80%] p-4 rounded-2xl bg-gray-100 self-end">
                    {msg.message}
                </p>
            )
        }
    }

    return (
        <div className="h-dvh min-h-[100dvh] flex flex-col md:flex-row">
            <Sidebar />
            <div className="flex-1 h-screen flex flex-col justify-center bg-white">
                {chatMessages.length === 0 && (
                    <div className="mx-auto text-center mb-6 flex flex-col gap-2">
                        <div className="text-4xl font-bold">
                            Hello, I am Agent
                        </div>
                        <div>
                            What can I help with?
                        </div>
                    </div>
                )}
                {chatMessages.length >= 1 && (
                    <div ref={chatRef} className="flex-1 p-2 overflow-auto">
                        <div className="p-2 space-y-2 flex flex-col h-full w-full md:w-[55%] mx-auto">
                            {chatMessages.map((msg, index) => renderMessage(msg, index))}
                        </div>
                    </div>
                )}
                <div className="p-2 flex flex-col">
                    <div className="w-full md:w-[60%] mx-auto flex bg-white border border-gray-300 items-center p-4 rounded-3xl">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 p-2 rounded-lg shadow-sm focus:outline-none"
                            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        />
                        <button
                            onClick={handleSendMessage}
                            className="ml-2 p-4 bg-neutral-800 text-white rounded-full shadow-md hover:bg-neutral-600">
                            <FaArrowUp></FaArrowUp>
                        </button>
                    </div>
                    <div className="mx-auto text-xs text-gray-400 pt-2">
                        Agent can make mistakes. Copyright by tungdt.bk@gmail.com
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;