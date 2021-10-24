const {
  override,
  addWebpackAlias,
  addLessLoader,
  addPostcssPlugins,
  fixBabelImports
} = require('customize-cra')
const px2rem = require('postcss-px2rem')
const path = require('path')

module.exports = {
  webpack: override(
    addWebpackAlias({
      '@': path.resolve(__dirname, 'src/')
    }),
    addLessLoader(),
    addPostcssPlugins([
      px2rem({
        remUnit: 75
      })
    ]),
    fixBabelImports('import', {
      libraryName: 'antd-mobile',
      libraryDirectory: 'es/components',
      style: false
    })
  )
}
