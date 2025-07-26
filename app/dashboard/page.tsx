
'use client';

import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import Link from 'next/link';

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');

  const stats = [
    {
      title: 'Total Sales',
      value: '731 Orders',
      amount: '$9,328.55',
      change: '+15.6%',
      changeValue: '+1.4k this week',
      changeType: 'increase',
      icon: 'ri-shopping-bag-line',
      color: 'bg-gray-800',
      bgColor: 'bg-gray-900'
    },
    {
      title: 'Visitors',
      value: '12,302',
      subtitle: 'Avg. time: 4:30m',
      change: '+12.7%',
      changeValue: '+1.2k this week',
      changeType: 'increase',
      icon: 'ri-user-line',
      color: 'bg-gray-100',
      bgColor: 'bg-white'
    },
    {
      title: 'Refunds',
      value: '963',
      subtitle: '2 Disputed',
      change: '-12.7%',
      changeValue: '-213',
      changeType: 'decrease',
      icon: 'ri-refund-line',
      color: 'bg-gray-100',
      bgColor: 'bg-white'
    }
  ];

  const quickActions = [
    {
      label: 'Nova Duplicata',
      href: '/duplicatas/nova',
      icon: 'ri-add-line',
      color: 'bg-blue-500'
    },
    {
      label: 'Gerar Borderô',
      href: '/borderos',
      icon: 'ri-folder-line',
      color: 'bg-green-500'
    },
    {
      label: 'Solicitar Antecipação',
      href: '/antecipacoes',
      icon: 'ri-time-line',
      color: 'bg-purple-500'
    },
    {
      label: 'Portal do Consumidor',
      href: '/portal-consumidor',
      icon: 'ri-user-line',
      color: 'bg-orange-500'
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Welcome back, Matthew</h1>
            <p className="text-gray-600">Here are today's stats from your online store!</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            
            <button className="btn-primary">
              <i className="ri-download-line mr-2"></i>
              Export data
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className={`${stat.bgColor} rounded-xl shadow-sm border ${stat.bgColor === 'bg-gray-900' ? 'border-gray-700' : 'border-gray-200'} p-6 hover:shadow-md transition-shadow`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <i className={`${stat.icon} ${stat.bgColor === 'bg-gray-900' ? 'text-white' : 'text-gray-600'} text-lg`}></i>
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${stat.bgColor === 'bg-gray-900' ? 'text-gray-300' : 'text-gray-600'}`}>
                      {stat.title}
                    </p>
                    {stat.subtitle && (
                      <p className={`text-xs ${stat.bgColor === 'bg-gray-900' ? 'text-gray-400' : 'text-gray-500'}`}>
                        {stat.subtitle}
                      </p>
                    )}
                  </div>
                </div>
                <button className={`${stat.bgColor === 'bg-gray-900' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-800'} transition-colors`}>
                  <i className="ri-arrow-right-s-line text-lg"></i>
                </button>
              </div>
              
              <div className="space-y-2">
                {stat.amount && (
                  <p className={`text-2xl font-bold ${stat.bgColor === 'bg-gray-900' ? 'text-white' : 'text-gray-800'}`}>
                    {stat.amount}
                  </p>
                )}
                <p className={`text-lg font-semibold ${stat.bgColor === 'bg-gray-900' ? 'text-white' : 'text-gray-800'}`}>
                  {stat.value}
                </p>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <i className={`ri-arrow-${stat.changeType === 'increase' ? 'up' : 'down'}-line text-sm ${
                      stat.changeType === 'increase' ? 'text-green-500' : 'text-red-500'
                    }`}></i>
                    <span className={`text-sm font-medium ${
                      stat.changeType === 'increase' ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                  <span className={`text-sm ${stat.bgColor === 'bg-gray-900' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {stat.changeValue}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Performance Chart */}
          <div className="xl:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Sales Performance</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-gray-800 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-600">Earnings</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-600">Costs</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="text-sm text-gray-600 hover:text-gray-800">Export data</button>
                  <select className="text-sm border border-gray-200 rounded px-2 py-1 pr-6">
                    <option>Last 14 Days</option>
                    <option>Last 30 Days</option>
                    <option>Last 90 Days</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Chart simulation */}
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <i className="ri-line-chart-line text-4xl text-gray-400 mb-2"></i>
                <p className="text-gray-600">Gráfico de Performance</p>
                <p className="text-sm text-gray-500">Dados dos últimos 14 dias</p>
              </div>
            </div>
          </div>

          {/* Top Categories */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Top Categories</h3>
              <button className="text-gray-600 hover:text-gray-800">
                <i className="ri-arrow-right-s-line text-lg"></i>
              </button>
            </div>
            
            {/* Chart simulation */}
            <div className="h-40 bg-gray-50 rounded-lg flex items-center justify-center mb-6">
              <div className="text-center">
                <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold text-lg">$6.2k</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
                  <span className="text-sm text-gray-600">Electronics</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  <span className="text-sm text-gray-600">Laptops</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                  <span className="text-sm text-gray-600">Phones</span>
                </div>
                <button className="text-gray-600 hover:text-gray-800">
                  <i className="ri-arrow-right-s-line"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Ações Rápidas</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link key={index} href={action.href} className="group">
                <div className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <i className={`${action.icon} text-white text-lg`}></i>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{action.label}</p>
                      <p className="text-sm text-gray-600">Acesso rápido</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Atividade Recente</h3>
            <Link href="/atividades" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Ver todas
            </Link>
          </div>
          
          <div className="space-y-4">
            {[
              {
                icon: 'ri-file-add-line',
                color: 'bg-blue-100 text-blue-600',
                action: 'Nova duplicata cadastrada',
                details: 'Cliente: João Silva - R$ 5.500,00',
                time: '2 horas atrás'
              },
              {
                icon: 'ri-money-dollar-circle-line',
                color: 'bg-green-100 text-green-600',
                action: 'Duplicata liquidada',
                details: 'Cliente: Maria Santos - R$ 3.200,00',
                time: '4 horas atrás'
              },
              {
                icon: 'ri-folder-line',
                color: 'bg-purple-100 text-purple-600',
                action: 'Borderô gerado',
                details: 'Borderô #BRD-2024-001 - 15 duplicatas',
                time: '1 dia atrás'
              }
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${activity.color}`}>
                  <i className={`${activity.icon} text-lg`}></i>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.details}</p>
                </div>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
