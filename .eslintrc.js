module.exports = {
    "parser": "babel-eslint",
    "plugins": [
    ],
    "env": {
        "browser": true,
        "node": true,
        "jasmine": true,
        "es6": true,
        "jest": true
    },
    "parserOptions": {
        "ecmaFeatures": {
            "arrowFunctions": true,
            "blockBindings": true,
            "classes": true,
            "defaultParams": true,
            "destructuring": true,
            "forOf": true,
            "generators": false,
            "modules": true,
            "objectLiteralComputedProperties": true,
            "objectLiteralDuplicateProperties": false,
            "objectLiteralShorthandMethods": true,
            "objectLiteralShorthandProperties": true,
            "restParams": true,
            "spread": true,
            "superInFunctions": true,
            "templateStrings": true
        }
    },
    "rules": {
        "no-debugger": 1,
        // Possible errors
        "comma-dangle": [
            2,
            "never"
        ],
        "no-cond-assign": [
            2,
            "always"
        ],
        "no-constant-condition": 2,
        "no-control-regex": 2,
        "no-dupe-args": 2,
        "no-dupe-keys": 2,
        "no-duplicate-case": 2,
        "no-empty-character-class": 2,
        "no-empty": 2,
        "no-extra-boolean-cast": 0,
        "no-extra-parens": [
            2,
            "functions"
        ],
        "no-extra-semi": 2,
        "no-func-assign": 2,
        "no-inner-declarations": 2,
        "no-invalid-regexp": 2,
        "no-irregular-whitespace": 2,
        "no-negated-in-lhs": 2,
        "no-obj-calls": 2,
        "no-regex-spaces": 2,
        "no-sparse-arrays": 2,
        "no-unreachable": 2,
        "use-isnan": 2,
        "valid-typeof": 2,
        "no-unexpected-multiline": 0,
        // Best Practices
        "block-scoped-var": 2,
        "complexity": [
            2,
            50
        ],
        "curly": [
            2,
            "multi-line"
        ],
        "default-case": 2,
        "dot-notation": [
            2,
            {
                "allowKeywords": true,
                "allowPattern": "^([a-z]+(_[a-z]+)+)|[A-Z]+|[A-Z]{1}[a-z]+$"
            }
        ],
        "eqeqeq": 2,
        "guard-for-in": 2,
        "no-alert": 1,
        "no-caller": 2,
        "no-case-declarations": 2,
        "no-div-regex": 0,
        "no-else-return": 2,
        "no-eq-null": 2,
        "no-eval": 2,
        "no-extra-bind": 2,
        "no-fallthrough": 2,
        "no-floating-decimal": 2,
        "no-implied-eval": 2,
        "no-iterator": 2,
        "no-labels": 2,
        "no-lone-blocks": 2,
        "no-loop-func": 2,
        "no-multi-str": 2,
        "no-native-reassign": 2,
        "no-new": 2,
        "no-new-func": 2,
        "no-new-wrappers": 2,
        "no-octal": 2,
        "no-octal-escape": 2,
        "no-param-reassign": 0,
        "no-proto": 2,
        "no-redeclare": 2,
        "no-script-url": 2,
        "no-self-compare": 2,
        "no-sequences": 2,
        "no-unused-expressions": [
            2,
            {
                "allowShortCircuit": true,
                "allowTernary": false
            }
        ],
        "no-useless-call": 2,
        "no-with": 2,
        "radix": 2,
        "wrap-iife": [
            2,
            "outside"
        ],
        "yoda": 2,
        // ES2015
        "arrow-parens": 0,
        "arrow-spacing": [
            2,
            {
                "before": true,
                "after": true
            }
        ],
        "constructor-super": 2,
        "no-class-assign": 2,
        "no-const-assign": 2,
        "no-this-before-super": 0,
        "no-var": 2,
        "object-shorthand": [
            2,
            "always"
        ],
        "prefer-arrow-callback": 2,
        "prefer-const": 2,
        "prefer-spread": 2,
        "prefer-template": 2,
        // Strict Mode
        "strict": [
            2,
            "never"
        ],
        // Variables
        "no-catch-shadow": 2,
        "no-delete-var": 2,
        "no-label-var": 2,
        "no-shadow-restricted-names": 2,
        "no-shadow": 2,
        "no-undef-init": 2,
        "no-undef": 2,
        "no-unused-vars": 2,
        // Node.js
        "callback-return": 2,
        "no-mixed-requires": 2,
        "no-path-concat": 2,
        "no-sync": 2,
        "handle-callback-err": 1,
        "no-new-require": 2,
        // Stylistic
        "array-bracket-spacing": [
            2,
            "never",
            {
                "singleValue": false,
                "objectsInArrays": false,
                "arraysInArrays": false
            }
        ],
        "newline-after-var": 0,
        "brace-style": [
            2,
            "1tbs"
        ],
        "comma-spacing": [
            2,
            {
                "before": false,
                "after": true
            }
        ],
        "comma-style": [
            2,
            "last"
        ],
        "computed-property-spacing": [
            2,
            "never"
        ],
        "eol-last": 2,
        "func-names": 1,
        "func-style": [
            2,
            "declaration",
            {
                "allowArrowFunctions": true
            }
        ],
        "indent": [
            2,
            4,
            {
                "SwitchCase": 1
            }
        ],
        "linebreak-style": 0,
        "max-len": [
            2,
            200,
            4,
            {
                "ignoreUrls": true,
                "ignoreComments": false,
                "ignorePattern": "^\s*(const|let|var)\s+\w+\s+\=\s+\/.*\/(|i|g|m|ig|im|gm|igm);?$"
            }
        ],
        "max-nested-callbacks": [
            2,
            4
        ],
        "new-parens": 2,
        "no-array-constructor": 2,
        "no-lonely-if": 2,
        "no-mixed-spaces-and-tabs": 2,
        "no-multiple-empty-lines": [
            2,
            {
                "max": 2,
                "maxEOF": 1
            }
        ],
        "no-nested-ternary": 2,
        "no-new-object": 2,
        "no-spaced-func": 2,
        "no-trailing-spaces": 2,
        "no-unneeded-ternary": 2,
        "object-curly-spacing": [
            2,
            "always"
        ],
        "one-var": [
            2,
            "never"
        ],
        "padded-blocks": [
            2,
            "never"
        ],
        "quotes": [
            1,
            "single",
            "avoid-escape"
        ],
        "semi-spacing": [
            2,
            {
                "before": false,
                "after": true
            }
        ],
        "semi": [
            2,
            "always"
        ],
        "keyword-spacing": 2,
        "space-before-blocks": 2,
        "space-before-function-paren": [
            2,
            {
                "anonymous": "always",
                "named": "never"
            }
        ],
        "space-in-parens": [
            2,
            "never"
        ],
        "space-infix-ops": 2,
        "space-unary-ops": [
            2,
            {
                "words": true,
                "nonwords": false
            }
        ],
        "spaced-comment": [
            2,
            "always",
            {
                "exceptions": [
                    "-",
                    "+"
                ],
                "markers": [
                    "=",
                    "!"
                ]
            }
        ],

        // Legacy
        "max-depth": [
            0,
            4
        ],
        "max-params": [
            2,
            7
        ],
        "no-bitwise": 2
    },
    "globals": {
        "$": true,
        "ga": true,
        "__ENV__": true,
        "__DEVTOOLS__": true,
        "PUBLIC_URL": true
    }
};
