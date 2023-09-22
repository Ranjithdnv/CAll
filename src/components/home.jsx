import React, { useEffect, useState, useRef } from "react";

import axios from "axios";
import "./home.css";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import AddIcCallRoundedIcon from "@mui/icons-material/AddIcCallRounded";
function Home() {
  const [createBox, setcreateBox] = useState(false);
  const [students, setstudents] = useState([]);
  const [studentsall, setstudentsall] = useState([]);
  const [classofstudent, setclassofstudent] = useState("");
  const [classes, setclasses] = useState(
    JSON.parse(localStorage.getItem("classes")) || []
  );
  //   const [number, setnumber] = useState("");
  const nameofstudent = useRef("");
  const classofstudentcreate = useRef("");
  const phonenumberofstudent = useRef("");
  useEffect(() => {
    const students = async () => {
      try {
        const res = await axios.get("https://caalapi.onrender.com/students", {
          //   headers: {
          //     Authorization: `Bearer ${localStorage?.getItem("token") || null}`,
          //   },
        });

        setstudents(res.data);
        setstudentsall(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    students();
  }, []);

  const filterbyclass = (classStudent) => {
    const classfilter = studentsall.filter(function (el) {
      // console.log(el.class);

      if (el.class === classStudent.class) {
        return el;
      }
    });
    setstudents(classfilter);

    // try {
    //   const res = await axios.post(
    //     "https://caalapi.onrender.com/createstudent",
    //     Studentinfo
    //     // {
    //     //   headers: {
    //     //     Authorization: `Bearer ${localStorage?.getItem("token") || null}`,
    //     //   },
    //     // }
    //   );
    //   console.log(res.data);
    // } catch (err) {
    //   console.log(err);
    // }
  };

  const createStudent = async () => {
    const Studentinfo = {
      class: classofstudentcreate.current.value,
      name: nameofstudent.current.value,
      phonenumber: phonenumberofstudent.current.value,
    };
    !classes?.some(
      (user) => user.class === classofstudentcreate.current.value
    ) && classes.push({ class: classofstudentcreate.current.value });
    let obj = JSON.stringify(classes);
    localStorage.setItem("classes", obj);
    try {
      const res = await axios.post(
        "https://caalapi.onrender.com/createstudent",
        Studentinfo
        // {
        //   headers: {
        //     Authorization: `Bearer ${localStorage?.getItem("token") || null}`,
        //   },
        // }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="app">
      <div></div>{" "}
      <div className="topbar">
        <div className="logo">
          <img
            className="logo"
            src="./tracklogo.jpg"
            // height="60px"
            // width="100px"
            alt=""
          />
        </div>
        <div className="heading">Track</div>
        <div
          className="add-student-box"
          onClick={() => {
            setcreateBox(!createBox);
          }}
        >
          <AddBoxRoundedIcon className="send-round" />
        </div>
      </div>
      <div className="create-box">
        {createBox && (
          <div className="create-box-box">
            {" "}
            <div className="create-box-box-top">
              {" "}
              <input type="text" placeholder="name" ref={nameofstudent} />
              <input
                type="text"
                placeholder="class"
                ref={classofstudentcreate}
              />
            </div>{" "}
            {/* <input type="text" placeholder="name" ref={nameofstudent} />
            <input
              type="text"
              placeholder="class"
              ref={classofstudentcreate}
            /> */}
            {/* <input type="text" /> */}
            <div className=" create-box-box-bottom">
              <div>
                {" "}
                <input type="text" ref={phonenumberofstudent} />{" "}
              </div>
              <div onClick={createStudent}>
                <SendRoundedIcon className="send-round" />{" "}
              </div>
            </div>
            {/* <input type="text" ref={phonenumberofstudent} />
            <div onClick={createStudent}>
              <SendRoundedIcon className="send-round" />{" "}
            </div> */}
          </div>
        )}
      </div>
      <div className="all-classes">
        {classes?.map((classStudent, index) => (
          <div className="class-each-box-con" key={index}>
            <div
              onClick={() => {
                filterbyclass(classStudent);
              }}
              className="class-each-box"
            >
              {classStudent.class}
            </div>
          </div>
        ))}
      </div>
      <div className="student-data-header">students data</div>
      <div className="students-con">
        {students?.map((student, index) => {
          const phone = `tel:${student.phonenumber}`;
          //   console.log(phone);
          return (
            <div className="students" key={index}>
              {/* true false to update money
            <input type="text" /> */}
              {/* //for money //update money */}
              <div className="name"> {student.name}</div>
              <div className="class-student"> {student.class}</div>
              <div className="student-phone">
                <a href={phone}>
                  <AddIcCallRoundedIcon className="send-round" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Home;
