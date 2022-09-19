import { useState, useId } from 'react';
import municipiosJson from '../../json/municipios.json';
import departamentosJson from '../../json/departamentos.json';

import Head from 'next/head';
import Link from 'next/link';
import Select from 'react-select';
import styles from '../../styles/Consultar.module.css';

export default function Consultar({ municipios, departamentos }) {
    const [departamento, setDepartamento] = useState(undefined);
    const [municipio, setMunicipio] = useState(undefined);

    function changeDepartamento(value) {
        setDepartamento(value);
        setMunicipio(undefined);
    }

    function changeMunicipio(value) {
        setMunicipio(value);
    }

    function showButton() {
        if (municipio) {
            return (
                <Link href={`/${municipio.value}/`}><button className={styles.button_start} role="button">Consultar</button></Link>
            );
        }
    }

    function showMunicipio() {
        if (departamento) {
            const opciones = municipios.filter(municipio => municipio.departamento === departamento.departamento);
            return (
                <Select
                    className={styles.select_item}
                    placeholder="Municipio"
                    value={municipio || ''}
                    onChange={changeMunicipio}
                    options={opciones}
                    isClearable={true}
                    isSearchable={true}
                />
            );
        }
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>ODS-IA consultar</title>
                <meta name="description" content="Consulta en ODS-IA los ODSs más relevantes para las personas de tu ciudad o municipio." />
                <meta name="keywords" content="IA, Objetivos de Desarrollo Sostenibles, UNFPA, Colombia, consulta"></meta>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Link href="/"><button className={styles.button_return} role="button">&#10140;</button></Link>
            <div className={styles.logo}>
                ODS-IA
            </div>

            <div className={styles.main}>
                <h1 className={styles.title}>Consultar resultados &#x1F50E;</h1>
                <p className={styles.description}>Puedes consultar los ODSs mas relevantes para las personas de tu ciudad y municipio, o de cualquier region del país que selecciones.</p>
                <p className={styles.question}>¡Cuéntanos que region quieres consultar!</p>
                <div className={styles.select}>
                    <Select
                        className={styles.select_item}
                        placeholder="Departamento"
                        instanceId={useId()}
                        value={departamento}
                        onChange={changeDepartamento}
                        options={departamentos}
                        isClearable={true}
                        isSearchable={true}
                    />
                    {showMunicipio()}
                </div>
                {showButton()}
            </div>
        </div>

    );
}

export async function getStaticProps() {
    const municipios = municipiosJson.map((municipio) => {
        return {
            label: municipio.nombre,
            value: municipio.divipola,
            departamento: municipio.divipola_departamento,
        };
    });
    const departamentos = departamentosJson.map((departamento) => {
        return {
            label: departamento.nombre,
            value: departamento.divipola,
            departamento: departamento.divipola.substring(0, 2),
        };
    });

    return { props: { municipios, departamentos } };
}