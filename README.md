# EventPro Platform - Frontend

A modern, responsive frontend for a full-stack event management platform, built with React, TypeScript, and Vite. This application provides a seamless user experience for creating, discovering, and registering for events.

**Live URL**: [https://simon-eventpro.com](https://simon-eventpro.com)

---

## Key Features

- **User Authentication**: Secure registration and login for event creators and users.
- **Event Discovery**: Browse, search, and filter a comprehensive list of events.
- **Event Management**: Dedicated dashboard for creators to create, update, and manage their events.
- **Responsive Design**: Fully functional and visually appealing on all devices, from mobile to desktop.
- **AI Integration**: Features an AI-powered assistant to help with event descriptions.

---

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: CSS Modules / PostCSS
- **State Management**: React Context / Zustand _(adjust as needed)_
- **Routing**: React Router
- **API Communication**: Fetch API / Axios

---

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v18 or later)
- npm

### Installation

1.  Clone the repository:
    ```sh
    git clone [https://github.com/Simon990723/eventpro-api-frontend.git](https://github.com/Simon990723/eventpro-api-frontend.git)
    ```
2.  Navigate to the project directory:
    ```sh
    cd eventpro-api-frontend
    ```
3.  Install NPM packages:
    ```sh
    npm install
    ```
4.  Create your local environment file by copying the example:
    ```sh
    cp .env.example .env.local
    ```
5.  Update `.env.local` with your local backend API URL (e.g., `VITE_API_URL=http://localhost:5189`).

6.  Run the development server:
    ```sh
    npm run dev
    ```

---

## Deployment

This application is deployed on **AWS Amplify Hosting**, configured with a CI/CD pipeline that automatically builds and deploys changes pushed to the `main` branch. The backend is a .NET API running on **AWS App Runner**.
