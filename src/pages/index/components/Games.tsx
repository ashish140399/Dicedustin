import {TFunction} from "i18next";
import * as React from "react";
import {withTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {Container, Section} from "../../../reusable";

const DiceLogo = require("assets/images/diceLogo.svg");
const Style = require("./Games.scss");

const Games = ({t}: {t: TFunction}) => (
    <Section className={Style.games}>
        <Container>
            <h2 className="text-center">Games</h2>
            <div className={Style.gamesList}>
                <Link to="/games/dice" className={Style.gameLink + " " + Style.gameLink_active}>
                    <img src={DiceLogo} className={Style.img} />
                    <h5 className={Style.text}>{t("ClassicDice")}</h5>
                </Link>
            </div>
        </Container>
    </Section>
);

export default withTranslation()(Games);
