// components/chatbot/ChatbotWrapper.js
"use client";

import { useEffect, useRef } from "react";

export default function ChatbotWrapper({
  apiUrl = "https://chatbot-soa.onrender.com/chat",
  title = "Trợ lý ảo",
  position = "bottom-right"
}) {
  const chatbotRef = useRef(null);

  useEffect(() => {
    // Chỉ chạy trên client
    if (typeof window === "undefined") return;
    
    console.log("🚀 Đang khởi tạo Chatbot Widget...");
    
    // Import động để tránh lỗi SSR
    import("./chatbot-widget")
      .then((module) => {
        chatbotRef.current = new module.ChatbotWidget({
          apiUrl,
          title,
          position
        });
        console.log("✅ Chatbot Widget đã được khởi tạo thành công!");
      })
      .catch((error) => {
        console.error("❌ Lỗi khi khởi tạo chatbot:", error);
      });

    // Cleanup khi component unmount
    return () => {
      if (chatbotRef.current?.destroy) {
        console.log("🧹 Đang dọn dẹp Chatbot Widget...");
        chatbotRef.current.destroy();
      }
    };
  }, [apiUrl, title, position]);

  return null;
}