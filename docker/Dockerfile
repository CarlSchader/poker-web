FROM node as builder
WORKDIR /app
COPY . /app
RUN npm install

FROM alpine as final

RUN apk add --update nodejs

WORKDIR /build

COPY --from=builder /app/ .

ENV PORT=8080
ENV API_URL=http://poker-api

EXPOSE 8080

ENTRYPOINT ["node", "src/index.js"]