FROM node:16-alpine

RUN mkdir src

RUN apk update && \
    apk upgrade && \
    apk add git && \
    npm install -g npm@9.1.3 nuxi nuxt3

WORKDIR /nuxt
COPY ./src /nuxt
COPY start.sh /start.sh
RUN chmod 744 /start.sh
CMD ["sh", "/start.sh"]

USER node
