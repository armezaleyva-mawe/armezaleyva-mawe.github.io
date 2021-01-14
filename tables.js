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
        const auxI = i;

        if (!setPasos.has(id)) {
            i++;

            setPasos.add(id);

            generarCelda(
                id, $('#table-pasos')[0], [i, nombre],
                function(event) {
                    editarElemento(id, [auxI], "editar_paso.html");
                    event.preventDefault();
                },
                function(event) {
                    borrarElemento([auxI], id);
                    event.preventDefault();
                }
            );
        }

        let subPasos = element.val().SubPasos;
        if (subPasos != undefined) {
            subPasos.forEach(subPaso => {
                let idSubpaso = subPaso.ID;
                let nombreSubpaso = subPaso.Nombre;
                const auxJ = j;

                if (!setSubpasos.has(idSubpaso)) {
                    j++;

                    setSubpasos.add(idSubpaso);

                    generarCelda(
                        idSubpaso, $('#table-subpasos')[0], [j, nombre, nombreSubpaso],
                        function(event) {
                            editarElemento(idSubpaso, [auxI, auxJ], "editar_subpaso.html");
                            event.preventDefault();
                        },
                        function(event) {
                            borrarElemento([auxI, auxJ], idSubpaso);
                            event.preventDefault();
                        }
                    );
                }

                let controles = subPaso.ControlesForma;
                if (controles != undefined) {
                    controles.forEach(control => {
                        let idControl = control.ID;

                        if (!setControles.has(idControl)) {
                            k++;

                            setControles.add(idControl);

                            const auxK = k - 1;
                            let tipo = control.Tipo;
                            let etiqueta = control.Etiqueta;
                            let valor = control.Valor;
                            let valorDefault = control.ValorDefault;

                            generarCelda(
                                idControl, $('#table-controles')[0], [k, nombre, nombreSubpaso, tipo, etiqueta, valor, valorDefault],
                                function(event) {
                                    editarElemento(idControl, [auxI, auxJ, auxK], "editar_control.html");
                                    event.preventDefault();
                                },
                                function(event) {
                                    borrarElemento([auxI, auxJ, auxK], idControl);
                                    event.preventDefault();
                                }
                            );
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

    listaHeaders.push("");
    listaHeaders.push("");

    listaHeaders.forEach(header => {
        let th = document.createElement("th");
        let text = document.createTextNode(header);
        th.appendChild(text);
        row.appendChild(th);
    });
}

function generarCelda(id, table, listaDatos, onEdit, onDelete) {
    let row = table.insertRow();
    row.id = id;

    listaDatos.forEach(dato => {
        let cell = row.insertCell();
        let text = document.createTextNode(dato);
        cell.appendChild(text);
    });

    let celdaEditar = row.insertCell();
    let iconoEditar = document.createElement("i");
    iconoEditar.classList.add("fas");
    iconoEditar.classList.add("fa-edit");
    iconoEditar.onclick = onEdit;
    celdaEditar.appendChild(iconoEditar);

    let celdaBorrar = row.insertCell();
    let iconoBorrar = document.createElement("i");
    iconoBorrar.classList.add("fas");
    iconoBorrar.classList.add("fa-trash");
    iconoBorrar.onclick = onDelete;
    celdaBorrar.appendChild(iconoBorrar);
}

function editarElemento(idElemento, listaIndices, url) {
    localStorage.setItem("idElemento", idElemento);

    for (var i = 0; i < listaIndices.length; i++) {
        localStorage.setItem(`indexElemento${i}`, listaIndices[i]);
    }

    window.open(url, "_self");
}

function borrarElemento(listaIndices, id) {
    if (listaIndices.length == 1) {
        firebase.database().ref(`/datos/0/Table/0/Pasos/${listaIndices[0]}`).remove();
    } else if (listaIndices.length == 2) {
        firebase.database().ref(`/datos/0/Table/0/Pasos/${listaIndices[0]}/SubPasos/${listaIndices[1]}`).remove();
    } else if (listaIndices.length == 3) {
        firebase.database().ref(`/datos/0/Table/0/Pasos/${listaIndices[0]}/SubPasos/${listaIndices[1]}/ControlesForma/${listaIndices[2]}`).remove();
    }

    $(`#${id}`).remove();
}

generarHeaderTabla($('#table-pasos')[0], ["#", "Nombre"]);
generarHeaderTabla($('#table-subpasos')[0], ["#", "Paso", "Nombre"]);
generarHeaderTabla($('#table-controles')[0], ["#", "Paso", "Subpaso", "Tipo", "Etiqueta", "Valor", "Valor default"]);