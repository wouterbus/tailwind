import Hero from "@/components/Hero/Hero";
import "/styles/quem-somos.css"

export default function Portfolio() {
  return (
    <main>
      <Hero
  logoSrc="public/logo-horizontal.svg"
  imageSrc="/quems-somos.png"
  title={
    <>
    <div className="title-container">
    <h1 className="uppercase">Quem<br></br><span className="font-larken uppercase">Somos</span></h1>
    </div>
    <div
  className="arrow-down z-60 absolute bottom-[20px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-bounce"
  onClick={() => {
    document.getElementById("arrow-target")?.scrollIntoView({ behavior: "smooth" });
  }}
>
    <img src="/arrow-down.svg" width={60} alt="Scroll down" />
    </div>
    </>
  }
/>
<>
<div id="arrow-target" className="content-wrapper arrow-target">
<div className="intro-text">
  <h1>The<br></br><span>Squad</span></h1>
  <p>Forasteira é liderada pelo duo Leticia Arpa e Lua Hora, cada um com mais de 10 anos de experiência no audiovisual, em projetos nacionais e internacionais.
  <br></br><br></br>
Criatividade, ousadia e velocidade definem seu estilo de produção, prezando por uma comunicação eficiente e marcante.</p>
<img src="let-arpa.png" alt="" />
<h2>Leticia <span>Arpa</span></h2>
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi odio aspernatur sint non facere. Facere obcaecati provident nesciunt earum explicabo. Neque possimus esse ab dignissimos iste cum vitae impedit facilis?
<br></br><br></br>
Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi odio aspernatur sint non facere. Facere obcaecati provident nesciunt earum explicabo. Neque possimus esse ab dignissimos iste cum vitae impedit facilis?
<br></br><br></br>
Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi odio aspernatur sint non facere. </p>
</div>
<div className="intro-text">
<img src="lua-hora.png" alt="" />
<h2>Leticia <span>Arpa</span></h2>
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi odio aspernatur sint non facere. Facere obcaecati provident nesciunt earum explicabo. Neque possimus esse ab dignissimos iste cum vitae impedit facilis?
<br></br><br></br>
Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi odio aspernatur sint non facere. Facere obcaecati provident nesciunt earum explicabo. Neque possimus esse ab dignissimos iste cum vitae impedit facilis?
<br></br><br></br>
Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi odio aspernatur sint non facere. </p>
</div>
</div>
</>
<>
<section>

</section>
</>
    </main>
  );
}