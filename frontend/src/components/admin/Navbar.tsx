import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  LayoutDashboard,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  FileText,
  Home
} from 'lucide-react';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
  collapsed?: boolean;
}

const SidebarItem = ({ icon, label, active, onClick, collapsed }: SidebarItemProps) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group relative
        ${active
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40'
          : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}
      `}
    >
      <div className={`transition-transform duration-300 ${active ? 'scale-110' : 'group-hover:scale-110'}`}>
        {icon}
      </div>
      {!collapsed && (
        <span className="font-semibold tracking-tight text-sm flex-1 text-left">{label}</span>
      )}
      {active && !collapsed && <ChevronRight className="w-4 h-4 opacity-50" />}

      {collapsed && (
        <div className="absolute left-full ml-4 px-3 py-2 bg-slate-800 text-white text-xs font-bold rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
          {label}
        </div>
      )}
    </button>
  );
};

const Navbar = ({
  activeTab,
  setActiveTab,
  collapsed,
  setCollapsed
}: {
  activeTab: string,
  setActiveTab: (tab: string) => void,
  collapsed: boolean,
  setCollapsed: (collapsed: boolean) => void
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5 shrink-0" /> },
    { id: 'users', label: 'Manage Users', icon: <Users className="w-5 h-5 shrink-0" /> },
    { id: 'manage', label: 'Manage Resources', icon: <FileText className="w-5 h-5 shrink-0" /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/');
  };

  return (
    <>
      {/* Mobile Header - Similar to Home Page Navbar Theme */}
      <div className="lg:hidden w-full flex items-center justify-between p-4 bg-[#050505]/95 backdrop-blur-xl border-b border-blue-500/10 sticky top-0 z-60">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white text-xs shadow-lg shadow-blue-600/20">E</div>
          <span className="text-white font-bold tracking-tighter uppercase">Edu<span className="text-blue-500">Hub</span> Admin</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-xl transition-colors"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Backdrop for mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-70 lg:hidden animate-in fade-in duration-300"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar - Matching Blue Theme */}
      <aside className={`
        fixed left-0 top-0 h-full bg-[#050505] border-r border-blue-500/10 transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] z-80
        ${collapsed ? 'w-20' : 'w-72'}
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full p-4">
          {/* Logo Section */}
          <div className={`flex items-center gap-3 mb-10 px-2 h-12 ${collapsed ? 'justify-center' : ''}`}>
            <div className="relative group">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-black text-white text-lg shadow-lg shadow-blue-600/40">
                E
              </div>
              <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-500" />
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="text-white font-black tracking-tighter uppercase leading-none text-xl">Edu<span className="text-blue-500">Hub</span></span>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">Administrator</span>
              </div>
            )}
          </div>

          {/* Navigation Items */}
          <div className="flex-1 space-y-2">
            {!collapsed && <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest px-4 mb-4">Core Menu</p>}
            {menuItems.map((item) => (
              <SidebarItem
                key={item.id}
                icon={item.icon}
                label={item.label}
                active={activeTab === item.id}
                collapsed={collapsed}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileOpen(false);
                }}
              />
            ))}
          </div>

          {/* Bottom Controls */}
          <div className="pt-6 border-t border-blue-500/10 space-y-2">
            <SidebarItem
              icon={<Home className="w-5 h-5 shrink-0" />}
              label="Return to Home"
              collapsed={collapsed}
              onClick={() => navigate('/')}
            />
            <SidebarItem
              icon={<LogOut className="w-5 h-5 shrink-0" />}
              label="Logout"
              collapsed={collapsed}
              onClick={handleLogout}
            />
            <button
              onClick={() => setCollapsed(!collapsed)}
              className={`hidden lg:flex w-full items-center gap-3 px-4 py-3 rounded-2xl text-slate-600 hover:text-white transition-all ${collapsed ? 'justify-center' : ''}`}
            >
              <Menu className="w-5 h-5 shrink-0" />
              {!collapsed && <span className="text-sm font-semibold">Collapse Sidebar</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
