
'use client';

import { useState } from 'react';
import DashboardLayout from '../../../components/DashboardLayout';
import Link from 'next/link';

export default function NovaDuplicata() {
  const [formData, setFormData] = useState({
    cliente: '',
    valor: '',
    vencimento: '',
    status: 'Pendente',
    observacoes: ''
  });

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const clientes = [
    { id: '1', nome: 'João Silva' },
    { id: '2', nome: 'Maria Santos' },
    { id: '3', nome: 'Pedro Costa' },
    { id: '4', nome: 'Ana Oliveira' },
    { id: '5', nome: 'Carlos Mendes' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados da duplicata:', formData);
    console.log('Arquivo enviado:', uploadedFile);
    alert('Duplicata salva com sucesso!');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Nova Duplicata</h1>
            <p className="text-gray-600">Cadastre uma nova duplicata no sistema</p>
          </div>
          <Link 
            href="/duplicatas"
            className="inline-flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors border border-gray-200 rounded-lg"
          >
            <i className="ri-arrow-left-line mr-2"></i>
            Voltar
          </Link>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Cliente */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Cliente *
                </label>
                <select
                  value={formData.cliente}
                  onChange={(e) => setFormData({...formData, cliente: e.target.value})}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
                >
                  <option value="">Selecione um cliente</option>
                  {clientes.map(cliente => (
                    <option key={cliente.id} value={cliente.nome}>
                      {cliente.nome}
                    </option>
                  ))}
                </select>
              </div>

              {/* Valor */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Valor *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                    R$
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.valor}
                    onChange={(e) => setFormData({...formData, valor: e.target.value})}
                    placeholder="0,00"
                    required
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Vencimento */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Data de Vencimento *
                </label>
                <input
                  type="date"
                  value={formData.vencimento}
                  onChange={(e) => setFormData({...formData, vencimento: e.target.value})}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
                >
                  <option value="Pendente">Pendente</option>
                  <option value="Pago">Pago</option>
                  <option value="Vencido">Vencido</option>
                  <option value="Antecipado">Antecipado</option>
                </select>
              </div>
            </div>

            {/* Upload de Arquivo */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nota Fiscal
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-gray-400 transition-colors">
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <i className="ri-upload-cloud-line text-2xl text-gray-400"></i>
                    </div>
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      Clique para fazer upload ou arraste o arquivo aqui
                    </p>
                    <p className="text-xs text-gray-500">
                      PDF, JPG ou PNG (máx. 5MB)
                    </p>
                  </div>
                </label>
                
                {uploadedFile && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <i className="ri-file-line text-green-600 mr-2"></i>
                        <span className="text-sm font-medium text-green-700">{uploadedFile.name}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setUploadedFile(null)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        <i className="ri-close-line"></i>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Observações */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Observações
              </label>
              <textarea
                value={formData.observacoes}
                onChange={(e) => setFormData({...formData, observacoes: e.target.value})}
                rows={4}
                maxLength={500}
                placeholder="Informações adicionais sobre a duplicata..."
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              <p className="text-xs text-gray-500 mt-2">
                {formData.observacoes.length}/500 caracteres
              </p>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
              <Link
                href="/duplicatas"
                className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors font-medium"
              >
                Cancelar
              </Link>
              <button
                type="submit"
                className="px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors whitespace-nowrap font-medium"
              >
                Salvar Duplicata
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
