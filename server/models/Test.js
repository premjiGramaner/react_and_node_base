module.exports = (sequelize, DataTypes) => {
    const Test = sequelize.define('Test', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: 'test',
        freezeTableName: false,
        timestamps: false
    });


    Test.addSampleData = function (name) {
        return this.create({ name: name });
    }

    Test.getSampleData = function () {
        return this.findAll({ attributes: ['id', 'name'] });
    }

    Test.updateSampleData = function (id, name) {
        return this.update({ name: name }, {
            where: {
                id
            }
        });
    }

    Test.deleteSampleData = function (id, name) {
        return this.destroy({
            where: {
                id
            }
        });
    }

    return Test;
}