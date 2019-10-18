# The instructions for the first stage
FROM node:8-stretch as builder

# Build arguments
ENV NODE_ENV=production
ENV PORT=3000

COPY package*.json ./
RUN npm install

# The instructions for second stage
FROM node:8-stretch

# Build arguments
ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /usr/src/app
COPY --from=builder node_modules node_modules

COPY . .

# Expose specific port and other necessary ports for debugging
EXPOSE $PORT 9229 9230

CMD ["node", "server.js"]
