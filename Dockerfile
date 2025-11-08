# This is the Dockerfile for Fragments microservice.

FROM node:23.11.0

LABEL maintainer="Your Name <email>"
LABEL description="Fragments node.js microservice"

# Default environment variables
ENV PORT=8080
ENV NPM_CONFIG_LOGLEVEL=warn
ENV NPM_CONFIG_COLOR=false

WORKDIR /app

# Copy dependency definitions
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy your service code
COPY ./src ./src

# Copy htpasswd for basic auth
COPY ./tests/.htpasswd ./tests/.htpasswd

EXPOSE 8080

# Recommended: exec form to handle signals
CMD ["npm", "start"]
