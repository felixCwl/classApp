FROM maven
WORKDIR ./sample-backend/
COPY . .
RUN mvn clean install
CMD mvn spring-boot:run