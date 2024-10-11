
const baseURL = import.meta.env.VITE_SERVER_URL

// async function convertToJson(res) {
//   if (res.ok) {
//     return res.json();
//   } else {
//     throw new Error("Bad Response");
//   }
// }
async function convertToJson(res) {
  try {
    const jsonData = await res.json();
    if (!res.ok) {
      throw { name: 'servicesError', message: jsonData };
    }
    return jsonData;
  } catch (error) {
    throw { name: 'servicesError', message: 'Failed to parse response as JSON' };
  }
}


export default class ExternalServices {
  constructor() {
    // this.category = category;
    // this.path = `../json/${this.category}.json`;
  }
  async getData(category) {
    const resp = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(resp);
    return data.Result;
    // return fetch(this.path)
    //   .then(convertToJson)
    //   .then((data) => data);
  }
  async findProductById(id) {
    const response = await fetch(baseURL + `product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
    // const products = await this.getData();
    // return products.find((item) => item.Id === id);
  }

  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    return await fetch(baseURL + "checkout/", options).then(convertToJson);
  }
}
