describe("Login Page", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("should login when form is submitted", () => {
    cy.get('[type="Email"]').should("be.empty");
    cy.get('[type="Password"]').should("be.empty");
    cy.get('[type="Email"]').type("blah@gmail.com");
    cy.get('[type="Password"]').type("Rahulshaw");
    cy.get(".btn-primary").click();
  });

  it("should give error when password is invalid", () => {
    cy.get('[type="Email"]').type("blah@gmail.com");
    cy.get('[type="Password"]').type("eheheheh");
    cy.get(".btn-primary").click();
    cy.get(".login__message").should("be.visible");
  });

  it("should give error when email is invalid", () => {
    cy.get('[type="Email"]').type("blahss@gmail.com");
    cy.get('[type="Password"]').type("Rahulshaw");
    cy.get(".btn-primary").click();
    cy.get(".login__message").should("be.visible");
  });

  it("should give error both are invalid", () => {
    cy.get('[type="Email"]').type("blahss@gmail.com");
    cy.get('[type="Password"]').type("Rahwgwulshaw");
    cy.get(".btn-primary").click();
    cy.get(".login__message").should("be.visible");
  });
});
