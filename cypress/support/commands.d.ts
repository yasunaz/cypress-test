/// <reference types="cypress"/>

declare namespace Cypress {
  interface Chainable {
    /**
       * Verifies the text content of given element
       *
       * @example
       * cy.get(elements.banner_description).then(elementChainable => {
            cy.verifyFieldTextMatch(elementChainable, "Expected Text");
         });
       *
       * @param element element from cy.get()
       * @param text text to be matched
       */
    verifyTextMatch(element: any, text: string): Chainable<Element>

    /**
     * Grabs the web element from site and returns it
     * @param element web element locator
     */
    elem(element: string): Chainable<Element>

    /**
     * Grabs the web element that contains the text from site and returns it
     * @param element web element locator
     */
    elemText(element: string): Chainable<Element>

    /**
     * Takes care of use login to the test site
     */
    login(): Chainable<Element>

    /**
     *
     * @param seconds
     */
    waitForSeconds(seconds: number): Chainable<Element>

    /**
     * Registers new student and returns an object that contains first name and last name
     *
     * {
     *   first: string,
     *   last: string
     * }
     */
    getRandomStudent(): Chainable<Student>
  }
}

/**
 * Studnet info object consisting of first name and last
 */
type Student = {
  first: string
  last: string
}
