# ALX Project Nexus

This repository is dedicated to documenting major learnings from the ALX ProDev Frontend Engineering program. It serves as a knowledge hub, showcasing concepts, tools, best practices, and personal insights gained throughout the program.

---

## 📘 Program Overview

The **ALX ProDev Frontend Engineering** program is a comprehensive learning experience designed to equip learners with modern frontend development skills. The program emphasizes hands-on learning, real-world projects, collaboration with backend developers, and professional growth.

---

## 🚀 Major Learnings

### 🧩 Key Technologies Covered

- **Next.js** – for building full-stack React applications with server-side rendering.
- **Tailwind CSS** – a utility-first CSS framework for rapidly building custom user interfaces.
- **TypeScript** – statically typed superset of JavaScript for robust code.
- **GraphQL** – an alternative to REST APIs that provides flexible and efficient data querying.
- **API Integration** – consuming and integrating REST and GraphQL APIs.
- **Progressive Web Apps (PWA)** – enabling web applications to work offline and be installable.
- **Mobile Development with React Native & Expo Router**

---

### 💡 Important Concepts

- **System Design & Analysis** – understanding architectural patterns, scalability, and planning.
- **State Management** – using useState, Context API, Redux Toolkit.
- **Routing** – both in Next.js and React Native with Expo Router.
- **Authentication & Authorization** – managing user sessions and access control.
- **UI/UX Principles** – wireframing, prototyping, and creating user-centric designs.

---

## 🧠 Challenges Faced & Solutions

| Challenge | Solution |
|----------|----------|
| Handling deeply nested state | Introduced Redux Toolkit for scalable and predictable state management. |
| Styling consistency | Used Tailwind’s design tokens and utility classes to maintain a design system. |
| API errors and loading states | Implemented reusable API call utilities with loading and error boundaries. |
| Learning TypeScript from scratch | Practiced with small modules and converted JavaScript files gradually. |

---

## ✅ Best Practices & Takeaways

- Write **clean, maintainable code** with reusable components.
- Use **Git branches** and clear commit messages for version control.
- Document your **learning and decisions** throughout the project.
- Collaborate effectively with backend developers using **shared endpoints**.
- Never underestimate the power of **wireframing and planning before coding**.

---

# CrownVote Voting Platform

An online voting platform for the Miss Kenya pageant, built with Next.js (frontend), Redux Toolkit (state management), Django REST Framework (backend), and Tailwind CSS (styling). The platform enables secure, transparent, and real-time voting and results display for contestants from all counties.

## Features

- **Live Results Dashboard:**
  - Real-time bar chart of votes for each contestant
  - "Current Leader" card with live stats
  - Top contenders list with vote percentages
  - Voting statistics and visualizations (bar, pie, and trend charts)
- **Public Voting:**
  - Anyone can vote for their favorite contestant
  - No login required for voting or viewing results
- **Admin Tools:**
  - Backend management for contestants and vote synchronization
- **Modern UI:**
  - Responsive, mobile-friendly design
  - Built with Tailwind CSS and Recharts for beautiful charts

## Tech Stack

- **Frontend:** Next.js, React, Redux Toolkit, Recharts, Tailwind CSS
- **Backend:** Django, Django REST Framework
- **State Management:** Redux Toolkit
- **Charts:** Recharts

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- Python 3.10+
- Django 4+

### Installation

1. **Clone the repository:**
	```bash
	git clone https://github.com/Mwesh-F/alx-project-nexus.git
	cd alx-project-nexus
	```

2. **Install frontend dependencies:**
	```bash
	npm install
	```

3. **Install backend dependencies:**
	```bash
	cd authapi
	pip install -r requirements.txt
	```

4. **Sync contestants (from backend):**
	```bash
	python manage.py sync_contestants
	```

5. **Run the backend server:**
	```bash
	python manage.py runserver
	```

6. **Run the frontend (in project root):**
	```bash
	npm run dev
	```

## Usage

- Visit `http://localhost:3000` to access the voting platform.
- View live results, vote for contestants, and see top contenders in real time.

## Project Structure

- `src/app/` — Next.js app directory (pages, results, voting UI)
- `src/store/` — Redux Toolkit slices and store
- `authapi/` — Django backend (API, models, management commands)
- `public/` — Static assets (contestant images, placeholder, etc.)

## Customization

- Add or update contestants via the Django admin or management commands.
- Update chart types or UI in `src/app/results/page.tsx` as needed.

## License

This project is for educational and demonstration purposes.

