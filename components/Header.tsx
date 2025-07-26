
'use client';

import { useState } from 'react';
import Link from 'next/link';

interface HeaderProps {
  onMenuToggle: () => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notifications = [
    {
      id: 1,
      message: 'Nova duplicata vencendo em 3 dias',
      time: '2h atrás',
      type: 'warning',
      unread: true
    },
    {
      id: 2,
      message: 'Borderô BRD-2024-001 aprovado',
      time: '4h atrás',
      type: 'success',
      unread: true
    },
    {
      id: 3,
      message: 'Antecipação processada com sucesso',
      time: '1d atrás',
      type: 'info',
      unread: false
    },
    {
      id: 4,
      message: 'Backup automático concluído',
      time: '2d atrás',
      type: 'info',
      unread: false
    }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="flex items-center justify-between h-16 px-4 md:px-6 bg-white border-b border-gray-200">
      {/* Left side */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onMenuToggle}
          className="md:hidden text-gray-600 hover:text-gray-800 transition-colors"
        >
          <i className="ri-menu-line text-xl"></i>
        </button>
        
        <div className="hidden md:flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-gray-800">Sistema de Duplicatas</h1>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="hidden md:flex items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar duplicatas, borderôs..."
              className="w-80 pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-gray-50"
            />
            <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="hidden md:flex items-center space-x-2">
          <Link 
            href="/duplicatas/nova"
            className="flex items-center px-3 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors whitespace-nowrap"
          >
            <i className="ri-add-line mr-1"></i>
            Nova Duplicata
          </Link>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <i className="ri-notification-line text-xl"></i>
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800">Notificações</h3>
                  {unreadCount > 0 && (
                    <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                      {unreadCount} não lidas
                    </span>
                  )}
                </div>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <div key={notification.id} className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${notification.unread ? 'bg-blue-50' : ''}`}>
                    <div className="flex items-start space-x-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        notification.type === 'warning' ? 'bg-yellow-500' :
                        notification.type === 'success' ? 'bg-green-500' :
                        'bg-blue-500'
                      }`}></div>
                      <div className="flex-1">
                        <p className={`text-sm ${notification.unread ? 'font-medium text-gray-900' : 'text-gray-800'}`}>
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                      {notification.unread && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <button className="text-sm text-gray-600 hover:text-gray-800">
                    Marcar todas como lidas
                  </button>
                  <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                    Ver todas
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center space-x-3 p-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-gray-700 to-gray-900 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">JS</span>
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-gray-800">João Silva</p>
              <p className="text-xs text-gray-500">Gerente Financeiro</p>
            </div>
            <i className="ri-arrow-down-s-line text-sm"></i>
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              {/* Profile Info */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-900 rounded-full flex items-center justify-center">
                    <span className="text-white text-lg font-medium">JS</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">João Silva</p>
                    <p className="text-sm text-gray-600">joao@empresa.com</p>
                    <p className="text-xs text-gray-500">Gerente Financeiro</p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                <Link 
                  href="/configuracoes"
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center transition-colors"
                >
                  <i className="ri-user-line mr-3 text-gray-500"></i>
                  Meu Perfil
                </Link>
                <Link 
                  href="/configuracoes"
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center transition-colors"
                >
                  <i className="ri-settings-line mr-3 text-gray-500"></i>
                  Configurações
                </Link>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center transition-colors">
                  <i className="ri-notification-line mr-3 text-gray-500"></i>
                  Notificações
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center transition-colors">
                  <i className="ri-shield-line mr-3 text-gray-500"></i>
                  Privacidade
                </button>
              </div>

              {/* Support */}
              <div className="border-t border-gray-200 py-2">
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center transition-colors">
                  <i className="ri-question-line mr-3 text-gray-500"></i>
                  Central de Ajuda
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center transition-colors">
                  <i className="ri-feedback-line mr-3 text-gray-500"></i>
                  Enviar Feedback
                </button>
              </div>

              {/* Logout */}
              <div className="border-t border-gray-200 py-2">
                <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center transition-colors">
                  <i className="ri-logout-box-line mr-3"></i>
                  Sair da Conta
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}