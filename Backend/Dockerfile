FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Porta usada pelo backend
EXPOSE 5000  

CMD ["npm", "start"]  
# Altere conforme seu comando de start