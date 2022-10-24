create table UserDjango(
	id INTEGER primary key,
	nome_usuario VARCHAR (100),
	senha VARCHAR (20) not null,
	email VARCHAR (100) not null,
	primeiro_nome VARCHAR (50) not null,
	ultimo_nome VARCHAR (50) not null
);

create table Usuario(
	id_usuario INTEGER primary key,
	data_nascimento DATE not null,
	foreign key (id_usuario) references UserDjango (id)
);

create table Elaborador(
	id_elaborador INTEGER primary key,
	verificado bit not null,
	foreign key (id_elaborador) references Usuario(id_usuario)
);

create table Aluno(
	id_aluno INTEGER primary key,
	foreign key (id_aluno) references Usuario(id_usuario)
);

create table Area(
	id_area INTEGER primary key,
	codigo CHAR(15) unique not null,
	nome CHAR(50) not null,
	descricao VARCHAR not null,
	sub_area INTEGER,
	foreign key (sub_area) references Area(id_area)
);

create table Alternativa(
	id_alternativa INTEGER primary key,
	texto VARCHAR not null,
	justificativa VARCHAR not null
);

create table Tag(
	id_tag INTEGER primary key,
	nome CHAR(30)
);

create table Item(
	id_item INTEGER primary key,
	tipo VARCHAR check (tipo = 'Objetiva' or tipo = 'Discursiva') not null,
	visibilidade VARCHAR check (visibilidade = 'Publico' or visibilidade = 'Privado' or visibilidade = 'Inativo') not null,
	assunto CHAR(50) not null,
	titulo CHAR(50) not null,
	data_publicacao Date not null,
	texto_base VARCHAR,
	enunciado VARCHAR not null,
	expectativa_resposta VARCHAR,
	alternativa_correta CHAR(1), 
	id_alternativa_A INTEGER,
	id_alternativa_B INTEGER,
	id_alternativa_C INTEGER,
	id_alternativa_D INTEGER,
	id_alternativa_E INTEGER,
	teg_item INTEGER not null,
	area_item INTEGER not null,
	elaborador_item INTEGER not null,
	foreign key (area_item) references Area(id_area),
	foreign key (id_alternativa_A) references Alternativa (id_alternativa),
	foreign key (id_alternativa_B) references Alternativa (id_alternativa),
	foreign key (id_alternativa_C) references Alternativa (id_alternativa),
	foreign key (id_alternativa_D) references Alternativa (id_alternativa),
	foreign key (id_alternativa_E) references Alternativa (id_alternativa),
	foreign key (elaborador_item) references Elaborador (id_elaborador),
	foreign key (teg_item) references Tag (id_tag),
	check (id_alternativa_A <> id_alternativa_B and id_alternativa_A <> id_alternativa_C and id_alternativa_A <> id_alternativa_D and id_alternativa_A <> id_alternativa_E and
	id_alternativa_B <> id_alternativa_C and id_alternativa_B <> id_alternativa_D and id_alternativa_B <> id_alternativa_E and id_alternativa_C <> id_alternativa_D and 
	id_alternativa_C <> id_alternativa_E and id_alternativa_D <> id_alternativa_E
	) 
);

create table Resposta(
	id_resposta INTEGER primary key,
	resposta VARCHAR not null,
	nota_obtida INTEGER not null,
	data_hora timestamp not null, 
	resposta_aluno INTEGER not null,
	resposta_item INTEGER not null,
	foreign key (resposta_aluno) references Aluno(id_aluno),
	foreign key (resposta_item) references Item(id_item)
);
