import styled, { keyframes } from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  z-index: 999;
`;

export const ModalContainer = styled.div`
  background: #ffffff;
  border-radius: 24px;
  max-width: 720px;
  width: 100%;
  max-height: 90vh;
  padding: 32px;
  box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
`;

export const Subtitle = styled.p`
  margin-top: 8px;
  font-size: 14px;
  color: #334155;
  max-width: 540px;
`;

export const CloseButton = styled.button`
  border: none;
  background: #eff1f5;
  color: #0f172a;
  font-size: 20px;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #dce1ec;
  }
`;

export const Content = styled.div`
  overflow-y: auto;
  padding-right: 8px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const SectionTitle = styled.p`
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #475569;
  margin: 0 0 8px 0;
`;

export const ClassificationCard = styled.div`
  background: #f8fafc;
  border-radius: 18px;
  padding: 20px;
  border: 1px solid
    ${(props) => (props.color ? `#${props.color.replace('#', '')}` : '#e2e8f0')};
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ClassificationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

export const ClassificationName = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
`;

export const ClassificationMeta = styled.span`
  font-size: 12px;
  color: #475569;
`;

export const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ItemRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid #e2e8f0;
`;

export const ItemTitle = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #0f172a;
`;

export const ItemDescription = styled.span`
  font-size: 13px;
  color: #475569;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const EmptyState = styled.p`
  text-align: center;
  color: #475569;
  font-size: 14px;
  margin: 60px 0;
`;

const pulse = keyframes`
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
`;

export const LoadingState = styled.p`
  text-align: center;
  color: #0f172a;
  font-weight: 600;
  font-size: 14px;
  margin: 60px 0;
  animation: ${pulse} 1.2s ease-in-out infinite;
`;
