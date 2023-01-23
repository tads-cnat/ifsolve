## Responder Avaliação 
*Nome do caso de uso:* Responder avaliação. <br>
*Ator principal:* Aluno. <br>
*Atores secundários:*	<br>	 
*Resumo:* Descreve as etapas percorridas por um aluno durante a atividade de responder uma avaliação. <br>
*Pré-condição:* Estar logado no sistema como aluno. <br>
*Pós-Condição:* <br> <br>

> ### Fluxo Principal
| Ações do ator                            | Ações do sistema      |
| :-----------------:                      | :-----------------:   |  
| 1 - Selecionar avaliação. |             |  
|                                          | 2 - Mostrar título, descrição da avaliação e o texto base, alternativas ou campos de resposta e a imagem(caso exista) dos itens. Caso seja um item de múltipla escolha segue para o Fluxo Alternativo I, se for discurva. Senão, segue para o Fluxo Alternativo II.         |  
| 3 - Submeter avaliação.    |  
|                                          | 4- Verificar se os itens foram todos respondidos, caso não, solicita ao usuário que preencha. Apresentar feedback de avaliação enviada com sucesso e, em seguida, direcionar para uma tela dos acertos e erros.         |

<br>

> ### Fluxo Alternativo I - Item Múltipla Escolha
| Ações do ator                            | Ações do sistema      |
| :-----------------:                      | :-----------------:   | 
| 2.1 - Visualizar título e descrição da avaliação, bem como o texto base e imagem(caso exista) do item. Feito isso, seleciona a alternativa desejada. |               |   
|                                          | 2.2 - Receber e armazenar resposta do item e retorna ao passo 3 do Fluxo Principal. | 

<br>

> ### Fluxo Alternativo II - Item Discursivo
| Ações do ator                          | Ações do sistema      |
| :-----------------:                    | :-----------------:   | 
| 2.1 - Visualizar título e descrição da avaliação, bem como o texto base e a imagem(caso exista) do item. Feito isso, digita sua resposta no campo do item.   |      |  
|                                        | 2.2 - Receber e armazenar resposta do item e retorna ao passo 3 do Fluxo Principal.|

<hr>