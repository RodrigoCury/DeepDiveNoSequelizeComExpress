const database = require('../models')

// DAO
class TurmaControler {
    static async getAll() {
        return await database.Turmas.findAll()
    }

    static async getOne(id) {
        return await database.Turmas.findOne({
            where: { id },
            raw: true
        })
    }

    static async createOne(turma) {
        return await database.Turmas.create(Object.assign({}, turma, { data_inicio: Date.now() }))
    }

    static async updateOne(id, turma) {
        return await database.Turmas.update(turma, {
            where: { id }
        })
    }

    static async deleteOne(id) {
        await database.Turmas.destroy({
            where: {
                id: id
            }
        })
    }
}

module.exports = TurmaControler