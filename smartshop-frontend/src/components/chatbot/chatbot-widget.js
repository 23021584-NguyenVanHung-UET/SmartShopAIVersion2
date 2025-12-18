// Chatbot Widget - Clean Version
export class ChatbotWidget {
  constructor(config = {}) {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    this.config = {
      apiUrl: 'https://chatbot-soa.onrender.com/chat',
      title: 'Trợ lý mua sắm',
      botAvatar: '🤖',
      userAvatar: '👤',
      ...config
    };

    this.minimized = true;
    this.userId = this.getOrCreateUserId();
    
    this.root = null;
    this.messagesEl = null;
    this.inputEl = null;
    this.sendBtn = null;
    this.toggleBtn = null;
    this.typingEl = null;
    
    this.init();
  }

  // Lấy hoặc tạo user ID
  getOrCreateUserId() {
    const KEY = 'chatbot_user_id';
    
    try {
      let uid = localStorage.getItem(KEY);
      
      if (uid && typeof uid === 'string' && uid.length > 0) {
        return uid;
      }
      
      if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        uid = 'user_' + crypto.randomUUID();
      } else {
        uid = 'user_' + Date.now() + '_' + Math.random().toString(36).substring(2, 15);
      }
      
      localStorage.setItem(KEY, uid);
      return uid;
      
    } catch (error) {
      return 'guest_' + Date.now();
    }
  }

  // Khởi tạo widget
  init() {
    if (document.querySelector('.chatbot-widget')) {
      return;
    }

    this.injectStyles();
    this.createDOM();
    this.bindEvents();
    
    setTimeout(() => {
      this.addMessage('Xin chào 👋 Tôi có thể giúp bạn tìm và tư vấn sản phẩm.', 'bot');
    }, 500);
  }

  // Thêm CSS
  injectStyles() {
    if (document.getElementById('chatbot-widget-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'chatbot-widget-styles';
    style.textContent = this.getStyles();
    document.head.appendChild(style);
  }

  getStyles() {
    return `
      .chatbot-widget {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 380px;
        height: 500px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        overflow: hidden;
        transition: all 0.3s ease;
      }
      
      .chatbot-widget.minimized {
        height: 60px !important;
        width: 300px !important;
      }
      
      .chatbot-header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 16px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
      }
      
      .chatbot-title {
        font-size: 16px;
        font-weight: 600;
      }
      
      .chatbot-toggle {
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        font-size: 20px;
        line-height: 1;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.2s;
      }
      
      .chatbot-toggle:hover {
        background: rgba(255, 255, 255, 0.3);
      }
      
      .chatbot-body {
        height: calc(100% - 64px);
        display: flex;
        flex-direction: column;
        background: #f8f9fa;
      }
      
      .chatbot-widget.minimized .chatbot-body {
        display: none;
      }
      
      .chatbot-messages {
        flex: 1;
        overflow-y: auto;
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      
      .chatbot-message {
        display: flex;
        gap: 10px;
        max-width: 90%;
        animation: fadeIn 0.3s ease;
      }
      
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      .chatbot-message.user {
        align-self: flex-end;
        flex-direction: row-reverse;
      }
      
      .chatbot-avatar {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: #e9ecef;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        flex-shrink: 0;
      }
      
      .chatbot-message.user .chatbot-avatar {
        background: #007bff;
        color: white;
      }
      
      .chatbot-bubble {
        background: white;
        padding: 12px 16px;
        border-radius: 18px;
        font-size: 14px;
        line-height: 1.5;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        max-width: 100%;
        word-wrap: break-word;
      }
      
      .chatbot-message.user .chatbot-bubble {
        background: #007bff;
        color: white;
        border-bottom-right-radius: 4px;
      }
      
      .chatbot-message.bot .chatbot-bubble {
        border-bottom-left-radius: 4px;
      }
      
      .chatbot-bubble strong {
        font-weight: 600;
      }
      
      .chatbot-bubble em {
        font-style: italic;
      }
      
      .chatbot-bubble code {
        background: #f8f9fa;
        padding: 2px 4px;
        border-radius: 4px;
        font-family: 'Courier New', monospace;
        font-size: 13px;
      }
      
      .chatbot-bubble pre {
        background: #f8f9fa;
        border: 1px solid #e9ecef;
        border-radius: 6px;
        padding: 8px;
        overflow-x: auto;
        margin: 8px 0;
      }
      
      .chatbot-bubble a {
        color: #007bff;
        text-decoration: none;
      }
      
      .chatbot-bubble a:hover {
        text-decoration: underline;
      }
      
      .chatbot-typing {
        padding: 10px 20px;
        font-size: 14px;
        color: #6c757d;
        font-style: italic;
        background: rgba(255, 255, 255, 0.8);
        border-top: 1px solid #e9ecef;
        display: none;
      }
      
      .chatbot-input {
        padding: 15px;
        background: white;
        border-top: 1px solid #e9ecef;
        display: flex;
        gap: 10px;
      }
      
      .chatbot-input input {
        flex: 1;
        padding: 10px 14px;
        border: 1px solid #ced4da;
        border-radius: 8px;
        font-size: 14px;
        outline: none;
      }
      
      .chatbot-input input:focus {
        border-color: #007bff;
        box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
      }
      
      .chatbot-input button {
        padding: 10px 20px;
        background: #007bff;
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: background 0.2s;
      }
      
      .chatbot-input button:hover {
        background: #0056b3;
      }
      
      .chatbot-messages::-webkit-scrollbar {
        width: 6px;
      }
      
      .chatbot-messages::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 3px;
      }
      
      .chatbot-messages::-webkit-scrollbar-thumb {
        background: #c1c1c1;
        border-radius: 3px;
      }
      
      .chatbot-messages::-webkit-scrollbar-thumb:hover {
        background: #a8a8a8;
      }
      
      @media (max-width: 480px) {
        .chatbot-widget {
          bottom: 10px;
          right: 10px;
          left: 10px;
          width: auto !important;
          max-width: calc(100vw - 20px);
          height: 60vh;
        }
        
        .chatbot-widget.minimized {
          width: 250px !important;
          left: auto;
          right: 10px;
        }
      }
    `;
  }

  // Tạo DOM
  createDOM() {
    this.root = document.createElement('div');
    this.root.className = 'chatbot-widget minimized';
    
    this.root.innerHTML = `
      <div class="chatbot-header">
        <div class="chatbot-title">${this.config.title}</div>
        <button class="chatbot-toggle">+</button>
      </div>
      
      <div class="chatbot-body">
        <div class="chatbot-messages"></div>
        <div class="chatbot-typing">Đang trả lời...</div>
        <div class="chatbot-input">
          <input type="text" placeholder="Nhập câu hỏi của bạn...">
          <button type="button">Gửi</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(this.root);
    
    this.messagesEl = this.root.querySelector('.chatbot-messages');
    this.inputEl = this.root.querySelector('input');
    this.sendBtn = this.root.querySelector('.chatbot-input button');
    this.toggleBtn = this.root.querySelector('.chatbot-toggle');
    this.typingEl = this.root.querySelector('.chatbot-typing');
    
    this.root.style.display = 'block';
    this.root.style.visibility = 'visible';
  }

  // Gắn sự kiện
  bindEvents() {
    this.sendBtn.addEventListener('click', () => this.sendMessage());
    
    this.inputEl.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.sendMessage();
      }
    });
    
    this.toggleBtn.addEventListener('click', () => {
      this.toggleWidget();
    });
    
    this.root.addEventListener('click', () => {
      if (!this.minimized) {
        this.inputEl.focus();
      }
    });
  }

  // Mở/đóng widget
  toggleWidget() {
    this.minimized = !this.minimized;
    
    if (this.minimized) {
      this.root.classList.add('minimized');
      this.toggleBtn.textContent = '+';
    } else {
      this.root.classList.remove('minimized');
      this.toggleBtn.textContent = '−';
      this.inputEl.focus();
      this.scrollToBottom();
    }
  }

  // Thêm tin nhắn
  addMessage(text, sender = 'bot') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chatbot-message ${sender}`;
    
    const avatar = sender === 'bot' ? this.config.botAvatar : this.config.userAvatar;
    const formattedText = this.formatText(text);
    
    messageDiv.innerHTML = `
      <div class="chatbot-avatar">${avatar}</div>
      <div class="chatbot-bubble">${formattedText}</div>
    `;
    
    this.messagesEl.appendChild(messageDiv);
    this.scrollToBottom();
  }

  // Format văn bản - Loại bỏ các ký tự markdown
  formatText(text) {
    if (!text) return '';
    
    // Xóa các phần <think> (nếu có)
    text = text.replace(/<think>[\s\S]*?<\/think>/gi, '');
    
    // Xóa các ký tự markdown thừa
    text = text
      // Xóa các tiêu đề markdown (###, ##, #)
      .replace(/^#{1,6}\s*/gm, '')
      // Xóa các dòng phân cách (---, ===)
      .replace(/^[-=]{3,}\s*$/gm, '')
      // Xóa các dấu * dùng cho bullet points
      .replace(/^\s*[\*\-\+]\s+/gm, '')
      // Xóa các số dùng cho numbered list
      .replace(/^\s*\d+\.\s+/gm, '')
      // Xóa blockquote (>)
      .replace(/^\s*>\s*/gm, '')
      // Xóa các dấu phân cách ở giữa dòng
      .replace(/---/g, '')
      .replace(/===/g, '')
      // Xóa các khoảng trắng thừa
      .replace(/\n\s*\n\s*\n/g, '\n\n')
      .trim();
    
    // Format các phần tử còn lại
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
      .replace(/\n/g, '<br>')
      .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>');
  }

  // Scroll xuống dưới
  scrollToBottom() {
    requestAnimationFrame(() => {
      if (this.messagesEl) {
        this.messagesEl.scrollTop = this.messagesEl.scrollHeight;
      }
    });
  }

  // Hiển thị typing indicator
  showTyping(show) {
    if (!this.typingEl) return;
    
    if (show) {
      this.typingEl.style.display = 'block';
    } else {
      this.typingEl.style.display = 'none';
    }
    
    this.scrollToBottom();
  }

  // Gửi tin nhắn đến API
  async sendMessage() {
    const message = this.inputEl.value.trim();
    
    if (!message) {
      this.inputEl.focus();
      return;
    }
    
    this.inputEl.value = '';
    this.addMessage(message, 'user');
    this.showTyping(true);
    
    try {
      const response = await fetch(this.config.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          user_id: this.userId,
          message: message
        })
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        this.addMessage(data.response, 'bot');
      } else {
        this.addMessage('Xin lỗi, có lỗi xảy ra. Vui lòng thử lại sau.', 'bot');
      }
      
    } catch (error) {
      console.error('Chatbot API error:', error);
      this.addMessage('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.', 'bot');
    } finally {
      this.showTyping(false);
      this.inputEl.focus();
    }
  }

  // Mở widget
  open() {
    this.minimized = false;
    this.root.classList.remove('minimized');
    this.toggleBtn.textContent = '−';
    this.inputEl.focus();
    this.scrollToBottom();
  }
  
  // Đóng widget
  close() {
    this.minimized = true;
    this.root.classList.add('minimized');
    this.toggleBtn.textContent = '+';
  }
  
  // Xóa widget
  destroy() {
    if (this.root && this.root.parentNode) {
      this.root.parentNode.removeChild(this.root);
    }
    
    const styles = document.getElementById('chatbot-widget-styles');
    if (styles) {
      styles.parentNode.removeChild(styles);
    }
  }
}

// Tự động khởi tạo khi trang tải xong
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    window.ChatbotWidgetInstance = new ChatbotWidget();
  });
}