import React, { Component } from "react";
import MatchingPresenter from "./MatchingPresenter";
import Util from "utils";
import { getRecords, setRecords } from "api";

import URL0 from "assets/images/matching/0.png";
import URL1 from "assets/images/matching/1.png";
import URL2 from "assets/images/matching/2.png";
import URL3 from "assets/images/matching/3.png";
import URL4 from "assets/images/matching/4.png";
import URL5 from "assets/images/matching/5.png";
import URL6 from "assets/images/matching/6.png";
import URL7 from "assets/images/matching/7.png";
import URL8 from "assets/images/matching/8.png";
import URL9 from "assets/images/matching/9.png";
import URL10 from "assets/images/matching/10.png";
import URL11 from "assets/images/matching/11.png";

const array = [];
const urlArray = [
  URL0,
  URL1,
  URL2,
  URL3,
  URL4,
  URL5,
  URL6,
  URL7,
  URL8,
  URL9,
  URL10,
  URL11,
  URL0,
  URL1,
  URL2,
  URL3,
  URL4,
  URL5,
  URL6,
  URL7,
  URL8,
  URL9,
  URL10,
  URL11,
];

urlArray.forEach((url) => {
  array.push({
    url,
    flip: "none",
  });
});

class MatchingContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: Util.shuffle(array),
      timeElapsed: 0,
      temp: -1,
      isPlaying: false,
      ActionBtnType: 1, //1: start , 2: reset, 0: no display
      count: 0,
      score: 0,
      isSubmitModalOpen: false,
      records: [],
    };
  }
  render() {
    const {
      cards,
      timeElapsed,
      score,
      isPlaying,
      ActionBtnType,
      records,
      isSubmitModalOpen,
    } = this.state;
    return (
      <MatchingPresenter
        cards={cards}
        timeElapsed={timeElapsed}
        score={score}
        isPlaying={isPlaying}
        ActionBtnType={ActionBtnType}
        records={records}
        isSubmitModalOpen={isSubmitModalOpen}
        handleClick={this.handleClick}
        handleStart={this.handleStart}
        handleReset={this.handleReset}
        handleCloseModal={this.handleCloseModal}
        handleSubmit={this.handleSubmit}
      />
    );
  }

  async componentDidMount() {
    const records = await getRecords(process.env.REACT_APP_LAMBDA_MATCHING);
    this.setState({
      records,
    });
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  startTimer = () => {
    this.timer = setInterval(() => {
      this.setState({
        timeElapsed: this.state.timeElapsed + 30,
      });
    }, 30);
  };

  stopTimer = () => {
    clearInterval(this.timer);
  };

  handleCloseModal = () => {
    this.setState({
      isSubmitModalOpen: false,
      cards: Util.shuffle(array),
      timeElapsed: 0,
      score: 0,
      count: 0,
      isPlaying: false,
      ActionBtnType: 1,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    let name = "";
    event.target.name.forEach((initial) => {
      if (initial.value !== " ") {
        name = name.concat(initial.value);
      }
    });
    const data = {
      name: name,
      score: this.state.score / 1000,
    };
    const records = await setRecords(
      process.env.REACT_APP_LAMBDA_MATCHING,
      data
    );
    this.setState(
      {
        cards: Util.shuffle(array),
        records,
        isSubmitModalOpen: false,
        timeElapsed: 0,
        score: 0,
        count: 0,
        isPlaying: false,
        ActionBtnType: 1,
      },
      () => alert("등록되었습니다.")
    );
  };

  handleStart = () => {
    const { cards } = this.state;
    this.setState({
      cards: cards.map((card) => {
        return {
          ...card,
          flip: "init",
        };
      }),
      isPlaying: true,
      ActionBtnType: 0,
    });
    setTimeout(() => {
      this.startTimer();
      this.setState({
        ActionBtnType: 2,
      });
    }, 4000);
  };

  handleReset = () => {
    this.setState({
      cards: Util.shuffle(array),
      isPlaying: false,
      ActionBtnType: 1,
      timeElapsed: 0,
      count: 0,
    });
    this.stopTimer();
  };

  handleClick = (index) => {
    const { cards, temp } = this.state;

    let selector = "";

    if (cards[index].flip === "open") selector = "alreadyOpened";
    else if (temp === -1) selector = "first";
    else if (cards[index].url === cards[temp].url) selector = "second_match";
    else if (cards[index].url !== cards[temp].url) selector = "second_unmatch";

    switch (selector) {
      case "alreadyOpened":
        //열려있는 카드
        break;
      case "first":
        //선카드
        this.setState({
          cards: cards.map((card, originalIndex) => {
            if (originalIndex === index) {
              return {
                ...card,
                flip: "open",
              };
            }
            return card;
          }),
          temp: index,
        });
        break;
      //후카드, 정답
      case "second_match":
        this.setState({
          cards: cards.map((card, originalIndex) => {
            if (originalIndex === index) {
              return {
                ...card,
                flip: "open",
              };
            }
            return card;
          }),
          temp: -1,
          count: this.state.count + 1,
        });
        //게임 끝 구현.
        if (this.state.count === 11) {
          this.stopTimer();
          this.setState({
            score: this.state.timeElapsed,
            isSubmitModalOpen: true,
          });
        }
        break;
      //후카드, 오답
      case "second_unmatch":
        this.setState({
          cards: cards.map((card, originalIndex) => {
            if (originalIndex === temp) {
              return {
                ...card,
                flip: "close",
              };
            }
            if (originalIndex === index) {
              return {
                ...card,
                flip: card.flip === "flip" ? "reFlip" : "flip",
              };
            }
            return card;
          }),
          temp: -1,
        });
        break;
      default:
        return;
    }
  };
}

export default MatchingContainer;
