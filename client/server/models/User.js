module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userID: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        isTermAgreed: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        enterprise: {
            type: DataTypes.STRING,
            allowNull: true
        },
        created_on: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updated_on: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        tableName: 'user',
        freezeTableName: false,
        timestamps: false
    });

    User.getUserById = function (userID) {
        return this.findOne({ where: { userID } });
    }

    User.createUserItem = function (Obj) {
        return this.create(Obj);
    }

    User.updateUserItem = function (userID, isTermAgreed, updated_on) {
        return this.update({ isTermAgreed, updated_on }, { where: { userID } });
    }

    return User;
}