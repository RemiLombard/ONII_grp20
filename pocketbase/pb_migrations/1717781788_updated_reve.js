/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lpiv0332e8d8hko")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "inkoela8",
    "name": "rating",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 1,
      "max": 5,
      "noDecimal": true
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lpiv0332e8d8hko")

  // remove
  collection.schema.removeField("inkoela8")

  return dao.saveCollection(collection)
})
