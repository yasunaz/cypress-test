const elements = {
  /*-- Home --*/
  banner: 'div.students h4',
  search: 'input.search',
  users: 'div.user',
  userInfo: 'div.user p',

  /*-- Side Navigation --*/
  studentsBttn: 'aside.nav a[href="/students"]',
  addStudentBttn: 'aside.nav a[href*="create"]',

  /*-- Add or Edit Student --*/
  student: {
    firstName: 'input[name = "first_name"]',
    lastName: 'input[name = "last_name"]',
    email: 'input[name = "email"]',
    password: 'input[name = "password"]',
    phoneNumber: 'input[name = "phone"]',
    address: 'input[name = "address"]',
    age: 'input[name = "age"]',
    gender: 'input[name = "gender"]',
    notes: 'textarea[name]',
  },
  createBttn: 'button.primary p.button',
  cancelBttn: 'button.secondaryWhite p.button',
  studentOption: 'button.secondaryWhite p.button',
}

export default elements
