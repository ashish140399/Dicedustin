import * as React from "react";
import DocumentTitle from "react-document-title";

import {connect} from "react-redux";
import {bindActionCreators, Dispatch} from "redux";
import Stats from "../../platform/components/bet/Stats";
import {showRegisterModal} from "../../platform/modules/modals/actions";
import {Container, Section} from "../../reusable";
import {State as RootState} from "../../rootReducer";
import Dice from "../games/dice/Dice";

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            showRegisterModal,
        },
        dispatch
    );

export const mapStateToProps = (state: RootState) => {
    return {
        loggedIn: state.account.jwt !== null,
    };
};

export type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const Index = ({loggedIn, showRegisterModal}: Props) => (
    <DocumentTitle title="DiceKing">
        <div>
            <Dice />
            <Section>
                <Container>
                    <Stats showMyBets={false} />
                </Container>
            </Section>
        </div>
    </DocumentTitle>
);

export default connect(mapStateToProps, mapDispatchToProps)(Index);
