describe('Processos de compromissos', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080)

        cy.visit('/')

        cy.get('[data-cy=login]').type('teste');

        cy.get('[data-cy=senha]').type('Teste@123');

        cy.get('[data-cy=submit]').click();

        cy.wait(1000);

    })

    after(() => {
        cy.wait(1000)

        cy.get('[data-cy=logout]').click();
    })

    it('Deve acessar pagina de LISTAGEM compromissos', () => {
        cy.visit('/compromissos/listar');

        cy.contains('Listagem de Compromissos')
    })

    it('Deve acessar pagina de CADASTRO de Comprimissos', () => {
        cy.visit('/compromissos/cadastrar')

        cy.contains('Cadastro de Compromisso')
    })
})