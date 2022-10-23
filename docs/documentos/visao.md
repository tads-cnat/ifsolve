# Documento de Visão

## Histórico de Revisões


| Data                |  Versão             |          Descrição  |  Autores            |
| :-----------------: | :-----------------: | :-----------------: | :-----------------: |
|  23/05/2022         |  1.0                |  Versão inicial     |  Diogo              |
|  24/05/2022         |  1.1                |  Descrição do problema |  Alcides e Israel|
|  29/05/2022         |  1.2                |  Objetivo do projeto e requisitos funcionais (1 ao 17) |  Alcides |
|  29/05/2022         |  1.3                |  Descrição dos usuários| Diogo            | 
|  29/05/2022         |  1.4                |  Alternativas concorrentes | Raphael      |
|  29/05/2022         |  1.5                |  Descrição do ambiente dos usuários | Lívia |
|  29/05/2022         |  1.6                |  Principais necessidades dos usuários | Erick |
|  04/06/2022         |  1.7                |  Requisitos não-funcionais (1 ao 6) | Alcides |
|  05/06/2022         |  1.8                |  Requisitos não-funcionais (7 e 8)  | Raphael |


## 1. Objetivo do projeto

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
O projeto IFSolve tem como objetivo ser uma plataforma web para contribuir no âmbito acadêmico, permitindo aos professores a elaboração e aplicação de avaliações, e estudantes no processo de aprendizagem com a prática de simulados e exercícios de diferentes áreas do conhecimento.
<br>

## 2. Descrição do problema

|     |      |
| --- | --- |
| **Problema**            | Ausência de um sistema próprio do IFRN, para auxiliar os professores na elaboração e aplicação de avaliações, e estudantes no processo de aprendizagem com a resolução de questões de diferentes áreas de ensino. |
| **Afeta**               | - Os professores na falta de uma plataforma de fácil uso para aplicação de avaliações em sala de aula. <br> - Os estudantes na falta de uma plataforma para auxiliar no estudo, na fixação e revisão de conteúdos escolares. |  
| **Impacta**             | - Um maior consumo de tempo por parte dos professores, fazendo com que seja necessário um maior esforço na elaboração e correção de provas. <br> - Um aprendizado mais demorado por parte dos alunos, visto que é necessário estudar um determinado conteúdo em diferentes plataformas, a fim de aprender e fixar as informações do conteúdo em questão. |
| **Solução**             | Desenvolver um sistema web que permita conectar elaboradores para a construção de um banco de questões e aplicação de avaliações a partir de uma seleção de questões cadastradas. Além disso, possibilita aos estudantes a revisão de conteúdos com a resolução de questões específicas e de simulados previamente elaborados. | 

## 3. Descrição dos usuários 

| Nome                |  Descrição          |   Responsabilidade  |
| -----------------   | -----------------   | -----------------   |
| **Elaborador** | Usuário interessado em utilizar o banco de questões do sistema, elaborando e cadastrando questões, simulados e provas. | - Gerenciar as próprias questões. <br> - Gerenciar as próprias provas. <br> - Gerenciar os próprios simulados. |
|  **Aluno**         | Usuário interessado em utilizar o banco de questões para realizar provas e simulados, podendo também cadastrar questões. Além disso, é permitido gerar os próprios simulados (com questões selecionadas aleatoriamente pelo sistema). | - Responder provas, simulados e questões. <br> - Gerenciar os próprios simulados. |
|  **Administrador**         |  Profissional que atua nas configurações do sistema e no gerenciamento  de usuários. |  - Gerenciar usuários. <br> - Validar e invalidar inscrições de elaboradores na plataforma. |

## 4. Descrição do ambiente dos usuários

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Para cada tipo de usuário será disponibilizado um ambiente diferente na plataforma, após o login, que irá variar dependendo de seu nível de acesso.
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
O login como elaborador possibilita o acesso ao banco de questões do sistema para criar provas e simulados, além do acesso à área de revisão de submissões de questões. <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Por outro lado, o login como aluno permite o acesso tanto a questões e simulados públicos no sistema quanto a provas em que um elaborador liberou o acesso. 
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Na aplicação de provas, o elaborador deve determinar o tempo disponível para realizá-las. Já os simulados, são públicos e podem ser realizados a qualquer momento, pois não possuem um tempo determinado para sua execução.
<br>

## 5. Principais necessidades dos usuários

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Os públicos-alvos dessa plataforma, que são professores e alunos, necessitam de um sistema que possibilite a criação de provas, simulados e questões de cunho educativo, tanto para facilitar quem aplica um exame como também para aqueles que desejam exercitar os conhecimentos adquiridos.
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Essas funcionalidades citadas não são tão comuns ou inexistem em algumas outras plataformas, como por exemplo a de criação de questões.
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Com isso, para resolver o problema em pauta, é necessário que o sistema a ser desenvolvido possibilite aos usuários o cadastramento de questões, a criação de provas e simulados a partir do banco de questões existente, além da resolução desses três itens citados (questões, provas e simulados).
<br>

