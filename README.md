# Products App

A minimal full-stack application to create and list products.

**Tech Stack**

* Frontend: React
* Backend: Spring Boot
* Database: PostgreSQL
* DevOps: Docker (optional but recommended)

---

# Prerequisites

Make sure you have the following installed:

* Node.js (v18+ recommended)
* npm (comes with Node)
* Java JDK (17 recommended)
* Maven (or use `./mvnw`)
* PostgreSQL (v14+)

**OR (Recommended):**

* Docker
* Docker Compose

---

# Database Setup

## Option 1 — Using Docker (Recommended)

Run:

```bash
docker-compose up -d db
```

This will:

* Start PostgreSQL on port `5432`
* Create database `products_db`
* Automatically create the `products` table

---

## Option 2 — Manual Setup

### Step 1: Create Database

```sql
CREATE DATABASE products_db;
```

### Step 2: Create Table

```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);
```

### Step 3: Update Backend Config

Update `application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/products_db
spring.datasource.username=postgres
spring.datasource.password=abc@123
```

---

# Start Backend

Navigate to backend folder:

```bash
cd backend
```

Build and run:

```bash
mvn clean package
mvn spring-boot:run
```

Backend will start at:

```
http://localhost:8080
```

Test API:

```
GET http://localhost:8080/products
```

---

# Start Frontend

Navigate to frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start app:

```bash
npm start
```

Frontend will run at:

```
http://localhost:3000
```

---

# 🔍 Verify

1. Open:
   http://localhost:3000

2. In the input field, create a product:

   ```
   P1
   ```

3. Click **Add**

4. Confirm:

   * Product appears in the list
   * Page refresh still shows the product

---

# Run Entire App with Docker (Optional)

```bash
docker-compose up --build
```

Access:

* Frontend → http://localhost:3000
* Backend → http://localhost:8080/products

---

# Notes

* Followed preferred stack: React + Spring Boot + PostgreSQL
* Used simple REST APIs (`GET /products`, `POST /products`)
* Added:

  * Backend validation (`@NotBlank`)
  * Global exception handling
  * Frontend error handling
  * Basic accessibility (ARIA roles, labels)
* Kept schema minimal as per requirement (only `id` and `name`)
* Docker setup included for easy evaluation
---

# Author

Submitted as part of a full-stack coding exercise.
