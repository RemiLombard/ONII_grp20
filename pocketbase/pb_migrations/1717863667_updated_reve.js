/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lpiv0332e8d8hko")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ggbllaw6",
    "name": "lucide",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Oui",
        "Non"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nmaizd2a",
    "name": "recurrent",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Oui",
        "Non"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lpiv0332e8d8hko")

  // remove
  collection.schema.removeField("ggbllaw6")

  // remove
  collection.schema.removeField("nmaizd2a")

  return dao.saveCollection(collection)
})
