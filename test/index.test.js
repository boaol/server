const app = require("../app")
const session = require("supertest-session")

let testSession = null

let userId = null

beforeAll(function () {
  testSession = session(app)
})

describe("ssr server", function () {
  it("post /update should store data in session", function (done) {
    testSession
      .post("/update")
      .set("Accept", "application/x-www-form-urlencoded")
      .send("suburb=Pyrmont")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toMatchObject({
          success: true,
          message: "session saved",
        })
        done()
      })
      .catch((err) => done(err))
  })

  it("should load app with previous stored session data", function (done) {
    testSession
      .get("/")
      .expect(200)
      .then((response) => {
        expect(response.text).toMatch(
          `React.createElement(window.hCard.default, {"suburb":"Pyrmont"}),`
        )
        done()
      })
      .catch((err) => done(err))
  })

  it("post /submit should return userId", function (done) {
    testSession
      .post("/submit")
      .set("Accept", "application/x-www-form-urlencoded")
      .send(
        "givenName=Sam&surname=Fairfax&email=sam.fairfax%40fairfaxmedia.com.au&phone=0292822833&houseNumber=100&street=Harris+Street&suburb=Pyrmont&state=NSW&postcode=2009&country=Australia"
      )
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty("userId")
        expect(response.body).toMatchObject({ success: true })
        userId = response.body.userId
        done()
      })
      .catch((err) => done(err))
  })

  it("session data should be cleared after submit form", function (done) {
    testSession
      .get("/")
      .expect(200)
      .then((response) => {
        expect(response.text).toMatch(
          `React.createElement(window.hCard.default, {}),`
        )
        done()
      })
      .catch((err) => done(err))
  })

  it("retrieve created user by id", function (done) {
    testSession
      .get("/" + userId)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.user).toMatchObject({
          givenName: "Sam",
          surname: "Fairfax",
          email: "sam.fairfax@fairfaxmedia.com.au",
          phone: "0292822833",
          houseNumber: "100",
          street: "Harris Street",
          suburb: "Pyrmont",
          state: "NSW",
          postcode: "2009",
          country: "Australia",
        })
        done()
      })
      .catch((err) => done(err))
  })
})
