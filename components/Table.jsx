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
      <table className="w-full lg:hidden text-4xl text-gray-500">
        <thead>
          <tr className="grid grid-cols-3 gap-2 p-4 text-[#359ab0] font-bold">
            <th className="text-center">Salah</th>
            <th className="text-center">Adhan</th>
            <th className="text-center">Iqamah</th>
          </tr>
        </thead>
        <tbody className="space-y-3">
          <tr
            className={`grid grid-cols-3 gap-2 p-3 rounded-lg ${
              state.fajr && "text-[#359ab0] font-bold"
            }`}
          >
            <td className="text-center">Fajr</td>
            <td className="text-center">{addZero("fajar_Adhan", 0)}</td>
            <td className="text-center">
              {month > 3 && month < 10 ? "+15 min" : "+30 min"}
            </td>
          </tr>
          <tr
            className={`grid grid-cols-3 gap-2 p-3 rounded-lg ${
              state.sunrise && "text-[#359ab0] font-bold"
            }`}
          >
            <td className="text-center">Sunrise</td>
            <td className="text-center">{addZero("Sunrise", 1)}</td>
            <td className="text-center">-</td>
          </tr>
          <tr
            className={`grid grid-cols-3 gap-2 p-3 rounded-lg ${
              state.zuhr && "text-[#359ab0] font-bold"
            }`}
          >
            <td className="text-center">Zuhr</td>
            <td className="text-center">{addZero("Zuhar_adhan", 2)}</td>
            <td className="text-center">+10 min</td>
          </tr>
          <tr
            className={`grid grid-cols-3 gap-2 p-3 rounded-lg ${
              state.asr && "text-[#359ab0] font-bold"
            }`}
          >
            <td className="text-center">Asr</td>
            <td className="text-center">{addZero("asar_adhan", 3)}</td>
            <td className="text-center">+10 min</td>
          </tr>
          <tr
            className={`grid grid-cols-3 gap-2 p-3 rounded-lg ${
              state.maghrib && "text-[#359ab0] font-bold"
            }`}
          >
            <td className="text-center">Maghrib</td>
            <td className="text-center">{addZero("maghrib_adhan", 4)}</td>
            <td className="text-center">+5 min</td>
          </tr>
          <tr
            className={`grid grid-cols-3 gap-2 p-3 rounded-lg ${
              state.isha && "text-[#359ab0] font-bold"
            }`}
          >
            <td className="text-center">Isha</td>
            <td className="text-center">{addZero("isha_adhan", 5)}</td>
            <td className="text-center">
              {month < 11 && month > 3 ? "+5 min" : "+20 min"}
            </td>
          </tr>
          <tr className="grid grid-cols-3 gap-2 p-3 rounded-lg">
            <td className="text-center">Jumma</td>
            <td className="text-center">
              {month < 11 && month > 3 ? "14:00" : "13:00"}
            </td>
            <td className="text-center">-</td>
          </tr>
        </tbody>
      </table>

      <table className="hidden lg:inline-table w-full mx-auto mt-5 text-xl md:text-3xl text-gray-700 table-fixed">
        <thead>
          <tr>
            <th className="p-4 text-[#359ab0] text-center w-1/8">Salah</th>
            <th
              className={`${
                state.fajr && "text-[#359ab0] font-bold"
              } text-center w-1/8`}
            >
              Fajr
            </th>
            <th
              className={`${
                state.sunrise && "text-[#359ab0] font-bold"
              } text-center w-1/8`}
            >
              Sunrise
            </th>
            <th
              className={`${
                state.zuhr && "text-[#359ab0] font-bold"
              } text-center w-1/8`}
            >
              Zuhr
            </th>
            <th
              className={`${
                state.asr && "text-[#359ab0] font-bold"
              } text-center w-1/8`}
            >
              Asr
            </th>
            <th
              className={`${
                state.maghrib && "text-[#359ab0] font-bold"
              } text-center w-1/8`}
            >
              Maghrib
            </th>
            <th
              className={`${
                state.isha && "text-[#359ab0] font-bold"
              } text-center w-1/8`}
            >
              Isha
            </th>
            <th className="text-center w-1/8">Jumma</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-4 font-semibold text-[#359ab0] text-center w-1/8">
              Adhan
            </td>
            <td
              className={`${
                state.fajr && "text-[#359ab0] font-bold"
              } text-center w-1/8`}
            >
              {addZero("fajar_Adhan", 0)}
            </td>
            <td
              className={`${
                state.sunrise && "text-[#359ab0] font-bold"
              } text-center w-1/8`}
            >
              {addZero("Sunrise", 1)}
            </td>
            <td
              className={`${
                state.zuhr && "text-[#359ab0] font-bold"
              } text-center w-1/8`}
            >
              {addZero("Zuhar_adhan", 2)}
            </td>
            <td
              className={`${
                state.asr && "text-[#359ab0] font-bold"
              } text-center w-1/8`}
            >
              {addZero("asar_adhan", 3)}
            </td>
            <td
              className={`${
                state.maghrib && "text-[#359ab0] font-bold"
              } text-center w-1/8`}
            >
              {addZero("maghrib_adhan", 4)}
            </td>
            <td
              className={`${
                state.isha && "text-[#359ab0] font-bold"
              } text-center w-1/8`}
            >
              {addZero("isha_adhan", 5)}
            </td>
            <td className="text-center w-1/8">
              {month < 11 && month > 3 ? "14:00" : "13:00"}
            </td>
          </tr>
          <tr>
            <td className="p-4 font-semibold text-[#359ab0] text-center w-1/8">
              Iqamah
            </td>
            <td
              className={`${
                state.fajr && "text-[#359ab0] font-bold"
              } text-center w-1/8`}
            >
              {month > 3 && month < 10 ? "+15 min" : "+30 min"}
            </td>
            <td
              className={`${
                state.sunrise && "text-[#359ab0] font-bold"
              } text-center w-1/8`}
            >
              -
            </td>
            <td
              className={`${
                state.zuhr && "text-[#359ab0] font-bold"
              } text-center w-1/8`}
            >
              +10 min
            </td>
            <td
              className={`${
                state.asr && "text-[#359ab0] font-bold"
              } text-center w-1/8`}
            >
              +10 min
            </td>
            <td
              className={`${
                state.maghrib && "text-[#359ab0] font-bold"
              } text-center w-1/8`}
            >
              +5 min
            </td>
            <td
              className={`${
                state.isha && "text-[#359ab0] font-bold"
              } text-center w-1/8`}
            >
              {month < 11 && month > 3 ? "+5 min" : "+20 min"}
            </td>
            <td className="text-center w-1/8">-</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
