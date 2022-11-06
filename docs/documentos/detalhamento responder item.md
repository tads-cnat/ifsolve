## Responder Item
*Nome do caso de uso:* Responder Item. <br>
*Ator principal:* Aluno. <br>
*Atores secundários:*	<br>	 
*Resumo:* Descreve as etapas percorridas por um aluno durante a atividade de responder um item. <br>
*Pré-condição:* Estar logado no sistema como aluno. <br>
*Pós-Condição:* <br> <br>

> ### Fluxo Principal
| Ações do ator                            | Ações do sistema      |
| :-----------------:                      | :-----------------:   | 
| 1 - Selecionar uma item.   |             |  
|                                          | 2 - Mostrar o texto base do item (se existir).| |
|                                          | 3 - Mostrar o enunciado do item.|  
|                                          | 4 - Mostrar a imagem do item (se existir). Se o item for objetivo, segue **Fluxo Alternativo I**. Senão, segue **Fluxo Alternativo II**).|  

<br>

> ### Fluxo Alternativo I - Item Objetivo
| Ações do ator                            | Ações do sistema      |
| :-----------------:                      | :-----------------:   | 
|                                          | 4.1 - Mostrar as alternativas disponíveis.| |
| 4.2 - Selecionar a alternativa desejada. |                       |  
| 4.3 - Submeter uma resposta.  

<br>

> ### Fluxo Alternativo II - Item Discursivo
| Ações do ator                            | Ações do sistema      |
| :-----------------:                      | :-----------------:   | 
|                                          | 4.1 - Exibir campo de preenchimento da resposta.   | |
|                                          | 4.2 - Exibir opção de anexar imagem como resposta. | |
| 4.3 - Inserir texto ou uma imagem como resposta. |               |  
|                                          | 4.3 - Verificar se o campo de texto está vazio e se nenhuma imagem foi anexada. Se for o caso de ambos estarem inválidos, solicita ao usuário que informe a resposta de algum dos dois modos.| |
| 4.4 - Submeter resposta.                 |                       |
