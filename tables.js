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
var setPasos = new Set();
var setSubpasos = new Set();
var setControles = new Set();

ref.on('value', (snapshot) => {
    var i = 0;
    var j = 0;
    var k = 0;
    const data = snapshot.val();

    snapshot.forEach(element => {
        let id = element.val().ID;
        let nombre = element.val().Nombre;

        if (!setPasos.has(id)) {
            i++;
            setPasos.add(id);

            generarCelda($('#table-pasos')[0], [i, nombre]);
        }

        let subPasos = element.val().SubPasos;
        if (subPasos != undefined) {
            subPasos.forEach(subPaso => {
                let idSubpaso = subPaso.ID;
                let nombreSubpaso = subPaso.Nombre;

                if (!setSubpasos.has(idSubpaso)) {
                    j++;
                    setSubpasos.add(idSubpaso);

                    generarCelda($('#table-subpasos')[0], [j, nombre, nombreSubpaso]);
                }

                let controles = subPaso.ControlesForma;
                if (controles != undefined) {
                    controles.forEach(control => {
                        let idControl = control.ID;

                        if (!setControles.has(idControl)) {
                            k++;
                            let tipo = control.Tipo;
                            let etiqueta = control.Etiqueta;
                            let valor = control.Valor;
                            let valorDefault = control.ValorDefault;

                            generarCelda($('#table-controles')[0], [k, nombre, nombreSubpaso, tipo, etiqueta, valor, valorDefault]);
                        }
                    });
                }
            });
        }
    });

    console.log(data);
});

function generarHeaderTabla(table, listaHeaders) {
    let thead = table.createTHead();
    let row = thead.insertRow();

    listaHeaders.forEach(header => {
        let th = document.createElement("th");
        let text = document.createTextNode(header);
        th.appendChild(text);
        row.appendChild(th);
    });
}

function generarCelda(table, listaDatos) {
    let row = table.insertRow();

    listaDatos.forEach(dato => {
        let cell = row.insertCell();
        let text = document.createTextNode(dato);
        cell.appendChild(text);
    });
}

generarHeaderTabla($('#table-pasos')[0], ["#", "Nombre"]);
generarHeaderTabla($('#table-subpasos')[0], ["#", "Paso", "Nombre"]);
generarHeaderTabla($('#table-controles')[0], ["#", "Paso", "Subpaso", "Tipo", "Etiqueta", "Valor", "Valor default"]);