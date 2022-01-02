FROM node:17.3.0-alpine AS BUILD_ANGULAR

ARG COMPILE_PROFILE
ARG BASE_URL

WORKDIR /app

COPY package*.json ./
RUN apk update && apk add git
RUN npm install && npm install -g @angular/cli

COPY . .

RUN ng build --configuration=${COMPILE_PROFILE} --base-href=${BASE_URL}

FROM nginx:alpine

RUN ln -fs /usr/share/zoneinfo/America/Guatemala /etc/localtime
VOLUME /etc/localtime:/etc/localtime:ro

COPY --from=BUILD_ANGULAR /app/default.conf /etc/nginx/conf.d/default.conf
COPY --from=BUILD_ANGULAR /app/dist/gps-tracker-wpa/ /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
