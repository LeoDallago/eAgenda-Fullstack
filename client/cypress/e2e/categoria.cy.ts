describe('Processos de categorias', () => {
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

  it('Deve acessar pagina de LISTAGEM de categorias',()=>{
    cy.visit('/categorias/listar');

    cy.wait(2000)

    cy.contains('Listagem de Categorias')
  })

  it('Deve acessar pagina de CADASTRO de categorias',()=>{
    cy.visit('/categorias/cadastrar');

    cy.wait(2000)

    cy.contains('Cadastro de Categoria')
  })

  it('Deve notificar sobre campo VAZIO', () => {
    cy.visit('/categorias/cadastrar')

    cy.get('[data-cy=titulo]')
    cy.get('[data-cy=submit]').click()

    cy.contains('O titulo precisa ser preenchido.')
  })

  context('Cadastro e Exclusao', ()=>{
    it('Deve CADASTRAR categoria corretamente',()=>{
      cy.visit('/categorias/cadastrar')

      cy.get('[data-cy=titulo]').type('Cypress')
      cy.get('[data-cy=submit]').click()

      cy.wait(3000)
      cy.contains('Listagem de Categorias')
    })

    it('Deve EXCLUIR categoria corretamente',()=>{
      cy.visit('/categorias/listar')

      cy.get('[data-cy-list-item]')
        .last()
        .within(() => {
          cy.get('[data-cy="excluir"]').click();
        });

      cy.wait(2000)
      cy.get('[data-cy=botaoExcluir]').click()

      cy.wait(3000)
      cy.contains('Listagem de Categorias')
    })
  })
})
