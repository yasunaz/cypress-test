// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands

import elements from './elements'
const { faker } = require('@faker-js/faker')

// ***********************************************
Cypress.Commands.add('verifyTextMatch', (elementChainable, text) => {
  text = text.toString()
  cy.wrap(elementChainable)
    .scrollIntoView()
    .then($el => {
      // Extract and clean up the text from the element
      const cleanedText = $el.text().replace(/\s+/g, ' ').trim() // Replaces new line and multiple spaces with a single space and trims the text

      cy.wrap(cleanedText).should(
        'eq',
        text === '' || text === null || text === undefined
          ? ''
          : isNaN(text)
            ? text
            : text.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      )
    })
})

Cypress.Commands.add('elem', elem => {
  return cy.get(elem)
})

Cypress.Commands.add('elemText', elem => {
  return cy.contains(elem)
})

Cypress.Commands.add('login', () => {
  const site_url = 'https://student-portal.swaggear.life/login'
  const username = 'testUser@gmail.com'
  const testpass = 'SecurePasta123!'
  cy.visit(site_url)
  cy.elem('input[name="email"]').type(username)
  cy.elem('input[name="password"]').type(testpass)
  cy.elemText('Sign In').click()
  cy.wait(500)
})

Cypress.Commands.add('waitForSeconds', duration => {
  const time = duration * 1000
  cy.wait(time)
})

Cypress.Commands.add('getRandomStudent', () => {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  const email = faker.internet.email({ provider: 'gmail.com' })
  const password = faker.internet.password()
  const phoneNumber = faker.phone.number('+1##########')
  const address = faker.location.streetAddress()
  const age = faker.number.int({ min: 18, max: 65 })
  const gender = faker.person.gender()

  // test steps
  cy.get(elements.addStudentBttn).click()
  cy.get(elements.student.firstName).type(firstName)
  cy.get(elements.student.lastName).type(lastName)
  cy.get(elements.student.email).type(email)
  cy.get(elements.student.password).type(password)
  cy.get(elements.student.phoneNumber).type(phoneNumber)
  cy.get(elements.student.address).type(address)
  cy.get(elements.student.age).type(age)
  cy.get(elements.student.gender).type(gender)
  cy.get(elements.createBttn).click()
  cy.get(elements.studentsBttn).click()

  // Wrap the student object to return as a Cypress Chainable
  return cy.wrap({ first: firstName, last: lastName })
})
