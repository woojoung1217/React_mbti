import { useState } from "react";
import "./App.css";
import qnaList from "./data.js";
import infoList from "./info";
/* eslint-disable */

const App = () => {
  const END_POINT = 12;
  const [data, setData] = useState(qnaList);
  const [selectedAnswer, setSelectedAnswer] = useState([]);
  const [typeCounts, setTypeCounts] = useState({});
  let [visible, setVisible] = useState(true);
  let [count, setCount] = useState(0);
  let [result, setResult] = useState(false);
  let [tpyeofResult, setTypeOfResult] = useState("");
  let [tpyeofDesc, setTypeOfDesc] = useState("");
  const [infoData, setInfoData] = useState(infoList);

  const isToggle = () => {
    setVisible(!visible);
  };

  const calculateResult = (result) => {
    const sortedEntries = Object.entries(result).sort((a, b) => b[1] - a[1]);
    const mostFrequentNumber = sortedEntries[0][0];
    const frequency = sortedEntries[0][1];
    return { mostFrequentNumber, frequency }; // 값을 반환
  };

  const finalResult = () => {
    const { mostFrequentNumber, frequency } = calculateResult(typeCounts); // calculateResult 함수 호출 및 값 가져오기
    setResult(true);
    console.log("final is called");
    console.log(
      `가장 많이 나온 숫자: ${mostFrequentNumber}, 횟수: ${frequency}`
    );
    const mostFrequentNumberAsInt = parseInt(mostFrequentNumber, 10);
    // 배열에 정수를 추가

    if (mostFrequentNumberAsInt == 0) {
      setTypeOfResult(infoList[0].name);
      setTypeOfDesc(infoList[0].desc);
    } else {
      setTypeOfResult("당신은 등신입니다.");
    }
  };

  const goNext = () => {
    const nextCount = count + 1;
    if (nextCount === END_POINT) {
      calculateResult(typeCounts);
      setVisible(false);
      // 마지막 질문 이후에 결과 표시
    }
    if (selectedAnswer !== null) {
      // 여기에서 선택된 답변에 대한 처리 로직을 추가할 수 있습니다.
    }
    setCount(nextCount);
    setSelectedAnswer(null);
  };

  const handleButtonClick = (answer) => {
    console.log(answer);
    setSelectedAnswer(answer);
  };

  const handleTypeClick = (selectedType) => {
    const updatedTypeCounts = { ...typeCounts };
    if (updatedTypeCounts[selectedType]) {
      updatedTypeCounts[selectedType]++;
    } else {
      updatedTypeCounts[selectedType] = 1;
    }
    setTypeCounts(updatedTypeCounts);

    const nextCount = count + 1;
    console.log(nextCount);
    if (nextCount < data.length) {
      setCount(nextCount);
    }
  };

  return (
    <>
      <section id="main">
        <div className={visible === true ? `main-cover` : "main-out"}>
          <h1>12간지로 알아보는 연애 유형</h1>
          <button
            onClick={() => {
              isToggle();
            }}
          >
            START
          </button>
        </div>
      </section>

      <section id="qna-out">
        {count < data.length ? ( // 데이터가 있는 경우에만 질문 표시
          <div className={visible === false ? "qna-cover" : "qna-out"}>
            <h1>qna section</h1>
            <p>{data[count].q}</p>
            {data[count].a.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  handleTypeClick(item.type);
                  handleButtonClick(item.answer);
                  goNext();
                }}
              >
                {item.answer}
              </button>
            ))}
          </div>
        ) : (
          <div className="qna-cover">
            <h1>질문을 모두 완료했습니다.</h1>
            <button onClick={finalResult}>결과 확인</button>
          </div>
        )}
      </section>

      {result ? (
        <section id="result">
          <h2>당신의 결과는 : {tpyeofResult}</h2>
          <p>당신의 결과는 : {tpyeofDesc}</p>
        </section>
      ) : null}
    </>
  );
};

export default App;
