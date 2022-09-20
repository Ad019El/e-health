import * as React from "react";
import Paper from "@mui/material/Paper";
import { ViewState, EditingState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  WeekView,
  EditRecurrenceMenu,
  ConfirmationDialog,
  Toolbar,
  DateNavigator,
  TodayButton,
} from "@devexpress/dx-react-scheduler-material-ui";
import Alert from "../../components/Alert";
import Spinner from "../../components/Spinner";

// let appointments = [
//   // {
//   //   //2022-05-25T09:45
//   //   // Fri May 27 2022 10:30:00 GMT+0100
//   //   startDate: "2022-05-25T09:45",
//   //   endDate: "2022-05-25T10:45",
//   //   title: "Meeting",
//   //   id: 0,
//   //   reserved: false,
//   // },
//   // {
//   //   //2022-05-25T09:45
//   //   // Fri May 27 2022 10:30:00 GMT+0100
//   //   startDate: "2022-05-26T09:45",
//   //   endDate: "2022-05-26T10:45",
//   //   title: "Meeting",
//   //   id: 1,
//   //   reserved: true,
//   // },
// ];
let userID = "";
if (JSON.parse(localStorage.getItem("jwt")))
  userID = JSON.parse(localStorage.getItem("jwt")).user._id;

const axios = require("axios");
const API = `https://${process.env.REACT_APP_SERVER_IP}`;

const Appointment = ({ children, style, data, ...restProps }) => (
  <Appointments.Appointment
    {...restProps}
    data={data}
    style={{
      ...style,
      backgroundColor: data.reserved === true ? "#808080" : "#1ABAB9",
      borderRadius: "8px",
    }}
  >
    {children}
  </Appointments.Appointment>
);

