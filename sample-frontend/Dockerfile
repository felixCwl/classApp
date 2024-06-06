# Use the official Node.js image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

RUN rm -rf node_modules/ && rm -rf package-lock.json

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install -g npm@10.8.1

# Copy the rest of the application code
COPY . .

# Build the application (for Next.js, you might need to build it)
RUN npm run build

# Expose the port the app runs on (usually 3000 for Next.js)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]