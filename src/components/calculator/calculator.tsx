import "./calculator.scss";
import { FaWandMagicSparkles } from "react-icons/fa6";
import imageC from "../../assets/imahe.png";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";

interface datas {
  date: string | any;
}

interface finalValues {
  days: number;
  months: number;
  years: number;
}

const calculator = () => {
  const [value, setValue] = useState<datas[]>([]);
  const [age, setAge] = useState<finalValues | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<datas>();

  const submitE: SubmitHandler<datas> = (data) => {
    setValue([data]);
  };

  useEffect(() => {
    const dateObject = new Date(value[0]?.date);
    const today = new Date();

    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1; // Month is zero-indexed, so add 1
    const day = dateObject.getDate();

    let todayDay = today.getDate();
    let todayMonth = today.getMonth() + 1;
    let todayYear = today.getFullYear();

    let months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (day > todayDay) {
      todayDay = todayDay + months[todayMonth - 1];
    }
    if (month > todayMonth) {
      todayMonth = todayMonth + 12;
      todayYear = todayYear - 1;
    }

    let resultDay = todayDay - day;
    let resultMonth = todayMonth - month;
    let resultYear = todayYear - year;

    setAge({ days: resultDay, months: resultMonth, years: resultYear });
  }, [value]);

  return (
    <>
      <div className="wrapper">
        <div className="container">
          <div className="calculatorCont">
            <div className="imageCont">
              <img src={imageC} alt="" />
            </div>
            <div className="content">
              <form action="">
                <div className="selectionContainer">
                  <div className="inputDiv">
                    <input
                      type="date"
                      className="date"
                      id="dataValue"
                      {...register("date", { required: true })}
                    />
                    {errors.date && (
                      <p className="text-danger errorText">
                        Please select date
                      </p>
                    )}
                  </div>
                  <div className="button">
                    <a href="#" onClick={handleSubmit(submitE)}>
                      <FaWandMagicSparkles />
                    </a>
                  </div>
                </div>
              </form>
              <div className="resultCont">
                {age !== null ? (
                  <>
                    <div className="result">
                      <p>
                        {age?.years !== undefined ? age.years.toString() : "-"}
                      </p>
                      <span>Years</span>
                    </div>
                    <div className="result">
                      <p>
                        {age?.months !== undefined
                          ? age.months.toString()
                          : "-"}
                      </p>
                      <span>Months</span>
                    </div>
                    <div className="result">
                      <p>
                        {age?.days !== undefined ? age.days.toString() : "-"}
                      </p>
                      <span>Days</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="result">
                      <p>-</p>
                      <span>Years</span>
                    </div>
                    <div className="result">
                      <p>-</p>
                      <span>Months</span>
                    </div>
                    <div className="result">
                      <p>-</p>
                      <span>Days</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default calculator;
