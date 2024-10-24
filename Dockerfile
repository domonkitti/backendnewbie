# Step 1: Build the application
FROM node:18 AS build

WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the project
RUN npm run build

# Step 2: Create the production image
FROM node:18-alpine

WORKDIR /usr/src/app

# Copy node_modules and built files from the build stage
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist


EXPOSE 3000
CMD ["node", "dist/main"]
