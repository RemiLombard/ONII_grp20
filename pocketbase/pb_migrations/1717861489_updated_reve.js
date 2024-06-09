/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lpiv0332e8d8hko")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pbaeepg0",
    "name": "categorie",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Joie",
        "Peur",
        "Tristesse",
        "Colère",
        "Amour",
        "Famille",
        "Amis",
        "Loisirs",
        "Aventure",
        "Fantastique",
        "Exploration",
        "Voyage",
        "Suspens",
        "Historique",
        "Culture pop",
        "Spiritualité"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lpiv0332e8d8hko")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pbaeepg0",
    "name": "categorie",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "joie",
        "peur",
        "tristesse",
        "colère",
        "amour",
        "famille",
        "amis",
        "loisirs",
        "aventure",
        "fantastique",
        "exploration",
        "voyage",
        "suspens",
        "historique",
        "culture pop",
        "spiritualité"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
