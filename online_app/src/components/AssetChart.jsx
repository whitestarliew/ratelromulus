import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const AssetChart = ({ data, symbol, color = "#00f3ff" }) => {
    // Split data into history and forecast for rendering
    // We actually feed all data to the chart, but we might want distinct visual styles?
    // Recharts 'split' styling is tricky. Easiest way is to have two data keys or use gradient.
    // Strategy: We will use a gradient mask or similar, OR simply just map the data so forecast points have null 'history' and history points have null 'forecast'.

    const processedData = data.map(item => ({
        ...item,
        // If it's history, put value in 'price', if forecast, put in 'forecastPrice'
        // Actually, to make lines connect, the last history point must be the first forecast point.
        // simpler approach: Just one line, but we add a vertical reference line at "Now".
        historyPrice: item.isForecast ? null : item.price,
        forecastPrice: item.isForecast ? item.price : null,
        // We need the overlap point to connect them visually?
        // For this demo, let's keep it simple: Single line, but we mark the prediction zone.
        combinedPrice: item.price
    }));

    // Find the index where prediction starts
    const predictionStartIndex = data.findIndex(d => d.isForecast);
    const predictionStartLabel = predictionStartIndex !== -1 ? data[predictionStartIndex].timeLabel : '';

    return (
        <div className="w-full h-[300px] glass-panel p-4 mt-4 relative">
            <div className="absolute top-4 left-4 z-10">
                <h3 className="text-xl font-bold flex items-center gap-2">
                    {symbol} <span className="text-xs font-normal text-gray-400">Live + 2 Day Forecast</span>
                </h3>
            </div>

            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id={`gradient-${symbol}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                            <stop offset="95%" stopColor={color} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                    <XAxis
                        dataKey="timeLabel"
                        stroke="#ffffff50"
                        tick={{ fontSize: 12 }}
                        minTickGap={30}
                    />
                    <YAxis
                        stroke="#ffffff50"
                        domain={['auto', 'auto']}
                        tick={{ fontSize: 12 }}
                        tickFormatter={(val) => `$${val.toLocaleString()}`}
                    />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#1a1a23', border: '1px solid rgba(255,255,255,0.1)' }}
                        labelStyle={{ color: '#aaa' }}
                    />

                    {/* Main Price Line */}
                    <Area
                        type="monotone"
                        dataKey="price"
                        stroke={color}
                        strokeWidth={2}
                        fillOpacity={1}
                        fill={`url(#gradient-${symbol})`}
                    />

                    {/* Vertical Line marking "NOW" */}
                    {predictionStartIndex !== -1 && (
                        <ReferenceLine x={data[predictionStartIndex].timeLabel} stroke="#ffffff" strokeDasharray="3 3" label={{ position: 'top', value: 'PREDICTION START', fill: 'white', fontSize: 10 }} />
                    )}

                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default AssetChart;
