export default class Aluno {
    constructor(matricula, nome, email) {
        this.matricula = matricula;
        this.nome = nome;
        this.email = email;
    }

    equals(otherAluno) {
        if (!(otherAluno instanceof Aluno)) {
            return false;
        }

        return (
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
        }
        if (this.matricula > otherAluno.matricula) {
            return 1;
        }
        return 0;
    }
}
