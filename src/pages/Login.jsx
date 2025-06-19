function Login() {
    return (



  <div className="bg-[url('/bg_Login.png')] bg-cover bg-center bg-fixed min-h-screen flex items-center justify-center">
    
     <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-xl max-w-sm w-11/12 mx-auto my-8">
                
                <div className="text-center mb-6">
                    <img src='/logoNaesquina.svg' alt=""  className="mx-auto h-20 mb-4"/>
                </div>
                     <h1 className="text-xl font-semibold mb-4 text-center text-roxo">Seja bem-vindo(a)!</h1>

                    <p className="text-sm text-gray-600 mb-6 text-center">Faça login e continue a sua jornada para encontrar produtos incríveis ou para crescer seu negócio local.</p>
                <form action="">

                    <div className="mb-4">
                        <label htmlFor="email" className="sr-only text-roxo">E-mail</label>
                        <div className="relative">
                             <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                
                                <img
                                    src="/BsEnvelope.svg"
                                    alt="Ícone de E-mail"
                                    className="h-5 w-5 text-gray-400" 
                                />
                            </span>
                            
                            <input type="email" id="email" name="email" placeholder="E-mail"
                                   className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"/>
                        </div>
                        </div>

                        <div className="mb-6">
                        <label htmlFor="password" className="sr-only text-roxo">Senha</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                
                                <img
                                    src="/BiLockAlt.svg"
                                    alt="Ícone de E-mail"
                                    className="h-5 w-5 text-gray-400" 
                                />
                            </span>
                            <input type="password" id="password" name="password" placeholder="Senha"
                                   className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"/>
                            
                        </div>
                        <a href="#" className="text-sm text-black underline hover:underline mt-2 block text-center">Esqueceu a senha?</a>
                    </div>
                </form>

                        <button className="w-full bg-roxo hover:bg-roxo text-white font-bold py-3 rounded-xl transition duration-200 ease-in-out mb-4">
                    Entrar
                </button>

                <div className="relative flex items-center py-5">
                    <div className="flex-grow border-t border-roxo"></div>
                    
                    <div className="flex-grow border-t border-roxo"></div>
                </div>

                <button className="w-full bg-transparent border border-roxo text-roxo hover:bg-opacity-20 hover:border-black font-bold py-3 rounded-xl">
                    Cadastre-se
                </button>




    </div>
  </div>
);
}
  export default Login;