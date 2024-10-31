describe('Processos de tarefas', ()=>{
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

  it('Deve acessar pagina de LISTAGEM de tarefas',()=>{
    cy.visit('/tarefas/listar');

    cy.wait(2000)

    cy.contains('Listagem de Tarefas')
  })

  it('Deve acessar pagina de CADASTRO de tarefas',()=>{
    cy.visit('/tarefas/cadastrar');

    cy.wait(2000)

    cy.contains('Cadastro de Tarefa')
  })


  it('Deve notificar sobre campo VAZIO', () => {
    cy.visit('/tarefas/cadastrar')

    cy.get('[data-cy=titulo]')
    cy.get('[data-cy=submit]').click()

    cy.contains('O titulo precisa ser preenchido.')
  })
})
