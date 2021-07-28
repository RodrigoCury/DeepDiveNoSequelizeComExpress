const database = require('../models')

// DAO
class NivelControler {
    static async getAll() {
        return await database.Niveis.findAll()
    }

    static async getOne(id) {
        return await database.Niveis.findOne({
            where: { id },
            raw: true
        })
    }

    static async createOne(nivel) {
        return await database.Niveis.create(nivel)
    }

    static async updateOne(id, nivel) {
        return await database.Niveis.update(nivel, {
            where: { id }
        })
    }

    static async deleteOne(id) {
        await database.Niveis.destroy({
            where: {
                id: id
            }
        })
    }
}

module.exports = NivelControler