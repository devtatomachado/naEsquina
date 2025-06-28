function InputLoja({icon: Icon, label, className = "", register, nome, ...rest }) {
    return (
        <div className={`w-full bg-bege flex items-center gap-2 md:px-3 md:py-3 px-2 py-0  rounded-lg border border-salmao text-roxo font-medium ${className}`}>
            {Icon && <Icon className="text-[3rem] md:text-xl w-4 flex-shrink-0"/>}
            <label htmlFor={nome} className="sr-only">{label}</label>
            <input
                id={nome}
                {...register(nome)}
                placeholder={label}
                className="w-full text-sm md:text-base outline-0"
                {...rest}
            />
        </div>
    )
}

export default InputLoja;