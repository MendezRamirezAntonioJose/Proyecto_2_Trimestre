db.trabajadores.drop()
db.trabajadores.insertMany([
    {
        _id: "91653725J",
        nombre: "Hernan",
        apellidos: "Avila Roman",
        seccion: "cocina",
        aniosAntiguedad: 3,
        sanciones: 0
    },
    { _id: "34917127E", nombre: "Miguel Angel", apellidos: "Pulido Olmo", seccion: "cocina", aniosAntiguedad: 1, sanciones: 0 },
    { _id: "47502140X", nombre: "Fatima", apellidos: "Palau Coronado", seccion: "cocina", aniosAntiguedad: 10, sanciones: 8 },
    { _id: "72114438P", nombre: "Francisco", apellidos: "Buiza Perez", seccion: "exterior", aniosAntiguedad: 7, sanciones: 0 },
    { _id: "75216856W", nombre: "Raul", apellidos: "Buiza Romero", seccion: "exterior", aniosAntiguedad: 4, sanciones: 2 },
    { _id: "47200612N", nombre: "Clemente", apellidos: "Gomila Torres", seccion: "exterior", aniosAntiguedad: 6, sanciones: 0 },
    { _id: "82539080S", nombre: "Adrian", apellidos: "Ramos Colon", seccion: "salon", aniosAntiguedad: 3, sanciones: 4 },
    { _id: "24631398P", nombre: "Salvador", apellidos: "Gonzalez Jimenez", seccion: "salon", aniosAntiguedad: 10, sanciones: 0 },
    { _id: "67555808R", nombre: "Armando ", apellidos: "Tejada Hoyos", seccion: "salon", aniosAntiguedad: 12, sanciones: 12 },
    { _id: "40402142C", nombre: "Antonio", apellidos: "Barrera Fernandez", seccion: "banio", aniosAntiguedad: 5, sanciones: 1 },
    { _id: "21890564S", nombre: "Raul", apellidos: "Moron Vazquez", seccion: "banio", aniosAntiguedad: 1, sanciones: 2 },
    { _id: "63179410C", nombre: "Gerardo", apellidos: "Quiroga Prat", seccion: "banio", aniosAntiguedad: 3, sanciones: 0 },
    { _id: "32739672T", nombre: "Paulina", apellidos: "Maestre Reina", seccion: "dormitorio", aniosAntiguedad: 6, sanciones: 1 },
    { _id: "35478448M", nombre: "Ivan", apellidos: "Gasent Zarza", seccion: "dormitorio", aniosAntiguedad: 4, sanciones: 0 },
    { _id: "99535553V", nombre: "Marina", apellidos: "Vega Perea", seccion: "dormitorio", aniosAntiguedad: 2, sanciones: 0 }

])


db.secciones.drop()
db.secciones.insertMany([
    {
        _id: "cocina",
        sueldoMensual: 1100,
        muebles: ["KNOXHULT", "TAGGIG", "HUTTEN", "IVAR", "TORNVIKEN"]
    },
    { _id: "exterior", sueldoMensual: 1550, muebles: ["TARNO", "FALHOLMEN", "ASKHOLMEN", "NORRMANSO", "INGMARSO"] },
    { _id: "salon", sueldoMensual: 2100, muebles: ["SODERHAMN", "KIVIK", "GRONLIND", "LACK", "VIHALS", "FROTORP", "GUNDE", "RAVAROR", "PLATSA", "BESTA"] },
    { _id: "banio", sueldoMensual: 1800, muebles: ["LARBRO", "NISSEDAL", "LEDSJO", "NYJSON", "VESKEN"] },
    { _id: "dormitorio", sueldoMensual: 2600, muebles: ["GRIMSTORP", "PAX", "LADA", "KULLEN", "LINNMON", "TROTTEN", "BEKANT"] }
])

