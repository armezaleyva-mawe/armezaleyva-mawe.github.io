var firebaseConfig = {
    apiKey: "AIzaSyBO3GulC3zCUcKzY60TjTGLnlf7nSEInbU",
    authDomain: "api-simulada-servicio-tecnico.firebaseapp.com",
    databaseURL: "https://api-simulada-servicio-tecnico-default-rtdb.firebaseio.com",
    projectId: "api-simulada-servicio-tecnico",
    storageBucket: "api-simulada-servicio-tecnico.appspot.com",
    messagingSenderId: "234965729450",
    appId: "1:234965729450:web:8c56178661bcb708fbd0d3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

var ref = firebase.database().ref('/datos/0/Table/0/Pasos');
var numPasos = 0;
var hashmapPasos = {};
var hashNumSubPasos = {};
var hashmapSubPasos = {};
var hashNumControles = {};

$('#exito-paso').hide();
$('#exito-subpaso').hide();
$('#exito-control').hide();

ref.on('value', (snapshot) => {
    const data = snapshot.val();

    snapshot.forEach(element => {
        let id = element.val().ID;
        let nombre = element.val().Nombre;
        let elementoYaEstaEnOpciones = false;

        Array.from(document.querySelector("#paso").options).forEach(function(option_element) {
            let option_value = option_element.value;

            if (option_value == id) {
                elementoYaEstaEnOpciones = true;
            }
        });

        if (!elementoYaEstaEnOpciones) {
            numPasos++;
            $('#paso').append(new Option(nombre, id));
            $('#pasoControl').append(new Option(nombre, id));
            hashmapPasos[id] = numPasos - 1;
        }


        let subPasos = element.val().SubPasos;
        if (subPasos != undefined) {
            let numSubPasos = 0;

            subPasos.forEach(subPaso => {
                let nombre = subPaso.Nombre;
                let id = subPaso.ID;

                let subPasoYaEstaEnOpciones = false;
                Array.from(document.querySelector("#subpaso").options).forEach(function(option_element) {
                    let option_value = option_element.value;

                    if (option_value == id) {
                        subPasoYaEstaEnOpciones = true;
                    }
                });

                if (!subPasoYaEstaEnOpciones) {
                    numSubPasos++;
                    $('#subpaso').append(new Option(nombre, id));
                    hashmapSubPasos[id] = numSubPasos - 1;
                }

                let controles = subPaso.ControlesForma
                if (controles != undefined) {
                    let numControles = 0;
                    controles.forEach(control => {
                        numControles++;
                    });
                    hashNumControles[id] = numControles;
                } else {
                    hashNumControles[id] = 0;
                }
            });

            hashNumSubPasos[id] = numSubPasos;
        } else {
            hashNumSubPasos[id] = 0;
        }

    });

    console.log(data);
});

function crearPaso() {
    let nombrePaso = $('#nombrePaso').val();
    let id = Math.floor(Math.random() * 10000000000000001);

    firebase.database().ref(`/datos/0/Table/0/Pasos/${numPasos}`).set({
        ID: id.toString(),
        Orden: numPasos + 1,
        Nombre: nombrePaso,
        Deshabilitado: false,
        Categoría: "Aire Acondicionado",
        TipoServicio: "Instalación",
        SubtipoServicio: "RVI",
        EspacioPxSubpasos: 5,
    });

    $('#exito-paso').show();
    $('#exito-paso').delay(3200).fadeOut(300);
}

function crearSubpaso() {
    let idPaso = $('#paso').val();
    let nombreSubPaso = $('#nombreSubpaso').val();
    let id = Math.floor(Math.random() * 10000000000000001);

    let numPaso = hashmapPasos[idPaso];
    let numSubPaso = hashNumSubPasos[idPaso];

    firebase.database().ref(`/datos/0/Table/0/Pasos/${numPaso}/SubPasos/${numSubPaso}`).set({
        ID: id.toString(),
        Orden: numSubPaso + 1,
        Nombre: nombreSubPaso,
        Deshabilitado: false,
        EspacioPxControles: 4,
    });

    $('#exito-subpaso').show();
    $('#exito-subpaso').delay(3200).fadeOut(300);
}

function crearControl() {
    let idPaso = $('#pasoControl').val();
    let idSubPaso = $('#subpaso').val();

    let tipoControl = $('#tipoControl').val();
    let etiquetaControl = $('#etiquetaControl').val();
    let valorControl = $('#valorControl').val();
    let valorDefaultControl = $('#valorDefaultControl').val();
    let id = Math.floor(Math.random() * 10000000000000001);

    let numPaso = hashmapPasos[idPaso];
    let numSubPaso = hashmapSubPasos[idSubPaso];
    let numControl = hashNumControles[idSubPaso];

    firebase.database().ref(`/datos/0/Table/0/Pasos/${numPaso}/SubPasos/${numSubPaso}/ControlesForma/${numControl}`).set({
        ID: id.toString(),
        Orden: numControl + 1,
        Nombre: "nombreControlDummy" + id.toString(),
        ValorDefault: valorDefaultControl,
        Valor: valorControl,
        Tipo: tipoControl,
        Etiqueta: etiquetaControl,
        Requerido: true,
        SoloLectura: false
    });

    $('#exito-control').show();
    $('#exito-control').delay(3200).fadeOut(300);
}