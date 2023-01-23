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
| 3 - Informar o texto base, o qual contém uma contextualização e o comando do item.   |  
|                                          | 4- Verificar se o campo foi preenchido, caso não, solicita ao usuário que preencha.          |
| 5 - Informar se o item é discursivo ou de múltipla escolha.          |      
|                                          | 6 - Retorna um formulário de criação de itens de acordo com a escolha do tipo do item. Caso o item seja de múltipla escolha, segue para o Fluxo Alternativo I, se for discursiva segue para o Fluxo Alternativo II. |
| 7 - Informar o assunto específico na qual o item pertence.                              |                                                                           |  
|                                          | 8 - Verificar se o campo foi preenchido, caso não, solicita ao usuário que preencha. |
| 9 - Inserir imagens para o item e logo após, definir tags, ambas as ações de forma opcional ao elaborador. Como também selecionar o item entre nível de acesso público ou privado, informar sua área de conhecimento. Feito isso, finalizar o cadastro do item ao clicar no botão salvar. |                                      
|                                          | 10 - Dar feedback quanto a submissão do item.                                                  |  

<br>

> ### Fluxo Alternativo I - Item Múltipla Escolha
| Ações do ator                            | Ações do sistema      |
| :-----------------:                      | :-----------------:   | 
| 6.1 - Inserir alternativas via texto ou imagem e informar as justificativas das alternativas concluídas. |               |   
|                                          | 6.2 - Verificar se o item possui no mínimo duas alternativas. Se não houver, pede para o elaborador inserir mais alternativas. | 
| 6.3 - Selecionar a alternativa correta (gabarito).|             |  
|                                          | 6.4 -  Verificar se o gabarito foi informado. Caso não foi, pede ao usuário para selecionar a alternativa que julga correta. Em seguida, retorna-se para o passo 7 do fluxo principal para prosseguir com o cadastro do item. |

<br>

> ### Fluxo Alternativo II - Item Discursivo
| Ações do ator                          | Ações do sistema      |
| :-----------------:                    | :-----------------:   | 
| 6.1 - Inserir um texto ou imagem como expectativa de resposta.   |      |  
|                                        | 6.2 - Verificar se foi determinada uma expectativa de resposta. Caso não, pede ao usuário que determine uma. Em seguida, retorna-se para o passo 7 do fluxo principal para prosseguir com o cadastro do item. |

<hr>



