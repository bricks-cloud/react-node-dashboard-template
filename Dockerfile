# build environment
FROM node:16 as build

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent
RUN npm install react-scripts@3.4.1 -g --silent
COPY . ./

# build the react app
RUN npm run build

FROM node:16-slim

# set working directory
WORKDIR /app

# add app
COPY --from=build /build /build
COPY --from=build package.json ./
COPY --from=build /server /server

# expose the port
EXPOSE 3000

# start the server
CMD ["npm", "run", "start-server"]