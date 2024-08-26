# Use the official Node.js image from the Docker Hub
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Build the application
RUN npm run build

# Install serve to serve the application
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 5000

# Serve the application
CMD ["serve", "-s", "build", "-l", "5000"]
