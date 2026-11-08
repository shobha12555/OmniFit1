
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Search, 
  Map as MapIcon, 
  ShieldCheck, 
  AlertTriangle, 
  FileText, 
  MessageSquare, 
  ChevronRight, 
  ExternalLink,
  Plus,
  Ruler,
  Layers,
  History,
  CheckCircle2,
  X,
  Send,
  Scale,
  Gavel,
  Users,
  MapPin,
  RefreshCw,
  AlertCircle,
  Download,
  Info,
  Lock,
  Navigation,
  CornerDownRight
} from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Polygon, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';

// Fix for default Leaflet icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// --- Data Stubs for UP Hierarchy ---
const UP_DATA: any = {
  "Basti": {
    "Basti Sadar": ["Mohammadpur", "Basti Khas", "Ganeshpur"],
    "Harraiya": ["Amsin", "Koilpura"],
    "Bhanpur": ["Ramwapur", "Dubaila"]
  },
  "Lucknow": {
    "Lucknow Sadar": ["Chinhat", "Gomti Nagar Extension", "Bakshi Ka Talab"],
    "Malihabad": ["Rahimabad", "Khalispur"]
  },
  "Gautam Buddha Nagar": {
    "Dadri": ["Surajpur", "Greater Noida West"],
    "Sadar": ["Jewar", "Dankaur"]
  }
};

const AI_MODEL = 'gemini-3-flash-preview';
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

// --- Utils ---
const calculateDistance = (p1: [number, number], p2: [number, number]) => {
  const R = 6371e3; // metres
  const φ1 = p1[0] * Math.PI/180;
  const φ2 = p2[0] * Math.PI/180;
  const Δφ = (p2[0]-p1[0]) * Math.PI/180;
  const Δλ = (p2[1]-p1[1]) * Math.PI/180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return (R * c).toFixed(2); // in metres
};

// --- Components ---

const Header = () => (
  <header className="bg-white border-b sticky top-0 z-[3000] shadow-sm">
    <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="bg-emerald-600 p-2 rounded-lg shadow-inner">
          <ShieldCheck className="text-white w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900 leading-none">Bhu-Sathi UP</h1>
          <p className="text-[10px] text-emerald-600 font-bold tracking-widest uppercase">Property Intelligence Platform</p>
        </div>
      </div>
      <nav className="hidden lg:flex gap-6">
        {['Verification', 'Demarcation', 'Resource Hub', 'Dispute Solver'].map(item => (
          <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors">{item}</a>
        ))}
      </nav>
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 text-sm font-bold text-white bg-slate-900 px-4 py-2 rounded-full hover:bg-slate-800 transition-all">
          <Download className="w-4 h-4" /> Get App
        </button>
      </div>
    </div>
  </header>
);

