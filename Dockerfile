FROM node:16-alpine as builder
RUN mkdir /app
WORKDIR /app
COPY ui/package.json ./
COPY ui/yarn.lock ./
RUN yarn install --frozen-lockfile
COPY ./ui/ .
RUN yarn build


ARG BASEIMAGEREGISTRY=""
FROM ${BASEIMAGEREGISTRY}nginxinc/nginx-unprivileged:1.22-alpine
COPY  /nginx/templates_conf.d /etc/nginx/templates
COPY --from=builder /app/dist /etc/nginx/html
COPY  /nginx/dns-to-env.sh /tmp/dns-to-env.sh
USER root
RUN echo "$(cat /tmp/dns-to-env.sh)$(cat /docker-entrypoint.sh)" > /docker-entrypoint.sh
USER 101

