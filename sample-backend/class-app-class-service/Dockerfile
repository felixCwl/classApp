# Use a base image with Maven installed
FROM maven

# Set the working directory
WORKDIR /app

# Copy the Maven project files to the container
COPY pom.xml .
COPY src ./src

# Build the Maven project
RUN mvn clean package
COPY ./target/my-app.jar .

# Create a new image with only the JAR file
FROM openjdk:18

# Set the working directory in the new image
WORKDIR /app

# Set the command to run the JAR file
CMD ["java", "-jar", "my-app.jar"]