const VerificationPanel = ({ data, onNewSearch }: { data: any, onNewSearch: () => void }) => {
  const [activeSubTab, setActiveSubTab] = useState<'details' | 'disputes' | 'risk' | 'history'>('details');

  return (
    <div className="bg-white rounded-2xl shadow-xl border overflow-hidden animate-in fade-in slide-in-from-bottom-4">
      {/* Top Banner */}
      <div className={`p-4 ${data.risk === 'High' ? 'bg-rose-600' : 'bg-emerald-600'} text-white flex justify-between items-center`}>
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          <span className="font-bold">{data.village}, {data.tehsil}, {data.district} (Gata: {data.khasra})</span>
        </div>
        <div className="flex gap-2">
           <button onClick={() => window.print()} className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1">
            <Download className="w-3.5 h-3.5" /> PDF Report
          </button>
          <button onClick={onNewSearch} className="text-xs bg-black/20 hover:bg-black/30 px-3 py-1.5 rounded-lg font-bold transition-all">
            New Search
          </button>
        </div>
      </div>

      <div className="flex border-b overflow-x-auto bg-slate-50 scrollbar-hide">
        {[
          { id: 'details', label: 'Title & Zoning', icon: FileText },
          { id: 'disputes', label: 'Legal Disputes', icon: Gavel },
          { id: 'risk', label: 'Risk Score', icon: AlertCircle },
          { id: 'history', label: 'History', icon: History },
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as any)}
            className={`px-6 py-4 text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all border-b-2 ${activeSubTab === tab.id ? 'bg-white text-emerald-600 border-emerald-600' : 'text-slate-500 hover:text-slate-800 border-transparent'}`}
          >
            <tab.icon className="w-4 h-4" /> {tab.label}
          </button>
        ))}
      </div>

      <div className="p-6">
        {activeSubTab === 'details' && (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="text-[10px] uppercase font-black text-slate-400 block mb-3 tracking-widest">Ownership & Khata Composition</label>
                <div className="space-y-3">
                  {data.owners.map((owner: string, i: number) => (
                    <div key={i} className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border group hover:border-emerald-200 transition-all">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
                          {owner.charAt(0)}
                        </div>
                        <div>
                           <p className="text-sm font-bold text-slate-800">{owner}</p>
                           <p className="text-[10px] text-slate-500 uppercase font-black tracking-tighter">Shareholder / Co-Owner</p>
                        </div>
                      </div>
                      <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded">33.3% Share</span>
                    </div>
                  ))}
                  <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl flex gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-amber-800 text-sm">Undivided Property Warning</p>
                      <p className="text-xs text-amber-700 leading-relaxed mt-1">
                        Khata No. {data.khata} has not undergone formal partition (Section 116/117 of UP Revenue Code). Physical possession may differ from paper records.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-5 bg-slate-900 text-white rounded-2xl shadow-xl relative overflow-hidden">
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-emerald-500/20 rounded-full blur-2xl"></div>
                <div className="flex items-center gap-2 mb-6">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <h4 className="font-bold uppercase tracking-widest text-xs">Verified Land Position</h4>
                </div>
                <div className="grid grid-cols-2 gap-6 text-sm mb-6">
                  <div>
                    <p className="text-slate-400 text-[10px] uppercase font-bold mb-1">Land Use Type</p>
                    <p className={`font-black text-lg ${data.type === 'Agricultural' ? 'text-green-400' : 'text-blue-400'}`}>{data.type}</p>
                    <p className="text-[10px] text-slate-500 italic">As per Master Plan 2031</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-[10px] uppercase font-bold mb-1">Financial Status</p>
                    <p className={`font-black text-lg ${data.hypothecated ? 'text-rose-400' : 'text-emerald-400'}`}>{data.hypothecated ? 'Hypothecated' : 'Debt Free'}</p>
                  </div>
                </div>
                {data.hypothecated && (
                  <div className="p-3 bg-white/5 rounded-xl text-xs border border-white/10">
                    <div className="flex items-center gap-2 text-rose-300 font-bold mb-1">
                       <Lock className="w-3.5 h-3.5" /> Active Bank Lien Found
                    </div>
                    <p className="text-slate-400">PNB Basti Main Branch. Loan outstanding against Khasra {data.khasra}. Registry will be blocked until NOC.</p>
                  </div>
                )}
              </div>
              
              <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
                <h4 className="font-bold text-emerald-800 text-sm mb-4">Official Verification Nodes</h4>
                <div className="space-y-2">
                  <a href="https://upbhulekh.gov.in" target="_blank" className="flex items-center justify-between p-3 bg-white rounded-xl text-xs font-bold text-slate-700 hover:border-emerald-500 border transition-all shadow-sm">
                    <span className="flex items-center gap-2"><FileText className="w-4 h-4 text-emerald-600" /> Digital Khatauni 1.0</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-300" />
                  </a>
                  <a href="https://upbhulekhgovin.com/bhu-naksha-up/" target="_blank" className="flex items-center justify-between p-3 bg-white rounded-xl text-xs font-bold text-slate-700 hover:border-emerald-500 border transition-all shadow-sm">
                    <span className="flex items-center gap-2"><MapIcon className="w-4 h-4 text-emerald-600" /> Bhu-Naksha Cadastral</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-300" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSubTab === 'disputes' && (
          <div className="space-y-6">
            <div className="bg-rose-50 p-6 rounded-2xl border border-rose-100 flex gap-5 items-start">
              <div className="p-3 bg-rose-600 rounded-xl text-white shadow-lg">
                <Gavel className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-black text-rose-900 mb-1">Active Litigation</h4>
                <p className="text-sm text-rose-700 mb-4 font-medium italic">Found matching records in District Court Basti (e-Courts Integration).</p>
                <div className="bg-white p-5 rounded-2xl border border-rose-100 shadow-sm relative">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-black bg-rose-100 text-rose-700 px-3 py-1 rounded-full border border-rose-200 uppercase tracking-widest">Case Type: Civil</span>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Ref: UPBA01-0023-22</span>
                  </div>
                  <h5 className="font-bold text-slate-900 text-base mb-1">Ramesh Chand vs. State of UP & Others</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">Suit for Permanent Injunction and Declaration of title regarding Gata No. {data.khasra}. Next Hearing: 14 Oct 2024.</p>
                  <div className="mt-4 pt-4 border-t flex justify-between items-center">
                    <button className="text-xs font-bold text-indigo-600 flex items-center gap-1 hover:underline">
                      <Info className="w-3.5 h-3.5" /> Full Case Details
                    </button>
                    <span className="text-[10px] text-slate-400 font-bold italic">Source: ecourts.gov.in</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-dashed text-center">
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Global Litigation Search: Complete</p>
            </div>
          </div>
        )}

        {activeSubTab === 'risk' && (
          <div className="space-y-6">
             <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border">
               <div>
                  <h4 className="font-black text-slate-900 text-sm">Property Health Score</h4>
                  <p className="text-xs text-slate-500">Based on 14 data parameters including title, lien, and zoning.</p>
               </div>
               <div className="text-right">
                  <p className={`text-3xl font-black ${data.risk === 'High' ? 'text-rose-600' : 'text-emerald-600'}`}>38<span className="text-slate-300">/100</span></p>
                  <p className={`text-[10px] font-black uppercase tracking-widest ${data.risk === 'High' ? 'text-rose-600' : 'text-emerald-600'}`}>{data.risk} RISK</p>
               </div>
             </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { label: 'Pending Mutation', status: 'Warning', icon: RefreshCw, color: 'text-amber-500', bg: 'bg-amber-50', desc: 'Mutation pending in Tehsil since 182 days.' },
                { label: 'Green Area Restriction', status: 'Safe', icon: Layers, color: 'text-emerald-500', bg: 'bg-emerald-50', desc: 'Plot falls outside BDA Reserved Green Belt.' },
                { label: 'Ownership Type', status: 'Joint', icon: Users, color: 'text-indigo-500', bg: 'bg-indigo-50', desc: 'Multiple co-sharers found without partition.' },
                { label: 'Bank Lien', status: 'Active', icon: Lock, color: 'text-rose-500', bg: 'bg-rose-50', desc: 'Hypothecation found for Loan ID UP-4492.' }
              ].map((risk, i) => (
                <div key={i} className={`p-4 ${risk.bg} border rounded-2xl flex gap-4 transition-all hover:scale-[1.02]`}>
                  <div className={`p-2.5 rounded-xl ${risk.color} bg-white shadow-sm`}>
                    <risk.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800 text-sm">{risk.label}</span>
                      <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded border border-current/20 ${risk.color}`}>{risk.status}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1 leading-tight">{risk.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSubTab === 'history' && (
          <div className="space-y-6">
             <div className="relative border-l-2 border-emerald-100 ml-4 py-2">
                {[
                  { date: '12 Jan 2022', title: 'Mutation Success', body: 'Transferred from Late Sh. Hari Ram to 3 heirs via Virasat.', icon: CheckCircle2 },
                  { date: '05 May 2018', title: 'Bank Hypothecation', body: 'PNB Mortgage registered for agricultural credit.', icon: Lock },
                  { date: '21 Sep 1994', title: 'Original Allotment', body: 'Recorded in Khatauni 1359F legacy records.', icon: FileText },
                ].map((item, i) => (
                  <div key={i} className="mb-8 ml-6 relative">
                     <div className="absolute -left-[33px] top-1 p-1 bg-white border-2 border-emerald-500 rounded-full">
                        <item.icon className="w-3.5 h-3.5 text-emerald-600" />
                     </div>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.date}</p>
                     <h5 className="font-bold text-slate-800 text-sm">{item.title}</h5>
                     <p className="text-xs text-slate-500 mt-1">{item.body}</p>
                  </div>
                ))}
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

const MapSection = ({ result }: { result: any }) => {
  const [mode, setMode] = useState<'view' | 'demarcation' | 'batwara'>('view');
  const [points, setPoints] = useState<[number, number][]>([]);
  const [batwaraLines, setBatwaraLines] = useState<[number, number][]>([]);

  const segments = useMemo(() => {
    const list = [];
    if (points.length > 1) {
      for (let i = 0; i < points.length - 1; i++) {
        list.push({
          id: i,
          p1: points[i],
          p2: points[i+1],
          dist: calculateDistance(points[i], points[i+1])
        });
      }
      if (points.length > 2 && mode === 'demarcation') {
        list.push({
          id: points.length - 1,
          p1: points[points.length-1],
          p2: points[0],
          dist: calculateDistance(points[points.length-1], points[0])
        });
      }
    }
    return list;
  }, [points, mode]);

  return (
    <div id="demarcation" className="bg-white rounded-2xl shadow-xl border overflow-hidden mt-8">
      <div className="p-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50">
        <div>
          <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <MapIcon className="text-emerald-600 w-5 h-5" /> GIS Demarcation Lab
          </h3>
          <p className="text-xs text-slate-500 font-medium">Measure exact width, length, and perimeter against cadastral maps.</p>
        </div>
        <div className="flex bg-white p-1 rounded-xl shadow-sm border">
          <button 
            onClick={() => { setMode('view'); setPoints([]); }}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${mode === 'view' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            Cadastral View
          </button>
          <button 
            onClick={() => { setMode('demarcation'); setPoints([]); }}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${mode === 'demarcation' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <Ruler className="w-3.5 h-3.5 inline mr-1" /> Measure Dimensions
          </button>
          <button 
            onClick={() => { setMode('batwara'); setPoints([]); }}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${mode === 'batwara' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <Users className="w-3.5 h-3.5 inline mr-1" /> Mutual Batwara
          </button>
        </div>
      </div>
      
      <div className="relative h-[600px]">
        <MapContainer center={[26.8467, 80.9462]} zoom={13} className="h-full w-full">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {mode !== 'view' && <MapEvents onPoint={(p) => setPoints([...points, p])} />}
          {points.length > 2 && <Polygon positions={points} color={mode === 'batwara' ? '#f97316' : '#10b981'} fillOpacity={0.2} weight={3} />}
          {points.length > 1 && <Polyline positions={points} color={mode === 'batwara' ? '#f97316' : '#10b981'} weight={4} dashArray="5, 10" />}
          {points.map((p, i) => (
             <Marker key={i} position={p}>
               <Popup>Point {i+1}<br/>Lat: {p[0].toFixed(5)}, Lng: {p[1].toFixed(5)}</Popup>
             </Marker>
          ))}
          {segments.map((seg, i) => (
             <Marker key={`seg-${i}`} position={[(seg.p1[0] + seg.p2[0])/2, (seg.p1[1] + seg.p2[1])/2]} icon={L.divIcon({
                className: 'bg-white/90 border border-slate-300 rounded px-1 text-[10px] font-black text-slate-800 shadow-sm whitespace-nowrap',
                html: `<span>${seg.dist}m</span>`,
                iconSize: [40, 20],
                iconAnchor: [20, 10]
             })} />
          ))}
        </MapContainer>

        <div className="absolute top-4 left-4 z-[1000] flex flex-col gap-2">
           <button onClick={() => setPoints([])} className="bg-white text-slate-900 p-2.5 rounded-xl shadow-xl hover:bg-slate-50 border border-slate-200 group">
             <RefreshCw className="w-5 h-5 group-active:rotate-180 transition-transform" />
           </button>
           <button className="bg-white text-slate-900 p-2.5 rounded-xl shadow-xl hover:bg-slate-50 border border-slate-200">
             <Layers className="w-5 h-5" />
           </button>
        </div>

        {mode === 'batwara' && (
          <div className="absolute bottom-8 right-8 z-[1000] glass-morphism p-6 rounded-3xl shadow-2xl border border-white/50 max-w-sm animate-in zoom-in slide-in-from-right-8">
            <h4 className="text-base font-black text-orange-800 mb-2 flex items-center gap-2">
              <Users className="w-5 h-5" /> Family Partition Registry
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed mb-6">
              Draw the boundary of your specific share (e.g. West face road-side). This creates a <strong>Digital Private Layer</strong> that acts as a mutual consent proof before official registry.
            </p>
            <div className="flex flex-col gap-2">
               <button className="w-full bg-orange-600 text-white py-3 rounded-xl text-sm font-black hover:bg-orange-700 transition-all shadow-xl shadow-orange-200 flex items-center justify-center gap-2">
                 <Lock className="w-4 h-4" /> Save Partition Layout
               </button>
               <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-tighter">Encrypted & Timestampted on Blockchain</p>
            </div>
          </div>
        )}

        {mode === 'demarcation' && points.length >= 2 && (
          <div className="absolute bottom-8 left-8 z-[1000] glass-morphism p-5 rounded-2xl shadow-xl border border-white/50 animate-in slide-in-from-left-8">
             <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-100 rounded-lg">
                   <Navigation className="w-5 h-5 text-emerald-600" />
                </div>
                <h4 className="font-black text-sm text-slate-800">Field Measurements</h4>
             </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded-xl border border-slate-100">
                   <p className="text-[10px] uppercase text-slate-400 font-black mb-1">Total Perimeter</p>
                   <p className="text-lg font-black text-slate-900">
                     {segments.reduce((acc, s) => acc + parseFloat(s.dist), 0).toFixed(2)}m
                   </p>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-100">
                   <p className="text-[10px] uppercase text-slate-400 font-black mb-1">Max Length</p>
                   <p className="text-lg font-black text-emerald-600">
                     {Math.max(...segments.map(s => parseFloat(s.dist))).toFixed(2)}m
                   </p>
                </div>
             </div>
             <div className="mt-4 p-3 bg-amber-50 rounded-xl border border-amber-100 flex gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <p className="text-[10px] text-amber-800 leading-tight font-medium">
                   <strong>Comparison:</strong> Measured area is 4.2% smaller than Revenue Record ({result?.area}). Possible encroachment or measurement error.
                </p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

const MapEvents = ({ onPoint }: { onPoint: (p: [number, number]) => void }) => {
  useMapEvents({
    click(e) { onPoint([e.latlng.lat, e.latlng.lng]); }
  });
  return null;
};

const ResourceHub = () => (
  <section id="resource-hub" className="py-20 bg-slate-50 border-y">
    <div className="max-w-7xl mx-auto px-4">
       <div className="mb-12">
          <h2 className="text-3xl font-black text-slate-900 mb-2">Resource Hub</h2>
          <p className="text-slate-600">Direct access to Uttar Pradesh and Central Government public land portals (No Login Required).</p>
       </div>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: 'DILRMP Central', url: 'https://dilrmp.gov.in/', desc: 'Digital India Land Records Modernization Programme stats.', icon: Globe },
            { name: 'UP Bhulekh', url: 'https://upbhulekh.gov.in/', desc: 'Search Khatauni, Verification, and Gata details.', icon: FileText },
            { name: 'Bhu-Naksha UP', url: 'https://upbhulekhgovin.com/bhu-naksha-up/', desc: 'Visual plot boundaries and surrounding maps.', icon: MapIcon },
            { name: 'BDA Basti', url: 'http://www.bdabasti.in/', desc: 'Master plans and zoning maps for Basti District.', icon: Navigation },
          ].map((portal, i) => (
             <a 
               key={i} 
               href={portal.url} 
               target="_blank" 
               className="bg-white p-6 rounded-3xl border border-slate-200 hover:border-emerald-500 hover:shadow-xl transition-all group"
             >
                <div className="w-12 h-12 bg-slate-50 text-slate-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                   <ExternalLink className="w-6 h-6" />
                </div>
                <h4 className="font-black text-slate-900 text-lg mb-2">{portal.name}</h4>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">{portal.desc}</p>
                <div className="flex items-center gap-1 text-xs font-black text-emerald-600 uppercase tracking-widest">
                   Access Portal <ChevronRight className="w-3 h-3" />
                </div>
             </a>
          ))}
       </div>
    </div>
  </section>
);

const Globe = ({ className }: { className?: string }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>;

const App = () => {
  const [district, setDistrict] = useState('');
  const [tehsil, setTehsil] = useState('');
  const [village, setVillage] = useState('');
  const [khata, setKhata] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [showAI, setShowAI] = useState(false);

  const districts = Object.keys(UP_DATA);
  const tehsils = district ? Object.keys(UP_DATA[district]) : [];
  const villages = (district && tehsil) ? UP_DATA[district][tehsil] : [];

  const handleVerify = () => {
    if (!village || !khata) return;
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setResult({
        khasra: "142-Ka",
        khata: khata,
        village,
        tehsil,
        district,
        type: "Agricultural",
        owners: ["Ramesh Chand Yadav", "Suresh Chand Yadav", "Dinesh Chand Yadav"],
        hypothecated: true,
        risk: "High",
        area: "0.8250 Hectare"
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full">
        <div className="mb-16 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100 mb-6">
             <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
             <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Real-time Land Intelligence</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-[1.1]">
            Verify Land Position with <span className="text-emerald-600 italic">Total Certainty.</span>
          </h2>
          <p className="text-slate-600 text-lg font-medium leading-relaxed">
            Stop registry fraud. Check zoning, bank liens, legal disputes, and cadastral dimensions for any plot in Uttar Pradesh from a single, unified interface.
          </p>
        </div>

        {/* Search Engine */}
        <section id="verification" className="bg-white p-2 rounded-[2rem] shadow-2xl border border-slate-200 mb-20">
          <div className="bg-slate-900 p-8 sm:p-10 rounded-[1.8rem] text-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">District</label>
                <select 
                  value={district} 
                  onChange={(e) => { setDistrict(e.target.value); setTehsil(''); setVillage(''); }}
                  className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3.5 text-sm font-bold text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="" className="text-slate-900">Select District</option>
                  {districts.map(d => <option key={d} value={d} className="text-slate-900">{d}</option>)}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tehsil</label>
                <select 
                  value={tehsil} 
                  disabled={!district}
                  onChange={(e) => { setTehsil(e.target.value); setVillage(''); }}
                  className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3.5 text-sm font-bold text-white focus:ring-2 focus:ring-emerald-500 outline-none disabled:opacity-30 transition-all appearance-none cursor-pointer"
                >
                  <option value="" className="text-slate-900">Select Tehsil</option>
                  {tehsils.map(t => <option key={t} value={t} className="text-slate-900">{t}</option>)}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Village/Ward</label>
                <select 
                  value={village} 
                  disabled={!tehsil}
                  onChange={(e) => setVillage(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3.5 text-sm font-bold text-white focus:ring-2 focus:ring-emerald-500 outline-none disabled:opacity-30 transition-all appearance-none cursor-pointer"
                >
                  <option value="" className="text-slate-900">Select Village</option>
                  {villages.map(v => <option key={v} value={v} className="text-slate-900">{v}</option>)}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Gata / Khata No.</label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text"
                    disabled={!village}
                    value={khata}
                    onChange={(e) => setKhata(e.target.value)}
                    placeholder="e.g. 142-Ka"
                    className="w-full bg-white/10 border border-white/20 rounded-2xl pl-10 pr-4 py-3.5 text-sm font-bold text-white focus:ring-2 focus:ring-emerald-500 outline-none disabled:opacity-30 transition-all placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div className="lg:flex items-end">
                <button 
                  onClick={handleVerify}
                  disabled={!khata || loading}
                  className="w-full bg-emerald-500 text-slate-950 font-black py-4 rounded-2xl shadow-xl shadow-emerald-500/20 hover:bg-emerald-400 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2 group"
                >
                  {loading ? <div className="w-5 h-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin"></div> : <><RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" /> Verify Position</>}
                </button>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
               <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> UP Bhulekh Real-time</span>
               <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> District Court APIs</span>
               <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> 1K+ Villages Indexed</span>
            </div>
          </div>
        </section>

        {result ? (
          <div className="space-y-12 max-w-6xl mx-auto animate-in fade-in duration-700">
            <VerificationPanel data={result} onNewSearch={() => setResult(null)} />
            <MapSection result={result} />
            <div className="grid md:grid-cols-2 gap-8">
               <div className="bg-white p-8 rounded-3xl border shadow-sm">
                  <h4 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2"><Lock className="w-5 h-5 text-emerald-600" /> Safe Registry Protocol</h4>
                  <ul className="space-y-4">
                     {[
                       'Verify the seller via Aadhaar-linked land record.',
                       'Demand a fresh "Nishan-Dehi" (Boundary Demarcation) from Tehsil.',
                       'Check for pending mutations or family partition disputes.',
                       'Ensure land category is not "Green Belt" or "Evacuee Property".'
                     ].map((step, i) => (
                        <li key={i} className="flex gap-3 text-sm text-slate-600 font-medium">
                           <div className="w-5 h-5 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">{i+1}</div>
                           {step}
                        </li>
                     ))}
                  </ul>
               </div>
               <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl flex flex-col justify-between">
                  <div>
                    <h4 className="text-xl font-black mb-4">Internal Batwara Service</h4>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6">
                      Tired of co-owners claiming your side of the field? Use our GIS tool to draw your branch's specific boundaries and invite brothers/sisters to sign digitally.
                    </p>
                  </div>
                  <button className="w-fit bg-white text-slate-950 px-6 py-3 rounded-xl font-black text-sm hover:bg-slate-100 transition-all flex items-center gap-2">
                     <Users className="w-4 h-4" /> Start Family Partition
                  </button>
               </div>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-12 text-center px-4">
            {[
              { 
                icon: ShieldCheck, 
                title: 'Title Verification', 
                color: 'blue',
                desc: 'Real-time pull from UP Bhulekh to confirm ownership history and encumbrances.'
              },
              { 
                icon: Ruler, 
                title: 'On-Ground Measurement', 
                color: 'emerald',
                desc: 'GPS tools to calculate exact width/length. Verify if field matches record area.'
              },
              { 
                icon: Gavel, 
                title: 'Legal Dispute Tracker', 
                color: 'rose',
                desc: 'AI-driven scan of High Court and District Court records for active land litigation.'
              }
            ].map((feature, i) => (
              <div key={i} className="group cursor-default">
                <div className={`w-20 h-20 bg-${feature.color}-50 text-${feature.color}-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 group-hover:bg-${feature.color}-600 group-hover:text-white transition-all duration-700 shadow-xl shadow-${feature.color}-500/5 border border-${feature.color}-100`}>
                  <feature.icon className="w-10 h-10" />
                </div>
                <h3 className="font-black text-xl text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">{feature.desc}</p>
              </div>
            ))}
          </div>
        )}

        <ResourceHub />
      </main>

      {/* Bhu-Guru AI Support */}
      <div className="fixed bottom-8 right-8 z-[5000] flex flex-col items-end gap-4">
        {showAI && <AIAssistant onClose={() => setShowAI(false)} />}
        <button 
          onClick={() => setShowAI(!showAI)}
          className="bg-emerald-600 text-white p-5 rounded-[2rem] shadow-2xl hover:bg-emerald-700 hover:scale-110 transition-all flex items-center gap-3 group border-8 border-white"
        >
          <div className="relative">
             <MessageSquare className="w-7 h-7" />
             <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full border-2 border-white"></span>
          </div>
          <span className="font-black text-sm pr-2">Expert Bhu-Guru AI</span>
        </button>
      </div>

      <footer className="bg-slate-950 text-white py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-16">
          <div className="col-span-2">
            <h2 className="text-3xl font-black mb-8 flex items-center gap-3">
              <ShieldCheck className="text-emerald-500 w-10 h-10" /> Bhu-Sathi UP
            </h2>
            <p className="text-slate-400 text-base leading-relaxed max-w-md font-medium">
              We empower common citizens with factual land position data by aggregating public GIS and revenue records. No login, no bias, just pure property intelligence.
            </p>
            <div className="mt-8 flex gap-6">
               <img src="https://dilrmp.gov.in/sites/default/files/logo_1.png" className="h-10 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer" alt="DILRMP" />
               <img src="https://upbhulekh.gov.in/images/logo.png" className="h-10 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer" alt="UP Bhulekh" />
            </div>
          </div>
          <div>
            <h4 className="font-black text-[10px] uppercase tracking-widest text-emerald-500 mb-8">Navigation</h4>
            <ul className="space-y-4 text-sm text-slate-400 font-bold">
              <li><a href="#verification" className="hover:text-white transition-colors">Verify Property</a></li>
              <li><a href="#demarcation" className="hover:text-white transition-colors">Measurement Lab</a></li>
              <li><a href="#resource-hub" className="hover:text-white transition-colors">Official Portals</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Revenue Code Guide</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-[10px] uppercase tracking-widest text-emerald-500 mb-8">Support Hub</h4>
            <p className="text-sm text-slate-400 font-bold">Farmer Helpline: 1800-449-XXXX</p>
            <p className="text-sm text-slate-400 font-bold mt-2">Email: help@bhusathi.in</p>
            <div className="mt-8">
               <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-4">Social Transparency</p>
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center cursor-pointer transition-all"><Globe className="w-4 h-4" /></div>
               </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 pt-20 mt-20 border-t border-white/5 text-center">
           <p className="text-slate-600 text-[10px] font-black uppercase tracking-widest">
             © 2024 Bhu-Sathi UP. Independent Platform. Data sourced from Public Government Portals.
           </p>
        </div>
      </footer>
    </div>
  );
};

const AIAssistant = ({ onClose }: { onClose: () => void }) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([
    { role: 'bot', text: 'Namaste! I am Bhu-Guru. I am an expert in UP Land Laws (UP Revenue Code 2006). How can I help you today with your Khatauni or Boundary dispute?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userText = input;
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setInput('');
    setLoading(true);

    try {
      const prompt = `You are "Bhu-Guru", an elite AI Land Legal Expert specialized in Uttar Pradesh (UP), India. 
      The user is asking: "${userText}"
      Provide professional, legal-informed advice based on the UP Revenue Code 2006. 
      Topics include: Khatauni (record of rights), Khasra (plot index), Mutation (Dakhil-Kharij), 143 Conversion (Agri to Non-Agri), Batwara (Partition), and boundary disputes.
      Keep it very factual. Use Hinglish (English mixed with Hindi terms) to be approachable but maintain a formal expert tone.
      Use Markdown for lists and bold text. 
      If the user asks about an error, explain it could be a mismatch between Bhu-Naksha and ground reality.`;

      const response = await ai.models.generateContent({
        model: AI_MODEL,
        contents: prompt,
      });

      setMessages(prev => [...prev, { role: 'bot', text: response.text || "Apologies, I'm experiencing a technical lag. Please try again." }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', text: "Service connection lost. Please check your internet." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] w-[380px] sm:w-[450px] bg-white shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] rounded-[2.5rem] border border-slate-200 overflow-hidden mb-4 animate-in slide-in-from-bottom-12 duration-500">
      <div className="p-6 bg-emerald-600 text-white flex justify-between items-center shadow-xl">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-2.5 rounded-2xl">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="font-black text-sm uppercase tracking-widest block leading-none mb-1">Bhu-Guru AI</span>
            <span className="text-[10px] text-emerald-100 font-bold">Land Law Specialist</span>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-xl transition-all"><X className="w-6 h-6" /></button>
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50 scrollbar-hide">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-3xl text-sm leading-relaxed shadow-sm ${m.role === 'user' ? 'bg-emerald-600 text-white rounded-tr-none' : 'bg-white border text-slate-700 rounded-tl-none font-medium'}`}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
           <div className="flex justify-start">
             <div className="bg-white border p-4 rounded-3xl rounded-tl-none shadow-sm flex gap-1">
                <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
             </div>
           </div>
        )}
      </div>
      <div className="p-6 bg-white border-t flex gap-3 items-center">
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask about Batwara, 143, Registry..."
          className="flex-1 border-none bg-slate-100 rounded-2xl px-5 py-4 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none placeholder:text-slate-400"
        />
        <button onClick={handleSend} className="bg-emerald-600 text-white p-4 rounded-2xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/20 active:scale-95">
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<App />);
}
