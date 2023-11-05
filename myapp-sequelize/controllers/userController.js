const db = require ("../database/models");
/* importa el modulo bcyptjs, se utiliza para realizar el hashing y la comparacion segura de contrasela encriptada*/
const bcrypt = require("bcryptjs");

/*  Se crea un objeto userController que contiene diferentes métodos para gestionar las operaciones relacionadas con los usuarios en la aplicación. Estos métodos son acciones que se ejecutan cuando se realizan solicitudes HTTP específicas.*/
const userController = {
    //Este método se utiliza para renderizar una vista llamada "registerUser" en respuesta a una solicitud. Probablemente se utiliza para mostrar un formulario de registro de usuario.
    register :  (req, res) => {
        return res.render ("registerUser")
    },

    store: (req, res) => {
       let info = req.body; //obtener los datos del formulario en en el controlador usando la propiedad body --> info del formulario

       //Se extraen los datos enviados en el cuerpo de la solicitud HTTP POST y se almacenan en una variable llamada info. Estos datos generalmente provienen de un formulario HTML

       let user = {
        //Se crea un objeto user que contiene los datos del usuario que se va a registrar. 

        name: info.name,
        email: info.email,
        password: bcrypt.hashSync(info.password,10), // metodo que encriptar datos en este caso la contraseña. De este metodo se trae del paquete bcrypt.  con dos parametros : data, sal (para que sea más dificil de hackear)
        remember_token: "false"
       };


       db.User.create (user) //crear un nuevo registro en la base de datos con los datos 

       .then ( (result) => {
        return res.redirect ("/users/login") // redirijo a login una vez que se crea los datos del user 
       }).catch((error) =>{
        return console.log (error);
       });
    },


    login:(req, res) => {
        return res.render ("login")
    },

    loginPost: (req, res) => {
    //recuperar del formulario (2 inputs) email y password
    let emailBuscado = req.body.email; //EL MAIL SI SE CAMBIA SE DEBE CAMBIAR AL ATRIBUTO NAME EN LA VISTA
    let pass = req.body.password;
    let rememberme =req.body.rememberme
    
    let criterio = {
        where : [{email: emailBuscado}] // se crea un objeto literal para buscar un usuario en la base de datos con el correo electronico proporcionado debe coincidir con el mail ingresado
    };
    // console.log(rememberme != undefined); //
    db.User.findOne (criterio) //se utiliza el modelo de usuario para buscar un usuario en la base de datos que cumple con el criterio especificado.
    .then ((result) =>{ //Manejamos el resultado de la búsqueda del usuario en una promesa, cuando se ingrese algo por el buscador recien se ejecuta esto
        if (result != null){//Si se encuentra un usuario, es decir si el usuario no es nulo se procede a verificar la contraseña, viendo si la contraseña que se esta pasando es igual a la que tenemos en la base de datos --> utilizando bcrypt.compareSync. 
            let check = bcrypt.compareSync(pass/*contraseña que se ingresa*/, result.password /*contraseña guardada*/) 
            //el primer metodo es para encriptar la clave y la otra para compararlas. Si es para compararla, este metodo necesita el string para comparar y el segundo que es un hash que viene de la base de datos. Esto devuelve un booleano por lo tanto se puede usar un condicional. 
            if (check) {
                //esto es si exite la contraseña y el mail, entonces se configura para que guarde los datos en el momento que se pone recordame --> cookie

                req.session.user = result.dataValues;
                if (rememberme != undefined) {
                    res.cookie("UserId"/*nombre de cookie */,result.id /*valor de la cookie*/,{maxAge:1000*60*5})
                }

            //Si la contraseña coincide, se redirige al usuario a la página de películas ("movies"). De lo contrario, se muestra nuevamente la página de inicio de sesión.
                return res.redirect("/movies")
            } else {
                return res.render("login")
            }
        }else {
            return res.send("No existe el mail " + emailBuscado)
        }
        
    })
    .catch((err) => {
        return console.log(err);
    });
      /* return res.redirect("/movies"); */

    },
}

module.exports = userController;