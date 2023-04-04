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
|  23/10/2022         |  1.8                |  Revisão de nomenclaturas dos requisitos funcionais/não-funcionais  | Erick |
|  23/10/2022         |  1.9                |  Listagem de casos de uso em ordem de prioridade | Israel |
|  23/10/2022         |  2.0                |  Detalhamento de regras de negócio | Israel |
|  23/10/2022         |  2.1                |  Escopo do projeto | Erick |
|  23/10/2022         |  2.2                |  Revisão do documento de visão | Israel e Alcides |


## 1. Objetivo do projeto

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
O projeto IFSolve tem como objetivo ser uma plataforma web para contribuir no âmbito acadêmico, permitindo aos professores a elaboração e aplicação de avaliações, e estudantes no processo de aprendizagem com a prática de simulados e exercícios de diferentes áreas do conhecimento.
<br>

## 2. Descrição do problema

|     |      |
| --- | --- |
| **Problema**            | Ausência de um sistema próprio do IFRN, para auxiliar os professores na elaboração e aplicação de avaliações, e estudantes no processo de aprendizagem com a resolução de itens de diferentes áreas de ensino. |
| **Afeta**               | - Os professores na falta de uma plataforma de fácil uso para aplicação de avaliações em sala de aula. <br> - Os estudantes na falta de uma plataforma para auxiliar no estudo, na fixação e revisão de conteúdos escolares. |  
| **Impacta**             | - Um maior consumo de tempo por parte dos professores, fazendo com que seja necessário um maior esforço na elaboração e correção de avaliações. <br> - Um aprendizado mais demorado por parte dos alunos, visto que é necessário estudar um determinado conteúdo em diferentes plataformas, a fim de aprender e fixar as informações do conteúdo em questão. |
| **Solução**             | Desenvolver um sistema web que permita conectar elaboradores para a construção de um banco de itens e aplicação de avaliações a partir de uma seleção de itens criados. Além disso, possibilita aos estudantes a revisão de conteúdos com a resolução de itens específicos e de simulados previamente elaborados. | 

## 3. Descrição dos usuários 

| Nome                |  Descrição          |   Responsabilidade  |
| -----------------   | -----------------   | -----------------   |
| **Elaborador** | Usuário interessado em utilizar o banco de itens do sistema, elaborando itens e avaliações. | - Gerenciar os próprios itens. <br> - Gerenciar as próprias avaliações. |
|  **Aluno**         | Usuário interessado em utilizar o banco de itens para realizar avaliações e simulados. Além disso, é permitido gerar os próprios simulados (com itens selecionados aleatoriamente pelo sistema). | - Responder avaliações, simulados e itens. <br> - Gerenciar os próprios simulados. |
|  **Administrador**         |  Profissional que atua nas configurações do sistema e no gerenciamento  de usuários. |  - Gerenciar usuários. <br> - Validar e invalidar inscrições de elaboradores na plataforma. |

## 4. Descrição do ambiente dos usuários

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Para cada tipo de usuário será disponibilizado um ambiente diferente na plataforma, após o login, que irá variar dependendo de seu nível de acesso.
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
O login como elaborador possibilita o acesso ao banco de itens do sistema para criar avaliações, além do acesso à área de revisão de submissões de itens. <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Por outro lado, o login como aluno permite o acesso tanto a itens e avaliações em que um elaborador liberou o acesso. 
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Na aplicação de avaliações, o elaborador deve determinar o tempo disponível para realizá-las.
<br>

## 5. Principais necessidades dos usuários

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Os públicos-alvos dessa plataforma, que são professores e alunos, necessitam de um sistema que possibilite a criação de avaliações, simulados e itens de cunho educativo, tanto para facilitar quem aplica um exame como também para aqueles que desejam exercitar os conhecimentos adquiridos.
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Essas funcionalidades citadas não são tão comuns ou inexistem em algumas outras plataformas, como por exemplo a de criação de itens.
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Com isso, para resolver o problema em pauta, é necessário que o sistema a ser desenvolvido possibilite aos usuários Elaborar itens, avaliações e simulados a partir do banco de itens existente, além da possibilidade de responder os elementos citados. 
<br>

