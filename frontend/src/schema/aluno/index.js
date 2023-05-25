export default class Aluno {
    constructor(id, matricula, nome, email) {
        this.id = id;
        this.matricula = matricula;
        this.nome = nome;
        this.email = email;
    }

    equals(otherAluno) {
        if (!(otherAluno instanceof Aluno)) {
            return false;
        }

        return (
            this.id === otherAluno.id &&
            this.matricula === otherAluno.matricula &&
            this.nome === otherAluno.nome &&
            this.email === otherAluno.email
        );
    }

    compareTo(otherAluno) {
        if (!(otherAluno instanceof Aluno)) {
            return false;
        }

        if (this.matricula < otherAluno.matricula) {
            return -1;
        } else if (this.matricula > otherAluno.matricula) {
            return 1;
        } else {
            return 0;
        }
    }
}
