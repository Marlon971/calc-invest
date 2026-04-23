// 1. Coloque seu Token aqui
const API_TOKEN = 'jRpHwKbpFmCVKe3R5BKdCc'; 

const btnCalculate = document.getElementById('btn-calculate');
const resultArea = document.getElementById('result-area');

btnCalculate.addEventListener('click', async () => {
    // Pegando os valores dos inputs
    const ticker = document.getElementById('ticker').value.toUpperCase().trim();
    const amount = parseFloat(document.getElementById('amount').value);
    const monthlyYield = parseFloat(document.getElementById('yield').value) || 0;

    // Validação básica
    if (!ticker || isNaN(amount)) {
        alert("Por favor, preencha o código da ação e o valor para investir.");
        return;
    }

    try {
        // Mudando o estado do botão
        btnCalculate.innerText = "Consultando Bolsa...";
        btnCalculate.disabled = true;

        // Buscando dados na API
        const response = await fetch(`https://brapi.dev/api/quote/${ticker}?token=${API_TOKEN}`);
        const resultData = await response.json(); // Aqui definimos a variável corretamente

        // Verificando se a API retornou resultados válidos
        if (resultData.results && resultData.results.length > 0) {
            const stock = resultData.results[0];
            const price = stock.regularMarketPrice;
            
            // Cálculos
            const shares = Math.floor(amount / price);
            const change = amount % price;
            const totalIncome = shares * monthlyYield;

            // Atualizando a tela com os resultados
            document.getElementById('res-price').innerText = `R$ ${price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
            document.getElementById('res-shares').innerText = shares;
            document.getElementById('res-change').innerText = `R$ ${change.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
            document.getElementById('res-income').innerText = `R$ ${totalIncome.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;

            // Mostra a área de resultados
            resultArea.classList.remove('hidden');
        } else {
            alert("Ação não encontrada. Verifique o código (ex: PETR4, VALE3).");
        }

    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Erro ao conectar com a API. Verifique seu token ou sua conexão.");
    } finally {
        // Volta o botão ao estado normal
        btnCalculate.innerText = "Simular Investimento";
        btnCalculate.disabled = false;
    }
});