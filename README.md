# Course Platform - Event-Driven Microservices

An online learning platform demonstrating event-driven architecture with Spring Boot microservices, Apache Kafka messaging, and real-time monitoring with Prometheus and Grafana.

![Java](https://img.shields.io/badge/Java-21-orange?style=for-the-badge&logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.2-green?style=for-the-badge&logo=spring)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![Apache Kafka](https://img.shields.io/badge/Apache%20Kafka-latest-red?style=for-the-badge&logo=apache-kafka)
![Prometheus](https://img.shields.io/badge/Prometheus-latest-orange?style=for-the-badge&logo=prometheus)
![Grafana](https://img.shields.io/badge/Grafana-latest-yellow?style=for-the-badge&logo=grafana)

## System Architecture

```
[React Frontend] → [Producer Service] → [Kafka] → [Consumer Service] → [Prometheus] → [Grafana]
     :3001            :8081               :9092       :8082             :9090        :3001
```

## What This Project Demonstrates

### Backend Development
- **Spring Boot 3.2.2**: Modern Java web services with Spring Boot 3.x and Java 21
- **RESTful API Design**: HTTP endpoints for handling course purchases and enrollments
- **Event Publishing**: Kafka producer integration for publishing events to message queues
- **Event Processing**: Kafka consumer that processes events and updates metrics
- **JSON Processing**: Parsing event data and extracting business information

### Event-Driven Architecture
- **Apache Kafka Integration**: Producer-consumer pattern with event streaming
- **Asynchronous Processing**: Decoupled services communicating through events
- **Event Types**: Two distinct event types (`course_purchased`, `course_enrolled`)
- **Message Serialization**: JSON event structure with metadata

### Metrics and Monitoring
- **Micrometer Integration**: Custom counter metrics for business events
- **Prometheus Metrics**: Exposing application metrics via `/actuator/prometheus`
- **Dimensional Metrics**: Counters with labels for course_id and enrollment_type
- **Grafana Visualization**: Real-time dashboards showing purchase and enrollment data

### Frontend Development
- **React 18**: Modern functional components with hooks
- **Responsive Design**: Professional UI with Tailwind CSS
- **API Integration**: HTTP requests to backend services
- **Real-time Interaction**: User actions trigger backend events

## Project Structure

```
course-platform/
├── frontend/                 # React application
├── producer-service/         # HTTP API → Kafka publisher
├── consumer-service/         # Kafka consumer → Metrics
├── monitoring/              # Prometheus configuration  
├── docker-compose.yml       # Kafka, Zookeeper, Prometheus, Grafana
└── README.md
```

## Technical Implementation

### Event Flow
1. User clicks course button in React frontend
2. Frontend sends HTTP POST to producer service
3. Producer service publishes event to Kafka topic `course-events`
4. Consumer service processes event from Kafka
5. Consumer increments Micrometer counters
6. Prometheus scrapes metrics from consumer service
7. Grafana displays real-time visualizations

### Event Structure
```json
{
  "eventId": "uuid",
  "eventType": "course_purchased" | "course_enrolled",
  "timestamp": "2025-01-15T14:30:45.123Z",
  "courseId": "java-fundamentals",
  "userId": "user_123",
  "price": 89.99,
  "enrollmentType": "free-trial" | "audit"
}
```

### Metrics Collected
- `course_purchases_total{course_id}` - Counter for course purchases
- `course_enrollments_total{course_id,enrollment_type}` - Counter for enrollments by type

## Quick Start

### Prerequisites
- Java 21+
- Node.js 18+
- Docker & Docker Compose

### Setup
```bash
# 1. Clone repository
git clone https://github.com/Ashish-Ramrakhiani/course-platform.git
cd course-platform

# 2. Start infrastructure (Kafka, Prometheus, Grafana)
docker-compose up -d

# 3. Create Kafka topic
docker exec -it kafka kafka-topics --create --topic course-events --bootstrap-server localhost:9092 --partitions 3 --replication-factor 1

# 4. Start consumer service
cd consumer-service
./gradlew bootRun

# 5. Start producer service  
cd producer-service
./gradlew bootRun

# 6. Start frontend
cd frontend
npm install && npm start
```

### Access Points
- **Course Platform**: http://localhost:3001
- **Prometheus**: http://localhost:9090
- **Grafana**: http://localhost:3000 (admin/admin)

## Demo & Screenshots

### Application Interface
<img width="1920" height="1047" alt="image" src="https://github.com/user-attachments/assets/c96796bd-cb49-4b9d-a9cc-cfd8c5ce1113" />

### Real-time Analytics
<img width="1920" height="1047" alt="image" src="https://github.com/user-attachments/assets/5ddf300a-9b2f-49e1-9c31-0e8d631bbb2e" />


## Live Demo

### System Walkthrough (~2 minutes)
[![Course Platform Demo](https://img.youtube.com/vi/YOUR_VIDEO_ID/maxresdefault.jpg)](https://www.youtube.com/watch?v=JjaF3d_KaBY)

*Click the image above to watch the full demo*


## Technologies Used

### Backend
- **Java 21**: Modern Java with latest language features
- **Spring Boot 3.2.2**: Web framework with embedded Tomcat
- **Spring Kafka**: Kafka integration for Spring Boot
- **Micrometer**: Metrics collection library
- **Jackson**: JSON processing for event serialization

### Frontend  
- **React 18**: UI library with functional components
- **Tailwind CSS**: Utility-first CSS framework
- **Modern JavaScript**: ES6+ features and async/await

### Infrastructure
- **Apache Kafka**: Message broker for event streaming
- **Prometheus**: Time-series database for metrics
- **Grafana**: Visualization and dashboards
- **Docker Compose**: Container orchestration

## Key Features Implemented

### Course Platform
- Six different courses with realistic details
- Professional UI design with course cards
- Purchase tracking with price information
- Multiple enrollment types (purchase, free trial, audit)
- Real-time event generation from user interactions

### Event Processing
- HTTP endpoints for purchases (`/api/events/buy`) and enrollments (`/api/events/enroll`)
- Kafka message production with proper serialization
- Consumer group configuration for message processing
- Custom metrics creation with dimensional labels

### Monitoring Stack
- Prometheus metrics scraping from Spring Boot Actuator
- Grafana dashboards with multiple visualization types
- Real-time metric updates (5-second refresh)
- Business metrics (purchases, enrollments) and system metrics

## Configuration

### Kafka Configuration
- Topic: `course-events` with 3 partitions
- Consumer group: `course-analytics-group`
- Bootstrap servers: `localhost:9092`

### Service Ports
- Frontend: 3000
- Producer: 8080  
- Consumer: 8082
- Prometheus: 9090
- Grafana: 3001
- Kafka: 9092

## Learning Outcomes

This project demonstrates:
- Building microservices with Spring Boot
- Implementing event-driven architecture with Kafka
- Creating custom application metrics with Micrometer
- Setting up monitoring with Prometheus and Grafana
- Developing responsive frontends with React
- Container orchestration with Docker Compose
- Full-stack application development and deployment

## Repository Structure

The codebase shows clean separation of concerns with:
- Independent services that can be developed and deployed separately
- Event-driven communication reducing tight coupling
- Comprehensive monitoring for operational visibility
- Modern technology stack with current versions
- Professional code organization and documentation
