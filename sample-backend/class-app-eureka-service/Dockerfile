FROM maven
WORKDIR ./class-app-eureka-service
COPY . .
RUN mvn clean install -DskipTests
CMD mvn spring-boot:run
