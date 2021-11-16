module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  env: {
    development: {
      plugins: ['@emotion']
    },
    e2e: {
      plugins: ['@emotion', 'istanbul']
    }
  }
}