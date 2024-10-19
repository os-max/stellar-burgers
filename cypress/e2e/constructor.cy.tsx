
beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', {fixture: 'ingredients' });
    cy.intercept('GET', '/api/auth/user', {fixture: 'user'});
    cy.intercept('POST', '/api/orders', {fixture: 'order'});
    cy.setCookie('accessToken', 'Bearer test')
    cy.setCookie('refreshToken', 'test')

    cy.visit('http://localhost:4000');
})

afterEach(() => {
    cy.clearAllCookies();
})

describe('Test burger constructor menu', function() {
    it('Should open modal with ingredient twice and close it both times', function() {
        const ingredientFilling = cy.get(`[data-cy=643d69a5c3f7b9001cfa093e]`);
        ingredientFilling.click();
        cy.get('[data-cy=modal]').should('exist')
            .should('contain' ,'Филе Люминесцентного тетраодонтимформа');

        cy.get('body').click(0, 0);
        cy.get('[data-cy=modal]').should('not.exist');


        ingredientFilling.click();
        cy.get('[data-cy=modal]')
            .get('[data-cy=modal-close]')
            .click();
        cy.get('[data-cy=modal]').should('not.exist');
    });

    it('Should add bun and filling to constructor', function() {

        const ingredientBun = cy.get(`[data-cy=643d69a5c3f7b9001cfa093d]`);
        const buttonBun = ingredientBun.contains('Добавить');
        buttonBun.click();

        const ingredientFilling = cy.get(`[data-cy=643d69a5c3f7b9001cfa093e]`);
        const buttonFilling = ingredientFilling.contains('Добавить');
        buttonFilling.click();

        cy.get('[data-cy=top-bun]').should('contain', 'Флюоресцентная булка R2-D3 (верх)');
        cy.get('[data-cy=fillings]').should('contain', 'Филе Люминесцентного тетраодонтимформа');
        cy.get('[data-cy=bottom-bun]').should('contain', 'Флюоресцентная булка R2-D3 (низ)');
    });

    it('Should place an order and clear constructor', function() {
        
        cy.get(`[data-cy=643d69a5c3f7b9001cfa093d]`).contains('Добавить').click();
        cy.get(`[data-cy=643d69a5c3f7b9001cfa093e]`).contains('Добавить').click();

        const orderButton = cy.contains('Оформить заказ');
        orderButton.click();
        cy.get('[data-cy=modal]')
            .should('exist')
            .get('[data-cy=orderId]')
            .should('contain', '55563');

        cy.get('[data-cy=modal]')
            .get('[data-cy=modal-close]')
            .click();
        cy.get('[data-cy=modal]').should('not.exist');
        
        cy.get('[data-cy=top-bun]').should('contain', 'Выберите булки');
        cy.get('[data-cy=fillings]').should('contain', 'Выберите начинку');
        cy.get('[data-cy=bottom-bun]').should('contain', 'Выберите булки')
    });
}); 
