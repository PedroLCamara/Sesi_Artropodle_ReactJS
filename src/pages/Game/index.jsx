import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom";
import file from '../../Assets/data.txt';
import left from '../../Assets/Icons/caret-left-solid.svg';
import right from '../../Assets/Icons/caret-right-solid.svg';

import okspider from '../../Assets/Icons/spider-solid 1.svg';
import spider from '../../Assets/Icons/spider-solid.svg';
import okshrimp from '../../Assets/Icons/shrimp-solid 1.svg';
import shrimp from '../../Assets/Icons/shrimp-solid.svg';
import okbugs from '../../Assets/Icons/bugs-solid 1.svg';
import bugs from '../../Assets/Icons/bugs-solid.svg';

export const Game = () => {
    const { idLevel } = useParams();
    const [lifes, setLifes] = useState(3);
    const [levelAnimal, setLevelAnimal] = useState({});
    const [endGameMsg, setEgMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    let history = useNavigate();

    const readLevelsData = () => {
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status == 0) {
                    var allText = rawFile.responseText;
                    var array = allText.split('\n');
                    console.log(array);
                    for (let index = 0; index < array.length; index++) {
                        const objAsArray = array[index].split(';');
                        const obj = {
                            id: objAsArray[0],
                            name: objAsArray[1],
                            hint: objAsArray[2],
                            group: objAsArray[3],
                            speech: objAsArray[4].split("\r")[0]
                        };
                        if (obj.id == idLevel) {
                            setLevelAnimal(obj);
                        }
                    }
                }
            }
        }
        rawFile.send(null);
    }

    const computeGuess = (e) => {
        e.preventDefault();
        const value = e.target.value;
        console.log(value);
        setIsLoading(true);
        if (lifes <= 0) {
            history('/')
        }
        else if (lifes == 1 && endGameMsg == "") {
            if (e.target.value !== levelAnimal.group) {
                setLifes(0);
                setEgMsg("Voc?? perdeu, que pena! A resposta correta ??: " + levelAnimal.group + " e o animal ?? " + levelAnimal.name)
            }
            else {
                setEgMsg("Voc?? ganhou, parab??ns! A resposta correta ??: " + levelAnimal.group + " e o animal ?? " + levelAnimal.name)
            }
        }
        else if (lifes == 2 && endGameMsg == "") {
            if (e.target.value !== levelAnimal.group) {
                setLifes(1);
            }
            else {
                setEgMsg("Voc?? ganhou, parab??ns! A resposta correta ??: " + levelAnimal.group + " e o animal ?? " + levelAnimal.name)
            }
        }
        else if (lifes == 3 && endGameMsg == "") {
            if (e.target.value !== levelAnimal.group) {
                const img = document.getElementById("level-img");
                img.style.filter = "unset";
                setLifes(2);
            }
            else {
                const img = document.getElementById("level-img");
                img.style.filter = "unset";
                setEgMsg("Voc?? ganhou, parab??ns! A resposta correta ??: " + levelAnimal.group + " e o animal ?? " + levelAnimal.name)
            }
        }
        else {
            history('/')
        }
        setIsLoading(false);
    }

    useEffect(() => {
        readLevelsData();
    }, [])

    return (
        <main className="container-grid">
            <section className="lifes">
                {
                    lifes >= 1 ?
                        <img src={okspider}></img>
                        :
                        <img src={spider}></img>
                }
                {
                    lifes >= 2 ?
                        <img src={okbugs}></img>
                        :
                        <img src={bugs}></img>
                }
                {
                    lifes >= 3 ?
                        <img src={okshrimp}></img>
                        :
                        <img src={shrimp}></img>
                }
            </section>
            <section className="game-text">
                <h1>{
                    endGameMsg !== "" ?
                        endGameMsg : "Qual o meu subgrupo?"
                }</h1>
                <span>{
                    levelAnimal !== {} &&
                        lifes == 2 ?
                        '"' + levelAnimal.speech + '"' :
                        lifes == 1 &&
                        levelAnimal.hint
                }</span>
            </section>
            <section className="animal-image">
                <div className="img-container">
                    {
                        levelAnimal !== {} &&
                        <img id="level-img" draggable={false} src={"/Images/" + levelAnimal.id + ".jpg"}></img>
                    }
                </div>
            </section>
            {
                !isLoading ?
                    <section className="game-btns">
                        <button onClick={(e) => computeGuess(e)} value={"Aracn??deos"}>Aracn??deos</button>
                        <button onClick={(e) => computeGuess(e)} value={"Insetos"}>Insetos</button>
                        <button onClick={(e) => computeGuess(e)} value={"Dipl??podes"}>Dipl??podes</button>
                        <button onClick={(e) => computeGuess(e)} value={"Crust??ceos"}>Crust??ceos</button>
                        <button onClick={(e) => computeGuess(e)} value={"Quil??podes"}>Quil??podes</button>
                    </section> :
                    <section className="game-btns">
                    <button disabled={true} onClick={(e) => computeGuess(e)} value={"Aracn??deos"}>Aracn??deos</button>
                    <button disabled={true} onClick={(e) => computeGuess(e)} value={"Insetos"}>Insetos</button>
                    <button disabled={true} onClick={(e) => computeGuess(e)} value={"Dipl??podes"}>Dipl??podes</button>
                    <button disabled={true} onClick={(e) => computeGuess(e)} value={"Crust??ceos"}>Crust??ceos</button>
                    <button disabled={true} onClick={(e) => computeGuess(e)} value={"Quil??podes"}>Quil??podes</button>
                </section>
                }
        </main>
    )
}

export default Game;