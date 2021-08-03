const database = require('../models')
const Op = require('sequelize').Op

// DAO
class TurmaControler {
    static async getAll(dataInicial = undefined, dataFinal = undefined) {
        const where = {}

        if (dataInicial && !dataFinal) {
            where.data_inicio = {
                [Op.gte]: dataInicial
            }
        } else if (dataInicial && dataFinal) {
            where.data_inicio = {
                [Op.gte]: dataInicial,
                [Op.lte]: dataFinal
            }
        } else if (!dataInicial && dataFinal) {
            where.data_inicio = {
                [Op.lte]: dataFinal
            }
        }

        return await database.Turmas.findAll({ where })
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