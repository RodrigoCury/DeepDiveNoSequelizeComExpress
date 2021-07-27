const database = require('../models')

class PessoaControler {
    static async getAll() {
        return await database.Pessoas.findAll()
    }
}

module.exports = PessoaControler