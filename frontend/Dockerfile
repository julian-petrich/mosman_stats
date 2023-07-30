FROM node:alpine

WORKDIR /app
COPY . ./

RUN npm install --silent

ENV NODE_OPTIONS="--openssl-legacy-provider"

EXPOSE 3000

CMD ["npm", "start"]