# 🌟 Nyxfolio - AI-Powered Portfolio Website

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-19.1.0-61dafb.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

</div>

> **A modern, interactive portfolio website powered by an AI chatbot named Nyx**

Welcome to Nyxfolio, a professional portfolio website featuring a distinctive AI assistant that brings personality and interactivity to the traditional portfolio experience. This full-stack application combines a sleek React frontend with intelligent Express.js backends, creating an engaging platform for showcasing skills, projects, and professional journey.

**🌐 Live Demo:** [https://www.shubhampatra.dev](https://www.shubhampatra.dev)

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Prerequisites](#-prerequisites)
- [Installation Guide](#-installation-guide)
- [Usage Instructions](#-usage-instructions)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [Performance Optimization](#-performance-optimization)
- [Security](#-security)
- [Testing](#-testing)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [Roadmap](#-roadmap)
- [FAQ](#-faq)
- [License](#-license)
- [Contact](#-contact)
- [Acknowledgments](#-acknowledgments)

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
- **React 19.1.0**: Modern JavaScript library for building user interfaces
- **Create React App 5.0.1**: Optimized build setup and development environment
- **React Helmet Async 2.0.5**: SEO optimization and meta tag management
- **React Icons 5.5.0**: Comprehensive icon library
- **CSS3**: Custom styling with modern features and responsive design
- **Web Vitals**: Performance monitoring and optimization

### **Backend Services**

#### **AI Chatbot Backend** (`backend/`)
- **Node.js**: JavaScript runtime for server-side development
- **Express.js 5.1.0**: Fast, unopinionated web framework
- **Google Generative AI 0.24.1**: Advanced AI model integration
- **Axios 1.11.0**: Promise-based HTTP client
- **CORS 2.8.5**: Cross-origin resource sharing
- **Nodemailer 6.9.8**: Email sending capabilities

#### **Contact Form Backend** (`contact-backend/`)
- **Express.js 4.18.2**: Dedicated contact form server
- **Nodemailer 6.9.8**: Gmail integration for contact submissions
- **Express Rate Limit**: Request throttling and spam prevention
- **Helmet**: Security headers and protection
- **XSS Clean**: Cross-site scripting protection
- **Validator**: Input validation and sanitization

### **Development Tools**
- **npm**: Package management and script running
- **Nodemon 3.0.2**: Auto-restart development server
- **dotenv**: Environment variable management
- **gh-pages 6.1.1**: GitHub Pages deployment
- **Modern JavaScript**: ES6+ features and async/await patterns

### **Testing & Quality**
- **Jest**: Testing framework
- **React Testing Library**: Component testing utilities
- **ESLint**: Code linting and quality assurance

## 🏗️ Architecture

Nyxfolio follows a modern three-tier architecture:

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (React)                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐ │
│  │   Hero   │  │  About   │  │ Projects │  │ Contact │ │
│  └──────────┘  └──────────┘  └──────────┘  └─────────┘ │
│         │              │              │            │     │
│         └──────────────┴──────────────┴────────────┘     │
│                         │                                │
└─────────────────────────┼────────────────────────────────┘
                          │
        ┌─────────────────┴─────────────────┐
        │                                   │
┌───────▼──────────┐              ┌────────▼─────────┐
│  AI Chat Backend │              │ Contact Backend  │
│   (Port 5000)    │              │   (Port 3001)    │
├──────────────────┤              ├──────────────────┤
│ • Google AI API  │              │ • Nodemailer     │
│ • Memory System  │              │ • Gmail SMTP     │
│ • CORS Enabled   │              │ • Rate Limiting  │
└──────────────────┘              └──────────────────┘
```

### **Key Features:**
- **Separation of Concerns**: Independent backend services for different functionalities
- **Scalability**: Each service can be scaled independently
- **Security**: Isolated environments with specific security measures
- **Maintainability**: Modular architecture for easy updates and debugging

---

## 📋 Prerequisites

Before setting up Nyxfolio, ensure you have the following installed:

- **Node.js**: Version 14.0 or higher ([Download](https://nodejs.org/))
- **npm**: Version 6.0 or higher (comes with Node.js)
- **Git**: For version control ([Download](https://git-scm.com/))
- **Code Editor**: VS Code recommended ([Download](https://code.visualstudio.com/))

### **API Keys Required:**
- **Google AI API Key**: For AI chatbot functionality ([Get API Key](https://ai.google.dev/))
- **Gmail Account**: For contact form email functionality (with App Password enabled)

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

#### **Backend Configuration** (`backend/.env`)
Create a `.env` file in the backend directory:
```bash
cd backend
echo. > .env
```

Add the following environment variables:
```env
GOOGLE_API_KEY=your_google_ai_api_key_here
PORT=5000
```

**To get your Google AI API Key:**
1. Visit [Google AI Studio](https://ai.google.dev/)
2. Sign in with your Google account
3. Click "Get API Key"
4. Create a new API key
5. Copy and paste it into your `.env` file

#### **Contact Backend Configuration** (`contact-backend/.env`)
Create a `.env` file in the contact-backend directory:
```bash
cd contact-backend
echo. > .env
```

Add the following environment variables:
```env
PORT=3001
EMAIL_USER=your_gmail_address@gmail.com
EMAIL_PASS=your_gmail_app_password
RECIPIENT_EMAIL=where_to_receive_messages@gmail.com
FRONTEND_URL=http://localhost:3000
```

**To get Gmail App Password:**
1. Enable 2-Factor Authentication on your Google Account
2. Go to [Google Account Security](https://myaccount.google.com/security)
3. Select "2-Step Verification" → "App passwords"
4. Generate a new app password for "Mail"
5. Copy the 16-character password (no spaces)
6. Use this as `EMAIL_PASS` in your `.env` file

#### **Frontend Configuration** (Optional)
Create a `.env` file in the frontend directory for custom API endpoints:
```bash
cd frontend
echo. > .env
```

Add the following (optional):
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_CONTACT_API_URL=http://localhost:3001
```

## 🎯 Usage Instructions

### **Development Mode**

You need to run **three separate servers** for full functionality:

#### **Terminal 1: AI Chatbot Backend**
```bash
cd backend
npm run dev
```
Server runs on `http://localhost:5000`

#### **Terminal 2: Contact Form Backend**
```bash
cd contact-backend
npm run dev
```
Server runs on `http://localhost:3001`

#### **Terminal 3: Frontend Development Server**
```bash
cd frontend
npm start
```
Application runs on `http://localhost:3000`

### **Production Mode**

#### **Start Backend Services**
```bash
# Terminal 1
cd backend
npm start

# Terminal 2
cd contact-backend
npm start
```

#### **Build and Serve Frontend**
```bash
cd frontend
npm run build
# Serve the build folder with your preferred static server
```

### **Interacting with Nyx (AI Chatbot)**
- Click the floating chat icon in the bottom-right corner
- Type your questions about Shubham's background, skills, or projects
- Enjoy Nyx's witty and informative responses
- Use the chat to get detailed insights about the portfolio content

### **Using the Contact Form**
- Navigate to the Contact section
- Fill in your name, email, and message
- Submit the form to send an email directly
- Receive confirmation of successful submission

## 📁 Project Structure

```
Portfolio/
├── backend/                        # AI Chatbot Backend Server
│   ├── index.js                   # Main server file with API endpoints
│   ├── package.json               # Backend dependencies and scripts
│   ├── .env                       # Environment variables (not in repo)
│   └── routes/
│       └── chat.js                # Chat API route implementation
│
├── contact-backend/                # Contact Form Backend Server
│   ├── server.js                  # Main contact server file
│   ├── package.json               # Contact backend dependencies
│   ├── .env                       # Environment variables (not in repo)
│   ├── .gitignore                 # Git ignore rules
│   ├── check-server.js            # Server health check utility
│   ├── test-api.js                # API testing script
│   └── verify-gmail.js            # Gmail configuration verification
│
├── frontend/                       # React Frontend Application
│   ├── package.json               # Frontend dependencies and scripts
│   ├── .env                       # Frontend environment variables (optional)
│   ├── .env.example               # Environment variable template
│   ├── CNAME                      # Custom domain configuration
│   │
│   ├── public/                    # Static Assets
│   │   ├── index.html             # Main HTML template
│   │   ├── manifest.json          # PWA manifest
│   │   ├── sitemap.xml            # SEO sitemap
│   │   ├── robots.txt             # Search engine directives
│   │   ├── 404.html               # Custom 404 page
│   │   ├── favicon-dark.svg       # Dark mode favicon
│   │   ├── favicon-light.svg      # Light mode favicon
│   │   ├── favicon-switcher.js    # Dynamic favicon script
│   │   ├── logo-icon.svg          # Brand icon
│   │   ├── og-image.svg           # Open Graph image
│   │   ├── *.png                  # Project images and assets
│   │   ├── ShubhamPatraResume.pdf # Professional resume
│   │   ├── googleacbb19eb408a59b5.html # Google verification
│   │   ├── contrast-test.html     # Accessibility testing
│   │   ├── cursor-demo.html       # Cursor effect demo
│   │   ├── responsive-test.html   # Responsive design testing
│   │   └── visual-test-guide.html # Visual testing guide
│   │
│   ├── src/                       # React Source Code
│   │   ├── App.js                 # Main application component
│   │   ├── index.js               # Application entry point
│   │   ├── index.css              # Global styles
│   │   │
│   │   ├── assets/                # Image Assets
│   │   │   └── *.svg, *.png       # Logos and images
│   │   │
│   │   ├── components/            # React Components
│   │   │   ├── About.js           # About section component
│   │   │   ├── ChatbotLogo.js     # Chat icon component
│   │   │   ├── ChatModal.js       # AI chatbot interface
│   │   │   ├── Contact.js         # Contact form component
│   │   │   ├── Experience.js      # Experience timeline
│   │   │   ├── Footer.js          # Site footer
│   │   │   ├── Hero.js            # Landing hero section
│   │   │   ├── Logo.js            # Brand logo component
│   │   │   ├── Navbar.js          # Navigation component
│   │   │   ├── Projects.js        # Project showcase
│   │   │   └── Skills.js          # Skills matrix
│   │   │
│   │   ├── hooks/                 # Custom React Hooks
│   │   │   └── *.js               # Reusable hooks
│   │   │
│   │   └── styles/                # Component Styles
│   │       ├── App.css            # Main application styles
│   │       ├── variables.css      # CSS custom properties
│   │       └── *.css              # Component-specific styles
│   │
│   └── build/                     # Production Build (generated)
│       └── static/                # Optimized static assets
│
├── .gitignore                     # Git ignore rules
├── package-lock.json              # Root dependency lock
└── README.md                      # Project documentation (this file)
```

## 🔌 API Documentation

### **AI Chatbot Backend** (`http://localhost:5000`)

#### **POST** `/api/chat`
Process user messages through the AI chatbot and return intelligent responses.

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "message": "Tell me about Shubham's experience"
}
```

**Success Response (200):**
```json
{
  "response": "Ah, you want to know about my human's professional journey? Well, Shubham has quite the impressive background..."
}
```

**Error Response (500):**
```json
{
  "error": "Error message description"
}
```

---

### **Contact Form Backend** (`http://localhost:3001`)

#### **POST** `/api/contact`
Send contact form submissions via email.

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "I'd like to discuss a project opportunity."
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

**Validation Error (400):**
```json
{
  "success": false,
  "message": "All fields are required"
}
```

**Server Error (500):**
```json
{
  "success": false,
  "message": "Failed to send email",
  "error": "Error details"
}
```

#### **GET** `/health`
Check server health status.

**Success Response (200):**
```json
{
  "status": "OK",
  "timestamp": "2024-10-25T12:00:00.000Z"
}
```

---

### **Rate Limiting**
- Contact API: 5 requests per 15 minutes per IP
- Chat API: No rate limiting (consider adding for production)

## 🔐 Environment Variables

### **Backend** (`backend/.env`)
| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `GOOGLE_API_KEY` | Google AI API key for chatbot | Yes | - |
| `PORT` | Server port number | No | 5000 |

### **Contact Backend** (`contact-backend/.env`)
| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PORT` | Server port number | No | 3001 |
| `EMAIL_USER` | Gmail address for sending emails | Yes | - |
| `EMAIL_PASS` | Gmail app password | Yes | - |
| `RECIPIENT_EMAIL` | Email to receive contact submissions | Yes | - |
| `FRONTEND_URL` | Frontend URL for CORS | No | http://localhost:3000 |

### **Frontend** (`frontend/.env`)
| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `REACT_APP_API_URL` | Backend API URL | No | http://localhost:5000 |
| `REACT_APP_CONTACT_API_URL` | Contact API URL | No | http://localhost:3001 |

---

## 🚀 Deployment

### **Frontend Deployment (GitHub Pages)**

The frontend is configured for GitHub Pages deployment:

```bash
cd frontend
npm run deploy
```

This will:
1. Build the production version
2. Deploy to GitHub Pages
3. Make it available at your configured domain

**Custom Domain Setup:**
1. Add your domain to `frontend/public/CNAME`
2. Configure DNS records with your domain provider
3. Run `npm run deploy`

### **Backend Deployment Options**

#### **Option 1: Heroku**
```bash
# Install Heroku CLI
heroku login

# Create apps
heroku create nyxfolio-backend
heroku create nyxfolio-contact

# Deploy backend
cd backend
git init
heroku git:remote -a nyxfolio-backend
git add .
git commit -m "Deploy backend"
git push heroku main

# Set environment variables
heroku config:set GOOGLE_API_KEY=your_key_here

# Repeat for contact-backend
```

#### **Option 2: Vercel**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy each backend
cd backend
vercel

cd ../contact-backend
vercel
```

#### **Option 3: Railway**
1. Visit [Railway.app](https://railway.app)
2. Connect your GitHub repository
3. Deploy each backend folder separately
4. Add environment variables in the dashboard

#### **Option 4: DigitalOcean/AWS/Azure**
- Use PM2 for process management
- Set up Nginx as reverse proxy
- Configure SSL certificates with Let's Encrypt

### **Environment Variables in Production**
Remember to set all environment variables in your hosting platform's dashboard or CLI.

---

## ⚡ Performance Optimization

### **Implemented Optimizations**

#### **Frontend**
- **Code Splitting**: React lazy loading for components
- **Image Optimization**: Compressed images and SVG usage
- **CSS Optimization**: Minified and tree-shaken CSS
- **Caching Strategy**: Service worker for offline functionality
- **Bundle Size**: Optimized with webpack configuration

#### **Backend**
- **Response Compression**: Gzip compression enabled
- **Efficient Routing**: Optimized Express middleware
- **Memory Management**: Proper cleanup and garbage collection

### **Performance Metrics**
- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Total Bundle Size**: < 500KB (gzipped)

### **Further Optimization Tips**
```bash
# Analyze bundle size
cd frontend
npm run build
npx source-map-explorer 'build/static/js/*.js'

# Check for unused dependencies
npx depcheck
```

---

## 🔒 Security

### **Implemented Security Measures**

#### **Contact Backend**
- **Helmet.js**: Security headers (XSS, clickjacking protection)
- **CORS**: Restricted to specific origins
- **Rate Limiting**: Prevents spam and DDoS attacks
- **XSS Clean**: Sanitizes user input
- **Input Validation**: Validates email format and required fields
- **Environment Variables**: Sensitive data not exposed in code

#### **AI Chatbot Backend**
- **API Key Protection**: Keys stored in environment variables
- **CORS Configuration**: Controlled access origins
- **Error Handling**: No sensitive data in error messages

#### **Frontend**
- **Content Security Policy**: Prevents XSS attacks
- **HTTPS Only**: Enforced in production
- **No Inline Scripts**: External script loading only
- **Sanitized Inputs**: User input validation before submission

### **Security Best Practices**
```bash
# Audit dependencies for vulnerabilities
npm audit

# Fix vulnerabilities automatically
npm audit fix

# Check for outdated packages
npm outdated
```

### **Recommended Additional Security**
- Implement JWT authentication for admin features
- Add CAPTCHA to contact form
- Set up Web Application Firewall (WAF)
- Enable HTTPS with SSL certificates
- Implement Content Security Policy headers

---

## 🧪 Testing

### **Running Tests**

#### **Frontend Tests**
```bash
cd frontend

# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

#### **Backend Tests**
```bash
# Test contact backend
cd contact-backend
npm run test

# Check server health
npm run check

# Verify Gmail configuration
npm run verify
```

### **Manual Testing**

#### **Contact Form Testing**
```bash
cd contact-backend
node test-api.js
```

#### **API Testing with cURL**
```bash
# Test chat endpoint
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello Nyx!"}'

# Test contact endpoint
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Test message"}'
```

### **Testing Checklist**
- [ ] All components render without errors
- [ ] Chat functionality works correctly
- [ ] Contact form sends emails successfully
- [ ] Responsive design on mobile/tablet/desktop
- [ ] Cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- [ ] Accessibility standards (WCAG 2.1)
- [ ] SEO meta tags present
- [ ] Performance metrics meet targets

---

## 🤖 Meet Nyx - The AI Assistant

Nyx is not your typical chatbot. With a distinctive sarcastic personality and comprehensive knowledge about Shubham's professional background, Nyx provides:

- **Witty Interactions**: Engaging conversations with a touch of humor
- **Detailed Insights**: In-depth information about projects, skills, and experience
- **Professional Guidance**: Career advice and technical discussions
- **Memory Retention**: Consistent knowledge base across conversations
- **Real-time Responses**: Instant feedback powered by advanced AI

Nyx serves as both an interactive portfolio guide and a demonstration of AI integration capabilities, showcasing how modern web applications can leverage artificial intelligence to enhance user experience.

## 🐛 Troubleshooting

### **Common Issues and Solutions**

#### **Issue: Backend server won't start**
```bash
# Check if port is already in use
netstat -ano | findstr :5000
netstat -ano | findstr :3001

# Kill process using the port (Windows)
taskkill /PID <process_id> /F

# Or change port in .env file
PORT=5001
```

#### **Issue: "Module not found" errors**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Or use npm ci for clean install
npm ci
```

#### **Issue: CORS errors in browser**
- Ensure backend servers are running
- Check CORS configuration in backend files
- Verify `FRONTEND_URL` in contact-backend `.env`
- Clear browser cache and cookies

#### **Issue: Gmail authentication fails**
- Verify 2FA is enabled on Gmail account
- Generate new App Password
- Check `EMAIL_USER` and `EMAIL_PASS` in `.env`
- Run verification script: `npm run verify`

#### **Issue: Chat responses not working**
- Verify `GOOGLE_API_KEY` is set correctly
- Check API key has proper permissions
- Review backend console for error messages
- Test API key at [Google AI Studio](https://ai.google.dev/)

#### **Issue: Build fails**
```bash
# Clear cache and rebuild
cd frontend
rm -rf build node_modules/.cache
npm run build
```

#### **Issue: Deployment fails on GitHub Pages**
- Ensure `homepage` in `package.json` is correct
- Check `CNAME` file has correct domain
- Verify GitHub Pages is enabled in repository settings
- Wait 5-10 minutes for DNS propagation

### **Debug Mode**

Enable detailed logging:

```javascript
// backend/index.js
console.log('Request received:', req.body);
console.log('Response sent:', response);

// frontend/src/components/ChatModal.js
console.log('API Response:', data);
```

### **Getting Help**
- Check existing [GitHub Issues](https://github.com/yourusername/portfolio/issues)
- Review error messages in browser console (F12)
- Check backend logs in terminal
- Verify all environment variables are set

---

## 🤝 Contributing

We welcome contributions to make Nyxfolio even better! Here's how you can help:

### **Getting Started**
1. **Fork the repository**
   ```bash
   # Click "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/your-username/portfolio.git
   cd portfolio
   ```

3. **Create a new branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

4. **Make your changes and test thoroughly**
   ```bash
   # Test all three servers
   npm test
   ```

5. **Commit your changes**
   ```bash
   git add .
   git commit -m 'Add amazing feature'
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

7. **Submit a pull request**
   - Go to original repository
   - Click "New Pull Request"
   - Select your branch
   - Describe your changes

### **Development Guidelines**
- Follow existing code style and conventions
- Use meaningful commit messages
- Add comments for complex functionality
- Test your changes in both development and production builds
- Update documentation as needed
- Ensure responsive design principles are maintained
- Run linting before committing: `npm run lint`

### **Code Style**
```javascript
// Use consistent formatting
const myFunction = async (param) => {
  try {
    // Your code here
    return result;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
```

### **Areas for Contribution**
- **UI/UX Improvements**: Enhanced animations, better responsive design
- **New Features**: Additional portfolio sections, improved chatbot capabilities
- **Performance Optimization**: Faster loading, better caching strategies
- **Accessibility**: Screen reader support, keyboard navigation
- **Documentation**: Code comments, additional guides, tutorials
- **Testing**: Unit tests, integration tests, E2E tests
- **Security**: Additional security measures, vulnerability fixes
- **Internationalization**: Multi-language support

### **Pull Request Checklist**
- [ ] Code follows project style guidelines
- [ ] All tests pass
- [ ] Documentation updated
- [ ] No console errors or warnings
- [ ] Responsive design tested
- [ ] Accessibility standards met
- [ ] Performance impact considered

## �️ Roadmap

### **Version 2.0 (Planned)**
- [ ] Admin dashboard for content management
- [ ] Blog section with markdown support
- [ ] Dark/Light theme toggle
- [ ] Multi-language support (i18n)
- [ ] Advanced analytics integration
- [ ] Project filtering and search
- [ ] Testimonials section
- [ ] Newsletter subscription

### **Version 2.1 (Future)**
- [ ] Voice interaction with Nyx
- [ ] Real-time chat with WebSockets
- [ ] Interactive code playground
- [ ] Video project demonstrations
- [ ] GitHub activity integration
- [ ] Social media feed aggregation

### **Version 3.0 (Vision)**
- [ ] AI-powered resume builder
- [ ] Personalized user experiences
- [ ] Advanced chatbot with context awareness
- [ ] Integration with LinkedIn API
- [ ] Automated project showcase from GitHub

---

## ❓ FAQ

### **General Questions**

**Q: Can I use this code for my own portfolio?**  
A: Yes! This project is open for inspiration and learning. Please customize it and make it your own.

**Q: Do I need to pay for the AI API?**  
A: Google AI API has a free tier with generous limits. Check [pricing](https://ai.google.dev/pricing) for details.

**Q: How do I customize the content?**  
A: Edit the component files in `frontend/src/components/` to update text, images, and information.

### **Technical Questions**

**Q: Why are there two backend servers?**  
A: Separation of concerns - one handles AI chat, the other handles contact form emails. This allows independent scaling and maintenance.

**Q: Can I use a different AI model?**  
A: Yes! Modify `backend/index.js` to integrate with OpenAI, Anthropic, or other AI providers.

**Q: How do I add more projects?**  
A: Edit `frontend/src/components/Projects.js` and add your project data to the projects array.

**Q: Is this mobile-friendly?**  
A: Yes! The entire site is fully responsive and optimized for mobile, tablet, and desktop.

**Q: Can I deploy this for free?**  
A: Yes! Frontend on GitHub Pages (free), backends on Vercel/Railway free tier.

### **Troubleshooting Questions**

**Q: Why isn't my contact form working?**  
A: Ensure Gmail App Password is correctly set in `.env` and 2FA is enabled on your Google account.

**Q: The chat isn't responding. What's wrong?**  
A: Check that your Google AI API key is valid and the backend server is running on port 5000.

**Q: How do I update my resume?**  
A: Replace `frontend/public/ShubhamPatraResume.pdf` with your own PDF file.

---

## 📄 License

This project is licensed under the **MIT License** - see below for details:

```
MIT License

Copyright (c) 2024 Shubham Patra

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

**TL;DR**: You can use, modify, and distribute this code freely. Just include the original license.

---

## 📞 Contact

### **Shubham Patra**
Full-Stack Developer | AI Enthusiast | Open Source Contributor

- 🌐 **Portfolio**: [https://www.shubhampatra.dev](https://www.shubhampatra.dev)
- 📧 **Email**: Use the contact form on the website
- 💼 **LinkedIn**: [Connect with me](https://linkedin.com/in/shubhampatra)
- 🐙 **GitHub**: [@shubhampatra](https://github.com/shubhampatra)
- 🤖 **Chat with Nyx**: Try the AI assistant on the website!

### **Project Links**
- 📦 **Repository**: [GitHub](https://github.com/shubhampatra/portfolio)
- 🐛 **Issues**: [Report a bug](https://github.com/shubhampatra/portfolio/issues)
- 💡 **Discussions**: [Share ideas](https://github.com/shubhampatra/portfolio/discussions)
- ⭐ **Star this repo**: If you find it helpful!

---

## 🙏 Acknowledgments

### **Technologies & Libraries**
- [React](https://react.dev/) - The library for web and native user interfaces
- [Express.js](https://expressjs.com/) - Fast, unopinionated web framework
- [Google AI](https://ai.google.dev/) - Generative AI capabilities
- [Nodemailer](https://nodemailer.com/) - Email sending for Node.js
- [React Icons](https://react-icons.github.io/react-icons/) - Popular icon library

### **Inspiration & Resources**
- [Create React App](https://create-react-app.dev/) - Set up modern web app
- [MDN Web Docs](https://developer.mozilla.org/) - Web development documentation
- [Stack Overflow](https://stackoverflow.com/) - Developer community support

### **Special Thanks**
- To everyone who provided feedback and suggestions
- Open source community for amazing tools and libraries
- Beta testers who helped identify bugs and improvements

---

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/shubhampatra/portfolio?style=social)
![GitHub forks](https://img.shields.io/github/forks/shubhampatra/portfolio?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/shubhampatra/portfolio?style=social)
![GitHub issues](https://img.shields.io/github/issues/shubhampatra/portfolio)
![GitHub pull requests](https://img.shields.io/github/issues-pr/shubhampatra/portfolio)
![GitHub last commit](https://img.shields.io/github/last-commit/shubhampatra/portfolio)

---

<div align="center">

**Built with ❤️ and powered by AI**

© 2024 Shubham Patra | All Rights Reserved

*"In a world of ordinary portfolios, be extraordinary with AI."* - Nyx

### ⭐ Star this repo if you found it helpful!

[Report Bug](https://github.com/shubhampatra/portfolio/issues) · [Request Feature](https://github.com/shubhampatra/portfolio/issues) · [Contribute](https://github.com/shubhampatra/portfolio/pulls)

</div>
