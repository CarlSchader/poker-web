FROM node as builder
WORKDIR /src
COPY . /src
RUN npm install

FROM alpine as final

RUN apk add --update nodejs

WORKDIR /build

COPY --from=builder /src/ .

ENV PORT=80
ENV API_URL=http://poker-api

EXPOSE 80

ENTRYPOINT ["node", "src/index.js"]