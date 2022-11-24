import { getVectors } from '../helpers/assign'

const people = [
  { name: 'Person One', email: 'person.one@mail.com' },
  { name: 'Person Two', email: 'person.two@mail.com' },
  { name: 'Person Three', email: 'person.three@mail.com' },
  { name: 'Person Four', email: 'person.four@mail.com' },
  { name: 'Person Five', email: 'person.five@mail.com' },
  { name: 'Person Six', email: 'person.six@mail.com' },
  { name: 'Person Seven', email: 'person.seven@mail.com' },
]

const rules = [
  { from: 'person.one@mail.com', to: 'person.three@mail.com', type: 'inclusion' },
  { from: 'person.two@mail.com', to: 'person.five@mail.com', type: 'inclusion' },
  { from: 'person.three@mail.com', to: 'person.one@mail.com', type: 'exclusion' },
  { from: 'person.four@mail.com', to: 'person.one@mail.com', type: 'exclusion' },
  { from: 'person.four@mail.com', to: 'person.seven@mail.com', type: 'exclusion' },
  { from: 'person.seven@mail.com', to: 'person.one@mail.com', type: 'exclusion' },
]

const rulesFail = [
  { from: 'person.one@mail.com', to: 'person.three@mail.com', type: 'inclusion' },
  { from: 'person.two@mail.com', to: 'person.five@mail.com', type: 'inclusion' },
  { from: 'person.three@mail.com', to: 'person.one@mail.com', type: 'exclusion' },
  { from: 'person.three@mail.com', to: 'person.two@mail.com', type: 'exclusion' },
  { from: 'person.three@mail.com', to: 'person.four@mail.com', type: 'exclusion' },
  { from: 'person.three@mail.com', to: 'person.seven@mail.com', type: 'exclusion' },
  { from: 'person.four@mail.com', to: 'person.one@mail.com', type: 'exclusion' },
  { from: 'person.four@mail.com', to: 'person.two@mail.com', type: 'exclusion' },
  { from: 'person.four@mail.com', to: 'person.seven@mail.com', type: 'exclusion' },
  { from: 'person.four@mail.com', to: 'person.two@mail.com', type: 'exclusion' },
  { from: 'person.five@mail.com', to: 'person.one@mail.com', type: 'exclusion' },
  { from: 'person.five@mail.com', to: 'person.two@mail.com', type: 'exclusion' },
  { from: 'person.five@mail.com', to: 'person.four@mail.com', type: 'exclusion' },
  { from: 'person.six@mail.com', to: 'person.one@mail.com', type: 'exclusion' },
  { from: 'person.six@mail.com', to: 'person.two@mail.com', type: 'exclusion' },
  { from: 'person.six@mail.com', to: 'person.four@mail.com', type: 'exclusion' },
  { from: 'person.six@mail.com', to: 'person.seven@mail.com', type: 'exclusion' },
  { from: 'person.seven@mail.com', to: 'person.one@mail.com', type: 'exclusion' },
  { from: 'person.seven@mail.com', to: 'person.two@mail.com', type: 'exclusion' },
  { from: 'person.seven@mail.com', to: 'person.three@mail.com', type: 'exclusion' },
  { from: 'person.seven@mail.com', to: 'person.four@mail.com', type: 'exclusion' },
]

function isUnique(arr) {
  return arr.length === new Set(arr).size
}

test('assigns every person as sender (from)', () => {
  expect(getVectors(people, rules).map(vector => vector.from))
    .toEqual(expect.arrayContaining(people.map(person => person.email)))
})

test('assigns every person as receiver (to)', () => {
  expect(getVectors(people, rules).map(vector => vector.to))
    .toEqual(expect.arrayContaining(people.map(person => person.email)))
})

test('does not assign anyone as sender (from) twice', () => {
  expect(isUnique(getVectors(people, rules).map(vector => vector.from))).toBeTruthy()
})

test('does not assign anyone as receiver (to) twice', () => {
  expect(isUnique(getVectors(people, rules).map(vector => vector.to))).toBeTruthy()
})

test('does not assign anyone to himself', () => {
  getVectors(people, rules).forEach(vector => {
    expect(vector.from).not.toEqual(vector.to)
  })
})

test('does not break any inclusion rules', () => {
  getVectors(people, rules).forEach(vector => {
    rules.forEach(rule => {
      if (vector.from === rule.from) {
        if (rule.type === 'inclusion') {
          expect(vector.to).toEqual(rule.to)
        }
      }
    })
  })
})

test('does not break any exclusion rules', () => {
  getVectors(people, rules).forEach(vector => {
    rules.forEach(rule => {
      if (vector.from === rule.from) {
        if (rule.type === 'exclusion') {
          expect(vector.to).not.toEqual(rule.to)
        }
      }
    })
  })
})

test('fails after 10 attempts', () => {
  expect(getVectors(people, rulesFail)).toEqual(-1)
})
