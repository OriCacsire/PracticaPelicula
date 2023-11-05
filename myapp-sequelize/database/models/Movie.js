/*modelo es un modulo por lo tanto se lo debe exportar una funcion, donde los modelos son las funciones anominas*/
module.exports = function (sequelize, dataTypes) {
    
    // alias
    let alias = "Movie"; //el mismo que del archivo por recomendacion

    // columnas
    let cols = { //es un objeto literal con prop que tienen que ver con el nombre de las columnas de mi tabla, y se mapea cada una de las tablas
        
        id: {
            autoIncrement : true,
            primaryKey: true, 
            type: dataTypes.INTEGER   //tipo de dato que tiene "id" 
            /*como mis campos de auditoria estan en null cuando veo la tabla en workbench, se puede obear, si tiene datos tiene que hacerce*/
            
        },
        //son PARECIDOS VEO SOLO EL TIPO DE PROPIEDAD Y EL NOMBRE DE LA COLUMNA
        title:{
            type: dataTypes.STRING (500)
        },
        rating:{
            type: dataTypes.DECIMAL
        },
        awards:{
            type: dataTypes.INTEGER
        },
        release_date:{
            type: dataTypes.DATE
        },
        length:{
            type: dataTypes.INTEGER 
        },
        genre_id:{
            type: dataTypes.INTEGER 
        } 


    }
    // confi de tabla 
    let config ={// este es un obj literak que recibe propiedades
        tableName: "movies",
        timestamps: false,
        underscored: true //es este caso es true porque se usa Snalcases 

    }
    // definicion de modelo 
    const Movies = sequelize.define (alias,cols,config); 

    // relaciones
    
    //estructura para crear relaciones, lo defino con los parametros que recibe, todos los modelos, dentro van todas las relaciones

    Movies.associate = function (models) { // funcion expresada

        //relacion con el belongsTo que tiene 2 parametros

        Movies.belongsTo(models.Genre,{
            as: "genres", // hace referencia al ALIAS DE LA RELACION OJOOOOOOOOOOOO
            foreignKey: "genre_id" // columna que relaciona movie con genero
        });

         //relacionde muchos a muchos usamos la tabla pivot de actor_movie
         Movies.belongsToMany (models.Actor, {
            as:"actors", 
            through :"actor_movie",
            foreignKey:"movie_id", //porque estamos del lado de movie
            otherKey:"actor_id",
            timestamps: false
         })

    }

    /*NO OLVIDARNOS DE LA CONTRAPARTE EN ESTE CASO ACTOR  */

    // retorno del modelo
    return Movies;

}