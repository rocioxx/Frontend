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

