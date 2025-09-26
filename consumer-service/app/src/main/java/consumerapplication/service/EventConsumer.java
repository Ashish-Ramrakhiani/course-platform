package consumerapplication.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.instrument.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
public class EventConsumer {

    private final ObjectMapper objectMapper;
    private final MeterRegistry meterRegistry;

    @Autowired
    public EventConsumer(MeterRegistry meterRegistry) {
        this.objectMapper = new ObjectMapper();
        this.meterRegistry = meterRegistry;

        System.out.println("EventConsumer initialized with MeterRegistry");
    }

    @KafkaListener(topics = "course-events", groupId = "course-analytics-group")
    public void handleCourseEvents(String message) {
        try {
            JsonNode event = objectMapper.readTree(message);
            String eventType = event.get("eventType").asText();

            if ("course_purchased".equals(eventType)) {
                handlePurchaseEvent(event);
            } else if ("course_enrolled".equals(eventType)) {
                handleEnrollmentEvent(event);
            }

            System.out.println("Processed " + eventType + " event for course: " + event.get("courseId").asText());

        } catch (Exception e) {
            System.err.println("Error processing event: " + e.getMessage());
            e.printStackTrace();
        }
    }

    private void handlePurchaseEvent(JsonNode event) {
        String courseId = event.get("courseId").asText();
        double price = event.get("price").asDouble();

        // Create counter with tags and increment
        Counter.builder("course_purchases_total")
                .description("Total number of course purchases")
                .tags(Arrays.asList(Tag.of("course_id", courseId)))
                .register(meterRegistry)
                .increment();

        System.out.println("Purchase processed and counter incremented - Course: " + courseId + ", Price: $" + price);
    }

    private void handleEnrollmentEvent(JsonNode event) {
        String courseId = event.get("courseId").asText();
        String enrollmentType = event.get("enrollmentType").asText();

        // Create counter with tags and increment
        Counter.builder("course_enrollments_total")
                .description("Total number of course enrollments")
                .tags(Arrays.asList(
                        Tag.of("course_id", courseId),
                        Tag.of("enrollment_type", enrollmentType)
                ))
                .register(meterRegistry)
                .increment();

        System.out.println("Enrollment processed and counter incremented - Course: " + courseId + ", Type: " + enrollmentType);
    }
}