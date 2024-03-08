# Use an official Node.js runtime as the base image
FROM node:20

# Set the working directory in the Docker image
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the app dependencies
RUN npm install

# Copy the app source code to the working directory
COPY . .

# Expose port 3000 for the app
EXPOSE 3000

# Start the app

RUN npm install pm2 -g

CMD ["pm2-runtime", "dist/app.js"]