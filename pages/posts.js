import React from 'react'
import { useQuery } from 'react-query'
import { request, gql } from "graphql-request";
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { scaleLinear, scaleBand, scaleTime, coerceNumber } from '@visx/scale';
import { AxisLeft, AxisBottom } from '@visx/axis';

// i used graphql request
const endpoint = "https://fakerql.goosfraba.ro/graphql"

export default function Posts() {

   const { data: allposts, isLoading } = usePosts()

   const result = new Array(12).fill(0)

   const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];

   const data = []
   allposts?.map(post => {
      const postdate = new Date(Number(post.createdAt)).getMonth()
      const postyear = new Date(Number(post.createdAt)).getFullYear()
      console.log(postyear)
      if (postyear === 2019) {
         result[postdate]++
      }

      // console.log(postdate)
   })
   monthNames.map((month, index) => {
      data.push({ "month": month, count: result[index] })
   })
   console.log(data)
   // console.log(filtered)
   if (isLoading) {
      return (
         <p>Loading...</p>
      )
   }
   // const filtered = data.map(post => console.log(post))
   return (
      <div>
         <h2>Posturi din 2019</h2>
         <BarGraph data={data} monthNames={monthNames} />
         <table>
            <tr>
               <th>Month</th>
               <th>Posts / month</th>
            </tr>
            {data.map(d => {
               return (
                  <tr>
                     <td>{d.month}</td>
                     <td>{d.count}</td>
                  </tr>
               )
            })}
         </table>
      </div>
   )
}

function BarGraph({ data, monthNames }) {
   const width = 1000;
   const height = 500;
   const margin = { top: 20, bottom: 20, left: 20, right: 20 };

   // Then we'll create some bounds
   const xMax = width - margin.left - margin.right;
   const yMax = height - margin.top - margin.bottom;

   // We'll make some helpers to get at the data we want
   const x = d => d.month;
   const y = d => +d.count;

   // And then scale the graph by our data
   const xScale = scaleBand({
      range: [0, xMax],
      round: true,
      domain: data.map(x),
      padding: 0.4,
   });
   const yScale = scaleLinear({
      range: [yMax, 0],
      round: true,
      domain: [0, Math.max(...data.map(y))],
   });

   // Compose together the scale and accessor functions to get point functions
   const compose = (scale, accessor) => data => scale(accessor(data));
   const xPoint = compose(xScale, x);
   const yPoint = compose(yScale, y);

   const getMinMax = (vals) => {
      const numericVals = vals.map(coerceNumber);
      return [Math.min(...numericVals), Math.max(...numericVals)];
   };

   const timeScale = scaleTime({
      domain: getMinMax([new Date("2019-01-01"), new Date("2019-31-12")]),
      range: [0, width],
   });

   let countarray = data.map(month => month.count)


   const numberScale = scaleLinear({
      domain: [0, Math.max(...countarray)],
   });
   timeScale.range([0, xMax]);
   numberScale.range([yMax, 0])

   return (
      <svg width={width} height={height}>
         <AxisLeft scale={numberScale} label='no of posts' />
         {data.map((d, i) => {
            const barHeight = yMax - yPoint(d);
            return (
               <Group key={`bar-${i}`}>
                  <Bar
                     x={xPoint(d)}
                     y={yMax - barHeight}
                     height={barHeight}
                     width={xScale.bandwidth()}
                     fill="teal"

                  />
                  <AxisBottom top={yMax}
                     scale={timeScale}
                  />
               </Group>
            );
         })}
      </svg>
   );
}

function usePosts() {
   return useQuery("posts",
      async () => {
         const data = await request(
            endpoint,
            gql`
          query {
               allPosts(count: 50) {
                  title,
                  createdAt
               }
               }
        `
         );
         return data.allPosts;
      });
}