## 6. Alternativas concorrentes

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Existem algumas plataformas de banco de itens para elaboração de avaliações, como o Elabora, EducaBras, ProfCardy e Masteraula. Todas elas requerem uma assinatura ou créditos para sua utilização, ou até possuem uma versão gratuita, mas limitada. Nenhuma das plataformas possui a funcionalidade de criar itens, além do ProfCardy não oferecer suporte à elaboração e realização de avaliações online e o  Elabora, EducaBras e o Masteraula não oferecerem a disponibilidade de resolução de simulados pelo aluno.
<br>

## 7. Visão geral do produto

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
O sistema web IFSolve tem como objetivo atuar como banco de itens voltado para uso de professores e alunos, visando possibilitar a criação e realização de itens, avaliações e simulados. 
<br>

## 8. Escopo

#### O IFSolve é:
Uma plataforma, de cunho educativo, que visa atingir alunos e professores para a realização de itens, avaliações e simulados. 
<br>

#### O IFSolve não é:
• Um sistema de competição em tempo real entre usuários com um ranking; <br>
• Um curso para vestibular; <br>
• Uma plataforma de exclusivo acesso para alunos ou professores do IF.
<br>

#### O IFSolve faz:
• Possibilita responder itens objetivos e discursivos das diversas áreas do conhecimento; <br>
• Permite a criação de itens; <br>
• Disponibiliza o gabarito dos itens; <br>
• Possibilita a criação e correção de avaliações; <br>
• Permite a criação de simulados.
<br>

#### O IFSolve não faz:
• Compensa, financeiramente, o criador de um item; <br>
• Competições em tempo real.
<br>

## 9. Casos de uso por ordem de prioridade

| Código              | Casos de uso        |  Prioridade alta    | Prioridade média    | Prioridade baixa    | Status    |
| :-----------------: | :-----------------: | :-----------------: | :-----------------: | :-----------------: | :-----------------: |
|         CP01        | Elaborar item       |           x         |                     |                     | Feito |
|         CP02        | Visualizar item     |           x         |                     |                     | Feito |
|         CP03        | Responder item      |           x         |                     |                     | Feito |
|         CP04        | Visualizar respostas de um item |    x    |                     |                     | Feito |
|         CP05        | Realizar login      |           x         |                     |                     | Feito |
|         CP06        | Realizar logout     |           x         |                     |                     | Feito |
|         CP07        | Elaborar avaliação    |                   |           x         |                     | Feito |
|         CP08        | Visualizar avaliação  |                   |           x         |                     | Feito |
|         CP09        | Aplicar avaliação     |                   |           x         |                     | Feito |
|         CP10        | Realizar autocadastro |                   |           x         |                     | Feito |
|         CP11        | Responder avaliação   |                   |                     |          x          | Feito |
|         CP12        | Visualizar resposta em avaliação |        |                     |          x          | Feito |
|         CP13        | Avaliar resposta em avaliação    |        |                     |          x          | Feito |

## 10. Requisitos funcionais

