FROM maven
WORKDIR ./class-app-class-service
COPY . .
RUN mvn clean install -DskipTests
CMD mvn spring-boot:run