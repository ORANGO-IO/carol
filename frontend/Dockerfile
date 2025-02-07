# Stage 1: Build the React app
FROM node:20-slim AS build_stage

# Set working directory
WORKDIR /app

# Copy and install dependencies
COPY frontend/package.json ./
COPY frontend/yarn.lock ./ 
COPY frontend/.env ./.env
RUN yarn install

# Copy the rest of the frontend files and build the app
COPY frontend ./ 
RUN yarn build

# Stage 2: Serve with Nginx
FROM nginx:1.16.0-alpine

# Copy built React files to Nginx's default directory
COPY --from=build_stage /app/build /usr/share/nginx/html

# Copy custom Nginx configuration
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Run Nginx in the foreground
ENTRYPOINT ["nginx", "-g", "daemon off;"]
