import styled from 'styled-components';

export const Container = styled.div`
  max-width: 513px;
  min-width: 513px;
  margin-top: 35px;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
`;

export const Title = styled.p`
  font-weight: 700;
  font-size: 12px;
  line-height: 12px;
  color: black;
`;

export const ResultContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !['switchState', 'priority', 'colorHex'].includes(prop),
})`
  margin-top: 30px;
  flex-direction: column;
  justify-content: flex-start;
  text-align: start;
  display: flex;
  gap: 11px;
  padding: 23px;
  background-color: ${(props) => {
    // Use color from database if available
    if (props.colorHex) {
      return `#${props.colorHex}`;
    }
    
    // Apply Manchester Protocol colors based on priority
    const colorMap = {
      1: '#FF7D7D', // Vermelho claro - Emergência
      2: '#FFA366', // Laranja claro - Muito urgente
      3: '#FFFF9E', // Amarelo claro - Urgente
      4: '#9DFF9D', // Verde claro - Pouco urgente
      5: '#8DC0E1'  // Azul claro - Não urgente
    };
    
    // If switchState is VULNERABILIDADE and priority is 5 (blue), promote to 4 (green)
    let effectivePriority = props.priority;
    if (props.switchState === 'VULNERABILIDADE' && props.priority === 5) {
      effectivePriority = 4;
    }
    
    return colorMap[effectivePriority] || '#E0E0E0';
  }};
  border: 1px solid ${(props) => {
    // Darker border based on priority
    const borderMap = {
      1: '#CC0000', // Vermelho escuro
      2: '#E06000', // Laranja escuro  
      3: '#CCA000', // Amarelo escuro
      4: '#00A000', // Verde escuro
      5: '#0080B0'  // Azul escuro
    };
    
    let effectivePriority = props.priority;
    if (props.switchState === 'VULNERABILIDADE' && props.priority === 5) {
      effectivePriority = 4;
    }
    
    return borderMap[effectivePriority] || '#999999';
  }};
  border-radius: 24px;
  margin-bottom: 16px;
`;

export const ResultTitle = styled.p`
  font-size: 12px;
  line-height: 12px;
  font-weight: 700;
  color: #000000;
  flex: 1;
`;

export const ResultMessage = styled.p`
  color: #000000;
  line-height: 14px;
  font-size: 11px;
  margin-top: 8px;
`;

export const CopyResult = styled.button`
  background-color: #2578fa;
  color: white;
  border: none;
  border-radius: 8px;
  max-width: 200px;
  padding: 8px 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 12px;

  &:hover {
    background-color: #1354d8;
  }
`;

export const CopyMessage = styled.p.withConfig({
  shouldForwardProp: (prop) => !['active'].includes(prop),
})`
  opacity: ${(props) => (props.active ? '1' : '0')};
  transition: opacity 0.2s;
  color: #2578fa;
  margin-top: 6px;
  font-size: 12px;
  text-align: center;
`;

export const MoreResults = styled.div`
  margin-top: 16px;
  font-weight: bold;
  color: #000000;
  font-size: 12px;
  cursor: pointer;
`;

export const ClassificationBadge = styled.div.withConfig({
  shouldForwardProp: (prop) => !['priority', 'colorHex'].includes(prop),
})`
  padding: 4px 12px;
  border-radius: 12px;
  background-color: ${(props) => {
    // Use darker version of priority color for badge
    if (props.colorHex) {
      return `#${props.colorHex}`;
    }
    
    const colorMap = {
      1: '#D40000', // Vermelho - Emergência
      2: '#FF7700', // Laranja - Muito urgente  
      3: '#FFB300', // Amarelo - Urgente
      4: '#00C851', // Verde - Pouco urgente
      5: '#0099CC'  // Azul - Não urgente
    };
    
    return colorMap[props.priority] || '#808080';
  }};
  color: ${(props) => {
    // White text for dark backgrounds (priority 1-2), black for light backgrounds
    return props.priority <= 2 ? '#FFFFFF' : '#000000';
  }};
  display: inline-flex;
  align-items: center;
  font-size: 10px;
  font-weight: bold;
  text-transform: uppercase;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export const PriorityLabel = styled.span`
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.5px;
`;

export const ClassificationInfo = styled.div`
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  gap: 6px;
  
  span {
    font-size: 10px;
    color: #333333;
    
    strong {
      font-weight: 700;
      color: #000000;
    }
  }
`;