const TooltipContent = ({ appointmentData, formatDate }) => {
  const [name, setName] = React.useState();
  axios
    .get(
      `${API}/api/patient/${appointmentData.patientID}`,

      {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("jwt")).token
          }`,
        },
      }
    )
    .then((result) => {
      console.log("result ", result);
      setName(
        result.data.patient.family_name + " " + result.data.patient.first_name
      );
    })
    .catch((err) => console.log(err));

  return (
    <div>
      <div className="pl-10 text-sm mb-5">
        {`
        ${new Date(appointmentData.startDate).toDateString()} `}
      </div>

      <div className="pl-10 text-primary_800 mb-2">
        {`${formatDate(appointmentData.startDate, {
          hour: "numeric",
          minute: "numeric",
        })} - ${formatDate(appointmentData.endDate, {
          hour: "numeric",
          minute: "numeric",
        })}`}
      </div>

      <div className="text-1xl text-justify px-10  mb-4">{`${
        appointmentData.reserved ? "Reserved by " + name : "Not reserved"
      }`}</div>
    </div>
  );
};

const BooleanEditor = () => {
  return null;
};

const TextEditor = () => {
  return null;
};

const LabelEditor = () => {
  return null;
};

export default class Calendar_comp extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      currentDate: new Date(),
      addedAppointment: {},
      appointmentChanges: {},
      editingAppointment: undefined,
      alert: "",
      isLoading: true,
    };

    this.commitChanges = this.commitChanges.bind(this);
    this.changeAddedAppointment = this.changeAddedAppointment.bind(this);
    this.changeAppointmentChanges = this.changeAppointmentChanges.bind(this);
    this.changeEditingAppointment = this.changeEditingAppointment.bind(this);
  }

  componentDidMount() {
    axios
      .get(`${API}/api/appointment/medecin/${userID}`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("jwt")).token
          }`,
        },
      })
      .then((result) => {
        let data = [];
        console.log(result.data);
        result.data.reservations.map((appointment) => {
          data.push({
            id: appointment._id,
            startDate: appointment.start_date,
            endDate: appointment.end_date,
            title: appointment.title,
            reserved: appointment.reserved,
            notes: appointment.notes,
            patientID: appointment.patient_id,
          });
          this.setState({ data: data });
          this.setState({ isLoading: false });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  changeAddedAppointment(addedAppointment) {
    this.setState({ addedAppointment });
  }

  changeAppointmentChanges(appointmentChanges) {
    this.setState({ appointmentChanges });
  }

  changeEditingAppointment(editingAppointment) {
    this.setState({ editingAppointment });
  }

  commitChanges({ added, changed, deleted }) {
    if (added) {
      const json = {
        medecin_id: userID,
        start_date: added.startDate,
        end_date: added.endDate,
        title: added.title,
        notes: added.notes,
      };

      axios
        .post(`${API}/api/appointment/add`, json, {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("jwt")).token
            }`,
          },
        })
        .then((response) => {
          this.setState((state) => {
            let { data } = state;
            console.log("responese -------------------", response);
            const startingAddedId =
              data.length > 0 ? data[data.length - 1].id + 1 : 0;
            added.id = response.data.createdAppointment._id;
            data = [...data, { id: startingAddedId, ...added }];
            console.log(data);
            return { data };
          });
          this.setState({ alert: "" });
        })
        .catch((err) => {
          console.log("---------", err.response.data.err);
          this.setState({ alert: err.response.data.err });
        });
    }

    if (changed) {
      let key = Object.keys(changed)[0];
      const json = {
        start_date: changed[key].startDate,
        end_date: changed[key].endDate,
        title: changed[key].title,
        notes: changed[key].notes,
      };

      axios
        .post(
          `${API}/api/appointment/update/${Object.keys(changed)[0]}`,
          json,
          {
            headers: {
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("jwt")).token
              }`,
            },
          }
        )
        .then((response) => {
          this.setState((state) => {
            let { data } = state;
            data = data.map((appointment) =>
              changed[appointment.id]
                ? { ...appointment, ...changed[appointment.id] }
                : appointment
            );
            return { data };
          });
          this.setState({ alert: "" });
        })
        .catch((err) => {
          console.log("---------", err.response.data.err);
          this.setState({ alert: err.response.data.err });
        });
    }
    // console.log(JSON.parse(localStorage.getItem("jwt")).user._id);

    if (deleted !== undefined) {
      axios
        .delete(`${API}/api/appointment/${deleted}`, {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("jwt")).token
            }`,
          },
        })
        .then((response) => {
          this.setState((state) => {
            let { data } = state;
            console.log("responese ------------------- delete", response);
            data = data.filter((appointment) => appointment.id !== deleted);
            return { data };
          });
          this.setState({ alert: "" });
        })
        .catch((err) => {
          console.log("---------", err);
          this.setState({ alert: err.response.data.err });
        });
    }
    this.setState((state) => {
      let { data } = state;

      return { data };
    });
  }

  render() {
    const {
      currentDate,
      data,
      addedAppointment,
      appointmentChanges,
      editingAppointment,
    } = this.state;

    return (
      <>
        {true ? (
          <>
            <div className="px-10 mb-4">
              {this.state.alert ? (
                <Alert type="Failed!" color="red" content={this.state.alert} />
              ) : (
                <></>
              )}
            </div>

            <Paper>
              <Scheduler data={data} height={950}>
                <ViewState defaultCurrentDate={currentDate} />
                <WeekView startDayHour={8} endDayHour={17} />
                <Toolbar />
                <DateNavigator />
                <TodayButton />
                <EditingState
                  onCommitChanges={this.commitChanges}
                  addedAppointment={addedAppointment}
                  onAddedAppointmentChange={this.changeAddedAppointment}
                  appointmentChanges={appointmentChanges}
                  onAppointmentChangesChange={this.changeAppointmentChanges}
                  editingAppointment={editingAppointment}
                  onEditingAppointmentChange={this.changeEditingAppointment}
                />
                <EditRecurrenceMenu />
                <ConfirmationDialog />
                <Appointments appointmentComponent={Appointment} />

                <AppointmentTooltip
                  showOpenButton
                  showDeleteButton
                  contentComponent={TooltipContent}
                />
                <AppointmentForm
                  booleanEditorComponent={BooleanEditor}
                  textEditorComponent={TextEditor}
                  labelComponent={LabelEditor}
                />
              </Scheduler>
            </Paper>
          </>
        ) : (
          <Spinner calendar={"calendar"} />
        )}
      </>
    );
  }
}
