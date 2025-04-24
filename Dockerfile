# Backend - Node.js
FROM node:14 AS backend
WORKDIR /app
COPY backend/package*.json ./  # Alterado para o caminho correto
RUN npm install
COPY backend/ ./  # Alterado para o caminho correto
EXPOSE 3000
CMD ["node", "index.js"]

# Frontend - Nginx
FROM nginx:alpine AS frontend
COPY frontend/ /usr/share/nginx/html  # Alterado para o caminho correto
EXPOSE 80

# Estágio Final
FROM nginx:alpine
COPY --from=frontend /usr/share/nginx/html /usr/share/nginx/html
COPY --from=backend /app /app
EXPOSE 3000 80
CMD ["sh", "-c", "node /app/index.js & nginx -g 'daemon off;'"]
