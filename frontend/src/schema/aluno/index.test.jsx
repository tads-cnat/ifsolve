import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Aluno from ".";

describe("Aluno", () => {
    test("deve retornar true quando os usuários são iguais", () => {
        const aluno1 = new Aluno(
            1,
            "20211014040039",
            "Diogo Santos",
            "john.doe@example.com"
        );
        const aluno2 = new Aluno(
            1,
            "20211014040039",
            "Diogo Santos",
            "john.doe@example.com"
        );

        const result = aluno1.equals(aluno2);
        expect(result).toBeTruthy();
    });

    test("deve retornar true quando os usuários são iguais", () => {
        const aluno1 = new Aluno(
            1,
            "20211014040039",
            "Diogo Santos",
            "john.doe@example.com"
        );
        const aluno2 = new Aluno(
            1,
            "20211014040039",
            "Savio",
            "john.doe@example.com"
        );

        const result = aluno1.equals(aluno2);
        expect(result).toBeFalsy();
    });
});
