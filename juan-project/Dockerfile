# Etapa 1: Build de la app con Node
FROM node:18-alpine AS build

WORKDIR /app

# Copia package.json y lock para instalar deps
COPY package.json package-lock.json* yarn.lock* ./

# Instala dependencias (npm o yarn según tu proyecto)
RUN npm install

# Copia todo el código fuente
COPY . .


# Construye la app para producción
RUN npm run build

# Etapa 2: Servir la app con nginx
FROM nginx:alpine

# Copia build estático a la carpeta que nginx sirve por defecto
COPY --from=build /app/dist /usr/share/nginx/html

# Copia configuración personalizada de nginx si tienes (opcional)
# COPY nginx.conf /etc/nginx/nginx.conf

# Exponer puerto 80
EXPOSE 80

# Comando por defecto (nginx)
CMD ["nginx", "-g", "daemon off;"]
