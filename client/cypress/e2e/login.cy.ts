
describe('Processo de Login do Usuario', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  context('Campo de login', () => {
    it('Deve notificar sobre login invalido', () => {
      cy.get('[data-cy=login]').type(' ')
      cy.get('[data-cy=submit]').click();

      cy.contains('O login deve conter ao menos 3 caracteres.');
    });

    it('Deve notificar sobre preenchimento do login', () => {
      cy.get('[data-cy=login]')
      cy.get('[data-cy=submit]').click()

      cy.wait(1000);
      cy.contains('O login precisa ser preenchido.');
    })
  });

  context('Campo de senha', () => {

    it('Deve notificar sobre senha invalida', () => {
      cy.get('[data-cy=senha]').type(' ')
      cy.get('[data-cy=submit]').click();

      cy.contains('A senha deve conter ao menos 6 caracteres.');
    });


    it('Deve notifcar sobre preenchimento de senha', () => {
      cy.get('[data-cy=senha]')
      cy.get('[data-cy=submit]').click()

      cy.contains('A senha precisa ser preenchida.');
    });
  })


  it('Deve redirecionar para login', () => {
    cy.contains('Login de Usuário')
  });

  it('Deve autenticar o usuario corretamente e redirecionar', () => {
    cy.get('[data-cy=login]').type('teste');

    cy.get('[data-cy=senha]').type('Teste@123');

    cy.get('[data-cy=submit]').click();

    cy.wait(1000);

    cy.contains('Painel de Controle');
    cy.url().should('contain', 'dashboard')
  });



})
