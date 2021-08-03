'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Pessoas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pessoas.hasMany(models.Turmas, { foreignKey: "docente_id" })
      Pessoas.hasMany(models.Matriculas, {
        foreignKey: "estudante_id",
        scope: {
          status: "confirmado"
        },
        as: "aulasMatriculadas"
      })
    }
  };
  Pessoas.init({
    nome: {
      type: DataTypes.STRING,
      validate: {
        validar: dados => {
          if (dados.length < 3) {
            throw new Error("Nome deve ter mais de 3 caracteres")
          } else if (dados.length > 32) {
            throw new Error("Nome deve ter menos de 32 caracteres")
          }
        }
      }
    },
    ativo: DataTypes.BOOLEAN,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: "Dado do Tipo Email Inválido"
        },
      }
    },
    role: {
      type: DataTypes.STRING,
      validate: {
        isIn: {
          args: [["estudante", "docente"]],
          msg: "Dado Role Inválido"
        }
      }
    }
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Pessoas',
    defaultScope: {
      where: { ativo: true }
    },
    scopes: {
      todas: {
        where: {},
      }
    },
    hooks: {
      beforeValidate: (pessoa, options) => pessoa.role = pessoa.role.toLowerCase()
    }
  });
  return Pessoas;
};