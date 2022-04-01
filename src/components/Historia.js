import React from 'react';
import Data from './data.json';
import HistorialOpciones from './HistorialOpciones';

export default class Historia extends React.Component {

    constructor() {
        super();

        this.state = {

            id: 0,
            historia: "",
            opcionA: "",
            opcionB: "",
            contador: 1,
            capitulo: "",
            historial: []

        }

    }

    /* --------------------------- MÉTODOS DE CICLO DE VIDA --------------------------- */

    componentDidMount() {

        this.setState({

            id: Data[0].id,
            historia: Data[0].historia,
            opcionA: Data[0].opciones.a,
            opcionB: Data[0].opciones.b

        })

    }

    componentDidUpdate(_,prevState){
        if (this.state.capitulo != ""){

            const capituloSiguiente = Data.find((elemento)=> elemento.id === this.state.capitulo);
            
            if (prevState.id !== capituloSiguiente.id){

                this.setState({
                    id: capituloSiguiente.id,
                    historia: capituloSiguiente.historia,
                    opcionA: capituloSiguiente.opciones.a,
                    opcionB: capituloSiguiente.opciones.b
                })

            }

        }
    }

    /* --------------------------- MÉTODOS/ATRIBUTOS (o ambos a la vez🤔)--------------------------- */

    proximoCapitulo = (opcion) =>{

        const capitulosMaximos = 4 //cantidad de veces que se puede cambiar (Empezamos del capítulo 1 y sólo hay 5).
        let contadorLocal = this.state.contador;
        let capituloLocal = "";

        if (this.state.contador < capitulosMaximos){
            contadorLocal++;
            capituloLocal = contadorLocal + opcion;

            this.guardarHistorial(opcion);

            this.setState({
                contador: contadorLocal,
                capitulo: capituloLocal
            })
        }else{
            this.reiniciarTodo();
        }

    }

    reiniciarTodo = () =>{

        alert("Fin.");
        this.setState({
            id: Data[0].id,
            historia: Data[0].historia,
            opcionA: Data[0].opciones.a,
            opcionB: Data[0].opciones.b,
            contador: 1,
            capitulo: "",
            historial: []
        })

    }

    guardarHistorial = (opcion) =>{

        const historialLocal = this.state.historial;
        historialLocal.push(opcion);
        this.setState({
            historial: historialLocal
        })

    }

    render() {
        return (
            <div className='layout'>
                <div className='historia'>
                    {console.log(Data)}
                    <p>{this.state.historia}</p>

                </div>
                <div className='opciones'>
                    <div className='opcion'>
                        <button className='botones' onClick={() => this.proximoCapitulo("a")} >A</button>
                        <p>{this.state.opcionA}</p>
                    </div>
                    <div className='opcion'>
                        <button className='botones' onClick={() => this.proximoCapitulo("b")} >B</button>
                        <p>{this.state.opcionB}</p>
                    </div>
                </div>
                <HistorialOpciones historial={this.state.historial} />
            </div>
        );
    }


}