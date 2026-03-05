IaC Provisioning for Telecom System
Group No: D6 - Group 03
Project No: DO-14
Project Description
This project focuses on containerizing and deploying an Entertainment React-based web application using modern DevOps practices. The goal is to automate the build, test, and deployment lifecycle of a React service using Docker containers and orchestrating them with Kubernetes.
By integrating CI/CD pipelines with Jenkins or GitHub Actions, the system eliminates manual deployment steps and ensures consistent, scalable, and reliable application delivery.

Project Overview
The system provides a fully automated DevOps pipeline for an Entertainment React application. The workflow begins with code pushed to GitHub, which triggers a CI/CD pipeline.

The pipeline performs:
Code checkout
Dependency installation
Application build
Docker image creation
Image push to container registry
Deployment to Kubernetes cluster

Kubernetes manages container orchestration, scaling, and service exposure. The entire lifecycle—from code commit to live deployment—is automated with minimal human intervention.

Objectives

1. Automation
   Replace manual deployment with automated CI/CD pipelines.

2. Consistency
   Ensure uniform behavior across development, testing, and production environments using Docker containers.

3. Scalability
   Enable horizontal scaling of the React service using Kubernetes.

4. Reliability
   Ensure zero-downtime deployments and self-healing capabilities through Kubernetes.

5. Continuous Integration & Delivery
   Automate testing, building, and deployment using Jenkins or GitHub Actions.

Tech Stack
Category Tools/Technologies Used
Version Control Git, GitHub
Containerization Docker
CI/CD Jenkins / GitHub Actions
Orchestration Kubernetes (K8s)
Frontend React.js
Container Registry Docker Hub / GitHub Container Registry

Key Features
Dockerized React Application – Lightweight and portable containerized frontend service.
Automated CI/CD Pipeline – Continuous integration and deployment using Jenkins/GitHub Actions.
Kubernetes Deployment – Scalable and self-healing application environment.
Version Control Integration – Git-based workflow for structured development.
Rolling Updates – Zero-downtime application updates using Kubernetes strategies.

Group Members
MRUNALI KAMERIKAR - EN22CS301618
MAITRY BANDUKE - EN22CS301571
MUSKAN ASIJA - EN22CS301623
MOHD QUASIM - EN22CS301603

Conclusion
The Dockerized Entertainment React Service project demonstrates the practical implementation of DevOps principles in modern web application deployment. By leveraging Git, Docker, Jenkins/GitHub Actions, and Kubernetes, we successfully created an automated, scalable, and resilient deployment pipeline.

This project highlights how containerization and orchestration improve software delivery speed, reduce deployment errors, and ensure system reliability. It serves as a foundational DevOps implementation for cloud-native entertainment platforms.

Developed as part of the Skill Based Course at Medicaps University in collaboration with Datagami.
