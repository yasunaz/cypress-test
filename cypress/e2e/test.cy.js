/// <reference types="cypress"/>
/// <reference types="../support/commands.d.ts"/>

/* -- external code library -- */
import { faker } from '@faker-js/faker'
import elements from '../support/elements'

describe('Student Portal Smoke Test', () => {
  it('verify user can see login to the portal and see the home page', () => {
    cy.login()
    cy.get(elements.banner).should('have.text', 'Existing Students')
  }) //end::it

  it('verify user can search for students', () => {
    // test steps
    cy.login()
    cy.elem(elements.search).as('search')
    cy.elem('@search').type('Kara')
    cy.elem('@search').type('{enter}')

    // assertion
    cy.get(elements.users).as('users')
    cy.get('@users').should('have.length', 2)
    cy.get('@users').first().should('contain', 'Kara Walker')
    cy.get('@users').last().should('contain', 'Kara Dennis')
  }) //end::it

  it('verify user can add a new student', () => {
    // test data
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const email = faker.internet.email({ provider: 'gmail.com' })
    const password = faker.internet.password()
    const phoneNumber = faker.phone.number('+1##########')
    const address = faker.location.streetAddress()
    const age = faker.number.int({ min: 18, max: 65 })
    const gender = faker.person.gender()

    // test steps
    cy.login()
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

    // Assertion
    cy.elem(elements.search).as('search')
    cy.elem('@search').type(`${firstName} ${lastName}`)
    cy.get(elements.userInfo).first().should('have.text', `${firstName} ${lastName}`)
  }) //end::it

  it('verify user can delete student', () => {
    cy.login()
    cy.getRandomStudent().then(student => {
      const fullName = `${student.first} ${student.last}`
      cy.get(elements.search).type(fullName)
      cy.get(elements.users).should('have.length', 1)
      cy.get(elements.userInfo).first().should('have.text', fullName)
      cy.get(elements.users).click()
      cy.get(elements.studentOption).contains('delete').click()

      // after deletion, search should return nothing
      cy.get(elements.search).type(fullName + '{enter}')
      cy.get(elements.users).should('have.length', 0)
    })
  })
}) //end::describe
