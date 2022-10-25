import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { fetchSinToken } from '../helpers/fetch';

function ConfirmationPage() {

    const { id } = useParams();

    const [verificado, setVerificado] = useState({
        verified: false,
        loading: true,
    });

    useEffect(() => {

        const verificar = async () => {

            const { ok } = await fetchSinToken(`login/verify/${id}`, "GET");
            ok ? setVerificado({ verified: true, loading: false }) : setVerificado({ verified: false, loading: false })
        }

        verificar();

    }, [id])

    return (
        <div className="confirmation-container">
            <div className="confirmation-box">

                <Loader loading={verificado.loading} />
                {
                    verificado.verified
                        ? <h2 className="confirmation-title">Verificando Correctamente</h2>
                        : <h2 className="confirmation-title">Error al verificar</h2>
                }
                <Link to="/auth/login" className="txt-verification">
                    Ir a Inicio de sesion
                </Link>
            </div>
        </div>
    )
}

export default ConfirmationPage