"use client";
import React, { useEffect, useState } from "react";

export const Table = ({ times }) => {
  const [state, setState] = useState({
    fajr: false,
    sunrise: false,
    zuhr: false,
    asr: false,
    maghrib: false,
    isha: false,
    nextAdhan: "",
    nextNamaz: "",
  });
  let date = new Date();
  let month = date.getMonth() < 12 ? date.getMonth() + 1 : 1;
  let day = date.getDate() <= 31 ? date.getDate() - 1 : 1;
  let hrs = date.getHours();
  let mins =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  let currentTime = parseFloat(`${hrs}.${mins}`);

  let FajrAdhan = times[month][day]["fajar_Adhan"];
  let Sunrise = parseFloat(times[month][day]["Sunrise"].toFixed(2));
  let Zuhr = parseFloat(times[month][day]["Zuhar_adhan"].toFixed(2));
  let ZuhrAdhan =
    Zuhr < 10
      ? parseFloat((Zuhr + 12).toFixed(2))
      : parseFloat(Zuhr).toFixed(2);
  let AsrAdhan = parseFloat((times[month][day]["asar_adhan"] + 12).toFixed(2));
  let MaghribAdhan = parseFloat(
    (times[month][day]["maghrib_adhan"] + 12).toFixed(2)
  );
  let IshaAdhan = parseFloat((times[month][day]["isha_adhan"] + 12).toFixed(2));

  /* @ts-ignore */
  const changeStyle = () => {
    switch (true) {
      case currentTime >= FajrAdhan && currentTime < Sunrise:
        setState({
          ...state,
          isha: false,
          fajr: true,
          nextAdhan: Sunrise,
          nextNamaz: "Sunrise",
        });
        break;
      case currentTime >= Sunrise && currentTime < ZuhrAdhan:
        setState({
          ...state,
          fajr: false,
          sunrise: true,
          nextNamaz: "Zuhr",
          nextAdhan: ZuhrAdhan < 10 ? ZuhrAdhan + 12 : ZuhrAdhan,
        });

        break;
      case currentTime >= ZuhrAdhan && currentTime < AsrAdhan:
        setState({
          ...state,
          sunrise: false,
          zuhr: true,
          nextAdhan: AsrAdhan,
          nextNamaz: "Asr",
        });

        break;
      case currentTime >= AsrAdhan && currentTime < MaghribAdhan:
        setState({
          ...state,
          zuhr: false,
          asr: true,
          nextAdhan: MaghribAdhan,
          nextNamaz: "Maghrib",
        });

        break;
      case currentTime >= MaghribAdhan && currentTime < IshaAdhan:
        setState({
          ...state,
          asr: false,
          maghrib: true,
          nextAdhan: IshaAdhan,
          nextNamaz: "Isha",
        });

        break;
      case currentTime >= IshaAdhan && currentTime < 23.6:
        setState({
          ...state,
          maghrib: false,
          isha: true,
          nextAdhan: FajrAdhan,
          nextNamaz: "Fajr",
        });
        break;
      case currentTime >= 0 && currentTime < FajrAdhan:
        setState({
          ...state,
          maghrib: false,
          isha: true,
          nextAdhan: FajrAdhan,
          nextNamaz: "Fajr",
        });
        break;
      default:
        return "inActive";
    }
  };

  const changeTimeFormat = (salahTime, index) => {
    if (index >= 2 && salahTime < 11.35) {
      return (parseFloat(salahTime) + 12).toFixed(2);
    }
    return salahTime;
  };

  // Add zero as prefix if before time:

  const addZero = (salahName, index) => {
    let salahTime = times[month][day][salahName];
    salahTime = salahTime.toFixed(2);
    if (index <= 1) {
      salahTime = "0" + salahTime;
      return salahTime;
    }
    salahTime = changeTimeFormat(salahTime, index);
    return salahTime;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      changeStyle();
    }, 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <>
      <div className="salah-times-container">
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>Adhan</th>
              <th>Iqamah</th>
            </tr>
            <tr className={state.fajr && "active"}>
              <td style={{ width: "40%" }}>Fajr</td>
              <td>{addZero("fajar_Adhan", 0)}</td>
              <td>
                {/* {addZero("fajar_iqamah", 0)} */}
                {month < 12 && month > 8 ? "+5 min" : "+30 min"}
              </td>
            </tr>
            <tr className={state.sunrise && "active"}>
              <td>Sunrise</td>
              <td>{addZero("Sunrise", 1)}</td>
            </tr>
            <tr className={state.zuhr && "active"}>
              <td>Zuhr</td>
              <td>{addZero("Zuhar_adhan", 2)}</td>
              <td>
                {/* {addZero("Zuhar_iqama", 2)} */}
                +10 min
              </td>
            </tr>
            <tr className={state.asr && "active"}>
              <td>Asr</td>
              <td>{addZero("asar_adhan", 3)}</td>
              <td>
                {/* {addZero("asar_iqamah", 3)} */}
                +10 min
              </td>
            </tr>
            <tr className={state.maghrib && "active"}>
              <td>Maghrib</td>
              <td>{addZero("maghrib_adhan", 4)}</td>
              <td>
                {/* {addZero("maghrib_iqamah", 4)} */}
                +5 min
              </td>
            </tr>
            <tr className={state.isha && "active"}>
              <td>Isha</td>
              <td>{addZero("isha_adhan", 5)}</td>
              <td>
                {/* {addZero("isha_iqamah", 5)} */}
                {month < 11 && month > 6 ? "+5 min" : "+20 min"}
              </td>
            </tr>
            <tr>
              <td>Jumma</td>
              <td></td>
              <td>{month < 11 && month > 3 ? "14:00" : "13:00"}</td>
            </tr>
            {/* <tr>
              <td>Jum'a-2 </td>
              <td></td>
              <td>{"14:30"}</td>
            </tr> */}
          </tbody>
        </table>
      </div>
      {/* <TimeToNextPrayer
        currentTime={currentTime}
        nextAdhan={state.nextAdhan}
        nextNamaz={state.nextNamaz}
        IshaAdhan={IshaAdhan}
      /> */}
    </>
  );
};