db.muebles.drop()
db.muebles.insertMany([
    {
        _id: "KNOXHULT",
        categoria: "Armario",
        precioBase: 80,
        fechaSalida: new Date("2021-01-12"),
        unidadesVendidas: 234,
        propiedades: {
            disponible:true,
            color: "blanco"
        }
    },
    { _id: "TAGGIG", categoria: "Armario", precioBase: 140, fechaSalida: new Date("2020-07-11"), unidadesVendidas: 645, propiedades: { disponible: true,color: "blanco"} },
    { _id: "HUTTEN", categoria: "Botellero", precioBase: 14, fechaSalida: new Date("2019-04-23"), unidadesVendidas: 1048, propiedades: { disponible: true,color: "blanco"} },
    { _id: "IVAR", categoria: "Botellero", precioBase: 45, fechaSalida: new Date("2021-10-23"), unidadesVendidas: 105, propiedades: { disponible: false,color: "negro"} },
    { _id: "TORNVIKEN", categoria: "Estanteria", precioBase: 50, fechaSalida: new Date("2019-09-10"), unidadesVendidas: 36, propiedades: { disponible: true,color: "blanco"} },

    { _id: "TARNO", categoria: "Silla", precioBase: 13, fechaSalida: new Date("2018-05-27"), unidadesVendidas: 2059, propiedades: { disponible: true,color: "blanco"} },
    { _id: "FALHOLMEN", categoria: "Silla", precioBase: 35, fechaSalida: new Date("2019-08-17"), unidadesVendidas: 852, propiedades: { disponible: true,color: "negro"} },
    { _id: "ASKHOLMEN", categoria: "Mesa", precioBase: 25, fechaSalida: new Date("2020-10-11"), unidadesVendidas: 741, propiedades: { disponible: true,color: "blanco"} },
    { _id: "NORRMANSO", categoria: "Mesa", precioBase: 142, fechaSalida: new Date("2018-06-15"), unidadesVendidas: 214, propiedades: { disponible: false,color: "blanco"} },
    { _id: "INGMARSO", categoria: "Sofa", precioBase: 79, fechaSalida: new Date("2020-08-03"), unidadesVendidas: 340, propiedades: { disponible: true,color: "blanco"} },

    { _id: "SODERHAMN", categoria: "Sofa", precioBase: 949, fechaSalida: new Date("2017-10-21"), unidadesVendidas: 469, propiedades: { disponible: true,color: "negro"} },
    { _id: "KIVIK", categoria: "Sofa", precioBase: 499, fechaSalida: new Date("2020-04-16"), unidadesVendidas: 867, propiedades: { disponible: true,color: "negro"} },
    { _id: "GRONLIND", categoria: "Sofa", precioBase: 749, fechaSalida: new Date("2021-03-18"), unidadesVendidas: 751, propiedades: { disponible: false,color: "blanco"} },
    { _id: "LACK", categoria: "Mesa", precioBase: 129, fechaSalida: new Date("2019-11-11"), unidadesVendidas: 1587, propiedades: { disponible: true,color: "negro"} },
    { _id: "VIHALS", categoria: "Mesa", precioBase: 87, fechaSalida: new Date("2019-07-20"), unidadesVendidas: 325, propiedades: { disponible: true,color: "amarillo napoles rojizo"} },
    { _id: "FROTORP", categoria: "Mesa", precioBase: 65, fechaSalida: new Date("2020-08-09"), unidadesVendidas: 895, propiedades: { disponible: true,color: "blanco"} },
    { _id: "GUNDE", categoria: "Silla", precioBase: 16, fechaSalida: new Date("2018-01-23"), unidadesVendidas: 635, propiedades: { disponible: true,color: "blanco"} },
    { _id: "RAVAROR", categoria: "Silla", precioBase: 59, fechaSalida: new Date("2021-08-26"), unidadesVendidas: 89, propiedades: { disponible: false,color: "negro"} },
    { _id: "PLATSA", categoria: "Armario", precioBase: 360, fechaSalida: new Date("2017-09-20"), unidadesVendidas: 2693, propiedades: { disponible: true,color: "blanco"} },
    { _id: "BESTA", categoria: "Armario", precioBase: 141, fechaSalida: new Date("2020-04-05"), unidadesVendidas: 1586, propiedades: { disponible: true,color: "negro"} },

    { _id: "LARBRO", categoria: "Espejo", precioBase: 9, fechaSalida: new Date("2018-01-25"), unidadesVendidas: 5247, propiedades: { disponible: true,color: "negro"} },
    { _id: "NISSEDAL", categoria: "Espejo", precioBase: 35, fechaSalida: new Date("2020-11-17"), unidadesVendidas: 3048, propiedades: { disponible: true,color: "blanco"} },
    { _id: "LEDSJO", categoria: "Lampara", precioBase: 39, fechaSalida: new Date("2021-05-11"), unidadesVendidas: 1048, propiedades: { disponible: true,color: "azul"} },
    { _id: "NYJSON", categoria: "Armario", precioBase: 29, fechaSalida: new Date("2022-02-14"), unidadesVendidas: 2100, propiedades: { disponible: true,color: "negro"} },
    { _id: "VESKEN", categoria: "Estanteria", precioBase: 8, fechaSalida: new Date("2019-07-22"), unidadesVendidas: 4890, propiedades: { disponible: true,color: "blanco"} },

    { _id: "GRIMSTORP", categoria: "Espejo", precioBase: 49, fechaSalida: new Date("2020-02-14"), unidadesVendidas: 654, propiedades: { disponible: true,color: "blanco"} },
    { _id: "PAX", categoria: "Armario", precioBase: 363, fechaSalida: new Date("2018-07-19"), unidadesVendidas: 873, propiedades: { disponible: true,color: "negro"} },
    { _id: "LADA", categoria: "Armario", precioBase: 213, fechaSalida: new Date("2020-04-22"), unidadesVendidas: 395, propiedades: { disponible: false,color: "blanco"
 } },
    { _id: "KULLEN", categoria: "Mesa", precioBase: 80, fechaSalida: new Date("2018-06-18"), unidadesVendidas: 751, propiedades: { disponible: true,color: "blanco"} },
    { _id: "LINNMON", categoria: "Escritorio", precioBase: 25, fechaSalida: new Date("2020-11-28"), unidadesVendidas: 2048, propiedades: { disponible: true,color: "blanco"} },
    { _id: "TROTTEN", categoria: "Escritorio", precioBase: 109, fechaSalida: new Date("2021-03-15"), unidadesVendidas: 1526, propiedades: { disponible: true,color: "negro"} },
    { _id: "BEKANT", categoria: "Escritorio", precioBase: 259, fechaSalida: new Date("2020-05-04"), unidadesVendidas: 655, propiedades: { disponible: false,color: "blanco"} }
])
