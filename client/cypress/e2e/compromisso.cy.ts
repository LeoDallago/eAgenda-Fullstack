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

        cy.wait(2000)

        cy.contains('Listagem de Compromissos')
    })

    it('Deve acessar pagina de CADASTRO de Comprimissos', () => {
        cy.visit('/compromissos/cadastrar')

        cy.contains('Cadastro de Compromisso')
    })

    context('Validação de campos', () => {
        it('Deve notificar sobre campo VAZIO', () => {
            cy.visit('/compromissos/cadastrar')

            cy.get('[data-cy=assunto]')
            cy.get('[data-cy=submit]').click()

            cy.contains('O assunto precisa ser preenchido.')
        })

        it('Deve notificar sobre tamanho MINIMO', () => {
            cy.visit('/compromissos/cadastrar')

            cy.get('[data-cy=assunto]').type('t')
            cy.get('[data-cy=submit]').click()

            cy.contains('O assunto deve conter ao menos 3 caracteres.')
        })
    })
})