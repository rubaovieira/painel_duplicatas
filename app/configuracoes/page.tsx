'use client';

import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';

export default function Configuracoes() {
  const [activeTab, setActiveTab] = useState('perfil');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [perfilData, setPerfilData] = useState({
    nome: 'João Silva',
    email: 'joao.silva@empresa.com',
    telefone: '(11) 99999-9999',
    cargo: 'Gerente Financeiro',
    empresa: 'Empresa ABC Ltda',
    documento: '12.345.678/0001-90',
    endereco: 'Rua das Flores, 123',
    cidade: 'São Paulo',
    estado: 'SP',
    cep: '01234-567',
    bio: 'Especialista em gestão financeira com mais de 10 anos de experiência em factoring e antecipação de recebíveis.',
  });

  const [sistemaConfig, setSistemaConfig] = useState({
    emailNotificacoes: true,
    smsNotificacoes: false,
    notificacaoVencimento: true,
    notificacaoAntecipacao: true,
    notificacaoStatusBordero: true,
    notificacaoLogin: true,
    relatorioPeriodico: 'semanal',
    formatoData: 'dd/mm/yyyy',
    moeda: 'BRL',
    fuso: 'America/Sao_Paulo',
    tema: 'light',
    idioma: 'pt-BR',
  });

  const [integracaoConfig, setIntegracaoConfig] = useState({
    apiKey: 'sk_live_51234567890abcdef...',
    webhookUrl: 'https://sua-empresa.com/webhook',
    statusWebhook: true,
    formatoExportacao: 'xlsx',
    backupAutomatico: true,
    frequenciaBackup: 'diario',
    retentaoDados: '1ano',
  });

  const [segurancaConfig, setSegurancaConfig] = useState({
    autenticacao2FA: false,
    sessaoExpira: '8h',
    logAcesso: true,
    ipPermitidos: '192.168.1.0/24',
    tentativasLogin: 3,
    senhaExpira: '90dias',
    loginDispositivos: true,
  });

  const [passwordData, setPasswordData] = useState({
    atual: '',
    nova: '',
    confirmar: '',
  });

  const handleSalvarPerfil = () => {
    setIsEditing(false);
    setTimeout(() => {
      alert('Perfil atualizado com sucesso!');
    }, 500);
  };

  const handleSalvarSistema = () => {
    alert('Configurações do sistema atualizadas!');
  };

  const handleSalvarIntegracao = () => {
    alert('Configurações de integração atualizadas!');
  };

  const handleSalvarSeguranca = () => {
    alert('Configurações de segurança atualizadas!');
  };

  const handleAlterarSenha = () => {
    if (passwordData.nova !== passwordData.confirmar) {
      alert('As senhas não coincidem!');
      return;
    }

    if (passwordData.nova.length < 8) {
      alert('A senha deve ter no mínimo 8 caracteres!');
      return;
    }

    alert('Senha alterada com sucesso!');
    setPasswordData({ atual: '', nova: '', confirmar: '' });
    setShowPasswordModal(false);
  };

  const handleGerarNovaApiKey = () => {
    const novaKey = 'sk_live_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    setIntegracaoConfig({ ...integracaoConfig, apiKey: novaKey });
    alert('Nova API Key gerada com sucesso!');
  };

  const handleTestarWebhook = () => {
    setTimeout(() => {
      alert('Webhook testado com sucesso! Status: 200 OK');
    }, 1000);
  };

  const handleExportarDados = () => {
    alert('Exportação de dados iniciada! Você receberá um email quando estiver pronto.');
  };

  const handleExcluirConta = () => {
    alert('Solicitação de exclusão de conta enviada! Você receberá um email de confirmação.');
    setShowDeleteModal(false);
  };

  const tabs = [
    { id: 'perfil', label: 'Perfil', icon: 'ri-user-line' },
    { id: 'sistema', label: 'Sistema', icon: 'ri-settings-line' },
    { id: 'integracao', label: 'Integração', icon: 'ri-plug-line' },
    { id: 'seguranca', label: 'Segurança', icon: 'ri-shield-line' },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-6 text-white">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold">JS</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">Configurações da Conta</h1>
              <p className="text-gray-200">Gerencie suas preferências e configurações do sistema</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-gray-900 text-gray-900 bg-gray-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <i className={`${tab.icon} mr-2`}></i>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {/* Tab: Perfil */}
            {activeTab === 'perfil' && (
              <div className="space-y-6">
                {/* Profile Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-gradient-to-r from-gray-700 to-gray-900 rounded-full flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">JS</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{perfilData.nome}</h3>
                      <p className="text-gray-600">{perfilData.cargo}</p>
                      <p className="text-sm text-gray-500">{perfilData.empresa}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className={`flex items-center px-4 py-2 text-sm rounded-lg transition-colors whitespace-nowrap ${
                        isEditing
                          ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          : 'bg-gray-900 text-white hover:bg-gray-800'
                      }`}
                    >
                      <i className={`${isEditing ? 'ri-close-line' : 'ri-edit-line'} mr-2`}></i>
                      {isEditing ? 'Cancelar' : 'Editar Perfil'}
                    </button>
                  </div>
                </div>

                {/* Profile Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo</label>
                    <input
                      type="text"
                      value={perfilData.nome}
                      onChange={(e) => setPerfilData({ ...perfilData, nome: e.target.value })}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={perfilData.email}
                      onChange={(e) => setPerfilData({ ...perfilData, email: e.target.value })}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                    <input
                      type="tel"
                      value={perfilData.telefone}
                      onChange={(e) => setPerfilData({ ...perfilData, telefone: e.target.value })}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cargo</label>
                    <input
                      type="text"
                      value={perfilData.cargo}
                      onChange={(e) => setPerfilData({ ...perfilData, cargo: e.target.value })}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Empresa</label>
                    <input
                      type="text"
                      value={perfilData.empresa}
                      onChange={(e) => setPerfilData({ ...perfilData, empresa: e.target.value })}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">CNPJ</label>
                    <input
                      type="text"
                      value={perfilData.documento}
                      onChange={(e) => setPerfilData({ ...perfilData, documento: e.target.value })}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Endereço</label>
                    <input
                      type="text"
                      value={perfilData.endereco}
                      onChange={(e) => setPerfilData({ ...perfilData, endereco: e.target.value })}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cidade</label>
                    <input
                      type="text"
                      value={perfilData.cidade}
                      onChange={(e) => setPerfilData({ ...perfilData, cidade: e.target.value })}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                    <input
                      type="text"
                      value={perfilData.estado}
                      onChange={(e) => setPerfilData({ ...perfilData, estado: e.target.value })}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">CEP</label>
                    <input
                      type="text"
                      value={perfilData.cep}
                      onChange={(e) => setPerfilData({ ...perfilData, cep: e.target.value })}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Biografia</label>
                  <textarea
                    value={perfilData.bio}
                    onChange={(e) => setPerfilData({ ...perfilData, bio: e.target.value })}
                    disabled={!isEditing}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                  />
                </div>

                {/* Security Section */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Segurança da Conta</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-800">Senha</p>
                        <p className="text-sm text-gray-600">Última alteração: há 30 dias</p>
                      </div>
                      <button
                        onClick={() => setShowPasswordModal(true)}
                        className="px-4 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors whitespace-nowrap"
                      >
                        Alterar
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-800">Autenticação 2FA</p>
                        <p className="text-sm text-gray-600">Desabilitada</p>
                      </div>
                      <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap">
                        Configurar
                      </button>
                    </div>
                  </div>
                </div>

                {isEditing && (
                  <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-6 py-2 text-gray-600 hover:text-gray-800"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleSalvarPerfil}
                      className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors whitespace-nowrap"
                    >
                      Salvar Alterações
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Tab: Sistema */}
            {activeTab === 'sistema' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Notificações</h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-800">Email</p>
                        <p className="text-sm text-gray-600">Receber notificações por email</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={sistemaConfig.emailNotificacoes}
                          onChange={(e) => setSistemaConfig({ ...sistemaConfig, emailNotificacoes: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-800">SMS</p>
                        <p className="text-sm text-gray-600">Receber notificações via SMS</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={sistemaConfig.smsNotificacoes}
                          onChange={(e) => setSistemaConfig({ ...sistemaConfig, smsNotificacoes: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-800">Vencimentos</p>
                        <p className="text-sm text-gray-600">Alertas sobre duplicatas próximas ao vencimento</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={sistemaConfig.notificacaoVencimento}
                          onChange={(e) => setSistemaConfig({ ...sistemaConfig, notificacaoVencimento: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-800">Antecipações</p>
                        <p className="text-sm text-gray-600">Status das solicitações de antecipação</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={sistemaConfig.notificacaoAntecipacao}
                          onChange={(e) => setSistemaConfig({ ...sistemaConfig, notificacaoAntecipacao: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-600"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Preferências</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Relatório Periódico</label>
                      <select
                        value={sistemaConfig.relatorioPeriodico}
                        onChange={(e) => setSistemaConfig({ ...sistemaConfig, relatorioPeriodico: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent pr-8"
                      >
                        <option value="diario">Diário</option>
                        <option value="semanal">Semanal</option>
                        <option value="mensal">Mensal</option>
                        <option value="nunca">Nunca</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Formato de Data</label>
                      <select
                        value={sistemaConfig.formatoData}
                        onChange={(e) => setSistemaConfig({ ...sistemaConfig, formatoData: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent pr-8"
                      >
                        <option value="dd/mm/yyyy">DD/MM/YYYY</option>
                        <option value="mm/dd/yyyy">MM/DD/YYYY</option>
                        <option value="yyyy-mm-dd">YYYY-MM-DD</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Moeda</label>
                      <select
                        value={sistemaConfig.moeda}
                        onChange={(e) => setSistemaConfig({ ...sistemaConfig, moeda: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent pr-8"
                      >
                        <option value="BRL">Real (R$)</option>
                        <option value="USD">Dólar ($)</option>
                        <option value="EUR">Euro (€)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Fuso Horário</label>
                      <select
                        value={sistemaConfig.fuso}
                        onChange={(e) => setSistemaConfig({ ...sistemaConfig, fuso: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent pr-8"
                      >
                        <option value="America/Sao_Paulo">Brasília (UTC-3)</option>
                        <option value="America/New_York">Nova York (UTC-5)</option>
                        <option value="Europe/London">Londres (UTC+0)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                  <button
                    onClick={handleSalvarSistema}
                    className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors whitespace-nowrap"
                  >
                    Salvar Configurações
                  </button>
                </div>
              </div>
            )}

            {/* Tab: Integração */}
            {activeTab === 'integracao' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">API e Webhook</h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={integracaoConfig.apiKey}
                          readOnly
                          className="flex-1 px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none"
                        />
                        <button
                          onClick={() => navigator.clipboard.writeText(integracaoConfig.apiKey)}
                          className="px-3 py-2 text-gray-600 hover:text-gray-800 border border-gray-200 rounded-lg"
                          title="Copiar"
                        >
                          <i className="ri-file-copy-line"></i>
                        </button>
                        <button
                          onClick={handleGerarNovaApiKey}
                          className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
                        >
                          Gerar Nova
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Webhook URL</label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="url"
                          value={integracaoConfig.webhookUrl}
                          onChange={(e) => setIntegracaoConfig({ ...integracaoConfig, webhookUrl: e.target.value })}
                          className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        />
                        <button
                          onClick={handleTestarWebhook}
                          className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap"
                        >
                          Testar
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-800">Webhook Ativo</p>
                        <p className="text-sm text-gray-600">Receber eventos em tempo real</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={integracaoConfig.statusWebhook}
                          onChange={(e) => setIntegracaoConfig({ ...integracaoConfig, statusWebhook: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-600"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Exportação e Backup</h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Formato de Exportação</label>
                      <select
                        value={integracaoConfig.formatoExportacao}
                        onChange={(e) => setIntegracaoConfig({ ...integracaoConfig, formatoExportacao: e.target.value })}
                        className="w-full md:w-48 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent pr-8"
                      >
                        <option value="xlsx">Excel (.xlsx)</option>
                        <option value="csv">CSV (.csv)</option>
                        <option value="pdf">PDF (.pdf)</option>
                        <option value="json">JSON (.json)</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-800">Backup Automático</p>
                        <p className="text-sm text-gray-600">Backup automático dos dados</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={integracaoConfig.backupAutomatico}
                          onChange={(e) => setIntegracaoConfig({ ...integracaoConfig, backupAutomatico: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-600"></div>
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Frequência do Backup</label>
                      <select
                        value={integracaoConfig.frequenciaBackup}
                        onChange={(e) => setIntegracaoConfig({ ...integracaoConfig, frequenciaBackup: e.target.value })}
                        disabled={!integracaoConfig.backupAutomatico}
                        className="w-full md:w-48 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent pr-8 disabled:bg-gray-100 disabled:cursor-not-allowed"
                      >
                        <option value="diario">Diário</option>
                        <option value="semanal">Semanal</option>
                        <option value="mensal">Mensal</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                  <button
                    onClick={handleSalvarIntegracao}
                    className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors whitespace-nowrap"
                  >
                    Salvar Configurações
                  </button>
                </div>
              </div>
            )}

            {/* Tab: Segurança */}
            {activeTab === 'seguranca' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Controle de Acesso</h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-800">Autenticação de Dois Fatores</p>
                        <p className="text-sm text-gray-600">Proteja sua conta com 2FA</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={segurancaConfig.autenticacao2FA}
                          onChange={(e) => setSegurancaConfig({ ...segurancaConfig, autenticacao2FA: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-600"></div>
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expiração da Sessão</label>
                      <select
                        value={segurancaConfig.sessaoExpira}
                        onChange={(e) => setSegurancaConfig({ ...segurancaConfig, sessaoExpira: e.target.value })}
                        className="w-full md:w-48 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent pr-8"
                      >
                        <option value="1h">1 hora</option>
                        <option value="4h">4 horas</option>
                        <option value="8h">8 horas</option>
                        <option value="24h">24 horas</option>
                        <option value="never">Nunca</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-800">Log de Acesso</p>
                        <p className="text-sm text-gray-600">Registrar tentativas de login</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={segurancaConfig.logAcesso}
                          onChange={(e) => setSegurancaConfig({ ...segurancaConfig, logAcesso: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-600"></div>
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">IPs Permitidos</label>
                      <input
                        type="text"
                        value={segurancaConfig.ipPermitidos}
                        onChange={(e) => setSegurancaConfig({ ...segurancaConfig, ipPermitidos: e.target.value })}
                        placeholder="192.168.1.0/24, 10.0.0.0/8"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Deixe em branco para permitir qualquer IP
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tentativas de Login</label>
                      <select
                        value={segurancaConfig.tentativasLogin}
                        onChange={(e) => setSegurancaConfig({ ...segurancaConfig, tentativasLogin: parseInt(e.target.value) })}
                        className="w-full md:w-48 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent pr-8"
                      >
                        <option value={3}>3 tentativas</option>
                        <option value={5}>5 tentativas</option>
                        <option value={10}>10 tentativas</option>
                        <option value={0}>Ilimitado</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Dados e Privacidade</h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div>
                        <p className="font-medium text-blue-800">Exportar Dados</p>
                        <p className="text-sm text-blue-700">Baixe uma cópia dos seus dados</p>
                      </div>
                      <button
                        onClick={handleExportarDados}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
                      >
                        <i className="ri-download-line mr-2"></i>
                        Exportar
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                      <div>
                        <p className="font-medium text-red-800">Excluir Conta</p>
                        <p className="text-sm text-red-700">Remover permanentemente sua conta e dados</p>
                      </div>
                      <button
                        onClick={() => setShowDeleteModal(true)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap"
                      >
                        <i className="ri-delete-bin-line mr-2"></i>
                        Excluir
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                  <button
                    onClick={handleSalvarSeguranca}
                    className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors whitespace-nowrap"
                  >
                    Salvar Configurações
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Alterar Senha */}
        {showPasswordModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">Alterar Senha</h3>
                  <button
                    onClick={() => setShowPasswordModal(false)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <i className="ri-close-line text-xl"></i>
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Senha Atual</label>
                    <input
                      type="password"
                      value={passwordData.atual}
                      onChange={(e) => setPasswordData({ ...passwordData, atual: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                      placeholder="Digite sua senha atual"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nova Senha</label>
                    <input
                      type="password"
                      value={passwordData.nova}
                      onChange={(e) => setPasswordData({ ...passwordData, nova: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                      placeholder="Digite sua nova senha"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Mínimo 8 caracteres com letras, números e símbolos
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirmar Nova Senha</label>
                    <input
                      type="password"
                      value={passwordData.confirmar}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmar: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                      placeholder="Confirme sua nova senha"
                    />
                  </div>

                  <div className="flex items-center justify-end space-x-3 pt-4">
                    <button
                      onClick={() => setShowPasswordModal(false)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleAlterarSenha}
                      className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors whitespace-nowrap"
                    >
                      Alterar Senha
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Excluir Conta */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-red-800">Excluir Conta</h3>
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <i className="ri-close-line text-xl"></i>
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 bg-red-50 rounded-lg">
                    <i className="ri-alert-line text-red-600 text-xl"></i>
                    <div>
                      <p className="font-medium text-red-800">Atenção!</p>
                      <p className="text-sm text-red-700">Esta ação não pode ser desfeita.</p>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    <p className="mb-2">Ao excluir sua conta:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Todos os dados serão removidos permanentemente</li>
                      <li>Duplicatas e borderôs serão perdidos</li>
                      <li>Não será possível recuperar as informações</li>
                    </ul>
                  </div>

                  <div className="flex items-center justify-end space-x-3 pt-4">
                    <button
                      onClick={() => setShowDeleteModal(false)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleExcluirConta}
                      className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap"
                    >
                      Confirmar Exclusão
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
