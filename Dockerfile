FROM node:22.4.0-alpine3.21
WORKDIR /app
COPY ./package.json ./package-lock.json ./
RUN npm install
COPY ./ ./
RUN npm run build
CMD ["sh", "./entrypoint.sh"]