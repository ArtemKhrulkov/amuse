import styled from 'styled-components';

export const SHome = styled.div`
  display: flex;
  flex-direction: column;

  .map-container {
    width: 120rem;
    height: 800px;
  }

  .sidebar {
    background-color: rgba(35, 55, 75, 0.9);
    color: #fff;
    padding: 6px 12px;
    font-family: monospace;
    z-index: 1;
    position: absolute;
    top: 0;
    right: 0;
    margin: 12px;
    border-radius: 4px;
  }
`;
