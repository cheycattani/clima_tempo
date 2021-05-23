import React, {useState, useEffect} from 'react';
import '../styles/Home.css';
import lupa from '../imagem/lupa.png';
import axios from 'axios';

function Home(){

    var [pais, setPais] = useState();
    var [temp, setTemp] = useState();
    var [umidade, setUmidade] = useState();
    var [clima, setClima] = useState();
    var [top, setTop] = useState([]);
    var [busca, setBusca] = useState([]);

    useEffect(() => {
       updateTop()
    }, []);

    useEffect(() => {
        updateBusca()
    }, []);

    function updateTop(){
        axios.get('http://localhost:1000/top').then(res => {
            setTop(res.data[0])
        })
    }

    function updateBusca(){
        axios.get('http://localhost:1000/busca').then(res => {
            setBusca(res.data[0])
        })
    }

    function Pesquisa(){
        const dados = document.getElementById('txtBusca').value;
       
        axios.post('http://localhost:1000/create', {cidade:dados})
        axios.get('http://api.openweathermap.org/data/2.5/weather?q='+dados+'&appid=141399b421c8057791197472f26e835c').then(res =>{
            setPais(res.data.sys.country)
            setTemp((res.data.main.temp -273.15).toFixed(2))
            setUmidade(res.data.main.humidity)
            setClima(res.data.weather[0].description)
            updateTop()
            updateBusca()
        })
    }
    
    return (
        <div className='body'>
            <h1 className='pesquisa-titulo'>Clima e Tempo</h1>

            <div className='pesquisa-conteudo'>
                <div className='esquerda coluna'>
                    <div className='busca'>

                        <input className='busca-input'id="txtBusca" type="text" placeholder="Cidade"/>
                        <img className='lupa' onClick={() => Pesquisa() } src={lupa} id="btnBusca" alt="Pesquiser"/>

                    </div>

                    <div className='informacoes'>

                        <h2 className='titulo'>As informações encontradas foram: </h2>
                        <p id='pais'>País: {pais}</p>
                        <p id='TA'>Temperatura Atual: {temp}°C</p>
                        <p id='umidade'>Umidade: {umidade}%</p>
                        <p id='clima'>Clima: {clima}</p>

                    </div>

                </div>

                <div className='direita coluna'>
                    <div className='cidades'>

                        <h2 className='top'>TOP 5 - Cidades mais buscadas</h2>
                            {top.map((x, i) => {
                                return(
                                    <p key={i} className='buscadas'>{i + 1}ª: {x.cidade} - {x.quantidade}</p>
                                )
                            })}
                    </div>

                    <div className='recentes'>
                        <h2 className='ultimas'>Últimas Buscas</h2>
                        <div className='divisao'>

                            <div className='divisao-coluna'>
                            {busca.map((x, i) => {
                                return(
                                    <p key={i} className='urecentes'> {x.cidade} </p>
                                )
                            })}
                            </div>

                        </div>

                    </div>
                </div>

            </div>

        </div>
    )
}


export default Home;
