import { useState, useEffect } from "react";
import file from  '../../Assets/data.txt';
import left from '../../Assets/Icons/caret-left-solid.svg';
import right from '../../Assets/Icons/caret-right-solid.svg';
import { Link, useNavigate } from 'react-router-dom';

export const Home = () => {
    const [levels, setLevels] = useState([]);
    const [page, setPage] = useState(0);
    const textModal = [
        'Bem vindo ao artropodle.ooo, o seu objetivo é adivinhar a qual grupo de artrópode o animal pertence. Antes de começar, vamos entender um pouco mais sobre esse filo!',
        'Os artrópodes, num geral, não possuem crânio ou coluna vertebral (invertebrados), possuem simetria bilateral (lado esquerdo e direito idênticos), são triblásticos: apresentam três folhetos embrionários (endoderme, mesoderme eectoderme) cada um com funções diferentes...',
        'São celomados: apresentam celoma, uma cavidade corporal (onde são abrigados os órgãos internos) revestida por tecido derivado da mesoderme, são protostômios: o blastóporo origina a boca (anûs e boca vêm da mesma formação, mas no fim ocupam lugares diferentes/opostos)',
        'Apresentam corpo segmentado com apêndices articulados (corpo é dividido em diversas partes especializadas em funções diferentes, como: locomoção, alimentação, defesa, percepção sensorial e reprodução.)',
        'O corpo deles é revestido por um esqueleto externo formado por quitina (polissacarídeo com função semelhante à queratina (proteger a pele), mas queratina=proteína e quitina=carboidrato). O exoesqueleto não se desenvolve junto dos artrópodes, então para garantir seu crescimento, o animal deve trocar seu exoesqueleto e produzir um maior. Esse processo leva a um grande gasto de energia e deixa o animal vulnerável até o endurecimento completo do novo esqueleto externo. (Processo da muda)',
        'Falando de sua fisiologia, apresentam digestão extracelular e um sistema digestório completo. A circulação é aberta, portanto a hemolinfa (fluido corporal que circula pelo corpo do animal = sangue) não corre exclusivamente no interior de vasos, sendo lançado em lacunas que circundam os tecidos e órgãos do animal. (Nessas lacunas o sangue encontra-se diretamente com as células, realiza as trocas de substâncias e retorna ao coração.)',
        'Respiração: varia de uma espécie para outra, uma vez que observamos a presença desses animais em diferentes locais. Dentre as estruturas especializadas nas trocas gasosas, podemos destacar: brânquias — ocorrem em espécies aquáticas, pulmões foliáceos (formados por lâminas e tecidos dos animais) — podem ser observados em aracnídeos e sistemas traqueais — encontrados na maioria dos insetos.',
        'Sistema excretor: também variam entre os tipos de artropodes: túbulos de Malpighi (estruturas que se encontram associadas ao intestino), glândulas antenais (poros excretores que liberam resíduos na base das antenas) e glândulas coxais (poros excretores que se abrem nas coxas)',
        'Sistema nervoso dos artrópodes é constituído por um cérebro anterior dorsal, o qual é seguido de um cordão nervoso ventral que apresenta inchaços ganglionares nos segmentos. Os artrópodes',
        'Agora falando sobre os subgrupos de artrópodes, eles se dividem em cinco...',
        'Os insetos, cujas principais características são um corpo dividido em cabeça, tórax e abdome, um par de antenas e três pares de asas. Em algumas espécies, observa-se a presença de asas, as quais podem ser encontradas em um ou dois pares. Também apresentam peças bucais adaptadas aos diferentes tipos de alimentação que possuem, sendo possível distinguir, por exemplo, aparelhos bucais sugadores, mastigadores e lambedores.',
        'Muitos insetos apresentam metamorfose durante o seu desenvolvimento, possuindo, portanto, desenvolvimento indireto. A metamorfose pode ser completa ou incompleta. Na metamorfose incompleta, o indivíduo jovem possui aparência que lembra o adulto, porém é menor e imaturo sexualmente. Já os que apresentam metamorfose completa possuem estágios larvais bem diferentes do estágio adulto. Vale salientar também que algumas espécies não realizam metamorfose.',
        'Os aracnídeos, cujas principais características são um corpo dividido em cefalotórax e abdome e não apresentam antenas. Possuem: quatro pares de patas, um par de quelíceras (são apêndices (parte saliente do corpo de um animal, usada em diversas funções como locomoção e alimentação.) com função de injetar veneno (se animal venenoso), manipular o alimento e carregar os ovos), um par de pedipalpos (são apêndices parecidos com as patas usados para segurar as presas e também para o parceiro no momento da cópula).',
        'Os crustáceos, cujas principais características são um corpo dividido em cefalotórax e abdome, dois pares de antenas (são o único grupo que possuem dois pares de antenas) e número de patas variável. Possuem três ou mais pares de apêndices modificados como peças bucais. Além disso, possuem um exoesqueleto mais resistente em relação aos demais',
        'Os quilópodes, cujas principais características são um corpo dividido em cabeça e tronco, bem como um par de antenas e um par de patas por segmento. Vivem no ambiente terrestre, são carnívoros e possuem apêndices que injetam veneno e que auxiliam na captura da presa.',
        'Os diplópodes, cujas principais características são um corpo dividio em corpo alongado e um par de antenas. Alguns autores dividem seu corpo em cabeça e tronco, enquanto outros dividem em cabeça, tórax e abdome. São animais terrestres e se alimentam de vegetais.',
        'Agora que você já sabe as diferenças entre as diferentes classes de artrópodes, eu te desafio a se aventurar pelo atropodle.ooo!'
    ];

    const imgsModal = [
        [
        ],
        [
            "https://1.bp.blogspot.com/-ez80vTjSYD0/X9kKjyO3zKI/AAAAAAAAUP4/gO757aUChdMo_iIF0HejCATaiobym8CEACNcBGAsYHQ/s700/vertebrados-invertebrados-caracteristicas-exemplos.png",
            "https://slideplayer.com.br/slide/2839073/10/images/12/Simetria+Bilateral+1+Plano+de+corte.jpg",
            "https://pt-static.z-dn.net/files/d33/5533a2277d28b305917755a2fbf9a402.png"
        ],
        [
            "https://www.infoescola.com/wp-content/uploads/2010/03/folhetos-embrionarios.jpg",
            "https://www.estudopratico.com.br/wp-content/uploads/2015/01/protostomios-blastoporo-e-principais-caracteristicas-1200x675.jpg"
        ],
        [
            "https://www.infoescola.com/wp-content/uploads/2008/04/escorpiao.jpg",
        ],
        [
            "https://i0.wp.com/files.agro20.com.br/uploads/2019/11/Quitina-1.jpg?fit=1024%2C768&ssl=1",
            "https://static.mundoeducacao.uol.com.br/mundoeducacao/2020/11/muda.jpg"
        ],
        [
            "https://docplayer.com.br/docs-images/94/120746427/images/28-0.jpg"
        ],
        [
            "https://escolaeducacao.com.br/wp-content/uploads/2020/02/filotraqueia.jpg",
            "https://escolaeducacao.com.br/wp-content/uploads/2020/02/respiracaotraqueal.jpg"
        ],
        [
            "https://slideplayer.com.br/slide/3277203/11/images/22/Excre%C3%A7%C3%A3o+T%C3%BAbulos+de+Malpighi.jpg",
            "https://4.bp.blogspot.com/-8P8Ol0jnuiM/XN657kE0EcI/AAAAAAAAHFU/__N48JFnw3MFIXQA-psqVK--M98Ak_VVgCLcBGAs/s1600/gl%2Bverde.jpg"
        ],
        [
            "https://blog.aegro.com.br/wp-content/uploads/2021/02/2-mecanismo-de-acao-dos-inseticidas-neonicotinoides.jpg"
        ],
        [
        ],
        [
            "https://static.todamateria.com.br/upload/an/at/anatomiacorporalinseto-1.jpg"
        ],
        [
            "https://super.abril.com.br/wp-content/uploads/2018/07/como-a-lagarta-se-transforma-em-borboleta.jpg"
        ],
        [
            "https://blogdoenem.com.br/wp-content/uploads//sites/2/2014/03/aracnideos.png"
        ],
        [
            "https://image.slidesharecdn.com/filoartrpodes04-crustceos-caractersticaseanatomia-140515180206-phpapp01/85/filo-artrpodes-04-crustceos-caractersticas-e-anatomia-14-320.jpg?cb=1400177762"
        ],
        [
            "https://www.mundoecologia.com.br/wp-content/gallery/quilopodes-1/Quil%C3%B3podes-2-1.jpg"
        ],
        [
            "https://image.slidesharecdn.com/artrpodes-oficial-140316093655-phpapp01/85/artrpodes-oficial-16-320.jpg?cb=1394963643"
        ]
    ]
    const readLevelsData = () => {
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function ()
        {
            if(rawFile.readyState === 4)
            {
                if(rawFile.status === 200 || rawFile.status == 0)
                {
                    var allText = rawFile.responseText;
                    var array = allText.split('\n');
                    console.log(array);
                    var objArray = [];
                    for (let index = 0; index < array.length; index++) {
                        const objAsArray = array[index].split(';');
                        const obj = {
                            id: objAsArray[0],
                            name: objAsArray[1],
                            hint: objAsArray[2],
                            group: objAsArray[3],
                            speech: objAsArray[4].split("\r")[0]
                        };

                        objArray.push(obj)
                    }
                    setLevels(objArray);
                }
            }
        }
        rawFile.send(null);
    }

    const openModal = (e) => {
        e.preventDefault();
        const modal = document.getElementById("infos-modal");
        modal.style.visibility = "unset";
        modal.style.opacity = "1";
    }

    const closeModal = () => {
        const modal = document.getElementById("infos-modal");
        modal.style.visibility = "hidden";
        modal.style.opacity = "0";
        setPage(0);
    }

    const nextPage = (e) => {
        e.preventDefault();
        if (page >= textModal.length - 1) {
            closeModal();
        }
        else{
            let tempPage = page + 1;
            setPage(tempPage);
        }
    }

    const previousPage = (e) => {
        e.preventDefault();
        if (page <= 0) {
            
        }
        else{
            let tempPage = page - 1;
            setPage(tempPage);
        }
    }

    useEffect(() => {
        readLevelsData();
    }, [])

    return(
        <main className="container-grid">
            <button onClick={(e) => openModal(e)} className="question-circle">
                <span>?</span>
            </button>
            <div className="infos-modal-bg" id="infos-modal">
                <button onClick={(e) => previousPage(e)} className="arrow-left arrow"><img src={left}></img></button>
                <div className="infos-modal-box">
                    <span>{
                            textModal[page]
                        }</span>
                    <div className="images">
                        {
                            imgsModal[page] !== undefined &&
                            imgsModal[page].map((imageSrc) => {
                                if(imageSrc !== null)
                                    return <img src={imageSrc}></img>
                            })
                        }
                    </div>
                </div>
                <button onClick={(e) => nextPage(e)} className="arrow-right arrow"><img src={right}></img></button>
            </div>
            <section className="title-container">
                <h1>Artropodle.ooo</h1>
            </section>
            <section className="level-container">
                {
                    levels !== [] &&
                    levels.map((level) => {
                        return(
                            <Link to={"/level/" + level.id} className="level-box">
                                <span>
                                    {level.id}
                                </span>
                            </Link>
                        )
                    })
                }
            </section>
        </main>
    )
}

export default Home;