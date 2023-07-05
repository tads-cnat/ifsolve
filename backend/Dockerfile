FROM python:3.10

# Cria um usuário não root para executar o container
RUN groupadd -r myuser && useradd -r -g myuser myuser

WORKDIR /code
COPY requirements.txt /code/
RUN pip install -r requirements.txt

# Muda o usuário para o não root
USER myuser

# Copia o resto do código
COPY . /code/

# set environment variables
# ENV PYTHONDONTWRITEBYTECODE 1
# ENV PYTHONUNBUFFERED 1

COPY ./entrypoint.sh .
ENTRYPOINT ["sh","/code/entrypoint.sh"]