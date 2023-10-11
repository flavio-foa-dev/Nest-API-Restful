const timestamp = 1697054737004;

// const data = new Date();
// data.setTime();
// data.setTime(timestamp);

// console.log(data);

// const timestamp = 1633300800000;
const data = new Date();
data.setTime(timestamp);

const ano = data.getUTCFullYear();
const mes = data.getUTCMonth() + 1; // Adicione 1 porque os meses são baseados em zero.
const dia = data.getUTCDate();
const horas = data.getUTCHours();
const minutos = data.getUTCMinutes();
const segundos = data.getUTCSeconds();

console.log(`${ano}-${mes}-${dia} ${horas}:${minutos}:${segundos}`);
