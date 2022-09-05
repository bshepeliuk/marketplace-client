
FROM node:14.18-alpine3.12 as node

# Builder stage

FROM node as builder
# Use /app as the CWD
WORKDIR /app
# Copy package.json and package-lock.json to /app
COPY package*.json ./
# Install all dependencies
RUN npm install
# https://community.fly.io/t/fly-secrets-not-populated-during-build/659
ARG STRIPE_PUBLISH_KEY
ENV STRIPE_PUBLISH_KEY=${STRIPE_PUBLISH_KEY}
# Copy the rest of the code
COPY . .

RUN npm run build

# Final stage

FROM node as final
# Prepare a destination directory for js files
RUN mkdir -p /app/build
# Use /app as CWD
WORKDIR /app
# Copy package.json and package-lock.json
COPY package*.json ./
# Install only production dependencies
RUN npm i --only=production
# Copy transpiled js from "builder" stage into the "final" image
COPY --from=builder /app/build ./build

COPY ./static-server.js ./static-server.js
# Open desired port
EXPOSE 8080

CMD ["npm", "start"]
