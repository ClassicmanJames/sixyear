FROM node:19.6.0-alpine
RUN mkdir -p /app
COPY . /app/
WORKDIR /app/
RUN npm install --force && npm run build

EXPOSE 3000
ENV PORT 3000

CMD ["npm", "start"]