import "@testing-library/jest-dom";
import { describe, expect, test } from "vitest";
import Aluno from ".";

describe("Aluno", () => {
    test("Deve retornar true quando os usuários são iguais", () => {
        const aluno1 = new Aluno(
            "20211014040039",
            "Diogo Santos",
            "diogo.santos@escolar.ifrn.edu.br"
        );
        const aluno2 = new Aluno(
            "20211014040039",
            "Diogo Santos",
            "diogo.santos@escolar.ifrn.edu.br"
        );

        const result = aluno1.equals(aluno2);
        expect(result).toBeTruthy();
    });

    test("Deve retornar true quando os usuários são diferentes", () => {
        const aluno1 = new Aluno(
            "20211014040039",
            "Diogo Santos",
            "diogo.santos@escolar.ifrn.edu.br"
        );
        const aluno2 = new Aluno(
            "20211014040039",
            "Savio",
            "diogo.santos@escolar.ifrn.edu.br"
        );

        const result = aluno1.equals(aluno2);
        expect(result).toBeFalsy();
    });

    test("Deve retornar um número negativo quando a matrícula do primeiro aluno for menor", () => {
        const aluno1 = new Aluno(
            "20211014040039",
            "Diogo Santos",
            "diogo.santos@escolar.ifrn.edu.br"
        );
        const aluno2 = new Aluno(
            "20211014040040",
            "Diogo Santos",
            "diogo.santos@escolar.ifrn.edu.br"
        );

        const result = aluno1.compareTo(aluno2);
        expect(result).toBeLessThan(0);
    });

    test("Deve retornar um número positivo quando a matrícula do primeiro aluno for maior", () => {
        const aluno1 = new Aluno(
            "20211014040039",
            "Diogo Santos",
            "diogo.santos@escolar.ifrn.edu.br"
        );
        const aluno2 = new Aluno(
            "20211014040038",
            "Diogo Santos",
            "diogo.santos@escolar.ifrn.edu.br"
        );

        const result = aluno1.compareTo(aluno2);
        expect(result).toBeGreaterThan(0);
    });

    test("Deve retornar zero quando a matrícula dos alunos forem iguais", () => {
        const aluno1 = new Aluno(
            "20211014040038",
            "Diogo Santos",
            "diogo.santos@escolar.ifrn.edu.br"
        );
        const aluno2 = new Aluno(
            "20211014040038",
            "Diogo Santos",
            "diogo.santos@escolar.ifrn.edu.br"
        );

        const result = aluno1.compareTo(aluno2);
        expect(result).toBe(0);
    });
});
