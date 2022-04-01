import React from 'react';

export default class HistorialOpciones extends React.Component {

    render() {
        
        const historial = this.props.historial;
        const opcionesElegidas = historial.map((capitulo, idx) =><li key={idx} >{capitulo}</li>)

        return (
            <div className="recordatorio">
                <p>Historial de opciones elegidas:</p>
                <ul>
                    {opcionesElegidas}
                </ul>
            </div>
        );
    }


}