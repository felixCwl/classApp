FROM mcr.microsoft.com/dotnet/framework/runtime:4.8-windowsservercore-ltsc2019
USER ContainerAdministrator

SHELL ["powershell", "-Command", "$ErrorActionPreference = 'Stop';"]

# Install Node.js
RUN Invoke-WebRequest -Uri https://nodejs.org/dist/v18.17.0/node-v18.17.0-x64.msi -OutFile nodejs.msi; Start-Process msiexec.exe -ArgumentList '/i', 'nodejs.msi', '/quiet', '/norestart' -NoNewWindow -Wait; Remove-Item -Force nodejs.msi

# Set the working directory inside the container
WORKDIR C:/app
# Copy the package.json and package-lock.json files
COPY package*.json ./
RUN pwd
RUN dir

USER ContainerAdministrator
# Install the dependencies
RUN npm install -g npm@10.8.1; npm install app --force
RUN pwd
RUN dir
# Copy the rest of the application code
COPY . .
RUN pwd
RUN dir
# Expose port 3000
EXPOSE 3000

# Start the HTTP server
CMD ["cmd", "/c", "set", "NODE_OPTIONS=--max-old-space-size=8192", "&&", "npm", "run", "winStart"]
#CMD ["cmd", "/c", "npm", "run", "winStart"]
#RUN npm run winStart
#CMD ["npm", "run", "winStart"]
