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
| 1 - Informar o título do item. |             |  
|                                          | 2 - Verificar se o campo foi preenchido, caso não, solicita ao usuário que preencha.         |  
| 3 - Informar o assunto específico no qual o item pertence   |  
|                                          | 4- Verificar se o campo foi preenchido, caso não, solicita ao usuário que preencha.          |
| 5 - Informar o texto base, o qual contém uma contextualização antes do enunciado do item, de forma opcional ao elaborador. Em seguida inserir o enunciado, comando do item, de forma obrigatória.           |      
|                                          | 6 - Verificar se o campo de enunciado está vazio. Se for o caso, pede para o usuário preenchê-lo. |
| 7 - Informar se o item é discursivo ou de múltipla escolha.                              |                                                                           |  
|                                          | 8 - Retorna um formulário de criação de itens de acordo com a escolha do tipo do item. |
| 9 - Inserir imagens para o item e logo após, definir tags, ambas as ações de forma opcional ao elaborador.
Como também selecionar o item entre nível de acesso público ou privado, informar sua área de conhecimento e, após isso, caso o item seja de múltipla escolha, segue para o Fluxo Alternativo I, se for discursiva segue para o Fluxo Alternativo II. |                               |   
| 10 - Finalizar o cadastro do item ao clicar no botão salvar.    |                                                                                                   | 
|                                          | 11 - Dar feedback quanto a submissão do item.                                                  |  

<br>

> ### Fluxo Alternativo I - Item Múltipla Escolha
| Ações do ator                            | Ações do sistema      |
| :-----------------:                      | :-----------------:   | 
| 9.1 - Inserir alternativas via texto ou imagem e informar as justificativas das alternativas concluídas. |               |   
|                                          | 9.2 - Verificar se o item possui no mínimo duas alternativas. Se não houver, pede para o elaborador inserir mais alternativas. | 
| 9.3 - Selecionar a alternativa correta (gabarito).|             |  
|                                          | 9.4 -  Verificar se o gabarito foi informado. Caso não foi, pede ao usuário para selecionar a alternativa que julga correta. Em seguida, retorna-se para o fluxo principal para finalizar o cadastro do item. |

<br>

> ### Fluxo Alternativo II - Item Discursivo
| Ações do ator                          | Ações do sistema      |
| :-----------------:                    | :-----------------:   | 
| 9.1 - Inserir um texto ou imagem como expectativa de resposta.   |      |  
|                                        | 9.2 - Verificar se foi determinada uma expectativa de resposta. Caso não, pede ao usuário que determine uma. Em seguida, retorna-se para o fluxo principal para finalizar o cadastro do item. |

<hr>

