/*modelo es un modulo por lo tanto se lo debe exportar una funcion, donde los modelos son las funciones anominas*/
module.exports = function (sequelize, dataTypes) {
    
    // alias
    let alias = "ActorMovie"; //el mismo que del archivo por recomendacion

    // columnas
    let cols = { //es un objeto literal con prop que tienen que ver con el nombre de las columnas de mi tabla, y se mapea cada una de las tablas
        
        id: {
            autoIncrement : true,
            primaryKey: true, 
            type: dataTypes.INTEGER   //tipo de dato que tiene "id" 
        },
        /*campo de auditoria si tiene*/ 
        created_at:{
            type: dataTypes.DATE /*??? */
        },           

        //son PARECIDOS VEO SOLO EL TIPO DE PROPIEDAD Y EL NOMBRE DE LA COLUMNA
        actor_id:{
            type: dataTypes.INTEGER
        },
        actor_id:{
            type: dataTypes.INTEGER
        },
    }
    // confi de tabla 
    let config ={// este es un obj literak que recibe propiedades
        tableName: "actor_movie",
        timestamps: false,
        underscored: true //es este caso es true porque se usa Snalcases 

    }
    // definicion de modulo 
    const ActorMovie = sequelize.define (alias,cols,config); 

    // relaciones 

    // retorno del modulo
    return ActorMovie;

}