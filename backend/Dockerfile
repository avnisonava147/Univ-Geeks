# Multi-stage build for Univ-Geeks Spring Boot Backend

# Stage 1: Build the application
FROM maven:3.9-eclipse-temurin-21-alpine AS builder

WORKDIR /app

# Copy pom.xml and cache dependencies
COPY pom.xml .
RUN mvn dependency:go-offline -B || true

# Copy source files and build the runnable jar
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Runtime environment (using Ubuntu-based Jammy with glibc and full CA certificates)
FROM eclipse-temurin:21-jre-jammy

WORKDIR /app

# Copy the built jar from the builder stage
COPY --from=builder /app/target/*.jar app.jar

# Render dynamically assigns the PORT environment variable
ENV PORT=8080
EXPOSE 8080

ENTRYPOINT ["java", "-Djdk.tls.client.protocols=TLSv1.2,TLSv1.3", "-Djsse.enableSNIExtension=true", "-jar", "app.jar"]
