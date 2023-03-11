import './App.css';
import React, { useState, useEffect } from 'react';
import check from "./checkmark.png";
import cancel from "./cancel.png";
import pend from "./pending-icon.png";


const initialGroupState = {
  id: 1,
  name: "Burgandy boyzz",
  members: [{ name: "Sanket", contact: "", action: "yes" }, { name: "Sudhanshu", contact: "", action: "" }, { name: "Arun", contact: "", action: "" }]
}

const monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DayList = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

function App() {
  const [group, setGroup] = useState();
  const [groupList, setGroupList] = useState(["Sexy things","Burgandy boyzz", "Project Sourcecode"]);

  let updateGroup = (elm) => {
    setGroup(elm);
  }
  return (
    <div className="App">
      {group ? <GroupView resetGrp={updateGroup} group={group} /> : <GroupList setGroup={updateGroup} groupList={groupList} />}
    </div>
  );
}



function GroupList(props) {
  return (
    <div className='Maincontainer'>
      <div className='group-list-container'>
        <span className='title'>Select Group</span>
        {props.groupList.map((elm, index) => <div onClick={() => props.setGroup(elm)} className='group-list' key={index}>{elm}</div>)}
      </div>
    </div>
  );
}

function GroupView(props) {
  let currentDate = new Date();
  let date = currentDate.getDate();
  let day = currentDate.getDay();
  let month = monthList[currentDate.getMonth()];
  let year = currentDate.getFullYear();
  let startDate = new Date();
  let endDate = new Date();
  const [weekDays, setWeekDays] = useState([]);
  const [task, setTask] = useState("");
  const [members, setMembers] = useState([]);


  let getWeekDays = () => {
    let tempDays = [];
    tempDays.push({
      date: startDate,
      day: "Mon",
      task: "Yessss",
      selected: false,
      members: [{ name: "Sanket", contact: "", action: "yes" }, { name: "Sudhanshu", contact: "", action: "" }, { name: "Arun", contact: "", action: "" }]
    });

    for (let i = 0; i < DayList.length; i++) {
      let initDate = new Date(startDate)
      if (DayList[i] !== 'Sun') {
        initDate.setDate(initDate.getDate() + i)
        tempDays.push({
          date: initDate,
          day: DayList[initDate.getDay()],
          task: "Tesing" + i,
          selected: false,
          members: [{ name: "Sanket", contact: "", action: "yes" }, { name: "Sudhanshu", contact: "", action: "" }, { name: "Arun", contact: "", action: "" }]
        })
      }
    }


    setWeekDays(tempDays);

  }

  useEffect(() => {
    getWeekDays();
  }, []);

  let getCurrentWeek = () => {
    startDate.setDate(currentDate.getDate() - (day - 1));
    endDate.setDate(currentDate.getDate() + (7 - day));
    return "< " + startDate.getDate() + " " + month + " to " + endDate.getDate() + " " + month + " >";
  }

  const getClassTile = (index) => {
    let style = "";
    if (index == (weekDays.length - 1)) {
      style += ' dateTile'
    }
    else {
      style += ' b-r-0 dateTile'
    }

    if (weekDays[index].selected) {
      style += ' dateTileAf dateSelected'
    }


    return style;

  }

  const getTask = (index) => {
    let temp = weekDays;
    temp.forEach(elm => elm.selected = false);
    temp[index].selected = true;
    setTask(weekDays[index].task);
    setWeekDays(temp);
    let newMemb = Object.assign([], temp[index].members);
    setMembers(newMemb);
  }

  const setAction = (index) => {
    let temp = Object.assign([], members);
    temp[index].action = !temp[index].action ? "yes" : (temp[index].action == "yes" ? "no" : "yes");
    setMembers(temp);
  }

  return (
    <div className='container'>
      <span onClick={()=>props.resetGrp(null)} className='title br-5'>{props.group}</span>
      <div className='calenderViewContainer'>
        <div className='titleWeek'>
          <span>{getCurrentWeek()}</span>
        </div>
        <div className='calender-container'>
          <div className='calender'>
            {
              weekDays.map((elm, index) => {
                return (
                  <div onClick={() => getTask(index)} key={index} className={getClassTile(index)}>
                    <span className='dt'>{elm.date.getDate()}</span>
                    <span>{elm.day}</span>
                  </div>
                )
              })
            }
            {task ? <div className='task'><span>{task}</span></div> : null}
          </div>
          {task ?
            <div className='members'>
              {
                members.map((elm, index) => {
                  return (
                    <div key={index} onClick={() => { setAction(index) }} className="member-list"><span>{elm.name}</span> {elm.action == "yes" ? <img src={check} /> : (elm.action == "no" ? <img src={cancel} /> : <img src={pend} />)} </div>
                  )
                })
              }
            </div>
            : null}
        </div>

      </div>
    </div>
  );
}


export default App;
