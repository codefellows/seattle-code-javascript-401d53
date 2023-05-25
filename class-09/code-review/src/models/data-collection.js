'use strict';

// THIS IS THE STRETCH GOAL ...
// It takes in a schema in the constructor and uses that instead of every collection
// being the same and requiring their own schema. That's not very DRY!

class DataCollection {

  constructor(model) {
    this.model = model;
  }

  get(id) {
    if (id) {
      return this.model.findOne({ where: { id } });
    }
    else {
      return this.model.findAll({});
    }
  }

  create(record) {
    return this.model.create(record);
  }

  async update(id, data) {

    // wow!  the initial record is grabbed, THEN we modify the data, THEN we return that data
    let result = await this.model.findOne({ where: { id } });
    let modifiedData = await result.update(data);
    return modifiedData;
  }

  delete(id) {
    return this.model.destroy({ where: { id }});
  }

}

module.exports = DataCollection;
