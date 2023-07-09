FROM python:3.10

WORKDIR /code

RUN pip install --upgrade pip 

COPY requirements.txt /code/

RUN pip install -r requirements.txt

# Copia o resto do código
COPY ./config /code/

COPY ./entrypoint.sh .
ENTRYPOINT ["sh","/code/entrypoint.sh"]