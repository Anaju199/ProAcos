describe('Login', () => {
  it('Login com sucesso', () => {
      // acessar a minha aplicação
      cy.visit('http://localhost:4200/')
       cy.get('#addPensamento').click()

      cy.get('#pensamento').type('Teste Automático')
      cy.get('#autoria').type('Ana')
      cy.get(':nth-child(3) > label > .custom-radio > span').click()
      cy.get('#btnSalvar').click()

     cy.get(':nth-child(3) > app-pensamento > .pensamento > .acoes > .botao-editar > img').click()
     cy.get('#pensamento').clear().type('Teste Automático Editado')
     cy.get('#autoria').clear().type('AnaJulia')
     cy.get(':nth-child(3) > label > .custom-radio > span').click()
     cy.get('#btnSalvarEdit').click()

     cy.get(':nth-child(3) > app-pensamento > .pensamento > .acoes > .botao-excluir > img').click()
     cy.get('#btnExcluir').click()

  })
})
