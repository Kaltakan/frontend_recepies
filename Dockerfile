# Stage 1: Build dell'app React
FROM node:16-alpine as build

WORKDIR /app

# Copia dei file di configurazione e installazione delle dipendenze
COPY package*.json ./
RUN npm install

# Copia del resto dei file e build dell'app
COPY . .
RUN npm run build

# Stage 2: Configurazione di Nginx per servire l'app
FROM nginx:stable-alpine

# Copia della configurazione personalizzata di Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia della build nella directory di default di Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Espone la porta 80 per il traffico HTTP
EXPOSE 80

# Avvia Nginx in modalità foreground
CMD ["nginx", "-g", "daemon off;"]
