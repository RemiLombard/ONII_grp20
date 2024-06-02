/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lpiv0332e8d8hko")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ijjyjdhr",
    "name": "fullText",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lpiv0332e8d8hko")

  // remove
  collection.schema.removeField("ijjyjdhr")

  return dao.saveCollection(collection)
})
