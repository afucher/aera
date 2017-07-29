FROM node:latest

RUN npm install -g webpack

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app
RUN webpack

EXPOSE 3000

CMD [ "node", "index.js"]