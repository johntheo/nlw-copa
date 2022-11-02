interface HomeProps {
  count: number;
}

import Image from "next/image";
import appPreviewImg from "../assets/app-nlw-copa-preview.png";
import logoImg from '../assets/logo.svg'
import usersAvatarExampleImg from '../assets/users-avatar-example.png'
import iconCheckImg from '../assets/icon-check.svg'

export default function Home() {
  // return <h1 className="text-violet-500 font-bold text-xl">Contagem: {props.count} </h1>;
  return (
    <div>
      <main>
        <Image src={logoImg} alt="NLW Copa" />
        <h1>Crie seu próprio bolão da copa e compartilhe entre amigos!</h1>

        <div>
          <Image src={usersAvatarExampleImg} alt="" />
          <strong>
            <span>+12.592</span> pessoas já estão usando
          </strong>
        </div>

        <form>
          <input type="text" required placeholder="Qual o nome do seu bolão?" />
          <button type="submit">Criar meu bolão</button>
        </form>

        <div>
          <div>
            <Image src={iconCheckImg} alt=""></Image>
            <div>
              <span>+2.034</span>
              <span>Bolões criados</span>
            </div>
          </div>
          <div>
            <Image src={iconCheckImg} alt=""></Image>
            <div>
              <span>+192.847</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>

      <p>Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀</p>
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
// export const getServerSideProps = async () => {
//   const response = await fetch("http://localhost:3333/pools/count");
//   const data = await response.json();
//   console.log(data);

//   return {
//     props: {
//       count: data.count,
//     },
//   };
// };
