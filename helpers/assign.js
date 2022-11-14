function randomize(arrayIn) {
  let arrayOut = []
  for(let i in arrayIn) {
      let randomIndex = Math.floor(Math.random() * arrayIn.length)
      while(arrayOut.includes(arrayIn[randomIndex])) {
        randomIndex = Math.floor(Math.random() * arrayIn.length)
      }
      arrayOut[i] = arrayIn[randomIndex]
  }
  return arrayOut
}

export function randomizePeople(people) {
  let randomizedPeople = randomize(people)
  randomizedPeople = randomize(randomizedPeople)
  randomizedPeople = randomize(randomizedPeople)
  randomizedPeople = randomize(randomizedPeople)
  return randomizedPeople
}

export function getVectors(people, rules) {
  let vectors = []

  const inclusions = rules.filter(rule => rule.type === 'inclusion')
  const exclusions = rules.filter(rule => rule.type === 'exclusion')

  inclusions.forEach(inclusion => {
    vectors.push({ from: inclusion.from, to: inclusion.to })
  })

  let excluded = false
  let matched = false
  let iterations = 0
  let person2
  let index2

  people.forEach((person1, index1) => {
    matched = false
    iterations = 0
    if (!(vectors.some(vector => vector.from === person1.email))) {
      if (index1 === (people.length - 1)) {
        index2 = 0
      } else {
        index2 = parseInt(index1) + 1
      }
      while (!(matched)) {
        if (iterations < (people.length * 2)) {
          excluded = false
          person2 = people[index2]
          if (person2 === person1) {
            if (index2 >= (people.length - 1)) {
              index2 = 0
            } else {
              index2++
            }
            iterations++
          } else if (vectors.some(vector => vector.to === person2.email)) {
            if (index2 >= (people.length - 1)) {
              index2 = 0
            } else {
              index2++
            }
            iterations++
          } else {
            for (const exclusion of exclusions) {
              if (exclusion.from === person1.email && exclusion.to === person2.email) {
                excluded = true
                break
              }
            }
            if (excluded) {
              if (index2 >= (people.length - 1)) {
                index2 = 0
              } else {
                index2++
              }
              iterations++
            } else {
              vectors.push({ from: person1.email, to: person2.email })
              matched = true
            }
          }
        }
      }
    }
  })
  return vectors
}
