import Ajv from 'ajv'
import ajvLocale from '@socketkit/ajv-locale-code'
import ajvSemver from '@socketkit/ajv-semver'
import ajvCurrencyCode from '@socketkit/ajv-currency-code'

const ajv = new Ajv()
ajvLocale(ajv)
ajvSemver(ajv)
ajvCurrencyCode(ajv)

export default ajv
