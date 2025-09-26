# Course Platform - Event-Driven Microservices Architecture

A comprehensive online learning platform demonstrating modern microservices architecture with event streaming, real-time analytics, and observability.

## Architecture Overview

```
[React Frontend] → [Producer Service] → [Kafka] → [Consumer Service] → [Prometheus] → [Grafana]
     :3000            :8080                        :8082             :9090        :3000
```

## Tech Stack

- **Frontend**: React 18 + Tailwind CSS
- **Backend**: Spring Boot 3.2.2 + Java 21
- **Messaging**: Apache Kafka
- **Metrics**: Micrometer + Prometheus  
- **Visualization**: Grafana
- **Build**: Gradle + npm

## Project Structure

```
course-platform/
├── frontend/                 # React application
├── producer-service/         # Event publisher service  
├── consumer-service/         # Event processor + metrics
├── monitoring/              # Prometheus configuration
├── docker-compose.yml       # Infrastructure setup
└── README.md
```

## Features

### Business Features
- Course catalog with multiple courses
- Purchase tracking with real-time analytics
- Multiple enrollment types (purchase, free trial, audit)
- Professional UI with responsive design

### Technical Features  
- Event-driven architecture with Kafka messaging
- Real-time metrics collection and visualization
- Microservices with independent scaling
- Complete observability stack (logs, metrics, dashboards)
- Professional monitoring with Grafana dashboards

## Quick Start

### Prerequisites
- Java 21+
- Node.js 18+
- Docker & Docker Compose

### 1. Start Infrastructure
```bash
docker-compose up -d
```

### 2. Create Kafka Topic
```bash
docker exec -it kafka kafka-topics --create --topic course-events --bootstrap-server localhost:9092 --partitions 3 --replication-factor 1
```

### 3. Start Consumer Service
```bash
cd consumer-service
./gradlew bootRun
```

### 4. Start Producer Service  
```bash
cd producer-service
./gradlew bootRun
```

### 5. Start Frontend
```bash
cd frontend
npm install
npm start
```

### 6. Access Applications
- **Course Platform**: http://localhost:3000
- **Prometheus**: http://localhost:9090  
- **Grafana**: http://localhost:3001 (admin/admin)

## Usage

1. **Generate Events**: Visit the course platform and interact with courses (buy, enroll)
2. **View Metrics**: Check Prometheus for raw metrics
3. **Analyze Data**: Use Grafana dashboards for visualizations

## Key Metrics

- `course_purchases_total{course_id}` - Total purchases per course
- `course_enrollments_total{course_id,enrollment_type}` - Enrollments by type
- `event_processing_duration` - Consumer performance metrics

## Grafana Dashboards

### Business Metrics
- Total course purchases and enrollments
- Popular courses analysis  
- Enrollment type distribution
- Revenue and conversion tracking

### Technical Metrics
- Event processing performance
- Kafka consumer lag
- System health monitoring

## Development

### Adding New Metrics
1. Update `EventConsumer.java` with new counters
2. Generate events through frontend interactions  
3. Create corresponding Grafana panels

### Scaling
- **Producer**: Multiple instances behind load balancer
- **Consumer**: Increase Kafka partitions + consumer instances  
- **Frontend**: CDN + multiple replicas

## Monitoring URLs

- **Consumer Health**: http://localhost:8082/actuator/health
- **Producer Health**: http://localhost:8080/actuator/health  
- **Metrics**: http://localhost:8082/actuator/prometheus
- **Kafka**: localhost:9092

## Troubleshooting

### Common Issues
1. **Port conflicts**: Ensure ports 3000, 8080, 8082, 9090, 3001 are free
2. **Java version**: Requires Java 21+ for Spring Boot 3.x
3. **Kafka connection**: Verify Kafka is running before starting services

### Debug Commands
```bash
# Check service health
curl http://localhost:8082/actuator/health

# View raw metrics  
curl http://localhost:8082/actuator/prometheus | grep course

# Test Kafka topic
docker exec -it kafka kafka-console-consumer --topic course-events --bootstrap-server localhost:9092
```

## Architecture Decisions

### Why Kafka?
- Decouples producer and consumer services
- Enables event replay and audit trails
- Supports multiple consumers for same events
- Provides durability and fault tolerance

### Why Separate Services?
- Independent scaling and deployment
- Clear separation of concerns  
- Technology diversity (different languages/frameworks possible)
- Fault isolation

### Why Prometheus + Grafana?
- Industry standard monitoring stack
- Rich visualization capabilities  
- Alerting and SLA monitoring
- Integration with cloud platforms

## Contributing

1. Fork the repository
2. Create feature branch
3. Add tests for new functionality
4. Update documentation
5. Submit pull request

## License

MIT License - see LICENSE file for details
