/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ub3906gzbwyqy53")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yeilenni",
    "name": "content",
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
  const collection = dao.findCollectionByNameOrId("ub3906gzbwyqy53")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yeilenni",
    "name": "content",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": 150,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
