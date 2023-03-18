console.log("aplicação iniciada")

const msgns = process.argv[2]

if(msgns){
    console.log(`o argumento é ${msgns}`);
}else{
    console.log("cade o argumento seu verme ??");
}