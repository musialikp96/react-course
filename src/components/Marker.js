import styled from 'styled-components';

const colors = {
  DEFAULT: {
    background: '#ff7e23e0',
    shadow: '#ffa769',
  },
  READ: {
    background: '#237bffe0',
    shadow: '#698bff',
  },
  VISITED: {
    background: '#aaa',
    shadow: '#222',
  }
}

const Marker = styled.div`
  background-color: ${({ state }) => colors[state].background};
  border-radius: 50%;
  width: 30px;
  height: 30px;
  box-shadow: 0px 0px 5px ${({ state }) => colors[state].shadow};
  opacity: 0.7;
  transition:all .2s ease;
  &:hover {
    opacity:1;
    transform:scale(1.05)
  }
`;

export default Marker;