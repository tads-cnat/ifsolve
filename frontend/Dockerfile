# Base image
FROM node:alpine

# Cria e define o diretório de trabalho
WORKDIR /ifsolve

# Copia o package.json e o package-lock.json (se existir)
COPY package.json ./

# Instala as dependências do projeto

RUN npm install

# Copia os arquivos do projeto
COPY . .

# Build do projeto
# RUN npm run build

# Define a porta do container
EXPOSE 5173

# Comando para iniciar o servidor de desenvolvimento
CMD ["npm","run","dev"]