export function generateRandomData(numData) {
  const data = []

  for (let i = 0; i < numData; i++) {
    const id = i + 1 // generate a random ID between 0 and 9999
    const name = generateRandomName() // generate a random name
    const age = Math.floor(Math.random() * 60)
    const gender = Math.floor(Math.random() * 10) % 2 === 1 ? 'Male' : 'Female'
    data.push({
      id,
      name,
      age,
      gender,
    }) // add the ID and name to the data array as an object
  }

  return data
}

export function generateRandomName() {
  const firstNames = [
    'Alice',
    'Bob',
    'Charlie',
    'David',
    'Emily',
    'Frank',
    'Gina',
    'Haley',
    'Isaac',
    'John',
  ]
  const lastNames = [
    'Smith',
    'Johnson',
    'Williams',
    'Jones',
    'Brown',
    'Davis',
    'Miller',
    'Wilson',
    'Moore',
    'Taylor',
  ]
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
  return `${firstName} ${lastName}`
}

export const dummyData = generateRandomData(1000)
