FROM maven
WORKDIR ./class-app-file-service
COPY . .
RUN mvn clean install -DskipTests
CMD mvn spring-boot:run
