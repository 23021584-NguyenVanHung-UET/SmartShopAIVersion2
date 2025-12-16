// src/components/chatbot/chatbot-widget.js
export class ChatbotWidget {
  constructor({ 
    apiUrl = "https://chatbot-soa.onrender.com/chat", 
    title = "Trợ lý ảo",
    position = "bottom-right"
  } = {}) {
    this.apiUrl = apiUrl;
    this.title = title;
    this.position = position;
    this.messages = [];
    this.isOpen = true;
    this.isMinimized = false;
    this.createWidget();
  }

  createWidget() {
    // Tạo container chính
    this.container = document.createElement("div");
    this.container.id = "chatbot-widget";
    this.container.className = "chatbot-container";
    document.body.appendChild(this.container);

    // Thêm CSS
    const style = document.createElement("style");
    style.textContent = `
      .chatbot-container {
        position: fixed;
        ${this.position === 'bottom-right' ? 'bottom: 20px; right: 20px;' : 
          this.position === 'bottom-left' ? 'bottom: 20px; left: 20px;' :
          this.position === 'top-right' ? 'top: 20px; right: 20px;' : 'top: 20px; left: 20px;'}
        width: 380px;
        height: 500px;
        background: white;
        border: 1px solid #333;
        border-radius: 10px;
        font-family: system-ui, -apple-system, sans-serif;
        z-index: 10000;
        display: flex;
        flex-direction: column;
        box-shadow: 0 8px 32px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
        overflow: hidden;
      }
      
      .chatbot-container.minimized {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        overflow: hidden;
        cursor: pointer;
        justify-content: center;
        align-items: center;
      }
      
      .chatbot-container.minimized .chatbot-header {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        border-radius: 50%;
        background: #000;
        color: white;
        font-size: 24px;
      }
      
      .chatbot-container.minimized .chatbot-header span {
        font-size: 24px;
      }
      
      .chatbot-container.minimized .chatbot-actions {
        display: none;
      }
      
      .chatbot-container.minimized .chatbot-messages,
      .chatbot-container.minimized .typing-indicator,
      .chatbot-container.minimized .chatbot-input-area {
        display: none !important;
      }
      
      .chatbot-header {
        background: #000;
        color: white;
        padding: 16px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #333;
        font-weight: 600;
        font-size: 16px;
      }
      
      .chatbot-actions {
        display: flex;
        gap: 8px;
      }
      
      .chatbot-actions button {
        background: transparent;
        color: white;
        border: 1px solid #666;
        border-radius: 4px;
        width: 28px;
        height: 28px;
        cursor: pointer;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
      }
      
      .chatbot-actions button:hover {
        background: #333;
      }
      
      .chatbot-messages {
        flex: 1;
        padding: 20px;
        overflow-y: auto;
        background: #fafafa;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      
      .message {
        max-width: 85%;
        padding: 12px 16px;
        border-radius: 18px;
        line-height: 1.5;
        word-wrap: break-word;
        animation: fadeIn 0.3s ease;
      }
      
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      .message.user {
        align-self: flex-end;
        background: #000;
        color: white;
        border-bottom-right-radius: 4px;
      }
      
      .message.bot {
        align-self: flex-start;
        background: white;
        color: #000;
        border: 1px solid #ddd;
        border-bottom-left-radius: 4px;
      }
      
      .chatbot-input-area {
        padding: 16px 20px;
        border-top: 1px solid #ddd;
        background: white;
        display: flex;
        gap: 12px;
        align-items: center;
      }
      
      .chatbot-input {
        flex: 1;
        padding: 12px 16px;
        border: 1px solid #ccc;
        border-radius: 20px;
        font-size: 14px;
        outline: none;
        background: white;
        color: #000;
        transition: border 0.2s;
      }
      
      .chatbot-input:focus {
        border-color: #000;
      }
      
      .chatbot-send {
        background: #000;
        color: white;
        border: none;
        border-radius: 20px;
        padding: 12px 24px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
        white-space: nowrap;
      }
      
      .chatbot-send:hover:not(:disabled) {
        background: #333;
        transform: scale(1.05);
      }
      
      .chatbot-send:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      
      .typing-indicator {
        display: flex;
        gap: 4px;
        padding: 0 20px 12px;
        align-items: center;
      }
      
      .typing-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #999;
        animation: typing 1.4s infinite;
      }
      
      .typing-dot:nth-child(2) {
        animation-delay: 0.2s;
      }
      
      .typing-dot:nth-child(3) {
        animation-delay: 0.4s;
      }
      
      @keyframes typing {
        0%, 60%, 100% {
          transform: translateY(0);
        }
        30% {
          transform: translateY(-4px);
        }
      }
      
      /* Scrollbar */
      .chatbot-messages::-webkit-scrollbar {
        width: 6px;
      }
      
      .chatbot-messages::-webkit-scrollbar-track {
        background: #f1f1f1;
      }
      
      .chatbot-messages::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 3px;
      }
      
      .chatbot-messages::-webkit-scrollbar-thumb:hover {
        background: #555;
      }
      
      /* Responsive */
      @media (max-width: 480px) {
        .chatbot-container {
          width: calc(100vw - 40px);
          max-width: 380px;
          bottom: 10px !important;
          left: 10px !important;
          right: 10px !important;
          top: auto !important;
        }
        
        .chatbot-container.minimized {
          width: 50px;
          height: 50px;
          bottom: 10px !important;
          right: 10px !important;
        }
      }
    `;
    document.head.appendChild(style);

    // Tạo nội dung widget - CHỈ CÒN NÚT MINIMIZE
    this.container.innerHTML = `
      <div class="chatbot-header">
        <span>${this.title}</span>
        <div class="chatbot-actions">
          <button class="chatbot-minimize" title="Thu nhỏ">−</button>
        </div>
      </div>
      
      <div class="chatbot-messages"></div>
      
      <div class="typing-indicator" style="display: none;">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <span style="margin-left: 8px; font-size: 13px; color: #666;">Đang trả lời...</span>
      </div>
      
      <div class="chatbot-input-area">
        <input 
          type="text" 
          class="chatbot-input" 
          placeholder="Nhập câu hỏi của bạn..."
          autocomplete="off"
          spellcheck="true"
        />
        <button class="chatbot-send">Gửi</button>
      </div>
    `;

    // Lấy các phần tử DOM
    this.messagesEl = this.container.querySelector(".chatbot-messages");
    this.inputEl = this.container.querySelector(".chatbot-input");
    this.sendBtn = this.container.querySelector(".chatbot-send");
    this.typingEl = this.container.querySelector(".typing-indicator");
    this.minimizeBtn = this.container.querySelector(".chatbot-minimize");
    this.header = this.container.querySelector(".chatbot-header");

    // Gắn sự kiện
    this.bindEvents();
    
    // Thêm tin nhắn chào mừng
    this.addMessage("Xin chào! Tôi có thể giúp gì cho bạn?", "bot");
    
    // Focus vào input
    setTimeout(() => this.inputEl.focus(), 100);
  }

