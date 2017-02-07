module.exports = {
  "parser": "babel-eslint",
  "plugins": [
    "babel"
  ],
  "rules": {
    "import/no-extraneous-dependencies": 0,
    "babel/generator-star-spacing": 1,
    "babel/new-cap": 0,
    "babel/array-bracket-spacing": 0,
    "babel/object-shorthand": 0,
    "babel/no-await-in-loop": 0,
    "babel/flow-object-type": 0,
    "babel/func-params-comma-dangle": 0,
    "generator-star-spacing": 0,
    "new-cap": 1,
    "array-bracket-spacing": 1,
    "object-shorthand": 1,
    "camelcase": 0,
    "import/no-unresolved": [2, { "ignore": ["^[/shared]"] }],
    "import/imports-first": [2, { "ignore": ["^[/shared]"] }],
  },
  "extends": "airbnb-base",
  "env": {
    mocha: true,
    jest: true,
  }
};
