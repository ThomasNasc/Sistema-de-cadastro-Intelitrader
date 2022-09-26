import {
  findAllByRole,
  findByRole,
  fireEvent,
  getByRole,
  getByTestId,
  getByText,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import Home from "../pages";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Create_Edit from "../components/Create_Edit";
import axios from "axios";
import List from "../components/List";

describe("Lista de Usuarios", () => {
  test("Tabela com a lista de usuarios disponivel", () => {
    render(<Home />);

    const initalPage = screen.getByRole("table");

    expect(initalPage).toBeInTheDocument();
  });
  test("tabela mostrando as colunas da lista de usuarios", () => {
    render(<Home />);

    const cabecalho = screen.getAllByRole("cell");
    cabecalho.map((item) => {
      expect(item).toBeInTheDocument();
    });
  });
  test("tabela mostrando o nome das colunas", () => {
    render(<Home />);

    const cabecalho = screen.getAllByRole("row", {
      Name: "Nome Sobrenome Idade Data de Cadastro Editar Deletar",
    });
    cabecalho.map((item) => {
      expect(item).toBeInTheDocument();
    });
  });
});

describe("Telas de Controle", () => {
  test("botao de criação de usuario disponivel", () => {
    render(<Home />, { hydrate: true, legacyRoot: true });
    const botao = screen.getByRole("button", { name: "Novo Usuario" });

    expect(botao).toBeInTheDocument();
  });
});
describe("tela de cadastro, edicao e delecao", () => {
  test("elementos de criacao edicao e delecao disponiveis", () => {
    render(<Create_Edit />);
    const form = screen.getAllByRole("textbox", {
      name: "*Nome Sobrenome *Idade",
    });
    form.map((e) => expect(e).toBeInTheDocument());
  });
  test("botao de submit disponivel", () => {
    render(<Create_Edit />);
    const buttonSubmit = screen.getByRole("button");
    expect(buttonSubmit).toBeInTheDocument();
  });
  test("elementos de criacao edicao e delecao disponiveis", () => {
    render(<Create_Edit />);
    const form = screen.getAllByRole("textbox", {
      name: "*Nome Sobrenome *Idade",
    });
    form.map((e) => expect(e).toBeInTheDocument());
  });
  test("botao de submit disponivel", () => {
    render(<Create_Edit />);
    const buttonSubmit = screen.getByRole("button");
    expect(buttonSubmit).toBeInTheDocument();
  });
  test("teste do click do botao para a tela de cadastro", async () => {
    render(<Home />);
    const button = screen.getByText("Novo Usuario");
    fireEvent.click(button);

    await waitFor(() => {
      const inputs = screen.getAllByRole("textbox", {
        name: "*Nome Sobrenome *Idade",
      });
      inputs.map((e) => expect(e).toBeInTheDocument());
    });
  });
  test("teste do click do botao para a tela de lista de usuarios", async () => {
    render(<Home />);
    const button = screen.getByText("Listar Usuarios");
    fireEvent.click(button);

    await waitFor(() => {
      const table = screen.getByRole("table");

      expect(table).toBeInTheDocument();
    });
  });
});