  bindEvents() {
    // Gửi tin nhắn
    this.sendBtn.addEventListener("click", () => this.sendMessage());
    
    // Nhấn Enter để gửi
    this.inputEl.addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.sendMessage();
    });
    
    // Toggle thu nhỏ/phóng to
    this.minimizeBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // Ngăn sự kiện click lan ra ngoài
      this.toggleMinimize();
    });
    
    // Click vào header khi thu nhỏ để mở lại
    this.header.addEventListener("click", (e) => {
      if (this.isMinimized) {
        this.toggleMinimize();
      }
    });
    
    // Xử lý lỗi input
    this.inputEl.addEventListener("input", () => {
      if (this.inputEl.value.trim().length > 0) {
        this.sendBtn.disabled = false;
      } else {
        this.sendBtn.disabled = true;
      }
    });
  }

  toggleMinimize() {
    this.isMinimized = !this.isMinimized;
    this.container.classList.toggle("minimized");
    
    if (this.isMinimized) {
      // Khi thu nhỏ: hiển thị icon chat
      this.header.innerHTML = `
        <span>💬</span>
      `;
      this.header.title = "Nhấn để mở chatbot";
    } else {
      // Khi mở rộng: hiển thị đầy đủ
      this.header.innerHTML = `
        <span>${this.title}</span>
        <div class="chatbot-actions">
          <button class="chatbot-minimize" title="Thu nhỏ">−</button>
        </div>
      `;
      this.header.title = "";
      
      // Cập nhật lại event listener cho nút minimize mới
      const newMinimizeBtn = this.container.querySelector(".chatbot-minimize");
      newMinimizeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.toggleMinimize();
      });
      
      // Focus vào input
      setTimeout(() => this.inputEl.focus(), 100);
    }
  }

  addMessage(text, sender = "user") {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${sender}`;
    
    // Xử lý text - chỉ hiển thị phần response (loại bỏ <think> tags nếu có)
    let displayText = text;
    
    // Loại bỏ phần think nếu có
    if (text.includes('<think>')) {
      const match = text.match(/<think>[\s\S]*?<\/think>\s*\n*(.*)/s);
      if (match && match[1]) {
        displayText = match[1].trim();
      }
    }
    
    messageDiv.textContent = displayText;
    this.messagesEl.appendChild(messageDiv);
    this.messages.push({ text: displayText, sender, timestamp: new Date() });
    
    // Tự động cuộn xuống cuối
    this.messagesEl.scrollTop = this.messagesEl.scrollHeight;
  }

  showTyping() {
    this.typingEl.style.display = "flex";
    this.sendBtn.disabled = true;
    this.sendBtn.textContent = "Đang gửi...";
    this.messagesEl.scrollTop = this.messagesEl.scrollHeight;
  }

  hideTyping() {
    this.typingEl.style.display = "none";
    this.sendBtn.disabled = false;
    this.sendBtn.textContent = "Gửi";
  }

  async sendMessage() {
    const text = this.inputEl.value.trim();
    if (!text) return;
    
    // Thêm tin nhắn của người dùng
    this.addMessage(text, "user");
    
    // Xóa input
    this.inputEl.value = "";
    this.sendBtn.disabled = true;
    
    // Hiển thị typing indicator
    this.showTyping();
    
    try {
      console.log("📤 Gửi tin nhắn đến API:", text);
      
      // Gọi API với timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);
      
      const response = await fetch(this.apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          message: text,
          user_id: "user_" + Date.now(),
          timestamp: new Date().toISOString()
        }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      console.log("📥 Nhận response từ API:", response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log("📦 Dữ liệu API:", data);
      
      // CHỈ LẤY TRƯỜNG RESPONSE - KHÔNG HIỂN THỊ PRODUCTS
      if (data.response) {
        this.addMessage(data.response, "bot");
      } else if (data.reply) {
        this.addMessage(data.reply, "bot");
      } else {
        this.addMessage("Xin lỗi, tôi không hiểu câu hỏi đó.", "bot");
      }
      
    } catch (error) {
      console.error("❌ Lỗi khi gọi API:", error);
      
      let errorMessage = "Không thể kết nối đến máy chủ. Vui lòng thử lại sau.";
      
      if (error.name === 'AbortError') {
        errorMessage = "Yêu cầu quá thời gian. Vui lòng thử lại.";
      } else if (error.message.includes('Network')) {
        errorMessage = "Lỗi kết nối mạng. Vui lòng kiểm tra kết nối.";
      }
      
      this.addMessage(errorMessage, "bot");
      
    } finally {
      this.hideTyping();
      this.inputEl.focus();
    }
  }

  // Public methods
  open() {
    if (this.isMinimized) {
      this.toggleMinimize();
    }
    this.container.style.display = "flex";
    this.isOpen = true;
    setTimeout(() => this.inputEl.focus(), 100);
  }

  close() {
    this.container.style.display = "none";
    this.isOpen = false;
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  destroy() {
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
  }
}