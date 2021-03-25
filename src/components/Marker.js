import styled from 'styled-components';

const colors = {
  orange: {
    background: '#ff7e23e0',
    shadow: '#ffa769',
  },
  blue: {
    background: '#237bffe0',
    shadow: '#698bff',
  }
}

const Marker = styled.div`
  background-color: ${({ color }) => colors[color].background};
  border-radius: 50%;
  width: 30px;
  height: 30px;
  box-shadow: 0px 0px 5px ${({ color }) => colors[color].shadow};
  opacity: 0.7;
  transition:all .2s ease;
  &:hover {
    opacity:1;
    transform:scale(1.05)
  }
`;

export default Marker;