## Visualizar item
*Nome do caso de uso:* Visualizar Item. <br>
*Ator principal:* Aluno. <br>
*Atores secundários:* Elaborador<br>	 
*Resumo:* Descreve as etapas percorridas por um aluno ou elaborador para visualizar um item. <br>
*Pré-condição:* Estar logado no sistema como aluno ou como elaborador. <br>
*Pós-Condição:* <br> <br>

> ### Fluxo Principal
| Ações do ator                            | Ações do sistema      |
| :-----------------:                      | :-----------------:   | 
| 1 - Selecionar um item.   |             |  
|                                          | 2 - Mostrar o título e o campo de texto base do item. Se o item for de múltipla escolha, segue **Fluxo Alternativo I**. Senão, segue **Fluxo Alternativo II**. | |

<br>

> ### Fluxo Alternativo I - Item de Múltipla Escolha
| Ações do ator                            | Ações do sistema      |
| :-----------------:                      | :-----------------:   | 
|                                          | 2.1 - Mostrar as alternativas disponíveis. Caso o usuário seja um elaborador, mostra também a alternativa correta. | |

<br>

> ### Fluxo Alternativo II - Item Discursivo
| Ações do ator                            | Ações do sistema      |
| :-----------------:                      | :-----------------:   | 
|                                          | 2.1 - Exibir campo de texto para preenchimento da resposta, além da opção de anexar imagem como resposta. Caso o usuário seja um elaborador, mostra também a resposta esperada.   | |
