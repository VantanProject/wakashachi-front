FROM node:22.5-slim

WORKDIR /next-app
COPY ./next-app .

RUN npm install
CMD ["npm", "run", "dev"]
EXPOSE 3000
