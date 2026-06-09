# EmailJS Setup Guide

## Overview
Your portfolio form is now configured to send email notifications to **susanveronica96@gmail.com** when someone submits the contact form.

## Setup Instructions

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click **Sign Up** and create a free account
3. Verify your email address

### Step 2: Add Email Service
1. From the dashboard, click **Email Services**
2. Click **Add Service**
3. Select **Gmail** (or your email provider)
4. Click **Create Service**
5. Follow the prompts to authenticate with your Gmail account
6. Copy the **Service ID** (looks like: `service_xxxxx`)

### Step 3: Create Email Template
1. From the dashboard, click **Email Templates**
2. Click **Create New Template**
3. Name it: `template_portfolio`
4. Use the following template content:

```
From: {{from_name}} <{{from_email}}>
Subject: {{subject}}

Message:
{{message}}

---
Contact Info:
Email: {{from_email}}
Name: {{from_name}}
```

5. Save the template and copy the **Template ID** (looks like: `template_xxxxx`)

### Step 4: Update App.jsx
Update the code in [src/App.jsx](src/App.jsx) with your IDs (lines 3 and 676):

```javascript
// Line 3 - Replace with your PUBLIC Key from EmailJS account settings
emailjs.init('nTGZIEfAUjjTRe5gf')

// Line 676 - Replace SERVICE_ID and TEMPLATE_ID
emailjs.send('service_b5axwsy', 'YOUR_TEMPLATE_ID', templateParams)
```

### Step 5: Get Your Public Key
1. Go to EmailJS dashboard
2. Click **Account** → **API Keys**
3. Copy your **Public Key**
4. Replace `'pLLBvQBLWpfJx2BOP'` in App.jsx line 3 with your public key

### Step 6: Update Service & Template IDs
Replace the placeholders in line 676:
- `'service_portfolio'` → Your Service ID
- `'template_portfolio'` → Your Template ID

## Testing
1. Run `npm run dev`
2. Scroll to the contact form
3. Fill in and submit the form
4. Check your email (susanveronica96@gmail.com) for the notification
5. Verify sender information appears correctly

## Email Recipients
- **Notification Email**: susanveronica96@gmail.com
- **Reply-To**: The visitor's email address (automatically included)

## Notes
- EmailJS free tier supports up to 200 emails/month
- All form data is sent securely to your Gmail
- The public key in your code is safe to expose (it's for public use)
- Keep your Service ID and Template ID private
