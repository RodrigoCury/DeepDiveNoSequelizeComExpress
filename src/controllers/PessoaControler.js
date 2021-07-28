const database = require('../models')

// DAO
class PessoaControler {
    static async getAll() {
        return await database.Pessoas.findAll()
    }

    static async getOne(id) {
        return await database.Pessoas.findOne({
            where: { id },
            raw: true
        })
    }

    static async createOne(pessoa) {
        await database.Pessoas.create({
            nome: pessoa.nome,
            ativo: pessoa.ativo,
            email: pessoa.email,
            role: pessoa.role,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        })
    }

    static async updateOne(id, pessoa) {
        return await database.Pessoas.update(
            pessoa
            , {
                where: {
                    id: id
                }
            })
    }

    static async deleteOne(id) {
        await database.Pessoas.destroy({
            where: {
                id: id
            }
        })
    }
}

module.exports = PessoaControler