# Usa uma imagem oficial do Node como a base
FROM node:alpine

# Install yarn 
RUN apk add --no-cache yarn

# Define o diretório de trabalho dentro do contêiner
WORKDIR /usr/app

# Copia o arquivo package.json e o yarn.lock para o diretório de trabalho
COPY package*.json yarn.lock ./

# Instala as dependências do projeto usando o Yarn
RUN yarn install
# Copia todo o conteúdo do diretório atual para o diretório de trabalho exceto os listados no .dockerignore
COPY . .

# Expõe a porta 3000 para que a aplicação possa ser acessada
EXPOSE 3000

# Inicia o servidor
CMD ["yarn","start"]