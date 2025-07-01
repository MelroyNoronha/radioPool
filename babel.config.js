module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx'],
        alias: {
          '@/src': './src',
          '@/components': './src/components',
          '@/navigators': './src/navigators',
          '@/screens': './src/screens',
        },
      },
    ],
  ],
};
