import { faHandPointUp } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './style.css';
import catImage from './image/cat.png';
import luffyImage from './image/luffy.png';
import laughImage from './image/laugth.gif';
import duduImage from './image/dudu.gif';
import depressiveImage from './image/depressive.png';
import uhmImage from './image/uhm.png';
import grenouilleImage from './image/grenouille.png';
import fineImage from './image/fine.png';
import uhImage from './image/UH.png';
import cryImage from './image/cry.png';
import gifPath from './image/bubu.gif';


function Invitation() {
    const [noButtonClickCount, setNoButtonClickCount] = useState(0);
    const [noButtonStyle, setNoButtonStyle] = useState({});
    const [showHandIcon, setShowHandIcon] = useState(false);
    const [handIconStyle, setHandIconStyle] = useState({});
    const [showCatImage, setShowCatImage] = useState(false);
    const [showLuffyImage, setShowLuffyImage] = useState(false);
    const [showLaughImage, setShowLaughImage] = useState(false);
    const [showDuduImage, setShowDuduImage] = useState(false);
    const [yesButtonStyle, setYesButtonStyle] = useState({});
    const [newHandIconStyle, setNewHandIconStyle] = useState({});
    const [showDepressiveImage, setShowDepressiveImage] = useState(false);
    const [noButtonsVisibility, setNoButtonsVisibility] = useState([false, false, false, false, false, true, true]);
    const [showUhmImage, setShowUhmImage] = useState(false);
    const [showGrenouilleImage, setShowGrenouilleImage] = useState(false);
    const [showFineImage, setShowFineImage] = useState(false);
    const [showUhImage, setShowUhImage] = useState(false);
    const [showCryImage, setShowCryImage] = useState(false);
    const [clickCount, setClickCount] = useState(0);
    const [showDommageMessage, setShowDommageMessage] = useState(false);
    const [showTitleAndQuestion, setShowTitleAndQuestion] = useState(true);
    const [showYesMessage, setShowYesMessage] = useState(false);;
    const [showRefusalMessage, setShowRefusalMessage] = useState(false);

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    }

    let { id } = useParams();
    let navigate = useNavigate();




    const [invitationData, setInvitationData] = useState(null);
    const fetchInvitationData = async (id) => {
        try {
            const response = await fetch(`https://main.d18x6az5qfghdm.amplifyapp.com/api/invitation/${id}`);
            if (response.ok) {
                const data = await response.json();
                setInvitationData(data);
            } else if (response.status === 404) {
                console.error("Invitation non trouvée");
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des données d'invitation:", error);
        }
    };
    
    
    

    useEffect(() => {
        fetchInvitationData(id);
    }, [id]);

    const handleYesButtonClick = () => {
        setShowYesMessage(true);
        console.log("showYesMessage set to true");
    };
    


if (showYesMessage && invitationData) {
    return (
        <div className="yes-message-container">
            <img src={gifPath} alt="GIF joyeux" className="happy-gif" />
            <h2 className="super-title">Le message de ton crush</h2>
            <p className="message">{invitationData.messageOui}</p>
            <p className="message">Date de l'invitation : {formatDate(invitationData.date)}</p>
            <button className="return-button" onClick={() => navigate('/')}>Retour</button>
        </div>
    );
}
    

    const handleNoButtonClick = () => {
        const newClickCount = noButtonClickCount + 1;
        setNoButtonClickCount(newClickCount);

        switch (newClickCount) {
            case 1:
                setNoButtonStyle({ transform: 'translateY(-300px)' });
                break;
            case 2:
                setNoButtonStyle({ transform: 'translateY(200px)' });
                setHandIconStyle({ top: '50%', left: '50%' });
                setShowHandIcon(true);
                break;
            case 3:
                setNoButtonStyle({ transform: 'translate(-100px, -300px)' });
                setShowCatImage(true);
                break;
            case 4:
                setNoButtonStyle({ transform: 'translateY(180px)' });
                setShowLuffyImage(true);
                break;
            case 5:
                setNoButtonStyle({ transform: 'translate(-100px, 200px)' });
                setShowLaughImage(true);
                break;
            case 6:
                setNoButtonStyle({ transform: 'translate(50px, -400px)' });
                setShowDuduImage(true);
                setShowCatImage(false);
                setShowLuffyImage(false);
                setShowLaughImage(false);
                setYesButtonStyle({ transform: 'scale(2.5)' });
                setNewHandIconStyle({ transform: 'scale(2.5)' });
                break;
            case 7:
                setNoButtonStyle({ transform: 'translate(-50px, 150px)' });
                setShowDepressiveImage(true);
                setShowDuduImage(false);
                setShowLaughImage(false);
                setShowLuffyImage(false);
                setShowCatImage(false);
                break;
            case 8:
                setNoButtonsVisibility(noButtonsVisibility.map(() => true));
                setShowDepressiveImage(false);
                setNoButtonStyle({ display: 'none' });
                break;
            default:
                break;
        }
    };

    const handleAdditionalNoButtonClick = (buttonIndex) => {
        let updatedVisibility = [...noButtonsVisibility];
        updatedVisibility[buttonIndex] = false;
        setNoButtonsVisibility(updatedVisibility);

        let newClickCount = clickCount + 1;
        setClickCount(newClickCount);

        if (newClickCount >= 5) {
            setShowTitleAndQuestion(false);
            setShowUhmImage(false);
            setShowGrenouilleImage(false);
            setShowFineImage(false);
            setShowUhImage(false);
            setShowCryImage(false);
            setShowRefusalMessage(true); 
            setShowHandIcon(false);
            setYesButtonStyle({ display: 'none' });
            return;
        }
        

        switch (buttonIndex) {
            case 0:
                setShowUhmImage(true);
                break;
            case 1:
                setShowGrenouilleImage(true);
                break;
            case 2:
                setShowFineImage(true);
                break;
            case 3:
                setShowUhImage(true);
                break;
            case 4:
                setShowCryImage(true);
                break;
            default:
                break;
        }
    };


    return (
        <div className="container">
            <div className="invitation-response">
                {showTitleAndQuestion && (
                    <>
                        <h1 className="invitation-response__title">HI CRUSH</h1>
                        <p className="invitation-response__question">
                            Je t'aime vraiment bien, tu voudrais bien qu'on se date ?
                        </p>
                    </>
                )}
{showRefusalMessage ? (
    <div className="refusal-message">
        <p>{invitationData.messageNon}</p> {/* Utilisez le message de refus personnalisé ici */}
    </div>
) : (
                    <>
                        <div className="invitation-response__buttons">
                        <button id="yesButton" className="invitation-response__button" style={yesButtonStyle} onClick={handleYesButtonClick}>Oui</button>

                            <button id="noButton" className="invitation-response__button" style={noButtonStyle} onClick={handleNoButtonClick}>Non</button>
                        </div>
                    </>
                )}

                <div className="no-buttons-container">
                    <button
                        id="noButton2"
                        className="invitation-response__button"
                        style={{ display: noButtonsVisibility[0] ? 'block' : 'none' }}
                        onClick={() => handleAdditionalNoButtonClick(0)}
                    >
                        Non
                    </button>
                    <button
                        id="noButton3"
                        className="invitation-response__button"
                        style={{ display: noButtonsVisibility[1] ? 'block' : 'none' }}
                        onClick={() => handleAdditionalNoButtonClick(1)}
                    >
                        Non
                    </button>
                    <button
                        id="noButton4"
                        className="invitation-response__button"
                        style={{ display: noButtonsVisibility[2] ? 'block' : 'none' }}
                        onClick={() => handleAdditionalNoButtonClick(2)}
                    >
                        Non
                    </button>
                    <button
                        id="noButton5"
                        className="invitation-response__button"
                        style={{ display: noButtonsVisibility[3] ? 'block' : 'none' }}
                        onClick={() => handleAdditionalNoButtonClick(3)}
                    >
                        Non
                    </button>
                    <button
                        id="noButton6"
                        className="invitation-response__button"
                        style={{ display: noButtonsVisibility[4] ? 'block' : 'none' }}
                        onClick={() => handleAdditionalNoButtonClick(4)}
                    >
                        Non
                    </button>
                </div>



                <div style={{ position: 'relative', transform: noButtonStyle.transform }}>
                    {showCatImage && (
                        <img src={catImage} alt="Cat" style={{ position: 'fixed', width: '120px', zIndex: -1 }} />
                    )}
                    {showLuffyImage && (
                        <img src={luffyImage} alt="Luffy" style={{ position: 'fixed', width: '120px', zIndex: -1 }} />
                    )}
                    {showLaughImage && (
                        <img src={laughImage} alt="Laugh" style={{ position: 'fixed', width: '120px', zIndex: -1 }} />
                    )}
                    {showDuduImage && (
                        <img src={duduImage} alt="Dudu" style={{ position: 'fixed', width: '120px', zIndex: -1 }} />
                    )}
                    {showDepressiveImage && (
                        <img src={depressiveImage} alt="Depressive" style={{ position: 'fixed', width: '120px', zIndex: -1 }} />
                    )}
                    {showUhmImage &&
                        <img src={uhmImage} alt="Uhm"
                            style={{
                                position: 'fixed',
                                top: '20%',
                                left: '30%',
                                transform: 'translate(-50%, -50%)',
                                width: '90px',
                                zIndex: -1
                            }}
                        />
                    }
                    {showGrenouilleImage &&
                        <img src={grenouilleImage} alt="Grenouille"
                            style={{
                                position: 'fixed',
                                top: '75%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: '120px',
                                zIndex: -1
                            }}
                        />
                    }
                    {showFineImage &&
                        <img src={fineImage} alt="Fine"
                            style={{
                                position: 'fixed',
                                top: '20%',
                                left: '70%',
                                transform: 'translate(-50%, -50%)',
                                width: '120px',
                                zIndex: -1
                            }}
                        />
                    }
                    {showUhImage &&
                        <img src={uhImage} alt="Uh"
                            style={{
                                position: 'fixed',
                                top: '90%',
                                left: '55%',
                                transform: 'translate(-50%, -50%)',
                                width: '120px',
                                zIndex: -1
                            }}
                        />
                    }
                    {showCryImage &&
                        <img src={cryImage} alt="Cry"
                            style={{
                                position: 'fixed',
                                top: '10%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: '120px',
                                zIndex: -1
                            }}
                        />
                    }

                </div>


                {showHandIcon && (
                    <div className="hand-icon-container" style={{ position: 'relative', height: '50px', width: '50px' }}>
                        <div style={{ ...handIconStyle, ...newHandIconStyle }} className="invitation-response__hand-icon">
                            <FontAwesomeIcon icon={faHandPointUp} />
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}

export default Invitation;

