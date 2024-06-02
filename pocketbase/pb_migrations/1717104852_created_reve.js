/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "lpiv0332e8d8hko",
    "created": "2024-05-30 21:34:12.247Z",
    "updated": "2024-05-30 21:34:12.247Z",
    "name": "reve",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "tkjojzkq",
        "name": "title",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "hn1psvxx",
        "name": "excerpt",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": 150,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "o65k1vrw",
        "name": "date",
        "type": "date",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      },
      {
        "system": false,
        "id": "ruo7zpgz",
        "name": "recurrent",
        "type": "bool",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "xoq2nl19",
        "name": "lucide",
        "type": "bool",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "e2s9yu1x",
        "name": "partage",
        "type": "bool",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("lpiv0332e8d8hko");

  return dao.deleteCollection(collection);
})
