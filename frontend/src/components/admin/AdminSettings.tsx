import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
    Globe,
    ShieldCheck,
    Settings2,
    Save,
    Lock,
    Mail,
    HardDrive
} from 'lucide-react';

const AdminSettings = () => {
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

    // Fully functional state for backend integration
    const [settings, setSettings] = useState({
        siteTitle: 'EduHub',
        supportEmail: 'support@eduhub.in',
        autoApproval: false,
        maxUploadSize: 25,
        maintenanceMode: false
    });

    // Mock initial fetch
    useEffect(() => {
        // In a real scenario: axios.get('/api/admin/settings').then(res => setSettings(res.data))
        const saved = localStorage.getItem('admin_settings');
        if (saved) setSettings(JSON.parse(saved));
    }, []);

    const handleSave = () => {
        setSaveStatus('saving');

        // Simulate API Call
        // axios.put('/api/admin/settings', settings)
        setTimeout(() => {
            localStorage.setItem('admin_settings', JSON.stringify(settings));
            setSaveStatus('saved');
            toast.success("Configuration Synced Successfully");
            setTimeout(() => setSaveStatus('idle'), 2000);
        }, 800);
    };

    const handleChange = (field: string, value: any) => {
        setSettings(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="max-w-4xl mx-auto space-y-12 pb-20 animate-in fade-in duration-700">
            {/* Reduced Header */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-blue-500/10">
                <div className="space-y-1">
                    <h1 className="text-4xl font-light text-white/90 tracking-tight">
                        System <span className="font-semibold text-white">Settings</span>
                    </h1>
                    <p className="text-sm text-blue-400/40 font-medium leading-relaxed">
                        Essential controls for platform governance. Simplified for rapid deployment.
                    </p>
                </div>

                <button
                    onClick={handleSave}
                    disabled={saveStatus !== 'idle'}
                    className={`
            flex items-center gap-2 px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-500
            ${saveStatus === 'saved'
                            ? 'bg-emerald-500 text-white'
                            : 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-900/20 active:scale-95'}
          `}
                >
                    {saveStatus === 'idle' && <><Save className="w-4 h-4" />Save Changes</>}
                    {saveStatus === 'saving' && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                    {saveStatus === 'saved' && <><ShieldCheck className="w-4 h-4" />Saved</>}
                </button>
            </header>

            <div className="space-y-16">
                {/* Simplified Section: Identity */}
                <section className="space-y-8">
                    <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-blue-400" />
                        <h2 className="text-lg font-bold text-white uppercase tracking-widest">Platform Identity</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3 group">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Site Title</label>
                            <input
                                type="text"
                                value={settings.siteTitle}
                                onChange={(e) => handleChange('siteTitle', e.target.value)}
                                className="w-full bg-white/5 border border-white/5 rounded-2xl px-5 py-3.5 text-sm text-white focus:outline-none focus:border-blue-500/40 focus:bg-blue-500/5 transition-all"
                            />
                        </div>
                        <div className="space-y-3 group">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Support Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/10" />
                                <input
                                    type="email"
                                    value={settings.supportEmail}
                                    onChange={(e) => handleChange('supportEmail', e.target.value)}
                                    className="w-full bg-white/5 border border-white/5 rounded-2xl pl-12 pr-5 py-3.5 text-sm text-white focus:outline-none focus:border-blue-500/40 focus:bg-blue-500/5 transition-all"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Simplified Section: Governance */}
                <section className="space-y-8">
                    <div className="flex items-center gap-3">
                        <HardDrive className="w-5 h-5 text-blue-400" />
                        <h2 className="text-lg font-bold text-white uppercase tracking-widest">Content Engine</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="p-8 bg-white/5 border border-white/5 rounded-[2.5rem] flex items-center justify-between group hover:bg-white/10 transition-all cursor-pointer"
                            onClick={() => handleChange('autoApproval', !settings.autoApproval)}>
                            <div className="space-y-1">
                                <h4 className="text-sm font-bold text-white">Auto-approval Mode</h4>
                                <p className="text-xs text-white/20">Bypass review queue instantly.</p>
                            </div>
                            <button className={`w-12 h-6 rounded-full relative transition-all duration-500 ${settings.autoApproval ? 'bg-blue-600' : 'bg-white/10'}`}>
                                <div className={`absolute top-1 w-4 h-4 rounded-full transition-all duration-500 ${settings.autoApproval ? 'right-1 bg-white shadow-lg shadow-blue-900/50' : 'left-1 bg-white/20'}`} />
                            </button>
                        </div>

                        <div className="p-8 bg-white/5 border border-white/5 rounded-[2.5rem] space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Max Upload Limit (MB)</label>
                            <div className="flex items-center gap-4">
                                <input
                                    type="range"
                                    min="5"
                                    max="100"
                                    step="5"
                                    value={settings.maxUploadSize}
                                    onChange={(e) => handleChange('maxUploadSize', parseInt(e.target.value))}
                                    className="flex-1 accent-blue-600 bg-white/10 rounded-lg h-1"
                                />
                                <span className="text-xl font-light text-white w-12 text-right">{settings.maxUploadSize}</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Simplified Section: Security */}
                <section className="space-y-8">
                    <div className="flex items-center gap-3">
                        <Settings2 className="w-5 h-5 text-red-500/60" />
                        <h2 className="text-lg font-bold text-white uppercase tracking-widest">Core Governance</h2>
                    </div>

                    <div
                        onClick={() => handleChange('maintenanceMode', !settings.maintenanceMode)}
                        className={`p-8 border rounded-[2.5rem] flex items-center justify-between group transition-all cursor-pointer ${settings.maintenanceMode ? 'bg-red-500/10 border-red-500/30' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}
                    >
                        <div className="flex items-center gap-6">
                            <div className={`p-4 rounded-2xl transition-colors ${settings.maintenanceMode ? 'bg-red-500/20 text-red-500' : 'bg-white/5 text-white/20 group-hover:text-red-400'}`}>
                                <Lock className="w-5 h-5" />
                            </div>
                            <div className="space-y-1">
                                <h4 className={`text-sm font-bold transition-colors ${settings.maintenanceMode ? 'text-red-400' : 'text-white'}`}>Maintenance Lockdown</h4>
                                <p className="text-xs text-white/20">Prevents public access during system upgrades.</p>
                            </div>
                        </div>
                        <button className={`w-12 h-6 rounded-full relative transition-all duration-500 ${settings.maintenanceMode ? 'bg-red-600' : 'bg-white/10'}`}>
                            <div className={`absolute top-1 w-4 h-4 rounded-full transition-all duration-500 ${settings.maintenanceMode ? 'right-1 bg-white shadow-lg shadow-red-900/50' : 'left-1 bg-white/20'}`} />
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AdminSettings;
