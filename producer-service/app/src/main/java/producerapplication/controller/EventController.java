package producerapplication.controller;

import producerapplication.service.EventPublisher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
@RequestMapping("/api/events")
public class EventController {

    @Autowired
    private EventPublisher eventPublisher;

    @PostMapping("/buy")
    public ResponseEntity<String> handleBuyEvent(@RequestBody Map<String, Object> request) {
        String courseId = (String) request.get("courseId");
        String userId = (String) request.get("userId");
        Double price = (Double) request.get("price");

        eventPublisher.publishBuyEvent(courseId, userId, price);
        return ResponseEntity.ok("Buy event published successfully");
    }

    @PostMapping("/enroll")
    public ResponseEntity<String> handleEnrollEvent(@RequestBody Map<String, Object> request) {
        String courseId = (String) request.get("courseId");
        String userId = (String) request.get("userId");
        String enrollmentType = (String) request.get("enrollmentType");

        eventPublisher.publishEnrollEvent(courseId, userId, enrollmentType);
        return ResponseEntity.ok("Enroll event published successfully");
    }
}
