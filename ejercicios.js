const numeros1 = [1,2,3,4,5,6,7,8,9,10];
const paresCuadrado = numeros1.filter(n => n % 2 === 0).map(n => n * n);

const palabras2 = ["Hola", "mundo", "esto", "es", "JavaScript"];
const frase = palabras2.reduce((acc, cur) => acc + " " + cur, "").trim();

const hayMayor100 = numeros3.some(n => n > 100);
const todosPositivos = numeros3.every(n => n > 0);

const numeros4 = [5,1,8,3,10,2];
const ordenDesc = [...numeros4].sort((a,b) => b - a);

const numeros5 = [4,5,9,12,7];
const primeroDiv3 = numeros5.find(n => n % 3 === 0);
const indiceDiv3 = numeros5.findIndex(n => n % 3 === 0);

const numeros6 = [2,4,6,8];
let suma6 = 0;
numeros6.forEach(n => suma6 += n);

const numeros7 = [10,20,30,40,50,60];
const primeros3 = numeros7.slice(0,3);
const copia7 = [...numeros7];
copia7.splice(-2, 2); // elimina los dos últimos

const producto8 = { nombre: "Laptop", precio: 1000, stock: 5 };
const claves8 = Object.keys(producto8);
const valores8 = Object.values(producto8);