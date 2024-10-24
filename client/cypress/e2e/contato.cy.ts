describe('Processo de contatos', () => {
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

    context('Pagina de contatos', () => {
        it('Deve acessar pagina de cadastro de contato', () => {
            cy.visit('/contatos/cadastrar')

            cy.contains('Cadastro de Contato')
        })

        it('Deve cadastrar Contato', () => {
            cy.visit('/contatos/cadastrar');

            cy.get('[data-cy=nome]').type('juninho testes');
            cy.get('[data-cy=email]').type('juninho@testes.com');
            cy.get('[data-cy=telefone]').type('(49) 9900-9900');
            cy.get('[data-cy=empresa]').type('academia do programador');
            cy.get('[data-cy=cargo]').type('tester');

            cy.get('[data-cy=submit]').click();
            cy.contains('Listagem de Contatos');
        })
    });

    context('Campos pagina de contatos', () => {
        it('Deve exibir mensagem de campo precisa ser preenchido', () => {
            cy.visit('/contatos/cadastrar')

            cy.get('[data-cy=nome]');
            cy.get('[data-cy=submit]').click()

            cy.contains('O nome precisa ser preenchido.')
        })

        it('Deve exibir mensagem de campo com no minimo 3 caracteres', () => {
            cy.visit('/contatos/cadastrar')

            cy.get('[data-cy=nome]').type('t');
            cy.get('[data-cy=submit]').click()

            cy.contains('O nome deve conter ao menos 3 caracteres.')
        })
    });
})