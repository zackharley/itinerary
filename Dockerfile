FROM node:9
RUN apt-get update && apt-get install -y \
  pdftk

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

CMD ["npm", "run", "build"]
