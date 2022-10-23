# Projeto IFSolve

##### Documento do Mapeamento entre os Objetos (Classes do Domínio) e os elementos do Modelo Relacional.



## Diagrama de classes de domínio

![Modelo_Classes_Dominio_rotated_page-0001](https://user-images.githubusercontent.com/94148869/185774491-19f53fd4-5d90-4d20-8daf-6406cf6a95b2.jpg)

## Modelo Relacional

![Modelo_Relacional](https://user-images.githubusercontent.com/94148869/185812414-abe63020-b78a-4a50-aa34-30c7d50ebe6d.png)

## Classes versus tabelas


| Classe              |  Tabela             |        Significado  |
|  -----------------  | -----------------   | -----------------   |
|  User               |  User               |  Classe User do Django utilizada para herança na tabela Usuario |
|  Usuario            |  Usuario            |  Todos os usuários cadastrados no sistema |
|  Administrador      |  Administrador      |  Usuário com maior hierarquia sobre o sistema  |
|  Elaborador         |  Elaborador         |  Usuário que pode cadastrar iten e avaliação |
|  Aluno              |  Aluno              |  Usuário que pode responder iten e avaliação |
|  Item               |  Item               |  Questão cadastrada no sistema |
|  Area               |  Area               |  Área de conhecimento de um item  |
|  Tag                |  Tag                |  Chave relacionada ao conteúdo em um item  |
|  Alternativa        |  Alternativa        |  Opção de resposta de um item do tipo múltipa escolha |
|  Avaliacao          |  Avaliacao          |  Prova a ser respondida pelo aluno |
|  ItemAvaliacao      |  ItemAvaliacao      |  Item contido em uma avaliacao |
|  Resposta           |  Resposta           |  Resposta fornecida pelo aluno em um item ou avaliação |

## Relacionamentos

| Tabela Origem	      |  Through            |  Tabela Destino	    |      Significado  |
|  -----------------  | -----------------   | -----------------   | ----------------- |
|  User               |  -                  |  Usuario | Todo usuário que tem cadastro no sistema |
|  Usuario            |  -                  |  Administrador | Usuário que tem um perfil de administrador |
|  Usuario            |  -                  |  Elaborador | Usuário que tem um perfil de elaborador |
|  Usuario            |  -                  |  Aluno | Usuário que tem um perfil de Aluno |
|  Elaborador         |  elaborador_item    |  Item  | Usuário com possiblidade de gerar um item e acrescentar outros usuários, com o mesmo tipo de perfil, para contribuir no desenvolvimento de um item (relacionamento muitos-para-muitos) |
|  Elaborador         |  elaborador_avaliacao | Avaliacao | Usuário com possiblidade de gerar uma avaliação e acrescentar outros usuários, com o mesmo tipo de perfil, para contribuir no desenvolvimento de uma avaliação (relacionamento muitos-para-muitos) |
|  Resposta           |  -                  | Aluno | Resposta dada a um item |
|  Resposta           |  -                  | ItemAvaliacao | Resposta dada a um item contido em uma avaliação |
|  ItemAvaliacao      |  -                  | Item | Instância de um item que está contido em uma avaliação |
|  ItemAvaliacao      |  -                  | Avaliacao | Avaliação que contém itens |
|  Resposta           |  -                  | Item | Item com possibilidade de resposta |
|  Item               |  item_tag           | Tag  | Item que contém tag (relacionamento muitos-para-muitos) |
|  Item               |  -                  | Area | Item com possibilidade de estar relacionado com uma área de conhecimento|
|  Area               |  -                  | Area | Área com possibilidade de ter uma subárea |
|  Alternativa        |  -                  | Item | Alternativas que podem estar em um item |
