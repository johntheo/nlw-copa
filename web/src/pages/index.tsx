interface HomeProps {
  poolCount: number;
  guessCount: number;
  userCount: number;
}

import Image from "next/image";
import appPreviewImg from "../assets/app-nlw-copa-preview.png";
import logoImg from "../assets/logo.svg";
import usersAvatarExampleImg from "../assets/users-avatar-example.png";
import iconCheckImg from "../assets/icon-check.svg";
import { api } from "../lib/axios";
import { FormEvent, useState } from "react";

export default function Home(props: HomeProps) {
  const [poolTitle, setPoolTitle] = useState('')

  async function createPool(event: FormEvent) {
    event.preventDefault(); //avoid page refresh
    try{
      const response = await api.post('/pools', {
        title: poolTitle
      })

      const {code} = response.data

      await navigator.clipboard.writeText(code);

      setPoolTitle('');
      alert('Bolão criado com sucesso. O código foi copiado para a área de transfrência!');

    }catch(err) {
      console.log(err)
      alert('Falha ao criar o bolão. Tente novamente!')
    }
    
  }

  // return <h1 className="text-violet-500 font-bold text-xl">Contagem: {props.count} </h1>;
  return (
    <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center">
      <main>
        <Image src={logoImg} alt="NLW Copa" />
        <h1 className="mt-14 text-white text-5xl font-bold leading-tight">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className="mt-10 flex items-center gap-2">
          <Image src={usersAvatarExampleImg} alt="" />
          <strong className="text-gray-100 text-lg">
            <span className="text-ignite-500">+{props.userCount}</span> pessoas já estão
            usando
          </strong>
        </div>

        <form onSubmit={createPool} className="mt-10 flex gap-2">
          <input
            className="flex-1 px-6 py-4 rounded bg-gray-800 border-gray-600 text-sm text-gray-100"
            type="text"
            required
            placeholder="Qual o nome do seu bolão?"
            onChange={event => setPoolTitle(event.target.value)}
            value={poolTitle}
          />
          <button className="px-6 py-4 rounded bg-yellow-500 text-gray-900 font-bold text-sm uppercase hover:bg-yellow-700" type="submit">
            Criar meu bolão
          </button>
        </form>

        <p className="text-gray-300 mt-4 text-sm leading-relaxed">
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas 🚀
        </p>

        <div className="mt-10 pt-10 border-t border-gray-600 flex justify-between text-gray-100">
          <div className="flex flex-items-center gap-6">
            <Image src={iconCheckImg} alt=""></Image>
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{props.poolCount}</span>
              <span>Bolões criados</span>
            </div>
          </div>

          <div className="w-px h-16 bg-gray-600" />
          
          <div className="flex flex-items-center gap-6">
            <Image src={iconCheckImg} alt=""></Image>
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{props.guessCount}</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>

      <Image
        src={appPreviewImg}
        alt="Dois celulares exibindo uma prévia de aplicação móvel do NLW Copa"
        quality={100}
      />
    </div>
  );
}

//This code is ran in the WebServer so this isnt affected when a crwaler or Google access the page with "Debuger > Javascript Disable".
//This is SSR. The application will be indexed
//TODO: change to getStaticProps do next
export const getServerSideProps = async () => {

  const [poolCountResponse,guessCountResponse,userCountResponse] = await Promise.all([
    api.get('pools/count'),
    api.get('guesses/count'),
    api.get('users/count')
  ])
  

  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      userCount: userCountResponse.data.count,
    },
  };
};