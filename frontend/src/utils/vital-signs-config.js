/**
 * Configuração centralizada dos parâmetros de normalidade dos sinais vitais
 * Baseado no Protocolo de Manchester e diretrizes médicas
 * 
 * IMPORTANTE: Valores devem ser revisados por profissional médico
 * Última atualização: 2024
 */

export const VITAL_SIGNS_CONFIG = {
  /**
   * PRESSÃO ARTERIAL DIASTÓLICA (mmHg)
   * Valor inferior da pressão arterial (quando o coração relaxa)
   * ATENÇÃO: Valores para adultos (>15 anos) parecem estar incorretos
   * Adulto normal: 60-80 mmHg (não 90-140 como está configurado)
   */
  diastolic: {
    ranges: [
      { ageMin: 0, ageMax: 2, min: 42, max: 63, label: '0-2 anos' },
      { ageMin: 3, ageMax: 5, min: 46, max: 72, label: '3-5 anos' },
      { ageMin: 6, ageMax: 9, min: 57, max: 76, label: '6-9 anos' },
      { ageMin: 10, ageMax: 12, min: 61, max: 80, label: '10-12 anos' },
      { ageMin: 13, ageMax: 15, min: 64, max: 83, label: '13-15 anos' },
      { ageMin: 16, ageMax: 999, min: 60, max: 80, label: 'Adulto (>15 anos)' } // CORRIGIDO
    ],
    unit: 'mmHg',
    description: 'Pressão arterial diastólica'
  },

  /**
   * PRESSÃO ARTERIAL SISTÓLICA (mmHg)
   * Valor superior da pressão arterial (quando o coração contrai)
   * ATENÇÃO: Valores para adultos parecem estar confundidos com diastólica
   * Adulto normal: 90-120 mmHg (pode ir até 140 em alguns casos)
   */
  systolic: {
    ranges: [
      { ageMin: 0, ageMax: 2, min: 86, max: 106, label: '0-2 anos' },
      { ageMin: 3, ageMax: 5, min: 89, max: 112, label: '3-5 anos' },
      { ageMin: 6, ageMax: 9, min: 97, max: 115, label: '6-9 anos' },
      { ageMin: 10, ageMax: 12, min: 102, max: 120, label: '10-12 anos' },
      { ageMin: 13, ageMax: 15, min: 110, max: 131, label: '13-15 anos' },
      { ageMin: 16, ageMax: 999, min: 90, max: 140, label: 'Adulto (>15 anos)' } // OK
    ],
    unit: 'mmHg',
    description: 'Pressão arterial sistólica'
  },

  /**
   * FREQUÊNCIA CARDÍACA (bpm)
   * Batimentos cardíacos por minuto
   * Valores normais em repouso
   */
  heartRate: {
    ranges: [
      { ageMin: 0, ageMax: 2, min: 98, max: 140, label: '0-2 anos' },
      { ageMin: 3, ageMax: 5, min: 80, max: 120, label: '3-5 anos' },
      { ageMin: 6, ageMax: 9, min: 75, max: 118, label: '6-9 anos' },
      { ageMin: 10, ageMax: 12, min: 70, max: 110, label: '10-12 anos' },
      { ageMin: 13, ageMax: 15, min: 65, max: 105, label: '13-15 anos' },
      { ageMin: 16, ageMax: 999, min: 60, max: 100, label: 'Adulto (>15 anos)' }
    ],
    unit: 'bpm',
    description: 'Frequência cardíaca',
    absoluteMax: 160 // Limite absoluto de segurança
  },

  /**
   * FREQUÊNCIA RESPIRATÓRIA (rpm)
   * Respirações por minuto
   * Valores normais em repouso
   */
  respiratoryRate: {
    ranges: [
      { ageMin: 0, ageMax: 2, min: 22, max: 37, label: '0-2 anos' },
      { ageMin: 3, ageMax: 5, min: 20, max: 28, label: '3-5 anos' },
      { ageMin: 6, ageMax: 9, min: 18, max: 25, label: '6-9 anos' },
      { ageMin: 10, ageMax: 12, min: 16, max: 23, label: '10-12 anos' },
      { ageMin: 13, ageMax: 15, min: 12, max: 20, label: '13-15 anos' },
      { ageMin: 16, ageMax: 999, min: 12, max: 20, label: 'Adulto (>15 anos)' }
    ],
    unit: 'rpm',
    description: 'Frequência respiratória'
  },

  /**
   * TEMPERATURA CORPORAL (°C)
   * Temperatura axilar normal
   * Não varia significativamente com idade
   */
  temperature: {
    ranges: [
      { ageMin: 0, ageMax: 999, min: 35.1, max: 37.7, label: 'Todas as idades' }
    ],
    unit: '°C',
    description: 'Temperatura corporal',
    classifications: {
      hipotermia: { max: 35.0, label: 'Hipotermia' },
      normal: { min: 35.1, max: 37.7, label: 'Normal' },
      febril: { min: 37.8, max: 38.9, label: 'Estado febril' },
      febre: { min: 39.0, max: 40.9, label: 'Febre' },
      hipertermia: { min: 41.0, label: 'Hipertermia' }
    }
  },

  /**
   * SATURAÇÃO DE OXIGÊNIO - SpO2 (%)
   * Porcentagem de hemoglobina saturada com oxigênio
   * Valores normais ao nível do mar
   */
  spO2: {
    ranges: [
      { ageMin: 0, ageMax: 999, min: 95, max: 100, label: 'Normal' }
    ],
    unit: '%',
    description: 'Saturação de oxigênio',
    alertLevels: {
      normal: { min: 95, max: 100, label: 'Normal' },
      mild: { min: 90, max: 94, label: 'Hipoxemia leve' },
      moderate: { min: 85, max: 89, label: 'Hipoxemia moderada' },
      severe: { max: 84, label: 'Hipoxemia grave' }
    }
  },

  /**
   * GLICEMIA CAPILAR - HGT (mg/dL)
   * Nível de glicose no sangue
   * Valores de referência em jejum
   */
  hgt: {
    ranges: [
      { ageMin: 0, ageMax: 999, min: 70, max: 100, label: 'Normal em jejum' }
    ],
    unit: 'mg/dL',
    description: 'Glicemia capilar (HGT)',
    classifications: {
      hipoglicemia: { max: 69, label: 'Hipoglicemia' },
      normal: { min: 70, max: 100, label: 'Normal' },
      alterada: { min: 101, max: 125, label: 'Glicemia alterada' },
      diabetes: { min: 126, label: 'Sugestivo de diabetes' }
    },
    safetyLimits: { min: 50, max: 250 } // Limites de segurança do formulário
  },

  /**
   * ESCALA DE COMA DE GLASGOW
   * Avaliação do nível de consciência
   * Pontuação: 3 (coma profundo) a 15 (consciente)
   */
  glasgow: {
    ranges: [
      { ageMin: 0, ageMax: 999, min: 3, max: 15, label: 'Escala padrão' }
    ],
    description: 'Escala de Coma de Glasgow',
    classifications: {
      grave: { min: 3, max: 8, label: 'Lesão grave' },
      moderada: { min: 9, max: 12, label: 'Lesão moderada' },
      leve: { min: 13, max: 15, label: 'Lesão leve/Normal' }
    },
    components: {
      eyeOpening: { min: 1, max: 4, label: 'Abertura ocular' },
      verbalResponse: { min: 1, max: 5, label: 'Resposta verbal' },
      motorResponse: { min: 1, max: 6, label: 'Resposta motora' }
    }
  },

  /**
   * ESCALA DE DOR
   * Avaliação subjetiva da intensidade da dor
   * Escala numérica: 0 (sem dor) a 10 (dor máxima)
   */
  pain: {
    ranges: [
      { ageMin: 0, ageMax: 999, min: 0, max: 10, label: 'Escala numérica' }
    ],
    description: 'Escala de dor',
    classifications: {
      semDor: { value: 0, label: 'Sem dor' },
      leve: { min: 1, max: 3, label: 'Dor leve' },
      moderada: { min: 4, max: 6, label: 'Dor moderada' },
      intensa: { min: 7, max: 9, label: 'Dor intensa' },
      maxima: { value: 10, label: 'Dor máxima' }
    }
  }
};

