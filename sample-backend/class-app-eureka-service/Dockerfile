# Use a Windows Server Core base image
FROM mcr.microsoft.com/windows/servercore:ltsc2019
FROM mcr.microsoft.com/dotnet/framework/runtime:4.8-windowsservercore-ltsc2019

## Install Chocolatey
RUN powershell -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command \
    "Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))"

ENV chocolateyVersion=1.4.0

RUN choco upgrade chocolatey -y -r
# Install OpenJDK 21
RUN choco install openjdk --version=21.0.0 -y
# Install Maven
RUN choco install maven --version=3.8.5 -y

RUN refreshenv

# Copy the pom.xml and download dependencies
COPY pom.xml .
RUN ["cmd", "/S", "/C", "mvn dependency:go-offline"]

# Copy the source code and build the application
COPY src ./src
RUN ["cmd", "/S", "/C", "mvn package -DskipTests"]

# Expose the port the app runs on
EXPOSE 8080

# Command to run the application
CMD ["java", "-jar", "C:/target/class-app-eureka-service-0.0.1-SNAPSHOT.jar"]
