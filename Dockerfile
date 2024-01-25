# Usa uma imagem oficial do Node.js no Alpine como imagem base
FROM node:14-alpine

# Define o diretório de trabalho no contêiner
WORKDIR /usr/src/app

# Copia package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências do aplicativo
RUN npm install

# Copia o código fonte do aplicativo
COPY main.js .

# Expõe a porta em que o aplicativo é executado
EXPOSE 3000

# Define o comando para executar o aplicativo
CMD ["npm", "start"]
