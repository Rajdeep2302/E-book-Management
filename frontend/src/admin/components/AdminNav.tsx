
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    BookOpen,
    FileText,
    ClipboardList,
} from 'lucide-react';

const AdminNav = () => {
    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
        { icon: Users, label: 'Users', path: '/admin/users' },
        { icon: BookOpen, label: 'Books', path: '/admin/books' },
        { icon: FileText, label: 'Notes', path: '/admin/notes' },
        { icon: ClipboardList, label: 'Question Papers', path: '/admin/question-papers' },
    ];

    return (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none mb-6">
            {navItems.map((item) => (
                <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/admin'}
                    className={({ isActive }) => `
            flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
            ${isActive
                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                            : 'bg-white/5 text-gray-400 border border-transparent hover:bg-white/10 hover:text-white'
                        }
          `}
                >
                    <item.icon className="w-4 h-4" />
                    <span className="whitespace-nowrap">{item.label}</span>
                </NavLink>
            ))}
        </div>
    );
};

export default AdminNav;
