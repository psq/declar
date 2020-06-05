const fs = require('fs')
const { generate, parse } = require('./src/clarity-parser')

// to run, `node declar contracts/swapr-registry.clar contracts/swapr-registry.min.clar``

if (process.argv[2] !== undefined && process.argv[3] !== undefined) {
  const input = fs.readFileSync(process.argv[2]).toString()

  const parsed_tree = parse(input)
  console.log(JSON.stringify(parsed_tree, null, 3))

  const output = generate(parsed_tree)
  console.log(output)

  fs.writeFileSync(process.argv[3], output)
}
