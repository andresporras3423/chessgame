import React from "react";
import styles from "./../styles/Modal.module.css";
import { RiCloseLine } from "react-icons/ri";
import bn from "../assets/black-knight.svg";
import bb from "../assets/black-bishop.svg";
import br from "../assets/black-rook.svg";
import bq from "../assets/black-queen.svg";
import wn from "../assets/white-knight.svg";
import wb from "../assets/white-bishop.svg";
import wr from "../assets/white-rook.svg";
import wq from "../assets/white-queen.svg";

class Modal extends React.Component{
  constructor(props){
    super(props);

    this.state={
      styles: styles,
      promotion: {
        "white": {
          "q": wq,
          "r": wr,
          "b": wb,
          "n": wn
        },
        "black": {
          "q": bq,
          "r": br,
          "b": bb,
          "n": bn
        }
      } 
    }
  }

  render(){
    const styles = this.state.styles;
    const pieces = this.state.promotion[this.props.color];
    const props = this.props;
    return (
      <>
        <div className={styles.darkBG} onClick={() => props.setModalOpen(false)} />
        <div className={styles.centered}>
          <div className={styles.modal}>
            <button className={styles.closeBtn} onClick={() => props.setModalOpen(false)}>
              <RiCloseLine style={{ marginBottom: "-3px" }} />
            </button>
            <div className={styles.modalActions}>
              <div className={styles.actionsContainer}>
                <button className={styles.cellBtn} 
                onClick={() => props.setModalOpen(false, `${props.color[0]}q`)}>
                <img src={pieces["q"]} className={styles.cellSize} />
                </button>
                <button
                  className={styles.cellBtn}
                  onClick={() => props.setModalOpen(false, `${props.color[0]}r`)}
                >
                  <img src={pieces["r"]} className={styles.cellSize} />
                </button>
                <button
                  className={styles.cellBtn}
                  onClick={() => props.setModalOpen(false, `${props.color[0]}b`)}
                >
                  <img src={pieces["b"]} className={styles.cellSize} />
                </button>
                <button
                  className={styles.cellBtn}
                  onClick={() => props.setModalOpen(false, `${props.color[0]}n`)}
                >
                  <img src={pieces["n"]} className={styles.cellSize} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Modal;