describe('Processo de Registro do Usuario', () => {
    beforeEach(() => {
        cy.visit('/registro')
    })

    it('Deve redirecionar para pagina de registro', () => {
        cy.contains('Registro de Usuário')
    });

    context('Verificação de campos', () => {

        it('Deve notificar campo nome vazio', () => {
            cy.get('[data-cy=nome]')
            cy.get('[data-cy=submit]').click()

            cy.contains('O nome precisa ser preenchido.')
        })

        it('Deve notifcar campo login vazio', () => {
            cy.get('[data-cy=login]')
            cy.get('[data-cy=submit]').click()

            cy.contains('O nome precisa ser preenchido.')
        })

        it('Deve notificar campo email vazio', () => {
            cy.get('[data-cy=email]')
            cy.get('[data-cy=submit]').click()

            cy.contains('O email precisa ser preenchido.')
        })

        it('Deve Notificar campo senha vazio', () => {
            cy.get('[data-cy=senha]')
            cy.get('[data-cy=submit]').click()

            cy.contains('A senha precisa ser preenchida.')
        })

        it('Deve Notifcar campo senha com pelo menos 6 caracteres', () => {
            cy.get('[data-cy=senha]').type('123')
            cy.get('[data-cy=submit]').click()

            cy.contains('A senha deve conter ao menos 6 caracteres.')
        })
    });


})