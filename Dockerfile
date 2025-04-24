# Backend - Node.js
FROM node:14 AS backend
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]

# Frontend - Nginx
FROM nginx:alpine AS frontend
COPY . /usr/share/nginx/html
EXPOSE 80

# Estágio Final
FROM nginx:alpine
COPY --from=frontend /usr/share/nginx/html /usr/share/nginx/html
COPY --from=backend /app /app
EXPOSE 3000 80
CMD ["sh", "-c", "node /app/index.js & nginx -g 'daemon off;'"]
