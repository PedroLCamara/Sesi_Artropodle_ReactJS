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