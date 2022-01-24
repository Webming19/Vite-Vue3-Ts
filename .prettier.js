module.exports = {
  tabWidth: 2,
  jsxSingleQuote: true,
  // Jsx的<>括号是否同一行
  jsxBracketSameLine: true,
  // 是否在对象属性添加空格
  bracketSpacing: true,
  // 指定代码换行的行长度。单行代码宽度超过指定的最大宽度，将会换行，如果都不想换，可以添加 "proseWrap": "never"
  // "printWidth": 160,
  // 是否在语句末尾打印分号
  semi: true,
  // 是否使用单引号
  singleQuote: true,
  // 尾行逗号
  trailingComma: "es5",
  overrides: [
    {
      files: "*.json",
      options: {
        printWidth: 200,
      },
    },
  ],
  arrowParens: "always",
};