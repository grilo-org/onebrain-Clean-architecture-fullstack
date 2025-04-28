module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['ci', 'chore', 'docs', 'feat', 'bugfix', 'hotfix', 'perf', 'refactor', 'revert', 'style', 'release', 'merge'],
    ],
  },
}
