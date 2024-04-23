FROM maven
WORKDIR ./class-app-auth-service
COPY . .
RUN mvn clean install
CMD mvn spring-boot:run