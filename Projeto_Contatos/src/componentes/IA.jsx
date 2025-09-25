import { useState } from "react";
import './IAstyle.css';

const IA = () => {
    const [prompt, setPrompt] = useState("");
    const [resposta, setResposta] = useState("");
    const [carregando, setCarregando] = useState(false);

     const SUPABASE_FUNCTION_NAME = 'generate_text';

    try {
        // Chamada Segura para a Edge Function
        const { data, error } = await supabase.functions.invoke(SUPABASE_FUNCTION_NAME, {
            method: 'POST',
            body: { 
                prompt: prompt // Enviando apenas o prompt
            },
        });

        if (error) {
            throw new Error(`Erro no Supabase: ${error.message}`);
        }

        // Recebe a resposta segura
        const conteudo = data?.generated_text || "Resposta não formatada da IA.";
        setResposta(conteudo);

    } catch (erro) {
        // Trata qualquer erro de rede ou do Supabase
        setResposta(`Erro na requisição: ${erro.message}`);
    }

    setCarregando(false);
}

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