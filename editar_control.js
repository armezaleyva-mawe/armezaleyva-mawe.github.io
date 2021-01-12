$('#exito-control').hide();

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
const idControlDeseado = localStorage.getItem("idElemento");
const indexPaso = localStorage.getItem("indexElemento0");
const indexSubpaso = localStorage.getItem("indexElemento1");
const indexControl = localStorage.getItem("indexElemento2");

ref.on('value', (snapshot) => {
    var i = 0;
    const data = snapshot.val();

    snapshot.forEach(element => {
        if (i == indexPaso) {
            let subPasos = element.val().SubPasos;

            if (subPasos != undefined) {
                var j = 0;
                subPasos.forEach(subPaso => {
                    if (j == indexSubpaso) {
                        let controles = subPaso.ControlesForma;

                        if (controles != undefined) {
                            controles.forEach(control => {
                                let idControl = control.ID;

                                if (idControl == idControlDeseado) {
                                    let tipo = control.Tipo;
                                    let etiqueta = control.Etiqueta;
                                    let valor = control.Valor;
                                    let valorDefault = control.ValorDefault;

                                    $('#tipoControl').val(tipo);
                                    $('#etiquetaControl').val(etiqueta);
                                    $('#valorControl').val(valor);
                                    $('#valorDefaultControl').val(valorDefault);
                                }
                            });
                        }
                    }
                });
            }
        }

        i++;
    });

    console.log(data);
});

function guardarCambios() {
    let tipoControl = $('#tipoControl').val();
    let etiquetaControl = $('#etiquetaControl').val();
    let valorControl = $('#valorControl').val();
    let valorDefaultControl = $('#valorDefaultControl').val();

    firebase.database().ref(`/datos/0/Table/0/Pasos/${indexPaso}/SubPasos/${indexSubpaso}/ControlesForma/${indexControl}`).update({
        ValorDefault: valorDefaultControl,
        Valor: valorControl,
        Tipo: tipoControl,
        Etiqueta: etiquetaControl,
    });

    $('#exito-control').show();
    $('#exito-control').delay(3200).fadeOut(300);
}