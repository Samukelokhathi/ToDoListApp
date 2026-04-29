
Preview app => https://to-do-list-app-tan-nu.vercel.app/

<img width="1629" height="795" alt="image" src="https://github.com/user-attachments/assets/5ff570a1-b2f3-426a-96c1-848fd8340575" />






# To-Do App

## Overview

A lightweight task management web application built with JavaScript, HTML, and CSS. Supports task creation, editing, filtering, and persistent storage using Local Storage.

---

## Features

* Add, edit, and delete tasks
* Mark tasks as completed
* Task priority levels (Low, Medium, High)
* Search functionality
* Task filtering (All, Active, Completed, High Priority)
* Persistent data with Local Storage
* Dynamic task counters

---

## Tech Stack

* JavaScript (Vanilla)
* HTML5
* CSS3

---

## Data Structure

```json
{
  "id": number,
  "text": string,
  "completed": boolean,
  "priority": "low" | "medium" | "high"
}
```

---

## Core Functionality

* DOM manipulation for dynamic UI updates
* Event-driven architecture
* Local Storage for state persistence
* Array methods (`map`, `filter`, `some`) for data handling

