$('#exito-paso').hide();

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
var indexPaso = 0;
const idPasoDeseado = localStorage.getItem("idElemento");
console.log(indexPaso);

ref.on('value', (snapshot) => {
    var i = 0;
    const data = snapshot.val();

    snapshot.forEach(element => {
        let id = element.val().ID;
        let nombre = element.val().Nombre;

        if (idPasoDeseado === id) {
            $('#nombrePaso').val(nombre);
            indexPaso = i;
        }

        i++;
    });

    console.log(data);
});

function guardarCambios() {
    let nombre = $('#nombrePaso').val();

    console.log(indexPaso);

    firebase.database().ref(`/datos/0/Table/0/Pasos/${indexPaso}`).update({
        Nombre: nombre,
    });

    $('#exito-paso').show();
    $('#exito-paso').delay(3200).fadeOut(300);
}