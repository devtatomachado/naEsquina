import React from 'react';

function Botao({ text, onSubmit }) {
    return (
        <button
            type="submit"
            onSubmit={onSubmit}
            className='bg-roxo hover:bg-roxo/80 border-2 border-branco text-branco text-xl font-semibold py-2 px-12 rounded-xl cursor-pointer duration-300 ease-in-out'
        >
            {text}
        </button>
    );
}

export default Botao;