
const _knex = require('knex');
class Contenedor {
    
    constructor(options,tabla){
       // realizamos conexion
       try {
        this.knex = _knex(options)
        this.tabla = tabla
       } catch (error) {
        console.log(error)
       }
       
    }

    async save(objeto){
        //Recibe un objeto, lo guarda en el archivo,devuelve id
        try {
        const respuesta = await this.knex(this.tabla)
            .insert(objeto)
        console.log(respuesta)
        } catch (error) {
            throw error
        }

    }

    async getById(id){
        // recibe un id, devuelve el objeto con ese id, sino null
        try {
          return await this.knex(this.tabla)
                .where('id',id)
        } catch (error) {
            throw error
        }
   
    }

    async getAll(){
        //devuelve todos los objetos
        try {
            return await this.knex(this.tabla).select("*")
            
        } catch (error) {
            throw error
        }
    }

    async deleteById(id){
        //Elimina el objeto por el id
        try {
            await this.knex(this.tabla)
                    .where('id',id)
                    .del()
        } catch (error) {
            throw error
        }
    }

    async deleteAll(){
        //elimina todos los objetos del archivo
        try {
            this.knex(this.tabla)
            .del().where('id', '!=', 'null')
                    
        } catch (error) {
            throw error
        }


    }

 
}

module.exports = Contenedor





