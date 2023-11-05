
/*modelo es un modulo por lo tanto se lo debe exportar una funcion, donde los modelos son las funciones anominas*/
module.exports = function (sequelize, dataTypes) {

    // alias
    let alias = "Series"; //el mismo que del archivo por recomendacion

    // columnas
    let cols = { //es un objeto literal con prop que tienen que ver con el nombre de las columnas de mi tabla, y se mapea cada una de las tablas

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER   //tipo de dato que tiene "id" 
            /*como mis campos de auditoria estan en null cuando veo la tabla en workbench, se puede obear, si tiene datos tiene que hacerce*/

        },
        //son PARECIDOS VEO SOLO EL TIPO DE PROPIEDAD Y EL NOMBRE DE LA COLUMNA
        title: {
            type: dataTypes.STRING(500)
        },
        release_date: {
            type: dataTypes.DATE
        },
        end_date: {
            type: dataTypes.DECIMAL
        },
        genre_id: {
            type: dataTypes.INTEGER
        }


    }
    // confi de tabla 
    let config = {// este es un obj literak que recibe propiedades
        tableName: "series",
        timestamps: false,
        underscored: true //es este caso es true porque se usa Snalcases 

    }
    // definicion de modulo 
    const Serie = sequelize.define(alias, cols, config);

    // relaciones 

    // retorno del modulo
    return Serie;

}