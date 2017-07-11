module.exports = {
    extends: "airbnb-base",
    env: {
        "node": true,
        "es6": true,
    },
    globals: {
        "angular": true,
    },
    rules: {
        "indent": [2, 4],
        "no-use-before-define": ["error", { "functions": false, "classes": true }],
        "import/no-extraneous-dependencies": ["error", { "peerDependencies": true}],
        "no-underscore-dangle": ["error", { "allow": ["_id"] }],
    }
}
