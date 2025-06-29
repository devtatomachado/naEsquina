function InputCadastro({ type, placeholder, register, name, icon, ...rest }) {
  return (
    <div className="mb-4">
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-xl text-gray-400">
          {icon}
        </span>
        <input
          type={type}
          placeholder={placeholder}
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
          {...register(name)}
          {...rest}
        />
      </div>
    </div>
  );
}
export default InputCadastro;
