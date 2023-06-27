FROM node:16.16.0

WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# RUN npm install

# If you are building your code for production
RUN npm ci --omit=dev

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "rewritedb" ]