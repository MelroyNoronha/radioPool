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
          '@/utils': './src/utils',
          '@/hooks': './src/hooks',
        },
      },
    ],
    [
      'module:react-native-dotenv',
      {
        envName: 'APP_ENV',
        moduleName: '@env',
        path: '.env',
        blocklist: null,
        allowlist: null,
        safe: true,
        allowUndefined: false,
      },
    ],
  ],
};
