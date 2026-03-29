"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ShoppingBag, Tags, Home, Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setIsSidebarOpen(false);
      else setIsSidebarOpen(true);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: ShoppingBag },
    { name: 'Categories', href: '/admin/categories', icon: Tags },
    { name: 'Back to Site', href: '/', icon: Home },
  ];

  const handleLinkClick = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      {/* Mobile Backdrop */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 bg-white border-r border-gray-100 z-[101] 
        transition-all duration-300 ease-in-out flex flex-col
        ${isMobile 
          ? (isSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64') 
          : (isSidebarOpen ? 'w-64' : 'w-20')
        }
        ${!isMobile && 'relative'}
      `}>
        {/* Sidebar Brand & Toggle */}
        <div className={`p-6 flex items-center h-20 transition-all duration-300 ${isSidebarOpen ? 'justify-between' : 'justify-center'}`}>
          <h2 className={`font-bold tracking-tighter text-black uppercase transition-all duration-300 ${isSidebarOpen ? 'text-xl' : 'text-sm'}`}>
            {isSidebarOpen ? 'AVN Admin' : 'AVN'}
          </h2>
          {(!isMobile || isSidebarOpen) && (
            <button 
              className={`p-2 hover:bg-gray-50 rounded-xl transition-colors border border-transparent hover:border-gray-100 ${!isSidebarOpen && 'absolute right-[-14px] top-7 bg-white shadow-sm z-50 rounded-full'}`}
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              title={isSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
            >
              {isMobile ? <X size={18} /> : (isSidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={14} className="text-gray-400" />)}
            </button>
          )}
        </div>
        
        {/* Navigation Items */}
        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-x-hidden">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleLinkClick}
                title={!isSidebarOpen ? item.name : ""}
                className={`flex items-center transition-all duration-200 group relative ${
                  isSidebarOpen ? 'gap-3 px-4 py-3 h-11' : 'justify-center p-3 h-11'
                } rounded-xl ${
                  isActive 
                    ? 'bg-black text-white shadow-lg shadow-black/10' 
                    : 'text-gray-400 hover:bg-gray-50 hover:text-black'
                }`}
              >
                <div className="shrink-0">
                  <Icon size={isSidebarOpen ? 18 : 20} />
                </div>
                
                {/* Text Label - Hidden in Mini Mode */}
                <span className={`text-sm font-bold uppercase tracking-widest transition-all duration-300 whitespace-nowrap overflow-hidden ${
                  isSidebarOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'
                }`}>
                  {item.name}
                </span>

                {/* Tooltip for Mini Mode */}
                {!isSidebarOpen && !isMobile && (
                  <div className="absolute left-16 bg-black text-white px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all pointer-events-none z-[110] whitespace-nowrap">
                    {item.name}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Mobile-only Header (Burger Menu) */}
        {isMobile && (
          <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100 z-50 shrink-0">
            <h2 className="text-lg font-bold tracking-tighter text-black uppercase">AVN Admin</h2>
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 hover:bg-gray-50 rounded-xl transition-colors shadow-sm border border-gray-100"
            >
              <Menu size={24} />
            </button>
          </header>
        )}

        {/* Dynamic Content Workspace */}
        <main className="flex-1 overflow-y-auto w-full">
          <div className="min-h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
