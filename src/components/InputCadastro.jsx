function InputCadastro({ type, placeholder, register, name, icon: Icon, ...rest }) {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 border border-roxo/50 rounded-xl py-2 px-3">
        {Icon && <Icon className="text-roxo text-lg"/>}
        <input
          type={type}
          placeholder={placeholder}
           className="text-roxo placeholder:text-roxo outline-0"
          {...register(name)}
          {...rest}
        />
      </div>
    </div>
  );
}
export default InputCadastro;
