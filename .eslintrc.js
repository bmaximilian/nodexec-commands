/**
 * Created on 01.09.18.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

process.chdir(__dirname);
process.env.NODE_ENV = process.env.NODE_ENV ||'development';

module.exports = {
    root: true,
    parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
        },
    },
    env: {
        node: true,
        mocha: true,
    },
    plugins: [
        'chai-friendly',
    ],
    extends: ['airbnb-base'],
    rules: {
        'import/extensions': ['error', 'always', {
            'js': 'never',
        }],
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 1,
        // allow console during development
        'no-console': 0,
        'no-trailing-spaces': 'error',
        'no-param-reassign': [2, { 'props': false }],
        'no-unused-expressions': 0,
        'chai-friendly/no-unused-expressions': 2,
        'no-unused-vars': ['error',
            {
                args: 'none',
                varsIgnorePattern: '^_[1-9]?$',
            },
        ],
        'class-methods-use-this': 0,
        quotes: [
            'error',
            'single',
        ],
        semi: [
            'error',
            'always',
        ],
        'indent': ['error', 4, {
            MemberExpression: 0,
            SwitchCase: 1,
        }],
        'no-multiple-empty-lines': ['error', { 'max': 1, 'maxBOF': 1 }],
        'valid-jsdoc': 'error',
        'max-len': ['error', { 'code': 120 }],
        'require-jsdoc': ['error', {
            require: {
                FunctionDeclaration: true,
                MethodDefinition: true,
                ClassDeclaration: true,
                ArrowFunctionExpression: true,
                FunctionExpression: true,
            },
        }],
        'prefer-destructuring': ['error', {
            VariableDeclarator: {
                array: true,
                object: true
            },
            AssignmentExpression: {
                array: false,
                object: false,
            },
        }, {
            'enforceForRenamedProperties': false
        }]
    },
};
