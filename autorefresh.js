// Auto Refresh Component for Looker Studio
const refreshComponent = {
  config: {
    refresh_interval: {
      type: "NUMBER",
      displayName: "Intervalo de Atualização (segundos)",
      defaultValue: 300
    },
    enable_refresh: {
      type: "BOOLEAN",
      displayName: "Ativar Atualização Automática",
      defaultValue: true
    }
  },

  initialize: function(context) {
    this.interval = null;
    this.context = context;
    
    if (this.config.enable_refresh) {
      this.startRefresh();
    }
  },

  startRefresh: function() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    
    const refreshTime = this.config.refresh_interval * 1000;
    
    this.interval = setInterval(() => {
      this.refreshData();
    }, refreshTime);
  },

  refreshData: function() {
    try {
      this.context.clearDataCache();
      this.context.draw();
      console.log("Dados atualizados em: " + new Date().toLocaleString());
    } catch (error) {
      console.error("Erro ao atualizar dados:", error);
    }
  },

  stopRefresh: function() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  },

  destroy: function() {
    this.stopRefresh();
  }
};

dscc.subscribeToData(refreshComponent);
