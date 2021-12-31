process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");

let items = require("../fakeDb")

let item = { name: "demoitem1", price:500 }

beforeEach(function () {
  items.push(item)
});

afterEach(function () {
  items = []
});

describe("GET /items",  () => {
  test("Gets a list of items", async () => {
    const response = await request(app).get(`/items`);
    const { items } = response.body;
    expect(response.statusCode).toBe(200);
    expect(items).toHaveLength(1);
  });
});


describe("GET /items/:name",  () => {
  test("Gets a single item", async () => {
    const response = await request(app).get(`/items/${item.name}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.item).toEqual(item);
  });

  test("Responds with 404 if can't find item", async function () {
    const response = await request(app).get(`/items/0`);
    expect(response.statusCode).toBe(404);
  });
});


describe("POST /items",  () => {
  test("Creates a new item", async () => {
    const response = await request(app)
      .post(`/items`)
      .send({
        name: "demoitem2",
        price: 1.5
      });
    expect(response.statusCode).toBe(200);
    expect(response.body.item).toHaveProperty("name");
    expect(response.body.item).toHaveProperty("price");
    expect(response.body.item.name).toEqual("demoitem2");
    expect(response.body.item.price).toEqual(1.5);
  });
});


describe("PATCH /items/:name",  () => {
  test("Updates a single item", async () => {
    const response = await request(app)
      .patch(`/items/${item.name}`)
      .send({
        name: "demoitem3"
      });
    expect(response.statusCode).toBe(200);
    expect(response.body.item).toEqual({
      name: "demoitem3"
    });
  });

  test("Responds with 404 if can't find item", async function () {
    const response = await request(app).patch(`/items/0`);
    expect(response.statusCode).toBe(404);
  });
});

describe("DELETE /items/:name",  () => {
  test("Deletes a single a item", async () => {
    const response = await request(app)
      .delete(`/items/${item.name}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "Deleted" });
  });
});


