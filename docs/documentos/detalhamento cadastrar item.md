## 1. Cadastrar Questão 
*Nome do caso de uso:* Cadastrar Questão. <br>
*Ator principal:* Elaborador. <br>
*Atores secundários:*	<br>	 
*Resumo:* Descreve as etapas percorridas por um elaborador durante o cadastro de uma questão. <br>
*Pré-condição:* Estar logado no sistema como elaborador. <br>
*Pós-Condição:* <br> <br>

> ### Fluxo Principal
| Ações do ator                            | Ações do sistema      |
| :-----------------:                      | :-----------------:   | 
| 1 - Solicitar criação de questão.        |                       |  
|                                          | 2 - Pedir ao usuário que informe se a questão é subjetiva ou objetiva.                            | 
| 3 - Informar se a questão é subjetiva ou objetiva. |             |  
|                                          | 4 - Ajustar formulário de criação de questões de acordo com a escolha do tipo da questão.         |  
| 5 - Informar a área do conhecimento a qual a questão pertence.   |     
| 6 - Informar o assunto específico tratado na questão.            |      
| 7 - Inserir ou não o texto base da questão. |                    | 
| 8 - Inserir o enunciado da questão.                              |                                                                           |  
|                                          | 9 - Verificar se o campo de enunciado está vazio. Se for o caso, pede para o usuário preenchê-lo. |
| 10 - Inserir ou não imagens para a questão (se a questão for objetiva, segue *Fluxo Alternativo I. Senão, segue **Fluxo Alternativo II*).| 
| 11 - Definir tags para a questão. |                               | 
|                                          | 12 - Verificar se há no mínimo uma tag selecionada para a questão. Caso não haja, pede para o usuário inserir. |  
| 13 - Selecionar entre nível de acesso público ou privado para a questão. |                                                                   | 
| 14 - Finalizar o cadastro da questão.    |                                                                                                   | 
|                                          | 15 - Dar feedback quanto a submissão da questão.                                                  |  

<br>

> ### Fluxo Alternativo I - Questão Objetiva
| Ações do ator                            | Ações do sistema      |
| :-----------------:                      | :-----------------:   | 
| 10.1 - Inserir alternativas via texto ou imagem. |               |  
| 10.2 - Informar as justificativas das alternativas incluídas. |  |  
|                                          | 10.3 - Verificar se a questão possui no mínimo duas alternativas. Se não houver, pede para o elaborador inserir mais alternativas. | 
| 10.4 - Selecionar a alternativa correta (gabarito).|             |  

<br>

> ### Fluxo Alternativo II - Questão Discursiva
| Ações do ator                          | Ações do sistema      |
| :-----------------:                    | :-----------------:   | 
| 10.1 - Inserir ou não um texto como expectativa de resposta.   |      |  
| 10.2 - Inserir ou não uma imagem como expectativa de resposta. |      |  

<hr>
