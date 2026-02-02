// Simulating a backend service for market data
// In a real app, this would call CoinGecko or a specialized financial API.

const MOCK_START_PRICES = {
    BTC: 43500,
    ETH: 2300,
    XAU: 2030, // Gold
    XAG: 22.50  // Silver
};

// Volatility factors for simulation
const VOLATILITY = {
    BTC: 0.02,
    ETH: 0.025,
    XAU: 0.005,
    XAG: 0.01
};

export const fetchLivePrice = async (symbol) => {
    // For Demo purposes, we simulate "Live" data to ensure 24/7 availability without API rate limits.
    // In production, uncomment the fetch call below.

    // const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`);

    // Simulation:
    const base = MOCK_START_PRICES[symbol] || 100;
    const noise = (Math.random() - 0.5) * VOLATILITY[symbol] * base;
    return base + noise;
};

/**
 * Generates a 2-day forecast based on current price trend simulation
 * @param {string} symbol - The asset symbol (BTC, XAU, etc.)
 * @param {number} currentPrice - The latest real price
 * @returns {Array} - Array of data points { time, price, type: 'forecast' }
 */
export const generatePrediction = (symbol, currentPrice) => {
    const forecast = [];
    let price = currentPrice;
    const now = new Date();

    // Generate 48 hourly points (2 days)
    for (let i = 1; i <= 48; i++) {
        const time = new Date(now.getTime() + i * 60 * 60 * 1000);

        // Random Walk with drift (slight upward trend for optimism in demo!)
        const drift = 0.0002;
        const shock = (Math.random() - 0.5) * VOLATILITY[symbol];
        const change = price * (drift + shock);

        price += change;

        forecast.push({
            timestamp: time.toISOString(),
            timeLabel: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            price: parseFloat(price.toFixed(2)),
            isForecast: true
        });
    }
    return forecast;
};

export const generateHistory = (symbol) => {
    // Generate 24h of history
    const history = [];
    let price = MOCK_START_PRICES[symbol];
    const now = new Date();

    for (let i = 24; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60 * 60 * 1000);
        const shock = (Math.random() - 0.5) * VOLATILITY[symbol];
        price += price * shock;

        history.push({
            timestamp: time.toISOString(),
            timeLabel: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            price: parseFloat(price.toFixed(2)),
            isForecast: false
        });
    }
    return history;
};
