FROM node:20

WORKDIR /app

ENV NODE_ENV=development

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5001

CMD ["npm", "run", "dev"]