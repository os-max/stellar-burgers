
beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', {fixture: 'ingredients' });
    cy.intercept('GET', '/api/auth/user', {fixture: 'user'});
    cy.intercept('POST', '/api/orders', {fixture: 'order'});

    cy.visit('http://localhost:4000');
})

describe('E2E тестирование конструктора бургеров', function() {
    it('Проверка открытия модального окна "об ингредиенте" и двух способов его закрытия', function() {
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

    it('Проверка добавления ингредиентов в заказ', function() {

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

    it('Проверка оформления заказа и очистки конструктора бургеров', function() {
        cy.setCookie('accessToken', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZmFmYzAzMDdjYzBiMDAxYzFkNTA4MCIsImlhdCI6MTcyODc1NDYzNCwiZXhwIjoxNzI4NzU1ODM0fQ.CiV9KK-L9JRwawkB3E31zICaEV23zkYOOPZIPgYGJRU')
        cy.setCookie('refreshToken', '0fe8ad5fc22c1cff5750a9d9a7b374aabe5299c101427f20681dda55dd4b917d2ede0267b53a72c9')

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
