'use client';

import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';

export default function PortalConsumidor() {
  const [consultaData, setConsultaData] = useState({
    documento: '',
    tipoConsulta: 'cpf'
  });

  const [resultados, setResultados] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [mostrarResultados, setMostrarResultados] = useState(false);

  const duplicatasConsulta = [
    {
      id: '1',
      empresa: 'Empresa ABC Ltda',
      valor: 2500.00,
      vencimento: '2024-03-15',
      status: 'Pendente',
      statusColor: 'bg-yellow-100 text-yellow-800',
      documento: 'NF-001234',
      parcela: '1/1',
      telefone: '(11) 99999-9999'
    },
    {
      id: '2',
      empresa: 'Comércio XYZ S.A',
      valor: 1800.00,
      vencimento: '2024-03-20',
      status: 'Pago',
      statusColor: 'bg-green-100 text-green-800',
      documento: 'NF-002567',
      parcela: '2/3',
      telefone: '(11) 88888-8888'
    },
    {
      id: '3',
      empresa: 'Serviços DEF ME',
      valor: 3200.00,
      vencimento: '2024-02-28',
      status: 'Vencido',
      statusColor: 'bg-red-100 text-red-800',
      documento: 'NF-003890',
      parcela: '1/2',
      telefone: '(11) 77777-7777'
    }
  ];

  const handleConsultar = async () => {
    if (!consultaData.documento) {
      alert('Por favor, informe o documento para consulta');
      return;
    }

    setLoading(true);
    
    // Simular consulta
    setTimeout(() => {
      setResultados(duplicatasConsulta);
      setMostrarResultados(true);
      setLoading(false);
    }, 1500);
  };

  const handleNegociar = (duplicataId: string) => {
    alert(`Iniciando negociação para duplicata ${duplicataId}`);
  };

  const handleContatar = (telefone: string) => {
    alert(`Entrando em contato via ${telefone}`);
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

  const formatDocument = (doc: string) => {
    if (consultaData.tipoConsulta === 'cpf') {
      return doc.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else {
      return doc.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }
  };

  const calcularTotalPendente = () => {
    return resultados
      .filter(d => d.status === 'Pendente' || d.status === 'Vencido')
      .reduce((total, d) => total + d.valor, 0);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">Portal do Consumidor</h1>
          <p className="text-gray-600">Consulte suas duplicatas e negocie diretamente</p>
        </div>

        {/* Consulta */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Consultar Duplicatas</h3>
          
          <div className="space-y-4">
            {/* Tipo de Consulta */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Consulta
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="tipoConsulta"
                    value="cpf"
                    checked={consultaData.tipoConsulta === 'cpf'}
                    onChange={(e) => setConsultaData({...consultaData, tipoConsulta: e.target.value, documento: ''})}
                    className="w-4 h-4 text-gray-600 border-gray-300 focus:ring-gray-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">CPF</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="tipoConsulta"
                    value="cnpj"
                    checked={consultaData.tipoConsulta === 'cnpj'}
                    onChange={(e) => setConsultaData({...consultaData, tipoConsulta: e.target.value, documento: ''})}
                    className="w-4 h-4 text-gray-600 border-gray-300 focus:ring-gray-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">CNPJ</span>
                </label>
              </div>
            </div>

            {/* Documento */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {consultaData.tipoConsulta === 'cpf' ? 'CPF' : 'CNPJ'}
              </label>
              <input
                type="text"
                value={consultaData.documento}
                onChange={(e) => setConsultaData({...consultaData, documento: e.target.value})}
                placeholder={consultaData.tipoConsulta === 'cpf' ? '000.000.000-00' : '00.000.000/0000-00'}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
            </div>

            {/* Botão Consultar */}
            <button
              onClick={handleConsultar}
              disabled={loading}
              className="w-full px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <i className="ri-loader-line animate-spin mr-2"></i>
                  Consultando...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <i className="ri-search-line mr-2"></i>
                  Consultar Duplicatas
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Resultados */}
        {mostrarResultados && (
          <>
            {/* Resumo */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total de Duplicatas</p>
                    <p className="text-2xl font-semibold text-gray-800 mt-1">{resultados.length}</p>
                  </div>
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <i className="ri-file-list-line text-blue-600 text-lg"></i>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Valor Total</p>
                    <p className="text-2xl font-semibold text-gray-800 mt-1">
                      {formatCurrency(resultados.reduce((total, d) => total + d.valor, 0))}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                    <i className="ri-money-dollar-circle-line text-green-600 text-lg"></i>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Pendente</p>
                    <p className="text-2xl font-semibold text-red-600 mt-1">
                      {formatCurrency(calcularTotalPendente())}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                    <i className="ri-alarm-warning-line text-red-600 text-lg"></i>
                  </div>
                </div>
              </div>
            </div>

            {/* Lista de Duplicatas */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Suas Duplicatas</h3>
                <p className="text-sm text-gray-600">
                  Documento: {formatDocument(consultaData.documento)}
                </p>
              </div>

              <div className="space-y-4">
                {resultados.map((duplicata) => (
                  <div key={duplicata.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-2">
                          <h4 className="font-medium text-gray-800">{duplicata.empresa}</h4>
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${duplicata.statusColor}`}>
                            {duplicata.status}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Documento:</span>
                            <p>{duplicata.documento}</p>
                          </div>
                          <div>
                            <span className="font-medium">Valor:</span>
                            <p className="text-gray-800 font-medium">{formatCurrency(duplicata.valor)}</p>
                          </div>
                          <div>
                            <span className="font-medium">Vencimento:</span>
                            <p>{formatDate(duplicata.vencimento)}</p>
                          </div>
                          <div>
                            <span className="font-medium">Parcela:</span>
                            <p>{duplicata.parcela}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 ml-4">
                        {(duplicata.status === 'Pendente' || duplicata.status === 'Vencido') && (
                          <button
                            onClick={() => handleNegociar(duplicata.id)}
                            className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm whitespace-nowrap"
                          >
                            <i className="ri-hand-coin-line mr-1"></i>
                            Negociar
                          </button>
                        )}
                        <button
                          onClick={() => handleContatar(duplicata.telefone)}
                          className="px-3 py-1.5 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm whitespace-nowrap"
                        >
                          <i className="ri-phone-line mr-1"></i>
                          Contato
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Informações Importantes */}
            <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
              <h4 className="font-medium text-blue-800 mb-3">Informações Importantes</h4>
              <div className="space-y-2 text-sm text-blue-700">
                <p>• Para negociação de duplicatas vencidas, entre em contato diretamente com a empresa.</p>
                <p>• Duplicatas pagas podem levar até 2 dias úteis para atualização do status.</p>
                <p>• Em caso de divergências, utilize o canal de atendimento da empresa.</p>
                <p>• Guarde o comprovante de pagamento para futuras consultas.</p>
              </div>
            </div>

            {/* Nova Consulta */}
            <div className="text-center">
              <button
                onClick={() => {
                  setMostrarResultados(false);
                  setResultados([]);
                  setConsultaData({documento: '', tipoConsulta: 'cpf'});
                }}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <i className="ri-refresh-line mr-2"></i>
                Nova Consulta
              </button>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}