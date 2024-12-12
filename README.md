
# EBUDDY PTE. LTD. Technical Test

This repository contains the solutions for the EBUDDY PTE. LTD. technical test, which involves setting up both backend and frontend applications, integrating Firebase, implementing RESTful endpoints, and creating a monorepo using Turborepo. It also includes answers to personality and technical questions.

## Table of Contents

- [Part 1: Backend Setup](#part-1-backend-setup)
- [Part 2: Frontend Setup](#part-2-frontend-setup)
- [Part 3: Monorepo Setup via Turborepo](#part-3-monorepo-setup-via-turborepo)
- [Part 4: Personality & Technical Questions](#part-4-personality--technical-questions)
- [Installation Instructions](#installation-instructions)

---

## Part 1: Backend Setup

### Repository Name: `backend-repo`

### Framework: Express.js

### Directory Structure:
```
backend-repo/
├── config/
│   └── firebaseConfig.ts
├── controller/
│   └── api.ts
├── core/
│   └── app.ts
├── entities/
│   └── user.ts
├── middleware/
│   └── authMiddleware.ts
├── repository/
│   └── userCollection.ts
├── routes/
│   └── userRoutes.ts
└── package.json
```

### Functionality:

1. **Endpoint `update-user-data`**: Updates Firestore data in the `USERS` collection.
2. **Endpoint `fetch-user-data`**: Fetches Firestore data from the `USERS` collection.
3. **Middleware**: `authMiddleware.ts` validates the request token.

---

## Part 2: Frontend Setup

### Repository Name: `frontend-repo`

### Framework: Next.js

### UI Library: React MUI

### Directory Structure:
```
frontend-repo/
├── apis/
│   └── userApi.ts
│   └── user.ts
├── theme/
├── app/
├── components/
│   └── UpdateButton.tsx
├── store/
│   ├── actions.ts
│   ├── reducers.ts
│   └── store.ts
└── package.json
```

### Functionality:

- **Firebase Authentication**: Implemented for login and creating a basic Logic Form.
- **Mobile-Responsive Logic Form**: Using React MUI to ensure mobile responsiveness.
- **State Management**: Using Redux to manage the state of the update process, including loading, success, and error messages.
- **API Integration**: Fetch user information with a button and display the state using `Typography`.
- **Testing Locally**: Can test the API locally using the Firebase Emulator.

---

## Part 3: Monorepo Setup via Turborepo

### Objective:
Identify common logic between the frontend and backend repositories and combine them into a monorepo using Turborepo.

### Directory Structure after Monorepo Setup:
```
technical-test/
├── apps/
│   ├── frontend-repo/
│   └── backend-repo/
├── packages/
│   └── shared/
│       ├── types/
│       │   └── user.ts (common shared type definitions)
│       └── utils/
│           └── userValidation.ts (common validation logic)
├── package.json
└── turbo.json
```

#### **Shared Logic**
- **`user.ts` (in `packages/shared/types/`)**:
  Contains the `User` type definition to ensure consistent data structures across both frontend and backend.
- **`userValidation.ts` (in `packages/shared/utils/`)**:
  Includes the `validateUser` function to validate `User` objects consistently across frontend and backend.

#### **Turborepo Configuration**
The `turbo.json` file is set up to manage dependencies and tasks across the monorepo efficiently. It allows for parallel builds and shared caching.

#### **Usage of Shared Logic**
- **Frontend**: The shared `User` type and validation logic are used in components like `UpdateButton.tsx` to validate user input.
- **Backend**: The shared logic is utilized in `controller/api.ts` to validate incoming requests before processing.

---

## Part 4: Personality & Technical Questions

### 1. **What are the most difficult technical problems in your work experience you have encountered and how do you fix them?**

The most difficult technical problems I have faced involve issues with scalability and performance optimization. For example, optimizing the backend performance when handling large datasets in real-time applications can become challenging. I typically approach these issues by first analyzing the problem through profiling tools, identifying bottlenecks, and then applying caching techniques or refactoring the code to optimize algorithm performance. Additionally, for distributed systems, I focus on improving concurrency and load balancing to handle high traffic.

### 2. **When you’re working on a project, how do you typically approach it from start to finish?**

I follow an iterative approach to project development. Initially, I break down the project into smaller tasks, ensuring I understand the requirements fully. I start by setting up the project structure and ensuring that I have a clean development environment. I then implement the core features, followed by testing and integration. Throughout the development process, I continuously ensure proper documentation and keep my team updated. Finally, after deployment, I monitor the project and make necessary adjustments based on user feedback.

### 3. **How do you usually approach learning a new topic to absorb as much as possible?**

When learning a new topic, I start by understanding the fundamentals and building a solid theoretical foundation. I prefer hands-on learning, so I look for projects or exercises that allow me to apply what I’m learning. Additionally, I engage with community resources, such as blogs, forums, and online courses, to gain different perspectives. I also prioritize consistency, dedicating time daily to learn and practice, rather than cramming.

### 4. **“Consistency” vs “fast & efficient”. Choose one.**

I value **consistency** over "fast & efficient". While efficiency is important, I believe that consistency leads to long-term success and mastery in any field. Consistent effort and practice allow for steady improvement, better understanding, and a deeper grasp of concepts.

### 5. **Do you own any Apple products? Like iMac, Macbook, iPad, iPhone, etc…**

Yes, I own a **MacBook**. I prefer using it for development due to its smooth performance and compatibility with various development tools, especially when working on frontend and mobile applications.

### 6. **What is your immediate availability to start work?**

I am available to start work immediately, as I am currently in a position where I can focus full-time on new opportunities.

---

## Installation Instructions

### 1. **Clone the repository:**
```bash
git clone https://github.com/your-username/technical-test.git
cd technical-test
```

### 2. **Install dependencies for the monorepo:**
From the root directory, install all the dependencies for the monorepo:
```bash
npm install
```

### 3. **Frontend Setup:**
Navigate to the frontend app directory:
```bash
cd apps/frontend-repo
```
Install frontend dependencies:
```bash
npm install
```

### 4. **Backend Setup:**
Navigate to the backend app directory:
```bash
cd apps/backend-repo
```
Install backend dependencies:
```bash
npm install
```

### 5. **Run the backend API locally using Firebase Emulator:**
In the backend directory, start the Firebase emulator:
```bash
firebase emulators:start --only functions
```

### 6. **Run the frontend app:**
Back in the frontend directory, start the frontend app:
```bash
npm run dev
```

Visit `http://localhost:3000` to see the frontend app in action.

---

## Conclusion

This repository includes the solution to the EBUDDY PTE. LTD. technical test, where I implemented a backend API with Express.js, integrated Firebase for authentication and Firestore, developed a frontend using Next.js, and combined both into a monorepo using Turborepo. Additionally, I answered some personality and technical questions as part of the assessment process.

Feel free to explore the repository, and I look forward to further discussions on this!
