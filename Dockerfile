FROM node:alpine
WORKDIR '/app'
COPY package.json .

RUN npm install
RUN npm ci --only=production

COPY . .
CMD ["npm","start"]