| Código              |  Nome               |          Descrição  |
| :-----------------: | :-----------------: | :-----------------: |
|  F01                |  Realização do auto cadastro (aluno) |  Auto cadastro no sistema via e-mail e senha ou via Google, aplicando-se à alunos. |
|  F02                |  Realização do auto cadastro (elaborador) | Auto cadastro no sistema via e-mail e senha ou via Google, aplicando-se a elaboradores que passarão por uma análise de comprovação de sua qualificação. |
|  F03                |  Inicialização da sessão | Autentica o usuário através da validação do e-mail e senha ou do login via Google, permitindo acesso ao sistema. |
|  F04                |  Finalização da sessão | Desconecta o usuário do sistema, impedindo qualquer outra ação dentro da plataforma. |
|  F05                |  Elaboração de item (Elaborador) | Um elaborador submete um item para o sistema. |
|  F06                |  Exclusão de item (administrador) | Um administrador pode excluir um item do sistema que ainda não foi inserido em uma avaliação. |
|  F07                |  Atualização de item (elaborador autor) | Os dados de um item podem ser alterados por seu elaborador autor. |
|  F08                |  Listagem de item (elaborador autor) | Lista todos os itens submetidos por um determinado elaborador. |
|  F09                |  Elaboração de avaliação (elaborador) | Um elaborador seleciona um conjunto de itens da plataforma e  uma nova avaliação no sistema, configurando seu nível de acesso inicial. |
|  F10                |  Exclusão de avaliação (elaborador autor) | Um elaborador apaga de forma definitiva uma avaliação do sistema. |
|  F11                |  Atualização de avaliação (elaborador autor) | Os dados de uma avaliação podem ser alterados por seu elaborador autor, desde que a avaliação não tenha sido aplicada. |
|  F12                |  Listagem de avaliação (elaborador autor) | Lista todas as avaliações que um determinado elaborador já cadastrou. |
|  F13                |  Assossiação de usuário <-> avaliação | Um elaborador pode vincular quais alunos podem realizar uma determinada avaliação. |
|  F14                |  Realização de avaliação | Um aluno inicia uma avaliação disponível (dentro do prazo) e que está vinculada a ele. <br> Avaliações do tipo simulado não possuem prazo. |
|  F15                |  Listagem de resultado de uma avaliação (elaborador autor) | Lista todas as respostas de cada aluno em uma avaliação. |
|  F16                |  Cadastro de resultado em uma avaliação (elaborador autor) | Um elaborador pode gerar um retorno (nota, mensagem etc.) sobre a avaliação de um usuário. |
|  F17                |  Cadastro de resultado em um item (elaborador autor) | Um elaborador pode gerar um retorno para cada item de uma avaliação pertencente a um aluno. |
|  F18                |  Listagem de resultado (aluno) | Um aluno pode verificar o(s) resultados(s) dado(s) por um elaborador em uma avaliação ou item específicos que esse discente realizou. |

## 11. Requisitos não-funcionais

| Código              |  Nome               |          Descrição  |  Categoria          |  Classificação      |
| :-----------------: | :-----------------: | :-----------------: | :-----------------: | :-----------------: |
|  NF01               | Controle de acesso ao sistema | Apenas usuários autenticados podem ter acesso ao sistema. | Segurança | Obrigatório |
|  NF02               | Design responsivo | O sistema web deve se adaptar a diferentes tamanhos de telas de dispositivos. | Usabilidade | Obrigatório |
|  NF03               | Facilidade de uso | O sistema deve possuir uma interface intuitiva e amigável, a fim de proporcionar ao usuário uma prazerosa interação com a plataforma. | Usabilidade | Obrigatório |
|  NF04               | Privacidade de dados pessoais | Usuários não podem visualizar informações privadas de outros usuários, como por exemplo dados de login. | Privacidade | Obrigatório |
|  NF05               | Criptografia de dados | Dados de login dos usuários devem ser gravados de forma criptografada no banco de dados. | Segurança | Obrigatório |
|  NF06               | Manutenção regular | O sistema irá receber atualizações e correções de erros regularmente. | Manutenibilidade | Obrigatório |
|  NF07               | Disponibilidade do sistema | O sistema deve funcionar durante 24 horas por dia, 7 dias por semana. | Confiabilidade | Obrigatório |

## 12. Regras de negócio

| Código              |          Descrição  |  
| :-----------------: | :-----------------: | 
|        RN01         | Somente usuários cadastrados podem utilizar a plataforma. |
|        RN02         | Um item ou avaliação só podem ser criados pelo usuário com perfil de elaborador. |
|        RN03         | Ao criar um item de múltipla escolha, deve-se incluir no mínimo duas alternativas contendo apenas uma correta. |
|        RN04         | O texto e as alternativas de um item só podem ser editados caso o item ainda não tenha sido utilizado em uma avaliação. |
|        RN05         | Ao criar uma avaliação é necessário incluir no mínimo um item. |
|        RN06         | Um item, avaliação ou simulado só podem ser respondidos pelo usuário com perfil de aluno. |
|        RN07         | Não é possível adicionar ou remover itens de uma avaliação que já foi aplicada. |
|        RN08         | Para visão do aluno, por padrão os itens serão ordenados pela data de publicação do item mais recente para o mais antigo, mas o usuário poderá alterar para `assunto`, `tag` ou `área`, através de um filtro. As avaliações serão ordenadas pelo prazo de entrega mais próximo ao mais distante. Já para o elaborador, os itens e avaliações serão ordenados pela data de publicação do mais recente para o mais antigo. |
