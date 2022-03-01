FROM node as builder
WORKDIR /src
COPY . /src
RUN npm install

FROM alpine as final

RUN apk add --update nodejs

WORKDIR /build

COPY --from=builder /src/ .

ENV PORT=8080
ENV API_URL=http://poker-api

EXPOSE 8080

CMD ["node", "src/index.js"]