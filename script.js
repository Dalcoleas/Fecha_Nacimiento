// Object Literal
var person = {
    /* property: value*/
    name: "Daniel",
    lastname: "Alcoleas",
    birthday: Date.now()
}; // JSON (JavaScript Object Notation)

// Access to propertys
console.log(person.name);
// Change object's property value
person.birthday = new Date(1994, 0, 11); // 11 - Jan - 1994
console.log(person.birthday);

console.log(person.dui) // undefined
person.dui = "000000000" // Assign 
console.log(person.dui) // 000000000

// Example
function createPerson(name, lastname, birthday, dui) {
    return {
        name,
        lastname,
        birthday,
        dui
    }
}

let list = [] // To save persons

// To Add 10 fake persons
for (let i = 0; i < 10; i++) {
    list.push(createPerson(`Name ${i}`, `Lastname ${i}`, new Date().setFullYear(1990 + i + Math.floor(Math.random() * 5)), `000000${i}`));
}

console.table(list);

// Array Higher function
// Show only the name persons
console.table(list.map(({
    name
}) => name));

// Get average age
console.log("Average age %i", list.reduce((sum, {
    birthday
}) => {
    var ageDifMs = Date.now() - birthday;
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970) + sum;
}, 0) / list.length);


// More readable

function getAge(birthday) {
    var ageDifMs = Date.now() - birthday; // Acá se obtiene la diferencia, entre la fecha de ahora y la de cumpleaños. El resultado es dado en milisegundos
    var ageDate = new Date(ageDifMs); // miliseconds from epoch 
    // Se crea el objeto de tipo Fecha, en el cual lleva el resultado del calculo anterior. Siempre en milisegundos.
    var actualAge = Math.abs(ageDate.getUTCFullYear()-1970) // Acá se obtiene la edad actual, utilizando el cálculo anterior. Se usa el valor absoluto para validar el resultado. Se usa 1970, de acuerdo a https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Date/UTC , porque calcula en milisegundos , a partir de 1970.
    if(ageDate.getMonth > Date.now().getMonth){ // Acá es lo nuevo. Se valida que si la fecha de cumpleaños es antes o despues del mes actual.
        return actualAge--; // Si es así, se le resta uno a la edad. Porque de lo contrario nos sumaría un año a nuestra edad actual, aunque aun no lo hayamos cumplido.
    }
    return actualAge;
}

console.log("Average age %i", list.reduce((sum, {
    birthday
}) => getAge(birthday) + sum, 0) / list.length);