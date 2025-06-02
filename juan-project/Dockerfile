# Etapa 1: Build de la app con Node
FROM node:18-alpine AS build

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .
RUN npm run build


# Etapa 2: Servir la app con Caddy
FROM caddy:2-alpine

# Copiar el build de React (la carpeta dist)
COPY --from=build /app/dist /usr/share/caddy

# Caddyfile para servir estático y escuchar en $PORT
# Usamos un archivo de configuración que apunta al root y escucha puerto dinámico
COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 80

CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile"]
