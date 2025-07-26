'use client';

import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import Link from 'next/link';

export default function Arquivos() {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState<File[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterType, setFilterType] = useState('todos');

  const arquivos = [
    {
      id: '1',
      nome: 'Relatorio_Duplicatas_Janeiro_2024.pdf',
      tipo: 'PDF',
      tamanho: '2.5 MB',
      dataUpload: '2024-02-15T10:30:00',
      categoria: 'Relatório',
      proprietario: 'João Silva',
      downloads: 12,
      icone: 'ri-file-pdf-line',
      cor: 'text-red-600'
    },
    {
      id: '2',
      nome: 'Bordero_BRD-2024-001.xlsx',
      tipo: 'Excel',
      tamanho: '1.8 MB',
      dataUpload: '2024-02-14T14:20:00',
      categoria: 'Borderô',
      proprietario: 'Maria Santos',
      downloads: 8,
      icone: 'ri-file-excel-line',
      cor: 'text-green-600'
    },
    {
      id: '3',
      nome: 'Contrato_Antecipacao_ANT-001.docx',
      tipo: 'Word',
      tamanho: '890 KB',
      dataUpload: '2024-02-13T09:15:00',
      categoria: 'Contrato',
      proprietario: 'Pedro Costa',
      downloads: 5,
      icone: 'ri-file-word-line',
      cor: 'text-blue-600'
    },
    {
      id: '4',
      nome: 'Comprovante_Pagamento_123.jpg',
      tipo: 'Imagem',
      tamanho: '450 KB',
      dataUpload: '2024-02-12T16:45:00',
      categoria: 'Comprovante',
      proprietario: 'Ana Oliveira',
      downloads: 3,
      icone: 'ri-image-line',
      cor: 'text-purple-600'
    },
    {
      id: '5',
      nome: 'Backup_Sistema_02-2024.zip',
      tipo: 'Arquivo',
      tamanho: '15.2 MB',
      dataUpload: '2024-02-11T08:00:00',
      categoria: 'Backup',
      proprietario: 'Sistema',
      downloads: 1,
      icone: 'ri-file-zip-line',
      cor: 'text-orange-600'
    },
    {
      id: '6',
      nome: 'Manual_Usuario_Sistema.pdf',
      tipo: 'PDF',
      tamanho: '3.2 MB',
      dataUpload: '2024-02-10T11:30:00',
      categoria: 'Manual',
      proprietario: 'Suporte',
      downloads: 25,
      icone: 'ri-file-pdf-line',
      cor: 'text-red-600'
    }
  ];

  const categorias = [
    { value: 'todos', label: 'Todos os Arquivos', count: arquivos.length },
    { value: 'Relatório', label: 'Relatórios', count: arquivos.filter(a => a.categoria === 'Relatório').length },
    { value: 'Borderô', label: 'Borderôs', count: arquivos.filter(a => a.categoria === 'Borderô').length },
    { value: 'Contrato', label: 'Contratos', count: arquivos.filter(a => a.categoria === 'Contrato').length },
    { value: 'Comprovante', label: 'Comprovantes', count: arquivos.filter(a => a.categoria === 'Comprovante').length },
    { value: 'Backup', label: 'Backups', count: arquivos.filter(a => a.categoria === 'Backup').length },
    { value: 'Manual', label: 'Manuais', count: arquivos.filter(a => a.categoria === 'Manual').length }
  ];

  const handleSelectFile = (id: string) => {
    setSelectedFiles(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    const filteredFiles = filterType === 'todos' 
      ? arquivos 
      : arquivos.filter(a => a.categoria === filterType);
      
    if (selectedFiles.length === filteredFiles.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(filteredFiles.map(a => a.id));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadingFiles(files);
    
    // Simular upload
    setTimeout(() => {
      alert(`${files.length} arquivo(s) enviado(s) com sucesso!`);
      setUploadingFiles([]);
      setShowUploadModal(false);
    }, 2000);
  };

  const handleDownload = (arquivo: any) => {
    alert(`Baixando: ${arquivo.nome}`);
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este arquivo?')) {
      alert('Arquivo excluído com sucesso!');
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatFileSize = (size: string) => {
    return size;
  };

  const getFilteredFiles = () => {
    return filterType === 'todos' 
      ? arquivos 
      : arquivos.filter(a => a.categoria === filterType);
  };

  const calcularEspacoTotal = () => {
    return '28.5 MB';
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Arquivos</h1>
            <p className="text-gray-600">Gerencie documentos e arquivos do sistema</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center bg-white rounded-lg border border-gray-200 p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gray-100 text-gray-800' : 'text-gray-600 hover:text-gray-800'}`}
              >
                <i className="ri-grid-line"></i>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-gray-100 text-gray-800' : 'text-gray-600 hover:text-gray-800'}`}
              >
                <i className="ri-list-check"></i>
              </button>
            </div>
            
            <button 
              onClick={() => setShowUploadModal(true)}
              className="inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors whitespace-nowrap"
            >
              <i className="ri-upload-line mr-2"></i>
              Enviar Arquivo
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total de Arquivos</p>
                <p className="text-2xl font-semibold text-gray-800 mt-1">{arquivos.length}</p>
              </div>
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <i className="ri-file-line text-blue-600 text-lg"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Espaço Usado</p>
                <p className="text-2xl font-semibold text-gray-800 mt-1">{calcularEspacoTotal()}</p>
              </div>
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <i className="ri-hard-drive-line text-green-600 text-lg"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Downloads</p>
                <p className="text-2xl font-semibold text-gray-800 mt-1">{arquivos.reduce((total, a) => total + a.downloads, 0)}</p>
              </div>
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                <i className="ri-download-line text-purple-600 text-lg"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Mais Baixado</p>
                <p className="text-2xl font-semibold text-gray-800 mt-1">25</p>
              </div>
              <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                <i className="ri-star-line text-orange-600 text-lg"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-wrap gap-2">
            {categorias.map((categoria) => (
              <button
                key={categoria.value}
                onClick={() => setFilterType(categoria.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterType === categoria.value
                    ? 'bg-gray-800 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {categoria.label} ({categoria.count})
              </button>
            ))}
          </div>
        </div>

        {/* Actions Bar */}
        {selectedFiles.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                {selectedFiles.length} arquivo(s) selecionado(s)
              </span>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1.5 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                  <i className="ri-download-line mr-1"></i>
                  Baixar
                </button>
                <button className="px-3 py-1.5 text-sm bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                  <i className="ri-share-line mr-1"></i>
                  Compartilhar
                </button>
                <button className="px-3 py-1.5 text-sm bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors">
                  <i className="ri-delete-bin-line mr-1"></i>
                  Excluir
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Files Display */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">
              {filterType === 'todos' ? 'Todos os Arquivos' : categorias.find(c => c.value === filterType)?.label}
            </h3>
            <button
              onClick={handleSelectAll}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              {selectedFiles.length === getFilteredFiles().length ? 'Desmarcar Todos' : 'Selecionar Todos'}
            </button>
          </div>

          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {getFilteredFiles().map((arquivo) => (
                <div key={arquivo.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={selectedFiles.includes(arquivo.id)}
                        onChange={() => handleSelectFile(arquivo.id)}
                        className="w-4 h-4 text-gray-600 border-gray-300 rounded focus:ring-gray-500"
                      />
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gray-50`}>
                        <i className={`${arquivo.icone} ${arquivo.cor} text-lg`}></i>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => handleDownload(arquivo)}
                        className="p-1 text-gray-600 hover:text-blue-600"
                        title="Baixar"
                      >
                        <i className="ri-download-line"></i>
                      </button>
                      <button
                        onClick={() => handleDelete(arquivo.id)}
                        className="p-1 text-gray-600 hover:text-red-600"
                        title="Excluir"
                      >
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-800 text-sm line-clamp-2" title={arquivo.nome}>
                      {arquivo.nome}
                    </h4>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{arquivo.tamanho}</span>
                      <span>{arquivo.downloads} downloads</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{arquivo.proprietario}</span>
                      <span>{formatDate(arquivo.dataUpload).split(' ')[0]}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      <input
                        type="checkbox"
                        checked={selectedFiles.length === getFilteredFiles().length}
                        onChange={handleSelectAll}
                        className="w-4 h-4 text-gray-600 border-gray-300 rounded focus:ring-gray-500"
                      />
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tamanho</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Proprietário</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data Upload</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Downloads</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {getFilteredFiles().map((arquivo) => (
                    <tr key={arquivo.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedFiles.includes(arquivo.id)}
                          onChange={() => handleSelectFile(arquivo.id)}
                          className="w-4 h-4 text-gray-600 border-gray-300 rounded focus:ring-gray-500"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-50">
                            <i className={`${arquivo.icone} ${arquivo.cor} text-sm`}></i>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900 max-w-xs truncate" title={arquivo.nome}>
                              {arquivo.nome}
                            </p>
                            <p className="text-xs text-gray-500">{arquivo.categoria}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{arquivo.tipo}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{arquivo.tamanho}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{arquivo.proprietario}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{formatDate(arquivo.dataUpload)}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{arquivo.downloads}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => handleDownload(arquivo)}
                            className="text-gray-600 hover:text-blue-600" 
                            title="Baixar"
                          >
                            <i className="ri-download-line text-lg"></i>
                          </button>
                          <button className="text-gray-600 hover:text-green-600" title="Visualizar">
                            <i className="ri-eye-line text-lg"></i>
                          </button>
                          <button className="text-gray-600 hover:text-purple-600" title="Compartilhar">
                            <i className="ri-share-line text-lg"></i>
                          </button>
                          <button 
                            onClick={() => handleDelete(arquivo.id)}
                            className="text-gray-600 hover:text-red-600" 
                            title="Excluir"
                          >
                            <i className="ri-delete-bin-line text-lg"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Enviar Arquivos</h3>
                  <button
                    onClick={() => setShowUploadModal(false)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <i className="ri-close-line text-xl"></i>
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload-modal"
                    />
                    <label htmlFor="file-upload-modal" className="cursor-pointer">
                      <div className="flex flex-col items-center">
                        <i className="ri-upload-cloud-line text-4xl text-gray-400 mb-3"></i>
                        <p className="text-gray-600 font-medium">
                          Clique para selecionar arquivos
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          ou arraste e solte aqui
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                          Máximo 10MB por arquivo
                        </p>
                      </div>
                    </label>
                  </div>

                  {uploadingFiles.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-700">Arquivos Selecionados:</h4>
                      {uploadingFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <i className="ri-file-line text-gray-600"></i>
                            <span className="text-sm text-gray-800">{file.name}</span>
                          </div>
                          <span className="text-xs text-gray-500">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-end space-x-3 pt-4">
                    <button
                      onClick={() => setShowUploadModal(false)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={() => handleFileUpload}
                      disabled={uploadingFiles.length === 0}
                      className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                    >
                      {uploadingFiles.length > 0 ? 'Enviando...' : 'Enviar Arquivos'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}