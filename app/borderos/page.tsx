'use client';

import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import Link from 'next/link';

export default function Borderos() {
  const [selectedDuplicatas, setSelectedDuplicatas] = useState<string[]>([]);
  const [taxa, setTaxa] = useState('2.5');
  const [showForm, setShowForm] = useState(false);

  const duplicatasElegiveis = [
    {
      id: '1',
      cliente: 'João Silva',
      valor: 5500.00,
      vencimento: '2024-02-15',
      documento: 'NF-001234'
    },
    {
      id: '2',
      cliente: 'Maria Santos',
      valor: 3200.00,
      vencimento: '2024-02-20',
      documento: 'NF-001235'
    },
    {
      id: '3',
      cliente: 'Pedro Costa',
      valor: 7800.00,
      vencimento: '2024-02-25',
      documento: 'NF-001236'
    },
    {
      id: '4',
      cliente: 'Ana Oliveira',
      valor: 4500.00,
      vencimento: '2024-02-28',
      documento: 'NF-001237'
    },
    {
      id: '5',
      cliente: 'Carlos Mendes',
      valor: 6200.00,
      vencimento: '2024-03-02',
      documento: 'NF-001238'
    }
  ];

  const borderosGerados = [
    {
      id: 'BRD-2024-001',
      data: '2024-01-15',
      duplicatas: 12,
      valorBruto: 45600.00,
      valorLiquido: 42340.00,
      taxa: 2.5,
      status: 'Aprovado'
    },
    {
      id: 'BRD-2024-002',
      data: '2024-01-20',
      duplicatas: 8,
      valorBruto: 28900.00,
      valorLiquido: 26820.00,
      taxa: 2.3,
      status: 'Processando'
    },
    {
      id: 'BRD-2024-003',
      data: '2024-01-25',
      duplicatas: 15,
      valorBruto: 67200.00,
      valorLiquido: 62340.00,
      taxa: 2.8,
      status: 'Rejeitado'
    }
  ];

  const handleSelectDuplicata = (id: string) => {
    setSelectedDuplicatas(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedDuplicatas.length === duplicatasElegiveis.length) {
      setSelectedDuplicatas([]);
    } else {
      setSelectedDuplicatas(duplicatasElegiveis.map(d => d.id));
    }
  };

  const calcularValorBruto = () => {
    return duplicatasElegiveis
      .filter(d => selectedDuplicatas.includes(d.id))
      .reduce((total, d) => total + d.valor, 0);
  };

  const calcularValorLiquido = () => {
    const bruto = calcularValorBruto();
    const taxaDecimal = parseFloat(taxa) / 100;
    return bruto * (1 - taxaDecimal);
  };

  const handleGerarBordero = () => {
    if (selectedDuplicatas.length === 0) {
      alert('Selecione pelo menos uma duplicata');
      return;
    }
    
    alert(`Borderô gerado com sucesso!\nDuplicatas: ${selectedDuplicatas.length}\nValor Bruto: R$ ${calcularValorBruto().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\nValor Líquido: R$ ${calcularValorLiquido().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`);
    setSelectedDuplicatas([]);
    setShowForm(false);
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aprovado':
        return 'bg-green-100 text-green-800';
      case 'Processando':
        return 'bg-yellow-100 text-yellow-800';
      case 'Rejeitado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Borderôs</h1>
            <p className="text-gray-600">Gere borderôs e acompanhe o histórico</p>
          </div>
          
          <button 
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors whitespace-nowrap"
          >
            <i className="ri-add-line mr-2"></i>
            Novo Borderô
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Borderôs Gerados</p>
                <p className="text-2xl font-semibold text-gray-800 mt-1">47</p>
              </div>
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <i className="ri-folder-line text-blue-600 text-lg"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Valor Total</p>
                <p className="text-2xl font-semibold text-gray-800 mt-1">R$ 1.2M</p>
              </div>
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <i className="ri-money-dollar-circle-line text-green-600 text-lg"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Aprovados</p>
                <p className="text-2xl font-semibold text-green-600 mt-1">42</p>
              </div>
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <i className="ri-checkbox-circle-line text-green-600 text-lg"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Processando</p>
                <p className="text-2xl font-semibold text-yellow-600 mt-1">3</p>
              </div>
              <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
                <i className="ri-time-line text-yellow-600 text-lg"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Formulário de Novo Borderô */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Novo Borderô</h3>
            
            {/* Configurações */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-medium text-gray-700">Configurações</h4>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <label className="text-sm text-gray-600">Taxa (%):</label>
                    <input
                      type="number"
                      step="0.1"
                      value={taxa}
                      onChange={(e) => setTaxa(e.target.value)}
                      className="w-16 px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                  </div>
                  {selectedDuplicatas.length > 0 && (
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Bruto:</span> {formatCurrency(calcularValorBruto())} |{' '}
                      <span className="font-medium">Líquido:</span> {formatCurrency(calcularValorLiquido())}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Duplicatas Elegíveis */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-medium text-gray-700">Duplicatas Elegíveis</h4>
                <button
                  onClick={handleSelectAll}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  {selectedDuplicatas.length === duplicatasElegiveis.length ? 'Desmarcar Todas' : 'Selecionar Todas'}
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        <input
                          type="checkbox"
                          checked={selectedDuplicatas.length === duplicatasElegiveis.length}
                          onChange={handleSelectAll}
                          className="w-4 h-4 text-gray-600 border-gray-300 rounded focus:ring-gray-500"
                        />
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Documento</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Valor</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vencimento</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {duplicatasElegiveis.map((duplicata) => (
                      <tr key={duplicata.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <input
                            type="checkbox"
                            checked={selectedDuplicatas.includes(duplicata.id)}
                            onChange={() => handleSelectDuplicata(duplicata.id)}
                            className="w-4 h-4 text-gray-600 border-gray-300 rounded focus:ring-gray-500"
                          />
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{duplicata.cliente}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{duplicata.documento}</td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{formatCurrency(duplicata.valor)}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{formatDate(duplicata.vencimento)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleGerarBordero}
                disabled={selectedDuplicatas.length === 0}
                className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                Gerar Borderô
              </button>
            </div>
          </div>
        )}

        {/* Histórico de Borderôs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Histórico de Borderôs</h3>
            <button className="text-sm text-gray-600 hover:text-gray-800">
              <i className="ri-download-line mr-1"></i>
              Exportar
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Borderô</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duplicatas</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Valor Bruto</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Valor Líquido</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Taxa</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {borderosGerados.map((bordero) => (
                  <tr key={bordero.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{bordero.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{formatDate(bordero.data)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{bordero.duplicatas}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{formatCurrency(bordero.valorBruto)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{formatCurrency(bordero.valorLiquido)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{bordero.taxa}%</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(bordero.status)}`}>
                        {bordero.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <button className="text-gray-600 hover:text-gray-800" title="Visualizar">
                          <i className="ri-eye-line text-lg"></i>
                        </button>
                        <button className="text-gray-600 hover:text-gray-800" title="Download PDF">
                          <i className="ri-download-line text-lg"></i>
                        </button>
                        <button className="text-gray-600 hover:text-gray-800" title="Duplicar">
                          <i className="ri-file-copy-line text-lg"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}