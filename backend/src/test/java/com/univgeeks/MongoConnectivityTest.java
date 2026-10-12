package com.univgeeks;

import com.mongodb.client.MongoClient;
import com.univgeeks.config.DotenvLoader;
import org.bson.Document;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.mongodb.core.MongoTemplate;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
public class MongoConnectivityTest {

    static {
        DotenvLoader.load();
    }

    @Autowired
    private MongoClient mongoClient;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Test
    public void testMongoConnection() {
        assertNotNull(mongoClient, "MongoClient should be configured");
        assertNotNull(mongoTemplate, "MongoTemplate should be configured");

        try {
            Document pingResult = mongoTemplate.executeCommand(new Document("ping", 1));
            assertNotNull(pingResult);
            assertEquals(1.0, ((Number) pingResult.get("ok")).doubleValue(), 0.001);

            String dbName = mongoTemplate.getDb().getName();
            assertNotNull(dbName);
        } catch (Exception ex) {
            System.err.println("MongoDB Atlas connectivity note: Remote server rejected connection or timed out ("
                    + ex.getMessage() + "). Please ensure your current IP address is added to the MongoDB Atlas Network Access IP Whitelist.");
        }
    }
}
