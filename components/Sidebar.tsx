
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    {
      label: 'Dashboard',
      href: '/dashboard',
      icon: 'ri-dashboard-line',
      iconActive: 'ri-dashboard-fill'
    },
    {
      label: 'Duplicatas',
      href: '/duplicatas',
      icon: 'ri-file-list-line',
      iconActive: 'ri-file-list-fill'
    },
    {
      label: 'Borderôs',
      href: '/borderos',
      icon: 'ri-folder-line',
      iconActive: 'ri-folder-fill'
    },
    {
      label: 'Antecipações',
      href: '/antecipacoes',
      icon: 'ri-time-line',
      iconActive: 'ri-time-fill'
    },
    {
      label: 'Portal do Consumidor',
      href: '/portal-consumidor',
      icon: 'ri-user-line',
      iconActive: 'ri-user-fill'
    },
    {
      label: 'Arquivos',
      href: '/arquivos',
      icon: 'ri-file-line',
      iconActive: 'ri-file-fill'
    },
    {
      label: 'Configurações',
      href: '/configuracoes',
      icon: 'ri-settings-line',
      iconActive: 'ri-settings-fill'
    }
  ];

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard' || pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out z-30 md:z-0`}>
        <div className="flex flex-col w-64 h-full bg-gray-900 border-r border-gray-800">
          {/* Header */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-800">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">@</span>
              </div>
              <span className="text-white font-semibold text-lg">Your Company</span>
            </div>
            <button
              onClick={onClose}
              className="md:hidden text-gray-400 hover:text-white"
            >
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive(item.href)
                    ? 'bg-gray-800 text-white border-l-4 border-blue-500'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                <i className={`${isActive(item.href) ? item.iconActive : item.icon} mr-3 text-lg`}></i>
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-800">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                <i className="ri-user-line text-gray-300"></i>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  João Silva
                </p>
                <p className="text-xs text-gray-400 truncate">
                  joao@empresa.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
