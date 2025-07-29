# 🌟 Nyxfolio - AI-Powered Portfolio Website

> **A modern, interactive portfolio website powered by an AI chatbot named Nyx**

Welcome to Nyxfolio, my professional portfolio website featuring a distinctive AI assistant that brings personality and interactivity to the traditional portfolio experience. This full-stack application combines a sleek React frontend with an intelligent Express.js backend, creating an engaging platform for showcasing skills, projects, and professional journey.

## ✨ Features

### 🎨 **Portfolio Showcase**
- **Hero Section**: Eye-catching introduction with professional branding
- **About Section**: Comprehensive background and professional story
- **Experience Timeline**: Detailed work history and career progression
- **Skills Matrix**: Technical competencies and expertise areas
- **Project Gallery**: Showcase of key projects with live demos
- **Contact Form**: Direct communication channel for opportunities

### 🤖 **AI-Powered Chatbot (Nyx)**
- **Intelligent Conversations**: Powered by OpenRouter's Qwen model
- **Distinctive Personality**: Sarcastic and witty AI assistant
- **Memory System**: Persistent knowledge about Shubham's background
- **Real-time Interaction**: Instant responses through floating chat modal
- **Professional Insights**: Detailed information about skills, projects, and experience

### 🚀 **Technical Features**
- **Responsive Design**: Optimized for all device sizes
- **Modern UI/UX**: Clean, professional interface with smooth animations
- **Fast Performance**: Optimized React components and efficient API calls
- **Secure Backend**: Express.js server with proper API handling
- **Environment Configuration**: Flexible setup for different deployment scenarios

## 🛠️ Tech Stack

### **Frontend**
- **React 18.3.1**: Modern JavaScript library for building user interfaces
- **Create React App**: Optimized build setup and development environment
- **CSS3**: Custom styling with modern features and responsive design
- **React Components**: Modular, reusable component architecture

### **Backend**
- **Node.js**: JavaScript runtime for server-side development
- **Express.js 4.21.2**: Fast, unopinionated web framework
- **OpenRouter API**: AI model integration for chatbot functionality
- **Qwen Model**: Advanced language model for intelligent conversations
- **File System**: Text-based memory storage for chatbot knowledge

### **Development Tools**
- **npm**: Package management and script running
- **CORS**: Cross-origin resource sharing configuration
- **dotenv**: Environment variable management
- **Modern JavaScript**: ES6+ features and async/await patterns

## 📋 Prerequisites

Before setting up Nyxfolio, ensure you have the following installed:

- **Node.js**: Version 14.0 or higher
- **npm**: Version 6.0 or higher (comes with Node.js)
- **OpenRouter API Key**: Required for AI chatbot functionality
- **Git**: For version control and cloning the repository
- **Code Editor**: VS Code or your preferred development environment

## 🚀 Installation Guide

### **1. Clone the Repository**
```bash
git clone <repository-url>
cd Portfolio
```

### **2. Backend Setup**
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

### **3. Frontend Setup**
Open a new terminal, navigate to the frontend directory, and install dependencies:
```bash
cd frontend
npm install
```

### **4. Environment Configuration**
Create a `.env` file in the backend directory:
```bash
cd backend
echo. > .env
```

Add the following environment variables to the `.env` file:
```env
OPENROUTER_API_KEY=your_openrouter_api_key_here
PORT=5000
```

