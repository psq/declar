# A simple minizer for Clarity

__Declar__, somehting to make your Clarity contract less clear, but smaller, so it will cost less.
Consider not using to make your deployed contract less nebulous, or publish the non minimized version.
Many people will forever thank you!

### Rules
This is work in progress, as it currently implements removing comments and compressing spaces
however the basis to do smarter things is already there as the full syntactic tree is available
and will make implementing the rest fairly straightforward.

It can already shave 40% from the swapr contract, which is the biggest Clarity contract I had available

- [x] remove comments
- [x] remove unnecessary blank space
- [ ] do not rename `define-public` and `define-read-only` function names
- [ ] rename constants
- [ ] rename parameters
- [ ] rename variable names in `let`
- [ ] rename `define-data-var` variable names
- [ ] remove unused constants
- [ ] remove unused `define-private` methods
- [x] do not rename all strings and numbers
- [x] do not rename principals
- [ ] do not rename tuple keys as they might be returned (unless can figure out this is the case)

### How to run declar
You just need to pass the contract path, and the path for outputing the minimized contract

For example:
```
node declar.js contracts/my-token.clar contracts/my-token-min.clar
```

### Other plans

- [ ] make it a webapp where you can paste your clarity contract
- [ ] add options to control how aggressive the minization shoul be, i.e. just spaces and comments, rename internal names, rename variables, ...
- [ ] tests will be included

### Bonuses included

The Clarity parser, implemented in plain javascript, should be usable as a standalone module.  npm version should be available
soon.  For now, you can require using the github url using
```
npm i github:psq/swapr
```

###
If you try it and the minized contract does not work or does not look correct, submit a PR, or crate an issue.  Thanks!