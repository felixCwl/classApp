#FROM maven
#WORKDIR ./sample-backend/
#COPY . .
#RUN mvn clean install
#CMD mvn spring-boot:run

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