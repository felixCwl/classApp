FROM mcr.microsoft.com/windows/servercore:ltsc2019
FROM mcr.microsoft.com/dotnet/framework/runtime:4.8-windowsservercore-ltsc2016

# Install Chocolatey
RUN powershell -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command \
    "Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))"

RUN choco upgrade chocolatey -y -r

RUN choco install nodejs.install --version=18.4.0 -y

#RUN RMDIR node_modules
#RUN DEL package-lock.json

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install -g npm@10.8.1

# Copy the rest of the application code
COPY . .

# Build the application (for Next.js, you might need to build it)
RUN npm run winBuild

# Expose the port the app runs on (usually 3000 for Next.js)
EXPOSE 3000

# Start the application
CMD ["npm", "winStart"]