**To get your OpenRouter API Key:**
1. Visit [OpenRouter.ai](https://openrouter.ai)
2. Create an account or sign in
3. Navigate to the API Keys section
4. Generate a new API key
5. Copy and paste it into your `.env` file

## 🎯 Usage Instructions

### **Development Mode**

1. **Start the Backend Server**:
   ```bash
   cd backend
   npm start
   ```
   The backend will run on `http://localhost:5000`

2. **Start the Frontend Development Server**:
   ```bash
   cd frontend
   npm start
   ```
   The frontend will run on `http://localhost:3000`

3. **Access the Application**:
   Open your browser and navigate to `http://localhost:3000`

### **Interacting with Nyx (AI Chatbot)**
- Click the floating chat icon in the bottom-right corner
- Type your questions about Shubham's background, skills, or projects
- Enjoy Nyx's witty and informative responses
- Use the chat to get detailed insights about the portfolio content

## 📁 Project Structure

```
Portfolio/
├── backend/                    # Express.js backend server
│   ├── index.js               # Main server file with API endpoints
│   ├── package.json           # Backend dependencies and scripts
│   ├── data/
│   │   └── memory.txt         # AI chatbot knowledge base
│   └── routes/
│       └── chat.js            # Chat API route implementation
├── frontend/                   # React frontend application
│   ├── package.json           # Frontend dependencies and scripts
│   ├── public/                # Static assets and HTML template
│   │   ├── index.html         # Main HTML template
│   │   ├── manifest.json      # PWA manifest
│   │   ├── logo-icon.svg      # Brand icon
│   │   ├── *.png              # Project images and assets
│   │   ├── robots.txt         # Search engine directives
│   │   └── ShubhamPatraResume.pdf # Professional resume
│   └── src/                   # React source code
│       ├── App.js             # Main application component
│       ├── index.js           # Application entry point
│       ├── index.css          # Global styles
│       ├── assets/            # Image assets and logos
│       ├── components/        # React components
│       │   ├── About.js       # About section component
│       │   ├── ChatbotLogo.js # Chat icon component
│       │   ├── ChatModal.js   # AI chatbot interface
│       │   ├── Contact.js     # Contact form component
│       │   ├── Experience.js  # Experience timeline
│       │   ├── Footer.js      # Site footer
│       │   ├── Hero.js        # Landing hero section
│       │   ├── Logo.js        # Brand logo component
│       │   ├── Navbar.js      # Navigation component
│       │   ├── Projects.js    # Project showcase
│       │   └── Skills.js      # Skills matrix
│       └── styles/            # Component-specific CSS files
│           ├── App.css        # Main application styles
│           ├── variables.css  # CSS custom properties
│           └── *.css          # Component-specific styles
└── README.md                  # Project documentation (this file)
```

## 🔌 API Documentation

### **Chat Endpoint**
**POST** `/api/chat`

Process user messages through the AI chatbot and return intelligent responses.

**Request Body:**
```json
{
  "message": "Tell me about Shubham's experience"
}
```

**Response:**
```json
{
  "response": "Ah, you want to know about my human's professional journey? Well, Shubham has quite the impressive background..."
}
```

**Error Response:**
```json
{
  "error": "Error message description"
}
```

## 🤖 Meet Nyx - The AI Assistant

Nyx is not your typical chatbot. With a distinctive sarcastic personality and comprehensive knowledge about Shubham's professional background, Nyx provides:

- **Witty Interactions**: Engaging conversations with a touch of humor
- **Detailed Insights**: In-depth information about projects, skills, and experience
- **Professional Guidance**: Career advice and technical discussions
- **Memory Retention**: Consistent knowledge base across conversations
- **Real-time Responses**: Instant feedback powered by advanced AI

Nyx serves as both an interactive portfolio guide and a demonstration of AI integration capabilities, showcasing how modern web applications can leverage artificial intelligence to enhance user experience.

## 🤝 Contributing

We welcome contributions to make Nyxfolio even better! Here's how you can help:

### **Getting Started**
1. Fork the repository
2. Create a new branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Submit a pull request

### **Development Guidelines**
- Follow existing code style and conventions
- Add comments for complex functionality
- Test your changes in both development and production builds
- Update documentation as needed
- Ensure responsive design principles are maintained

### **Areas for Contribution**
- **UI/UX Improvements**: Enhanced animations, better responsive design
- **New Features**: Additional portfolio sections, improved chatbot capabilities
- **Performance Optimization**: Faster loading, better caching strategies
- **Accessibility**: Screen reader support, keyboard navigation
- **Documentation**: Code comments, additional guides

## 📄 License

This project is created for portfolio purposes and serves as a demonstration of full-stack development capabilities. Feel free to use this code as inspiration for your own projects.

## 👨‍💻 About the Developer

**Shubham Patra** is a passionate full-stack developer with expertise in modern web technologies. This portfolio showcases his skills in React, Node.js, AI integration, and user experience design.

### **Connect with Shubham**
- 💼 **Portfolio**: [Live Demo](http://localhost:3000) (when running locally)
- 📧 **Email**: Available through the contact form
- 📄 **Resume**: [Download PDF](./frontend/public/ShubhamPatraResume.pdf)
- 🤖 **Chat with Nyx**: Try the AI assistant to learn more!

---

**Built with ❤️ and powered by AI** | © 2025 Shubham Patra

*"In a world of ordinary portfolios, be extraordinary with AI."* - Nyx
