import React, { useState, useEffect } from 'react';
import { LineChart, TrendingUp, Activity, DollarSign, RefreshCw, Zap } from 'lucide-react';
import AssetChart from './components/AssetChart';
import { generateHistory, generatePrediction, fetchLivePrice } from './services/marketData';

function App() {
  const [activeTab, setActiveTab] = useState('crypto'); // 'crypto' or 'commodities'
  const [btcData, setBtcData] = useState([]);
  const [ethData, setEthData] = useState([]);
  const [goldData, setGoldData] = useState([]);
  const [silverData, setSilverData] = useState([]);

  const [livePrices, setLivePrices] = useState({
    BTC: 0, ETH: 0, XAU: 0, XAG: 0
  });

  // Initialize Data
  useEffect(() => {
    const loadData = () => {
      // Load Crypto
      const btcHist = generateHistory('BTC');
      const btcPred = generatePrediction('BTC', btcHist[btcHist.length - 1].price);
      setBtcData([...btcHist, ...btcPred]);

      const ethHist = generateHistory('ETH');
      const ethPred = generatePrediction('ETH', ethHist[ethHist.length - 1].price);
      setEthData([...ethHist, ...ethPred]);

      // Load Commodities
      const goldHist = generateHistory('XAU');
      const goldPred = generatePrediction('XAU', goldHist[goldHist.length - 1].price);
      setGoldData([...goldHist, ...goldPred]);

      const silverHist = generateHistory('XAG');
      const silverPred = generatePrediction('XAG', silverHist[silverHist.length - 1].price);
      setSilverData([...silverHist, ...silverPred]);
    };

    loadData();
    // Refresh prediction/history every 5 minutes
    const interval = setInterval(loadData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Live Ticker Effect
  useEffect(() => {
    const updatePrices = async () => {
      const btc = await fetchLivePrice('BTC');
      const eth = await fetchLivePrice('ETH');
      const xau = await fetchLivePrice('XAU');
      const xag = await fetchLivePrice('XAG');

      setLivePrices({ BTC: btc, ETH: eth, XAU: xau, XAG: xag });
    };

    updatePrices(); // Initial
    const interval = setInterval(updatePrices, 2000); // Every 2s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen pb-20 bg-darkBg text-white selection:bg-neonBlue selection:text-black">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none bg-gradient-radial from-[#1a1a23] to-[#0f0f13] z-0"></div>
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-neonBlue opacity-[0.03] blur-[150px] rounded-full z-0"></div>
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-neonPurple opacity-[0.03] blur-[150px] rounded-full z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">

        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-glass rounded-lg border border-glassBorder animate-pulse">
              <Zap className="text-neonBlue w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-wider">RatelRomulus <span className="text-neonBlue">LIVE</span></h1>
              <p className="text-xs text-gray-400">Global Markets & Forecasting</p>
            </div>
          </div>
          <div className="hidden md:flex gap-6">
            <StatsTicker label="BTC" value={livePrices.BTC} />
            <StatsTicker label="ETH" value={livePrices.ETH} />
            <StatsTicker label="GOLD" value={livePrices.XAU} color="text-yellow-400" />
          </div>
        </header>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-10">
          <div className="bg-glass p-1 rounded-full border border-glassBorder flex">
            <button
              onClick={() => setActiveTab('crypto')}
              className={`px-8 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === 'crypto' ? 'bg-neonBlue text-black shadow-[0_0_20px_rgba(0,243,255,0.4)]' : 'text-gray-400 hover:text-white'}`}
            >
              Crypto Inputs
            </button>
            <button
              onClick={() => setActiveTab('commodities')}
              className={`px-8 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === 'commodities' ? 'bg-neonGreen text-black shadow-[0_0_20px_rgba(10,255,240,0.4)]' : 'text-gray-400 hover:text-white'}`}
            >
              Commodities
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activeTab === 'crypto' ? (
            <>
              <div className="interactive-card p-6">
                <div className="flex justify-between items-end mb-2">
                  <div>
                    <h2 className="text-3xl font-bold flex items-center gap-3">
                      <img src="https://assets.coingecko.com/coins/images/1/small/bitcoin.png" className="w-8 h-8" /> Bitcoin
                    </h2>
                    <p className="text-4xl font-mono mt-2 text-neonBlue">${livePrices.BTC.toLocaleString([], { minimumFractionDigits: 2 })}</p>
                  </div>
                  <div className="text-green-400 flex items-center gap-1 text-sm bg-green-400/10 px-2 py-1 rounded">
                    <TrendingUp size={16} /> +2.4%
                  </div>
                </div>
                <AssetChart data={btcData} symbol="BTC" color="#00f3ff" />
              </div>

              <div className="interactive-card p-6">
                <div className="flex justify-between items-end mb-2">
                  <div>
                    <h2 className="text-3xl font-bold flex items-center gap-3">
                      <img src="https://assets.coingecko.com/coins/images/279/small/ethereum.png" className="w-8 h-8" /> Ethereum
                    </h2>
                    <p className="text-4xl font-mono mt-2 text-purple-400">${livePrices.ETH.toLocaleString([], { minimumFractionDigits: 2 })}</p>
                  </div>
                  <div className="text-green-400 flex items-center gap-1 text-sm bg-green-400/10 px-2 py-1 rounded">
                    <TrendingUp size={16} /> +1.8%
                  </div>
                </div>
                <AssetChart data={ethData} symbol="ETH" color="#bc13fe" />
              </div>
            </>
          ) : (
            <>
              <div className="interactive-card p-6">
                <div className="flex justify-between items-end mb-2">
                  <div>
                    <h2 className="text-3xl font-bold flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold text-xs">Au</div> Gold
                    </h2>
                    <p className="text-4xl font-mono mt-2 text-yellow-400">${livePrices.XAU.toLocaleString([], { minimumFractionDigits: 2 })}</p>
                  </div>
                  <div className="text-green-400 flex items-center gap-1 text-sm bg-green-400/10 px-2 py-1 rounded">
                    <TrendingUp size={16} /> +0.5%
                  </div>
                </div>
                <AssetChart data={goldData} symbol="XAU (Gold)" color="#facc15" />
              </div>

              <div className="interactive-card p-6">
                <div className="flex justify-between items-end mb-2">
                  <div>
                    <h2 className="text-3xl font-bold flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-black font-bold text-xs">Ag</div> Silver
                    </h2>
                    <p className="text-4xl font-mono mt-2 text-gray-300">${livePrices.XAG.toLocaleString([], { minimumFractionDigits: 2 })}</p>
                  </div>
                  <div className="text-red-400 flex items-center gap-1 text-sm bg-red-400/10 px-2 py-1 rounded">
                    <Activity size={16} /> -0.2%
                  </div>
                </div>
                <AssetChart data={silverData} symbol="XAG (Silver)" color="#d1d5db" />
              </div>
            </>
          )}
        </div>

        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>Data provided by Romulus Analytics Engine. 2-Day Forecast based on ML Stochastic Volatility Models.</p>
        </div>
      </div>
    </div>
  );
}

const StatsTicker = ({ label, value, color = "text-white" }) => (
  <div className="flex flex-col">
    <span className="text-xs text-gray-500 font-semibold">{label}</span>
    <span className={`font-mono ${color}`}>${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
  </div>
);

export default App;
