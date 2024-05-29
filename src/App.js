import { registerProduct, transferProduct, getProductHistory } from './MetaMaskService';
import { useState } from 'react';
import "./styles.css";

function App() {
    const [productId, setProductId] = useState("");
    const [productDetails, setProductDetails] = useState("");
    const [newOwner, setNewOwner] = useState("");
    const [history, setHistory] = useState([]);
    const [message, setMessage] = useState("");

    const handleRegisterProduct = async () => {
        try {
            await registerProduct(productId, productDetails);
            setMessage("Produto registrado com sucesso!");
        } catch (err) {
            setMessage(`Erro: ${err.message}`);
        }
    };

    const handleTransferProduct = async () => {
        try {
            await transferProduct(productId, newOwner);
            setMessage("Produto transferido com sucesso!");
        } catch (err) {
            setMessage(`Erro: ${err.message}`);
        }
    };

    const handleGetProductHistory = async () => {
        try {
            const history = await getProductHistory(productId);
            setHistory(history);
        } catch (err) {
            setMessage(`Erro: ${err.message}`);
        }
    };

    return (
        <div>
            <h1>Gestão da Cadeia de Suprimentos</h1>

            <div>
                <h2>Registrar Produto</h2>
                ID do Produto: <input type="text" value={productId} onChange={(e) => setProductId(e.target.value)} />
                Detalhes: <input type="text" value={productDetails} onChange={(e) => setProductDetails(e.target.value)} />
                <button onClick={handleRegisterProduct}>Registrar Produto</button>
            </div>

            <div>
                <h2>Transferir Produto</h2>
                ID do Produto: <input type="text" value={productId} onChange={(e) => setProductId(e.target.value)} />
                Novo Endereço do Proprietário: <input type="text" value={newOwner} onChange={(e) => setNewOwner(e.target.value)} />
                <button onClick={handleTransferProduct}>Transferir Produto</button>
            </div>

            <div>
                <h2>Obter Histórico do Produto</h2>
                ID do Produto: <input type="text" value={productId} onChange={(e) => setProductId(e.target.value)} />
                <button onClick={handleGetProductHistory}>Obter Histórico</button>
                <ul>
                    {history.map((entry, index) => <li key={index}>{entry}</li>)}
                </ul>
            </div>

            <div>
                <h2>Mensagem</h2>
                <p>{message}</p>
            </div>
        </div>
    );
}

export default App;
