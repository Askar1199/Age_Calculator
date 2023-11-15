import "./calculator.scss";
import { FaWandMagicSparkles } from "react-icons/fa6";
import imageC from "../../assets/imahe.png";
import { useForm, SubmitHandler } from "react-hook-form";
import {  useEffect, useState } from "react";


interface datas {
  date: string | any;
}

const calculator = () => {
  const [value, setValue] = useState<datas[]>([]);


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<datas>();

  const submitE: SubmitHandler<datas> = (data) => {
    setValue([data]);
   
    
    reset();
  };
  
  useEffect(()=>{
    const dateObject = new Date(value[0]?.date);

    // Extract the components
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1; // Month is zero-indexed, so add 1
    const day = dateObject.getDate();

    console.log(`Year: ${year}, Month: ${month}, Day: ${day}`);
  },[value])
  



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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default calculator;
