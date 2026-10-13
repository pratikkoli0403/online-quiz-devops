# QuickQuiz — DevOps Assignment

QuickQuiz is a lightweight web-based quiz application built using HTML, CSS, and JavaScript.

## Technologies Used
- HTML, CSS, JavaScript
- Git and GitHub
- Docker and Docker Hub
- GitHub Actions for CI/CD
- Ansible for container deployment
- Trivy for container image vulnerability scanning
- Jira for task tracking

## Deployment
The application is containerized using Docker and served through Nginx.

- Local Docker deployment: `http://localhost:8080`
- Ansible-managed container: `http://localhost:8081`

## CI/CD
A GitHub Actions workflow verifies the project files and builds the Docker image on pushes and pull requests targeting the `main` branch.

## Security
Trivy was used to scan the Docker image. The scan reported HIGH and CRITICAL vulnerabilities, which should be reviewed and remediated before production use.

## Project Purpose
This project demonstrates basic web application development alongside containerization, automated build verification, deployment automation, task tracking, and container security scanning.
