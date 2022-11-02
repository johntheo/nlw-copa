interface HomeProps{
  count: number;
}

export default function Home(props: HomeProps) {
  return <h1 className="text-violet-500 font-bold text-xl">Contagem: {props.count} </h1>;
}

//This code is ran in the WebServer so this isnt affected when a crwaler or Google access the page with "Debuger > Javascript Disable".
//This is SSR. The application will be indexed
export const getServerSideProps = async () => {
  const response = await fetch("http://localhost:3333/pools/count");
  const data = await response.json();
  console.log(data);

  return {
    props: {
      count: data.count,
    },
  };
};
