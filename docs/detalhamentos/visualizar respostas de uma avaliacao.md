## Visualizar Respostas de uma Avaliação
*Nome do caso de uso:* Visualizar Respostas de uma Avaliação. <br>
*Ator principal:* Aluno e Elaborador. <br>
*Atores secundários:* <br>	 
*Resumo:* Descreve as etapas percorridas por um aluno ou por um elaborador ao visualizar as respostas de uma avaliação que foram fornecidas por um aluno. <br>
*Pré-condição:* Estar logado no sistema como elaborador ou aluno. <br>
*Pós-Condição:* <br> <br>

> ### Fluxo Principal
| Ações do ator                            | Ações do sistema      |
| :-----------------:                      | :-----------------:   |  
| Selecionar uma avaliação.                                       |
|                                          | 1 - Exibir o conteúdo de respostas de uma avaliação de forma distinta a depender do tipo do usuário logado (aluno ou elaborador). Se o usuário que deseja visualizar as respostas de uma avaliação é um aluno, segue **Fluxo Alternativo I.I (Visualizar respostas após enviar avaliação)** ou **Fluxo Alternativo I.II (Apenas visualizar respostas)**. Por outro lado, caso seja um elaborador, segue **Fluxo Alternativo II**. | 

<br>

> ### Fluxo Alternativo I.I - Visualizar respostas após enviar avaliação (Aluno)
| Ações do ator                            | Ações do sistema      |
| :-----------------:                      | :-----------------:   | 
| 1.1 - Enviar a avaliação. |               |   
|                                          | 1.2 - Para cada item contido na avaliação, exibir a resposta que o próprio aluno forneceu e o status de acerto ou de erro (em caso de item de múltipla escolha) e a nota obtida com aquele item, além de uma totalização das pontuações obtidas com todos os itens respondidos. O status de um item discursivo será uma mensagem de aguardo de correção, esta que será realizada posteriormente pelo elaborador que criou a avaliação. | 

<br>

> ### Fluxo Alternativo I.II - Apenas visualizar respostas (Aluno)
| Ações do ator                            | Ações do sistema      |
| :-----------------:                      | :-----------------:   | 
| 1.1 - Selecionar a opção de visualizar as respostas fornecidas por si próprio a uma avaliação em um momento passado. |               |   
|                                          | 1.2 - Para cada item contido na avaliação, exibir as respostas que o próprio aluno forneceu e o status de acerto ou de erro (em caso de item de múltipla escolha) e a nota obtida com aquele item, além de uma totalização das pontuações obtidas com todos os itens respondidos. O status de um item discursivo será uma mensagem de aguardo de correção (caso ele ainda não tenha sido avaliado pelo elaborador que criou a avaliação), ou a nota obtida com aquele item (após correção), assim como a resposta que era esperada para ele. | 

<br>

> ### Fluxo Alternativo II - Visualização como Elaborador
| Ações do ator                          | Ações do sistema      |
| :-----------------:                    | :-----------------:   | 
| 1.1 - Selecionar uma avaliação de sua autoria para visualizar as respostas fornecidas a ela. |      |  
|                                        | 1.2 - Listar os alunos que responderam a avaliação. Para cada aluno, exibir a resposta que o mesmo forneceu para cada item, além da nota total obtida até o momento (antes da correção) devido aos itens de múltipla escolha já calculados. No caso de item discursivo, para cada um haverá uma opção para o elaborador atribuir qual nota cada aluno irá receber. |