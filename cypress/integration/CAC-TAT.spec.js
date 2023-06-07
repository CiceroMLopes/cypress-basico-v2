/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {

    beforeEach('verificar o título da aplicação', () => {
        cy.visit('./src/index.html')
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', () => {
        const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste'
        cy.get('#firstName')
            .type('Cisso')
            .should('have.value', 'Cisso')
        cy.get('#lastName')
            .type('Lopes')
            .should('have.value', 'Lopes')
        cy.get('#email')
            .type('cissolopes@cisso.com')
            .should('have.value', 'cissolopes@cisso.com')
        cy.get('#open-text-area')
            .type(longText, { delay: 0 })
        cy.contains('button', 'Enviar')
            .click()
        cy.get('.success')
            .should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('#email')
            .type('cissolopes_cisso.com')
            .should('have.value', 'cissolopes_cisso.com')
        cy.contains('button', 'Enviar')
            .click()
        cy.get('.error')
            .should('be.visible')

    })
    it('preenche telefone com valor não numérico', () => {
        cy.get('input[type="number"]')
            .type('abcdefg')
            .should('not.have.text', 'abcdefg')
            .should('have.value', '')
        cy.contains('button', 'Enviar')
            .click()

    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#firstName').type('Cisso')
        cy.get('#lastName').type('Lopes')
        cy.get('#email').type('cisso@teste.com')
        cy.get('#phone-checkbox')
            .check()
        cy.get('#open-text-area').type('Teste')

        cy.contains('button', 'Enviar')
            .click()
        cy.get('.error')
            .should('be.visible')
    });
    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {

        cy.get('#firstName')
            .type('Cisso')
            .should('have.value', 'Cisso')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Lopes')
            .should('have.value', 'Lopes')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('cissolopes@cisso.com')
            .should('have.value', 'cissolopes@cisso.com')
            .clear()
            .should('have.value', '')
        cy.get('input[type="number"]')
            .type('123456')
            .should('have.value', '123456')
            .clear()
            .should('have.value', '')
    });
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.contains('button', 'Enviar')
            .click()
        cy.get('.error')
            .should('be.visible')
    });
    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    });

    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('select').select(4).should('have.value', 'youtube')
        cy.get('select').select('YouTube').should('have.value', 'youtube')
        cy.get('select').select('youtube').should('have.value', 'youtube')


    });

    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('select').select(3).should('have.value', 'mentoria')
        cy.get('select').select('Mentoria').should('have.value', 'mentoria')
        cy.get('select').select('mentoria').should('have.value', 'mentoria')

    });

    it('seleciona um produto (Blog) por seu índice', () => {
        cy.get('select').select(1).should('have.value', 'blog')
        cy.get('select').select('Blog').should('have.value', 'blog')
        cy.get('select').select('blog').should('have.value', 'blog')

    });
    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')
    });

    it('marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function ($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
        // cy.get('input[type="radio"][value="feedback"]').check().should('be.checked')
        // cy.get('input[type="radio"][value="elogio"]').check().should('be.checked')
        // cy.get('input[type="radio"][value="ajuda"]').check().should('be.checked')

    });

    it('marca ambos checkboxes, depois desmarca o último', () => {
        // cy.get('input[type="checkbox"]')
        // .as('checkbox')
        // .check()
        // cy.get('@checkbox')
        // .each(checkbox => {
        //     expect(checkbox[0].checked).to.eq(true)
        // })
        // cy.get('input[type="checkbox"][id="phone-checkbox"]').uncheck()
        cy.get('input[type="checkbox"]')
            .check()
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json')
            .then(input => {
                expect(input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
            .then(input => {
                expect(input[0].files[0].name).to.equal('example.json')
            })
    })
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json', { encoding: null }).as('exampleFile')
        cy.get('input[type="file"]')
            .selectFile('@exampleFile')
            .then(input => {
                expect(input[0].files[0].name).to.equal('example.json')
            })
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
        cy.get('a[href="privacy.html"]')
            .should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
        cy.get('a[href="privacy.html"]')
            .invoke('removeAttr', 'target').click()

        cy.contains('Talking About Testing').should('be.visible')
    })

});