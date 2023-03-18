const minhaVez = parseInt(process.argv[2])
const comptdr = Math.floor((Math.random()*10))
const result = minhaVez + comptdr

result %2 == 0 ? console.table(`o resultado foi ${result}, voce ganhou`): console.table(`voce perdeu ${result}`);