# Step 1: Build the app
FROM node:18 AS build

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the source code
COPY . .

# Build the app for production
RUN npm run build

# Step 2: Use Nginx to serve the app
FROM nginx:alpine

# Copy the build output from the build stage to Nginx's public folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 to the host
EXPOSE 80

# Run Nginx to serve the React app
CMD ["nginx", "-g", "daemon off;"]
