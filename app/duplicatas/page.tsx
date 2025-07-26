
'use client';

import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import Link from 'next/link';

export default function Duplicatas() {
  const [filters, setFilters] = useState({
    cliente: '',
    status: '',
    dataInicio: '',
    dataFim: ''
  });

  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const duplicatas = [
    {
      id: '1',
      cliente: 'João Silva',
      valor: 5500.00,
      vencimento: '2024-02-15',
      status: 'Pendente',
      statusColor: 'bg-yellow-100 text-yellow-800',
      documento: 'NF-001234'
    },
    {
      id: '2',
      cliente: 'Maria Santos',
      valor: 3200.00,
      vencimento: '2024-02-20',
      status: 'Pago',
      statusColor: 'bg-green-100 text-green-800',
      documento: 'NF-001235'
    },
    {
      id: '3',
      cliente: 'Pedro Costa',
      valor: 7800.00,
      vencimento: '2024-02-10',
      status: 'Vencido',
      statusColor: 'bg-red-100 text-red-800',
      documento: 'NF-001236'
    },
    {
      id: '4',
      cliente: 'Ana Oliveira',
      valor: 4500.00,
      vencimento: '2024-02-25',
      status: 'Pendente',
      statusColor: 'bg-yellow-100 text-yellow-800',
      documento: 'NF-001237'
    },
    {
      id: '5',
      cliente: 'Carlos Mendes',
      valor: 6200.00,
      vencimento: '2024-02-28',
      status: 'Antecipado',
      statusColor: 'bg-blue-100 text-blue-800',
      documento: 'NF-001238'
    }
  ];

  const handleSelectAll = () => {
    if (selectedItems.length === duplicatas.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(duplicatas.map(d => d.id));
    }
  };

  const handleSelectItem = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

  const stats = [
    {
      title: 'Total de Duplicatas',
      value: '1,247',
      icon: 'ri-file-list-line',
      color: 'bg-blue-500',
      bgColor: 'bg-white'
    },
    {
      title: 'Valor Total',
      value: 'R$ 856.420',
      icon: 'ri-money-dollar-circle-line',
      color: 'bg-green-500',
      bgColor: 'bg-white'
    },
    {
      title: 'Vencidas',
      value: '23',
      icon: 'ri-alarm-warning-line',
      color: 'bg-red-500',
      bgColor: 'bg-white'
    },
    {
      title: 'Liquidadas',
      value: '1,156',
      icon: 'ri-checkbox-circle-line',
      color: 'bg-emerald-500',
      bgColor: 'bg-white'
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Duplicatas</h1>
            <p className="text-gray-600">Gerencie suas duplicatas e recebimentos</p>
          </div>
          
          <Link 
            href="/duplicatas/nova"
            className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors whitespace-nowrap font-medium"
          >
            <i className="ri-add-line mr-2"></i>
            Nova Duplicata
          </Link>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className={`${stat.bgColor} rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                  <i className={`${stat.icon} text-white text-xl`}></i>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cliente</label>
              <input
                type="text"
                value={filters.cliente}
                onChange={(e) => setFilters({...filters, cliente: e.target.value})}
                placeholder="Buscar por cliente..."
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8"
              >
                <option value="">Todos os status</option>
                <option value="Pendente">Pendente</option>
                <option value="Pago">Pago</option>
                <option value="Vencido">Vencido</option>
                <option value="Antecipado">Antecipado</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Data Início</label>
              <input
                type="date"
                value={filters.dataInicio}
                onChange={(e) => setFilters({...filters, dataInicio: e.target.value})}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Data Fim</label>
              <input
                type="date"
                value={filters.dataFim}
                onChange={(e) => setFilters({...filters, dataFim: e.target.value})}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        {selectedItems.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                {selectedItems.length} item(s) selecionado(s)
              </span>
              <div className="flex items-center space-x-2">
                <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  <i className="ri-folder-line mr-1"></i>
                  Gerar Borderô
                </button>
                <button className="px-4 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium">
                  <i className="ri-time-line mr-1"></i>
                  Antecipar
                </button>
                <button className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                  <i className="ri-download-line mr-1"></i>
                  Exportar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={selectedItems.length === duplicatas.length}
                      onChange={handleSelectAll}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Documento
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Valor
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Vencimento
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {duplicatas.map((duplicata) => (
                  <tr key={duplicata.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(duplicata.id)}
                        onChange={() => handleSelectItem(duplicata.id)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">{duplicata.cliente}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{duplicata.documento}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">
                        {formatCurrency(duplicata.valor)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">
                        {formatDate(duplicata.vencimento)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${duplicata.statusColor}`}>
                        {duplicata.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-3">
                        <button className="text-gray-400 hover:text-blue-600 transition-colors">
                          <i className="ri-eye-line text-lg"></i>
                        </button>
                        <button className="text-gray-400 hover:text-green-600 transition-colors">
                          <i className="ri-edit-line text-lg"></i>
                        </button>
                        <button className="text-gray-400 hover:text-red-600 transition-colors">
                          <i className="ri-delete-bin-line text-lg"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Mostrando 1 a 5 de 1.247 registros
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 disabled:opacity-50 border border-gray-200 rounded-lg">
                <i className="ri-arrow-left-line"></i>
              </button>
              <span className="px-3 py-2 text-sm bg-gray-900 text-white rounded-lg font-medium">1</span>
              <button className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-200 rounded-lg">2</button>
              <button className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-200 rounded-lg">3</button>
              <span className="px-3 py-2 text-sm text-gray-600">...</span>
              <button className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-200 rounded-lg">250</button>
              <button className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-200 rounded-lg">
                <i className="ri-arrow-right-line"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
