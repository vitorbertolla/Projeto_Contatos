import { useState } from "react";
import './IAstyle.css';

const IA = () => {
    const [prompt, setPrompt] = useState("");
    const [resposta, setResposta] = useState("");
    const [carregando, setCarregando] = useState(false);

 const enviarPrompt = async () => {
    setCarregando(true);
    setResposta("");

    const apikey = import.meta.env.VITE_HF_KEY;
    
    // NOVO ENDPOINT PADRÃO DE INFERÊNCIA
    const INFERENCE_URL = "https://api-inference.huggingface.co/models/";
    
    // Modelo Gemma (Instruction-Tuned)
    const MODEL_NAME = "google/gemma-2-2b-it";
    
    // Formato de Prompt Específico do Gemma
    const formattedPrompt = `<start_of_turn>user\n${prompt}<end_of_turn><start_of_turn>model\n`;

    try {
        const respostaAPI = await fetch(
            // Use o endpoint padrão, passando o MODEL_NAME na URL
            `${INFERENCE_URL}${MODEL_NAME}`, 
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${apikey}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    inputs: formattedPrompt, 
                    parameters: {
                        max_new_tokens: 150,
                        temperature: 0.7,
                        return_full_text: false 
                    }
                }),
            }
        );

        // Se o status NÃO for 200 OK, leia a resposta de erro da API
        if (!respostaAPI.ok) {
             const errorData = await respostaAPI.json();
             // Mostra o erro exato que o servidor do Hugging Face devolveu
             throw new Error(`Erro ${respostaAPI.status}: ${errorData.error || 'Falha desconhecida.'}`);
        }

        const dados = await respostaAPI.json();
        console.log("Resposta da API:", dados);

        const conteudo = dados?.[0]?.generated_text?.trim() || "Erro: Não foi possível obter o texto gerado.";
        setResposta(conteudo);

    } catch (erro) {
        // Agora você verá a mensagem de erro detalhada da API do Hugging Face
        setResposta(`Erro na requisição: ${erro.message}`);
    }

    setCarregando(false);
};

    return (
        <div className="ia-container">
            <h1 className="ia-title">Solicite uma mensagem personalizada com IA (Gemma)</h1>
            <div className="ia-texto-botao">
                <input
                    type="text"
                    placeholder="Digite sua solicitação:"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="ia-input"
                />
                <button
                    disabled={!prompt || carregando}
                    onClick={enviarPrompt}
                    className="ia-button"
                >
                    {carregando ? "Enviando..." : "Gerar com IA"}
                </button>
            </div>
            {resposta && (
                <div className="ia-resposta">
                    <p>{resposta}</p>
                </div>
            )}
        </div>
    );
};

export default IA;