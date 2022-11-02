![banner](./banner.jpeg) 
<h1 align="center" style="font-style: italic; font-weight:bold;"><b style="color: #26D189;">IF</b>SOLVE</h4>
<h4 align="center"> 👨‍💻 Em desenvolvimento 👩‍💻 </h4>
<p align="center">
 <a href="#descrição-do-projeto">Descrição do projeto</a> •
 <a href="#tecnologias">Tecnologias</a> • 
 <a href="#setup">Setup</a> • 
 <a href="#documentação">Documentação</a> •
 <a href="#autores">Autores</a> •
 <a href="#licença">Licença</a> 
</p>

# Descrição do projeto
O sistema web IFSolve tem como objetivo atuar como um banco de questões que visa contribuir no âmbito acadêmico, permitindo a professores a elaboração e aplicação de avaliações, e estudantes no processo de aprendizagem com a prática de simulados e exercícios de diferentes áreas do conhecimento.

Este é um projeto desenvolvido durante o curso de TADS (Tecnologia em Análise e Desenvolvimento de Sistemas) do IFRN-CNAT.

# Tecnologias
## Front-end
As seguintes ferramentas foram usadas na construção do projeto front-end:
- [React](https://pt-br.reactjs.org/)
- [Node.js](https://nodejs.org/en/)
> Veja o arquivo [package.json](./frontend/package.json)

## Back-end
As seguintes ferramentas foram usadas na construção do projeto back-end:
- [Django Rest Framework](https://www.django-rest-framework.org/)
- [Swagger](https://swagger.io/)
> Veja o arquivo [requirements.txt](./backend/requirements.txt)

# Setup
## Pré-requisitos

Para executar o projeto você vai precisar ter instalado em sua máquina as seguintes ferramentas:
- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/) 
- [Python](https://www.python.org/) 
  - Versão usada no desenvolvimento: 3.10
- [Pip](https://pypi.org/project/pip/)
- Editor de código sugerido: [VSCode](https://code.visualstudio.com/)

### Clonando o repositório via HTTPS
```bash
$ git clone https://github.com/tads-cnat/ifsolve.git
```

### Clonando o repositório via SSH
```bash
$ git clone git@github.com:tads-cnat/ifsolve.git
```

### Executando o projeto back-end
###### Acesse o diretório do back-end
```bash
cd ./ifsolve/backend
```

###### Crie um ambiente virtual
```bash
python -m venv venv
```
- Caso os comandos utilizando `python` não funcione, tente utilizar `python3`

###### Ative o ambiente virtual criado
```sh
source venv/bin/activate
```

###### Instale os pacotes de desenvolvimento
```bash
pip install -r requirements.txt
```

###### Acesse o diretório config
```bash
cd ./config
```

###### Realize as migrações
```bash
python manage.py makemigrations
```

```bash
python manage.py migrate
```

##### Execute em modo desenvolvimento
```sh
python manage.py runserver
```
Para acessar, coloque no navegador a url `http://127.0.0.1:8000/`

### Executando o projeto front-end

###### Acesse o diretório do front-end
```bash
cd ./ifsolve/frontend
```

###### Baixe as dependências
```bash
yarn install ou npm install
```

###### Inicie a aplicação
```bash
yarn start ou npm start
```

# Documentação
Verifique o diretório [`docs`](./docs/) para a documentação do sistema

# Autores
<table style>
  <tr>
    <td align="center"><a href="https://github.com/alcides07">
        <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/84922660?v=4" width="100px;" alt=""/>
        <br />
        <a href="https://github.com/alcides07"><b>Alcides Dantas</b></a>
    </td>
    <td align="center"><a href="https://github.com/diogoodiego">
        <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/53539868?v=4" width="100px;" alt=""/>
        <br />
        <a href="https://github.com/diogoodiego"><b>Diogo Santos</b></a>
    </td>
    <td align="center"><a href="https://github.com/erick003">
        <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/94196045?v=4" width="100px;" alt=""/>
        <br />
        <a href="https://github.com/erick003"><b>Erick Carlos</b></a>
    </td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/IsraelKleber">
        <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/94148869?v=4" width="100px;" alt=""/>
        <br />
        <a href="https://github.com/IsraelKleber"><b>Israel Kleber</b></a>
    </td>
    <td align="center"><a href="https://github.com/Livia-Rachell">
        <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/83011310?v=4" width="100px;" alt=""/>
        <br />
        <a href="https://github.com/Livia-Rachell"><b>Lívia Rachel</b></a>
    </td>
    <td align="center"><a href="https://github.com/matRaph">
        <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/42880393?v=4" width="100px;" alt=""/>
        <br />
        <a href="https://github.com/matRaph"><b>Raphael Matias</b></a>
    </td>
  </tr>
</table>

# Licença 
Este projeto é desenvolvido sob a licença [GPL3](https://www.gnu.org/licenses/gpl-3.0-standalone.html).