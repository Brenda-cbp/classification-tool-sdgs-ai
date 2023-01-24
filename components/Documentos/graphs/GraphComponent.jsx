import React from 'react'
import Paralelogramo from '../commons/Paralelogramo'
import { Col, Row } from 'react-bootstrap'
import styles from "../../../styles/DocumentosComponentes.module.css"
import Circle from '../commons/Circle'
import Gauge from '../commons/Gauge'
import InfoButton from '../commons/InfoButton'
import PieSDGs from '../../PieSDGs'

function GraphComponent(props) {
  const style1 = {
    position: "relative",
    bottom: "-30px"
  }
  const style2 = {
    display: "flex",
    flexDirection: "row-reverse", position: "relative",
    bottom: "-50px"
  }
  const style = props.derecha ? style1 : style2
  return (
    <div className={`${styles.fondoColorMorado} ${styles.shadow}`}>
      <Row>
        <Col style={style}>
          <Paralelogramo height="50%" width="35vw" text={props.title} />
        </Col>
      </Row>
      <Row className={styles.fondoColorMoradoClaro}>

        {props.derecha ?
          <Col>
            <div>
              <div style={style2}>
                <InfoButton placement="left" message="Recuerda que estemos buscando un nivel coherencia alto" />
              </div>
              <Gauge number={props.data} />
            </div>
            
          </Col>
          :
          <Col className={styles.center}>
            <Circle text1={props.description} text2="" text3={props.description2} data="" width="45vw" height="20rem" fontSize="1.5rem" color="#FFDED8" />
          </Col>
        }
        {props.derecha ?
          <Col className={styles.center}>
            <Circle text1={props.description} text2="" text3={props.description2} data="" width="45vw" height="20rem" fontSize="24px" fontSize3="1em" color="#FFDED8" />
          </Col> :
          <Col>
            <PieSDGs objetivos={props.data} setObjetivo={""} objetivo={""} />
          </Col>
        }
      </Row>
    </div>
  )
}

export default GraphComponent