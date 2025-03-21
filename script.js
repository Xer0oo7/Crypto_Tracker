document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle");
    const refreshButton = document.getElementById("refresh");
    const searchInput = document.getElementById("search");
    const cryptoList = document.getElementById("crypto-list");
    const API_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd";

    async function fetchCryptoData() {
        try {
            refreshButton.disabled = true; // Disable while loading
            refreshButton.innerText = "🔄 Loading...";

            const response = await fetch(API_URL);
            const data = await response.json();
            displayCryptos(data);
        } catch (error) {
            console.error("Failed to fetch crypto data:", error);
        } finally {
            refreshButton.disabled = false; // Re-enable after loading
            refreshButton.innerText = "🔄 Refresh";
        }
    }

    function displayCryptos(data) {
        cryptoList.innerHTML = "";
        data.forEach(coin => {
            const div = document.createElement("div");
            div.classList.add("crypto");
            div.innerHTML = `
                <h3>${coin.name} (${coin.symbol.toUpperCase()})</h3>
                <p>💰 Price: $${coin.current_price}</p>
                <p>📉 24h Change: ${coin.price_change_percentage_24h.toFixed(2)}%</p>
            `;
            cryptoList.appendChild(div);
        });
    }

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    });

    refreshButton.addEventListener("click", fetchCryptoData); // Refresh on click

    searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase();
        document.querySelectorAll(".crypto").forEach(crypto => {
            crypto.style.display = crypto.innerText.toLowerCase().includes(searchTerm) ? "block" : "none";
        });
    });

    fetchCryptoData();
    setInterval(fetchCryptoData, 30000); // Auto refresh every 30 seconds
});
