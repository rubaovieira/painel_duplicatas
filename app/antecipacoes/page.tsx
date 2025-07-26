'use client';

import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import Link from 'next/link';

export default function Antecipacoes() {
  const [selectedDuplicatas, setSelectedDuplicatas] = useState<string[]>([]);
  const [valorDesejado, setValorDesejado] = useState('');
  const [showForm, setShowForm] = useState(false);

  const duplicatasElegiveis = [
    {
      id: '1',
      cliente: 'João Silva',
      valor: 5500.00,
      vencimento: '2024-03-15',
      documento: 'NF-001234',
      diasVencimento: 28,
      taxaAntecipacao: 2.1
    },
    {
      id: '2',
      cliente: 'Maria Santos',
      valor: 3200.00,
      vencimento: '2024-03-20',
      documento: 'NF-001235',
      diasVencimento: 33,
      taxaAntecipacao: 2.3
    },
    {
      id: '3',
      cliente: 'Pedro Costa',
      valor: 7800.00,
      vencimento: '2024-03-25',
      documento: 'NF-001236',
      diasVencimento: 38,
      taxaAntecipacao: 2.5
    },
    {
      id: '4',
      cliente: 'Ana Oliveira',
      valor: 4500.00,
      vencimento: '2024-03-28',
      documento: 'NF-001237',
      diasVencimento: 41,
      taxaAntecipacao: 2.6
    },
    {
      id: '5',
      cliente: 'Carlos Mendes',
      valor: 6200.00,
      vencimento: '2024-04-02',
      documento: 'NF-001238',
      diasVencimento: 46,
      taxaAntecipacao: 2.8
    }
  ];

  const solicitacoesAntecipacao = [
    {
      id: 'ANT-2024-001',
      data: '2024-02-10',
      duplicatas: 5,
      valorSolicitado: 28500.00,
      valorLiquido: 26340.00,
      taxaMedia: 2.4,
      status: 'Aprovado',
      dataAprovacao: '2024-02-11'
    },
    {
      id: 'ANT-2024-002',
      data: '2024-02-12',
      duplicatas: 3,
      valorSolicitado: 15200.00,
      valorLiquido: 14120.00,
      taxaMedia: 2.1,
      status: 'Pendente',
      dataAprovacao: null
    },
    {
      id: 'ANT-2024-003',
      data: '2024-02-14',
      duplicatas: 8,
      valorSolicitado: 42300.00,
      valorLiquido: 38890.00,
      taxaMedia: 2.7,
      status: 'Rejeitado',
      dataAprovacao: '2024-02-15'
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

  const calcularValorTotal = () => {
    return duplicatasElegiveis
      .filter(d => selectedDuplicatas.includes(d.id))
      .reduce((total, d) => total + d.valor, 0);
  };

  const calcularTaxaMedia = () => {
    const selecionadas = duplicatasElegiveis.filter(d => selectedDuplicatas.includes(d.id));
    if (selecionadas.length === 0) return 0;
    
    const somaValorPonderado = selecionadas.reduce((total, d) => total + (d.valor * d.taxaAntecipacao), 0);
    const valorTotal = selecionadas.reduce((total, d) => total + d.valor, 0);
    
    return somaValorPonderado / valorTotal;
  };

  const calcularValorLiquido = () => {
    const valorTotal = calcularValorTotal();
    const taxaMedia = calcularTaxaMedia();
    const valorSolicitado = parseFloat(valorDesejado) || valorTotal;
    
    return valorSolicitado * (1 - taxaMedia / 100);
  };

  const handleSolicitarAntecipacao = () => {
    if (selectedDuplicatas.length === 0) {
      alert('Selecione pelo menos uma duplicata');
      return;
    }
    
    const valorSolicitado = parseFloat(valorDesejado) || calcularValorTotal();
    const valorLiquido = calcularValorLiquido();
    const taxaMedia = calcularTaxaMedia();
    
    alert(`Solicitação de antecipação enviada!\nDuplicatas: ${selectedDuplicatas.length}\nValor Solicitado: R$ ${valorSolicitado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\nValor Líquido: R$ ${valorLiquido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\nTaxa Média: ${taxaMedia.toFixed(2)}%`);
    
    setSelectedDuplicatas([]);
    setValorDesejado('');
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
      case 'Pendente':
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
            <h1 className="text-2xl font-semibold text-gray-800">Antecipações</h1>
            <p className="text-gray-600">Solicite antecipação de recebimentos</p>
          </div>
          
          <button 
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors whitespace-nowrap"
          >
            <i className="ri-add-line mr-2"></i>
            Nova Solicitação
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Solicitações</p>
                <p className="text-2xl font-semibold text-gray-800 mt-1">28</p>
              </div>
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <i className="ri-time-line text-blue-600 text-lg"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Valor Antecipado</p>
                <p className="text-2xl font-semibold text-gray-800 mt-1">R$ 485K</p>
              </div>
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <i className="ri-money-dollar-circle-line text-green-600 text-lg"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Aprovadas</p>
                <p className="text-2xl font-semibold text-green-600 mt-1">23</p>
              </div>
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <i className="ri-checkbox-circle-line text-green-600 text-lg"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pendentes</p>
                <p className="text-2xl font-semibold text-yellow-600 mt-1">3</p>
              </div>
              <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
                <i className="ri-time-line text-yellow-600 text-lg"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Formulário de Nova Solicitação */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Nova Solicitação de Antecipação</h3>
            
            {/* Configurações */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-medium text-gray-700">Valor Desejado</h4>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <label className="text-sm text-gray-600">Valor:</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">R$</span>
                      <input
                        type="number"
                        step="0.01"
                        value={valorDesejado}
                        onChange={(e) => setValorDesejado(e.target.value)}
                        placeholder={calcularValorTotal().toFixed(2)}
                        className="w-32 pl-8 pr-3 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                      />
                    </div>
                  </div>
                  {selectedDuplicatas.length > 0 && (
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Taxa Média:</span> {calcularTaxaMedia().toFixed(2)}% |{' '}
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
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dias</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Taxa</th>
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
                        <td className="px-4 py-3 text-sm text-gray-600">{duplicata.diasVencimento}d</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{duplicata.taxaAntecipacao}%</td>
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
                onClick={handleSolicitarAntecipacao}
                disabled={selectedDuplicatas.length === 0}
                className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                Solicitar Antecipação
              </button>
            </div>
          </div>
        )}

        {/* Histórico de Solicitações */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Histórico de Solicitações</h3>
            <button className="text-sm text-gray-600 hover:text-gray-800">
              <i className="ri-download-line mr-1"></i>
              Exportar
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Solicitação</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duplicatas</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Valor Solicitado</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Valor Líquido</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Taxa</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {solicitacoesAntecipacao.map((solicitacao) => (
                  <tr key={solicitacao.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{solicitacao.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{formatDate(solicitacao.data)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{solicitacao.duplicatas}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{formatCurrency(solicitacao.valorSolicitado)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{formatCurrency(solicitacao.valorLiquido)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{solicitacao.taxaMedia}%</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(solicitacao.status)}`}>
                        {solicitacao.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <button className="text-gray-600 hover:text-gray-800" title="Visualizar">
                          <i className="ri-eye-line text-lg"></i>
                        </button>
                        <button className="text-gray-600 hover:text-gray-800" title="Download">
                          <i className="ri-download-line text-lg"></i>
                        </button>
                        {solicitacao.status === 'Pendente' && (
                          <button className="text-red-600 hover:text-red-800" title="Cancelar">
                            <i className="ri-close-line text-lg"></i>
                          </button>
                        )}
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