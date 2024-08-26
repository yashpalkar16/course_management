# Use the official Node.js image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . /app/

# Build the application
RUN npm run build

# Serve the app using a simple server
RUN npm install -g serve
CMD ["serve", "-s", "build"]

# Expose the port
EXPOSE 5000
