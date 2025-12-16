// etapas relogio pomodoro
// tempo de foco: 25 minutos
// pausa curta: 5 minutos
// pausa longa: 15 minutos
// ciclos com pausa longa: geralmente 4 ciclos
// a pessoa pode gerenciar quantos ciclos deseja? sim ou não *verificar

// tempoRestante = em segundos
// modoAtual = foco pausaCurta pausaLonga
// ciclosCompletos = numero inteiro
// timerAtivo = true or false

const tempoFoco = 25 * 60
const pausaCurta = 5 * 60
const pausaLonga = 15 * 60

const ciclosTotais = 4

let modoAtual = "foco"
let ciclosCompletos = 0
let tempoRestante = tempoFoco
let timer = null

const tempoDisplay = document.getElementById("tempo-em-segundos")
const modoDisplay = document.getElementById("modo-atual")
const iniciar = document.getElementById("iniciar")
iniciar.addEventListener("click", clicar)
const reset = document.getElementById("reset")
reset.addEventListener("click", resetar)

document.body.className = modoAtual

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
  atualizaDisplay()
  atualizaModoDisplay()
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
      console.log("Ciclo Finalizado")
      decidirProximoModo()
      atualizaTextoBotao()
    }
  }, 1000)
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
  } else {
    iniciar.textContent = "Pausar"
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
    clearInterval(timerInterval)
    timer = null
    atualizaDisplay()
  }
  modoAtual = "foco"
  ciclosCompletos = 0

  carregarTempoDoModo()
  atualizaDisplay()
  atualizaTextoBotao()
  atualizaModoAtual()
}
function atualizaModoAtual() {
  if (modoAtual === "foco") {
    modoDisplay.textContent = "Foco"
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
    modoTexto = "Foco"
  } else if (modoAtual === "pausaCurta") {
    modoTexto = "Pausa Curta"
  } else {
    modoTexto = "Pausa Longa"
  }

  document.title = `Pomodoro: ${tempoFormatado} - ${modoTexto}`
}

carregarTempoDoModo()
atualizaDisplay()
atualizaModoDisplay()
atualizaTextoBotao()
resetar()
atualizaModoAtual()
