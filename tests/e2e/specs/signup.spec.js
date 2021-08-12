describe("Signup page", () => {
  beforeEach(() => {
    cy.visit("/signup");
  });

  it("should signup when form submitted", () => {
    cy.get("[type='Email']").should("be.empty");
    cy.get("[type='Email']").type("blahblah@gmail.com");
    cy.get("[type='Password']").type("ehehehehehe");
    cy.get(".btn-primary").click();
  });

  it("should give an error", () => {
    cy.get("[type='Email']").should("be.empty");
    cy.get("[type='Email']").type("eheheheheehhhe@gmail.com");
    cy.get("[type='Password']").type(" ");
    cy.get(".btn-primary").click();
    cy.get(".signup__message").should("be.visible");
  });

  it("should remove message box after trying successfully signing", () => {
    cy.get("[type='Email']").type("eheheheheehhhe@gmail.com");
    cy.get("[type='Password']").type("jgwgjwljgjwgw");
    cy.get(".btn-primary").click();
    cy.get(".signup__message").should("not.be.visible");
  });
});
