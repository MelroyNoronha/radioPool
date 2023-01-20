module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-native-base64|react-native-app-auth|react-native-encrypted-storage|@react-navigation|redux-persist)/)',
  ],
};
