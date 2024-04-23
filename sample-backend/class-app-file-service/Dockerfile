FROM maven
WORKDIR ./projectName-file-service
COPY . .
RUN mvn clean install -DskipTests
CMD mvn spring-boot:run