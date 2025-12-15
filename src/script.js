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

    const tempoDisplay = document.getElementById("tempo-em-segundos");
    const iniciar = document.getElementById("iniciar");
    const pause = document.getElementById("pause");

    let tempoRestante = 25 * 60;
    let timer = null;
    

    function atualizaDisplay(){
        const minutos = Math.floor(tempoRestante / 60);
        const segundos = tempoRestante % 60;
        
        const segundosFormatados = segundos < 10 ? "0" + segundos : segundos;

        tempoDisplay.textContent = minutos + ":" + segundosFormatados;
    
    }
    function inicio(){
        if (timer !== null) return;

        timer = setInterval(() => {
            tempoRestante--;

            atualizaDisplay();

            if(tempoRestante <= 0){
                clearInterval(timer);
                timer = null;
                console.log("Ciclo Finalizado");
            }
        }, 1000);
    }
     function pausado(){
        if (timer !== null) {
            clearInterval(timer);
            timer = null;   
    }
}
   iniciar.addEventListener("click", inicio);
   pause.addEventListener("click", pausado);
