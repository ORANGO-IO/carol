FROM node:14-buster-slim as build_stage

RUN mkdir -p /app
WORKDIR /app
COPY frontend/package.json .
COPY frontend/.env .env
RUN yarn
COPY frontend .
RUN yarn build

FROM nginx:1.16.0-alpine

COPY --from=build_stage /app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]