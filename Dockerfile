FROM node:5
MAINTAINER Joseph Rollins <rollins.joseph@gmail.com>
ARG apikey

ENV API_KEY=$apikey

RUN mkdir -p /bikeshare
WORKDIR /bikeshare

COPY package.json /bikeshare/
RUN npm install

COPY . /bikeshare

EXPOSE 3333
CMD ["npm", "run", "production"]
