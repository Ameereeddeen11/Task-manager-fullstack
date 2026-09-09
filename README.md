# TaskFlow (Task Manager Fullstack)

TaskFlow is a modern, full-stack task management application that allows users to organize their tasks into different lists, manage priorities, and track progress.

## Tech Stack
**Frontend:**
- React 19
- TypeScript
- Vite
- Tailwind CSS

**Backend:**
- Java 21
- Spring Boot
- Spring Data JPA
- Maven

**Database & Infrastructure:**
- PostgreSQL 16
- Docker & Docker Compose
- Nginx (for serving the frontend in production)

## Features
- **Task Lists:** Create, read, update, and delete custom task lists.
- **Task Management:** Add tasks to specific lists, edit them, and remove them.
- **Task Attributes:** Manage properties such as priority levels and status tracking.
- **Responsive UI:** Clean, modern interface styled with Tailwind CSS.
- **Containerized Environment:** Easily runnable with Docker Compose for a seamless setup.

## Project Structure

- `/frontend`: React single-page application built with Vite.
- `/backend`: Java Spring Boot REST API.
- `/docker-compose.yml`: Orchestrates the frontend, backend, and PostgreSQL database.

## Getting Started

### Prerequisites
- [Docker](https://www.docker.com/get-started) and [Docker Compose](https://docs.docker.com/compose/install/)
- *(Optional, for local development without Docker)*:
  - Java 21
  - Node.js (v18+)
  - PostgreSQL 16

### Running with Docker (Recommended)

The easiest way to get the application up and running is using Docker Compose. This spins up the database, backend, and frontend all at once.

1. Navigate to the project root:
   ```bash
   cd Task-manager-fullstack
   ```

2. Start the services using Docker Compose:
   ```bash
   docker compose up --build
   ```

3. Access the application:
   - **Frontend:** [http://localhost](http://localhost)
   - **Backend API:** [http://localhost:8080](http://localhost:8080)

### Local Development

If you prefer to run the components separately for development:

**1. Database**
Ensure you have a local PostgreSQL instance running (with user `postgres` and password `mypassword`), or start just the database via Docker:
```bash
docker compose up db -d
```

**2. Backend**
Navigate to the `backend` directory, and start the Spring Boot application:
```bash
cd backend
./mvnw spring-boot:run
```
The API will start running at `http://localhost:8080`.

**3. Frontend**
Navigate to the `frontend` directory, install dependencies, and start the Vite dev server:
```bash
cd frontend
npm install
npm run dev
```
The frontend will run at `http://localhost:5173`. API requests are automatically proxied to the backend running on port 8080.

## 🗺️ Roadmap & Future Plans

Here are some of the planned features and improvements for future releases:

**Testing & Quality Assurance**
- [ ] Comprehensive testing suite for both backend and frontend (Unit, Integration, and End-to-End tests).

**DevOps & Infrastructure**
- [ ] Implement CI/CD pipelines (e.g., GitHub Actions or GitLab CI) for automated testing and deployment.
- [ ] Container orchestration using Kubernetes (K8s) for scalability and high availability.
- [ ] Add application monitoring and logging (e.g., Prometheus, Grafana).

**Features & Enhancements**
- [ ] **Authentication & Authorization:** Secure user accounts using JWT or OAuth2, allowing multiple users with private task lists.
- [ ] **API Documentation:** Integrate Swagger/OpenAPI for interactive backend API documentation.
- [ ] **Advanced Task Management:** Support for drag-and-drop reordering, due dates, and reminders.
- [ ] **Dark Mode:** Add a theme toggle for better user experience in low-light environments.

## 📄 License

This project is licensed under the terms of the [LICENSE](./LICENSE) file included in the repository root.