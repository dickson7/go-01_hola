
function validar(){
    var n1 = document.getElementById("name");
    var n2 = document.getElementById("formservice");
    var n3 = document.getElementById("mail");
    var n4 = document.getElementById("message");

    if (n1.value != "" && n2.value != "" && n3.value != "" && n4.value != ""){
        alert(n1.value + " Tu mensaje fue enviado con éxito!");
    }
    else{
        alert("Todos los campos son requeridos para el envío del mensaje");
    }

   
}