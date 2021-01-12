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

ref.on('value', (snapshot) => {
    const data = snapshot.val();

    snapshot.forEach(element => {
        let id = element.val().ID;
        let nombre = element.val().Nombre;
        $('#paso').append(new Option(nombre, id));

        let subPasos = element.val().SubPasos;
        subPasos.forEach(subPaso => {
            let nombre = subPaso.Nombre;
            let id = subPaso.ID;
            $('#subpaso').append(new Option(nombre, id));
        });
    });

    console.log(data);
});