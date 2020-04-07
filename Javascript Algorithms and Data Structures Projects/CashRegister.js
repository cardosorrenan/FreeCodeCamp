const dolar_ref = { 
  "ONE HUNDRED": 100, "TWENTY": 20, "TEN": 10, 
  "FIVE": 5, "ONE": 1, "QUARTER": 0.25, "DIME": 0.10, 
  "NICKEL": 0.05, "PENNY": 0.01, 
}

function format(input) {
  let output = {}
  for (let i = 0; i < input.length; i++) {
    let value = dolar_ref[input[i]]
    if (input[i] in output) {
      output[input[i]] += value
    } else {
      output[input[i]] = value
    }  
  }
  return Object.keys(output).map((key) => [key, output[key]]); 
}

function authorizeDebit(drawer, value, type) {
  console.log("Conferindo caixa registradora...")
  for (let i = 0; i < drawer.length; i++ ) {
    if (drawer[i][0] === value) {
      if (drawer[i][1] != 0) {
        console.log("Valor autorizado!")
        drawer[i][1] = parseFloat(drawer[i][1] - type[value]).toFixed(2)
        return true
      } else {
        console.log("Não autorizado: Cédula/moeda inexistente..")
      }
    }
  }
}

function calculeChange(drawer, change) {
  let result = []
  let atHand = drawer.filter(a => a[1]).map(a => dolar_ref[a[0]]).reverse()
  while(change != 0 && !!atHand.filter(a => a <= change).length) {
    change = parseFloat(change).toFixed(2)
    console.log("\nValor faltante à repassar: " + change) 
    console.log(`Valores disponíveis: [ ${atHand} ]`)
    for (let i = 0; i < atHand.length ; i++) {
      let value = ''
      if (atHand[i] <= change) {   
        value = Object.keys(dolar_ref).find(key => dolar_ref[key] === atHand[i])
        console.log("Valor escolhido: " + dolar_ref[value])
        if (authorizeDebit(drawer, value, dolar_ref)) {
          result.push(value)
          change -= dolar_ref[value]
          console.log(`Á repassar: [ ${result.map(a => dolar_ref[a])} ]`)
        } else {
          atHand = atHand.filter(bill => bill != dolar_ref[value])
        }
        break
      }
    }
  } 
  return result
}

function checkCashRegister(price, cash, drawer) {
  const copyDrawer = JSON.parse(JSON.stringify(drawer));
  const changeToPass = cash - price;
  const changeInCoins = changeToPass % 1
  const changeInBills = changeToPass - changeInCoins
  const totalInDrawer = parseFloat(drawer.reduce((a,b) => a + b[1], 0)).toFixed(2);
  const billChange = calculeChange(drawer, changeInBills);
  const coinChange = calculeChange(drawer, changeInCoins);
  const changeSendDrawer = format([ ...billChange, ...coinChange ])
    .map(a => a[1])
    .reduce((a, b) => a + b, 0)
    .toFixed(2)

  return ( changeToPass == totalInDrawer ) ?
    { status: "CLOSED", change: copyDrawer }
    : ( changeToPass == changeSendDrawer ) ? 
      { status: "OPEN", change: format([ ...billChange, ...coinChange ]) } 
      : { status: "INSUFFICIENT_FUNDS", change: [] }

}

checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])