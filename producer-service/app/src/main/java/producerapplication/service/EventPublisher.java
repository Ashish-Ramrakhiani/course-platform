package producerapplication.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
import java.util.UUID;

@Service
public class EventPublisher {

    private final KafkaProducer<String, String> kafkaProducer;
    private final ObjectMapper objectMapper;
    private static final String TOPIC_NAME = "course-events";

    public EventPublisher() {
        Properties props = new Properties();
        props.put("bootstrap.servers", "127.0.0.1:9092");
        props.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
        props.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");
        props.put("acks", "all");
        props.put("retries", 3);

        this.kafkaProducer = new KafkaProducer<>(props);
        this.objectMapper = new ObjectMapper();
    }

    public void publishBuyEvent(String courseId, String userId, Double price) {
        try {
            Map<String, Object> event = new HashMap<>();
            event.put("eventId", UUID.randomUUID().toString());
            event.put("eventType", "course_purchased");
            event.put("timestamp", Instant.now().toString());
            event.put("courseId", courseId);
            event.put("userId", userId);
            event.put("price", price);
            event.put("currency", "USD");

            String eventJson = objectMapper.writeValueAsString(event);
            ProducerRecord<String, String> record = new ProducerRecord<>(TOPIC_NAME, courseId, eventJson);

            kafkaProducer.send(record, (metadata, exception) -> {
                if (exception != null) {
                    System.err.println("Failed to send buy event: " + exception.getMessage());
                } else {
                    System.out.println("Buy event sent - Offset: " + metadata.offset());
                }
            });
        } catch (Exception e) {
            System.err.println("Error creating buy event: " + e.getMessage());
        }
    }

    public void publishEnrollEvent(String courseId, String userId, String enrollmentType) {
        try {
            Map<String, Object> event = new HashMap<>();
            event.put("eventId", UUID.randomUUID().toString());
            event.put("eventType", "course_enrolled");
            event.put("timestamp", Instant.now().toString());
            event.put("courseId", courseId);
            event.put("userId", userId);
            event.put("enrollmentType", enrollmentType);

            String eventJson = objectMapper.writeValueAsString(event);
            ProducerRecord<String, String> record = new ProducerRecord<>(TOPIC_NAME, courseId, eventJson);

            kafkaProducer.send(record, (metadata, exception) -> {
                if (exception != null) {
                    System.err.println("Failed to send enroll event: " + exception.getMessage());
                } else {
                    System.out.println("Enroll event sent - Offset: " + metadata.offset());
                }
            });
        } catch (Exception e) {
            System.err.println("Error creating enroll event: " + e.getMessage());
        }
    }
}