## 6. Alternativas concorrentes

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Existem algumas plataformas de banco de questões para elaboração de avaliações, como o Elabora, EducaBras, ProfCardy e Masteraula. Todas elas requerem uma assinatura ou créditos para sua utilização, ou até possuem uma versão gratuita, mas limitada. Nenhuma das plataformas possui a funcionalidade de criar questões, além do ProfCardy não oferecer suporte à elaboração e realização de provas online e o  Elabora, EducaBras e o Masteraula não oferecerem a disponibilidade de resolução de simulados pelo aluno.
<br>

## 7. Visão geral do produto

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
O sistema web IFSolve tem como objetivo atuar como banco de questões voltado para uso de professores e alunos, visando possibilitar a criação e realização de questões, provas e simulados. 
<br>

## 8. Requisitos funcionais

| Código              |  Nome               |          Descrição  |  Prioridade         |
| :-----------------: | :-----------------: | :-----------------: | :-----------------: |
|  F01                |  Realização do auto cadastro (aluno) |  Auto cadastro no sistema via identificador e senha ou e-mail Google, aplicando-se à alunos. |  5⭐ |
|  F02                |  Realização do auto cadastro (elaborador) | Auto cadastro no sistema via identificador e senha ou e-mail Google, aplicando-se a elaboradores que passarão por uma análise de comprovação de sua qualificação. | 5⭐|
|  F03                |  Inicialização da sessão | Autentica o usuário através da validação do identificador e senha ou login com o Google, permitindo acesso ao sistema. | 5⭐ |
|  F04                |  Finalização da sessão | Desconecta o usuário do sistema, impedindo qualquer outra ação dentro da plataforma. | 5⭐ |
|  F05                |  Cadastramento dos itens (Elaborador) | Um elaborador submete um item para o sistema. | 5⭐ |
|  F06                |  Exclusão do item (administrador) | Um administrador pode excluir um item do sistema, decidindo entre manter ou remover esse item das avaliações existentes que a utilizam. | 1⭐ |
|  F07                |  Atualização do item (elaborador autor) | Os dados de um item podem ser alterados por seu elaborador autor. | 1⭐|
|  F08                |  Listagem dos itens (elaborador autor) | Lista todas os itens submetidos por um determinado elaborador. | 1⭐|
|  F09                |  Cadastramento da avaliação (elaborador) | Um elaborador seleciona um conjunto de itens da plataforma e cadastra uma nova avaliação no sistema, configurando seu nível de acesso inicial. | 5⭐|
|  F10                |  Exclusão da avaliação (elaborador autor) | Um elaborador apaga de forma definitiva uma avaliação do sistema. | 1⭐ |
|  F11                |  Atualização da avaliação (elaborador autor) | Os dados de uma avaliação podem ser alterados por seu elaborador autor. | 1⭐ |
|  F12                |  Listagem das avaliações (elaborador autor) | Lista todas as avaliações que um determinado elaborador já cadastrou. | 1⭐ |
|  F13                |  Vinculação usuário <-> avaliação | Um elaborador pode vincular quais alunos podem realizar uma determinada avaliação. | 4⭐ |
|  F14                |  Realização da avaliação | Um aluno inicia uma avaliação disponível (dentro do prazo) e que está vinculada a ele. <br> Avaliações do tipo simulado não possuem prazo e não requerem que alunos estejam vinculados a ela, visto que são públicas. | 3⭐ |
|  F15                |  Listagem dos resultados de uma avaliação (elaborador autor) | Lista todas as respostas de cada aluno em uma avaliação. | 1⭐ |
|  F16                |  Cadastramento do resultado em uma avaliação (elaborador autor) | Um elaborador pode gerar um retorno (nota, mensagem etc.) sobre a avaliação de um usuário. | 1⭐ |
|  F17                |  Cadastramento do resultado em um item (elaborador autor) | Um elaborador pode gerar um retorno para cada item de uma avaliação pertencente a um aluno. | 1⭐ |
|  F18                |  Listagem do resultado (aluno) | Um aluno pode verificar o(s) resultados(s) dado(s) por um elaborador em uma avaliação ou item específicos que esse discente realizou. | 1⭐ |

## 9. Requisitos não-funcionais

| Código              |  Nome               |          Descrição  |  Categoria          |  Classificação      |
| :-----------------: | :-----------------: | :-----------------: | :-----------------: | :-----------------: |
|  NF01               | Controle de acesso ao sistema | Apenas usuários autenticados podem ter acesso ao sistema. | Segurança | Obrigatório |
|  NF02               | Design responsivo | O sistema web deve se adaptar a diferentes tamanhos de telas de dispositivos. | Usabilidade | Obrigatório |
|  NF03               | Facilidade de uso | O sistema deve possuir uma interface intuitiva e amigável, a fim de proporcionar ao usuário uma prazerosa interação com a plataforma. | Usabilidade | Obrigatório |
|  NF04               | Privacidade de dados pessoais | Usuários não podem visualizar informações privadas de outros usuários, como por exemplo dados de login. | Privacidade | Obrigatório |
|  NF05               | Criptografia de dados | Dados de login dos usuários devem ser gravados de forma criptografada no banco de dados. | Segurança | Obrigatório |
|  NF06               | Manutenção regular | O sistema irá receber atualizações e correções de erros regularmente. | Manutenibilidade | Obrigatório |
| NF07                | Disponibilidade do sistema | O sistema deve funcionar durante 24 horas por dia, 7 dias por semana. | Confiabilidade | Obrigatório |




