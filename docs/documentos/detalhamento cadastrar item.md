## Cadastrar Item 
*Nome do caso de uso:* Cadastrar Item. <br>
*Ator principal:* Elaborador. <br>
*Atores secundários:*	<br>	 
*Resumo:* Descreve as etapas percorridas por um elaborador durante o cadastro de um item. <br>
*Pré-condição:* Estar logado no sistema como elaborador. <br>
*Pós-Condição:* <br> <br>

> ### Fluxo Principal
| Ações do ator                            | Ações do sistema      |
| :-----------------:                      | :-----------------:   | 
| 1 - Solicitar criação do item.        |                       |  
| 2 - Informar o título do item. |             |  
|                                          | 3 - Verificar se o campo foi preenchido, caso não, solicita ao usuário que preencha.         |  
| 4 - Informar o assunto específico no qual o item pertence   |  
|                                          | 5- Verificar se o campo foi preenchido, caso não, solicita ao usuário que preencha.          |
| 6 - Informar o texto base, o qual contém uma contextualização antes do enunciado do item, de forma opcional ao elaborador.            |      
| 7 - Inserir  o enunciado do item, seu comando.|                    | 
|                                          | 8 - Verificar se o campo de enunciado está vazio. Se for o caso, pede para o usuário preenchê-lo. |
| 9 - Informar se o item é discursivo ou de múltipla escolha.                              |                                                                           |  
|                                          | 10 - Retorna um formulário de criação de itens de acordo com a escolha do tipo do item. |
| 11 - Inserir, de forma opcional, imagens para o item | 
| 12 - Definir tags para o item. |                               | 
|                                          | 13 - Verificar se há no mínimo uma tag selecionada para o item. Caso não haja, pede para o usuário inserir. |  
| 14 - Selecionar entre nível de acesso público ou privado para a questão. |                                                                   | 
| 15 - Informar a área do conhecimento a qual o item pertence.          |
| 16- Caso o item seja de múltipla escolha, segue para o Fluxo Alternativo I, se for discursiva segue para o Fluxo Alternativo II.
| 17 - Finalizar o cadastro do item ao clicar no botão salvar.    |                                                                                                   | 
|                                          | 18 - Dar feedback quanto a submissão do item.                                                  |  

<br>

> ### Fluxo Alternativo I - Questão Objetiva
| Ações do ator                            | Ações do sistema      |
| :-----------------:                      | :-----------------:   | 
| 16.1 - Inserir alternativas via texto ou imagem. |               |  
| 16.2 - Informar as justificativas das alternativas incluídas. |  |  
|                                          | 16.3 - Verificar se a questão possui no mínimo duas alternativas. Se não houver, pede para o elaborador inserir mais alternativas. | 
| 16.4 - Selecionar a alternativa correta (gabarito).|             |  

<br>

> ### Fluxo Alternativo II - Questão Discursiva
| Ações do ator                          | Ações do sistema      |
| :-----------------:                    | :-----------------:   | 
| 16.1 - Inserir um texto ou imagem como expectativa de resposta.   |      |    

<hr>

