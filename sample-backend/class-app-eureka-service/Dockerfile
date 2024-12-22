# Use a Windows Server Core base image
# FROM mcr.microsoft.com/dotnet/framework/runtime:4.8-windowsservercore-ltsc2019
#
# FROM winamd64/openjdk:21-jdk-windowsservercore
# FROM harnesscommunitytest/maven-plugin:windows-amd64
FROM classappservice/java-maven-base:master
#FROM anshikaanand/maven-plugin:windows-amd64

# Copy the pom.xml and download dependencies
COPY pom.xml .
RUN ["cmd", "/S", "/C", "mvn dependency:go-offline"]

# Copy the source code and build the application
COPY src ./src
RUN ["cmd", "/S", "/C", "mvn package -DskipTests"]

# Expose the port the app runs on
EXPOSE 8080
# Command to run the application
CMD ["java", "-Xmx2G", "-Xms1G", "-jar" , "C:/target/class-app-eureka-service-0.0.1-SNAPSHOT.jar"]
