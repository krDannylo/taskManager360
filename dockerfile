FROM node:22-alpine

WORKDIR /usr/src/app

RUN apk add --no-cache postgresql-client

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN chmod +x entrypoint.sh

EXPOSE 3000

CMD ["sh", "./entrypoint.sh"]