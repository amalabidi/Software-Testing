describe("Let's start testing our app", () => {
    it("search for a workspace and add a review ", () => {
        cy.visit("http://localhost:4200");
        cy.get("#workspace").click();
        cy.get("#search").type("twin");
        cy.get("#filterLocation").type("menzah1");
        cy.get("#submit-filter").click();
        cy.get("#details").click();
        cy.get(".name-review").type("Amal");
        cy.get(".email-review").type("Amal@gmail.com");
        cy.get(".review-text").type("I like it it is so calm and comfortable");
        cy.get("#submit-review").click();
    });
    it("create a user and login", () => {
        cy.visit("http://localhost:4200");
        cy.get("#signin").click();
        cy.get("#registration").click();
        cy.get("#usern").type("user");
        cy.get("#mail").type("user@gmail.com");
        cy.get("#phone").type("52365478");
        cy.get("#address").type("menzah1");
        cy.get("#pass").type("hello");
        cy.get("#confirm-pass").type("hello");
        cy.get("#submit-registration").click();
        cy.get("#signin").click();
    });
    it("create a new space", () => {
        cy.visit("http://localhost:4200");
        cy.get("#add").click();
        cy.get("#spacename").type("les jasmins");
        cy.get("#location").type("centre urbain nord");
        cy.get("#descrip").type("calm beautiful");
        cy.get("#capacity").type(7);
        cy.get("#submit-space").click();
    });
});