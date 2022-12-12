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
| 1 - Selecionar um item.   |             |  
|                                          | 2 - Mostrar o texto base e a imagem do item caso existam, além do enunciado. Se o item for de múltipla escolha, segue **Fluxo Alternativo I**. Senão, segue **Fluxo Alternativo II**. | |
| 3 - Submeter a resposta. |                       |  
|                                          | 4 - Realizar feedback quanto ao envio da resposta do aluno para o item. Em caso de item de múltipla escolha, informar o gabarito, além de listar o histórico de respostas dadas pelo aluno para o mesmo item respondido. Por outro lado, em caso de item discursivo, expor a expectativa de resposta e o histórico de respostas fornecidas pelo aluno para o mesmo item respondido. | |

<br>

> ### Fluxo Alternativo I - Item de Múltipla Escolha
| Ações do ator                            | Ações do sistema      |
| :-----------------:                      | :-----------------:   | 
|                                          | 2.1 - Mostrar as alternativas disponíveis. | |
| 2.2 - Selecionar a alternativa desejada. |                       |  
|                                          | 2.3 - Verificar se alguma alternativa foi selecionada. Em seguida, retorna-se para o passo 3 do fluxo principal para o envio da resposta ser realizado. | |

<br>

> ### Fluxo Alternativo II - Item Discursivo
| Ações do ator                            | Ações do sistema      |
| :-----------------:                      | :-----------------:   | 
|                                          | 2.1 - Exibir campo de texto para preenchimento da resposta, além da opção de anexar imagem como resposta.   | |
| 2.2 - Inserir texto ou um imagem como resposta. |               |  
|                                          | 2.3 - Verificar se o campo de texto está vazio e se nenhuma imagem foi anexada. Se for o caso de ambos estarem inválidos, solicita ao usuário que informe a resposta de algum dos dois modos. Em caso de preenchimento válido, retorna-se para o passo 3 do fluxo principal para o envio da resposta ser realizado. | |
