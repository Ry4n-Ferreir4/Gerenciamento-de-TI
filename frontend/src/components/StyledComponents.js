import styled, { keyframes }from 'styled-components';

export const Container = styled.div`
    padding: 20px;
    max-width: 600px;
    margin: 0 auto;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const Input = styled.input`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

export const Button = styled.button`
    padding: 10px;
    border: none;
    background-color: #007bff;
    color: white;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

export const Select = styled.select`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const bounce = keyframes`
    0%, 100% { transform: scale(0); }
    50% { transform: scale(1); }
`;

export const LoaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: rgba(255, 255, 255, 0.8); // Cor de fundo opcional
`;

export const Loader = styled.div`
    display: flex;
    gap: 10px;
`;

export const Dot = styled.div`
    width: 12px;
    height: 12px;
    background-color: #007bff;
    border-radius: 50%;
    animation: ${bounce} 1.5s infinite ease-in-out;
    animation-delay: ${props => props.delay};
`;


export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
`;

export const TableRow = styled.tr`
    border-bottom: 1px solid #ddd;
`;

export const TableData = styled.td`
    padding: 10px;
    text-align: left;
`;