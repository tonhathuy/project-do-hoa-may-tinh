import React, { Component } from "react";
import DatGui, {
  DatBoolean,
  DatButton,
  DatColor,
  DatFolder,
  DatNumber,
  DatPresets,
  DatSelect,
  DatString
} from "@tim-soft/react-dat-gui";

class DatGUI extends Component {
  constructor(props) {
    super(props);

    const initialDatState = {
      string: "Camera",
      far: 66,
      fov: 66,
      near: 80,
      colorObject: "#2FA1D6",
    };

    this.state = {
      data: this.props.initialDatState,
      defaultData: initialDatState
    };
  }

  render() {
    // const { data, defaultData } = this.state;
    console.log("this.props.initialDatState",this.props.initialDatState)
    // console.log("this.props.geometry:",this.props.geometry);
    return (
      <main className="react-dat-gui-demo">
        {/* <Stats data={data} /> */}
        <DatGui
          data={this.props.initialDatState}
          onUpdate={this.props.handleUpdate}
          className="react-dat-gui-relative-position"
        > 
          <DatString path="string" label="Name Dat"/>
          <DatNumber
            path="far"
            label="Far"
            min={0}
            max={6000}
            step={10}
          />
          <DatNumber
            path="fov"
            label="FOV"
            min={0}
            max={200}
            step={2}
          />
          <DatNumber path="near" label="Near" />
          <DatNumber
            path="near"
            label="Near"
            min={0}
            max={1}
            step={0.1}
          />
          <DatNumber
            path="lightPosition"
            label="Light Position"
            min={0}
            max={4}
            step={0.2}
          />
          <DatColor label="Color Object" path="colorObject" />
          
        </DatGui>
      </main>
    );
  }
}

export default DatGUI;
