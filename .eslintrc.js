const MAX_COMPLEXITY = 7;
const MAX_PARAMETERS = 3;

// List of parameter names (false = excluded from checking)
const PARAMETER_NAMES = {
  args: false,
  props: false,
  params: false,
  acc: false,
  env: false,
  func: false,
  db: false,
  res: false,
  req: false,
  opts: false,
  next: false,
  param: false,
  refObject: false,
  num: false,
  fn: false,
  function: false,
  msg: false,
  doc: false,
  ref: false,
  arg: {
    argument: true,
  },
};

module.exports = {
  parser: '@typescript-eslint/parser',
  root: true,
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:fp/recommended',
    'plugin:unicorn/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'plugin:import/typescript',
    'plugin:sonarjs/recommended',
    'plugin:promise/recommended',
    'plugin:jest-formatting/recommended',
    'plugin:jest/recommended',
    'plugin:jest/style',
  ],
  plugins: [
    'fp',
    'prettier',
    'jsx-a11y',
    'unicorn',
    'jsdoc',
    'import',
    'promise',
    'sonarjs',
    'eslint-plugin-import-helpers',
    'array-plural',
    'jest',
    'jest-formatting',
  ],
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    /**
     * Unicorn rules.
     * Using plugin:unicorn/recommended.
     */
    'unicorn/no-fn-reference-in-iterator': 'off',
    'unicorn/explicit-length-check': 'warn',
    'unicorn/no-process-exit': 'warn',
    'unicorn/catch-error-name': 'off',
    'unicorn/no-reduce': 'off',
    'unicorn/no-array-reduce': 'off',
    'unicorn/no-array-callback-reference': 'off',
    'unicorn/no-array-for-each': 'off',
    'unicorn/no-null': 'off',
    'unicorn/no-useless-undefined': 'warn',
    'unicorn/consistent-function-scoping': 'warn',
    'unicorn/filename-case': [
      'error',
      {
        case: 'camelCase',
        ignore: ['rabbitMQClient.ts'], // TODO: Use Regex
      },
    ],
    'unicorn/prevent-abbreviations': [
      'warn',
      {
        replacements: PARAMETER_NAMES,
      },
    ],
    
    /**
     * Prettier rules.
     * Using plugin:prettier/recommended.
     */
    'prettier/prettier': [
      'error',
      {
        printWidth: 100,
        tabWidth: 2,
        singleQuote: true,
        trailingComma: 'all',
        bracketSpacing: true,
        semi: true,
        useTabs: false,
        arrowParens: 'always',
      },
    ],
    
    /**
     * Typescript rules.
     * Using plugin:@typescript-eslint/recommended.
     */
    
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-magic-numbers': 'off',
    '@typescript-eslint/explicit-function-return-type': [
      'warn',
      {
        allowExpressions: false,
        allowTypedFunctionExpressions: true,
        allowHigherOrderFunctions: true,
        allowDirectConstAssertionInArrowFunctions: true,
        allowConciseArrowFunctionExpressionsStartingWithVoid: true,
      },
    ],
    '@typescript-eslint/no-use-before-define': ['error'],
    '@typescript-eslint/member-delimiter-style': ['error'],
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-type-alias': [
      'error',
      {
        allowAliases: 'always',
      },
    ],
    '@typescript-eslint/no-inferrable-types': [
      'warn',
      {
        ignoreProperties: true,
        ignoreParameters: true,
      },
    ],
    
    /**
     * Fp rules.
     * Using plugin:fp/recommended.
     */
    'fp/no-unused-expression': 'off',
    'fp/no-nil': 'off',
    'fp/no-throw': 'off',
    'fp/no-let': 'warn',
    'fp/no-this': 'off',
    'fp/no-class': 'off',
    'fp/no-mutation': 'off',
    'fp/no-rest-parameters': 'off',
    'fp/no-mutating-methods': 'off',
    
    /**
     * Sonarjs rules.
     * Using plugin:sonarjs/recommended.
     */
    'sonarjs/cognitive-complexity': ['warn', MAX_COMPLEXITY],
    'sonarjs/no-duplicate-string': 'off',
    'sonarjs/prefer-immediate-return': 'error',
    
    'no-use-before-define': 'off',
    'import/no-unresolved': ['error', { caseSensitive: true }],
    'import-helpers/order-imports': [
      'error',
      {
        newlinesBetween: 'always',
        groups: ['module', '/^@shared/', ['parent', 'sibling', 'index']],
        alphabetize: { order: 'asc', ignoreCase: true },
      },
    ],
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: false,
      },
    ],
    'arrow-body-style': ['error', 'as-needed'],
    'arrow-parens': ['error', 'always'],
    curly: 'error',
    'no-else-return': 'error',
    'no-nested-ternary': 'error',
    'no-unneeded-ternary': 'error',
    'func-style': ['error', 'expression'],
    'default-param-last': ['error'],
    'max-params': ['error', MAX_PARAMETERS],
    'prefer-const': [
      'error',
      {
        destructuring: 'any',
        ignoreReadBeforeAssign: false,
      },
    ],
    'prefer-destructuring': [
      'error',
      {
        array: true,
        object: true,
      },
      {
        enforceForRenamedProperties: true,
      },
    ],
    'no-return-assign': 'error',
    'promise/prefer-await-to-then': 'error',
    'promise/prefer-await-to-callbacks': 'error',
    'require-await': 'error',
    'default-case': 'error',
    'default-case-last': 'error',
    'no-unreachable': 'error',
    'no-useless-rename': 'error',
    'object-shorthand': 'error',
    'max-lines-per-function': ['warn', { max: 42, skipBlankLines: true, skipComments: true }],
    complexity: ['warn', MAX_COMPLEXITY],
    'eol-last': ['error', 'always'],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: ['const', 'let'], next: '*' },
      { blankLine: 'any', prev: ['const', 'let'], next: ['const', 'let'] },
    ],
    
    'no-magic-numbers': 'off',
    'no-unused-expressions': 'error',
    'no-case-declarations': 'error',
    'import/no-default-export': 'error',
    'array-plural/array-plural': ['error', { allows: [] }],
    
    /**
     * JSdoc rules.
     */
    'jsdoc/check-alignment': 'error',
    'jsdoc/require-throws': 'error',
    'jsdoc/check-indentation': 'error',
    'jsdoc/check-examples': 'warn',
    'jsdoc/check-param-names': [
      'warn',
      {
        checkDestructured: false,
      },
    ],
    'jsdoc/check-syntax': 'warn',
    'jsdoc/check-tag-names': 'warn',
    'jsdoc/check-types': 'warn',
    'jsdoc/no-undefined-types': 'warn',
    'jsdoc/require-description': 'warn',
    'jsdoc/require-description-complete-sentence': 'warn',
    'jsdoc/require-example': 'off',
    'jsdoc/require-hyphen-before-param-description': 'warn',
    'jsdoc/require-param': 'off',
    'jsdoc/require-param-description': 'warn',
    'jsdoc/require-param-name': 'warn',
    'jsdoc/require-param-type': 'off',
    'jsdoc/require-returns': 'off',
    'jsdoc/require-returns-check': 'warn',
    'jsdoc/require-returns-description': 'warn',
    'jsdoc/require-returns-type': 'off',
    'jsdoc/valid-types': 'warn',
    
    /**
     * Jest rules.
     * Using jest-formatting/recommended.
     * Using jest/recommended.
     */
    'jest/no-deprecated-functions': 'off',
    'jest/no-mocks-import': 'off',
    'jest/no-alias-methods': 'error',
    'jest/require-top-level-describe': 'error',
    'jest/expect-expect': [
      'error',
      {
        assertFunctionNames: ['expect', 'testRunner'],
      },
    ],
    'jest/consistent-test-it': [
      'error',
      {
        fn: 'it',
        withinDescribe: 'it',
      },
    ],
    'jest/valid-title': [
      'error',
      {
        mustMatch: { it: 'Should' },
      },
    ],
    'jest-formatting/padding-around-describe-blocks': ['error', 1],
    'jest-formatting/padding-around-test-blocks': ['error', 1],
  },
  
  // Specific files overwrites
  overrides: [
    {
      // Test files should not adhere to all rules
      files: ['**/tests/**/*.ts', '**/*.test.{js,ts}', '**/test.config.{js,ts}'],
      rules: {
        'max-lines-per-function': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-magic-numbers': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },
  ],
  ignorePatterns: [
    '.eslintrc.js',
    'build',
    'coverage',
    'dist',
    'jest.config.js',
    'jest.setup.js',
    'nodemon.json',
    'package.json',
    'public',
    'scripts',
    'tsconfig.eslint.json',
    'tsconfig.json',
    'webpack.config.js',
  ],
};
