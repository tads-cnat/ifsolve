# Base image
FROM node:alpine

# Cria e define o diretório de trabalho
WORKDIR /ifsolve_front

# Copia todos os arquivos do front e cola no diretório de trabalho
COPY . .

# Define a porta do container
EXPOSE 3000

# Instala as dependências do projeto
RUN yarn install --ignore-scripts

# Comando para converter todos arquivos em linguagem de máquina
RUN npm run build

# Comando para iniciar o servidor de desenvolvimento
CMD ["yarn", "start"]