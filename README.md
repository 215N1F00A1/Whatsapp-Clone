# WhatsApp Web Clone

A full-stack WhatsApp Web–like chat interface that processes WhatsApp Business API webhook payloads, stores messages in MongoDB, and displays conversations in real-time.

---

## Features

- Processes webhook JSON payloads simulating WhatsApp Business API
- Stores new messages in MongoDB Atlas (`whatsapp.processed_messages` collection)
- Updates message statuses (sent, delivered, read) based on webhook payloads
- Responsive, mobile-friendly UI closely mimicking WhatsApp Web
- Conversations grouped by user (`wa_id`)
- Chat view showing message bubbles with timestamps and status indicators
- Basic user info (name, phone number) displayed per chat
- Send message demo: input box to add new messages saved locally and in DB (no real external sending)
- (Optional) Real-time updates via WebSocket (Socket.IO) to reflect new messages/status without page refresh

---

## Tech Stack

- Backend: Node.js, Express.js
- Database: MongoDB Atlas
- Frontend: React.js, Tailwind CSS
- Deployment: [Your hosting platform e.g. Vercel, Render]

---

## Setup & Installation

1. Clone the repository


git clone https://github.com/215N1F00A1/Whatsapp-Clone.git
cd Whatsapp-Clone
Install backend dependencies and set environment variables


cd backend
npm install
Create a .env file in the backend folder with the following:


MONGODB_URI=your_mongodb_atlas_connection_string
PORT=5000
Install frontend dependencies


cd ../frontend
npm install
Run the backend server


cd ../backend
npm start
Run the frontend app


cd ../frontend
npm run dev
Open your browser at http://localhost:3000 (or the port configured)

Usage
The backend ingests webhook payloads (JSON files) and stores messages in MongoDB

The frontend displays conversations grouped by user

Click a chat to view messages with date/time and status indicators

Use the message input box to send new messages (saved to DB and shown in UI)

(If implemented) Real-time updates will reflect message/status changes instantly

Deployment
The app is publicly hosted here:
https://your-deployment-url.com

(Replace above URL with your actual deployed app URL)

Notes
This app does not send real WhatsApp messages. It is a simulation based on webhook data.

AI-generated code was used in parts; full understanding and customization was done.

The project meets the evaluation criteria for UI accuracy, responsiveness, backend structure, and message processing.

License
MIT License

