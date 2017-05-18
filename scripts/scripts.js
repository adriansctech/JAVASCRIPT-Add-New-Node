/*
	Cogemos los campos de input y ol, y los introducimos en variables 
	para luego trabajar con ellos.
*/
var newNoteInput = document.getElementById("new_note"); 
var deleteNoteInput = document.getElementById("delete_note");
/*
	Intorducimos el elemento ol del HTML dentro de una variable para luego ir agregandole
	nuevos elementos
*/
var listNotes = document.getElementById("ol_list");
/*
	Las siguientes variables almacenarán el contenido del input y el 
	numero de nota que hay que borrar
*/
var newNoteText;
window.onload = function() {	
	document.getElementById("new_note_submit").addEventListener("click", addNewNote);
	document.getElementById("delete_note_submit").addEventListener("click", checkNote);
}

function addNewNote(event){
	event.preventDefault();	
	//Comprobamos que el cmapo del input hay algo escrito, de no ser así mostramos un aviso
	if(!newNoteInput.value){
		alert("El campo de nueva nota esta vacio");
	}else{
		//Creamos nuevo nodo
		newNoteInList = document.createElement("li");
		/*
			Creamos la variable donde se almacenará la hora
		*/		
		today = new Date();
		todayTime = today.getHours() +":"+today.getMinutes() +":"+today.getSeconds();
		/*
			Al nuevo nodo la incluimos la nueva nota con la hora incluida pero a través de 
			innerHTML, de esta maneraq es mucho más fácil.
		*/
		newNoteInList.innerHTML="<strong>"+todayTime+"</strong> - "+newNoteInput.value;
		/*
			Agregamos el nuevo elemento
		*/
		listNotes.appendChild(newNoteInList);		
		
		newNoteInput.value = "";
		/*
			Creamos el liustener sobre la nueva nota que hemos creado
		*/
		listNotes.childNodes[listNotes.childNodes.length-1].addEventListener("dblclick", deleteNote);
	}	
}

function checkNote(event){
	event.preventDefault();
	/*
		Hacemos una doble comprobación, primero que compruebe que sea un número, la segunda
		que compruebe que el número introducio no sea mayor que el número de nuevos elementos, restamos 2
		a la comrpobación debido a que hay comentarios y demás en el html
	*/
	if((isNaN(parseInt(deleteNoteInput.value))) || (parseInt(deleteNoteInput.value) > listNotes.children.length)){
		alert("El número introducido no existe o no es un numero");						
	}else{
		/*
			Si una vez comprobado lo anterior es correcto llamaremos ala función para que borre la nota
			que se ha seleccionado
		*/
		deleteNoteNumber(parseInt(deleteNoteInput.value));		
	}		
	deleteNoteInput.value = "";
}

function deleteNote(event){		
	if(confirm("Se va a proceder a el borrado de la nota :"+ this.innerHTML)){
		this.remove();	
	}
	event.preventDefault();			
}
function deleteNoteNumber(numberLi){
	if(confirm("Se va a proceder a el borrado de la nota: "+listNotes.children[numberLi-1].innerHTML)){
		listNotes.children[numberLi-1].remove();	
	}
}