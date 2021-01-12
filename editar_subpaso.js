$('#exito-subpaso').hide();

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
const idSubpasoDeseado = localStorage.getItem("idElemento");
const indexPaso = localStorage.getItem("indexElemento0");
const indexSubpaso = localStorage.getItem("indexElemento1");

ref.on('value', (snapshot) => {
    var i = 0;
    const data = snapshot.val();

    snapshot.forEach(element => {
        if (i == indexPaso) {
            let subPasos = element.val().SubPasos;

            if (subPasos != undefined) {
                subPasos.forEach(subPaso => {
                    let idSubpaso = subPaso.ID;

                    if (idSubpasoDeseado == idSubpaso) {
                        let nombreSubpaso = subPaso.Nombre;
                        $('#nombreSubpaso').val(nombreSubpaso);
                    }
                });
            }
        }

        i++;
    });

    console.log(data);
});

function guardarCambios() {
    let nombre = $('#nombreSubpaso').val();

    firebase.database().ref(`/datos/0/Table/0/Pasos/${indexPaso}/SubPasos/${indexSubpaso}`).update({
        Nombre: nombre,
    });

    $('#exito-subpaso').show();
    $('#exito-subpaso').delay(3200).fadeOut(300);
}