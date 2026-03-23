import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, TrendingUp, ChevronRight, Share2, Info, RotateCcw } from 'lucide-react';

// --- Types ---
interface PositionData {
  amount: string;
  leverage: string;
  totalValue: string;
  openPrice: string;
  pnl: string;
  roi: string;
}

// --- Components ---

const LiquidationShatter = ({ onComplete, width, height }: { onComplete: () => void; width: number; height: number }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const rows = 6;
  const cols = 6;
  const shardWidth = width / cols;
  const shardHeight = height / rows;

  return (
    <div className="absolute inset-0 pointer-events-none z-50">
      <div className="relative w-full h-full">
        {[...Array(rows * cols)].map((_, i) => {
          const row = Math.floor(i / cols);
          const col = i % cols;
          const initialX = col * shardWidth;
          const initialY = row * shardHeight;
          
          // Random trajectory for glass shards
          const angle = Math.random() * Math.PI * 2;
          const force = 400 + Math.random() * 800;
          const targetX = initialX + Math.cos(angle) * force;
          const targetY = initialY + Math.sin(angle) * force + 800; // Gravity
          const rotateX = Math.random() * 720;
          const rotateY = Math.random() * 720;
          const rotateZ = Math.random() * 720;

          // Irregular glass polygon shapes
          const p1 = `${Math.random() * 30}% ${Math.random() * 30}%`;
          const p2 = `${70 + Math.random() * 30}% ${Math.random() * 30}%`;
          const p3 = `${70 + Math.random() * 30}% ${70 + Math.random() * 30}%`;
          const p4 = `${Math.random() * 30}% ${70 + Math.random() * 30}%`;
          const p5 = `${Math.random() * 50}% ${Math.random() * 50}%`; // Extra point for irregularity

          return (
            <motion.div
              key={i}
              initial={{ 
                x: initialX, 
                y: initialY, 
                opacity: 1, 
                scale: 1,
                rotateX: 0,
                rotateY: 0,
                rotateZ: 0
              }}
              animate={{ 
                x: targetX, 
                y: targetY, 
                opacity: 0, 
                scale: 0.5,
                rotateX,
                rotateY,
                rotateZ
              }}
              transition={{ 
                duration: 1.2 + Math.random() * 0.6, 
                ease: [0.1, 0.9, 0.2, 1],
                delay: Math.random() * 0.05 
              }}
              className="absolute bg-[#1A1235] border border-white/10 shadow-xl overflow-hidden"
              style={{
                width: shardWidth + 2,
                height: shardHeight + 2,
                clipPath: `polygon(${p1}, ${p2}, ${p3}, ${p4}, ${p5})`,
              }}
            >
              {/* Glass Glint */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent" />
              
              {/* Random Cracks */}
              <div 
                className="absolute inset-0 border-t border-white/5 rotate-45 translate-x-1/2" 
                style={{ transform: `rotate(${Math.random() * 360}deg) scale(${0.5 + Math.random()})` }}
              />
              <div 
                className="absolute inset-0 border-l border-white/5 -rotate-45 -translate-y-1/2" 
                style={{ transform: `rotate(${Math.random() * 360}deg) scale(${0.5 + Math.random()})` }}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

const SuccessModal = ({ isOpen, onClose, data }: { isOpen: boolean; onClose: () => void; data: PositionData }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative w-[340px] bg-[#2A253A] rounded-[32px] p-8 shadow-2xl overflow-visible"
          >
            {/* Top Purple Glow */}
            <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#9C27B0]/60 to-transparent rounded-t-[32px] pointer-events-none" />

            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-1.5 bg-white/10 hover:bg-white/20 rounded-lg transition-colors z-10"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Coin Stack Illustration */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-full flex justify-center pointer-events-none">
              <div className="relative">
                {/* Glow behind coins */}
                <div className="absolute inset-0 bg-yellow-400/40 blur-[40px] rounded-full scale-150" />
                
                {/* Glowing Ring */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-4 border border-yellow-400/30 rounded-full"
                  style={{ borderRadius: '50%', transformOrigin: 'center' }}
                />
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-8 border border-purple-400/20 rounded-full"
                  style={{ borderRadius: '50%', transformOrigin: 'center' }}
                />

                {/* Coin Stack */}
                <div className="relative flex flex-col items-center">
                  {/* Floating Main Coin */}
                  <motion.div 
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="w-24 h-24 bg-gradient-to-br from-[#FFE082] via-[#FFD54F] to-[#FBC02D] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,213,79,0.5)] border-4 border-[#FFF9C4]/50 z-20"
                  >
                    <span className="text-5xl font-black text-white italic drop-shadow-md">U</span>
                  </motion.div>
                  
                  {/* Stacked Coins Below */}
                  <div className="flex flex-col -mt-4 items-center">
                    <div className="w-20 h-6 bg-gradient-to-r from-[#FBC02D] to-[#F57F17] rounded-full border-b-4 border-[#E65100] shadow-lg -mb-4 z-10" />
                    <div className="w-24 h-6 bg-gradient-to-r from-[#FBC02D] to-[#F57F17] rounded-full border-b-4 border-[#E65100] shadow-lg -mb-4 z-[5]" />
                    <div className="w-28 h-6 bg-gradient-to-r from-[#FBC02D] to-[#F57F17] rounded-full border-b-4 border-[#E65100] shadow-lg" />
                  </div>
                </div>

                {/* Sparkles */}
                <motion.div animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }} transition={{ duration: 2, repeat: Infinity }} className="absolute -top-4 -right-8 text-white text-2xl">✦</motion.div>
                <motion.div animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity, delay: 0.7 }} className="absolute top-10 -left-10 text-white text-xl">✦</motion.div>
              </div>
            </div>

            <div className="mt-16 relative z-10">
              <h2 className="text-2xl font-bold text-center text-white mb-8">平仓成功</h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-white text-[15px]">盈亏/收益率</span>
                  <div className="flex items-center gap-2">
                    <div className="w-[18px] h-[18px] bg-gradient-to-br from-[#FFE082] to-[#FBC02D] rounded-full flex items-center justify-center text-[10px] font-bold text-white italic shadow-sm">U</div>
                    <span className="text-[#FF6B00] font-bold text-lg">-100.00 (-3%)</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white text-[15px]">开仓价格</span>
                  <span className="text-white font-semibold text-[15px]">${data.openPrice}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white text-[15px]">平仓价格</span>
                  <span className="text-white font-semibold text-[15px]">$52,800.00</span>
                </div>
              </div>

              <button 
                onClick={onClose}
                className="w-full py-3.5 bg-[#5E35B1] hover:bg-[#512DA8] border border-[#7E57C2] text-white font-medium rounded-full transition-all active:scale-[0.98] text-[15px]"
              >
                找好友帮我赚回来
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const [liquidationState, setLiquidationState] = useState<'idle' | 'shaking' | 'cracked' | 'shattering' | 'done'>('idle');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isPositionVisible, setIsPositionVisible] = useState(true);
  const [btcPrice, setBtcPrice] = useState(95096.0);
  const [chartData, setChartData] = useState<number[]>([]);
  const positionRef = useRef<HTMLDivElement>(null);

  // Real-time price simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setBtcPrice(prev => {
        const change = (Math.random() - 0.5) * 10;
        return Number((prev + change).toFixed(1));
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Real-time chart simulation
  useEffect(() => {
    const initialData = Array.from({ length: 20 }, () => 40 + Math.random() * 40);
    setChartData(initialData);

    const interval = setInterval(() => {
      setChartData(prev => {
        const newData = [...prev.slice(1), 40 + Math.random() * 40];
        return newData;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const positionData: PositionData = {
    amount: "52,800.0",
    leverage: "200x",
    totalValue: "52,800.0",
    openPrice: "108,778.59",
    pnl: "-200.39",
    roi: "-8.72%"
  };

  const handleLiquidation = () => {
    setLiquidationState('shaking');
    setTimeout(() => {
      setLiquidationState('cracked');
      // 碎裂状态停留 0.5s 后，碎片开始飞散，同时弹出成功弹窗
      setTimeout(() => {
        setLiquidationState('shattering');
        setShowSuccess(true);
      }, 500);
    }, 400);
  };

  const onShatterComplete = () => {
    setIsPositionVisible(false);
    setLiquidationState('done');
  };

  const resetDemo = () => {
    setIsPositionVisible(true);
    setLiquidationState('idle');
    setShowSuccess(false);
  };

  return (
    <div className="min-h-screen bg-[#0A051A] text-white font-sans selection:bg-purple-500/30 overflow-hidden">
      <div className="max-w-md mx-auto min-h-screen flex flex-col p-4 relative">
        
        {/* Floating Reset Button */}
        <button
          onClick={resetDemo}
          className="fixed bottom-6 right-6 z-[200] bg-[#6200EA] text-white p-4 rounded-full shadow-2xl hover:bg-[#7C4DFF] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 border border-white/10"
        >
          <RotateCcw className="w-5 h-5" />
          <span className="font-bold text-sm hidden sm:inline">重置演示</span>
        </button>

        {/* Header Section */}
        <div className="bg-[#1A1235] rounded-[28px] p-5 mb-4 flex justify-between items-center border border-white/5 shadow-lg">
          <div>
            <p className="text-[11px] text-white/40 mb-1 font-medium">当前总盈亏/收益率：</p>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-[#FBC02D] rounded-full flex items-center justify-center text-[10px] font-bold text-white italic shadow-sm">U</div>
              <span className="text-[#00E676] text-2xl font-bold tracking-tight">95,096 (+11000%)</span>
            </div>
          </div>
          <button className="bg-[#6200EA] px-5 py-2.5 rounded-full text-sm font-bold hover:bg-[#7C4DFF] transition-all active:scale-95 shadow-lg shadow-purple-900/20">
            立即分享
          </button>
        </div>

        {/* Leverage Display */}
        <div className="flex flex-col items-center mb-8 mt-2">
          <div className="bg-[#FFD600] text-black text-[11px] font-black px-4 py-1 rounded-full mb-3 flex items-center gap-1.5 shadow-md">
            <span className="w-1.5 h-1.5 bg-black rounded-full" />
            中级场
          </div>
          <h1 className="text-[84px] font-black tracking-tighter leading-none mb-2">500x</h1>
          <p className="text-[13px] text-white/40 font-medium">参与门槛: $1000  当前人数: 200</p>
        </div>

        {/* Chart Area */}
        <div className="bg-[#1A1235] rounded-[32px] p-5 mb-5 border border-white/5 flex-1 flex flex-col shadow-xl">
          <div className="flex justify-between items-center mb-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-[#F57C00] rounded-full flex items-center justify-center shadow-lg">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-[15px] font-bold">BTC/USDT</p>
                <p className="text-[13px] text-[#00E676] font-bold">${btcPrice.toLocaleString()} +0.26%</p>
              </div>
            </div>
            <div className="bg-white/5 px-4 py-2 rounded-2xl flex items-center gap-2 text-xs text-white/60 font-bold border border-white/5">
              30s <ChevronRight className="w-4 h-4 rotate-90 opacity-50" />
            </div>
          </div>
          
          {/* Chart Viewport */}
          <div className="flex-1 relative bg-black/30 rounded-[24px] overflow-hidden border border-white/5 p-3">
            <div className="absolute top-4 right-4 text-[11px] text-white/20 text-right space-y-2 font-mono">
              <p>95,796.0</p>
              <p>95,696.0</p>
              <p className="text-[#FFD600]/40">95,589.3</p>
              <p>95,496.0</p>
              <p>95,396.0</p>
            </div>

            {/* Scrolling Candlesticks */}
            <div className="absolute inset-0 flex items-end gap-1.5 p-5">
              {chartData.map((h, i) => (
                <motion.div 
                  key={i} 
                  layout
                  className="flex-1 flex flex-col items-center justify-end h-full"
                >
                  <motion.div 
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    className={`w-full rounded-[2px] shadow-sm ${i % 3 === 0 ? 'bg-[#FF5252]' : 'bg-[#00E676]'}`} 
                    style={{ height: `${h}%`, transformOrigin: 'bottom' }} 
                  />
                  <div className={`w-[1px] h-4 absolute bottom-0 ${i % 3 === 0 ? 'bg-[#FF5252]' : 'bg-[#00E676]'} opacity-30`} style={{ bottom: `${h}%` }} />
                </motion.div>
              ))}
            </div>

            {/* Liquidation Line */}
            <div className="absolute top-[35%] left-0 w-full h-[1px] bg-[#FFD600]/40 border-t border-dashed border-[#FFD600]/20 flex items-center">
              <div className="bg-[#FFD600] text-black text-[10px] font-black px-2 py-0.5 rounded-sm ml-4 shadow-md">强平价</div>
              <div className="ml-auto mr-4 text-[#FFD600] text-[10px] font-bold">95,589.3</div>
            </div>

            {/* Current Price Line */}
            <motion.div 
              animate={{ top: `${50 + (Math.random() - 0.5) * 5}%` }}
              className="absolute left-0 w-full h-[1px] bg-white/20 flex items-center"
            >
              <div className="w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </motion.div>
          </div>

          {/* Sentiment Bar */}
          <div className="mt-5 flex items-center gap-3 px-1">
            <span className="text-xs font-black text-[#00E676]">B</span>
            <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden flex shadow-inner">
              <motion.div animate={{ width: '45%' }} className="h-full bg-[#00E676] shadow-[0_0_10px_rgba(0,230,118,0.3)]" />
              <motion.div animate={{ width: '55%' }} className="h-full bg-[#FF5252] shadow-[0_0_10px_rgba(255,82,82,0.3)]" />
            </div>
            <span className="text-xs font-black text-[#FF5252]">S</span>
          </div>
        </div>

        {/* Position Details Box */}
        <AnimatePresence mode='wait'>
          {isPositionVisible ? (
            <motion.div
              key="position-box"
              ref={positionRef}
              exit={{ opacity: 0 }}
              animate={
                liquidationState === 'shaking' 
                  ? { x: [-5, 5, -5, 5, -3, 3, 0], y: [-2, 2, -2, 2, -1, 1, 0], scale: 1.02 } 
                  : liquidationState === 'cracked'
                  ? { x: 0, y: 0, scale: 1.02 }
                  : { x: 0, y: 0, scale: 1 }
              }
              transition={{ duration: 0.4 }}
              className="relative"
            >
              <motion.div 
                animate={
                  liquidationState === 'shattering' || liquidationState === 'done' 
                    ? { opacity: 0 } 
                    : liquidationState === 'shaking' || liquidationState === 'cracked'
                    ? { 
                        opacity: 1,
                        borderColor: ['rgba(255,255,255,0.1)', 'rgba(255,50,50,1)', 'rgba(255,255,255,0.1)'],
                        backgroundColor: '#1A1235',
                        boxShadow: ['0 25px 50px -12px rgba(0,0,0,0.25)', '0 0 50px 15px rgba(255,50,50,0.8)', '0 25px 50px -12px rgba(0,0,0,0.25)']
                      }
                    : { 
                        opacity: 1,
                        borderColor: 'rgba(255,255,255,0.1)',
                        backgroundColor: '#1A1235',
                        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
                      }
                }
                transition={
                  liquidationState === 'shaking' || liquidationState === 'cracked'
                    ? { duration: 0.12, repeat: Infinity, ease: "linear" }
                    : { duration: 0 }
                }
                className="rounded-[32px] p-7 border relative overflow-hidden"
              >
                
                {/* Cracks Overlay during shaking & cracked */}
                {(liquidationState === 'shaking' || liquidationState === 'cracked') && (
                  <svg className="absolute inset-0 w-full h-full z-40 pointer-events-none" style={{ filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.5))' }}>
                    <motion.path
                      d="M 20 0 L 50 50 L 30 100 L 80 150 L 60 200 L 100 250"
                      fill="transparent"
                      stroke="rgba(255,255,255,0.3)"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.path
                      d="M 300 0 L 250 80 L 280 120 L 200 180 L 220 220 L 150 300"
                      fill="transparent"
                      stroke="rgba(255,255,255,0.3)"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    />
                    <motion.path
                      d="M 0 150 L 80 130 L 120 180 L 200 160 L 250 200 L 350 180"
                      fill="transparent"
                      stroke="rgba(255,255,255,0.3)"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.2, delay: 0.2 }}
                    />
                    
                    {/* Extra cracks that appear instantly during 'cracked' state to simulate "分开裂一些" */}
                    {liquidationState === 'cracked' && (
                      <>
                        <motion.path
                          d="M 50 50 L 100 30 L 150 40"
                          fill="transparent"
                          stroke="rgba(255,255,255,0.4)"
                          strokeWidth="2"
                          strokeDasharray="2 4"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.1 }}
                        />
                        <motion.path
                          d="M 200 180 L 180 250 L 220 280"
                          fill="transparent"
                          stroke="rgba(255,255,255,0.4)"
                          strokeWidth="2"
                          strokeDasharray="2 4"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.1 }}
                        />
                        <motion.path
                          d="M 120 180 L 150 120 L 100 80"
                          fill="transparent"
                          stroke="rgba(255,255,255,0.4)"
                          strokeWidth="2"
                          strokeDasharray="2 4"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.1 }}
                        />
                      </>
                    )}
                  </svg>
                )}

                <div className="space-y-5 mb-8">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-white/40 text-[13px] font-medium">单次开仓金额</span>
                      <div className="flex items-center gap-1 bg-[#00E676]/10 px-2 py-0.5 rounded-md text-[11px] font-bold text-[#00E676]">
                        多
                      </div>
                      <div className="bg-white/5 px-2 py-0.5 rounded-md text-[11px] font-bold text-white/40 border border-white/5">
                        200x
                      </div>
                    </div>
                    <span className="font-bold text-[15px]">${positionData.amount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/40 text-[13px] font-medium">仓位总价值</span>
                    <span className="font-bold text-[15px]">${positionData.totalValue}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/40 text-[13px] font-medium">开仓价格</span>
                    <span className="font-bold text-[15px]">${positionData.openPrice}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/40 text-[13px] font-medium">未实现盈亏/收益率</span>
                    <span className="text-[#FF7043] font-bold text-[15px]">{positionData.pnl} ({positionData.roi})</span>
                  </div>
                </div>

                <button 
                  onClick={handleLiquidation}
                  disabled={liquidationState !== 'idle'}
                  className="w-full py-4 bg-[#2A2245] hover:bg-[#352B55] text-white font-bold rounded-[20px] transition-all active:scale-[0.98] border border-white/5 text-lg shadow-lg"
                >
                  平仓
                </button>

                <div className="mt-5 flex justify-center">
                  <button className="text-[13px] text-[#7C4DFF] font-bold flex items-center gap-1.5 hover:text-[#9575CD] transition-colors">
                    分享当前仓位
                  </button>
                </div>
              </motion.div>

              {/* Shatter Animation Overlay - Positioned over the card */}
              {liquidationState === 'shattering' && (
                <div className="absolute inset-0 z-50">
                  <LiquidationShatter 
                    onComplete={onShatterComplete} 
                    width={positionRef.current?.offsetWidth || 0} 
                    height={positionRef.current?.offsetHeight || 0} 
                  />
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-14 text-white/20"
            >
              <div className="w-12 h-12 rounded-full border-2 border-dashed border-white/10 flex items-center justify-center mb-4">
                <Info className="w-6 h-6" />
              </div>
              <p className="text-sm font-medium mb-4">仓位已爆裂</p>
              <button 
                onClick={resetDemo}
                className="text-xs font-bold text-[#7C4DFF] hover:underline"
              >
                重新开仓演示
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Banner */}
        <div className="mt-auto pt-5">
          <div className="bg-gradient-to-r from-[#2A1B4E] to-[#1A0B2E] rounded-[24px] p-5 flex items-center justify-between border border-white/5 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 bg-gradient-to-br from-[#7C4DFF]/20 to-transparent rounded-2xl flex items-center justify-center relative overflow-hidden border border-white/5">
                <div className="text-2xl">🎁</div>
              </div>
              <div>
                <p className="text-[15px] font-bold text-white/90">200 USDT 福利券待使用</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-white/20" />
          </div>
        </div>

        {/* Success Modal */}
        <SuccessModal 
          isOpen={showSuccess} 
          onClose={() => setShowSuccess(false)} 
          data={positionData}
        />

      </div>
    </div>
  );
}
