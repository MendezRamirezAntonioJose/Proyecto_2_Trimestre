/* 
   Vamos a implementar complementos de antiguedad en la empresa. 
   Si llevas 10 años o más, recibiras un bono del 50% en tu salario mensual (según departamento).
   Si llevas entre 5 y 9 años, recibiras un bono del 20% en tu salario mensual (según departamento).
   Si llevas entre 3 y 4, recibiras un bono del 7% en tu salario mensual (según departamento).
*/
db.trabajadores.aggregate([{
        $lookup: {
            from: 'secciones',
            localField: 'seccion',
            foreignField: '_id',
            as: 'departamentos'
        }
    },
    {
        $addFields: {
            departamentos: {
                $arrayElemAt: ["$departamentos", 0]
            }
        }
    },
    {
        $group: {
            _id: {
                $concat: ['$nombre', ' ', '$apellidos']
            },
            salario: {
                $first: '$departamentos.sueldoMensual'
            },
            aniosAntiguedad: {
                $first: '$aniosAntiguedad'
            }
        }
    },
    {
        $project: {
            _id: 0,
            nombre: '$_id',
            aniosAntiguedad:'$aniosAntiguedad',
            salarioAntiguo: '$salario',
            salarioConComplemento: {
                $cond: {
                    if: {
                        $gte: ['$aniosAntiguedad', 10]
                    },
                    then: {
                        $multiply: ['$salario', 1.50]
                    },
                    else: {
                        $cond: {
                            if: {
                                $gte: ['$aniosAntiguedad', 5]
                            },
                            then: {
                                $multiply: ['$salario', 1.20]
                            },
                            else: {
                                $cond: {
                                    if: {
                                        $gte: ['$aniosAntiguedad', 3]
                                    },
                                    then: {
                                        $multiply: ['$salario', 1.07]
                                    },
                                    else: {
                                        $multiply: ['$salario', 1]
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    {
        $sort: {
            nombre: 1
        }
    }
])

/*
    Vamos a hacer recuento del dinero que ha generado cada departamento con sus muebles desde
    2018 hasta 2021.
    El departamento que menos haya generado recibirá una sanción en su salario mensual del 15%.
*/
db.muebles.aggregate([{
        $lookup: {
            from: 'secciones',
            localField: '_id',
            foreignField: 'muebles',
            as: 'departamentos'
        }
    },
    {
        $addFields: {
            departamentos: {
                $arrayElemAt: ["$departamentos", 0]
            }
        }
    },
    {
        $match: {
            $and: [{
                    fechaSalida: {
                        $gte: new Date("2019-01-01")
                    }
                },
                {
                    fechaSalida: {
                        $lte: new Date("2021-12-31")
                    }
                },
            ]
        }
    },
    {
        $project: {
            dineroGanadoPorMueble: {
                $multiply: ['$unidadesVendidas', '$precioBase']
            },
            seccion: '$departamentos._id',
            salario: '$departamentos.sueldoMensual'
        }
    },
    {
        $group: {
            _id: '$seccion',
            dineroTotalSeccion: {
                $sum: '$dineroGanadoPorMueble'
            },
            salario: {
                $first: '$salario'
            }
        }
    },
    {
        $sort: {
            dineroTotalSeccion: 1
        }
    },
    {
        $limit: 1
    },
    {
        $project: {
            _id: 0,
            departamento: '$_id',
            dineroTotalSeccion: '$dineroTotalSeccion',
            salarioAntiguo: '$salario',
            nuevoSalario: {
                $multiply: ['$salario', 0.85]
            }
        }
    }
])

/*
    ¡Regalo de cuaresma! Vamos a perdonar algunas sanciones. Si eres un trabajador que lleva trabajando
    en la empresa 5 años o más, te perdonaremos la mitad de tus sanciones, redondeando siempre hacia abajo.
*/
db.trabajadores.aggregate([{
    $group: {
        _id: '$aniosAntiguedad',
        trabajadores: {
            $push: {
                nombre: {
                    $concat: ['$nombre', ' ', '$apellidos']
                },
                dni: '$_id',
                sanciones: '$sanciones'
            }
        },
    } // Aquí montamos un Array de documentos con Push.
},
{
    $unwind: {
        path: '$trabajadores' // Desmontamos el Array para poder tratar con él.
    }
},
{
    $project: {
        _id: 1,
        'trabajadores.nombre': 1,
        'trabajadores.dni': 1,
        'trabajadores.sancionesAntiguas': '$trabajadores.sanciones',
        'trabajadores.sancionesActualizadas': {
            $cond: {
                if: {
                    $gte: ['$_id', 5]
                },
                then: {
                    $round: [{
                        $multiply: ["$trabajadores.sanciones", 0.50]
                    }, 0]
                },
                else: '$trabajadores.sanciones'
            }
        }
    }/* Mantenemos los datos que nos interesan del array desmontado anteriormente para poder montarlo de nuevo.
        Calculamos las nuevas sanciones y las añadimos al campo sancionesActualizadas que pertenece al documento
        de trabajadores.  
    */
},
{
    $group: {
        _id: '$_id',
        trabajadores: {
            $push: '$trabajadores'
        }, //Volvemos a crear el array de documentos.
    }
},
{
    $project: {
        _id: 0,
        aniosTrabajados: '$_id',
        trabajadores: '$trabajadores'
    }

},
{
    $sort: {
        aniosTrabajados: -1
    }
}
]).pretty()

/*
    Queremos elegir al representante de los trabajadores. Se elegirá el trabajador que menos sanciones tenga.
    En caso de empate, se decidira por los años que lleve en la empresa. Al trabajador que salga elegido, se le dará un 
    bonus de un 15% del sueldo que gana mensualmente. Interesa saber la cuantía del bono.
*/
db.trabajadores.aggregate([{
        $lookup: {
            from: 'secciones',
            localField: 'seccion',
            foreignField: '_id',
            as: 'departamentos'
        }
    },
    {
        $addFields: {
            departamentos: {
                $arrayElemAt: ["$departamentos", 0]
            }
        }
    },
    {
        $group: {
            _id: {
                $concat: ['$nombre', ' ', '$apellidos']
            },
            salario: {
                $first: '$departamentos.sueldoMensual'
            },
            sanciones: {
                $first: '$sanciones'
            },
            aniosAntiguedad: {
                $first: '$aniosAntiguedad'
            }
        }
    },
    {
        $sort: {
            sanciones: 1,
            aniosAntiguedad: -1
        }
    },
    {
        $limit: 1

    },
    {
        $project: {
            _id: 0,
            nombreDelegado: '$_id',
            aniosAntiguedad: '$aniosAntiguedad',
            sanciones: '$sanciones',
            salarioAntiguo: '$salario',
            salarioNuevo: {
                $multiply: ['$salario', 1.50]
            },
            cuantiaBono: {
                $subtract: [{
                    $multiply: ['$salario', 1.50]
                }, '$salario']
            }
        }
    }
]).pretty()


/*
    Como regalo de Navidad para los trabajadores de la empresa, he decidido que el departamento (seccion) 
    que más dinero genere con sus muebles, se ganara un aumento de sueldo base de un 50%.
*/
db.muebles.aggregate([{
        $lookup: {
            from: 'secciones',
            localField: '_id',
            foreignField: 'muebles',
            as: 'departamentos'
        }
    },
    {
        $addFields: {
            departamentos: {
                $arrayElemAt: ["$departamentos", 0]
            }
            /* Usamos arrayElemAt, ya que lookup
             nos devuelve un Array de documentos, pero solo nos lo da
             con un documento, ya que los muebles solo pertenecen a 1
             seccion. Si los muebles perteneciesen a varias secciones, se 
             usaria unwind. */
        }
    },
    {
        $project: {
            dineroGanadoPorMueble: {
                $multiply: ['$unidadesVendidas', '$precioBase']
            },
            seccion: '$departamentos._id',
            salario: '$departamentos.sueldoMensual'
        }
    },
    {
        $group: {
            _id: '$seccion',
            dineroTotalSeccion: {
                $sum: '$dineroGanadoPorMueble'
            },
            salario: {
                $first: '$salario'
            } //Al llegar distintos valores, se confunde. Como esos sueldos siempre son los mismos le ponemos el first, cogiendo el primer valor.
        }
    },
    {
        $sort: {
            dineroTotalSeccion: -1
        }
    },
    {
        $limit: 1
    },
    {
        $project: {
            _id: 0,
            seccion: '$_id',
            dineroMaximoTotal: '$dineroTotalSeccion',
            salarioBase: '$salario',
            salarioMasComplemento: {
                $multiply: ['$salario', 1.50]
            }
        }

    }

]).pretty()

/*
    Vamos a repasar nominas; por lo que queremos ver el nombre completo del trabajador, el departamento
    al que pertenece, y además, se precisa saber el dinero pagado por la empresa a cada trabajador (Multiplicando
    el salario del departamento al que pertenezca para calcular el salario anual, para después multiplicar este 
    por los años de antiguedad del trabajador.)
*/
db.trabajadores.aggregate([{
    $lookup: {
        from: 'secciones',
        localField: 'seccion',
        foreignField: '_id',
        as: 'departamentos'
    }
},
{
    $addFields: {
        departamentos: {
            $arrayElemAt: ["$departamentos", 0]
        }
    }
},
{
    $project: {
        sueldoPorAño: { $multiply:  ['$departamentos.sueldoMensual', 12]  },
        totalPagado: { $multiply: [{ $multiply:  ['$departamentos.sueldoMensual', 12]  }, '$aniosAntiguedad']} ,
        seccion: 1,
        nombre: 1,
        aniosAntiguedad:1,
        _id: 0
    }
}

]).pretty()


/*
    Voy a hacer un estudio sobre todas las unidades de muebles que se han vendido
    en color blanco, segun la categoría para saber en que invertir.
    Además, nos interesa saber cuales estan disponibles para empezar epoca de rebajas.
*/

db.muebles.aggregate([{
    $match: {
        fechaSalida: {
            $gte: new Date("2020-01-01")
        },
        'propiedades.disponible': true,
        'propiedades.color': "blanco"
    }
},
{
    $group: {
        _id: '$categoria',
        totalUnidades: {
            $sum: '$unidadesVendidas'
        }
    }
},
{
    $project: {
        _id: 0,
        CategoriaMueble: '$_id',
        unidadesVendidas: '$totalUnidades'
    }
}
])