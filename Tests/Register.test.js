import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import Home from "../pages";
import "@testing-library/jest-dom";
import Create_Edit from "../components/Create_Edit";


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
    const botao = screen.getAllByRole('button', {name: "Cadastrar novo usuario: +"});

    expect(botao[0]).toBeInTheDocument();
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
    const buttonSubmit = screen.getByText("Concluir");
    expect(buttonSubmit).toBeInTheDocument();
  });
  test("teste do click do botao para a tela de cadastro", async () => {
    render(<Home />);
    const button = screen.getAllByRole('button', {name: "Cadastrar novo usuario: +"});
    fireEvent.click(button[0]);

    await waitFor(() => {
      const inputs = screen.getAllByRole("textbox", {
        name: "*Nome Sobrenome *Idade",
      });
      inputs.map((e) => expect(e).toBeInTheDocument());
    });
  });

});
