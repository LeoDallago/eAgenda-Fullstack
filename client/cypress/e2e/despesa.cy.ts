describe('Processos de despsas', ()=>{
  beforeEach(() => {
    cy.viewport(1920, 1080)

    cy.visit('/')

    cy.get('[data-cy=login]').type('teste');

    cy.get('[data-cy=senha]').type('Teste@123');

    cy.get('[data-cy=submit]').click();

    cy.wait(1000);
  })

  after(()=>{
    cy.wait(1000)

    cy.get('[data-cy=logout]').click();
  })

  it('Deve acessar pagina de LISTAGEM de despesas',()=>{
    cy.visit('/despesas/listar');

    cy.wait(2000)

    cy.contains('Listagem de Despesas')
  })

  it('Deve acessar pagina de CADASTRO de despesas',()=>{
    cy.visit('/despesas/cadastrar');

    cy.wait(2000)

    cy.contains('Cadastro de Despesas')
  })


  it('Deve notificar sobre campo VAZIO', () => {
    cy.visit('/despesas/cadastrar')

    cy.get('[data-cy=descricao]')
    cy.get('[data-cy=submit]').click()

    cy.contains('A descricao precisa ser preenchida.')
  })
})