/**
 * Função auxiliar para obter range por idade
 * @param {string} vitalSign - Nome do sinal vital
 * @param {number} age - Idade do paciente
 * @returns {object|null} Range de valores normais
 */
export function getVitalRangeByAge(vitalSign, age) {
  const config = VITAL_SIGNS_CONFIG[vitalSign];
  if (!config || !age || age < 0) return null;

  const range = config.ranges.find(r => 
    age >= r.ageMin && age <= r.ageMax
  );

  return range ? {
    min: range.min,
    max: range.max,
    label: range.label,
    unit: config.unit
  } : null;
}

/**
 * Função para validar valor de sinal vital
 * @param {string} vitalSign - Nome do sinal vital
 * @param {number} value - Valor a ser validado
 * @param {number} age - Idade do paciente (opcional para alguns sinais)
 * @returns {object} Resultado da validação
 */
export function validateVitalSign(vitalSign, value, age = null) {
  const config = VITAL_SIGNS_CONFIG[vitalSign];
  if (!config) return { valid: false, message: 'Sinal vital não configurado' };

  // Para sinais que não dependem de idade
  if (!age && config.ranges.length === 1) {
    const range = config.ranges[0];
    const valid = value >= range.min && value <= range.max;
    return {
      valid,
      message: valid ? 'Valor normal' : `Valor fora do normal (${range.min}-${range.max} ${config.unit})`,
      range
    };
  }

  // Para sinais que dependem de idade
  if (age) {
    const range = getVitalRangeByAge(vitalSign, age);
    if (!range) return { valid: false, message: 'Idade fora do range configurado' };
    
    const valid = value >= range.min && value <= range.max;
    return {
      valid,
      message: valid ? 'Valor normal' : `Valor fora do normal para ${range.label} (${range.min}-${range.max} ${range.unit})`,
      range
    };
  }

  return { valid: false, message: 'Idade necessária para validação' };
}

/**
 * Exporta configuração para compatibilidade com código existente
 */
export default VITAL_SIGNS_CONFIG;