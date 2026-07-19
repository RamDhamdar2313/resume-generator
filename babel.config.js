export default {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: '22'
        },
        modules: false
      }
    ],
    ['@babel/preset-react', { runtime: 'automatic' }]
  ]
};
