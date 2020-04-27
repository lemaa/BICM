FROM node:12.16-alpine

# Create work directory
WORKDIR /usr/src/app

# Copy app source to work directory
COPY ./package.json ./

# Install app dependencies
RUN npm install

#Copy working dir
COPY . .

#Expose port
EXPOSE 3000

#run db migrations
RUN npm run migration:dev

#run swagger generation
RUN npm run generate:swagger

# Build and run the app
CMD ["npm", "run", "watch:dev"]