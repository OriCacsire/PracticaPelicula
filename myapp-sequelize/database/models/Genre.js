/*modelo es un modulo por lo tanto se lo debe exportar una funcion, donde los modelos son las funciones anominas*/
module.exports = function (sequelize, dataTypes) {
    
    // alias
    let alias = "Genre"; //el mismo que del archivo por recomendacion

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
        name:{
            type: dataTypes.STRING (100)
        },
        ranking:{
            type: dataTypes.INTEGER
        },
        active:{
            type: dataTypes.INTEGER 
        } 


    }
    // confi de tabla 
    let config ={// este es un obj literak que recibe propiedades
        tableName: "genres",
        timestamps: false,
        underscored: true //es este caso es true porque se usa Snalcases 

    }
    // definicion de modulo 
    const Genre = sequelize.define (alias,cols,config); 

    // relaciones 
    Genre.associate = function (models) {
        //relacion con el hasMany 
        Genre.hasMany(models.Movie,{
            as: "movies", //alias de las relaciones debe ser diferente
            foreignKey: "genre_id"
        });
    }
    // retorno del modulo
    return Genre;
}