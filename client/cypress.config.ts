import { defineConfig } from 'cypress'

export default defineConfig({

  e2e: {
    'baseUrl': 'http://localhost:4200',

    // OPCIONAL: INCLUI COMANDOS PERSONALIZADOS
    supportFile: './cypress/support/e2e.ts'
  },


})