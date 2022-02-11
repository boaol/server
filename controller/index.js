const ReactDOMServer = require("react-dom/server")
const React = require("react")
const db = require("../db")
const template = require("../templates")

const hCardComponent = require("../public/main").default

module.exports.getHomePage = function (req, res) {
  // pre-render hCardComponent, load session data as initial props with template
  const hCardProps = req.session.data
  const content = ReactDOMServer.renderToString(
    React.createElement(hCardComponent, hCardProps)
  )
  res.send(template(content, hCardProps))
}

module.exports.getUserById = function (req, res) {
  res.json({ success: true, user: db.get(req.params.userId) })
}

module.exports.update = function (req, res) {
  // update session data
  req.session.data = { ...req.session.data, ...req.body }
  res.json({ success: true, message: "session saved" })
}

module.exports.submit = function (req, res) {
  // save data to db and clear session data
  const userId = db.save(req.body)
  req.session.data = {}
  res.json({ success: true, userId })
}
