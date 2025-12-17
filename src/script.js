// etapas relogio pomodoro
// tempo de foco: 25 minutos
// pausa curta: 5 minutos
// pausa longa: 15 minutos
// ciclos com pausa longa: geralmente 4 ciclos
// a pessoa pode gerenciar quantos ciclos deseja? sim ou não *verificar
const tempoDisplay = document.getElementById("tempo-em-segundos")
const modoDisplay = document.getElementById("modo-atual")
const iniciar = document.getElementById("iniciar")
const reset = document.getElementById("reset")
const selectTempo = document.getElementById("tempoSelecionado")
const boxTempo = document.getElementById("box-tempo")
const btnConfig = document.getElementById("configurar")

iniciar.addEventListener("click", clicar)
reset.addEventListener("click", resetar)
selectTempo.addEventListener("change", configuracao)
btnConfig.addEventListener("click", () => {
  boxTempo.classList.toggle("ativo")
})

let tempoFoco = 25 * 60
const pausaCurta = 5 * 60
const pausaLonga = 15 * 60

const ciclosTotais = 4

let modoAtual = "foco"
let ciclosCompletos = 0
let tempoRestante = tempoFoco
let timer = null

document.body.className = modoAtual
selectTempo.value = tempoFoco / 60

function aplicarModo() {
  document.body.classList.remove("foco", "pausaCurta", "pausaLonga")
  document.body.classList.add(modoAtual)
}
function atualizaDisplay() {
  const minutos = Math.floor(tempoRestante / 60)
  const segundos = tempoRestante % 60
  tempoDisplay.textContent = `${minutos}:${segundos
    .toString()
    .padStart(2, "0")}`
}
function carregarTempoDoModo() {
  if (modoAtual === "foco") {
    tempoRestante = tempoFoco
  } else if (modoAtual === "pausaCurta") {
    tempoRestante = pausaCurta
  } else {
    tempoRestante = pausaLonga
  }
}
function decidirProximoModo() {
  if (modoAtual === "foco") {
    ciclosCompletos++
    if (ciclosCompletos === ciclosTotais) {
      modoAtual = "pausaLonga"
      ciclosCompletos = 0
    } else {
      modoAtual = "pausaCurta"
    }
  } else {
    modoAtual = "foco"
  }
  carregarTempoDoModo()
  aplicarModo()
  atualizaDisplay()
  atualizaModoAtual()
}

function inicio() {
  if (timer !== null) return

  timer = setInterval(() => {
    tempoRestante--
    atualizaDisplay()
    atualizaTitle()

    if (tempoRestante <= 0) {
      tempoRestante = 0
      atualizaDisplay()
      atualizaTitle()
      clearInterval(timer)
      timer = null
      decidirProximoModo()
      atualizaTextoBotao()
    }
  }, 2)
}
function pausado() {
  if (timer !== null) {
    clearInterval(timer)
    timer = null
  }
}
function clicar() {
  if (timer == null) {
    if (tempoRestante <= 0) {
      carregarTempoDoModo()
    }
    atualizaDisplay()
    inicio()
  } else {
    pausado()
  }
  atualizaTextoBotao()
}
function atualizaTextoBotao() {
  if (timer === null) {
    iniciar.textContent = "Iniciar"

    selectTempo.disabled = false
  } else {
    iniciar.textContent = "Pausar"
    selectTempo.disabled = true
  }
}
function atualizaModoDisplay() {
  if (modoAtual === "foco") {
    modoDisplay.textContent = "Modo: Foco"
  } else if (modoAtual === "pausaCurta") {
    modoDisplay.textContent = "Modo: Pausa Curta"
  } else {
    modoDisplay.textContent = "Modo: Pausa Longa"
  }
}
function resetar() {
  if (timer) {
    clearInterval(timer)
    timer = null
    atualizaDisplay()
  }
  modoAtual = "foco"
  ciclosCompletos = 0

  carregarTempoDoModo()
  aplicarModo()
  atualizaDisplay()
  atualizaTextoBotao()
  atualizaModoAtual()
}
function atualizaModoAtual() {
  if (modoAtual === "foco") {
    modoDisplay.textContent = "Modo Foco"
  } else if (modoAtual === "pausaCurta") {
    modoDisplay.textContent = "Pausa Curta"
  } else {
    modoDisplay.textContent = "Pausa Longa"
  }
}
function atualizaTitle() {
  const minutos = Math.floor(tempoRestante / 60)
  const segundos = tempoRestante % 60
  const tempoFormatado = `${minutos}:${segundos.toString().padStart(2, "0")}`

  let modoTexto = ""

  if (modoAtual === "foco") {
    modoTexto = "Modo Foco"
  } else if (modoAtual === "pausaCurta") {
    modoTexto = "Pausa Curta"
  } else {
    modoTexto = "Pausa Longa"
  }
  document.title = `Pomodoro: ${tempoFormatado} - ${modoTexto}`
}
function configuracao() {
  const novoTempo = Number(selectTempo.value)
  tempoFoco = novoTempo * 60

  if (modoAtual === "foco") {
    tempoRestante = tempoFoco
    atualizaDisplay()
  }
  selectTempo.classList.add("tempoSelecionado")
}
carregarTempoDoModo()
atualizaDisplay()
atualizaModoDisplay()
atualizaTextoBotao()
resetar()
atualizaModoAtual()
aplicarModo()
