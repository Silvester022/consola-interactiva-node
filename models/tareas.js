
/**
 * _listado =
 * { 'uuid-122-442': { id:..., desc:..., completadoEn:... } }
 */

import { Tarea } from "./tarea.js";

export class Tareas {

    _listado = {};

    get listadoArr() {

        const listado = [];

        // recorre cada una de las llaves que tiene el objeto
        Object.keys(this._listado).forEach(key => {

            const tarea = this._listado[key];
            listado.push(tarea);
        })

        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea(id = '') {
        if(this._listado[id]) {
            
            delete this._listado[id];
        }
    }

    crearTarea(desc = '') {

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    cargarTareasFromArray(tareas = []) {

        tareas.forEach(tarea => {

            this._listado[tarea.id] = tarea;
        })
    }

    listadoCompleto() {

        this.listadoArr.forEach((tarea, i) => {

            const idx = `${i + 1}`.green;
            const { desc, completadoEn } = tarea;

            const estado =
                (completadoEn)
                    ? 'Completado'.green
                    : 'Pendiente'.red

            console.log(`${idx} ${desc} :: ${estado}`);
        })
    }

    listarPendientesCompletadas(completadas = true) {

        console.log();
        let cont = 0;

        this.listadoArr.forEach(tarea => {

            const { desc, completadoEn } = tarea;

            const estado =
                (completadoEn)
                    ? 'Completado'.green
                    : 'Pendiente'.red;

            if(completadas) {
                // tareas completadas
                if(completadoEn) {
                    cont++;
                    console.log(`${ (cont + '.').green} ${desc} :: ${completadoEn.green}`);
                }

            } else {
                // tareas pendientes
                if(!completadoEn) {
                    cont++;
                    console.log(`${(cont + '.').green} ${desc} :: ${estado}`);
                }
            }
        })
    }

    toggleCompletadas(ids = []) {

        ids.forEach(id => {

            const tarea = this._listado[id];

            if(!tarea.completadoEn)
                tarea.completadoEn = new Date().toISOString();
        })

        this.listadoArr.forEach(tareas => {

            if(!ids.includes(tareas.id)) {

                const tarea = this._listado[tareas.id];
                tarea.completadoEn = null;

                // otra forma de hacerlo
                // this._listado[tarea.id].completadoEn = null;
            }
        })
    }

}