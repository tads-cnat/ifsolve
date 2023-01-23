## Realizar Login
*Nome do caso de uso:* Realizer Login. <br>
*Atores principal:* Aluno e Elaborador. <br>
*Resumo:* Descreve as etapas percorridas por um aluno ou elaborador durante a realização de autenticação no sistema. <br>
*Pré-condição:* Estar deslogado no sistema. <br>
*Pós-Condição:* Estar autenticado no sistema, obendo permissões a depender do seu tipo de usuário <br> <br>

> ### Fluxo Principal
| Ações do ator                            | Ações do sistema      |
| :-----------------:                      | :-----------------:   | 
| 1 - Fornece suas credenciais de usuário em um formulário, sendo elas *Usuário* ou *Email*, e *Senha*. Ou clica no botão *Entrar com Google*, seguindo o  **Fluxo Alternativo I**.   |             |  
|                                          | 2 - Veririca se no banco de dados existe um usuário com as credenciais informadas, se existir e as credenciais estiverem corretas, segue o  **Fluxo Alternativo III**. Senão, segue **Fluxo Alternativo II**. | |


<br>

> ### Fluxo Alternativo I - Login com Google
| Ações do ator                            | Ações do sistema      |
| :-----------------:                      | :-----------------:   | 
| 1 - Fornece suas credenciais de usuário, sendo elas *Email* e *Senha*.   |             |  
|                                          | 2 - Verifica se as credenciais do usuário estão corretas, se sim, segue o  **Fluxo Alternativo III**. Senão, segue **Fluxo Alternativo II**. | |

> ### Fluxo Alternativo II - Credenciais inválidas
| Ações do ator                            | Ações do sistema      |
| :-----------------:                      | :-----------------:   | 
|                                          | 2.1 - Informa que as credenciais de usuário são inválidas, permitindo que o usuário as submeta novamente. | |

<br>

> ### Fluxo Alternativo III - Credenciais corretas
| Ações do ator                            | Ações do sistema      |
| :-----------------:                      | :-----------------:   | 
|                                          | 2.1 - Redireciona o usuário pra tela principal do sistema.   | |