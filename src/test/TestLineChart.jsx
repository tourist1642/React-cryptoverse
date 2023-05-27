import React from 'react'
import { Line } from "react-chartjs-2";

const TestLineChart = () => {
  return (
    <div>
      TestLineChart
      <Line
        data={{
          // x-axis label values
          labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday"],
          datasets: [
            {
              label: "# of Calories Lost",
              // y-axis data plotting values
              data: [0,10,25,13,64,45,36],
              fill: false,
              borderWidth:4,
              backgroundColor: "rgb(255, 99, 132)",
              borderColor:'green',
              responsive:true
            },
          ],
        }}
      />

    </div>
  )
}

export default TestLineChart