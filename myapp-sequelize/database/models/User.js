/*modelo es un modulo por lo tanto se lo debe exportar una funcion, donde los modelos son las funciones anominas*/
module.exports = function (sequelize, dataTypes) {
    
    // alias
    let alias = "User";//Este alias se busca como nombre en de la tabla en plural dentro de la base de datos.

    // columnas
    let cols = { //es un objeto literal con prop que tienen que ver con el nombre de las columnas de mi tabla, y se mapea cada una de las tablas
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        created_at : {
            type: dataTypes.DATE,
        },
        updated_at: {
            type: dataTypes.DATE,
        },
        name: {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING
        },
        password: {
            type: dataTypes.STRING
        },
        remember_token: {
            type: dataTypes.STRING
        }

    }
    // confi de tabla 
    let config ={// este es un obj literak que recibe propiedades
        tableName: "users",
        timestamps: true, //??
        underscored: true //es este caso es true porque se usa Snalcases 

    }
    // definicion de modelo 
    const User = sequelize.define (alias,cols,config); 

    // relaciones
 
    // retorno del modelo
    return User;

}