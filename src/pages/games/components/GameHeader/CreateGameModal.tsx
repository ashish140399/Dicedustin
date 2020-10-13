import * as React from "react";
import Web3 from "web3";

import {SESSION_TIMEOUT} from "../../../../config/config";
import {State as Web3State} from "../../../../platform/modules/web3/reducer";
import {Button, Ether, Form, FormGroup, Input, Label, Modal, ValueInput} from "../../../../reusable";
import {generateSeed} from "../../../../util/crypto";
import {fromWeiToGwei} from "@dicether/state-channel";

const abiArrayToken = require("assets/json/Erc20abi.json");
const tokenAddress = "0x9BB6fd000109E24Eb38B0Deb806382fF9247E478";

type Props = {
    isOpen: boolean;
    minValue: number;
    maxValue: number;
    web3State: Web3State;

    onCreateGame(value: number, seed: string): void;
    onClose(): void;
};

type State = {
    value: number;
    seed: string;
    bal: number;
};

function roundValue(value: number, step: number): number {
    return Math.floor(value / step) * step;
}

export default class CreateGameModal extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        const balance = props.web3State.balance;
        const val = balance !== null ? Math.min(props.maxValue, balance) : props.maxValue;
        console.log(val, props.maxValue, balance)

        this.state = {
            value: roundValue(val, props.minValue),
            seed: generateSeed(),
            bal: 0,
        };
    }

    componentWillReceiveProps(newProps: Props) {
        // const curBalance = this.props.web3State.balance;
        // const newBalance = newProps.web3State.balance;

        // if (curBalance !== newBalance && newBalance !== null) {
        //     const val = Math.min(newProps.maxValue, newBalance);
        //     this.setState({value: roundValue(val, newProps.minValue)});;
        //     console.log("componentWillReceiveProps", val, roundValue(val, newProps.minValue), curBalance, newBalance);
        // }
    }

    private createGame = (e: React.FormEvent<HTMLFormElement>) => {
        const {onCreateGame, onClose} = this.props;
        const {value, seed} = this.state;

        onCreateGame(value, seed);
        onClose();
        e.preventDefault();
    };

    private onValueChange = (value: number) => {
        this.setState({value});
        console.log("onValueChange", value);
    };

    render() {
        const {minValue, maxValue, isOpen, onClose} = this.props;
        const {value, seed, bal} = this.state;

        // Get ERC20 Token Balance
        const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
        const tokenContract = new web3.eth.Contract(abiArrayToken, tokenAddress);

        tokenContract.methods
            .balanceOf(this.props.web3State.account)
            .call()
            .then(result => {
                this.setState({bal: result / 1e8}); // fromWeiToGwei(result)
            });

        let toLowBalance = false;
        let max = maxValue;
        if (bal !== null) {
            toLowBalance = bal < minValue;
            max = roundValue(Math.min(maxValue, bal), minValue);
        }

        return (
            <Modal isOpen={isOpen} toggle={onClose}>
                <h3 className="text-center" style={{color: "white"}}>
                    Create Game Session
                </h3>
                {bal === null ? (
                    <p className={"text-warning"}>Failed reading your account balance!</p>
                ) : (
                    <p style={{color: "white"}}>Your Balance: {bal} tokens</p>
                )}
                {toLowBalance ? (
                    <p className={"text-danger"}>Too low balance on your account!</p>
                ) : (
                    <Form onSubmit={this.createGame}>
                        <FormGroup>
                            {/* <Label for="value" style={{color: "white"}}>
                                Amount to deposit (between <Ether gwei={minValue} precision={2} />
                                and <Ether gwei={max} precision={2} /> tokens)
                            </Label> */}
                            <ValueInput
                                id="value"
                                min={minValue}
                                max={max}
                                step={minValue}
                                value={value}
                                onChange={this.onValueChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="seed" style={{color: "white"}}>Your seed used to generate the hash chain</Label>
                            <Input disabled value={seed} />
                        </FormGroup>
                        <FormGroup className="text-warning">
                            The data required for the game session is stored local on your browser. So{" "}
                            <em>don't clear your browser history</em> as long as the game session is active. If your are
                            done with playing you must end the game session. If you don't end the game session, we will
                            end it after waiting {SESSION_TIMEOUT} hours and you will need to pay a fine!
                        </FormGroup>
                        <FormGroup>
                            <Button type="submit" color="primary" disabled={toLowBalance}>
                                Deposit
                            </Button>
                        </FormGroup>
                    </Form>
                )}
            </Modal>
        );
    }
}
