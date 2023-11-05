/*modelo es un modulo por lo tanto se lo debe exportar una funcion, donde los modelos son las funciones anominas*/
module.exports = function (sequelize, dataTypes) {
    
    // alias
    let alias = "Actor"; //el mismo que del archivo por recomendacion

    // columnas
    let cols = { //es un objeto literal con prop que tienen que ver con el nombre de las columnas de mi tabla, y se mapea cada una de las tablas
        
        id: {
            autoIncrement : true,
            primaryKey: true, 
            type: dataTypes.INTEGER   //tipo de dato que tiene "id" 
        },
        /*campo de auditoria si tiene*/ 
        created_at:{
            type: dataTypes.DATE, 
        },           
        updated_at: {
            type: dataTypes.DATE,
        },
        //son PARECIDOS VEO SOLO EL TIPO DE PROPIEDAD Y EL NOMBRE DE LA COLUMNA
        first_name:{
            type: dataTypes.STRING (100)
        },
        last_name:{
            type: dataTypes.STRING (100)
        },
        rating:{
            type: dataTypes.DECIMAL 
        },
        favorite_movie_id:{
            type: dataTypes.INTEGER 
        } 
    }
    // confi de tabla 
    let config ={// este es un obj literak que recibe propiedades
        tableName: "actors",
        timestamps: false,
        underscored: true //es este caso es true porque se usa Snalcases 

    }
    // definicion de modulo 
    const Actor = sequelize.define (alias,cols,config); 

    // relaciones 
    Actor.associate = function (models) {
        Actor.belongsToMany (models.Movie, {
            as:"movies",
            through :"actor_movie",
            foreignKey:"actor_id", //porque estamos del lado de actor
            otherKey:"movie_id",
            timestamps: false
         });
    }
    // retorno del modulo
    return Actor;

}