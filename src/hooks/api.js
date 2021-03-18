export function getTemp() {
  fetch("/data", {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    return { data: res };
  });
}

export function getPrice() {
  fetch("/tariff").then((result) => {
    return result;
  });
}

// export function getChart() {
//   fetch('/')
//   .then(result => {
//     return result
//   })
// }
