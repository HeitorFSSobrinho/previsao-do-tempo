const chaveDaApi = '5d8311b34a234fc586501816232311'
const botaoDeBusca = document.querySelector('.btn-busca')

botaoDeBusca.addEventListener('click', async () => {
    const cidade = document.getElementById('input-busca').value
    if (!cidade) return
    const dados = await buscarDadosDaCidade(cidade)
    if (dados) {
        preencherDadosNaTela(dados, cidade)
    } else {
        window.alert('CIDADE INEXISTENTE, TENTE NOVAMENTE!')
    }

})

async function buscarDadosDaCidade(cidade) {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${chaveDaApi}&q=${cidade}&aqi=no&lang=pt`
    const resposta = await fetch(apiUrl)
    if (resposta.status !== 200) return
    const dados = resposta.json()
    return dados
}

function preencherDadosNaTela(dados, cidade) {
    document.getElementById('cidade').textContent = cidade
    const temperatura = dados.current.temp_c
    document.getElementById('temperatura').textContent = `${temperatura} ºC`
    const condicao = dados.current.condition.text
    document.getElementById('condicao').textContent = condicao
    const humidade = dados.current.humidity
    document.getElementById('humidade').textContent = `${humidade}%`
    const velocidadeDoVento = dados.current.wind_kph
    document.getElementById('velocidade-do-vento').textContent = `${velocidadeDoVento} Km/h`
    const iconeCondicao = dados.current.condition.icon
    document.getElementById('icone-condicao').setAttribute('src', iconeCondicao)
}