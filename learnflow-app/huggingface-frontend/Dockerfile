FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Set the API URL to the Hugging Face deployed API
ENV NEXT_PUBLIC_API_URL=https://naveed247365-learnflow-api.hf.space

# Build the application
RUN npm run build

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
