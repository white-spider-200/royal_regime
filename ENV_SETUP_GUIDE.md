# 🍵 Environment Variables Setup Guide

Yo, viber! This is your `.env.example` breakdown. Think of this as your app's secret config file where we store sensitive stuff. Let's break it down:

---

## 🤖 **GEMINI_API_KEY**
```
GEMINI_API_KEY="MY_GEMINI_API_KEY"
```
**What it does:** This is your magic key to use Google's Gemini AI. It's like your VIP pass to AI superpowers.

**Why it matters:** Without this, your app can't talk to the AI. The system auto-injects it from your secrets, so keep it secure! 🔐

---

## 🌐 **APP_URL**
```
APP_URL="MY_APP_URL"
```
**What it does:** This is the address where your app is actually running (like `https://my-app.example.com`).

**Why it matters:** Your app uses this to know its own address for:
- Creating links that point back to itself
- OAuth login callbacks
- API endpoints

Think of it as telling your app "hey, you live at this address!" 📍

---

## 📧 **SMTP Email Configuration**
These settings let your app send emails directly. SMTP = Simple Mail Transfer Protocol (just the way email gets sent).

### **SMTP_HOST** & **SMTP_PORT**
```
SMTP_HOST=""        # The email server's address (like smtp.gmail.com)
SMTP_PORT="587"     # The port (587 is standard, super chill)
```

### **SMTP_USER** & **SMTP_PASS**
```
SMTP_USER=""        # Your email account username
SMTP_PASS=""        # Your email account password (keep this secret!)
```

### **SMTP_FROM**
```
SMTP_FROM=""        # What email address shows up when sending (your brand's address)
```

### **SMTP_TO**
```
SMTP_TO="mohammedh.handi@gmail.com"    # Where emails get sent to
```

---

## 📝 **How to Use This**

1. **Copy this file:** Rename `.env.example` → `.env` in your local project
2. **Fill in the values:**
   - Get your Gemini API key from Google AI Studio
   - Add your app's URL
   - Configure your email settings if you need email features
3. **Keep it safe:** Never commit `.env` to git (add it to `.gitignore`)
4. **Use it:** Your app reads these values automatically at startup

---

## 🔒 **Pro Tips**
- Never share your `.env` file or API keys
- Different secrets for dev, staging, and production
- Use AI Studio's Secrets panel for cloud deployments
- Check if variables are actually needed before filling all of them

---

**Happy coding, vibe coder!** ✨
