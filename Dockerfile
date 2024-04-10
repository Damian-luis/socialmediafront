# Usa una imagen base de Node
FROM node:14

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el package.json y package-lock.json para instalar las dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia todos los archivos al contenedor
COPY . .

# Compila la aplicación
RUN npm run build

# Expone el puerto 3000
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
