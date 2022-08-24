import swaggerJSDoc from 'swagger-jsdoc'
import path from 'path'
const options = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: '项目名称',
      version: '1.0.0',
      description: ` 首次尝试swagger`,
    },
  },
  apis: [path.join(__dirname, '/router/*.ts')],
}

export default swaggerJSDoc(options)
