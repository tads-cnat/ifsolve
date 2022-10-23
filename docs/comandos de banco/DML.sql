-- Q1 Um comando INSERT para cada uma das tabelas que compõem o modelo relacional
-- Inserindo três usuários na tabela UserDjango
insert into userdjango 
values ('1','aluno', 'senha!123', 'aluno@email.com', 'Aluno', 'IF'), ('2','elaborador', 'senha!123', 'elaborador@email.com', 'Elaborador', 'IF'), 
('3','aluno3', 'senha!123', 'aluno3@email.com', 'Aluno3', 'IF');

-- Inserindo e relacionando os usuários da tabela UserDjango na tabela Usuário 
insert into usuario (id_usuario, data_nascimento)
values ('1', '1997-08-14'), ('2', '1990-08-14'), ('3', '2000-08-14');

-- Inserindo e relacionando um usuário da tabela Usuario com a tabela de Elaborador 
insert into elaborador 
values ('2', '1');

-- Inserindo e relacionando um usuário da tabela Usuario com a tabela de Aluno 
insert into aluno  
values ('1'), ('3');

-- Inserindo uma área na tabela Area 
insert into area 
values ('11', 'A11', 'Programação', 'Programação de computadores');

-- Inserindo cinco alternativas na tabela Alternativa */
insert into alternativa 
values ('101', 'Alternativa A', 'Justificativa A'), ('102', 'Alternativa B', 'Justificativa B'), 
('103', 'Alternativa C', 'Justificativa C'), ('104', 'Alternativa D', 'Justificativa D'), 
('105', 'Alternativa E', 'Justificativa E'); 

-- Inserindo a tag Linguagem de programação 
insert into tag 
values ('111', 'Linguagem de programação');

-- Inserindo o item "O que é Python?" 
insert into item 
values ('1000', 'Objetiva', 'Publico', 'Linguagem de programação', 'Python', '2022-08-14', null, 'O que é Python?',
null, 'a', 101, 102, 103, 104, 105, '111', '11', '2');

-- Inserindo resposta do aluno com id 1 para a questão com id 1000
insert into resposta
values ('201', 'a', '10', '1990-08-14 08:30:00', '1', '1000'), ('202', 'c', '0', '1990-08-13 22:30:00', '1', '1000');

--2. Um comando UPDATE para atualizar um campo de todos os registros de uma tabela.
--Atualizando a coluna Justificativa de todas as alternativas para o conteúdo 'Justificativas' 
update alternativa 
set justificativa = 'Justificativas';

-- 3. Um comando UPDATE para atualizar um campo dos registros que satisfazem uma condição simples. 
-- Atualizando o nome do usuário de id 2 para Administrador 
update userdjango 
set nome_usuario = 'Administrador'
where id = '2';

-- 4. Um comando UPDATE para atualizar um campo dos registros que satisfazer uma condição composta.
-- Atualizando para IFRN o ultimo_nome dos usuários que tenha o nome_usuario como 'aluno' ou com o email 'elaborador@email.com'
update userdjango 
set ultimo_nome = 'IFRN'
where nome_usuario = 'aluno' or email = 'elaborador@email.com';

-- 5. Um comando UPDATE para atualizar dois campos dos registros que satisfazem uma condição. 
-- atualizando nome_usuario e o email do usuario com id '1' 
update userdjango 
set nome_usuario = 'estudante', email = 'estudante@email.com'
where id = '1';

-- 6. Um comando UPDATE para atualizar um campo usando o antigo valor desse campo. (ex. telefone = '9' + telefone)
-- Acrescentando 'IFRN' nas senhas de todos os usuários
update userdjango 
set senha = concat('IFRN', senha);

-- 7. Um comando UPDATE para atualizar um campo usando uma função agregada
-- Acrescentando 5 pontos para as menores notas
UPDATE resposta
SET nota_obtida = nota_obtida + 5
WHERE nota_obtida = (SELECT MIN(nota_obtida) FROM resposta)

-- 8. Um comando DELETE para remover todos os registros de uma tabela.
-- Deletando todas as informações da tabela Resposta
delete from resposta;

-- Criando novamente as respostas para manupulação dos comandos seguintes
insert into resposta
values ('201', 'a', '10', '1990-08-14 08:30:00', '1', '1000'), ('202', 'c', '0', '1990-08-13 22:30:00', '3', '1000');

-- 9. Um comando DELETE para remover os registros que satisfazem uma condição simples.
-- Deletando a resposta cujo id é 201.
delete from resposta  
where id_resposta = 201;

-- 10. Um comando DELETE para remover os registros que satisfazer uma condição composta.
-- Deletendo as respostas em que a nota for igual a 10 ou cujo o id do aluno é 3. 
delete from resposta 
where nota_obtida = '10' or resposta_aluno = 3;

-- 11. Um comando DELETE para remover um campo usando uma função agregada.
-- Deletando a resposta que possui a maior nota.
delete from resposta
WHERE nota_obtida = (SELECT max(nota_obtida) FROM resposta);
