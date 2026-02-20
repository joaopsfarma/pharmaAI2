/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, ReactNode } from 'react';
import { motion } from 'motion/react';
import { Server, CheckCircle, Database, Code2, Terminal } from 'lucide-react';

export default function App() {
  const [serverStatus, setServerStatus] = useState<{ status: string; message: string } | null>(null);
  const [dbStatus, setDbStatus] = useState<{ status: string; message: string } | null>(null);

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => setServerStatus(data))
      .catch((err) => console.error('Failed to connect to server:', err));

    fetch('/api/db-check')
      .then((res) => res.json())
      .then((data) => setDbStatus(data))
      .catch((err) => console.error('Failed to connect to db:', err));
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-indigo-500/30">
      <div className="max-w-5xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            System Online
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-br from-white via-white/90 to-white/50 bg-clip-text text-transparent">
            Full-Stack Starter
          </h1>
          
          <p className="text-xl text-neutral-400 max-w-2xl leading-relaxed">
            Your environment is ready. This template includes a configured Express backend, 
            SQLite database, and React frontend with Tailwind CSS.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
            <StatusCard 
              icon={<Server className="w-6 h-6 text-emerald-400" />}
              title="Express Server"
              status={serverStatus ? 'Connected' : 'Connecting...'}
              description={serverStatus?.message || 'Waiting for response...'}
              active={!!serverStatus}
            />
            
            <StatusCard 
              icon={<Database className="w-6 h-6 text-blue-400" />}
              title="SQLite Database"
              status={dbStatus ? 'Connected' : 'Connecting...'}
              description={dbStatus?.message || 'Checking connection...'}
              active={!!dbStatus}
            />

            <StatusCard 
              icon={<Code2 className="w-6 h-6 text-purple-400" />}
              title="TypeScript"
              status="Configured"
              description="Strict mode enabled"
              active={true}
            />

            <StatusCard 
              icon={<Terminal className="w-6 h-6 text-orange-400" />}
              title="Tailwind CSS"
              status="v4.0"
              description="Utility-first styling"
              active={true}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function StatusCard({ icon, title, status, description, active }: { 
  icon: ReactNode; 
  title: string; 
  status: string; 
  description: string; 
  active: boolean;
}) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className={`p-6 rounded-2xl border transition-colors ${
        active 
          ? 'bg-neutral-900/50 border-neutral-800 hover:border-neutral-700' 
          : 'bg-red-950/10 border-red-900/20'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-xl bg-neutral-800/50 border border-neutral-700/50">
          {icon}
        </div>
        {active && <CheckCircle className="w-5 h-5 text-neutral-700" />}
      </div>
      <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
      <div className="flex items-center gap-2 mb-2">
        <span className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-emerald-500' : 'bg-red-500'}`} />
        <span className="text-sm font-medium text-neutral-300">{status}</span>
      </div>
      <p className="text-sm text-neutral-500">{description}</p>
    </motion.div>
  );
}
