# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR ./sample-frontend

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

RUN npm config set legacy-peer-deps true
RUN npm install -g npm@10.5.2

# Install the app dependencies
#RUN npm install
RUN npm run install:clean:noStart

# Copy the source code to the container
COPY . ./

# Build the React app
RUN npm run build

# Expose the desired port
EXPOSE 3000

# Set the command to run the app when the container starts
CMD ["npm", "start"]
