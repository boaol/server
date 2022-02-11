const { v4 } = require("uuid")
const low = require("lowdb")
const FileSync = require("lowdb/adapters/FileSync")

/**
 * initialize a JSON lowDB with default value { users: [] }
 */
const adapter = new FileSync("db/db.json", {
  defaultValue: { users: [] },
})

const lowDB = low(adapter)

module.exports = {
  /**
   *
   * @param {*} data
   * @returns _id
   *
   * save data to lowDB, return a auto-generated uuid
   */
  save(data) {
    const _id = v4()
    lowDB
      .get("users")
      .push({ _id, ...data })
      .write()
    return _id
  },
  /**
   *
   * @param {*} _id
   * @returns user object
   *
   * query user by _id
   */
  get(_id) {
    return lowDB.get("users").find({ _id })
  },
}
