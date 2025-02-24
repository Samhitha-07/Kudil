// Chatbot functionality
function toggleChatbot() {
    const container = document.querySelector('.chatbot-container');
    container.classList.toggle('active');
}

function handleQuickReply(action) {
    const messagesContainer = document.getElementById('chatbotMessages');
    
    // Add user message
    const userMessage = document.createElement('div');
    userMessage.className = 'message user';
    
    let messageText = '';
    switch(action) {
        case 'post-listing':
            messageText = 'How do I post a new listing?';
            break;
        case 'view-inquiries':
            messageText = 'I want to view my inquiries';
            break;
        case 'support':
            messageText = 'I need to contact support';
            break;
    }
    
    userMessage.innerHTML = `
        <div class="message-content">
            <p>${messageText}</p>
        </div>
    `;
    messagesContainer.appendChild(userMessage);
    
    // Add bot response
    setTimeout(() => {
        const botMessage = document.createElement('div');
        botMessage.className = 'message bot';
        
        let responseText = '';
        let quickReplies = '';
        
        switch(action) {
            case 'post-listing':
                responseText = 'To post a new listing, click the "Post Listing" button in the top navigation bar. You\'ll need to:' +
                             '<ol>' +
                             '<li>Add property details and location</li>' +
                             '<li>Upload high-quality photos</li>' +
                             '<li>Set pricing and availability</li>' +
                             '</ol>';
                quickReplies = `
                    <button onclick="handleQuickReply('photo-tips')">Photo Tips</button>
                    <button onclick="handleQuickReply('pricing-help')">Pricing Help</button>
                `;
                break;
            case 'view-inquiries':
                responseText = 'You can view all your inquiries in the "Inquiries" section. You currently have 8 new inquiries waiting for your response.';
                quickReplies = `
                    <button onclick="window.location.href='inquiries.html'">Go to Inquiries</button>
                    <button onclick="handleQuickReply('inquiry-tips')">Response Tips</button>
                `;
                break;
            case 'support':
                responseText = 'Our support team is here to help! You can:' +
                             '<ul>' +
                             '<li>Email us at support@kudil.com</li>' +
                             '<li>Call us at 1-800-KUDIL</li>' +
                             '<li>Use the contact form in Settings</li>' +
                             '</ul>';
                quickReplies = `
                    <button onclick="window.location.href='settings.html#support'">Contact Form</button>
                    <button onclick="handleQuickReply('faq')">View FAQ</button>
                `;
                break;
        }
        
        botMessage.innerHTML = `
            <i class="fas fa-robot"></i>
            <div class="message-content">
                <p>${responseText}</p>
                <div class="quick-replies">
                    ${quickReplies}
                </div>
            </div>
        `;
        messagesContainer.appendChild(botMessage);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 500);
}

function sendMessage() {
    const input = document.getElementById('chatbotInput');
    const message = input.value.trim();
    
    if (message) {
        const messagesContainer = document.getElementById('chatbotMessages');
        
        // Add user message
        const userMessage = document.createElement('div');
        userMessage.className = 'message user';
        userMessage.innerHTML = `
            <div class="message-content">
                <p>${message}</p>
            </div>
        `;
        messagesContainer.appendChild(userMessage);
        
        // Clear input
        input.value = '';
        
        // Add bot response
        setTimeout(() => {
            const botMessage = document.createElement('div');
            botMessage.className = 'message bot';
            botMessage.innerHTML = `
                <i class="fas fa-robot"></i>
                <div class="message-content">
                    <p>Thank you for your message. Let me help you with that. Please select one of the common topics below or type your specific question.</p>
                    <div class="quick-replies">
                        <button onclick="handleQuickReply('post-listing')">Post Listing</button>
                        <button onclick="handleQuickReply('view-inquiries')">View Inquiries</button>
                        <button onclick="handleQuickReply('support')">Contact Support</button>
                    </div>
                </div>
            `;
            messagesContainer.appendChild(botMessage);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 500);
    }
}

// Handle Enter key in chatbot input
document.getElementById('chatbotInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Activity Filter functionality
document.querySelector('.activity-filter').addEventListener('change', function(e) {
    const filter = e.target.value;
    const activities = document.querySelectorAll('.activity-item');
    
    activities.forEach(activity => {
        if (filter === 'all') {
            activity.style.display = 'flex';
        } else {
            const hasClass = activity.querySelector(`.activity-icon.${filter}`);
            activity.style.display = hasClass ? 'flex' : 'none';
        }
    });
});
