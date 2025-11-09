# 🍽️ Internet Development Environments – Project 3.2: Backend Development

## 📘 Overview
This project was developed as part of the **Internet Development Environments** course at **Ben-Gurion University of the Negev (Spring 2023)**.  
The goal of this task was to develop the **backend server and database layer** for a recipe management web application.  
The backend integrates both a **MySQL database** for local data and an **external REST API** (Spoonacular) for public recipe information.

---

## 🧠 Objectives
- Design and implement the backend according to a predefined API specification.  
- Integrate the **Spoonacular Food API** for retrieving recipe data (search, random, and detailed info).  
- Manage **user data, private recipes, and interactions** via a MySQL database.  
- Implement **modular, clean, and maintainable** Node.js code with Express routes.  
- Collaborate via **GitHub** in pairs using a shared repository (`ID1_ID2`).

---

## 🏗️ System Architecture
### Components
1. **Backend Server**  
   Built with **Node.js + Express**, following RESTful API design principles.  
   Each route corresponds to an endpoint defined in the project API specification.

2. **Database (MySQL)**  
   Stores user-related and personal data such as:
   - User accounts  
   - Private and family recipes  
   - User actions (favorites, uploads, etc.)  

3. **External API Integration – Spoonacular**
   Used for fetching:
   - General recipe searches  
   - Recipe details (ingredients, instructions, nutrition)  
   - Random recipe recommendations  

---

## ⚙️ Technologies Used
| Layer | Technology |
|-------|-------------|
| Backend | Node.js, Express.js |
| Database | MySQL |
| External API | [Spoonacular API](https://spoonacular.com/food-api) |
| IDE | Visual Studio Code |
| Collaboration | GitHub Classroom |

---

## 🗂️ Project Structure
