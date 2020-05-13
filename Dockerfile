#############################
#   Builder
#############################
FROM node:12.13.1-alpine as builder

# Create app directory
WORKDIR /app
ADD . .
RUN npm ci && npm run build

#############################
#   Server
#############################
FROM node:12.13.1-alpine

ENV APP_UID=9999
ENV APP_GID=9999
ENV APP_HOME=/srv
RUN apk --no-cache add shadow \
    && groupmod -g $APP_GID node \
    && usermod -u $APP_UID -g $APP_GID node \
    && mkdir -p $APP_HOME \
    && chown -R node $APP_HOME

USER node
WORKDIR $APP_HOME

COPY --from=builder /app/package.json .
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

CMD ["npm", "start"]
EXPOSE 8080/tcp
