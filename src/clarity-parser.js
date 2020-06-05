// used https://gist.github.com/jameslaneconkling/24acb8ea326a1c8fdf64225aa7d0f44e as the starting point
// many thanks to @jameslaneconkling

const rules = [
  { type: 'comment', regex: /^;;.*/ },
  { type: 'principal_trait', regex: /^'[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+/ },
  { type: 'principal_contract', regex: /^'[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+/ },
  { type: 'principal_address', regex: /^'[a-zA-Z0-9-]+/ },
  { type: 'space', regex: /^\s/ },
  { type: 'l_paren', regex: /^\(/ },
  { type: 'r_paren', regex: /^\)/ },
  { type: 'bool', regex: /^true|^false/ },
  { type: 'number_unsigned', regex: /^u[0-9\.]+/ },
  { type: 'number_signed', regex: /^[0-9\.]+/ },
  { type: 'string', regex: /^".*?"/ },
  { type: 'variable', regex: /^[^\s\(\)]+/ } // take from the beginning 1+ characters until you hit a ' ', '(', or ')'
]


const tokenizer = rules => input => {
  for (let i = 0; i < rules.length; i += 1) {
    let tokenized = rules[i].regex.exec(input)
    if (tokenized) {
      console.log(i, rules[i].type, tokenized[0], input.substring(0, 10))
      return {
        value: tokenized[0],
        type: rules[i].type,
        rest: input.slice(tokenized[0].length)
      }
    }
  }
  throw new Error(`no matching tokenize rule for ${JSON.stringify(input)}`)
}


const parser = tokenize => function parse(input, ast, parents = []) {
  if (input === '') {
    return ast
  }

  const { value, type, rest } = tokenize(input)
  const token = {
    value,
    type,
  }

  if (type === 'space') {
    // do nothing
    return parse(rest, ast, parents)
  } else if (type === 'principal_trait') {
    ast.push(token)
    return parse(rest, ast, parents)
  } else if (type === 'principal_contract') {
    ast.push(token)
    return parse(rest, ast, parents)
  } else if (type === 'principal_address') {
    ast.push(token)
    return parse(rest, ast, parents)
  } else if (type === 'comment') {
    ast.push(token)
    return parse(rest, ast, parents)
  } else if (type === 'variable') {
    ast.push(token)
    return parse(rest, ast, parents)
  } else if (type === 'number_signed') {
    ast.push(token)
    return parse(rest, ast, parents)
  } else if (type === 'number_unsigned') {
    ast.push(token)
    return parse(rest, ast, parents)
  } else if (type === 'bool') {
    ast.push(token)
    return parse(rest, ast, parents)
  } else if (type === 'string') {
    // ast.push(token.replace(/(^"|"$)/g, "'"))
    token.value = token.value.replace(/(^"|"$)/g, '')
    ast.push(token)
    return parse(rest, ast, parents)
  } else if (type === 'l_paren') {
    parents.push(ast)
    return parse(rest, [], parents)
  } else if (type === 'r_paren') {
    const parentAst = parents.pop()
    if (parentAst) {
      parentAst.push({value: ast, type: 'block'})
      return parse(rest, parentAst, parents)
    }

    return parse(rest, ast, parents)
  }

  throw new Error(`Missing parse logic for rule ${JSON.stringify(type)}`)
}

const generate = (parsed_tree, level = 0) => {
  let output = ''
  parsed_tree.forEach((token, index) => {
    const sep = (index === parsed_tree.length - 1) ? '' : ((level === 0) ? '\n' : ' ')
    switch (token.type) {
      case 'block':
        output += `(${generate(token.value, level + 1)})${sep}`
        break;
      case 'principal_trait':
      case 'principal_contract':
      case 'principal_address':
      case 'bool':
      case 'number_unsigned':
      case 'number_signed':
        output += token.value + sep
        break;
      case 'string':
        output += `"${token.value}"${sep}`
        break;
      case 'variable':
        output += token.value + sep
        break;
      case 'comment':
        // skip
        break;
      default:
        console.log(`no case for ${token.type} ${token} ================`);
    }
  })
  return output
}

const parse = (input) => {
  return parser(tokenizer(rules))(input, [])
}

module.exports = {
  parse,
  generate,
}