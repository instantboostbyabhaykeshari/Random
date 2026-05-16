# use official node image
FROM node:20

# create app directory
WORKDIR /app

# copy package files
COPY package*.json ./

# install dependencies
RUN npm install

# copy project files
COPY . .

# expose backend port
EXPOSE 5000

# start server
CMD ["npm", "run", "dev"]